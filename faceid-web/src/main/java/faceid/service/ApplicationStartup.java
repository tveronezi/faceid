package faceid.service;

import faceid.data.entity.User;
import faceid.service.bean.UserImpl;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;

@Singleton
@Startup
public class ApplicationStartup {
    @EJB
    private UserImpl userService;

    @PostConstruct
    public void applicationStartup() {
        createUser("michael", "michael", "bad");
        createUser("eddie", "eddie", "jump");
        createUser("paul", "paul", "michelle");
        createUser("andreas", "andreas", "roots");
    }

    private void createUser(String name, String account, String pass) {
        User usr = userService.getUser(name);
        if (usr != null) {
            return;
        }
        this.userService.createUser(name, account, pass);
    }
}
