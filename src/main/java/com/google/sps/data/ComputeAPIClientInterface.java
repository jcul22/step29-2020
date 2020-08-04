package com.google.sps.data;

import com.google.api.services.compute.model.Operation;
import java.io.IOException;
import java.util.Optional;

/** Interface for the ComputerAPIClient class. */
public interface ComputeAPIClientInterface {
  /** 
   * Creates an environment, calls each operation and tracks to see if they 
   * are executed.
   * @param {String} operation - the name of the method that should be called.
   * @param {String} instanceName - the name of the instance being operated on.
   * @param {Optional<String>} sessionId - the session id associated with
   *     this instance. 
   */
  void computeManager(String operation, String instanceName, 
    Optional<String> sessionId);

  /** 
   * Creates a new Instance.
   * @param {String} instanceName - the name of the new Instance.
   * @param {String} sessionId - the session associated with this instance.
   * @return Operation object that can be used to wait for operation completion
   *    and to check whether operation failed or succeeded
   */
  Operation createInstance(String instanceName, String sessionId) 
    throws IOException;

  /**
   * Stops an Instance.
   * @param {String} instanceName - the name of the instance that will 
   *    be stopped.
   * @return Operation object that can be used to wait for operation completion
   *    and to check whether operation failed or succeeded
   */
  Operation stopInstance(String instanceName) throws Exception;

  /** 
   * Restart an Instance that was stopped.
   * @param {String} instanceName - the name of the Instance.
   * @param {String} sessionId - the session associated with this instance. 
   * @return Operation object that can be used to wait for operation completion
   *    and to check whether operation failed or succeeded
   */
  Operation restartInstance(String instanceName, String sessionId) 
    throws Exception;

  /**
   * Deletes an Instance.
   * @param {String} instanceName - the name of the instance that will 
   *    be deleted.
   * @return Operation object that can be used to wait for operation completion
   *    and to check whether operation failed or succeeded
   */
  Operation deleteInstance(String instanceName) throws Exception;
}