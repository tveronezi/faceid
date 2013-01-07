package faceid.service.bean;

import faceid.data.dto.AuthenticationDto;
import faceid.data.dto.UserDto;
import faceid.data.entity.AuthenticationLog;
import faceid.data.entity.User;

import javax.ejb.Singleton;

@Singleton
public class DtoBuilderImpl {

    public UserDto buildUser(User user) {
        if (user == null) {
            return null;
        }
        final UserDto result = new UserDto();
        result.setId(user.getUid());
        result.setName(user.getName());
        result.setAccount(user.getAccount());
        return result;
    }

    public AuthenticationDto buildAuthenticationLog(AuthenticationLog log) {
        if (log == null) {
            return null;
        }
        final AuthenticationDto result = new AuthenticationDto();
        result.setId(log.getUid());
        result.setAccount(log.getAccount());
        result.setTimestamp(log.getDate().getTime());
        result.setType(log.getLogType().name());
        return result;
    }
}
