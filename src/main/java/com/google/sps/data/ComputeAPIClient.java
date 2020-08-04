/*
 * Copyright 2015 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.google.sps.data;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.compute.Compute;
import com.google.api.services.compute.ComputeScopes;
import com.google.api.services.compute.model.AccessConfig;
import com.google.api.services.compute.model.CustomerEncryptionKey;
import com.google.api.services.compute.model.AttachedDisk;
import com.google.api.services.compute.model.AttachedDiskInitializeParams;
import com.google.api.services.compute.model.Instance;
import com.google.api.services.compute.model.InstanceList;
import com.google.api.services.compute.model.Metadata;
import com.google.api.services.compute.model.NetworkInterface;
import com.google.api.services.compute.model.Operation;
import com.google.api.services.compute.model.ServiceAccount;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.lang.reflect.*;

/** Class that creates, stops and deletes VM instances. */
public class ComputeAPIClient implements ComputeAPIClientInterface {
  // Constants
  private static final String APPLICATION_NAME = "VMN";
  private static final String PROJECT_ID = "cdesir-step-2020";
  private static final String ZONE_NAME = "us-central1-f";
  private static final String SOURCE_IMAGE_PREFIX =
    "https://www.googleapis.com/compute/v1/projects/";
  private static final String SOURCE_IMAGE_PATH =
    "cdesir-step-2020/global/images/vmn-image";
  private static final String NETWORK_INTERFACE_CONFIG = "ONE_TO_ONE_NAT";
  private static final String NETWORK_ACCESS_CONFIG = "External NAT";
  private static final long OPERATION_TIMEOUT_MILLIS = 60 * 1000;
  private static final JsonFactory JSON_FACTORY = 
    JacksonFactory.getDefaultInstance();
  private final String OPERATION_STATUS_DONE = "DONE";
  private final String VNC_SERVER_PASSWORD_KEY = "vnc-server-password";
  private final String STARTUP_SCRIPT_URL_KEY = "startup-script-url";
  private final String SCOPE_FULL_CONTROL = 
    "https://www.googleapis.com/auth/devstorage.full_control";
  private final String SCOPE_COMPUTE = 
    "https://www.googleapis.com/auth/compute";
  // Member variables 
  private static GoogleCredentials credential;
  private Compute compute;
  private static HttpTransport httpTransport;  

  /** Create environment for Compute Engine object. */
  public ComputeAPIClient() {
    createComputeEngineObject();
  }
  
  /** 
   * Create Compute Engine object and authenticate using Google Application
   * Default Credentials
   */
  private void createComputeEngineObject() {
    try {
      httpTransport = GoogleNetHttpTransport.newTrustedTransport();
      credential = GoogleCredentials.getApplicationDefault();
      if (credential.createScopedRequired()) {
        List<String> scopes = new ArrayList<>();
        scopes.add(ComputeScopes.DEVSTORAGE_FULL_CONTROL);
        scopes.add(ComputeScopes.COMPUTE);
        credential = credential.createScoped(scopes);
      }
      HttpRequestInitializer requestInitializer = 
        new HttpCredentialsAdapter(credential);
      // Create Compute Engine object.
      compute = new Compute.Builder
        (httpTransport, JSON_FACTORY, requestInitializer)
        .setApplicationName(APPLICATION_NAME)
        .build();
    } catch (IOException e) {
        System.out.println("Got error!");
        System.err.println(e.getMessage());
    } catch (Throwable t) {
        t.printStackTrace();
      }
  }

  public void createInstance(String instanceName, String vncServerPassword)
    throws IOException {
      Instance instance = new Instance();
      instance.setName(instanceName);
      instance.setMachineType(String.format(
        "projects/%s/zones/%s/machineTypes/n1-standard-1",
        PROJECT_ID, ZONE_NAME));
      setUpNetworkInterace(instance);
      setUpDisk(instance);
      setUpMetadata(instance, vncServerPassword);
      setUpServiceAccounts(instance);
      System.out.println(instance.toPrettyString());
      Compute.Instances.Insert create = 
        compute.instances().insert(PROJECT_ID, ZONE_NAME, instance);
      Operation op = create.execute();
      waitForOperationCompletion(op);
    } 

  public void stopInstance(String instanceName) throws Exception {
    Compute.Instances.Stop stop =
      compute.instances().stop(PROJECT_ID, ZONE_NAME, instanceName);
    Operation op = stop.execute();
    waitForOperationCompletion(op);
  }

  public void restartInstance(String instanceName, String vncServerPassword)
    throws Exception {
      Compute.Instances.Get getInstance = 
        compute.instances().get(PROJECT_ID, ZONE_NAME, instanceName);
      Instance instance = getInstance.execute();
      String getFingerPrints = instance.getMetadata().getFingerprint();
      Metadata metadata = createMetadata(vncServerPassword);
      metadata.setFingerprint(getFingerPrints);
      Compute.Instances.SetMetadata setMeta = 
        compute.instances().setMetadata
        (PROJECT_ID, ZONE_NAME, instanceName, metadata);
      setMeta.execute();
      Compute.Instances.Start restart =
        compute.instances().start(PROJECT_ID, ZONE_NAME, instanceName);
      Operation op = restart.execute();
      waitForOperationCompletion(op);
    }

  public void deleteInstance(String instanceName) throws Exception {
    Compute.Instances.Delete delete =
      compute.instances().delete(PROJECT_ID, ZONE_NAME, instanceName);
    Operation op = delete.execute();
    waitForOperationCompletion(op);
  }

