// The Attendee class can be utililized to keep certain information of the attendee, 
// a class for the user needed to be created in addition to the session class. 
// The test for this JS class file utilizes Jest.IO

class Attendee {
    constructor() {
        this.sessionId;
        this.screenName;
        this.TimeLastPolled;
    }
        
    setSessionId(id) { 
        this.sessionId = id;
    }

    setScreenName(name) {
        this.screenName = name;
    }

    setTimeLastPolled(time) {
        this.timeLastPolled = time;
    }

    getSessionId() {
        return this.sessionId;
    }

    getScreenName() {
        return this.screenName;
    }

    getTimeLastPolled() {
        return this.timeLastPolled;
    }

    obj = new Session();
    static fromObject(obj) {  
        setSessionId(obj.sessionId);
        setScreenName(obj.screenName);
        setListOfAttendees(obj.timeLastPolled);
    }
    
} 
export { Attendee };