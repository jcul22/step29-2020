// The Attendee class can be utilized to keep certain 
// information of the attendee, a class for the user 
// needed to be created in addition to the session class. 
// The test for this JS class file utilizes Jest.IO
class Attendee {
    constructor(sessionId, screenName, timeLastPolled) {
    /** @private {string} */
        this.sessionId_ = sessionId;
    /** @private {string} */
        this.screenName_ = screenName;
    /** @private {string} */
        this.timeLastPolled_ = timeLastPolled;  
        
    } // end of constructor
    
    getSessionId() {
        return this.sessionId;
    }

    getScreenName() {
        return this.screenName;
    }

    getTimeLastPolled() {
        return this.timeLastPolled;
    }
/**
   * @param {Attendee} obj An attendee object must be passed so that the function 
     can utilize the setters to set the variables of the object
   */ 
    static fromObject(obj) { 
        const attendee = new Attendee(); 
        attendee.sessionId = obj.sessionId;
        attendee.screenName = obj.screenName;
        attendee.timeLastPolled = obj.timeLastPolled;
        return attendee;
    }    
} 
export { Attendee };