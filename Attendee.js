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

    static fromObject(obj) { 
        const attendee = new Attendee(); 
        setSessionId(attendee.sessionId);
        setScreenName(attendee.screenName);
        setListOfAttendees(attendee.timeLastPolled);
        return attendee;
    }
    
} 
export { Attendee };