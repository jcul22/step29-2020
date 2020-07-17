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
import com.google.sps.data.AttendeeInterface;

@RunWith(JUnit4.class)

public class AttendeeTest {
  // Creates test data. 
  Date date = new Date();
  AttendeeInterface attendee = new Attendee("12345", "Taniece", date);

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
  // Test if the get constructors return the right values.
  public void testGetters() {
    Assert.assertEquals("12345", attendee.getSessionId());
    Assert.assertEquals("Taniece", attendee.getScreenName());
    Assert.assertEquals(date, attendee.getTimeLastPolled());
  }

  @Test
  // Test if object is the same after been converted to an entitty and back. 
  public void testConversionBetweenEntityAndAttendee() {
    Entity testEntity = attendee.toEntity();
    AttendeeInterface newAttendee = Attendee.fromEntity(testEntity);
    Assert.assertTrue(attendee.equals(newAttendee));
  }
}