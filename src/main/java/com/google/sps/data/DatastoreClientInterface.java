package com.google.sps.data;

import java.util.Date;
import com.google.appengine.api.datastore.Entity;
import java.util.Optional;
import java.util.List;

/** Interface for the DatastoreClient class. */
public interface DatastoreClientInterface {
  // Adds an attendeeInterface object to the Datastore. 
  // If object already exist, the old one is replaced. 
  void insertOrUpdateAttendee(AttendeeInterface attendee);
  // Adds an InstanceInterface object to the Datastore.
  // If object already exist, the old one is replaced. 
  void insertOrUpdateInstance(InstanceInterface instance);
  // Adds an SessionInterface object to the Datastore.
  // If object already exist, the old one is replaced. 
  void insertOrUpdateSession(SessionInterface session);
   // Returns the Session object associated with the given sessionId.
  Optional<Session> getSession(String sessionId) throws Exception;
  // Returns the Instance object associated with the given instanceName.
  Optional<Instance> getInstance(String instanceName) throws Exception;
  // Returns the Attendee object associated with the given screenName.
  Optional<Attendee> getAttendee(String screenName) throws Exception;
  // Deletes an attendee from Datastore.
  void deleteAttendee(String screenName) throws Exception;
  // Returns a list of attendees in a session.
  Optional<List<String>> getAttendeesInSession(String sessionId) throws Exception;
  // Returns a list of available instances.
  Optional<List<String>> getAvailableInstances() throws Exception;
}