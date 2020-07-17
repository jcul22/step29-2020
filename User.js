// The User class can be utililized to keep certain information of the user, 
// a class for the user needed to be created in addition to the session class. 
// The test for this JS class file utilizes Jest.IO

class User {
    constructor() {
        this.sessionId = expected.sessionId;
        this.controllerStatus = expected.controllerStatus;
        this.userIp = expected.userIp;
    
    }
        
    setSessionId(id) { 
        this.sessionId = id;
        return this.sessionId;
    }

    setControllerStatus(status) {
        this.controllerStatus = status;
        return this.controllerStatus;
    }

    setUserIp(ip) {
        this.userIp = ip;
        return this.UserIp;
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
    static fromUser() { 
        newUser = new User();
        setSessionId();
        setUserIp();
        setControllerStatus();
        return newUser;
    }
    
} 
export { User };