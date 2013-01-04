package faceid.data.execution.command;

import faceid.data.entity.User;
import faceid.data.execution.BaseEAO;
import faceid.data.execution.DbCommand;

public class CreateUser implements DbCommand<User> {

    public String name;
    public String account;
    public String password;

    @Override
    public User execute(BaseEAO eao) {
        User user = new User();
        user.setName(this.name);
        user.setAccount(this.account);

        if (this.password == null) {
            user.setPassword("");
        } else {
            user.setPassword(this.password);
        }
        user = eao.create(user);
        return user;
    }
}
