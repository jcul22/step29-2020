class Session { 
// To be utilized when unwrapping JSON from the future servlets. Will be on the client side and be used as a buffer  
// for client to server information needed for other components of Virtual Movie Night.
 
    constructor() {
        const expected = {
            sessionId: 'JTC6',
            screenNameOfController: 'chris',
            ipOfVM: '01',
            listOfAttendees: ['chris', 'bryan']
            };
        this.sessionId = expected.sessionId;
        this.ipOfVM = expected.ipOfVM;
        this.listOfAttendees = expected.listOfAttendees;
        this.screenNameOfController = expected.screenNameOfController; 
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
    
    getScreenNameOfController(){
       return this.screenNameOfController; 
    }
    
}
export { Session };