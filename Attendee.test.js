import { Attendee } from './Attendee';

test('Check for correct value of screenName', () => {
    const expectedScreenName = "Jaz";
    const expectedId = "JTK614";
    const expectedTimePolled = "2 minutes ago";
    const attendee = new Attendee(expectedScreenName, expectedId, expectedTimePolled);
    const gotScreenName = attendee.getScreenName();
    expect(gotScreenName).toBe(expectedScreenName);
}); 
test('Check for correct value of sessionId', () => {

    const attendee = new Attendee(expectedScreenName, expectedId, expectedTimePolled);
    const gotId = attendee.getSessionId();
    expect(gotId).toBe(attendee.expectedId);
}); 
test('Check for correct value of userIp', () => {
    const expectedId = "JTK614";
    const expectedScreenName = "Jaz"; 
    const expectedTimePolled = "2 minutes ago";
    const attendee = new Attendee(expectedScreenName, expectedId, expectedTimePolled); 
    const gotTimePolled = attendee.getTimeLastPolled(); 
    expect(gotTimePolled).toBe(expectedTimePolled);
});
test('Check for correct value of fromObject', () => { 
    const expectedId = "JTK614";
    const expectedScreenName = "Jaz"; 
    const expectedTimePolled = "2 minutes ago";
    const obj = new Attendee(expectedScreenName, expectedId, expectedTimePolled); 

});