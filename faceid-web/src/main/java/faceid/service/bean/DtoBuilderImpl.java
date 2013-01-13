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

import faceid.data.dto.AuthenticationDto;
import faceid.data.dto.UserDto;
import faceid.data.entity.AuthenticationLog;
import faceid.data.entity.User;

import javax.ejb.Singleton;

@Singleton(name = "faceid-DtoBuilderImpl")
public class DtoBuilderImpl {

    public UserDto buildUser(User user) {
        if (user == null) {
            return null;
        }
        final UserDto result = new UserDto();
        result.setId(user.getUid());
        result.setName(user.getName());
        result.setAccount(user.getAccount());
        return result;
    }

    public AuthenticationDto buildAuthenticationLog(AuthenticationLog log) {
        if (log == null) {
            return null;
        }
        final AuthenticationDto result = new AuthenticationDto();
        result.setId(log.getUid());
        result.setAccount(log.getAccount());
        result.setTimestamp(log.getDate().getTime());
        result.setType(log.getLogType().name());
        return result;
    }
}
