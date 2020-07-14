package com.google.sps.data;

import java.util.Date;
import com.google.appengine.api.datastore.Entity;

/** Interface for the Attendee class. */
interface AttendeeInterface{
  
  String getSessionId();
  String getScreenName();
  Date getTimeLastPolled();
  boolean isEqual(Attendee x);
  Entity toEntity(Attendee attendee);
}



