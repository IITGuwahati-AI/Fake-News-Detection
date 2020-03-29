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
const fse = require('fs-extra');
const http = require('http');
const https = require('https');
const path = require('path');
const url = require('url');

// 3rd party
const archiver = require('archiver');
const extract = require('extract-zip');
const FormData = require('form-data');

// Oracle
const CONSTANTS = require('../constants');
const exchangeUtils = require('../utils.exchange');
const util = require('../util');
const build = require('../build');

/**
 * ## Variables
 */
const componentsDirPath = CONSTANTS.JET_COMPONENTS_DIRECTORY;

/**
 * # Components
 *
 * @public
 */
const component = module.exports;

/**
 * ## add
 *
 * @public
 * @param {Array} componentNames
 * @param {Object} options
 */
component.add = function (componentNames, options) {
  return new Promise((resolve) => {
    util.ensureExchangeUrl();
    util.ensureDir(`./${CONSTANTS.JET_COMPONENTS_DIRECTORY}`);

    exchangeUtils.resolve('add', componentNames, options)
      .then(_executeSolutions)
      .then(() => {
        util.log.success(`Component(s) '${componentNames}' added.`);
        resolve();
      })
      .catch((error) => {
        util.log.error(error, true);
      });
  });
};

function _executeSolutions(resolutionServiceResponse) {
  return new Promise((resolve, reject) => {
    if (resolutionServiceResponse.solutions.length === 0) {
      if (resolutionServiceResponse.message) {
        reject(resolutionServiceResponse.message);
      } else {
        reject('Sorry, your request could not be resolved.');
      }
    } else {
      util.log('Updating project components.');
      _applyEnvironmentChangesRemove(resolutionServiceResponse.solutions[0])
        .then((solution) => { // eslint-disable-line
          return _applyEnvironmentChangesAddOrUpdate(solution, 'add');
        })
        .then((solution) => { // eslint-disable-line
          return _applyEnvironmentChangesAddOrUpdate(solution, 'update');
        })
        .then(_applyConfigChanges)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

function _applyEnvironmentChangesRemove(solution) {
  return new Promise((resolve) => {
    const changes = solution.environmentChanges;
    if (util.hasProperty(changes, 'remove')) {
      const rmChanges = changes.remove;
      let counter = 0;
      Object.keys(rmChanges).forEach((comp) => {
        const componentDirPath = path.join(componentsDirPath, comp);

        if (typeof rmChanges[comp] === 'string') {
          // Component
          if (fs.existsSync(componentDirPath)) {
            util.deleteDir(componentDirPath);
            counter += 1;
          } else {
            util.log.warning(`Component '${comp}' not found. Skipping.`);
          }
        } else if (typeof rmChanges[comp] === 'object') {
          // Pack
          Object.keys(rmChanges[comp].components).forEach((packComp) => {
            const packComponentDirPath = path.join(componentsDirPath, comp, packComp);

            if (fs.existsSync(packComponentDirPath)) {
              util.deleteDir(packComponentDirPath);
              counter += 1;
            } else {
              util.log.warning(`Component '${comp}/${packComp}' not found. Skipping.`);
            }
          });

          // If pack remains empty, delete it
          const packDirs = util.getDirectories(componentDirPath);

          // Find index of the first component
          const index = packDirs.findIndex((dir) => { // eslint-disable-line
            return fs.existsSync(path.join(componentDirPath, dir, CONSTANTS.JET_COMPONENT_JSON));
          });

          // Delete pack
          if (index === -1) {
            util.log(`Pack '${comp}' removed as it remained empty.`);
            util.deleteDir(componentDirPath);
          }
        }
      });
      util.log(`${counter} component(s) removed from project.`);
      resolve(solution);
    } else {
      resolve(solution);
    }
  });
}

function _applyEnvironmentChangesAddOrUpdate(solution, type) {
  return new Promise((resolve, reject) => {
    const changes = solution.environmentChanges;
    if (util.hasProperty(changes, type)) {
      const componentNames = [];
      const envChanges = changes[type];
      let counter = 0;
      Object.keys(envChanges).forEach((comp) => {
        if (typeof envChanges[comp] === 'string') {
          // Component
          componentNames.push(`${comp}@${envChanges[comp]}`);
          counter += 1;
        } else if (typeof envChanges[comp] === 'object') {
          // Pack
          // 1. Add pack itself
          const packDirPath = path.join(componentsDirPath, comp);
          if (fs.existsSync(packDirPath) && type === 'add') {
            // Already exists, add only if versions differ
            const packComponentJsonPath = path.join(packDirPath, CONSTANTS.JET_COMPONENT_JSON);
            const packComponentJson = util.readJsonAndReturnObject(packComponentJsonPath);
            if (packComponentJson.version !== envChanges[comp].version) {
              componentNames.push(`${comp}@${envChanges[comp].version}`);
            } else {
              util.log(`Pack ${comp} already installed. Skipping.`);
            }
          } else {
            // Does not exits yet || Update
            componentNames.push(`${comp}@${envChanges[comp].version}`);
          }

          // 2. Add pack components
          Object.keys(envChanges[comp].components).forEach((packComp) => {
            componentNames.push(`${comp}-${packComp}@${envChanges[comp].components[packComp]}`);
            counter += 1;
          });
        }
      });
      _installComponents(componentNames)
        .then(() => {
          if (componentNames.length > 0) {
            util.log(`${counter} component(s) added to project.`);
          }
        })
        .then(() => {
          resolve(solution);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      resolve(solution);
    }
  });
}

function _applyConfigChanges(solution) {
  return new Promise((resolve) => {
    util.log('Applying changes to configuration file.');
    const configObj = util.readJsonAndReturnObject(`./${CONSTANTS.ORACLE_JET_CONFIG_JSON}`);
    let components = configObj.components || {};
    const changes = solution.configChanges;

    // Remove
    if (util.hasProperty(changes, 'remove')) {
      const rmChanges = changes.remove;
      Object.keys(rmChanges).forEach((comp) => {
        if (typeof rmChanges[comp] === 'string') {
          // Component
          delete components[comp];
        } else if (typeof rmChanges[comp] === 'object') {
          // Pack
          Object.keys(rmChanges[comp].components).forEach((packComp) => {
            // Condition not to let it crash if user config.json is missing the component
            const cmp = components[comp];
            if (cmp && cmp.components && cmp.components[packComp]) {
              delete components[comp].components[packComp];
            }
          });

          // If pack remains empty, delete it
          if (util.isObjectEmpty(components[comp].components)) {
            delete components[comp];
          }
        }
      });
    }

    // Add
    if (util.hasProperty(changes, 'add')) {
      components = _mergeChanges(components, changes.add);
    }

    // Update
    if (util.hasProperty(changes, 'update')) {
      components = _mergeChanges(components, changes.update);
    }

    // We must reassign as it could be initialised an empty object
    configObj.components = components;
    fs.writeFileSync(`./${CONSTANTS.ORACLE_JET_CONFIG_JSON}`, JSON.stringify(configObj, null, 2));
    util.log('Changes to configuration file applied.');
    resolve();
  });
}

function _mergeChanges(components, changes) {
  const mergedComponents = components;

  Object.keys(changes).forEach((comp) => {
    if (typeof changes[comp] === 'string') {
      // Component
      Object.assign(mergedComponents, { [comp]: changes[comp] });
    } else if (typeof changes[comp] === 'object') {
      // Pack
      const pack = mergedComponents[comp] || {};
      // Merge pack components
      pack.components = pack.components || {};
      Object.assign(pack.components, changes[comp].components);
      // Merge version
      pack.version = changes[comp].version;

      // Merge pack
      mergedComponents[comp] = pack;
    }
  });
  return mergedComponents;
}

/**
 * ## _installComponents
 *
 * @public
 * @param {Array} componentNames
 * @returns {Promise}
 */
function _installComponents(componentNames) {
  return new Promise((resolve, reject) => {
    let i = 0;

    function fn() {
      if (i < componentNames.length) {
        const componentName = componentNames[i];

        _fetchMetadata(componentName)
          .then(_fetchArchive)
          .then(_unpackArchive)
          .then(_installReferenceComponent)
          .then(() => {
            i += 1;
            fn();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve();
      }
    }
    fn();
  });
}

/**
 * ## _fetchMetadata
 *
 * @private
 * @param {string} componentName
 * @returns {Promise}
 */
function _fetchMetadata(componentName) {
  const config = require('../config'); // eslint-disable-line
  const cachedComponentData = config.get(componentName);
  return new Promise((resolve) => {
    if (cachedComponentData) {
      resolve(cachedComponentData);
    } else {
      util.fetchComponentMetadata(componentName)
        .then((metadata) => {
          resolve(metadata);
        });
    }
  });
}

/**
 * ## _fetchArchive
 *
 * @private
 * @param {Object} componentMetadata
 * @returns {Promise}
 */
function _fetchArchive(componentMetadata) {
  const metadata = componentMetadata;
  const connection = url.parse(metadata.codeUrl);

  return new Promise((resolve) => {
    util.log(`Fetching '${metadata.name}' bits from Exchange.`);
    const protocol = connection.protocol === 'https:' ? https : http;

    protocol.get(connection, (response) => {
      const buffers = [];
      response.on('data', (body) => {
        buffers.push(body);
      });
      response.on('end', () => {
        util.checkForHttpErrors(response, buffers.toString());

        fs.writeFileSync(`./${metadata.name}.zip`, Buffer.concat(buffers));
        resolve(metadata);
      });
    });
  });
}

/**
 * ## _unpackArchive
 *
 * @private
 * @param {Object} componentMetadata
 * @returns {Promise}
 */
function _unpackArchive(componentMetadata) {
  const componentName = componentMetadata.name;
  let componentDirPath = '';

  if (componentMetadata.pack) {
    componentDirPath = path.join(componentsDirPath, componentMetadata.pack, componentName);
  } else {
    componentDirPath = path.join(componentsDirPath, componentName);
  }

  return new Promise((resolve, reject) => {
    // When updating, delete the original one
    if (fs.existsSync(componentDirPath)) {
      if (!componentMetadata.type === 'pack') {
        // 1. Component, just delete dir
        util.deleteDir(componentDirPath);
      } else {
        // 2. Pack, delete all files and folders without component.json inside
        // Files
        util.getFiles(componentDirPath).forEach((file) => {
          util.deleteFile(path.join(componentDirPath, file));
        });

        // Directories
        util.getDirectories(componentDirPath).forEach((dir) => {
          if (!fs.existsSync(path.join(componentDirPath, dir, CONSTANTS.JET_COMPONENT_JSON))) {
            util.deleteDir(path.join(componentDirPath, dir));
          }
        });
      }
    }

    util.log(`Unpacking '${componentName}' archive.`);
    const zipFileName = `${componentName}.zip`;

    extract(zipFileName, {
      dir: path.join(process.cwd(), componentDirPath)
    }, (error) => {
      if (error) {
        reject(error);
      }
      util.deleteFile(zipFileName, () => {
        util.log(`Component '${componentName}' archive was successfully unpacked and installed.`);
        resolve(componentMetadata);
      });
    });
  });
}

/**
 * ## _installReferenceComponent
 *
 * @private
 * @param {Object} componentMetadata
 * @returns {Promise}
 */
function _installReferenceComponent(componentMetadata) {
  return new Promise((resolve, reject) => {
    if (componentMetadata.type === 'reference') {
      // Call npm install <componentName>
      const npmPackageName = componentMetadata.component.package;
      util.log(`Installing npm package '${npmPackageName}' referenced by '${componentMetadata.name}.'`);
      util.spawn('npm', ['install', npmPackageName])
        .then(() => {
          util.log(`Npm package '${npmPackageName}' was successfully installed.`);
          resolve(componentMetadata);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      // Continue doing nothing
      resolve(componentMetadata);
    }
  });
}

/**
 * ## list
 * Lists installed components
 *
 * @private
 */
component.list = function () {
  return new Promise((resolve) => {
    // Read components from the config file
    const componentsInConfigFile = [];
    const configObj = util.readJsonAndReturnObject(`./${CONSTANTS.ORACLE_JET_CONFIG_JSON}`);
    if (!util.isObjectEmpty(configObj.components)) {
      Object.keys(configObj.components).forEach((comp) => {
        if (typeof configObj.components[comp] === 'object') {
          // Pack
          Object.keys(configObj.components[comp].components).forEach((packComponent) => {
            componentsInConfigFile.push(`${comp}-${packComponent}`);
          });
        } else {
          componentsInConfigFile.push(comp);
        }
      });
    }

    // Read components by directories
    const componentsByFolder = [];
    if (fs.existsSync(componentsDirPath)) {
      const folderNames = util.getDirectories(componentsDirPath);

      folderNames.forEach((folder) => {
        const componentJson = util.readJsonAndReturnObject(`${componentsDirPath}/${folder}/${CONSTANTS.JET_COMPONENT_JSON}`);

        if (componentJson.type === 'pack') {
          // Components that belongs to pack
          const packFolderNames = util.getDirectories(`${componentsDirPath}/${folder}`);

          packFolderNames.forEach((packFolderName) => {
            const nestedComponentJsonPath = `${componentsDirPath}/${folder}/${packFolderName}/${CONSTANTS.JET_COMPONENT_JSON}`;
            if (fs.existsSync(nestedComponentJsonPath)) {
              componentsByFolder.push(`${folder}-${packFolderName}`);
            }
          });
        } else {
          // Components
          componentsByFolder.push(folder);
        }
      });
    }

    if (componentsByFolder.length === 0 && componentsInConfigFile.length === 0) {
      util.log.success('No components found.');
    }

    util.printList(componentsInConfigFile, componentsByFolder);
    util.log.success('Components listed.');
    resolve();
  });
};

/**
 * ## publish
 *
 * @public
 * @param {string} componentName
 * @param {Object} [options]
 */
component.publish = function (componentName, options) {
  return new Promise((resolve) => {
    const opts = options || {};
    util.ensureParameters(componentName, CONSTANTS.API_TASKS.PUBLISH);

    let componentComponentJsonPath = '';
    let componentVersion = '';
    let packComponentJsonPath = '';
    let packVersion = '';

    let buildPromise = new Promise((res) => {
      res();
    });

    if (options.release) {
      buildPromise = build('', { component: componentName });
    }

    if (!opts.pack) {
      // Component
      componentComponentJsonPath = path.join(CONSTANTS.APP_SRC_DIRECTORY, 'js', CONSTANTS.JET_COMPOSITE_DIRECTORY, componentName, CONSTANTS.JET_COMPONENT_JSON);
      if (fs.existsSync(componentComponentJsonPath)) {
        componentVersion = util.readJsonAndReturnObject(componentComponentJsonPath).version;
      } else {
        util.log.error(`Component's descriptor '${componentComponentJsonPath}' does not exist.`);
      }
    } else {
      // Pack component
      packComponentJsonPath = path.join(CONSTANTS.APP_SRC_DIRECTORY, 'js', CONSTANTS.JET_COMPOSITE_DIRECTORY, opts.pack, CONSTANTS.JET_COMPONENT_JSON);
      if (fs.existsSync(packComponentJsonPath)) {
        packVersion = util.readJsonAndReturnObject(packComponentJsonPath).version;
        // Pack Component
        componentComponentJsonPath = path.join(CONSTANTS.APP_SRC_DIRECTORY, 'js', CONSTANTS.JET_COMPOSITE_DIRECTORY, opts.pack, componentName, CONSTANTS.JET_COMPONENT_JSON);
        if (fs.existsSync(componentComponentJsonPath)) {
          componentVersion = util.readJsonAndReturnObject(componentComponentJsonPath).version;
        } else {
          util.log.error(`Pack component's descriptor '${componentComponentJsonPath}' does not exist.`);
        }
      } else {
        util.log.error(`Pack's descriptor '${packComponentJsonPath}' does not exist.`);
      }
    }

    let componentWebDirPath = '';
    let componentHybridDirPath = '';

    const webEndDirPath = opts.pack ?
      path.join(opts.pack, packVersion, componentName) :
      path.join(componentName, componentVersion);
    componentWebDirPath = path.join(CONSTANTS.WEB_DIRECTORY, 'js', CONSTANTS.JET_COMPOSITE_DIRECTORY, webEndDirPath);
    const hybridEndDirPath = opts.pack ?
      path.join(opts.pack, packVersion, componentName) :
      path.join(componentName, componentVersion);
    componentHybridDirPath = path.join(CONSTANTS.CORDOVA_DIRECTORY, 'www/js', CONSTANTS.JET_COMPOSITE_DIRECTORY, hybridEndDirPath);

    let existsInWebDir = fs.existsSync(componentWebDirPath);
    const existsInHybridDir = fs.existsSync(componentHybridDirPath);

    if (!existsInWebDir && !existsInHybridDir) {
      const componentDirSrcPath = opts.pack ? path.join(packComponentJsonPath, '..')
        : path.join(componentComponentJsonPath, '..');
      const componentDirDestPath = path.join(CONSTANTS.WEB_DIRECTORY, 'js', CONSTANTS.JET_COMPOSITE_DIRECTORY, webEndDirPath);
      fse.copySync(componentDirSrcPath, componentDirDestPath);
      existsInWebDir = true;
    }

    if (existsInWebDir || existsInHybridDir) {
      let user = '';
      let pass = '';

      if (opts) {
        user = opts.username;
        pass = opts.password;
      }

      let loginUser;

      if (opts._accessToken) {
        loginUser = function () {
          return new Promise((res) => {
            res(opts._accessToken);
          });
        };
      } else {
        loginUser = function () {
          return (user && typeof user !== 'boolean' && pass && typeof pass !== 'boolean') ?
            exchangeUtils.getAccessToken(user, pass) : exchangeUtils.login();
        };
      }

      const componentPath = existsInHybridDir ? componentHybridDirPath : componentWebDirPath;

      buildPromise
        .then(loginUser)
        .then((resolvedAccessToken) => {
          opts._accessToken = resolvedAccessToken;
          return _packArchive(componentName, componentPath, opts);
        })
        .then(() => { // eslint-disable-line
          return _uploadToExchange(componentName, opts);
        })
        .then(() => {
          const resolvedComponentName = opts.pack ? `'${componentName}' of a pack '${opts.pack}'` : `'${componentName}'`;
          util.log.success(`Component ${resolvedComponentName} was published.`, opts);
          resolve();
        })
        .catch((error) => {
          util.log.error(error, true);
        });
    } else {
      util.log.error(`Component '${componentName}' not found in built directories:
'${componentWebDirPath}'
'${componentHybridDirPath}'
Please use 'ojet build' to build the project.`);
    }
  });
};

/**
 * ## _packArchive
 * Archives component folder
 *
 * @private
 * @param {string} componentName
 * @param {string} componentPath
 * @param {Object} [options]
 * @returns {Promise}
 */
function _packArchive(componentName, componentPath, options) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream('./component.zip');
    const archive = archiver('zip');

    output.on('close', () => {
      const resolvedComponentName = options.pack ? `'${componentName}' of a pack '${options.pack}'` : `'${componentName}'`;
      util.log(`Component ${resolvedComponentName} was successfully archived.`);
      resolve();
    });

    archive.on('warning', (error) => {
      util.log.warning(error);
    });

    archive.on('error', (error) => {
      reject(error);
    });

    archive.pipe(output);

    if (options && options._contentToArchive) {
      const customPaths = options._contentToArchive;
      customPaths.dirs.forEach((dir) => {
        archive.directory(path.join(componentPath, dir), dir);
      });
      customPaths.files.forEach((file) => {
        archive.file(path.join(componentPath, file), { name: file });
      });
    } else {
      archive.glob('**/*', {
        cwd: componentPath
      });
    }

    archive.finalize();
  });
}

/**
 * ## _uploadToExchange
 *
 * @private
 * @param {string} componentName
 * @param {Object} options
 * @returns {Promise}
 */
function _uploadToExchange(componentName, options) {
  return new Promise((resolve, reject) => {
    const compName = options.pack ? `'${componentName}' of a pack '${options.pack}'` : `'${componentName}'`;

    util.log(`Uploading ${compName} archive to Exchange.`);
    const archivePath = './component.zip';

    // Sending multipart form data
    // https://www.npmjs.com/package/form-data#alternative-submission-methods
    const multipart = new FormData();
    multipart.append('file', fs.createReadStream('./component.zip'));

    const multipartHeaders = multipart.getHeaders();
    const customHeaders = {
      Authorization: `${options._accessToken}`
    };
    const headers = Object.assign(multipartHeaders, customHeaders);

    util.request({
      method: 'POST',
      headers,
      path: '/components?access=PUBLIC',
    }, undefined, multipart)
      .then((response) => {
        let responseBody = '';
        response.on('data', (respBody) => {
          responseBody += respBody;
        });
        response.on('end', () => {
          util.checkForHttpErrors(response, responseBody, () => {
            util.deleteFile(archivePath);
          });
          const resolvedComponentName = options.pack ? `'${componentName}' of a pack '${options.pack}'` : `'${componentName}'`;
          util.log(`Component ${resolvedComponentName} was successfully uploaded to Exchange.`);
          util.deleteFile(archivePath, () => {
            resolve();
          });
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * ## remove
 *
 * @public
 * @param {Array} componentNames
 * @param {Boolean} isStrip
 * @param {Object} options
 */
component.remove = function (componentNames, isStrip, options) {
  return new Promise((resolve) => {
    // Skip this if it's strip and there are no components
    if (isStrip && (!componentNames || componentNames.length === 0)) {
      resolve();
      return;
    }
    util.ensureParameters(componentNames, CONSTANTS.API_TASKS.REMOVE);
    exchangeUtils.resolve('remove', componentNames)
      .then(_executeSolutions)
      .then(() => {
        if (componentNames.length !== 0 && !isStrip) {
          util.log.success(`Component(s) '${componentNames}' removed.`, options);
        }
        if (isStrip) {
          util.log.success('Strip project finished.');
        }
        resolve();
      })
      .catch((error) => {
        util.log.error(error, true);
      });
  });
};
