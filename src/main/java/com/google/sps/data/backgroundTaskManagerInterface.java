package com.google.sps.data;
import java.util.Optional;
import java.util.List;

/** Interface for the backgroundTaskManager class. */
public interface backgroundTaskManagerInterface { 
/**
   * Checks VM status to make sure they are healthy. 
   */
    void checkVM();
/**
   * Removes attendee if they haven't been polled in 2 minutes.
   * Nothing associated with if the attendee is the controller.  
   */
    void removeAttendee(); 
 /**
   * Finds or creates a replacement VM after a VM's status is checked.
   */
   void replaceVM();
}