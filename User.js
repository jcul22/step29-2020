//The User class can be utililized to keep certain information of the user, a class for the user needed to be 
// created in addition to the session class. The test for this JS class file utilizes Jest.IO

class User {
    constructor() {
        const expected = {
            sessionId: 'JTC6',
            controllerStatus = true,
            userIp = "129.23.321.12"
        };
        this.sessionId = expected.sessionId;
        this.controllerStatus = expected.controllerStatus;
        this.userIp = expected.userIp;
    
    }
    getScreenName() {
        return this.screenName;
    }
    
    getControllerStatus() {
        return this.controllerStatus;
    }
    
    getUserIp() {
        return this.userIp;
    }
    
    
} 
export { User };