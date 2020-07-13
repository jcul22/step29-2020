import { Poll } from './poll';

test.only('We can check if poll() is called + correct return value', () => {
  try {
    const poll = new Poll();
  } catch (e) {
    expect(e.message).toBe('Unimplemented');
  }
});
