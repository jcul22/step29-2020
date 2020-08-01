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
   * @param {Optional<String>} password - the password needed to access this 
   *    instance. Not all operations requires a password.
   */
  void helper(String operation, String instanceName, 
    Optional<String> password);

  /** 
   * Creates a new Instance.
   * @param {String} password - the password needed to access this instance. 
   * @param {String} instanceName - the name of the new Instance.
   */
  Operation createInstance(String instanceName, String password) 
    throws IOException;

  /**
   * Stops an Instance.
   * @param {String} instanceName - the name of the instance that will 
   *    be stopped.
   */
  Operation stopInstance(String instanceName) throws Exception;

  /** 
   * Restart an Instance that was stopped.
   * @param {String} password - the password needed to access this instance.
   * @param {String} instanceName - the name of the Instance.
   */
  Operation restartInstance(String instanceName, String sessionId) 
    throws Exception;

  /**
   * Deletes an Instance.
   * @param {String} instanceName - the name of the instance that will 
   *    be deleted.
   */
  Operation deleteInstance(String instanceName) throws Exception;
}