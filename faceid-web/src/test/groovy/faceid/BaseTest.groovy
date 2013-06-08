package faceid

import org.junit.After
import org.junit.Before

import javax.ejb.embeddable.EJBContainer

class BaseTest {

    def container

    @Before
    void setUp() {
        def p = new Properties()
        container = EJBContainer.createEJBContainer(p)
        container.context.bind("inject", this)
    }

    @After
    void tearDown() {
        container.close()
    }

}
