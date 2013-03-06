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

package faceid.service.bean;

import faceid.cdi.util.StringEncrypt;
import faceid.data.entity.User;
import faceid.data.entity.UserConfirmation;
import faceid.data.execution.BaseEAO;
import faceid.data.execution.command.CreateUser;
import faceid.data.execution.command.CreateUserConfirmation;
import faceid.data.execution.command.FindByStringField;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Resource;
import javax.annotation.security.RolesAllowed;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import javax.jms.*;
import java.util.List;
import java.util.Set;

@Stateless(name = "faceid-UserImpl")
@RolesAllowed(value = {"solution-admin"})
public class UserImpl {
    private static final Logger LOG = LoggerFactory.getLogger(UserImpl.class);

    @Resource
    private ConnectionFactory factory;

    @Resource(name = "SendEmailQueue")
    private Queue sendEmailQueue;

    //TODO -> resource
    private String emailSessionName = "test";

    @EJB
    private BaseEAO baseEAO;

    @Inject
    private StringEncrypt encrypt;

    private void sendConfirmationEmail(String userAccount, String key) throws JMSException {
        Connection connection = null;
        javax.jms.Session session = null;

        try {
            connection = this.factory.createConnection();
            connection.start();

            // Create a Session
            session = connection.createSession(false, javax.jms.Session.AUTO_ACKNOWLEDGE);

            // Create a MessageProducer from the Session to the Topic or Queue
            MessageProducer producer = session.createProducer(this.sendEmailQueue);
            producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);

            // Create a message
            Message message = session.createMessage();
            message.setStringProperty("sessionName", this.emailSessionName);
            message.setStringProperty("to", userAccount);
            message.setStringProperty("subject", "Did you asked for a new user?");
            message.setStringProperty("text", "If you did, simply reply to this email to get it activated.\n" +
                    "Do not change the text below.\n" +
                    "{activateUser:" + userAccount + ":" + key + "}");

            // Tell the producer to send the message
            producer.send(message);
        } finally {
            // Clean up
            if (session != null) {
                session.close();
            }
            if (connection != null) {
                connection.close();
            }
        }
    }

    public User createUser(String name, String account, String password, Set<String> groups, Boolean enabled) {
        final CreateUser createUser = new CreateUser();
        createUser.name = name;
        createUser.account = account;

        createUser.salt = this.encrypt.generateSalt();
        if (password == null) {
            createUser.password = this.encrypt.encryptString("", createUser.salt);
        } else {
            createUser.password = this.encrypt.encryptString(password, createUser.salt);
        }
        createUser.enabled = enabled;
        createUser.groups = groups;

        final User user = this.baseEAO.execute(createUser);
        if (!user.getEnabled()) {
            final CreateUserConfirmation createConfirmation = new CreateUserConfirmation();
            createConfirmation.key = this.encrypt.getRandomString();
            createConfirmation.user = user;
            final UserConfirmation confirmation = this.baseEAO.execute(createConfirmation);

            try {
                sendConfirmationEmail(user.getAccount(), confirmation.getKey());
            } catch (Exception e) {
                LOG.error("Impossible to send email to confirm new user account", e);
            }
        }
        return user;
    }

    public User saveUser(Long id, String name, String account, String password, Set<String> groups) {
        if (id == null) {
            return createUser(name, account, password, groups, true);
        }
        final User user = getUserById(id);
        if (user == null) {
            return null;
        }
        user.setName(name);
        user.setAccount(account);
        user.getSecurityGroups().clear();
        if (groups != null) {
            user.getSecurityGroups().addAll(groups);
        }
        if (!"".equals(password)) {
            final byte[] salt = this.encrypt.generateSalt();
            user.setSalt(salt);
            user.setPassword(this.encrypt.encryptString(password, salt));
        }
        return user;
    }

    public User getUser(String name) {
        final FindByStringField<User> find = new FindByStringField<User>(User.class, "account");
        find.value = name;
        return this.baseEAO.execute(find);
    }

    public User getUserById(Long id) {
        return this.baseEAO.find(User.class, id);
    }

    public void deleteUser(Long id) {
        final User user = getUserById(id);
        if (user == null) {
            return;
        }
        this.baseEAO.delete(user);
    }

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
    public List<User> listAll() {
        return this.baseEAO.findAll(User.class);
    }

    public void addGroupToUser(String userAccount, String userPassword, String group) {
        final User user = this.getUser(userAccount);
        if (user == null) {
            // no-op
            return;
        }
        if (this.encrypt.areEquivalent(userPassword, user.getPassword(), user.getSalt())) {
            final Set<String> groups = user.getSecurityGroups();
            groups.add(group);
        }
    }
}
