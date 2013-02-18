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

import faceid.data.entity.User;
import faceid.data.execution.BaseEAO;
import faceid.data.execution.command.CreateUser;
import faceid.data.execution.command.FindByStringField;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;
import java.util.Set;

@Stateless(name = "faceid-UserImpl")
public class UserImpl {
    @EJB
    private BaseEAO baseEAO;

    @EJB
    private StringEncryptImpl encrypt;

    public User createUser(String name, String account, String password, Set<String> groups) {
        final CreateUser cmd = new CreateUser();
        cmd.name = name;
        cmd.account = account;

        cmd.salt = this.encrypt.generateSalt();
        if (password == null) {
            cmd.password = this.encrypt.encryptString("", cmd.salt);
        } else {
            cmd.password = this.encrypt.encryptString(password, cmd.salt);
        }

        cmd.groups = groups;
        return this.baseEAO.execute(cmd);
    }

    public User saveUser(Long id, String name, String account, String password, Set<String> groups) {
        if (id == null) {
            return createUser(name, account, password, groups);
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

    public List<User> listAll() {
        return this.baseEAO.findAll(User.class);
    }
}
