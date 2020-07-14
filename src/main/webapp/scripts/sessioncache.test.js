import { SessionCache } from './sessioncache';

test('We can check if correct errors are thrown - start', () => {
      try {
        const cache = new SessionCache();
        cache.start();
      } catch (e) {
        expect(e.message).toBe('Unimplemented');
      }
    }
);

test('We can check if correct errors are thrown - stop', () => {
  try {
    const cache = new SessionCache();
    cache.stop();
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
}
);

test('We can check if correct errors are thrown - getSessionInfo', () => {
  try {
    const cache = new SessionCache();
    cache.getSessionInformation();
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
}
);
