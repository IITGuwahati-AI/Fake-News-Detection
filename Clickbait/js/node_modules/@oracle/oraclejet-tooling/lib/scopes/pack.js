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

// Oracle
const CONSTANTS = require('../constants');
const component = require('./component');
const exchangeUtils = require('../utils.exchange');
const util = require('../util');

/**
 * # Components
 *
 * @public
 */
const pack = module.exports;

/**
 * ## add
 *
 * @public
 * @param {Array} packNames
 * @return {Promise}
 */
pack.add = function (packNames) {
  return new Promise((resolve, reject) => {
    let i = 0;

    function fn() {
      if (i < packNames.length) {
        const packName = packNames[i];

        util.fetchComponentMetadata(packName)
          .then((metadata) => { // eslint-disable-line
            return new Promise((res, rej) => {
              if (metadata.type === 'pack') {
                const packComponentNames = metadata.component.dependencies;

                // Add versions
                const packComponentNamesWithVersions = [];

                // Add pack with version
                packComponentNamesWithVersions.push(`${packName}@${metadata.version}`);

                // Ad components with versions
                Object.keys(packComponentNames).forEach((packComponentName) => {
                  packComponentNamesWithVersions.push(`${packComponentName}@${packComponentNames[packComponentName]}`);
                });

                component.add(packComponentNamesWithVersions, {
                  _suppressMsgColor: true,
                }).then(() => {
                  res();
                });
              } else {
                rej(`'${packName}' is not a pack.`);
              }
            });
          })
          .then(() => {
            i += 1;
            fn();
          })
          .catch((error) => {
            util.log.error(error, true);
            reject();
          });
      } else {
        util.log.success(`Pack(s) '${packNames}' added.`);
        resolve();
      }
    }
    fn();
  });
};

/**
 * ## create
 *
 * @public
 * @param {string} packName
 * @return {Promise}
 */
pack.create = function (packName) {
  return new Promise((resolve) => {
    util.ensureParameters(packName, CONSTANTS.API_TASKS.PUBLISH);

    const jetCompositesDirPath = path.join(process.cwd(), CONSTANTS.APP_SRC_DIRECTORY, 'js', CONSTANTS.JET_COMPOSITE_DIRECTORY);
    const packDirPath = path.join(jetCompositesDirPath, packName);
    // Check if already exists
    if (fs.existsSync(packDirPath)) {
      util.log.error(`Pack '${packName}' already exits.`);
    } else {
      // Make pack directory
      util.ensureDir(jetCompositesDirPath);
      util.ensureDir(packDirPath);

      // Add pack's component.json
      const packComponentJsonTemplatePath = path.join(__dirname, '../templates/pack', CONSTANTS.JET_COMPONENT_JSON);
      const packComponentJson = util.readJsonAndReturnObject(packComponentJsonTemplatePath);
      packComponentJson.name = packName;
      packComponentJson.jetVersion = `^${util.getJETVersion()}`;
      const filename = path.join(packDirPath, CONSTANTS.JET_COMPONENT_JSON);
      fs.writeFileSync(filename, JSON.stringify(packComponentJson, null, 2));
      util.log.success(`Pack '${packName}' successfully created.'`);
      resolve();
    }
  }).catch((error) => {
    util.log.error(error, true);
  });
};

/**
 * ## list
 * Lists installed packs
 *
 * @public
 * @return {Promise}
 */
pack.list = function () {
  return new Promise((resolve) => {
    // Read packs from the config file
    const packsInConfigFile = [];
    const configObj = util.readJsonAndReturnObject(`./${CONSTANTS.ORACLE_JET_CONFIG_JSON}`);
    if (!util.isObjectEmpty(configObj.components)) {
      Object.keys(configObj.components).forEach((comp) => {
        if (typeof configObj.components[comp] === 'object') {
          packsInConfigFile.push(`${comp}`);
        }
      });
    }

    // Read packs by directories
    const packsByFolder = [];
    const componentsDirPath = CONSTANTS.JET_COMPONENTS_DIRECTORY;
    if (fs.existsSync(componentsDirPath)) {
      const folderNames = util.getDirectories(componentsDirPath);

      folderNames.forEach((folderName) => {
        const componentJson = util.readJsonAndReturnObject(`${componentsDirPath}/${folderName}/${CONSTANTS.JET_COMPONENT_JSON}`);

        if (componentJson.type === 'pack') {
          packsByFolder.push(folderName);
        }
      });
    }

    if (packsByFolder.length === 0 && packsInConfigFile.length === 0) {
      util.log.success('No components found.');
    }

    util.printList(packsInConfigFile, packsByFolder);
    util.log.success('Packs listed.');
    resolve();
  }).catch((error) => {
    util.log.error(error, true);
  });
};

