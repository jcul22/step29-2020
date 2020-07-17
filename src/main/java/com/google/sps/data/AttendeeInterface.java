package com.google.sps.data;

import java.util.Date;
import com.google.appengine.api.datastore.Entity;

/** Interface for the Attendee class. */
public interface AttendeeInterface {
  String getSessionId();
  String getScreenName();
  Date getTimeLastPolled();
  //Compares two objects to see if the values are the same.
  boolean isEqualTo(AttendeeInterface obj);
  //Returns a new Entity from an AttendeeInterface object.
  Entity toEntity();
}