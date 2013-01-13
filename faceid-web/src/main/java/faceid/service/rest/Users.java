package faceid.service.rest;

import faceid.data.dto.UserDto;
import faceid.data.entity.User;
import faceid.service.bean.DtoBuilderImpl;
import faceid.service.bean.UserImpl;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.*;
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

    @DELETE
    @Path("/{id}")
    @Produces("application/json")
    public Boolean deleteUser(@PathParam("id") Long id) {
        userService.deleteUser(id);
        return Boolean.TRUE;
    }

    @POST
    @Produces("application/json")
    @Consumes("application/json")
    public UserDto postUser(UserDto userDto) {
        return saveUser(userDto);
    }

    @PUT
    @Path("/{id}")
    @Produces("application/json")
    @Consumes("application/json")
    public UserDto putUser(UserDto userDto) {
        return saveUser(userDto);
    }


    private UserDto saveUser(UserDto userDto) {
        final User user = userService.saveUser(
                userDto.getId(),
                userDto.getName(),
                userDto.getAccount(),
                userDto.getPassword()
        );
        return dtoBuilder.buildUser(user);
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
