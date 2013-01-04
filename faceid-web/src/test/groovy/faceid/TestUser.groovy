package faceid

import junit.framework.Assert
import org.junit.Before
import org.junit.Test

import javax.ejb.EJBException
import javax.ejb.embeddable.EJBContainer

class TestUser {
    private EJBContainer container

    @Before
    public void setUp() throws Exception {
        def p = [:] as Properties
        this.container = EJBContainer.createEJBContainer(p)
    }

    @Test
    void testCreateUser() {
        def context = this.container.context

        try {
            def service = context.lookup('java:global/faceid-web/UserServiceImpl')
            service.createUser('michael', 'jackson', 'bad')
            try {
                service.createUser('michael', 'jackson', 'bad')
                Assert.fail()
            } catch (EJBException e) {
                // expected
            }
        } finally {
            context.close()
        }
    }
}
