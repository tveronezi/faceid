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

import groovy.json.JsonOutput

import javax.ejb.Lock
import javax.ejb.LockType
import javax.websocket.Session

@javax.ejb.Singleton
class Connections {

    private Set<Session> sessions = []

    @Lock(LockType.WRITE)
    void addSession(Session session) {
        sessions << session
    }

    @Lock(LockType.WRITE)
    void removeSession(Session session) {
        sessions.remove(session)
    }

    @Lock(LockType.READ)
    void sendToAll(String typeName, def data) {
        String messageJson = JsonOutput.toJson([
                type: typeName,
                data: data
        ])
        sessions.each { session ->
            session.basicRemote.sendText(messageJson)
        }
    }

}
