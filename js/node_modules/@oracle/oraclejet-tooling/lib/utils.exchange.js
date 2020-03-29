#! /usr/bin/env node
/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

/**
 * ## Dependencies
 */
// Node
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Writable = require('stream').Writable;

// Oracle
const CONSTANTS = require('./constants');
const util = require('./util');

/**
 * # Utils
 *
 * @public
 */
const exchangeUtils = module.exports;
let requestObject = {};

/**
 * ## resolve
 *
 * @public
 * @param {string} changeType
 * @param {Array} componentNames
 * @param {Object} options
 * @returns {Promise}
 */
exchangeUtils.resolve = function (changeType, componentNames, options) {
  requestObject = {
    // jetVersion: util.getJETVersion(),
    config: _getConfig(),
    environment: _getEnvironment(),
    changes: {
      [changeType]: {}
    }
  };

  return new Promise((resolve, reject) => {
    _getChanges(changeType, componentNames, options)
      .then(_resolveDependencies)
      .then((solutions) => {
        resolve(solutions);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * ## _getConfig
 *
 * @private
 */
function _getConfig() {
  return util.readJsonAndReturnObject(`./${CONSTANTS.ORACLE_JET_CONFIG_JSON}`).components;
}

/**
 * ## _getEnvironment
 *
 * @private
 */
function _getEnvironment() {
  const jetCompsDir = `./${CONSTANTS.JET_COMPONENTS_DIRECTORY}`;
  const compJson = CONSTANTS.JET_COMPONENT_JSON;
  const componentsDirectories = util.getDirectories(jetCompsDir);
  const environment = {};
  componentsDirectories.forEach((componentDir) => {
    const componentJsonPath = path.join(jetCompsDir, componentDir, compJson);
    const componentJson = util.readJsonAndReturnObject(componentJsonPath);

    if (componentJson.type === 'pack') {
      environment[componentDir] = {
        version: componentJson.version,
        components: {}
      };
      const packComponentsDirectories = util.getDirectories(path.join(jetCompsDir, componentDir));

      packComponentsDirectories.forEach((packComponentDir) => {
        const compJsonPath = path.join(jetCompsDir, componentDir, packComponentDir, compJson);
        if (fs.existsSync(compJsonPath)) {
          const packComponentJson = util.readJsonAndReturnObject(compJsonPath);

          environment[componentDir].components[packComponentJson.name] = packComponentJson.version;
        }
      });
    } else {
      environment[componentJson.name] = componentJson.version;
    }
  });

  return environment;
}

/**
 * ## _getChanges
 *
 * @private
 * @param {string} changeType
 * @param {Array} componentNames
 * @param {Object} options
 * @returns {Promise}
 */
function _getChanges(changeType, componentNames, options) {
  return new Promise((resolve, reject) => {
    let i = 0;
    let firstPackName = '';

    function fn() {
      if (i < componentNames.length) {
        const componentName = componentNames[i];

        const requestedVersion = util.getRequestedComponentVersion(componentName);
        const plainComponentName = util.getPlainComponentName(componentName);

        if (changeType === 'add' && options && options['pack-version']) {
          util.fetchComponentMetadata(componentName)
            .then((metadata) => {
              // Add component to changes property
              requestObject.changes[changeType][plainComponentName] = requestedVersion || '*';

              // If pack, add also pack to changes property
              const packName = metadata.pack;
              if (packName) {
                if (changeType === 'add' && options && options['pack-version']) {
                  if (firstPackName === '' || firstPackName === packName) {
                    firstPackName = packName;
                    requestObject.changes[changeType][packName] = options['pack-version'];
                  } else {
                    reject(`Component ${componentName} does not belong to a ${firstPackName} pack.`);
                  }
                } else {
                  requestObject.changes[changeType][packName] = '*';
                }
              }
            })
            .then(() => {
              i += 1;
              fn();
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          // Add component to changes property
          requestObject.changes[changeType][plainComponentName] = requestedVersion || '*';
          i += 1;
          fn();
        }
      } else {
        resolve();
      }
    }
    fn();
  });
}

/**
 * ## _resolveDependencies
 *
 * @private
 * @returns {Promise}
 */
function _resolveDependencies() {
  return new Promise((resolve, reject) => {
    util.log('Resolving dependencies.');
    util.request({
      method: 'PUT',
      path: '/dependencyResolver',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }, JSON.stringify(requestObject))
      .then((response) => {
        let responseBody = '';
        response.on('data', (respBody) => {
          responseBody += respBody;
        });
        response.on('end', () => {
          util.checkForHttpErrors(response, responseBody);
          if (util.isVerbose()) {
            util.log('Response body');
            util.log(responseBody);
          }
          const res = JSON.parse(responseBody);
          if (res.solutions && res.solutions.length === 0) {
            util.log.warning('Requested component(s)/version(s) or their dependencies cannot be found in Exchange or are in conflict with already installed components.');
          } else {
            util.log('Dependencies resolved.');
          }
          resolve(JSON.parse(responseBody));
        });
        response.on('error', (error) => {
          reject(error);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * ## _getAccessToken
 *
 * @private
 * @param {string} user
 * @param {string} pass
 * @param {function} callback
 * @returns {Promise}
 */
exchangeUtils.getAccessToken = function (user, pass) {
  // Web case - Authorization Code Grant Type
  // http://docs.oracle.com/en/cloud/paas/identity-cloud/idcsb/AuthCodeGT.html

  // CLI case - Resource Owner Password Credentials Grant Type
  return new Promise((resolve, reject) => {
    const body = `username=${user}&password=${pass}`;

    util.request({
      method: 'POST',
      path: '/auth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }, body)
      .then((response) => {
        let responseBody = '';
        response.on('data', (respBody) => {
          responseBody += respBody;
        });
        response.on('end', () => {
          if (util.isVerbose()) {
            util.log('Access token:');
            util.log(responseBody);
          }
          util.checkForHttpErrors(response, responseBody);
          resolve(responseBody);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * ## _login
 *
 * @private
 * @returns {Promise}
 */
exchangeUtils.login = function () {
  return new Promise((resolve) => {
    const mutableStdout = new Writable({
      write(chunk, encoding, cb) {
        if (!this.muted) {
          process.stdout.write(chunk, encoding);
        }
        cb();
      }
    });

    const rl = readline.createInterface({
      input: process.stdin,
      output: mutableStdout,
      terminal: true
    });

    rl.question('Username: ', (user) => {
      rl.question('Password: ', (pass) => {
        mutableStdout.muted = false;
        util.log('\n');
        rl.close();

        exchangeUtils.getAccessToken(user, pass)
          .then((accessToken) => {
            util.log('Access token successfully retrieved.');
            resolve(accessToken);
          });
      });
      mutableStdout.muted = true;
    });
  });
};
