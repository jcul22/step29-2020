import { ServerClient } from './serverclient.js';
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
   * @param {ServerClient} serverClient Represents the ServerClient object 
   *    responsible for keeping up-to-date with the current session and
   *    handles many of the client-to-server interactions, 
   *    like changing the controller.
   * @param {number=} [reconnectCadenceMs = 30000] Represents the rate at 
   *    which the noVNC RFB object attempts to reconnect if it disconnects.
   *    By default, the rate is 30,000 milliseconds.
   */
  constructor(serverClient, reconnectCadenceMs = 30000) {
    /**
     * Represents the current noVNC RFB object of the 
     * session, the single connection to the VNC server of the
     * VM assigned to the session.
     * @private {RFB}
     */
    this.sessionScreen_ = null; 

    /**
     * @private {number}
     */
    this.reconnectCadenceMs_ = reconnectCadenceMs;

    /**
     * @private {ServerClient}
     */
    this.serverClient_ = serverClient;

    /**
     * Represents the current state of the sessionScreen in terms of 
     * whether or not it is connected.
     * @private {boolean}
     */
    this.isConnected_ = false;
  }

  /**
   * Method remoteToSession() uses the noVNC library
   * in order to connect to a session.
   * @param {string} ipOfVM
   * @param {string} sessionId
   */
  remoteToSession_(ipOfVM, sessionId) {
    throw new Error('Unimplemented');
  }

  /**
   * Method onConnectCallback() is called on once the 
   * sessionScreen connects.
   * @private
   */
  onConnectCallback_() {
    throw new Error('Unimplemented');
  }

  /**
   * Method onDisconnectCallback() is called on once 
   * the sessionScreen disconnects.
   * @private
   */
  onDisconnectCallback_() {
    throw new Error('Unimplemented');
  }

  /**
   * Method changeViewOnlyToFalse() changes the viewOnly property of the 
   * current RFB object to be false if connected.
   * @param {boolean} viewOnly is a boolean indicating if any events
   *    (e.g. key presses or mouse movement) should be prevented from 
   *    being sent to the server.
   */
  setViewOnly(viewOnly) {
    throw new Error('Unimpleneted');
  }
}

export { NoVNCClient }

