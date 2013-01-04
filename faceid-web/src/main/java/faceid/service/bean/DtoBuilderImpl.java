package faceid.service.bean;

import faceid.data.dto.UserDto;
import faceid.data.entity.User;

import javax.ejb.Singleton;

@Singleton
public class DtoBuilderImpl {

    public UserDto buildUser(User user) {
        if (user == null) {
            return null;
        }
        final UserDto result = new UserDto();
        result.setName(user.getName());
        return result;
    }
}
