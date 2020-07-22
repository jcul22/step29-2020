import { Session } from './Session';

test('Check for correct value of sessionId', () => {
    sessionId_ = "LYW23902"; 
    ipOfVM_ = "122.01.231.25"; 
    listOfAttendees_ = ["Jasmine", "Taniece", "Chris"];
    screenNameofController = "Jaz";
    const sess = new Session(sessionId, ipOfVM, listOfAttendees, screenNameofController);  
    const id = sess.getSessionId();
    expect(id).toBe(sess.sessionId); 
}); 

test('Check for correct value of instanceIp', () => {
    sessionId_ = "LYW23902"; 
    ipOfVM_ = "122.01.231.25"; 
    listOfAttendees_ = ["Jasmine", "Taniece", "Chris"]; 
    screenNameofController = "Jaz";
    const sess = new Session(sessionId, ipOfVM, listOfAttendees, screenNameofController);
    const ip = sess.getIpOfVM();
    expect(ip).toBe(sess.ipOfVM);
}); 

test('Check for correct value of listOfAttendees', () => {
    sessionId_ = "LYW23902"; 
    ipOfVM_ = "122.01.231.25";
    listOfAttendees_ = ["Jasmine", "Taniece", "Chris"];
    const sess = new Session(sessionId, ipOfVM, listOfAttendees, screenNameofController); 
    const list = sess.getListOfAttendees; 
    expect(list).toBe(sess.listOfAttendees);
}); 

test('Check for correct value of screenNameOfController', () => {
    sessionId_ = "LYW23902"; 
    ipOfVM_ = "122.01.231.25";
    listOfAttendees_ = ["Jasmine", "Taniece", "Chris"];
    screenNameofController = "Jaz"
    const sess = new Session(sessionId, ipOfVM, listOfAttendees, screenNameofController); 
    const name = sess.getScreenNameOfController; 
    expect(name).toBe(sess.screenNameOfController);
});

test('Check for correct value of fromObject', () => {
    sess.sessionId_ = "LYW23902";
    ipOfVM = "122.01.231.25"; 
    sess.listOfAttendees_ = ["Jasmine", "Taniece", "Chris"];
    const obj = new Session(sessionId, ipOfVM, listOfAttendees); 
    sess.fromObject(obj);
});