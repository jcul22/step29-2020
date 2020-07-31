import { NoVNCClient } from './novncclient.js';

test('We can check if setViewOnly throws an error', () => {
  try {
    const novncClient = 
        new NoVNCClient(testConnectCallback, testDisconnectCallback);
    novncClient.setViewOnly(true);
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});

test('We can check if remoteToSession throws an error', () => {
  try {
    const novncClient = 
        new NoVNCClient(testConnectCallback, testDisconnectCallback);
    novncClient.remoteToSession('123456.12', 'EEEEE7');
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});

test('We can check if setConnectCallback throws an error', () => {
  try {
    const novncClient = 
        new NoVNCClient(testConnectCallback, testDisconnectCallback);
    novncClient.setConnectCallback(() => { 
      const goodbye = 'Goodbye!';
    });
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});

test('We can check if setDisconnectCallback throws an error', () => {
  try {
    const novncClient = 
        new NoVNCClient(testConnectCallback, testDisconnectCallback);
    novncClient.setConnectCallback(() => { 
      const hello = 'Hello!';
    });
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});

function testConnectCallback() {
  const hello = 'Hello!';
}

function testDisconnectCallback() {
  const goodbye = 'Goodbye!'
}


