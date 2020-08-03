package com.google.sps.data;
import java.util.Optional;
import java.util.List;

// Interface for the backgroundTaskManager class.
public interface BackgroundTaskManagerInterface { 

    // Checks VM status to make sure they are healthy. 
    void updateInstances() {
        throw new Error("Unimplemented");
    }
    
    // If attendee hasn't been polled, they will be 
    // removed from the session and the datastore.
    void deleteInactiveAttendees() {
        throw new Error("Unimplemented");
    }

    // List all sessions and if an instance is not running 
    // for an active session, a replacement will be found or created.
    void replaceFaultyInstances() {
        throw new Error("Unimplemented"); 
    }
}