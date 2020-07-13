 /** 
  * The Poll class checks for fresh data over a given interval by
  * periodically making API requests to a server. The Poll class can also
  * be used to periodically update the server of necessary updates. 
  * By default, polling objects poll indefinitely over a
  * period of 30 seconds.
  * 
  * For example, if a fetchAPIRequest is one that contacts a servlet
  * to doGet some value, a Poll object will repeatedly doGet the value, 
  * attaching it to one of its fields which can then be retrieved with 
  * getResult(). The core nature is that it executes a function over
  * and over, and doesn't necessarily have to be used to doGet some value,
  * but can doPost, updating the server also.
  */ 
 class Poll {
  /**
   * Initializes a Poll object.
   * @param {function(): ?Object} fetchAPIRequest Represents the API
   *    request that is polled.
   * @param {number=} [pollingPeriod] Represents the cadence at which 
   *    the fetchRequest is called upon. Must be provided in milliseconds
   *    and is by default 30,000 milliseconds (or 30 seconds). 
   * @param {?number=} [maxAttempts] An optional parameter, 
   *    can limit the amount of times polling occurs by the number
   *    of maxAttempts. By default, there is no limit (defined as null).
   */
  constructor(fetchAPIRequest, pollingPeriod = 30000, maxAttempts = null) {
    /** 
     * Represents the output of the fetchRequest function, is constantly
     * being updated. Can be null, ie in the case of if the 
     * fetchAPIRequest is meant to update the server instead of
     * checking for some new result. 
     * @private {?Object} 
     */
    this.result_ = null;

    /**
     * @private @const {number}
     */
    this.POLLING_PERIOD_ = pollingPeriod;

    /**
     * @private @const {number}
     */
    this.MAX_ATTEMPTS_ = maxAttempts;

    /**
     * @private {number} represents the amount of times polling has 
     *    occured. 
     */
    this.attempts_ = 0;

    this.fetchAPIRequest_ = fetchAPIRequest;

    this.poll_();
  }

  /**
   * This method periodically executes (time dictated by pollingTime)
   * the given API request from fetchAPIRequest, updating the result.
   * @private
   */ 
  poll_() {
    throw new Error('Unimplemented');
  }

  /**
   * Returns the current result of the fetchAPIRequest given how  
   * updated the poll is.
   * @return {?Object} The result.
   */
  getResult() {
    throw new Error('Unimplemented');
  }
}

export { Poll };
