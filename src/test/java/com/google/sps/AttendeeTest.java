import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import org.junit.After;
import org.junit.Before;
import com.google.sps.data.Attendee;

@RunWith(JUnit4.class)

public class AttendeeTest {

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
  public void attendeeTester() {
    
    // Creates test data. 
    Date date = new Date();
    Attendee Test = new Attendee("12345", "Taniece", date);
    Entity testEntity = Test.toEntity(Test);
    Attendee newTestAttendee = Attendee.fromEntity(testEntity);

    // Test if the constructors return the right values
    Assert.assertEquals("12345", Test.getSessionId());
    Assert.assertEquals("Taniece", Test.getScreenName());
    Assert.assertEquals(date, Test.getTimeLastPolled());
    
    // Test if the two Attendee objects are equal
    Assert.assertTrue(Test.isEqual(newTestAttendee));
  }
}