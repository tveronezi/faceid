package faceid.service.bean;

import faceid.data.entity.User;
import faceid.data.execution.BaseEAO;
import faceid.data.execution.command.CreateUser;
import faceid.data.execution.command.FindByStringField;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

@Stateless(name = "faceid-UserImpl")
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

    public User saveUser(Long id, String name, String account, String password) {
        if (id == null) {
            return createUser(name, account, password);
        }
        final User user = getUserById(id);
        if (user == null) {
            return null;
        }
        user.setName(name);
        user.setAccount(account);

        if (!"".equals(password)) {
            user.setPassword(password);
        }

        return user;
    }

    public User getUser(String name) {
        final FindByStringField<User> find = new FindByStringField<User>(User.class, "account");
        find.value = name;
        return this.baseEAO.execute(find);
    }

    public User getUserById(Long id) {
        return this.baseEAO.find(User.class, id);
    }

    public void deleteUser(Long id) {
        final User user = getUserById(id);
        if(user == null) {
            return;
        }
        this.baseEAO.delete(user);
    }

    public List<User> listAll() {
        return this.baseEAO.findAll(User.class);
    }
}
