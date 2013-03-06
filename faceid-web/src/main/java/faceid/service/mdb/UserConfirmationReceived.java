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

package faceid.service.mdb;

import faceid.service.bean.Sudo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.EJB;
import javax.ejb.MessageDriven;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

@MessageDriven(mappedName = "IncomingEmailQueue")
public class UserConfirmationReceived implements MessageListener {

    private static final Logger LOG = LoggerFactory.getLogger(UserConfirmationReceived.class);

    @EJB
    private Sudo sudo;

    @Override
    public void onMessage(Message message) {
        if (LOG.isInfoEnabled()) {
            LOG.info("User confirmation received");
        }

        try {
            final TextMessage txtMsg = (TextMessage) message;
            final String content = txtMsg.getText();
            this.sudo.confirmUser(content);
        } catch (Exception e) {
            LOG.error("Error while processing 'add user' message", e);
        }
    }
}
