import { Session } from './Session';

test('Check for correct value of sessionId', () => {
    const sess = new Session(); 
    sess.setSessionId("LYW23902"); 
    var id = sess.getSessionId();
    expect(id).toBe(sess.sessionId); 
}); 

test('Check for correct value of instanceIp', () => {
    const sess = new Session();
    sess.getIpOfVM("122.01.231.25");
    var ip = sess.getIpOfVM();
    expect(ip).toBe(sess.ipOfVM);
}); 

test('Check for correct value of listOfAttendees', () => {
    const sess = new Session();
    sess.setListOfAttendees(["Jasmine", "Taniece", "Chris"]); 
    var list = sess.listOfAttendees; 
    expect(list).toBe(sess.listOfAttendees);
});
