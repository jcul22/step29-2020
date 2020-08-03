package com.google.sps;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import org.junit.After;
import org.junit.Before;
import com.google.sps.data.Instance;
import com.google.sps.data.InstanceInterface;
import java.util.Optional;

/** Class that test the methods in the BackgroundTaskManagerInterface class. */
@RunWith(JUnit4.class)
public class InstanceTest {
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
    BackgroundTaskManagerInterface backgroundManager = new backgroundManager();
    Assert.assertEquals(backgroundManager.updateInstances(), "Unimplemented");
    Assert.assertEquals(backgroundManager.deleteInactiveAttendees(), "Unimplemented");
    Assert.assertEquals(backgroundManager.replaceFaultyInstances(), "Unimplemented");
  }