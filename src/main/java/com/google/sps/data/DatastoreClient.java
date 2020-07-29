package com.google.sps.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
//import com.google.appengine.api.datastore.PreparedQuery.TooManyResultsException;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/** Class that reads from and writes to Datastore. */
public class DatastoreClient implements DatastoreClientInterface {
  /** 
   * Adds an attendeeInterface object to the Datastore. If object already
   * exist, the old one is replaced. 
   */
  public void insertOrUpdateAttendee(AttendeeInterface attendee) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(attendee.toEntity());
  }

  /** 
   * Adds an InstanceInterface object to the Datastore. If object already
   * exist, the old one with be replaced. 
   */
  public void insertOrUpdateInstance(InstanceInterface instance) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(instance.toEntity());
  }
  /** 
   * Adds an SessionInterface object to the Datastore. If object already
   * exist, the old one is replaced. 
   */
  public void insertOrUpdateSession(SessionInterface session) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(session.toEntity());
  }

  /** Returns the Session object associated with given sessionId. */
  public Optional<Session> getSession(String sessionId) throws Exception {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query getSession = new Query(EntityConstants.SessionEntity.SESSION_ID)
      .setFilter(new FilterPredicate(EntityConstants.SessionEntity.SESSION_ID,
      FilterOperator.EQUAL, sessionId));
    PreparedQuery pq = datastore.prepare(getSession);
    Entity sessionEntity = pq.asSingleEntity();
    return Optional.of(Session.fromEntity(sessionEntity));
  }

   /** Returns the Instance object associated with given instanceName. */  
  public Optional<Instance> getInstance(String instanceName) throws Exception {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query getInstance = new Query(EntityConstants.InstanceEntity.TABLE_NAME)
      .setFilter(new FilterPredicate
      (EntityConstants.InstanceEntity.INSTANCE_NAME, 
      FilterOperator.EQUAL, instanceName));
    PreparedQuery pq = datastore.prepare(getInstance);
    Entity instanceEntity = pq.asSingleEntity();
    return Optional.of(Instance.fromEntity(instanceEntity));
   }

  /** Returns the Attendee object associated with given screenName. */  
  public Optional<Attendee> getAttendee(String screenName) throws Exception {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query getAttendee = new Query(EntityConstants.AttendeeEntity.TABLE_NAME)
      .setFilter(new FilterPredicate
      (EntityConstants.AttendeeEntity.SCREEN_NAME,
      FilterOperator.EQUAL, screenName));
    PreparedQuery pq = datastore.prepare(getAttendee);
    Entity attendeeEntity = pq.asSingleEntity();
    return Optional.of(Attendee.fromEntity(attendeeEntity));
   }

  /** Deletes an attendee from the datastore. */
  public void deleteAttendee(String screenName) throws Exception {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query getAttendee = new Query(EntityConstants.AttendeeEntity.TABLE_NAME)
      .setFilter(new FilterPredicate
      (EntityConstants.AttendeeEntity.SCREEN_NAME,
      FilterOperator.EQUAL, screenName));
    PreparedQuery pq = datastore.prepare(getAttendee);
    Entity attendeeEntity = pq.asSingleEntity();
    datastore.delete(attendeeEntity.getKey());
    }

  /** Returns a list of attendees in a session. */
  public Optional<List<String>> getListOfAttendeesInSession
    (String sessionId) throws Exception {
      DatastoreService datastore = 
        DatastoreServiceFactory.getDatastoreService();
      Query query = new Query(EntityConstants.AttendeeEntity.TABLE_NAME)
        .setFilter(new FilterPredicate
        (EntityConstants.AttendeeEntity.SESSION_ID, FilterOperator.EQUAL, 
        sessionId));
      PreparedQuery results = datastore.prepare(query);
      List<String> attendeeList = new ArrayList<>();
      for (Entity attendeeEntity : results.asIterable()) {
        attendeeList.add((String) attendeeEntity.getProperty
        (EntityConstants.AttendeeEntity.SCREEN_NAME));
      }
      return Optional.of(attendeeList);
  }

  /** Returns a list of available instance. */
  public Optional<List<String>> getAvailableInstances() throws Exception {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query(EntityConstants.InstanceEntity.TABLE_NAME)
      .setFilter(new FilterPredicate(EntityConstants.InstanceEntity.STATE, 
      FilterOperator.EQUAL, "TERMINATED"));
    List<String> instanceList = new ArrayList<>();
    PreparedQuery results = datastore.prepare(query);
    for (Entity instanceEntity : results.asIterable()) {
      instanceList.add((String) instanceEntity.getProperty
        (EntityConstants.InstanceEntity.INSTANCE_NAME));
    }
    return Optional.of(instanceList);
  }
} 