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

package faceid.rest

import faceid.data.dto.SessionDataDto

import javax.servlet.http.HttpServletRequest
import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.core.Context

@Path("/keep-alive")
class KeepAlive {

    @GET
    static SessionDataDto ping(@Context HttpServletRequest request) {
        def session = request.getSession()
        def principal = request.getUserPrincipal()
        def userName
        def logged
        if (principal) {
            userName = principal.getName()
            logged = true
        } else {
            userName = "guest"
            logged = false
        }
        new SessionDataDto(
                userName: userName,
                sessionId: session.id,
                logged: logged
        )
    }

}
