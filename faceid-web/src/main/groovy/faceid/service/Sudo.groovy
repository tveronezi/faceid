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

import javax.annotation.security.RunAs
import javax.ejb.EJB
import javax.ejb.Stateless
import javax.jms.JMSException
import javax.jms.Message

@Stateless(name = 'FaceID-Sudo')
@RunAs('solution-admin')
class Sudo {

    @EJB
    private UserImpl userSrv

    void createUserFromMessage(Message message) throws JMSException {
        def userAccount = message.getStringProperty('userAccount')
        def userPassword = message.getStringProperty('userPassword')
        def group = message.getStringProperty('userGroup')
        def existing = this.userSrv.getUser(userAccount)
        if (existing) {
            this.userSrv.addGroupToUser(userAccount, userPassword, group)
        } else {
            String userName = message.getStringProperty('userName')
            Set<String> groups = []
            groups.add(group)
            this.userSrv.createUser(userName, userAccount, userPassword, groups, false)
        }
    }

    public void confirmUser(String from, String content) {
        this.userSrv.confirmUser(from, content)
    }
}
