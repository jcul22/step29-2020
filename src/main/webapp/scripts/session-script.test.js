import * as sessionscript from './session-script';

test('display none to block', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'none';
  div.id = 'session-info-div';
  container.appendChild(div);
  sessionscript.openSessionInfo();
  expect(div.style.display).toEqual('block');
});

test('display block to none', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'block';
  div.id = 'session-info-div';
  container.appendChild(div);
  sessionscript.closeDisplay(div);
  expect(container.style.display).toEqual('none');
});

test('change display using both functions - open then close', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'none';
  div.id = 'session-info-div';
  container.appendChild(div);
  sessionscript.openSessionInfo();
  sessionscript.closeDisplay(div);
  expect(div.style.display).toEqual('block');
  expect(container.style.display).toEqual('none');
});

test('already opened', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'block';
  div.id = 'session-info-div';
  container.appendChild(div);
  sessionscript.openSessionInfo();
  expect(div.style.display).toEqual('block');
});

test('tests copy and paste', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const input = document.createElement('input');
  input.id = 'session-id-field';
  input.name = 'session-id';
  input.value = 'hello!';
  input.addEventListener('click', () => {
    sessionscript.copyTextToClipboard(input)
  });
  container.appendChild(input);
  document.execCommand = jest.fn();
  input.click();
  expect(document.execCommand).toHaveBeenCalledWith('copy');
});

test('addOnClickTo', () => {
  document.body.innerHTML = '';
  const sessionInfoSpan = document.createElement('span');
  sessionInfoSpan.id = 'session-info-span';
  const sessionInfoDiv = document.createElement('div');
  sessionInfoDiv.id = 'session-info-div';
  const close = document.createElement('span');
  close.className = 'close';
  sessionInfoDiv.appendChild(close);
  const sessionIdInput = document.createElement('input');
  sessionIdInput.className = 'session-id-input';
  document.body.appendChild(sessionInfoDiv);
  document.body.appendChild(sessionInfoSpan);
  document.body.appendChild(sessionIdInput);
  sessionscript.addOnClickToElements();
  sessionInfoSpan.click();
  expect(sessionInfoDiv.style.display).toEqual('block');
  close.click();
  expect(sessionInfoDiv.style.display).toEqual('none');
  document.execCommand = jest.fn();
  sessionIdInput.click();
  expect(document.execCommand).toHaveBeenCalledWith('copy');
});
