import { Poller } from './poll';

test('We can check if correct errors are thrown - start', () => {
  try {
    const poll = new Poller();
    poll.start();
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});

test('We can check if correct errors are thrown - stop', () => {
  try {
    const poll = new Poller();
    poll.stop();
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});

test('We can check if correct errors are thrown - getLastResult', () => {
  try {
    const poll = new Poller();
    poll.getLastResult();
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});