  /**
   * Waits until {@code operation} is completed.
   * @param {Compute} compute - the {@code Compute} object
   * @param {Operation} operation - the operation returned by the 
   *    original request
   * @param {long} timeout - the timeout, in millis
   * @return the error, if any, else {@code null} if there was no error
   * @throws InterruptedException if we timed out waiting for the operation
   *    to complete
   * @throws IOException if we had trouble connecting
   */
  private Operation.Error blockUntilComplete(
    Compute compute, Operation operation, long timeout) throws Exception {
      long start = System.currentTimeMillis();
      final long pollIntervalMs = 5 * 1000;
      String zone = operation.getZone(); // null for global/regional operations
      if (zone != null) {
        String[] bits = zone.split("/");
        zone = bits[bits.length - 1];
      }
      String status = operation.getStatus();
      String opId = operation.getName();
      while (operation != null && !status.equals(OPERATION_STATUS_DONE)) {
        Thread.sleep(pollIntervalMs);
        long elapsed = System.currentTimeMillis() - start;
        if (elapsed >= timeout) {
          throw new InterruptedException(
            "Timed out waiting for operation to complete");
        }
        System.out.println("waiting...");
        if (zone != null) {
          Compute.ZoneOperations.Get get =
            compute.zoneOperations().get(PROJECT_ID, zone, opId);
          operation = get.execute();
        } else {
          Compute.GlobalOperations.Get get = 
            compute.globalOperations().get(PROJECT_ID, opId);
          operation = get.execute();
        }
        if (operation != null) {
          status = operation.getStatus();
        }
      }
      return operation == null ? null : operation.getError();
    }

  /**
   * Set up Network Interface on VM Instance.
   * @param {Instance} instance - the instance the interface will be added to.
   */
  private void setUpNetworkInterace(Instance instance) {
    NetworkInterface ifc = new NetworkInterface();
    ifc.setNetwork(String.format(
    "https://www.googleapis.com/compute/v1/projects/%s/global/networks/default",
    PROJECT_ID));
    List configs = new ArrayList<>();
    AccessConfig config = new AccessConfig();
    config.setType(NETWORK_INTERFACE_CONFIG);
    config.setName(NETWORK_ACCESS_CONFIG);
    configs.add(config);
    ifc.setAccessConfigs(configs);
    instance.setNetworkInterfaces(Collections.singletonList(ifc));
  }

  /**
   * Adds attached Persistent Disk to VM Instance.
   * @param {Instance} instance - the instance the disk will be added to.
   */
  private void setUpDisk(Instance instance) {
    AttachedDisk disk = new AttachedDisk();
    disk.setBoot(true);
    disk.setAutoDelete(true);
    disk.setType("PERSISTENT");
    AttachedDiskInitializeParams params = new AttachedDiskInitializeParams();
    params.setDiskName(instance.getName());
    params.setSourceImage(SOURCE_IMAGE_PREFIX + SOURCE_IMAGE_PATH);
    params.setDiskType(String.format(
      "projects/%s/zones/%s/diskTypes/pd-standard",
      PROJECT_ID, ZONE_NAME));
    disk.setInitializeParams(params);
    instance.setDisks(Collections.singletonList(disk));
  }

  /**
   * Adds created metadata for startup script and vncServerPassword to 
   * VM instance.
   * @param {Instance} instance - the instance the metadata will be added to.
   * @param {String} vncServerPassword - the password needed to access to
   *    vnc server.
   */
  private void setUpMetadata(Instance instance, String vncServerPassword) {
    instance.setMetadata(createMetadata(vncServerPassword));
  }

  /** 
   * Creates metadata for startup script and vncServerPassword.
   * @param {String} vncServerPassword - the password needed to access to
   *    vnc server.
   */
  private Metadata createMetadata(String vncServerPassword) {
    Metadata meta = new Metadata();
    Metadata.Items item = new Metadata.Items();
    item.setKey(STARTUP_SCRIPT_URL_KEY);
    item.setValue(String.format("gs://%s/starter_script.sh", PROJECT_ID));
    Metadata.Items item2 = new Metadata.Items();
    item2.setKey(VNC_SERVER_PASSWORD_KEY);
    item2.setValue(vncServerPassword);
    meta.setItems(Arrays.asList(item, item2 )); 
    return meta;
  }

  /** 
   * Initialize the service account to be used by the VM Instance and set
   * the API access scopes.
   * @param {Instance} instance - the instance the account will be assigned to.
   */
  private void setUpServiceAccounts(Instance instance) {
    ServiceAccount account = new ServiceAccount();
    account.setEmail("default");
    List<String> scopes = new ArrayList<>();
    scopes.add(SCOPE_FULL_CONTROL);
    scopes.add(SCOPE_COMPUTE);
    account.setScopes(scopes);
    instance.setServiceAccounts(Collections.singletonList(account));
  }

  /**
   * Call Compute Engine API operation and poll for operation completion
   * status. 
   */
  private void waitForOperationCompletion(Operation op) {
    try {
      System.out.println("Waiting for operation completion...");
      Operation.Error error = blockUntilComplete
        (compute, op, OPERATION_TIMEOUT_MILLIS);
      if (error == null) {
        System.out.println("Success!");
      } 
      else {
        System.out.println(error.toPrettyString());
      }
    } catch (IOException e) {
        System.out.println("Got error!");
        System.err.println(e.getMessage());
    } catch (Throwable t) {
        t.printStackTrace();
    }
  }
}