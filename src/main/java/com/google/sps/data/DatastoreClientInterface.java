package com.google.sps.data;

import java.util.Date;
import com.google.appengine.api.datastore.Entity;
import java.util.Optional;
import java.util.List;

/** Interface for the DatastoreClient class. */
public interface DatastoreClientInterface {
  /**
   * Adds an AttendeeInterface object to the Datastore. If object already
   * exist, the old one is replaced.  
   */
  void insertOrUpdateAttendee(AttendeeInterface attendee);

  /**
   * Adds an InstanceInterface object to the Datastore. If object already
   * exist, the old one is replaced. 
   */
  void insertOrUpdateInstance(InstanceInterface instance);

  /** 
   * Adds an SessionInterface object to the Datastore. If object already 
   * exist, the old one is replaced. 
   */
  void insertOrUpdateSession(SessionInterface session);

   /** 
    * Returns the Session object associated with the given sessionId. If 
    * return Optional is empty, then no object exists with given parameter.
    */
  Optional<Session> getSession(String sessionId);

  /**
   * Returns the Instance object associated with the given instanceName. If 
   * return Optional is empty, then no object exists with given parameter.
   */
  Optional<Instance> getInstance(String instanceName);

  /**
   * Returns the Attendee object associated with the given screenName. If
   * return Optional is empty, then no object exists with given parameter.
   */ 
  Optional<Attendee> getAttendee(String screenName);

  /* Deletes an attendee from Datastore. */
  void deleteAttendee(String screenName);

  /* Returns a list of attendees in a session. */
  List<Attendee> getAttendeesInSession(String sessionId);

  /* Returns a list of available instances. */
  List<Instance> getAvailableInstances();
}