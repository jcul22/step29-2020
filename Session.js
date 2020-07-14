class Session { 
// To be utilized when unwrapping JSON from the future servlets. Will be on the client side and be used as a buffer  
// for client to server information needed for other components of Virtual Movie Night.
 
    constructor(sessionId) {
        this.sessionId = sessionId;
    }
    constructor(instanceIp) {
        this.instanceIp = instanceIp;
    } 
    constructor(listOfAttendees){
        this.listOfAttendees = listOfAttendees;
    }
    
    constructor(controllerIp){
        this.controllerIp = controllerIp;
    }


    
    get SessionId() {
        return sessionId;
    } 

    get InstanceIp() {
        return instnaceIp;
    } 

    get ControllerIp() {
        return controllerIp; 
    } 

    get ListofAttendees() { 
        return listOfAttendees;
    } 
}

export { Session };