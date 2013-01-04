package faceid.service.rest;

import faceid.data.dto.UserDto;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.ArrayList;
import java.util.List;

@Path("/users")
public class Users {

    @GET
    @Path("/list")
    @Produces("application/json")
    public List<UserDto> list() {
        final List<UserDto> result = new ArrayList<UserDto>();
        return result;
    }
}
