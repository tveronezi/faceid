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

import javax.ejb.Stateless
import javax.persistence.EntityManager
import javax.persistence.NoResultException
import javax.persistence.PersistenceContext
import javax.persistence.Query

@Stateless
class BaseEAO {

    @PersistenceContext(unitName = "userPU")
    private EntityManager em

    def execute(def closure) {
        return closure(em)
    }

    List findAll(Class beanCls) {
        def str = "SELECT e FROM ${beanCls.name} e"
        def query = em.createQuery(str)
        return query.resultList
    }

    private static def getSingleResult(Query query) {
        def result
        try {
            result = query.singleResult
        } catch (NoResultException ignored) {
            result = null
        }
        return result
    }

    def findUnique(def closure) {
        Query query = closure(em)
        return getSingleResult(query)
    }

    def findById(Class beanCls, Long uid) {
        def str = "SELECT e FROM ${beanCls.simpleName} e WHERE e.uid = :puid"
        def query = em.createQuery(str)
        query.setParameter('puid', uid)
        return getSingleResult(query)
    }

}
