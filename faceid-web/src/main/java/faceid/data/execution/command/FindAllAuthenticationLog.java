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

package faceid.data.execution.command;

import faceid.data.entity.AuthenticationLog;
import faceid.data.execution.BaseEAO;
import faceid.data.execution.DbCommand;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

public class FindAllAuthenticationLog implements DbCommand<List<AuthenticationLog>> {

    @Override
    public List<AuthenticationLog> execute(BaseEAO eao) {
        final CriteriaBuilder cb = eao.getCriteriaBuilder();
        final CriteriaQuery<AuthenticationLog> cq = cb.createQuery(AuthenticationLog.class);
        final Root<AuthenticationLog> root = cq.from(AuthenticationLog.class);
        cq.select(root);
        final TypedQuery<AuthenticationLog> q = eao.createQuery(cq);
        cq.orderBy(cb.desc(root.get("date")));
        return q.getResultList();
    }
}
