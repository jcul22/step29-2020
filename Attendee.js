// The Attendee class can be utililized to keep certain information of the attendee, 
// a class for the user needed to be created in addition to the session class. 
// The test for this JS class file utilizes Jest.IO

class Attendee {
    constructor() {
        this.sessionId = expected.sessionId;
        this.controllerStatus = expected.controllerStatus;
        this.attendeeIp = expected.attendeeIp;
    }
        
    setSessionId(id) { 
        this.sessionId = id;
    }

    setControllerStatus(status) {
        this.controllerStatus = status;
    }

    setAttendeeIp(ip) {
        this.attendeeIp = ip;
    }

    getScreenName() {
        return this.screenName;
    }
    
    getControllerStatus() {
        return this.controllerStatus;
    }
    
    getUserIp() {
        return this.attendeeIp;
    }
    static fromAttendee() { 
        newAttendee = new Attendee();
        setSessionId();
        setUserIp();
        setControllerStatus();
        return newAttendee;
    }
    static fromObject(obj) {  
        setSessionId(obj.sessionId);
        setIpOfVM(obj.controllerStatus);
        setListOfAttendees(obj.attendeeIp);
    }
    
} 
export { Attendee };