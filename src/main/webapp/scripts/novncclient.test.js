import { noVNCClient } from './novncclient.js';
import { ServerClient } from './serverclient.js';

test('We can check if changeViewOnlyToFalse throws an error', () => {
  try {
    const serverClient = 
        new ServerClient(new URLSearchParams(
            '?session-id=EEEE7&name=chris'));
    const novncClient = new noVNCClient(serverClient);
    novncClient.changeViewOnlyToFalse();
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});

test('We can check if changeViewOnlyToTrue throws an error', () => {
  try {
    const serverClient = 
        new ServerClient(new URLSearchParams(
            '?session-id=EEEE7&name=chris'));
    const novncClient = new noVNCClient(serverClient);
    novncClient.changeViewOnlyToTrue();
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});

test('We can check to see if getConnectionStatus throws an error', () => {
  try {
    const serverClient = 
        new ServerClient(new URLSearchParams(
            '?session-id=EEEE7&name=chris'));
    const novncClient = new noVNCClient(serverClient);
    novncClient.getConnectionStatus();
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});
