import { Session } from './Session';

test('Check for correct value of sessionId', () => {
    const sess = new Session(); 
    sess.sessionId = "LYW23902"; 
    var id = sess.getSessionId();
    expect(id).toBe(sess.sessionId); 
}); 

test('Check for correct value of instanceIp', () => {
    const sess = new Session();
    sess.instanceIp = "122.01.231.25";
    var instance = sess.getInstanceIp();
    expect(instance).toBe(sess.instanceIp);
}); 

test('Check for correct value of listOfAttendees', () => {
    const sess = new Session();
    sess.listOfAttendees = ["Jasmine", "Taniece", "Chris"]; 
    var list = sess.listOfAttendees; 
    expect(list).toBe([sess.listOfAttendees]);
});
