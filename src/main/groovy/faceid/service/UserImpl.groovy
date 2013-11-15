/**
 *
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package faceid.service

import faceid.cdi.util.StringEncrypt
import faceid.data.entity.User
import faceid.data.entity.UserConfirmation
import org.slf4j.LoggerFactory

import javax.annotation.Resource
import javax.annotation.security.RolesAllowed
import javax.ejb.EJB
import javax.ejb.Stateless
import javax.inject.Inject
import javax.jms.ConnectionFactory
import javax.jms.DeliveryMode
import javax.jms.Queue
import javax.jms.Session
import java.util.regex.Pattern

@Stateless
@RolesAllowed(value = 'solution-admin')
class UserImpl {
    private static def LOG = LoggerFactory.getLogger(UserImpl)
    private static def USER_CONFIRMATION_PATTERN = Pattern.compile("\\{activateUser:.*:.*\\}")
    private static def MAIL_SESSION_TO_USE = "user-request"

    @Resource
    private ConnectionFactory factory

    @Resource(name = "SendEmailQueue")
    private Queue sendEmailQueue

    @EJB
    private BaseEAO baseEAO

    @EJB
    private Connections connections

    @Inject
    private StringEncrypt encrypt

    private void sendConfirmationEmail(String userAccount, String key) {
        def connection = null
        def session = null
        try {
            connection = factory.createConnection()
            connection.start()

            // Create a Session
            session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE)

            // Create a MessageProducer from the Session to the Topic or Queue
            def producer = session.createProducer(sendEmailQueue)
            producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT)

            // Create a message
            def message = session.createMessage()
            message.setStringProperty("sessionName", MAIL_SESSION_TO_USE)
            message.setStringProperty("to", userAccount)
            message.setStringProperty("subject", "Did you asked for a new user?")
            message.setStringProperty("text", "If you did, simply reply to this email to get it activated.\n" +
                    "Do not change the text below.\n" +
                    "{activateUser:${userAccount}:${key}}")

            // Tell the producer to send the message
            producer.send(message)
        } finally {
            // Clean up
            session?.close()
            connection?.close()
        }
    }

    @SuppressWarnings('CatchException')
    User createUser(String name, String account, String password, Set<String> groups, Boolean enabled) {
        def user = new User(
                name: name,
                account: account,
                salt: encrypt.generateSalt(),
                enabled: enabled,
                securityGroups: groups
        )
        if (!password) {
            user.password = encrypt.encryptString("", user.salt)
        } else {
            user.password = encrypt.encryptString(password, user.salt)
        }
        baseEAO.execute({ em ->
            em.persist(user)
        })
        if (!user.enabled) {
            def confirmation = new UserConfirmation(
                    key: encrypt.getRandomString(),
                    user: user
            )
            baseEAO.execute({ em ->
                em.persist(confirmation)
            })
            try {
                sendConfirmationEmail(user.account, confirmation.key)
            } catch (Exception e) {
                LOG.error("Impossible to send email to confirm new user account", e)
            }
        }
        user
    }

    User saveUser(Long id, String name, String account, String password, Set<String> groups) {
        if (id == null) { // id=0 can happen
            createUser(name, account, password, groups, true)
        } else {
            def user = getUserById(id)
            if (user) {
                user.name = name
                user.account = account
                user.securityGroups.clear()
                if (groups) {
                    user.securityGroups.addAll(groups)
                }
                if ("" != password) {
                    byte[] salt = encrypt.generateSalt()
                    user.salt = salt
                    user.password = encrypt.encryptString(password, salt)
                }
            }
            user
        }
    }

    User getUser(String account) {
        baseEAO.findUnique({ em ->
            def query = em.createQuery("SELECT e from ${User.class.name} e WHERE e.account = :pname")
            query.setParameter('pname', account)
            query
        }) as User
    }

    User getUserById(Long id) {
        baseEAO.findById(User, id) as User
    }

    void deleteUser(Long id) {
        def user = getUserById(id)
        if (user) {
            baseEAO.execute({ em ->
                em.remove(user)
            })
        }
    }

    List<User> listAll() {
        baseEAO.findAll(User.class)
    }

    void addGroupToUser(String userAccount, String userPassword, String group) {
        def user = getUser(userAccount)
        if (user) {
            if (encrypt.areEquivalent(userPassword, user.password, user.salt)) {
                user.securityGroups << group
            }
        }
    }

    void confirmUser(String from, String content) {
        def matcher = USER_CONFIRMATION_PATTERN.matcher(content)
        def confirmationText
        if (matcher.find()) {
            confirmationText = matcher.group()
        } else {
            LOG.warn("Confirmation text not found in message. Content: ${content}")
            // no-op
            return
        }
        def values = confirmationText.split(":")
        def confirmation = baseEAO.findUnique({ em ->
            def query = em.createQuery("SELECT c FROM UserConfirmation c WHERE c.user.account = :pUserName AND c.key = :pKey");
            query.setParameter("pUserName", values[1]);
            query.setParameter("pKey", values[2].substring(0, values[2].length() - 1));
            query
        }) as UserConfirmation
        if (!confirmation) {
            LOG.warn("Confirmation record not found. ConfirmationText: ${confirmationText}")
        } else if (from == confirmation.user.account) {
            confirmation.user.enabled = Boolean.TRUE
            if (LOG.isInfoEnabled()) {
                LOG.info("User confirmed. Account: ${confirmation.user.account}")
            }
            connections.sendToAll("User confirmed: '${confirmation.user.account}'")
        } else {
            LOG.warn("'from' does not match account. Account: ${confirmation.user.account}. from: ${from}")
        }
    }
}
