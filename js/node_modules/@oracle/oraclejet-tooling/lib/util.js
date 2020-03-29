/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

/**
 * # Dependencies
 */
/* 3rd party */
const fs = require('fs-extra');
const glob = require('glob');
const UglifyJS = require('uglify-es');

const _ = {};
_.difference = require('lodash.difference');
_.isFunction = require('lodash.isfunction');
_.mergeWith = require('lodash.mergewith');
_.remove = require('lodash.remove');
_.union = require('lodash.union');

/* Node.js native */
const http = require('http');
const https = require('https');
const childProcess = require('child_process');
const path = require('path');
const StringDecoder = require('string_decoder').StringDecoder;
const url = require('url');

/* Oracle */
const CONSTANTS = require('./constants');

/**
 * # Utils
 *
 * @public
 */
const util = module.exports;

util.rootPath = __dirname;


/**
 * get the minified component path.
 * @private
 * @param {String} path to component
 * @returns the minified componentPath
 */
util.getComponentDest = function (componentPath) {
  return path.join(componentPath, 'min');
};

/**
 * @private
 * @param {Object} context
 * @returns an updated config object.
 */
util.processContextForHooks = function (context) {
  //
  // Assemble the necessary environment variables for writing hooks
  // Create hooks context from context parameter.
  // Note that "ojet build" defines the .platform, .opts, and .buildType properties,
  // while ojet build component" defines the componentConfig property.
  //
  const obj = {};
  if (context) {
    if (context.platform) {
      obj.platform = context.platform;
    }
    if (context.theme) {
      obj.theme = context.opts.theme;
    }
    if (context.buildType) {
      obj.buildType = context.buildType;
    }
    if (context.componentConfig) {
      obj.componentConfig = context.componentConfig;
    }
    if (context.opts && context.opts.userOptions) {
      obj.userOptions = context.opts.userOptions;
    }
  }
  const config = require('./config'); // eslint-disable-line global-require
  obj.paths = config('paths');
  return obj;
};


/**
 * ## templatePath
 * Determines the templatePath.
 *
 * @public
 * @param {String} rootDir
 * @returns {String} The path of where this script lives.
 * Getting the src when copying hooks from this module.
 */
util.templatePath = function (rootDir) {
  const templatePath = rootDir || '';
  return path.resolve(__dirname, '..', templatePath);
};

/**
 * ## destPath
 * Determines the destinationPath.
 *
 * @public
 * @param  {String} rootDir
 * @returns {String} The path to appDir directory.
 */
util.destPath = function (rootDir) {
  const destPath = rootDir || '';
  return path.resolve(_getDestCwd(), destPath);
};

/**
 * ## _getDestCwd
 *
 * @private
 * @returns {String}
 */
function _getDestCwd() {
  return process.cwd();
}

/**
 * ## deleteDir
 *
 * @public
 * @param {string} dirPath
 */
