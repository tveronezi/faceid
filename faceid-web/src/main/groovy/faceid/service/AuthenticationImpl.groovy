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
import faceid.data.entity.AuthenticationLog
import faceid.data.entity.AuthenticationLogType

import javax.annotation.security.RolesAllowed
import javax.ejb.EJB
import javax.ejb.Stateless
import javax.inject.Inject

@Stateless
@RolesAllowed(value = 'solution-admin')
class AuthenticationImpl {
    @EJB
    private BaseEAO baseEAO

    @EJB
    private UserImpl userSrv

    @Inject
    private StringEncrypt encrypt

    Set<String> authenticate(String account, String password) {
        def log = new AuthenticationLog()
        log.account = account
        log.date = new Date()
        log.logType = AuthenticationLogType.SUCCESS

        def user = this.userSrv.getUser(account)
        Set<String> groups = null // null means "bad user or password"
        if (user == null) {
            log.logType = AuthenticationLogType.BAD_USER
        } else if (!this.encrypt.areEquivalent(password, user.password, user.salt)) {
            log.logType = AuthenticationLogType.BAD_PASSWORD
        } else if (!user.enabled) {
            log.logType = AuthenticationLogType.USER_DISABLED
        } else {
            groups = user.getSecurityGroups()
            if (groups == null) {
                groups = []
            }
        }

        this.baseEAO.execute({ em ->
            em.persist(log)
        })
        return groups
    }

    List<AuthenticationLog> getLog() {
        return this.baseEAO.findAll(AuthenticationLog)
    }
}
