package web

import web.rest.Users

import javax.ws.rs.ApplicationPath

@ApplicationPath('/rest')
class ApplicationConfig {
    public Set<Class<?>> getClasses() {
        return new HashSet<Class<?>>(Arrays.asList(Users.class));
    }
}
