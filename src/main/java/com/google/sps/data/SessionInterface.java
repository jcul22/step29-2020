package com.google.sps.data;

import com.google.appengine.api.datastore.Entity;
import java.util.Optional;

/** Interface for the Session class. */
public interface SessionInterface{
  String getSessionId();
  Optional<String> getScreenNameOfController();
  Optional<String> getIpOfVM();
  // Compares a SessionInterface to itself. 
  boolean isEqualTo(SessionInterface session);
  // Returns a new Entity from a SessionInterface object.
  Entity toEntity();
}