import RFB from 'https://cdn.jsdelivr.net/npm/@novnc/novnc@1.1.0/core/rfb.js';

/**
 * The NoVNCClient class essentially surrounds the RFB object of the noVNC
 * library, taking care of remoting, what happens if someone connects, 
 * and what happens if someone disconnects. The class also allows for 
 * additional functionality that are specific to the scope of Virtual Movie
 * Night, like changing the viewOnly property of the RFB object (or all
 * owing who is able to controll).
 */
class NoVNCClient {
  /**
   * Initalizes a NoVNCClient object.
   * @param {function(): void} connectCallback this function is called 
   *    once the sessionScreen connects.
   * @param {function(): void} disconnectCallback this function is called
   *    once the sessionScreen disconnects.
   * @param {HTMLElement} sessionScreenElement A block HTMLElement that 
   *    specifies where the RFB object should attach itself.
   * @param {number=} [reconnectCadenceMs = 30000] Represents the rate at 
   *    which the noVNC RFB object attempts to reconnect if it disconnects.
   *    By default, the rate is 30,000 milliseconds.
   */
  constructor(connectCallback, disconnectCallback, sessionScreenElement,
      reconnectCadenceMs = 30000) {
        /**
         * Represents the current noVNC RFB object of the 
         * session, the single connection to the VNC server of the
         * VM assigned to the session.
         * @private {RFB}
         */
        this.sessionScreen_ = null; 

        /**
         * @private {HTMLElement}
         */
        this.sessionScreenElement_ = sessionScreenElement;

        /**
         * @private {number}
         */
        this.reconnectCadenceMs_ = reconnectCadenceMs;

        /** 
         * @private {function(): void}
         */
        this.connectCallback_ = connectCallback;

        /** 
         * @private {function(): void}
         */
        this.disconnectCallback_ = disconnectCallback;
  }

  /**
   * Method remoteToSession() uses the noVNC library
   * in order to connect to a session.
   * @param {string} ipOfVM the ip adress of the VM assigned to the 
   *    session.
   * @param {string} sessionId represents the id of the current session.
   */
  remoteToSession(ipOfVM, sessionId) {
    throw new Error('Unimplemented');
  }

  /**
   * Method disconnect() disconnects from the server.
   */
  disconnect() {
    throw new Error('Unimplemeted');
  }

  /**
   * Method setViewOnly changes the viewOnly property of the current
   * sessionScreen to be what is passed in.
   * @param {boolean} viewOnly is a boolean indicating if any events
   *    (e.g. key presses or mouse movement) should be prevented from 
   *    being sent to the server.
   */
  setViewOnly(viewOnly) {
    throw new Error('Unimplemented');
  }
}

export { NoVNCClient }

