import { ServerClient } from './serverclient.js';

/**
 * Represents the URLSearchParams the client is in, 
 * holds information such as the session ID and 
 * the screen name of the current user.
 * @type {URLSearchParams}
 */
let urlParameters;

/**
 * Represents the ServerClient object responsible for
 * keeping up-to-date with the current session and handles many
 * of the client-to-server interactions, like changing the controller.
 * @type {ServerClient}
 */
let serverClient;

/**
 * This waits until the webpage loads and then it calls the
 * anonymous function, which calls main.
 */
window.onload = function() { main(); }

/**
 * function main() connects the client to a session and begins many of
 * the behind the scenes operations, like caching.
 */
function main() {
  urlParameters = new URLSearchParams(window.location.search);
  serverClient = new ServerClient(urlParameters);
  addOnClickListenerToElements();
  serverClient.getSession().then(session => {
    changeElementsToReadOnly(session.getSessionId());
  }).catch(error => {
    window.alert('No contact with the server!');
  });
}

/**
 * Adds an onclick event listener to some of the elements on the
 * in-session webpage.
 */
function addOnClickListenerToElements() {
  document.getElementById('session-info-span').addEventListener('click', 
      openSessionInfo);
  document.querySelectorAll('.close').forEach(element => {
    element.addEventListener('click', event => {
      closeParentDisplay(event.target);
    });
  });
  document.querySelectorAll('.session-id-input').forEach(element => {
    element.addEventListener('click', event => {
      copyTextToClipboard(event.target);
    });
  });
}

/**
 * function setReadOnlyInputs() changes the two inputs,
 * one on the welcome message and the other in the session 
 * information div, to show the session ID and then changes them
 * to read only (meaning they cannot be changed once set).
 * @param {string} sessionId
 */
function setReadOnlyInputs(sessionId) {
  const /** HTMLElement */ sessionInfoInput = 
      document.getElementById('session-info-input');
  sessionInfoInput.value = sessionId;
  sessionInfoInput.readOnly = true;
  const /** HTMLElement */ welcomeMessageInput = 
      document.getElementById('welcome-message-input');
  welcomeMessageInput.value = sessionId;
  welcomeMessageInput.readOnly = true;
}

/**
 * function openSessionInfo() displays the div container
 * that has information about the session.
 */
function openSessionInfo() {
  document.getElementById('session-info-div').style.display = 'block'; 
}

/**
 * function closeParentDisplay() changes the display of the 
 * parent of the element passed in to 'none'.
 * @param {HTMLElement} element
 */
function closeParentDisplay(element) {
  element.parentElement.style.display = 'none';
}

/**
 * function copyTextToClipboard() copies the text of the element passed
 * in into the clipboard.
 * @param {HTMLInputElement} element
 */
function copyTextToClipboard(element) {
  element.select();
  document.execCommand('copy');
}

export { openSessionInfo, closeParentDisplay, copyTextToClipboard, 
  addOnClickListenerToElements, setReadOnlyInputs };
