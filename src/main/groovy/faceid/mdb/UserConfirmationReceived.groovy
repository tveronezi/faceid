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

package faceid.mdb

import faceid.service.UserImpl
import org.slf4j.LoggerFactory

import javax.annotation.security.RunAs
import javax.ejb.EJB
import javax.ejb.MessageDriven
import javax.jms.Message
import javax.jms.MessageListener

@MessageDriven(mappedName = 'IncomingEmailQueue', messageListenerInterface = MessageListener)
@RunAs('solution-admin')
class UserConfirmationReceived implements MessageListener {

    private static final def LOG = LoggerFactory.getLogger(UserConfirmationReceived)

    @EJB
    private UserImpl userSrv

    private void confirmUser(String from, String content) {
        userSrv.confirmUser(from, content)
    }

    @SuppressWarnings('CatchException')
    @Override
    void onMessage(Message txtMsg) {
        if (LOG.isInfoEnabled()) {
            LOG.info("User confirmation received")
        }
        try {
            def from = txtMsg.getStringProperty("from")
            def content = txtMsg.getStringProperty("content")
            confirmUser(from, content)
        } catch (Exception e) {
            LOG.error("Error while processing 'add user' message", e)
        }
    }
}