/**
 * ## publish
 *
 * @public
 * @param {string} packName
 * @return {Promise}
 */
pack.publish = function (packName, options) {
  return new Promise((resolve) => {
    util.ensureParameters(packName, CONSTANTS.API_TASKS.PUBLISH);

    const packComponentJsonPath = path.join(CONSTANTS.APP_SRC_DIRECTORY, 'js', CONSTANTS.JET_COMPOSITE_DIRECTORY, packName, CONSTANTS.JET_COMPONENT_JSON);
    let packComponentJson = {};
    let packVersion = '';
    if (fs.existsSync(packComponentJsonPath)) {
      packComponentJson = util.readJsonAndReturnObject(packComponentJsonPath);
      packVersion = packComponentJson.version;
    } else {
      util.log.error(`Pack's descriptor '${packComponentJsonPath}' does not exist.`);
    }

    const packWebDirPath = path.join(CONSTANTS.WEB_DIRECTORY, 'js', CONSTANTS.JET_COMPOSITE_DIRECTORY, packName, packVersion);
    const packHybridDirPath = path.join(CONSTANTS.CORDOVA_DIRECTORY, 'www/js', CONSTANTS.JET_COMPOSITE_DIRECTORY, packName, packVersion);
    const existsInWebDir = fs.existsSync(packWebDirPath);
    const existsInHybridDir = fs.existsSync(packHybridDirPath);

    if (existsInWebDir || existsInHybridDir) {
      let user = '';
      let pass = '';

      if (options) {
        user = options.username;
        pass = options.password;
      }

      // Save available components names for publishing
      const packComponentNamesAndVersions = [];
      Object.keys(packComponentJson.dependencies).forEach((packComponentName) => {
        // Remove pack name from full component name
        const shortComponentName = packComponentName.replace(`${packName}-`, '');
        const packComponentComponentJsonPath = path.join(CONSTANTS.APP_SRC_DIRECTORY, 'js', CONSTANTS.JET_COMPOSITE_DIRECTORY, packName, shortComponentName, CONSTANTS.JET_COMPONENT_JSON);
        if (fs.existsSync(packComponentComponentJsonPath)) {
          packComponentNamesAndVersions.push({
            [shortComponentName]:
            util.readJsonAndReturnObject(packComponentComponentJsonPath).version
          });
        } else {
          util.log(`Pack component's descriptor ${packComponentComponentJsonPath}' not found. This component won't be published. Skipping.`);
        }
      });

      const packPath = existsInHybridDir ? packHybridDirPath : packWebDirPath;
      let packDirs = util.getDirectories(packPath);

      // Save pack directories (not components)
      packDirs = packDirs.filter((packDir) => { // eslint-disable-line
        return Object.keys(packComponentNamesAndVersions).indexOf(packDir) === -1;
      });

      let packComponentNames = [];

      // Performing verification of pack and components to reduce possilbe errors
      _verifyPack(packName, packVersion)
        .then(() => { // eslint-disable-line
          return _verifyPackComponents(packName, packComponentNamesAndVersions);
        })
        .then((packComponentNamesToPublish) => {
          packComponentNames = packComponentNamesToPublish;
          return _userSignIn(user, pass);
        })
        .then((accessToken) => { // eslint-disable-line
          return new Promise((res, rej) => {
            let i = 0;
            function fn() {
              if (i < packComponentNames.length) {
                const packComponentName = packComponentNames[i];

                component.publish(packComponentName, {
                  pack: packName,
                  _accessToken: accessToken,
                  _suppressMsgColor: true,
                })
                  .then(() => {
                    i += 1;
                    fn();
                  })
                  .catch((error) => {
                    rej(error);
                  });
              } else {
                res(accessToken);
              }
            }
            fn();
          });
        })
        .then((accessToken) => { // eslint-disable-line
          // Publish pack
          return component.publish(packName, {
            _accessToken: accessToken,
            _contentToArchive: {
              dirs: packDirs,
              files: util.getFiles(packPath)
            },
            _suppressMsgColor: true,
          });
        })
        .then(() => {
          util.log.success(`Pack '${packName}' was uploaded to Exchange.`, options);
          resolve();
        })
        .catch((error) => {
          util.log.error(error, true);
        });
    } else {
      util.log.error(`Pack '${packName}' not found in built directories: 
'${packWebDirPath}'
'${packHybridDirPath}'
Please use 'ojet build' to build the project.\``);
    }
  });
};

