//The User class can be utililized to keep certain information of the user, a class for the user needed to be 
// created in addition to the session class. The test for this JS class file utilizes Jest.IO

class User {
    constructor() {
        this.screenName;
        this.controllerStatus;
        this.userIp;
    
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