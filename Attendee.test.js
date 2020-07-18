import {Attendee } from './Attendee';

test('Check for correct value of screenName', () => {
    const user = new User(); 
    user.screenName = "Jaz"; 
    var name = user.getScreenName();
    expect(name).toBe(user.screenName); 
}); 
test('Check for correct value of controllerStatus', () => {
    const user = new User();
    user.controllerStatus = true;
    var status = user.getControllerStatus();
    expect(status).toBe(user.controllerStatus);
}); 
test('Check for correct value of userIp', () => {
    const user = new User();
    user.userIp = "237.28.834.12"; 
    var ip = user.getUserIp(); 
    expect(ip).toBe(user.userIp);
});