/**
 * ## _userSignIn
 *
 * @private
 * @param {string} user
 * @param {string} pass
 * @return {Promise}
 */
function _userSignIn(user, pass) {
  return (user && typeof user !== 'boolean' && pass && typeof pass !== 'boolean') ?
    exchangeUtils.getAccessToken(user, pass) : exchangeUtils.login();
}

/**
 * ## _verifyPack
 *
 * @private
 * @param {string} packName
 * @param {string} packVersion
 * @return {Promise}
 */
function _verifyPack(packName, packVersion) {
  return new Promise((resolve, reject) => {
    util.request({
      path: path.join('components', packName, 'versions')
    }).then((response) => {
      let responseBody = '';
      response.on('data', (respBody) => {
        responseBody += respBody;
      });
      response.on('end', () => {
        if (response.statusCode.toString() === '404') {
          // Pack does not exists yet, continue ...
          resolve();
        } else {
          util.checkForHttpErrors(response, responseBody);
          const availableVersions = JSON.parse(responseBody);
          if (availableVersions.items.indexOf(packVersion) !== -1) {
            util.log.error(`Pack '${packName}@${packVersion}' is already published. Please update its version.`);
          } else {
            resolve();
          }
        }
      });
    })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * ## _verifyPackComponents
 *
 * @private
 * @param {string} packName
 * @param {Object} packComponentNamesAndVersions
 * @return {Promise}
 */
function _verifyPackComponents(packName, packComponentNamesAndVersions) {
  return new Promise((resolve, reject) => {
    let i = 0;
    const packComponentNamesToPublish = [];
    function fn() {
      if (i < packComponentNamesAndVersions.length) {
        const currentPackComponent = packComponentNamesAndVersions[i];
        const packComponentShortName = Object.keys(currentPackComponent)[0];
        const packComponentFullName = `${packName}-${packComponentShortName}`;
        const packComponentVersion = currentPackComponent[packComponentShortName];
        util.request({
          path: path.join('components', packComponentFullName, 'versions')
        }).then((response) => {
          let responseBody = '';
          response.on('data', (respBody) => {
            responseBody += respBody;
          });
          response.on('end', () => {
            if (response.statusCode.toString() === '404') {
              // Component does not exists yet, continue ...
              packComponentNamesToPublish.push(packComponentShortName);
            } else {
              util.checkForHttpErrors(response, responseBody);
              const availableVersions = JSON.parse(responseBody);
              if (availableVersions.items.indexOf(packComponentVersion) !== -1) {
                util.log(`Component '${packComponentShortName}@${packComponentVersion}' of a pack '${packName}' is already published. Skipping.`);
              } else {
                packComponentNamesToPublish.push(packComponentShortName);
              }
            }
            i += 1;
            fn();
          });
        })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(packComponentNamesToPublish);
      }
    }
    fn();
  });
}

/**
 * ## remove
 *
 * @public
 * @param {Array} packNames
 * @return {Promise}
 */
pack.remove = function (packNames) {
  return new Promise((resolve, reject) => {
    let i = 0;

    function fn() {
      if (i < packNames.length) {
        const packName = packNames[i];
        const packPath = `${CONSTANTS.JET_COMPONENTS_DIRECTORY}/${packName}`;

        if (fs.existsSync(packPath)) {
          const packComponentNames = [];
          const packDirs = util.getDirectories(packPath);

          packDirs.forEach((packDir) => {
            const packComponentComponentJsonPath =
              path.join(packPath, packDir, CONSTANTS.JET_COMPONENT_JSON);
            if (fs.existsSync(packComponentComponentJsonPath)) {
              const packComponentComponentJson =
                util.readJsonAndReturnObject(packComponentComponentJsonPath);
              packComponentNames.push(`${packComponentComponentJson.pack}-${packComponentComponentJson.name}@${packComponentComponentJson.version}`);
            }
          });

          component.remove(packComponentNames, null, {
            _suppressMsgColor: true,
          })
            .then(() => {
              i += 1;
              fn();
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          util.log.error(`Pack '${packName}' not found.`);
          i += 1;
          fn();
        }
      } else {
        util.log.success(`Pack(s) '${packNames}' removed.`);
        resolve();
      }
    }
    fn();
  });
};
