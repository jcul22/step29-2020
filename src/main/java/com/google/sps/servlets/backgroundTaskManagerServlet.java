package com.google.sps.servlets;

import java.util.Date;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.sps.data.DatastoreClientInterface;
import com.google.sps.data.DatastoreClient;
import com.google.sps.data.backgroundTaskManagerInterface;

 


/** Servlet that removes things items from the data store  TODO: modify this file to handle comments data */
@WebServlet("/data")
public class backgroundTaskManagerServlet implements backgroundTaskManagerInterface{
@Override
void deleteInstances(){
    throw new RuntimeException("Unimplemented");
} 
@Override
void replaceFaultyInstances(){
    throw new RuntimeException("Unimplemented");
}
@Override
void updateInstances(){
    throw new RuntimeException("Unimplemented");
}
//  @Override
//   public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException { 
//     DatastoreClientInterface datastore = new DatastoreClient();
//     AttendeeInterface attendee = new Attendee();
//     java.util.Date date = new Date();
//     date = date.setTime(); 
//     String<List> listOfAttendees = datastore.getAttendeesInSession(String sessionId);

//     for(int i = 0; i < listOfAttendees.length(); i++){
//         if(date - attendee.getTimeLastPolled  <= date){ 
//             listOfAttendees.remove(i);
//             datastore.deleteAttendee(String screenName);    
//         } 
//         if(date - attendee.get)
//     }
//   }
} 