util.deleteDir = function (dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = `${dirPath}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        util.deleteDir(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
};

/**
 * ## deleteFile
 *
 * @public
 * @param {string} filePath
 * @param {function} [callback]
 */
util.deleteFile = function (filePath, callback) {
  fs.unlink(filePath, (error) => {
    if (error) {
      util.log.error(error);
    }
    if (typeof callback === 'function' && callback()) {
      callback();
    }
  });
};

/**
 * ## ensureExchangeUrl
 * Check if exchange url is configured
 *
 * @public
 */
util.ensureExchangeUrl = function () {
  const configObj = util.readJsonAndReturnObject(`./${CONSTANTS.ORACLE_JET_CONFIG_JSON}`);
  if (!configObj[CONSTANTS.EXCHANGE_URL_PARAM]) {
    util.log.error('Exchange url is not configured. Please see \'ojet help configure\' for instructions.');
  }
};

/**
 * ## ensureDir
 * Check if directory exists. If not, create it.
 *
 * @public
 * @param {string} dirPath - Path to check
 */
util.ensureDir = function (dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

/**
 * ## ensureParameters
 *
 * @public
 * @param {string || Array} parameters
 */
util.ensureParameters = function (parameters, apiName) {
  if (typeof parameters === 'undefined' || (typeof parameters === 'object' && parameters.length === 0)) {
    util.log.error(`Please specify parameters for ojet.${apiName}()`);
  }
};

/**
 * ## ensurePathExists
 *
 * @public
 * @param {Array} parameters
 */
util.ensurePathExists = function (pathTo) {
  if (!fs.fsExists(pathTo)) {
    util.log.error(`${pathTo} does not exists.`);
  }
};

/**
 * ## exec
 * Executes shell commands asynchronously, outputting Buffer.
 *
 * @public
 * @param {string} command - The command to run, with space-separated arguments
 * @param {string} successMessage - If the string appears in output stream, Promise will be resolved
 * @returns {Promise}
 */
util.exec = (command, successMessage) => {
  util.log(`Executing: ${command}`);
  return new Promise((resolve, reject) => {
    const child = childProcess.exec(command, { maxBuffer: 1024 * 5000 });
    child.stdout.on('data', (data) => {
      util.log(data);
      if (successMessage && data.indexOf(successMessage) !== -1) {
        resolve();
      }
    });

    child.stderr.on('data', (data) => {
      util.log(data);
    });

    child.on('error', (err) => {
      reject(err);
    });
    // If childProcess invokes multiple proccesses(Cordova run, boot Android emulator).
    // The close event is triggered when all these processes stdio streams are closed.
    child.on('close', (code) => {
      if (code === 0) {
        util.log(`child process exited with code: ${code}`);
        resolve();
      } else {
        if (code === null) resolve();
        reject(`child process exited with code: ${code}`);
      }
    });
  });
};

/**
 * ## isObjectEmpty
 *
 * @param {Object} object
 * @returns {boolean}
 */
util.isObjectEmpty = function (object) {
  if (typeof object === 'object') {
    // Because Object.keys(new Date()).length === 0; we have to do some additional check
    return Object.keys(object).length === 0 && object.constructor === Object;
  }
  return true;
};

/**
 * ## spawn
 * Executes shell commands asynchronously, returning Stream.
 *
 * @public
 * @param {string} command              - The command to run
 * @param {Array} options               - Array of arguments
 * @param {string} [outputString]       - If the string appears in output stream,
 *                                        Promise will be resolved
 * @param {boolean} [logOutputArg=true] - Logs the output stream
 * @returns {Promise}
 */
util.spawn = (command, options, outputString, logOutputArg) => {
  /* unfortunately this is necessary for one to preserve the PATH for windows
   * there is a bug for nodejs (don't recall) dating back to 2012 or 13 and think
   * they won't fix it, since there were comments regarding status update from 2015
   */
  let cmd = '';
  let args = [];
  let logOutput = logOutputArg;
  if (process.platform === 'win32') {
    cmd = 'cmd.exe';
    args = ['/s', '/c', command];
  } else {
    cmd = command;
  }

  /* Join with other options*/
  args = args.concat(options);

  util.log(`Executing: ${cmd} ${args.join(' ')}`);

  return new Promise((resolve, reject) => {
    const task = childProcess.spawn(cmd, args);
    const decoder = new StringDecoder('utf8');

    task.stdout.on('data', (data) => {
      const search = decoder.write(data);

      if (logOutput === undefined) {
        logOutput = true;
      }

      if (outputString && search.indexOf(outputString) !== -1) {
        /*
         * We want to log this even when logging is disabled, since the outputString
         * typically contains key information that the user needs to know, eg. the
         * hostname:port in the server-only case.
         */
        util.log(search);
        resolve();
      } else if (logOutput) {
        util.log(search);
      }
    });

    task.stderr.on('data', data => util.log(_toString(data)));

    task.on('error', err => reject(err));

    task.on('close', (code) => {
      if (code === 0) {
        util.log(`child process exited with code: ${code}`);
        resolve();
      } else {
        if (code === null) resolve();
        reject(`child process exited with code: ${code}`);
      }
    });
  });
};

function _toString(bufferOrString) {
  return (Buffer.isBuffer(bufferOrString)) ?
  bufferOrString.toString('utf8') :
  bufferOrString;
}

/**
 * ## log
 * Prints each argument on a new line
 *
 * @public
 */
util.log = function () {
  // Disabling eslint as spread operator is required
  Object.keys(arguments).forEach((arg) => { // eslint-disable-line
    console.log(arguments[arg]); // eslint-disable-line
  });
};

/**
 * ## log.success
 *
 * @public
 * @param {string} message
 * @param {boolean} [options]
 */
util.log.success = function (message, options) {
  const suppress = options && options._suppressMsgColor;
  util.log(`${suppress ? '' : '\x1b[32m'}${message}${suppress ? '' : '\x1b[0m'}`);
};

/**
 * ## log.warning
 *
 * @public
 * @param {string} message
 */
util.log.warning = function (message) {
  util.log(`\x1b[33mWarning: ${message}\x1b[0m`);
};

/**
 * ## log.error
 *
 * @public
 * @param {string} message
 * @param {boolean} [omitErrorString=false]
 */
util.log.error = function (message, omitErrorString) {
  const omit = typeof omitErrorString === 'boolean' ? omitErrorString : false;
  util.log(`\x1b[31m${omit ? '' : 'Error: '}${message}\x1b[0m`);
  process.exit(1);
};

/**
 * ## validateType
 *
 * @public
 * @param {string} propertyName - Property name
 * @param {*} value             - Property value
 * @param {string} type         - Expected type
 * @returns {error}
 */
util.validateType = (propertyName, value, type) => {
  if (typeof value !== type) { // eslint-disable-line
    // Strings are expected from callers - see JSDoc
    // To pass the eslint rule we would need separate method for every type
    util.log.error(`'${propertyName}' value '${value}' is not valid. Expected: ${type}`);
  }
};

/**
 * ## getValidArraySize
 *
 * @public
 * @param {object} array
 * @returns {number}
 */
util.getValidArraySize = (array) => {
  const size = array.filter(value => value !== undefined).length;

  return size;
};

/**
 * ## fsExist
 * Checks if file/direcotry exists
 *
 * @public
 * @param {string} pathParam    - Path to check
 * @returns {function} callback - Callback
 * @returns {function}          - Callback
 */
util.fsExists = (pathParam, callback) => {
  fs.access(pathParam, fs.F_OK, (err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

/**
 * ## fsExistSync
 * Checks if file/direcotry exists
 *
 * @public
 * @param {string} pathParam - Path to check
 * @returns {boolean}        - 'true' if path exists, 'false' otherwise
 */
util.fsExistsSync = (pathParam) => {
  try {
    fs.statSync(pathParam);
    return true;
  } catch (err) {
    // file/directory does not exist
    return false;
  }
};

/**
 * ## hasProperty
 *
 * @public
 * @param {Object} object
 * @param {string} propertyName
 * @returns {boolean}
 */
util.hasProperty = function (object, propertyName) {
  return Object.prototype.hasOwnProperty.call(object, propertyName);
};

/**
 * ## hasWhiteSpace
 * Checks if string includes white space (space, tab, carriage return, new line,
 * vertical tab, form feed character)
 *
 * @public
 * @param {string} string
 * @returns {boolean} - 'true' if includes, 'false' otherwise
 */
util.hasWhiteSpace = string => /\s/g.test(string);

function _removeNonFile(matches, cwd) {
  const result = _.remove(matches, (dir) => {
    const fullPath = path.join(cwd, dir);
    return fs.statSync(fullPath).isFile();
  });
  return result;
}

function _processMatch(srcArray, destArray) {
  const resultArray = [];
  for (let i = 0; i < srcArray.length; i++) {
    const element = {
      src: srcArray[i],
      dest: destArray[i]
    };
    resultArray.push(element);
  }
  return resultArray;
}

function _mapFileNamePrefix(matches, prefix, rename) {
  const result = matches.map((name) => {
    if (rename) {
      return _.isFunction(rename) ? rename(prefix, name) : path.join(prefix, rename);
    }

    return path.join(prefix, name);
  });
  return result;
}

function _addFileListPathPrefix(match, dest, cwd, rename) {
  const destMatch = _mapFileNamePrefix(match, dest, rename);
  const srcMatch = _mapFileNamePrefix(match, cwd);
  return _processMatch(srcMatch, destMatch);
}
/**
 * ## getFileList
 * Obtain the file list array of objects contain src and dest pairs
 *
 * @public
 * @param {string} buildType - dev or release
 * @param {object} fileList - raw fileList from config
 * @param {object} cwdContext - the object to cwd value
 * @param {object} destContext  - the object to set dest value
 * @returns {array}  - fileListArray
 */
util.getFileList = (buildType, fileList, cwdContext, destContext) => {
  let result = [];
  fileList.filter(_buildTypeMatch, buildType).forEach((file) => {
    const normalizedFile = {
      cwd: _getNonNullPathString(file.cwd, cwdContext),
      dest: _getNonNullPathString(file.dest, destContext),
      src: (typeof file.src === 'string') ? [file.src] : file.src,
      rename: file.rename
    };
    result = result.concat(_getListFromPatternArray(normalizedFile));
  });
  return result;
};

function _buildTypeMatch(file) {
  return (file.buildType === this || !file.buildType);
}

/**
 * ## getDirectories
 *
 * @public
 * @param {string} source
 * @returns {array}
 */
util.getDirectories = function (source) {
  if (fs.existsSync(source)) {
    return fs.readdirSync(source).filter((sourceItem) => { // eslint-disable-line
      return util.isDirectory(path.join(source, sourceItem));
    });
  }
  return [];
};

/**
 * ## isDirectory
 *
 * @public
 * @param {string} source
 * @returns {boolean}
 */
util.isDirectory = function (source) {
  return fs.statSync(source).isDirectory();
};

/**
 * ## getFiles
 *
 * @public
 * @param {string} source
 * @returns {array}
 */
util.getFiles = function (source) {
  return fs.readdirSync(source).filter((sourceItem) => { // eslint-disable-line
    return util.isFile(path.join(source, sourceItem));
  });
};

/**
 * ## isFile
 *
 * @public
 * @param {string} source
 * @returns {boolean}
 */
util.isFile = function (source) {
  return fs.statSync(source).isFile();
};

function _getListFromPatternArray(file) {
  let matches = [];
  file.src.forEach((src) => {
    const exclusion = src.indexOf('!') === 0;
    const srcPattern = exclusion ? src.slice(1) : src;

    let match = glob.sync(srcPattern, { cwd: util.destPath(file.cwd) });
    match = _removeNonFile(match, util.destPath(file.cwd));
    if (exclusion) {
      matches = _.difference(matches, match);
    } else {
      matches = _.union(matches, match);
    }
  });
  return _addFileListPathPrefix(matches, file.dest, util.destPath(file.cwd), file.rename);
}

function _getNonNullPathString(filePath, context) {
  return (_.isFunction(filePath) ? filePath(context) : filePath) || '';
}

util.getThemeCssExtention = function (buildType) {
  return buildType === 'release' ? '.min.css' : '.css';
};

util.getJETVersion = () => {
  const packageJsonPath = util.destPath('node_modules/@oracle/oraclejet/package.json');
  let version = fs.readJsonSync(packageJsonPath).version;
  // npm 5 will put long url
  if (version.length > 5) {
    version = version.replace(new RegExp('(.*oraclejet-)(.*).tgz'), '$2');
  }
  return version;
};

/**
 * ## getPathComponents
 * Decomposes the path to the prefix, src directory and suffix.
 * Returns an object with 3 properties - 'beg' includes the path prefix,
 * 'mid' is the src folder (src, src-hybrid, src-web), 'end' is the path suffix.
 *
 * @public
 * @param {string} filePath - file path to process
 * @returns {object}        - decomposed path
 */
util.getPathComponents = (filePath) => {
  const config = require('./config'); // eslint-disable-line global-require
  let token = config('paths').src.hybrid;
  let index = filePath.lastIndexOf(token);
  if (index < 0) {
    token = config('paths').src.web;
    index = filePath.lastIndexOf(token);
    if (index < 0) {
      token = config('paths').src.common;
      index = filePath.lastIndexOf(token);
      if (index < 0) {
        index = 0;
        token = '';
      }
    }
  }
  const pathComponents =
    {
      beg: filePath.substring(0, index),
      mid: token,
      end: filePath.substring(index + token.length)
    };
  return pathComponents;
};

/**
 * ## getRequestedComponentVersion
 *
 * @private
 * @param {string} componentName
 * @returns {string || undefined} version
 */
util.getRequestedComponentVersion = (componentName) => {
  const split = componentName.split('@');
  if (split.length > 2) {
    util.log.error('Wrong version specification: "@" can be used only once.');
  }
  const version = split[1];
  return version;
};

/**
 * ## getPlainComponentName
 *
 * @private
 * @param {string} componentName
 * @returns {string} componentName - version specification is trimmed
 */
util.getPlainComponentName = (componentName) => {
  // Trim version specification from the user input
  const versionSymbolIndex = componentName.indexOf('@');

  if (versionSymbolIndex === 0) {
    util.log.error('Missing component name');
  }
  return versionSymbolIndex > 0 ? componentName.substring(0, componentName.indexOf('@')) : componentName;
};

util.mergeDefaultOptions = (options, defaultConfig) => {
// function customizer(objValue, srcValue, key, obj, src) {
// todo: check caller's params
  function customizer(objValue, srcValue, key) {
  // do not merge for fileList or files, override with values in config
    if (srcValue instanceof Array) {
      if (key === 'fileList' || 'files') {
        return srcValue;
      }
    }
    return undefined;
  }
  return _.mergeWith({}, defaultConfig, options, customizer);
};

util.mergePlatformOptions = (options, platform) => {
  if ((platform === 'web') && options.web) {
    return util.mergeDefaultOptions(options.web, options);
  } else if ((platform !== 'web') && options.hybrid) {
    return util.mergeDefaultOptions(options.hybrid, options);
  }
  return options;
};

util.getAllThemes = () => {
  // scan both appDir/src/themes and appDir/themes directories
  // merge them
  const config = require('./config'); // eslint-disable-line global-require
  const themesDir = util.destPath(path.join(config.get('paths').src.themes));
  const themesSrcDir = util.destPath(path.join(config.get('paths').src.common, config.get('paths').src.themes));

  const allThemes = _.union(_getThemesFileList(themesDir), _getThemesFileList(themesSrcDir));
  return allThemes.filter((themeDir) => {
    if (themeDir === CONSTANTS.DEFAULT_THEME) {
      return false;
    }
    return themeDir.indexOf('.') === -1;
  });
};

function _getThemesFileList(Dir) {
  return util.fsExistsSync(Dir) ? fs.readdirSync(Dir) : [];
}

/**
 * ## cloneObject
 *
 * @public
 * @param {Object} original
 * @returns {Object}
 */
util.cloneObject = function (original) {
  return Object.assign({}, original);
};

/**
 * ## checkForHttpErrors
 *
 * @public
 * @param {Object} serverResponse
 * @param {string} serverResponseBody
 * @param {function} [doBeforeErrorCallback] - e.g. delete temporary files
 */
util.checkForHttpErrors = function (serverResponse, serverResponseBody, doBeforeErrorCallback) {
  // Log error for 4xx or 5xx http codes
  const code = serverResponse.statusCode.toString();
  if (['4', '5'].indexOf(code.charAt(0)) > -1) {
    if (typeof doBeforeErrorCallback === 'function') {
      doBeforeErrorCallback();
    }
    let errors = '';

    let resp;
    try {
      resp = JSON.parse(serverResponseBody);
    } catch (e) {
      resp = serverResponseBody;
    }

    if (typeof resp === 'object') {
      resp.errors.forEach((error) => {
        const exchange = url.parse(process.env.exchangeUrl);
        const errorPath = `${exchange.path}exceptions/${error.id}`;
        const errorlink = `${exchange.host}${errorPath.replace('//', '/')}`;
        errors += `${error.message}. More info: ${errorlink}${resp.errors.length > 1 ? '\n' : ''}`;
      });
      util.log.error(errors);
    } else {
      util.log.error(resp);
    }
  }
};

/**
 * ## isCCASassFile
 *
 * @public
 * @param {String} filePath
 * @returns {Boolean}
 */
util.isCcaSassFile = function (filePath) {
  const jetCCA = new RegExp(CONSTANTS.JET_COMPOSITE_DIRECTORY);
  return jetCCA.test(filePath);
};

function _getInstalledPlatforms(cordovaPath) {
  try {
    const platforms = fs.readdirSync(path.join(cordovaPath, 'platforms'));
    return platforms.filter(value => value !== 'browser');
  } catch (error) {
    util.log.error(error);
    return false;
  }
}

/**
 * ## isVerbose
 *
 * @returns {boolean}
 */
util.isVerbose = function () {
  return process.env.verbose !== 'false';
};

/**
 * ## getDefaultPlatform
 * if single platform, return that platform
 *
 * @public
 * @returns {string}
 */

util.getDefaultPlatform = () => {
  const config = require('./config'); // eslint-disable-line global-require
  config.loadOraclejetConfig();
  const pathConfig = config.getConfiguredPaths();
  const isHybrid = fs.existsSync(path.resolve(pathConfig.staging.hybrid,
    CONSTANTS.CORDOVA_CONFIG_XML));
  const isAddHybrid = fs.existsSync(path.resolve(pathConfig.src.web))
                      || fs.existsSync(path.resolve(pathConfig.src.hybrid));

  if (isHybrid) {
    const platforms = _getInstalledPlatforms(pathConfig.staging.hybrid);
    // if only one platform is installed, default to that one
    if (platforms.length === 1 && !isAddHybrid) {
      return platforms[0];
    }
    // if multiple platforms are installed, log error
    const supportedPlatforms = CONSTANTS.SUPPORTED_PLATFORMS.toString().replace(/,/g, '||');
    util.log.error(`Command is missing platform. Please specify one of "<${supportedPlatforms}>"`);
  }
  return 'web';
};

util.printList = (itemsInConfig, itemsByFolder) => {
  // Output variables
  const nameMaxLength = 30;
  const space = ' ';

  // Print headline
  const headlineName = 'name';
  const headlineNote = 'note';
  let headline = '';
  const headlineNameSpaces = nameMaxLength - headlineName.length;
  if (headlineNameSpaces < 0) {
    headline += `<${headlineName.substring(0, nameMaxLength - 2)}>`;
  } else {
    headline += `<${headlineName}>${space.repeat(headlineNameSpaces - 2)}`;
  }
  headline += `${space}<${headlineNote}>`;
  util.log(headline);

  // Print components list
  itemsByFolder.forEach((comp) => {
    let line = _constructLineOutput(comp, nameMaxLength, space);
    line += `${space}${_addWarningMissingInConfig(comp, itemsInConfig)}`;
    util.log(line);
  });

  // Print components from the config file which are not install
  itemsInConfig.forEach((comp) => {
    if (itemsByFolder.indexOf(comp) === -1) {
      let line = _constructLineOutput(comp, nameMaxLength, space);
      line += `${space}Warning: found in the config file but not installed. Please restore.`;
      util.log(line);
    }
  });
};

/**
 * ## _constructLineOutput
 *
 * @private
 * @param {string} componentName
 * @param {number} nameMaxLength
 * @param {string} space
 * @returns {string}
 */
function _constructLineOutput(componentName, nameMaxLength, space) {
  const componentNameSpaces = nameMaxLength - componentName.length;
  if (componentNameSpaces < 0) {
    return `${componentName.substring(0, nameMaxLength)}`;
  }
  return `${componentName}${space.repeat(componentNameSpaces)}`;
}

/**
 * ## _addWarningMissingInConfig
 *
 * @private
 * @param {string} componentName
 * @param {Array} componentsInConfigFile
 * @returns {string}
 */
function _addWarningMissingInConfig(componentName, componentsInConfigFile) {
  if (componentsInConfigFile.indexOf(componentName) === -1) {
    return 'Local component or installed as dependency. Not found in the config file.';
  }
  return '';
}

/**
 * ## readPathMappingJsonFile
 *
 * @public
 */
util.readPathMappingJson = () => {
  const config = require('./config'); // eslint-disable-line global-require
  config.loadOraclejetConfig(config('platform'));
  const pathConfig = config.getConfiguredPaths();
  const location = `${pathConfig.src.common}/${pathConfig.src.javascript}/${CONSTANTS.PATH_MAPPING_JSON}`;
  return fs.readJsonSync(location);
};

/**
 * ## readJsonAndReturnObject
 *
 * @public
 * @param {string} path
 * @returns {Object} object
 */
util.readJsonAndReturnObject = function (pathToFile) {
  let object = {};
  if (fs.existsSync(pathToFile)) {
    const file = fs.readFileSync(pathToFile, 'utf8');
    try {
      object = JSON.parse(file);
      // If came to here, then valid json
    } catch (e) {
      util.log.error(`File '${pathToFile}' is not of type 'json'.`);
    }
  } else {
    util.log.error(`File path '${pathToFile}' not found.`);
  }
  return object;
};

/**
 * ## request
 * https://nodejs.org/dist/latest-v6.x/docs/api/http.html
 * https://nodejs.org/dist/latest-v6.x/docs/api/https.html
 *
 * @public
 * @param {Object} [options]           - List: https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_http_request_options_callback
 * @param {string || undefined} [body]
 * @param {Object} [multipartFormData]
 * @returns {Promise}
 */
util.request = function (options, body, multipartFormData) {
  return new Promise((resolve, reject) => {
    let opts = options || {};

    let protocol = {};

    if (typeof opts === 'string') {
      // Url case
      const urlSplit = opts.split('://');
      protocol = urlSplit[0] === 'https:' ? https : http;
    } else {
      // Options case
      // If exchange url defined, use it as the default
      if (fs.existsSync(`./${CONSTANTS.ORACLE_JET_CONFIG_JSON}`)) {
        const file = fs.readFileSync(`./${CONSTANTS.ORACLE_JET_CONFIG_JSON}`, 'utf8');
        const configObj = JSON.parse(file);
        const exchangeUrl = configObj[CONSTANTS.EXCHANGE_URL_PARAM];
        if (exchangeUrl) {
          process.env.exchangeUrl = exchangeUrl;
          const defaults = url.parse(exchangeUrl);
          if (defaults.path && opts.path) {
            opts.path = (defaults.path + opts.path).replace('//', '/');
          }
          opts = Object.assign(defaults, opts);
        }
      }

      protocol = opts.protocol === 'https:' ? https : http;
    }

    if (util.isVerbose()) {
      util.log('Request options:');
      util.log(opts);
      util.log('Request body:');
      util.log(body);
    }

    const request = protocol.request(opts, (response) => {
      if (util.isVerbose()) {
        util.log('Response status code:');
        util.log(response.statusCode);
        util.log('Response status message:');
        util.log(response.statusMessage);
        util.log('Response headers:');
        util.log(response.headers);
      }

      resolve(response);
    });

    request.on('error', (error) => {
      if (error.code === 'ECONNREFUSED') {
        reject('Could not connect to defined url.\nPlease check your proxy setting and configure Exchange url \'ojet help configure\'');
      } else {
        reject(`Problem with request: ${error}`);
      }
    });

    if (body) {
      request.write(body);
      request.end();
    } else if (multipartFormData) {
      multipartFormData.pipe(request);
    } else {
      request.end();
    }
  });
};

/**
 * ## getLibVersionsObj
 *
 * @public
 */
util.getLibVersionsObj = () => {
  const versionsObj = {
    ojs: _getVersionFromNpm('oraclejet'),
    ojL10n: _getVersionFromNpm('oraclejet'),
    ojtranslations: _getVersionFromNpm('oraclejet'),
    jquery: _getVersionFromNpm('jquery'),
    'jqueryui-amd': _getVersionFromNpm('jquery-ui'),
    hammerjs: _getVersionFromNpm('hammerjs'),
    knockout: _getVersionFromNpm('knockout')
  };
  return versionsObj;
};

function _getVersionFromNpm(libPath) {
  if (libPath === 'oraclejet') return util.getJETVersion();
  const packageJSON = fs.readJsonSync(`node_modules/${libPath}/package.json`);
  return packageJSON.version;
}

/**
 * Map the tooling theme skin to JET distribution
 * @param  {String} skin name
 * @returns {String} skin name
 */
util.mapToSourceSkinName = function (skin) {
  switch (skin) {
    case 'web':
      return 'alta';
    case 'ios':
      return 'alta-ios';
    case 'android':
      return 'alta-android';
    case 'windows':
      return 'alta-windows';
    case 'common':
      return 'common';
    default:
      return skin;
  }
};

/**
 * ## fetchComponentMetadata
 *
 * @private
 * @param {string} componentName
 * @returns {Promise}
 */
util.fetchComponentMetadata = function (componentName) {
  const config = require('./config'); // eslint-disable-line
  const requestedVersion = util.getRequestedComponentVersion(componentName);
  const plainComponentName = util.getPlainComponentName(componentName);

  const pathBase = `/components/${plainComponentName}`;
  const requestPath = requestedVersion ? `${pathBase}/versions/${requestedVersion}` : pathBase;
  return new Promise((resolve, reject) => {
    util.log(`Fetching '${plainComponentName}' metadata from Exchange.`);

    util.request({
      path: requestPath,
    }).then((response) => {
      let responseBody = '';
      response.on('data', (respBody) => {
        responseBody += respBody;
      });
      response.on('end', () => {
        util.checkForHttpErrors(response, responseBody);

        util.log(`Component '${plainComponentName}' metadata successfully fetched.`);

        const metadata = JSON.parse(responseBody);

        // Cache metadata
        config(`${componentName}@${metadata.version}`, metadata);
        resolve(metadata);
      });
    })
    .catch((error) => {
      reject(error);
    });
  });
};

util.isPathCCA = function (filePath) {
  const jetCCA = new RegExp(CONSTANTS.JET_COMPOSITE_DIRECTORY);
  return jetCCA.test(filePath);
};

util.getCCANameFromPath = function (filePath) {
  const rootDir = path.join('js', CONSTANTS.JET_COMPOSITE_DIRECTORY);
  return path.basename(path.parse(path.relative(rootDir, filePath)).dir);
};

/**
 * ## getUglyCode
 *
 * @private
 * @param {string} file
 * @param {object} uglifyOptions
 *
 */
util.getUglyCode = function (file, uglifyOptions) {
  const code = fs.readFileSync(file, 'utf-8');
  return UglifyJS.minify(code, uglifyOptions);
};

/**
 * ## uglifyComponent
 *
 * @private
 * @param {string} component
 * @param {object} context
 * @returns {Promise}
 *
 * Uglify a component.
 * Optional parameter uglifyOptions
 */
util.uglifyComponent = function (component, uglifyOptions) {
  return new Promise((resolve, reject) => {
    try {
      const destPath = path.join(util.getDestPath(component), 'min');
      const files = glob.sync('**/*.js', { cwd: destPath });

      files.forEach((file) => {
        const dest = path.join(destPath, file);
        const data = util.getUglyCode(dest, uglifyOptions);
        if (data.error) reject(data.error);
        fs.writeFileSync(dest, data.code);
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * ## getDestBase
 *
 * @private
 * @return {string}
 *
 * Return the path to the destination base.
 *
 */
util.getDestBase = function () {
  const config = require('./config'); // eslint-disable-line
  let destBase = null;
  if (fs.existsSync(config('paths').staging.hybrid)) {
    destBase = path.join(config('paths').staging.hybrid, config('paths').src.javascript, config('paths').composites);
  } else {
    destBase = path.join(config('paths').staging.web, config('paths').src.javascript, config('paths').composites);
  }
  return destBase;
};

/**
 * ## getDestBase
 *
 * @private
 * @param {string} component
 * @return {string}
 *
 * Return the path to the destination component.
 *
 */
util.getDestPath = function (component) {
  const destBase = util.getDestBase();
  const componentVersion = util.getComponentVersion(component);
  const destPath = path.join(destBase, component, componentVersion);
  return destPath;
};

/**
 * ## getComponentPath
 *
 * @private
 * @param {string} component
 * @return {string}
 *
 * Return the src path to a CCA component.
 *
 */
util.getComponentPath = function (component) {
  const config = require('./config'); // eslint-disable-line
  const basePath = path.join(config('paths').src.common,
    config('paths').src.javascript, config('paths').composites);
  const componentPath = path.join(basePath, component);
  if (!util.fsExistsSync(componentPath)) {
    util.log.error(`The component ${component} is not found`);
  }
  return componentPath;
};

/**
 * ## getComponentPath
 *
 * @private
 * @param {string} component
 * @return {string}
 *
 * Return the src path to a CCA component.
 *
 */
util.getComponentVersion = function (component) {
  const srcPath = util.getComponentPath(component);
  const componentJson = util.readJsonAndReturnObject(path.join(srcPath,
    CONSTANTS.JET_COMPONENT_JSON));
  if (!util.hasProperty(componentJson, 'version')) {
    util.log.error(`Missing property 'version' in '${component}' component's/pack's definition file.`);
  }
  return componentJson.version;
};

/**
 * ## getJetpackCcaNameFromConfigObj
 *
 * @private
 * @param {obj} configComponentVersionObj
 * @param {string} pathComponentsEnd
 * @return {string}
 *
 * Return the name of a jetpack component.
 *
 * The component config for a jetpack component might look something like this:
 *   {"oj-ref-fullcalendar":"3.9.0",
 *     "oj-ref-moment":"2.22.2",
 *     "oj-ref-showdown":"1.9.0",
 *     "oj-sample":"0.0.28-beta"}
 * We want to extract the name/version from the component config -
 * but the jetpack component name first needs to be discovered.
 * We infer the CCA name (say "oj-sample") - this is accomplished by checking the path for
 * all keys in the config object
 * ("oj-ref-fullcalendar", "oj-ref-moment", "oj-ref-showdown", "oj-sample")
 * Then the calling function can use the key/prop value for the name/version, e.g.,
 * "oj-sample":"0.0.28-beta" will be name/version.
 *
 */
util.getJetpackCompNameFromConfigObj = function (configComponentVersionObj, pathComponentsEnd) {
  const matchingName = Object.keys(configComponentVersionObj).find(key => pathComponentsEnd.split(path.sep).indexOf(`${key.toString()}`) !== -1);
  return matchingName;
};

/**
 * ## getNpmPckgInitFileRelativePath
 *
 * @private
 * @param {String} componentJson component json file
 * @param {String} buildType build type
 * @returns {Object} with two fields, npmPckgInitFileRelativePath which is the file path,
 *  and a boolean cdn, which is true if the path is a cdn path.
 *
 * Return the preferred component path.
 * The component path is returned as a relative path.
 *
 * Example path from component.json:
 *
 *  "paths": {
 *    "npm": {
 *      "min": "dist/showdown.min",
 *      "debug": "dist/showdown"
 *     }
 *    "cdn": {
 *      "min": "https://static.oracle.com/cdn/jet/packs/3rdparty/showdown/1.9.0/showdown.min",
 *      "debug": "https://static.oracle.com/cdn/jet/packs/3rdparty/showdown/1.9.0/showdown.min"
 *     }
 *  }
 *
 * The path selected to return is based on the following search pattern:
 *
 *  For ojet build:
 *   1. npm.min
 *   2. npm.debug
 *   3. cdn.debug
 *   4. cdn.min
 *
 *  For ojet build --release:
 *   1. cdn.min
 *   2. cdn.debug
 *   3. npm.min
 *   4. npm.debug
 */
util.getNpmPckgInitFileRelativePath = function (componentJson, buildType) {
  const retObj = {};
  retObj.npmPckgInitFileRelativePath = undefined;
  retObj.npm = true;

  if (!componentJson.paths) return retObj;
  if (buildType === 'release') {
    if (componentJson.paths.cdn !== undefined) {
      retObj.npm = false;
      if (componentJson.paths.cdn.min !== undefined) {
        retObj.npmPckgInitFileRelativePath = componentJson.paths.cdn.min;
      } else if (componentJson.paths.cdn.debug !== undefined) {
        retObj.npmPckgInitFileRelativePath = componentJson.paths.cdn.debug;
      }
    } else if (componentJson.paths.npm !== undefined) {
      if (componentJson.paths.npm.min !== undefined) {
        retObj.npmPckgInitFileRelativePath = componentJson.paths.npm.min;
      } else if (componentJson.paths.npm.debug !== undefined) {
        retObj.npmPckgInitFileRelativePath = componentJson.paths.npm.debug;
      }
    }
  } else {
    if (componentJson.paths.npm !== undefined) { // eslint-disable-line no-lonely-if
      if (componentJson.paths.npm.min !== undefined) {
        retObj.npmPckgInitFileRelativePath = componentJson.paths.npm.min;
      } else if (componentJson.paths.npm.debug !== undefined) {
        retObj.npmPckgInitFileRelativePath = componentJson.paths.npm.debug;
      }
    } else if (componentJson.paths.cdn !== undefined) {
      retObj.npm = false;
      if (componentJson.paths.cdn.debug !== undefined) {
        retObj.npmPckgInitFileRelativePath = componentJson.paths.cdn.debug;
      } else if (componentJson.paths.cdn.min !== undefined) {
        retObj.npmPckgInitFileRelativePath = componentJson.paths.cdn.min;
      }
    }
  }
  return retObj;
};

