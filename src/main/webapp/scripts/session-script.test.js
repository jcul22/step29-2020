import * as sessionscript from './session-script';
import { Session } from './Session';
import { ServerClient } from './serverclient';

test('display none to block', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'none';
  div.id = 'session-info-div';

  container.appendChild(div);

  openSessionInfo();

  expect(div.style.display).toEqual('block');
});

test('display block to none', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'block';
  div.id = 'session-info-div';

  container.appendChild(div);

  closeSessionInfo();

  expect(div.style.display).toEqual('none');
});

test('change display using both functions - open then close', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'none';
  div.id = 'session-info-div';

  container.appendChild(div);

  openSessionInfo();
  closeSessionInfo();

  expect(div.style.display).toEqual('none');
});

test('already opened', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const div = document.createElement('div');
  div.style.display = 'block';
  div.id = 'session-info-div';

  container.appendChild(div);

  openSessionInfo();

  expect(div.style.display).toEqual('block');
});

test('tests copy and paste', () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.getElementById('container');
  const input = document.createElement('input');
  input.id = 'session-id-field';
  input.name = 'session-id';
  input.value = 'hello!';
  input.addEventListener('click', copyTextToClipboard);

  container.appendChild(input);

  document.execCommand = jest.fn();
  input.click();

  expect(document.execCommand).toHaveBeenCalledWith('copy');
});

test('adding an attendee div', () => {
  document.body.innerHTML = '';
  const sessionInfoAttendeeDiv =
      document.createElement('div');
  sessionInfoAttendeeDiv.id = 'session-info-attendees';
  document.body.appendChild(sessionInfoAttendeeDiv);
  const attendeeDivExpected = document.createElement('div');
  attendeeDivExpected.className = 'attendee-div'
  const controllerToggle = 
      document.createElement('span');
  controllerToggle.className = 'controller-toggle';
  controllerToggle.addEventListener('click', event => {
    sessionscript.changeControllerTo(event, 'Bryan');
  }, false);  
  const attendeeName = document.createElement('h3');
  attendeeName.innerHTML = 'hello';
  attendeeName.className = 'attendee-name'
  attendeeName.id = 'hello';
  attendeeDivExpected.appendChild(controllerToggle);
  attendeeDivExpected.appendChild(attendeeName);
  sessionscript.buildAttendeeDiv('hello', 'Bryan');
  expect(sessionInfoAttendeeDiv.childNodes[0]).
      toEqual(attendeeDivExpected);
});

test('tests changeControllerTo() - controller clicks', () => {
  const urlParamSpy = 
      jest.spyOn(window.URLSearchParams.prototype, 'get').
          mockReturnValue('Jessica');
  const changeControllerToSpy = 
      jest.spyOn(ServerClient.prototype, 'changeControllerTo');
  const attendeeDiv = document.createElement('div');
  attendeeDiv.className = 'attendee-div'
  const controllerToggle = 
      document.createElement('span');
  controllerToggle.className = 'controller-toggle';
  controllerToggle.addEventListener('click', event => {
    sessionscript.changeControllerTo(event, 'Jessica');
  }, false);
  const attendeeName = document.createElement('h3');
  attendeeName.innerHTML = 'Naomi';
  attendeeName.className = 'attendee-name';
  attendeeName.id = 'Naomi';
  attendeeDiv.appendChild(controllerToggle);
  attendeeDiv.appendChild(attendeeName);
  controllerToggle.click();
  expect(changeControllerToSpy).toBeCalledWith('Naomi');
});

test('tests changeControllerTo() - controller does not click', () => {
  const urlParamSpy = 
      jest.spyOn(window.URLSearchParams.prototype, 'get').
          mockReturnValue('Jessica');
  const changeControllerToSpy = 
      jest.spyOn(ServerClient.prototype, 'changeControllerTo');
  const attendeeDiv = document.createElement('div');
  attendeeDiv.className = 'attendee-div'
  const controllerToggle = 
      document.createElement('span');
  controllerToggle.className = 'controller-toggle';
  controllerToggle.addEventListener('click', 
      sessionscript.changeControllerTo, false);
  const attendeeName =
      document.createElement('h3');
  attendeeName.innerHTML = 'Bob';
  attendeeName.className = 'attendee-name'
  attendeeName.id = 'Bob';
  attendeeDiv.appendChild(controllerToggle);
  attendeeDiv.appendChild(attendeeName);
  controllerToggle.click();
  expect(changeControllerToSpy).toBeCalledTimes(0);
});
