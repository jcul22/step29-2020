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
  addOnClickToElements();
}

/**
 * Adds an onclick event listener to some of the elements on the
 * in-session webpage.
 */
function addOnClickToElements() {
  document.getElementById('session-info-span').addEventListener('click', 
      openSessionInfo);
  document.querySelectorAll('.close').forEach(element => {
    element.addEventListener('click', event => {
      closeDisplay(event.target);
    });
  });
  document.querySelectorAll('.session-id-field').forEach(element => {
    element.addEventListener('click', event => {
      copyTextToClipboard(event.target);
    });
  });
}

/**
 * function openSessionInfo() displays the div container
 * that has information about the session.
 */
function openSessionInfo() {
  document.getElementById('session-info-div').style.display = 'block'; 
}

/**
 * function closeDisplay() changes the display of the parent of the element
 * passed in to 'none'.
 * @param {HTMLElement} element
 */
function closeDisplay(element) {
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

export { openSessionInfo, closeDisplay, copyTextToClipboard };
