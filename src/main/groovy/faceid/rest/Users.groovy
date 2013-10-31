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

import faceid.cdi.util.DtoBuilder
import faceid.data.dto.UserDto
import faceid.service.UserImpl

import javax.ejb.EJB
import javax.inject.Inject
import javax.ws.rs.*

@Path("/users")
class Users {

    @EJB
    private UserImpl userService

    @Inject
    private DtoBuilder dtoBuilder

    @GET
    @Path("/{id}")
    @Produces("application/json")
    UserDto getUser(@PathParam("id") Long id) {
        def user = userService.getUserById(id)
        if (user) {
            dtoBuilder.buildUser(user)
        }
    }

    @DELETE
    @Path("/{id}")
    @Produces("application/json")
    Boolean deleteUser(@PathParam("id") Long id) {
        userService.deleteUser(id)
        Boolean.TRUE
    }

    @POST
    @Produces("application/json")
    @Consumes("application/json")
    UserDto postUser(UserDto userDto) {
        saveUser(userDto)
    }

    @PUT
    @Path("/{id}")
    @Produces("application/json")
    @Consumes("application/json")
    UserDto putUser(UserDto userDto) {
        saveUser(userDto)
    }

    private UserDto saveUser(UserDto userDto) {
        def strGroups = userDto.groups ?: ""
        def arrGroups = strGroups.split(",")
        def groups = new HashSet<String>()
        arrGroups.each {
            def trimmed = it.trim()
            if ("" != trimmed) {
                groups << trimmed
            }
        }
        def user = userService.saveUser(
                userDto.id,
                userDto.name,
                userDto.account,
                userDto.password,
                groups
        )
        dtoBuilder.buildUser(user)
    }

    @GET
    @Produces("application/json")
    List<UserDto> list() {
        def users = userService.listAll()
        users.collect { dtoBuilder.buildUser(it) }
    }
}
