package faceid.service.rest;

import faceid.data.dto.UserDto;
import faceid.data.entity.User;
import faceid.service.bean.DtoBuilderImpl;
import faceid.service.bean.UserImpl;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import java.util.ArrayList;
import java.util.List;

@Path("/users")
public class Users {

    @EJB
    private UserImpl userService;

    @Inject
    private DtoBuilderImpl dtoBuilder;

    @GET
    @Path("/{id}")
    @Produces("application/json")
    public UserDto getUser(@PathParam("id") Long id) {
        UserDto result = null;
        User user = userService.getUserById(id);
        if (user != null) {
            result = dtoBuilder.buildUser(user);
        }
        return result;
    }

    @GET
    @Produces("application/json")
    public List<UserDto> list() {
        final List<UserDto> result = new ArrayList<UserDto>();
        final List<User> users = userService.listAll();
        for (User user : users) {
            result.add(dtoBuilder.buildUser(user));
        }
        return result;
    }
}
