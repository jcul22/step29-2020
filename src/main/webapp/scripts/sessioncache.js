import { Poller } from './poller';
import { Session } from './session';
import { rejects } from 'assert';

/** 
 * SessionCache bridges the gap between the client and server.
 * Allows client to indirectly stay in contact with the server,
 * encapsulating many of the contact points away from the client.
 * 
 * SessionCache looks for information about the current session and
 * updates the server with information about each client in return (like
 * date last contacted).
 */
class SessionCache {
  /**
   * Initalizes a SessionCache object.
   * @param {Object} urlParams Represents the URLSearchParams of the
   *    session the client is in, holds information such as the
   *    session ID and the screen name of the current user.
   * @param {number=} [refreshCadence = 30000] Represents the cadence at
   *    which the sessionInformation is refreshed. By default, the rate is
   *    30,000 milliseconds (or 30 seconds).  
   */
  constructor(urlParams, refreshCadence = 30000) {
    /**
     * function sessionRequest_() is the fetch api request
     * responsible for gathering information about the current session.
     * @private
     */
    async function sessionRequest_() {
      const /** string */ name = encodeURI(urlParams.get('name'));
      const /** string */ sessionID = 
          encodeURI(urlParams.get('session-id'));
      const /** Object */ response = await fetch(
          `/get-session-info?name=${name}&session-id=${sessionID}`);
      return await response.json();
    }

    /** 
     * Poller responsible for contacting the server for information about
     * the current session.
     * @private {Object} 
     */
    this.sessionPoller = 
        new Poller(this.sessionRequest_, refreshCadence);
  }

  /** 
   * This method begins polling for session information.
   */
  start() {
    this.sessionPoller_.start();
  }

  /** 
   * This method stops polling for session information.
   */
  stop() {
    this.sessionPoller_.stop();
  }

  /**
   * Returns information about the session, given how updated the 
   * cache is in refreshing.
   * @return {Object} The Session object.
   */
  async getSession() {
    const promise = new Promise((resolve, reject) => {
      let condition = await sessionPoller_.getLastResult();
      if(condition) {
        resolve(condition);
      } else {
        reject('No contact with server.');
      }
    });
    promise.then(result => { 
      return Session.fromObject(result);
    }).
    catch((errorMessage) => {
      throw new Error(errorMessage);
    });

    // })
    // return Session.fromObject(await this.sessionPoller_.getLastResult());
  }
}

export { SessionCache };
