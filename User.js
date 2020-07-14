//The User class can be utililized to keep certain information of the user, a class for the user needed to be 
// created in addition to the session class. The test for this JS class file utilizes Jest.IO

class User {
    constructor(screenName){
        this.screenName = screenName;
    }
    constructor(controllerStatus){
        this.controllerStatus = controllerStatus;
    }
    constructor(userIp){
        this.userIp = userIp;
    } 

    get screenName() {
        return this.screenName;
    }
    
    get controllerStatus() {
        return this.controllerStatus;
    }
    
    get UserIp() {
        return this.userIp;
    }
    
    
} 
