package faceid.web.rest

import faceid.web.data.dto.UserDTO

import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.Produces

@Path("/users")
class Users {

    @Path("/list")
    @Produces('application/json')
    @GET
    public List<UserDTO> list() {
        return [
                new UserDTO(name: 'Michael Jackson', account: 'jackson'),
                new UserDTO(name: 'Paul McCartney', account: 'mccartney')
        ]
    }

}
