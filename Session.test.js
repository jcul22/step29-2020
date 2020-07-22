import { Session } from './Session';

test('Check for correct value of sessionId', () => {
    const sess = new Session(); 
    sess.setSessionId_("LYW23902"); 
    const id = sess.getSessionId();
    expect(id).toBe(sess.sessionId); 
}); 

test('Check for correct value of instanceIp', () => {
    const sess = new Session();
    sess.setIpOfVM_("122.01.231.25");
    const ip = sess.getIpOfVM();
    expect(ip).toBe(sess.ipOfVM);
}); 

test('Check for correct value of listOfAttendees', () => {
    const sess = new Session();
    sess.setListOfAttendees_(["Jasmine", "Taniece", "Chris"]); 
    const list = sess.listOfAttendees; 
    expect(list).toBe(sess.listOfAttendees);
});

test('Check for correct value of fromObject', () => {
    const obj = new Session(); 
    obj.setSessionId_("LYW23902");
    obj.setIpOfVM_("122.01.231.25");
    obj.setListOfAttendees_(["Jasmine","Taniece", "Chris"]);
    sess.fromObject(obj);
});
