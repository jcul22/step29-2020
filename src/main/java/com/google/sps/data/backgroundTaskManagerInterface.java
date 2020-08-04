package com.google.sps.data;
import java.util.Optional;
import java.util.List;
import com.google.sps.data.backgroundTaskManagerServlet;

// Interface for the backgroundTaskManager class.
public interface backgroundTaskManagerInterface { 

    // Checks VM status to make sure they are healthy. 
    void updateInstances();
    
    // If attendee hasn't been polled, they will be 
    // removed from the session and the datastore.
    void deleteInactiveAttendees();

    // List all sessions and if an instance is not running 
    // for an active session, a replacement will be found or created.
    void replaceFaultyInstances();
}