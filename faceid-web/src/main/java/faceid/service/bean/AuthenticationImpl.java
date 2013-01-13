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

import faceid.data.entity.AuthenticationLog;
import faceid.data.entity.AuthenticationLogType;
import faceid.data.entity.User;
import faceid.data.execution.BaseEAO;
import faceid.data.execution.command.FindAllAuthenticationLog;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.Date;
import java.util.List;

@Stateless
public class AuthenticationImpl {
    @EJB
    private BaseEAO baseEAO;

    @EJB
    private UserImpl userSrv;

    public Boolean authenticate(String account, String password) {
        final AuthenticationLog log = new AuthenticationLog();
        log.setAccount(account);
        log.setDate(new Date());
        log.setLogType(AuthenticationLogType.SUCCESS);

        final User user = this.userSrv.getUser(account);
        if (user == null) {
            log.setLogType(AuthenticationLogType.BAD_USER);
        } else if (!user.getPassword().equals(password)) {
            log.setLogType(AuthenticationLogType.BAD_PASSWORD);
        }

        this.baseEAO.create(log);
        return AuthenticationLogType.SUCCESS.equals(log.getLogType());
    }

    public List<AuthenticationLog> getLog() {
        return this.baseEAO.execute(new FindAllAuthenticationLog());
    }
}
