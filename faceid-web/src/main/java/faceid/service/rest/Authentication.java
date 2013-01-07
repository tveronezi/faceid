package faceid.service.rest;

import faceid.data.dto.AuthenticationDto;
import faceid.data.entity.AuthenticationLog;
import faceid.service.bean.AuthenticationImpl;
import faceid.service.bean.DtoBuilderImpl;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.ArrayList;
import java.util.List;

@Path("/authentication")
public class Authentication {

    @EJB
    private AuthenticationImpl authSrv;

    @Inject
    private DtoBuilderImpl dtoBuilder;

    @POST
    @Produces("application/json")
    public Boolean authenticate(@FormParam("account") String account, @FormParam("password") String password) {
        return this.authSrv.authenticate(account, password);
    }

    @GET
    @Produces("application/json")
    public List<AuthenticationDto> listLog() {
        final List<AuthenticationDto> result = new ArrayList<AuthenticationDto>();
        final List<AuthenticationLog> log = this.authSrv.getLog();
        for (AuthenticationLog entry : log) {
            result.add(this.dtoBuilder.buildAuthenticationLog(entry));
        }
        return result;
    }
}
