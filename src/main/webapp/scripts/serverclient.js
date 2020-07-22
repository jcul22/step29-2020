import { SessionCache } from './sessioncache';
import { Session } from './session';

class ServerClient {
  /**
   * Initalizes a ServerClient object.
   * @param {URLSearchParams} urlParams Represents the URLSearchParams 
   *    of the session the client is in, holds information such as the
   *    session ID and the screen name of the current user.
   */
  constructor(urlParams) {
    /**
     * function sessionRequest_() is the fetch api request
     * responsible for contacting the server to retrieve the Session
     * object.
     * @return {function(): Promise<any>} 
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
     * The SessionCache for the current session, it looks for information
     * about the current session.
     * @private {SessionCache}
     */
    this.sessionCache_ = new SessionCache(sessionRequest_);

    /**
     * @private {URLSearchParams}
     */
    this.urlParams_ = urlParams;
  }

  /** 
   * This method starts to cache.
   */
  start() {
    this.sessionPoller_.start();
  }

  /** 
   * This method stops caching.
   */
  stop() {
    this.sessionPoller_.stop();
  }

  /**
   * This method changes the controller of the current session to the 
   * Attendee pased in.
   * @param {string} name 
   */
  passController(name) {
    throw new Error('Unimplemented');
  }

  /**
   * Returns a Session object, given how updated the 
   * cache is in refreshing.
   * @return {Session} The Session object
   */
  getSession() {
    throw new Error('Unimplemented');
  }
}