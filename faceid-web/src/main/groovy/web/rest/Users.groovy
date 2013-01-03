package web.rest

import web.data.dto.UserDTO

import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces

@Path("/users")
class Users {

    @Path("/list")
    @Produces('application/json')
    @GET
    public List<UserDTO> list() {
        return []
    }

}
