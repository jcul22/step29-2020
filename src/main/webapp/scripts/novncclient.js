import { ServerClient } from './serverclient.js';
import RFB from 'https://cdn.jsdelivr.net/npm/@novnc/novnc@1.1.0/core/rfb.js';

class noVNCClient {
  /**
   * Initalizes a noVNCClient object.
   * @param {ServerClient} serverClient Represents the ServerClient object 
   *    responsible for keeping up-to-date with the current session and
   *    handles many of the client-to-server interactions, 
   *    like changing the controller.
   * @param {number=} [reconnectCadence = 30000] Represents the rate at 
   *    which the noVNC RFB object attempts to reconnect if it disconnects.
   *    By default, the rate is 30,000 milliseconds.
   */
  constructor(serverClient, reconnectCadence = 30000) {
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
    this.reconnectCadenceMS_ = reconnectCadence;

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
   * Method connectedToSession() is called on once the sessionScreen 
   * connects.
   * @private
   */
  connectedToSession_() {
    throw new Error('Unimplemented');
  }

  /**
   * Method disconnectedFromSession() is called on once the sessionScreen
   * disconnects.
   * @private
   */
  disconnectedFromSession_() {
    throw new Error('Unimplemented');
  }

  /**
   * Method changeViewOnly() changes the view only of the current RFB object
   * to be opposite of what it currently is.
   */
  changeViewOnly() {
    throw new Error('Unimpleneted');
  }

  /**
   * Method getConnectionStatus() returns the current status of the 
   * current RFB object.
   */
  getConnectionStatus() {
    throw new Error('Unimpleneted');
  }
}

export { novncClient }

