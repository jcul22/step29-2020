class Session { 
// To be utilized when unwrapping JSON from the future servlets. Will be on the client side and be used as a buffer  
// for client to server information needed for other components of Virtual Movie Night.
 
    constructor() {
        this.sessionId;
        this.instanceIp;
        this.listOfAttendees;
        this.controllerIp;
    }
    
    getSessionId() {
        return this.sessionId;
    } 

    getInstanceIp() {
        return this.instanceIp;
    } 

    getListOfAttendees() { 
       return this.listOfAttendees;
    
        
    }
    
    getControllerIp() {
        return this.controllerIp; 
    } 
    
}
export { Session };