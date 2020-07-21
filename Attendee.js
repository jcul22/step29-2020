// The Attendee class can be utilized to keep certain 
// information of the attendee, a class for the user 
// needed to be created in addition to the session class. 
// The test for this JS class file utilizes Jest.IO
class Attendee {
    constructor() {
    /** @private @const {string} */
        this.sessionId_;
    /** @private @const {string} */
        this.screenName_;
    /** @private @const {string} */
        this.timeLastPolled_;
    }
    /**
   * @param @private {string} id A string must be passed so that the function 
     can set it as the sessionId for the object
   */   
    setSessionId_(id) { 
        this.sessionId = id;
    }
    /**
   * @param @private {string} name A string must be passed so that the function 
     can set it as the screenName for the object
   */ 
    setScreenName_(name) {
        this.screenName = name;
    }
/**
   * @param @private {string} time A string (may be changed to an obj later) must be passed so that the function 
     can set it as the timeLastPolled for the object
   */ 
    setTimeLastPolled_(time) {
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
/**
   * @param {Attendee} obj An attendee object must be passed so that the function 
     can utilize the setters to set the variables of the object
   */ 
    static fromObject(obj) { 
        const attendee = new Attendee(); 
        attendee.setSessionId(obj.sessionId);
        attendee.setScreenName(obj.screenName);
        attendee.setListOfAttendees(obj.timeLastPolled);
        return attendee;
    }    
} 
export { Attendee };