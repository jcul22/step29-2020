class Session { 
// To be utilized when unwrapping JSON from the future servlets. Will be on the 
// client side and be used as a buffer for client to server information needed  
// for other components of Virtual Movie Night.
 
    constructor() {
        this.sessionId = expected.sessionId;
        this.ipOfVM = expected.ipOfVM;
        this.listOfAttendees = expected.listOfAttendees;
        this.screenNameOfController = expected.screenNameOfController; 
    }
    
    setSessionId(id) { 
        this.sessionId = id;
    }

    setIpOfVM(ip) {
        this.ipOfVM = ip;
    }

    setListOfAttendees(attendees) {
        this.listOfAttendees = attendees;
    }

    setScreenNameOfController(controller) {
        this.screenNameOfController = controller;
    }

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
    
    static fromObject(obj) {  
        setSessionId(obj.sessionId);
        setIpOfVM(obj.ipOfVM);
        setListOfAttendees(obj.listOfAttendees);
        setScreenNameOfController(obj.ScreenNameOfController);
    }
    
}
export { Session };