package com.google.sps.data;

import java.util.Date;
import com.google.appengine.api.datastore.Entity;
import java.util.Optional;
import java.util.List;

/** Interface for the DatastoreManager class. */
public interface DatastoreManagerInterface {
    void addNewAttendee(String screenName, String sessionId);
    void addNewInstance(String instanceName, Optional<String> sessionId);
    void addNewSession(String sessionId,
        Optional<String> screenNameOfController, Optional<String> ipOfVM);
    void updateAttendee(String screenName, String sessionId);
    void updateStateOfInstance(String instanceName, String stateOfInstance);
    void updateSessionIdOfInstance(String instanceName, 
        Optional<String> sessionId);
    void updateControllerOfSession(String sessionId,
        String screenNameOfController);
    void updateIpOfVM(String sessionId, Optional<String> ipOfVM);
    void endSession(String sessionId);
    void stopInstance(String instanceName);
    void removeAttendee(String screenName,String sessionId);
    List<String> getListOfAttendeesInSession(String sessionId);
    List<String> getListOfInstance();
}