package com.google.sps.data;

import static com.google.appengine.api.datastore.FetchOptions.Builder.withLimit;
//import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.Assert;
import org.junit.Test;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import org.junit.After;
import org.junit.Before;
import java.util.Date;
import java.util.Optional;
import com.google.sps.data.Attendee;
import com.google.sps.data.AttendeeInterface;
import com.google.sps.data.Session;
import com.google.sps.data.SessionInterface;
import com.google.sps.data.Instance;
import com.google.sps.data.InstanceInterface;
import com.google.sps.data.DatastoreClient;
import com.google.sps.data.DatastoreClientInterface;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/* Class that test the methods in DatastoreClient. */
public class DatastoreClientTest  {
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
  public void testAttendeeIsInsertedToDatastore() {
    // Tests that object is inserted to datastore.
    DatastoreClientInterface datastoreClient = new DatastoreClient();
    AttendeeInterface attendee = new Attendee("12345", "Taniece", new Date());
    datastoreClient.insertOrUpdateAttendee(attendee);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Assert.assertEquals(datastore.prepare(new Query
        (EntityConstants.AttendeeEntity.TABLE_NAME))
        .countEntities(withLimit(10)), 1);
    // Tests that getAttendee finds and returns attendee.
    AttendeeInterface attendee2 =
        datastoreClient.getAttendee("Taniece").get();
    Assert.assertEquals(attendee, attendee2);
    // Tests that existing attendees are updated after being modified.
    datastoreClient.insertOrUpdateAttendee(attendee2);
    Assert.assertEquals(datastore.prepare(new Query
        (EntityConstants.AttendeeEntity.TABLE_NAME))
        .countEntities(withLimit(10)), 1);
  }

  @Test
  public void testSessionIsInsertedToDatastore() {
    // Tests that object is inserted to datastore.
    DatastoreClientInterface datastoreClient = new DatastoreClient();
    SessionInterface session = new Session("12345", 
        Optional.of("Taniece"), Optional.of("12345"));
    datastoreClient.insertOrUpdateSession(session);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Assert.assertEquals(datastore.prepare(new Query
        (EntityConstants.SessionEntity.TABLE_NAME))
        .countEntities(withLimit(10)), 1);
    // Tests that getSession finds and returns session.
   SessionInterface session2 = datastoreClient.getSession("12345").get();  
    Assert.assertEquals(session, session2);
    // Tests that existing sessions are updated.
    session2.setIpOfVM("54321");
    datastoreClient.insertOrUpdateSession(session2);
    Assert.assertEquals(datastore.prepare(new Query
        (EntityConstants.SessionEntity.TABLE_NAME))
        .countEntities(withLimit(10)), 1);
  }

  @Test 
  public void testInstanceIsInsertedToDatastore() {
    // Tests that object is inserted to datastore.
    Optional<String> sessionId = Optional.of("12345");
    InstanceInterface instance = new Instance("vm1","Running", sessionId);
    DatastoreClientInterface datastoreClient  = new DatastoreClient();
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastoreClient.insertOrUpdateInstance(instance);
    Assert.assertEquals(datastore.prepare(new Query
        (EntityConstants.InstanceEntity.TABLE_NAME))
        .countEntities(withLimit(10)), 1); 
    // Tests that getInstance finds and returns instance.
    InstanceInterface instance1 = datastoreClient.getInstance("vm1").get();
    Assert.assertEquals(instance, instance1);
    // Tests that existing instances are updated after being modified.
    instance.setState("Stopped");
    datastoreClient.insertOrUpdateInstance(instance);
    DatastoreService data = DatastoreServiceFactory.getDatastoreService();
    Assert.assertEquals(data.prepare(new Query
        (EntityConstants.InstanceEntity.TABLE_NAME))
        .countEntities(withLimit(10)), 1);
  }

  @Test
  public void testAttendeesInASession() {
    // Tests that getAttendeesInSession return attendees in given session.
    DatastoreClientInterface datastoreClient = new DatastoreClient();
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    AttendeeInterface attendee1 = new Attendee("12345", "Taniece", new Date());
    AttendeeInterface attendee3 = new Attendee("54321", "Tan", new Date());
    AttendeeInterface attendee2 = new Attendee("12345", "Jasmine", new Date());
    AttendeeInterface attendee4 = new Attendee("12345", "Chris", new Date());
    datastoreClient.insertOrUpdateAttendee(attendee1);
    datastoreClient.insertOrUpdateAttendee(attendee2);
    datastoreClient.insertOrUpdateAttendee(attendee3);
    datastoreClient.insertOrUpdateAttendee(attendee4);
    Assert.assertEquals(datastore.prepare(new Query
        (EntityConstants.AttendeeEntity.TABLE_NAME))
        .countEntities(withLimit(10)), 4);
    List<Attendee> attendeeList = 
        datastoreClient.getAttendeesInSession("12345");
    Assert.assertEquals(attendeeList.size(), 3);
    // Tests deleteAttendee removes entity from datastore
    datastoreClient.deleteAttendee("Chris");
    List<Attendee> attendeeList2 = 
        datastoreClient.getAttendeesInSession("12345");
    Assert.assertEquals(datastore.prepare(new Query
        (EntityConstants.AttendeeEntity.TABLE_NAME))
        .countEntities(withLimit(10)), 3);
    Assert.assertEquals(attendeeList2.size(), 2);
  }

  @Test
  public void testAvailableInstances() {
    // Tests that getAvailableInstances returns the available instances.
    DatastoreClientInterface datastoreClient = new DatastoreClient();
    InstanceInterface instance1 = 
        new Instance("vm1","Running", Optional.of("12345"));
    InstanceInterface instance2 = 
        new Instance("vm2","Running", Optional.of("54321"));
    InstanceInterface instance3 = 
        new Instance("vm3","TERMINATED", Optional.of("98765"));
    datastoreClient.insertOrUpdateInstance(instance1);
    datastoreClient.insertOrUpdateInstance(instance2);
    datastoreClient.insertOrUpdateInstance(instance3);
    List<Instance> instanceList = datastoreClient.getAvailableInstances();
    Assert.assertEquals(instanceList.size(), 1);
    Assert.assertEquals(instanceList.get(0).getInstanceName(), "vm3");
  }
}