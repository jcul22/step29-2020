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
import java.util.List;
import java.util.Optional;
import java.lang.reflect.*;


/** Class that creates, stops and deletes VM instances. */
public class ComputeAPIClient implements ComputeAPIClientInterface {
  private static final String APPLICATION_NAME = "VMN";
  private static final String PROJECT_ID = "taniecer-step-2020";
  private static final String ZONE_NAME = "us-central1-f";
  private static final String SOURCE_IMAGE_PREFIX =
    "https://www.googleapis.com/compute/v1/projects/";
  private static final String SOURCE_IMAGE_PATH =
    "eip-images/global/images/ubuntu-1604-lts-drawfork-v20200208";
  private static final String NETWORK_INTERFACE_CONFIG = "ONE_TO_ONE_NAT";
  private static final String NETWORK_ACCESS_CONFIG = "External NAT";
  private static final long OPERATION_TIMEOUT_MILLIS = 60 * 1000;
  private static HttpTransport httpTransport;
  private static final JsonFactory JSON_FACTORY = 
    JacksonFactory.getDefaultInstance();
  private static GoogleCredentials credential;
  private  Compute compute;

  /** 
   * Creates an environment, calls each operation and tracks to see if they 
   * are executed.
   * @param {String} operation - the name of the method that should be called.
   * @param {String} instanceName - the name of the instance being operated on.
   * @param {Optional<String>} password - the password needed to access this 
   *    instance. Not all operations requires a password.
   */
  public void helper(String operation, String instanceName,
    Optional<String> password) {
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
        Operation op = null;
        if (operation == "createInstance") {
          op = createInstance(instanceName, password.get());
        }
        else if (operation == "deleteInstance") {
          op = deleteInstance(instanceName);
        }
        else if (operation == "stopInstance") {
          op = stopInstance(instanceName);
        }
        else if (operation == "restartInstance") {
          op = restartInstance(instanceName, password.get());
        }
        else {
          System.out.println("Operation not found!");
        }
        // Call Compute Engine API operation and poll for operation completion 
        // status
        System.out.println("Waiting for operation completion...");
        Operation.Error error = blockUntilComplete
          (compute, op, OPERATION_TIMEOUT_MILLIS);
        if (error == null) {
          System.out.println("Success!");
        } else {
          System.out.println(error.toPrettyString());
        }
      } catch (IOException e) {
          System.out.println("Got error!");
          System.err.println(e.getMessage());
      } catch (Throwable t) {
          t.printStackTrace();
        }
    }
    
  // [START create_instances]
  public Operation createInstance(String instanceName, String password)
    throws IOException {
      Instance instance = new Instance();
      instance.setName(instanceName);
      instance.setMachineType(String.format(
        "projects/taniecer-step-2020/zones/us-central1-f/machineTypes/n1-standard-1",
        PROJECT_ID, ZONE_NAME));
      CustomerEncryptionKey key = new CustomerEncryptionKey();
      key.setRawKey(password);
      // Add Network Interface to be used by VM Instance.
      NetworkInterface ifc = new NetworkInterface();
      ifc.setNetwork(String.format(
        "https://www.googleapis.com/compute/v1/projects/%s/global/networks/default",
        PROJECT_ID));
      List<AccessConfig> configs = new ArrayList<>();
      AccessConfig config = new AccessConfig();
      config.setType(NETWORK_INTERFACE_CONFIG);
      config.setName(NETWORK_ACCESS_CONFIG);
      configs.add(config);
      ifc.setAccessConfigs(configs);
      instance.setNetworkInterfaces(Collections.singletonList(ifc));
      AttachedDisk disk = new AttachedDisk();
      disk.setBoot(true);
      disk.setAutoDelete(true);
      disk.setType("PERSISTENT");
      AttachedDiskInitializeParams params = new AttachedDiskInitializeParams();
      params.setDiskName(instanceName);
      params.setSourceImage(SOURCE_IMAGE_PREFIX + SOURCE_IMAGE_PATH);
      params.setDiskType(String.format(
        "projects/taniecer-step-2020/zones/us-central1-a/diskTypes/pd-standard",
        PROJECT_ID, ZONE_NAME));
      disk.setInitializeParams(params);
      instance.setDisks(Collections.singletonList(disk));
      ServiceAccount account = new ServiceAccount();
      account.setEmail("default");
      List<String> scopes = new ArrayList<>();
      scopes.add("https://www.googleapis.com/auth/devstorage.full_control");
      scopes.add("https://www.googleapis.com/auth/compute");
      account.setScopes(scopes);
      instance.setServiceAccounts(Collections.singletonList(account));
      System.out.println(instance.toPrettyString());
      Compute.Instances.Insert create = 
        compute.instances().insert(PROJECT_ID, ZONE_NAME, instance);
      return create.execute();
    } 

  public Operation stopInstance(String instanceName) throws Exception {
    Compute.Instances.Stop stop =
      compute.instances().stop(PROJECT_ID, ZONE_NAME, instanceName);
      return stop.execute();
  }

  public Operation restartInstance(String instanceName, String password) 
    throws Exception {
      CustomerEncryptionKey key = new CustomerEncryptionKey();
      key.setRawKey(password);
      Compute.Instances.Start restart =
        compute.instances().start(PROJECT_ID, ZONE_NAME, instanceName);
        return restart.execute();
    }

  public Operation deleteInstance(String instanceName) throws Exception {
    Compute.Instances.Delete delete =
      compute.instances().delete(PROJECT_ID, ZONE_NAME, instanceName);
      return delete.execute();
  }

  public static Operation.Error blockUntilComplete(
    Compute compute, Operation operation, long timeout) throws Exception {
      long start = System.currentTimeMillis();
      final long pollInterval = 5 * 1000;
      String zone = operation.getZone(); // null for global/regional operations
      if (zone != null) {
        String[] bits = zone.split("/");
        zone = bits[bits.length - 1];
      }
      String status = operation.getStatus();
      String opId = operation.getName();
      while (operation != null && !status.equals("DONE")) {
        Thread.sleep(pollInterval);
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
}