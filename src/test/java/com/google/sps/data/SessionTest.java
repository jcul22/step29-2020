import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import org.junit.After;
import org.junit.Before;
import com.google.sps.data.Session;
import com.google.sps.data.SessionInterface;
import java.util.Optional;

/** Class that tests the methods in the Session class. */
@RunWith(JUnit4.class)
public class SessionTest {
  private final LocalServiceTestHelper helper =
  new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

  @Before
  public void setUp() {
   helper.setUp();
  }

  @After
  public void tearDown() {
   helper.tearDown();
  }

  @Test
  public void testGetter() {
    // Creates test data. 
    Optional<String> controllerStr = Optional.of("Taniece");
    Optional<String> vmStr = Optional.of( "VM1" );
    SessionInterface session = new Session("12345", controllerStr, vmStr);
    Assert.assertEquals(session.getSessionId(), "12345");
    Assert.assertEquals(session.getScreenNameOfController(), controllerStr);
    Assert.assertEquals(session.getIpOfVM(), vmStr);
  }
  
  // Test if Optional variables are converted properly.
  @Test
  public void testOptionalValues() {
    // Creates test data. 
    Optional<String> controllerStr = Optional.of("Taniece");
    Optional<String> vmStr = Optional.of( "VM1" );
    SessionInterface session = new Session("12345", controllerStr, vmStr);
    Assert.assertEquals(session.getScreenNameOfController().get(), "Taniece");
    Assert.assertEquals(session.getIpOfVM().get(), "VM1");
  }

  @Test
  public void testConversionBetweenEntityAnd() {
    // Creates test data. 
    Optional<String> controllerStr = Optional.of("Taniece");
    Optional<String> vmStr = Optional.of( "VM1" );
    SessionInterface session = new Session("12345", controllerStr, vmStr);
    Entity sessionEntity = session.toEntity();
    SessionInterface newSession = Session.fromEntity(sessionEntity);
    Assert.assertTrue(session.equals(newSession));
  }
}