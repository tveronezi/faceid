package faceid.service.rest;

import faceid.data.dto.AuthenticationDto;
import faceid.data.dto.UserDto;
import faceid.data.entity.User;
import faceid.service.bean.DtoBuilderImpl;
import faceid.service.bean.UserImpl;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.ArrayList;
import java.util.List;

@Path("/auth")
public class Authentication {

    @EJB
    private UserImpl userService;

    @Inject
    private DtoBuilderImpl dtoBuilder;

    @POST
    @Produces("application/json")
    public Boolean authenticate(@FormParam("account") String account, @FormParam("password") String password) {
        return Boolean.FALSE;
    }

    @GET
    @Produces("application/json")
    public List<AuthenticationDto> listLog() {
        final List<AuthenticationDto> result = new ArrayList<AuthenticationDto>();
        return result;
    }
}
