import { Attendee } from './Attendee';

test('Check for correct value of screenName', () => {
    const attendee = new Attendee();
    const expectedScreenName = "Jaz";
    attendee.setScreenName_(expectedScreenName);
    const gotScreenName = attendee.getScreenName();
    expect(gotScreenName).toBe(expectedScreenName);
}); 
test('Check for correct value of sessionId', () => {
    const attendee = new Attendee(); 
    const expectedId = "JTK614";
    attendee.setSessionId_(expectedId);
    const gotId = attendee.getSessionId();
    expect(gotId).toBe(attendee.expectedId);
}); 
test('Check for correct value of userIp', () => {
    const attendee = new Attendee();
    const expectedTimePolled = "2 minutes ago";
    attendee.setTimeLastPolled_(expectedTimePolled); 
    const gotTimePolled = attendee.getTimeLastPolled(); 
    expect(gotTimePolled).toBe(expectedTimePolled);
});
test('Check for correct value of fromObject', () => {
    const obj = new Attendee(); 
    obj.setSessionId_("LYW23902");
    obj.setIpOfVM_("122.01.231.25");
    obj.setListOfAttendees_(["Jasmine","Taniece", "Chris"]);
    sess.fromObject(obj);
});