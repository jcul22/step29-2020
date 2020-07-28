package com.google.sps.data;

import static com.google.appengine.api.datastore.FetchOptions.Builder.withLimit;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import com.google.appengine.api.datastore.Entity;
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
//import static org.mockito.Mockito.*;

public class DatastoreClientTest  {
  //Class to be tested
  private DatastoreClientInterface DatastoreClientInterface;

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
  public void testInstance() {
    Optional<String> sessionId = Optional.of("12345");
    InstanceInterface instance = new Instance("vm1","Running", sessionId);
    if (instance != null) {
    DatastoreClientInterface.insertOrUpdateInstance(instance);
    }
    /*
    try {
    instance1 = DatastoreClient.getInstance("vm1").get();
    } catch (Exception e) {
      System.out.println (e.getMessage());
    }
    System.out.println(instance1);
    Assert.assertFalse(instance1.equals(instance));
   */
  }
}

