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

package faceid.service;

import faceid.service.bean.UserImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.security.RunAs;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.jms.Message;
import javax.jms.TextMessage;
import java.util.HashSet;
import java.util.Set;

@Stateless
@RunAs("solution-admin")
public class Sudo {

    private static final Logger LOG = LoggerFactory.getLogger(Sudo.class);

    @EJB
    private UserImpl userSrv;

    public void createUserFromMessage(Message message) {
        try {
            final String subject = message.getStringProperty("subject");
            if (subject == null || !"createUser".equals(subject.trim())) {
                // NO-OP
                return;
            }

            final TextMessage txt = (TextMessage) message;
            final String from = txt.getStringProperty("from");
            String body = txt.getText();
            if (body == null) {
                body = "";
            } else {
                body = body.trim();
                body = body.split("\\s")[0];
            }

            String userName;
            if ("".equals(body)) {
                userName = from;
            } else {
                userName = body;
            }

            // TODO: add some logic in here
            final Set<String> groups = new HashSet<String>();
            groups.add("photo-user");
            this.userSrv.createUser(userName, userName, "1234", groups);
        } catch (Exception e) {
            LOG.error("Error while processing 'add user' message", e);
        }
    }
}
