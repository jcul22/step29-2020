import { NoVNCClient } from './novncclient.js';
import { ServerClient } from './serverclient.js';

test('We can check if setViewOnly throws an error', () => {
  try {
    const serverClient = 
        new ServerClient(new URLSearchParams(
            '?session-id=EEEE7&name=chris'));
    const novncClient = new NoVNCClient(serverClient);
    novncClient.setViewOnly(true);
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});
