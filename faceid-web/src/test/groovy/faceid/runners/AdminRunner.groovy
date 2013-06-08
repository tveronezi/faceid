package faceid.runners

import javax.annotation.security.RunAs
import javax.ejb.Stateless

@Stateless
@RunAs("solution-admin")
class AdminRunner {
    def run(callback) {
        callback()
    }
}
