package faceid.service.bean;


import faceid.data.entity.User;
import faceid.data.execution.BaseEAO;
import faceid.data.execution.command.CreateUser;
import faceid.data.execution.command.FindByStringField;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

@Stateless
public class UserImpl {
    @EJB
    private BaseEAO baseEAO;

    public User createUser(String name, String account, String password) {
        final CreateUser cmd = new CreateUser();
        cmd.name = name;
        cmd.account = account;
        cmd.password = password;
        return this.baseEAO.execute(cmd);
    }

    public User getUser(String name) {
        final FindByStringField<User> find = new FindByStringField<User>(User.class, "name");
        find.value = name;
        return this.baseEAO.execute(find);
    }

    public User getUserById(Long id) {
        return this.baseEAO.find(User.class, id);
    }

    public List<User> listAll() {
        return this.baseEAO.findAll(User.class);
    }
}
