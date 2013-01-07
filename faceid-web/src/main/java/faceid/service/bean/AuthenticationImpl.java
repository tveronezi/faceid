package faceid.service.bean;

import faceid.data.entity.AuthenticationLog;
import faceid.data.entity.AuthenticationLogType;
import faceid.data.entity.User;
import faceid.data.execution.BaseEAO;
import faceid.data.execution.command.FindAllAuthenticationLog;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.Date;
import java.util.List;

@Stateless
public class AuthenticationImpl {
    @EJB
    private BaseEAO baseEAO;

    @EJB
    private UserImpl userSrv;

    public Boolean authenticate(String account, String password) {
        final AuthenticationLog log = new AuthenticationLog();
        log.setAccount(account);
        log.setDate(new Date());
        log.setLogType(AuthenticationLogType.SUCCESS);

        final User user = this.userSrv.getUser(account);
        if (user == null) {
            log.setLogType(AuthenticationLogType.BAD_USER);
        } else if (!user.getPassword().equals(password)) {
            log.setLogType(AuthenticationLogType.BAD_PASSWORD);
        }

        this.baseEAO.create(log);
        return AuthenticationLogType.SUCCESS.equals(log.getLogType());
    }

    public List<AuthenticationLog> getLog() {
        return this.baseEAO.execute(new FindAllAuthenticationLog());
    }
}
