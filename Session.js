// To be utilized when unwrapping JSON from the future servlets. Will be on the 
// client side and be used as a buffer for client to server information needed  
// for other components of Virtual Movie Night.
class Session { 
    constructor(sessionId, ipOfVM, listOfAttendees, screenNameOfController) { 
    /** @private {string} */
        this.sessionId = sessionId ;

    /** @private {string} */
        this.ipOfVM = ipOfVM;

    /** @private {string} */
        this.listOfAttendees = listOfAttendees;

    /** @private  {string} */
        this.screenNameOfController = screenNameOfController ; 
    
    } // end of constructor

    getSessionId() {
        return this.sessionId;
    } 

    getIpOfVM() {
        return this.ipOfVM;
    } 

    getListOfAttendees() { 
       return this.listOfAttendees;    
    }
    
    getScreenNameOfController() {
       return this.screenNameOfController; 
    }
/**
   * @param {Session} obj A Session object must be passed so that the function 
     can utilize the setters to set the variables of the object
   */    
    static fromObject(obj) {   
        const session = new Session();
        session.sessionId = obj.sessionId;
        session.ipOfVM = obj.ipOfVM;
        session.listOfAttendees = obj.listOfAttendees;
        sess.screenNameOfController = obj.screenNameOfController;
        return session;
    }
    
}
export { Session };