// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
/**
 * Represents the noVNC client object; the single connection to the 
 * VNC server.
 * @type {RFB}
 */
let sessionScreen;

/**
 * Represents the URLSearchParams of the
 * the client is in, holds information such as the
 * session ID and the screen name of the current user.
 * @type {URLSearchParams}
 */
const urlParameters = new URLSearchParams(window.location.search);

/**
 * Represents the ServerClient object responsible for
 * keeping up-to-date with the current session and handles many
 * of the client-to-server interactions, like passing the controller.
 * @type {ServerClient}
 */
const client = new ServerClient(urlParameters);

/**
 * function buildAttendeeDiv() adds the div element containing
 * all the elements representing an attendee to the session info
 * attendees div.
 * @param {string} nameOfAttendee name of attendee to build
 * @param {string} controller name of the controller of the session
 */
function buildAttendeeDiv(nameOfAttendee, controller) {
  const /** HTMLElement */ sessionInfoAttendeesDiv =
      document.getElementById('session-info-attendees');
  const /** HTMLDivElement */ attendeeDiv = document.createElement('div');
  attendeeDiv.className = 'attendee-div'
  const /** HTMLSpanElement */ controllerToggle = 
      document.createElement('span');
  controllerToggle.className = 'controller-toggle';
  controllerToggle.addEventListener('click', event => {
    changeControllerTo(event, controller);
  }, /**AddEventListenerOptions=*/false);
  const /** HTMLHeadingElement */ attendeeName =
      document.createElement('h3');
  attendeeName.innerHTML = nameOfAttendee;
  attendeeName.className = 'attendee-name'
  attendeeName.id = nameOfAttendee;
  attendeeDiv.appendChild(controllerToggle);
  attendeeDiv.appendChild(attendeeName);
  sessionInfoAttendeesDiv.appendChild(attendeeDiv);
}

/**
 * If the current controller of the session clicks on the controller 
 * toggle, their controller status is revoked and the server is updated
 * with information on the new controller.
 * @param {MouseEvent} event
 * @param {string} controller
 */
function changeControllerTo(event, controller) {
  if (urlParameters.get('name') === controller) {
    sessionScreen.viewOnly = true;
    client.changeControllerTo(
        event.target.parentElement.querySelector('h3').id);
  }
}

/**
 * function openSessionInfo() displays the div container
 * that has information about the session.
 */
function openSessionInfo() {
  document.getElementById('session-info-div').style.display = 'block'; 
}

/**
 * function closeSessionInfo() closes the div container
 * that has information about the session.
 */
function closeSessionInfo() {
  document.getElementById('session-info-div').style.display = 'none';
}

/**
 * function copyTextToClipboard() copies the text in the input field
 * with the id 'session-id-field' into the clipboard.
 */
function copyTextToClipboard() {
  const /** HTMLElement */ sessionIdElement =
      document.getElementById('session-id-field');
  sessionIdElement.select();
  document.execCommand('copy');
}

module.exports = {
  openSessionInfo: openSessionInfo,
  closeSessionInfo: closeSessionInfo,
  copyTextToClipboard: copyTextToClipboard
};