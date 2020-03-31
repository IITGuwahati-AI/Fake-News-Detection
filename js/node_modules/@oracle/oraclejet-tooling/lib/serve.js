/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

/**
 * # Dependencies
 */
/* Node.js native */
const path = require('path');

/* Oracle */
const config = require('./config');
const CONSTANTS = require('./constants');

const ojetBuild = require('./build');
const serveHybrid = require('./serveHybrid');
const serveWeb = require('./serveWeb');
const util = require('./util');
const valid = require('./validations');

/**
 * # Serve API
 * ## ojet.serve([platform], [options]);
 *
 * Usage example
 *
 * ```
 * const ojet = require('oraclejet-toooling');
 *
 * ojet.serve('ios', {
 *    livereload: false,
 *    server-port: 12345
 * });
 * ```
 *
 * @public
 * @param {string} [platform='web']           - Platform, defaults to 'web'
 * @param {Object} [options]                  - Options object
 * @param {boolean} [options.build=true]      - Build before serve
 * @param {string} [options.buildType]        - Build type: debug/release
 * @param {string} [options.buildConfig]      - Path to configuration file
 * @param {Object} [options.connect]          - Subtask connect config object
 * @param {string} [options.destination]      - Deploy to device/emulator/target/browser
 * @param {string} [options.destinationTarget]- Specific destination
 * @param {boolean} [options.livereload=true] - Livereload
 * @param {number} [options.livereloadPort]   - Livereload port number
 * @param {number} [options.port]             - Content server port number
 * @param {boolean} [options.sassCompile]     - Sass compile and watch
 * @param {string} [options.theme]            - Theme option, default is 'alta'
 * @param {Array} [options.themes]            - Themes option, default to first element defined
 * @param {Object} [options.watch]            - Subtask watch config object
 * @returns {Promise}
 */
const serve = module.exports;
module.exports = function (platform, options) {
  let platformArg = platform;
  let optionsArg = options;

  /* Initial arguments check */
  if (serve.length === 1) {
    if (typeof platformArg === 'object') {
      optionsArg = platform;
      platformArg = undefined;
    }
  }
  /* Wrapped in promise to make ojet.serve() thenable */
  return new Promise((resolve) => {
    config.loadOraclejetConfig(platform);
    const validPlatform = valid.platform(platformArg);
    const validDefaultServeConfig = valid.getDefaultServeConfig();
    const validDefaultPlatformsConfig = valid.getDefaultPlatformsConfig();

    config.set('defaultServeConfig', validDefaultServeConfig);
    config.set('defaultPlatformsConfig', validDefaultPlatformsConfig);

    /* Validate entries and/or set defaults */
    const validOptions = _validateOptions(optionsArg, validPlatform);

    /* Update config */
    config.set('platform', validPlatform);
    config.set('serve', validOptions);

    console.log(`Build: ${validOptions.build}`);
    console.log(`BuildType: ${validOptions.buildType}`);
    console.log(`Destination: ${validOptions.destination}`);
    console.log(`Destination target: ${validOptions.destinationTarget}`);
    console.log(`Livereload: ${validOptions.livereload}`);
    if (validOptions.livereloadPort) {
      console.log(`Livereload port: ${validOptions.livereloadPort}`);
    }
    console.log(`Platform: ${validPlatform}`);
    if (validPlatform === 'web') {
      console.log(`Port: ${validOptions.connect.options.port}`);
    }
    if (validOptions.destination === 'browser' && validOptions.port) {
      console.log(`Port: ${validOptions.port}`);
    }
    console.log(`Theme: ${validOptions.theme.name}`);
    console.log(`Theme platform: ${validOptions.theme.platform}`);
    console.log(`Theme version: ${validOptions.theme.version}`);

    _storeInProcessEnv();
    /* Should build before serve? */
    const build = _getBuildAction();

    if (config.get('platform') === 'web') {
      return serveWeb(build);
    }
    return serveHybrid(build, resolve);
  });
};

function _storeInProcessEnv() {
  /* Update for cordova hooks */
  if (config('platform') !== 'web') {
    const serveConfigs = config.get('serve');
    process.env.platform = config.get('platform');
    process.env.destination = serveConfigs.destination;
    process.env.livereload = serveConfigs.livereload;
    process.env.livereloadPort = serveConfigs.livereloadPort || config('defaultServeConfig').options.livereloadPort;
    process.env.port = serveConfigs.port || config('defaultServeConfig').options.port;
    process.env.cordovaDirectory = config('paths').staging.hybrid;
  }
}

/**
 * ## _validateOptions
 * Validate options and set the defaults
 *
 * @private
 * @param {Object} [options]                   - Options object
 * @param {boolean} [options.build=true]       - Build before serve
 * @param {string} [options.buildType]         - Build type: debug/release
 * @param {string} [options.buildConfig]       - Path to configuration file
 * @param {string} [options.destination]       - Deploy to device/emulator
 * @param {string} [options.destinationTarget] - Deploy to specific destination
 * @param {boolean} [options.livereload=true]  - Livereload
 * @param {number} [options.livereloadPort]    - Livereload port number
 * @param {number} [options.port]              - Content server port number
 * @param {string} [validPlatform]             - Valid platform
 * @returns {Object} options                   - Valid options
 */
function _validateOptions(options, validPlatform) {
  let validOptions = util.cloneObject(options);
  validOptions.build = _validateBuild(validOptions.build);
  validOptions.buildType = valid.buildType(validOptions);
  validOptions = valid.theme(validOptions, validPlatform);
  validOptions.buildConfig = _validateBuildConfig(validOptions.buildConfig);
  validOptions = _validateDestination(validOptions, validPlatform);
  validOptions = _validateLivereload(validOptions);
  validOptions.port = _validatePorts(validOptions.port, 'server-port');
  validOptions.livereloadPort = _validatePorts(validOptions.livereloadPort, 'livereload-port');
  return _mergeServeWatchConnectOptions(validOptions, validPlatform);
}

function _mergeServeWatchConnectOptions(options, platform) {
  let mergedOptions = options || {};
  const DEFAULT_CONFIG = config('defaultServeConfig');
  mergedOptions = util.mergePlatformOptions(mergedOptions, platform);
  mergedOptions.connect = _getConnectOptions(mergedOptions, DEFAULT_CONFIG.connect);
  mergedOptions.watch = _getWatchOptions(mergedOptions, DEFAULT_CONFIG.watch);
  return mergedOptions;
}

function _getConnectOptions(opts, defaultOpts) {
  const connectConfig = util.mergeDefaultOptions(opts.connect, defaultOpts);
  const livereload = opts.livereload ? opts.livereloadPort : false;
  let open = opts.connect.open === undefined ? connectConfig.options.open : opts.connect.open;
  open = opts.destination === 'server-only' ? false : open;
  const port = opts.port || connectConfig.options.port;
  return _overrideConnectOptions(connectConfig, { livereload, open, port });
}

function _overrideConnectOptions(configParam, overrides) {
  // Connect options structure differs from that of watch.
  // Use object assign instead of util.mergeDefaultOptions to merge
  const connectOpts = Object.assign({}, configParam.options, overrides);
  return { options: connectOpts };
}

function _getWatchOptions(opts, defaultOpts) {
  const watchConfig = util.mergeDefaultOptions(opts.watch, defaultOpts);
  const livereload = opts.livereload ? opts.livereloadPort : false;
  return _overrideOptionsForConfigs(watchConfig, { livereload });
}

function _overrideOptionsForConfigs(configParam, overrides) {
  Object.keys(configParam).forEach((configKey) => {
    const subConfig = configParam[configKey];
    Object.keys(overrides).forEach((overrideKey) => {
      if (overrides[overrideKey] !== undefined) {
        subConfig.options[overrideKey] = overrides[overrideKey];
      }
    });
  });
  return configParam;
}

/**
 * ## _validateBuild
 *
 * @private
 * @param {boolean} build
 * @returns {boolean} validBuild
 */
function _validateBuild(build) {
  let validBuild = build;
  if (validBuild === 'false') return false;
  if (validBuild === 'true') return true;
  if (validBuild || validBuild === false) {
    util.validateType('build', build, 'boolean');
  } else {
    const defaultBuild = config('defaultServeConfig').options.build;
    util.validateType('build default config', defaultBuild, 'boolean');
    validBuild = defaultBuild;
  }
  return validBuild;
}

/**
 * ## _validateBuildConfig
 *
 * @private
 * @param {string} buildConfig
 * @returns {string} validBuildConfig
 */
function _validateBuildConfig(buildConfig) {
  let validBuildConfig = buildConfig;
  if (validBuildConfig) {
    util.validateType('buildConfig', validBuildConfig, 'string');

    // expand optional '~' directory
    if (validBuildConfig.startsWith('~')) {
      validBuildConfig = validBuildConfig.replace('~', process.env.HOME);
    }
    if (!path.isAbsolute(validBuildConfig)) {
      // the buildConfig path is relative to the app dir, while the current
      // working directory is 'hybrid' we need to get one level up
      validBuildConfig = `../${validBuildConfig}`;
    }
  }
  return validBuildConfig;
}

/**
 * ## _validateDestination
 *
 * @private
 * @param {Object} options
 * @param {string} platform
 * @returns {Object} validOptions
 */
function _validateDestination(options, platform) {
  const validOptions = util.cloneObject(options);
  const destination = validOptions.destination;
  const destArray = destination ? destination.split(':') : [];

  if (platform === 'web') {
    if (destination && CONSTANTS.SUPPORTED_SERVE_WEB_DESTINATIONS.indexOf(destArray[0]) === -1) {
      util.log.error(`Destination '${destination}' not supported. Please use '--destination=[<${CONSTANTS.SUPPORTED_SERVE_WEB_DESTINATIONS.toString()}>]`);
    }

    // Set valid destination (target split away)
    // No need to care about destination target as currently we support only 'server-only' case
    validOptions.destination = destArray[0];
  } else if (destination) {
    // Some hybrid destination expected
    if (CONSTANTS.SUPPORTED_SERVE_HYBRID_DESTINATIONS.indexOf(destArray[0]) === -1) {
      util.log.error(`Destination '${destination}' not supported. Please use '--destination=[<${CONSTANTS.SUPPORTED_SERVE_HYBRID_DESTINATIONS.toString()}>]`);
    }

    // Set valid destination (target split away)
    validOptions.destination = destArray[0];

    // A target exists
    if (destArray[1] && (destArray[1] !== 'true')) {
      validOptions.destinationTarget = _validateDestinationTarget(destArray);
    } else if (destArray[0] === 'browser') {
      validOptions.destinationTarget = config.get('defaultBrowser');
    }
  } else {
    /*
     * If the destination is not specified for a hybrid case
     * we always want '--emulator' to be used in 'cordova run' command
     * to 'fix' Cordova inconsistent deploying behaviour.
     */
    validOptions.destination = 'emulator';
  }

  return validOptions;
}

/**
 * ## _validateDestinationTarget
 *
 * @private
 * @param {Array} destArray - Array of destinations
 * @returns {string} target
 */
function _validateDestinationTarget(destArray) {
  const target = destArray[1];
  if (destArray[0] === 'browser') {
    const supportedBrowsers = CONSTANTS.SUPPORTED_BROWSERS;
    if (supportedBrowsers.indexOf(target) === -1) {
      util.log.error(`Browser '${target}' not supported. Please use '--browser=[<${supportedBrowsers.toString()}>]`);
    }
  } else {
    util.validateType('destination target', target, 'string');
  }
  return target;
}

/**
 * ## _validateLivereload
 *
 * @private
 * @param {Object} options
 * @returns {Object} options
 */
function _validateLivereload(options) {
  if (options.livereload || options.livereload === false) {
    util.validateType('livereload', options.livereload, 'boolean');
  } else {
    util.validateType('livereload default config', config('defaultServeConfig').options.livereload, 'boolean');
  }

  return _applyLivereloadConditions(options);
}

/**
 * ## _validatePorts
 *
 * @private
 * @param {String} port
 * @param {String} portType - 'livereload-port' vs. 'server-port'
 * @returns {undefined || number} validPort
 */
function _validatePorts(port, portType) {
  let validPort;
  if (port !== undefined) {
    if (isNaN(port)) {
      util.validateType(portType, port, 'number');
    } else {
      validPort = parseInt(port, 10);
    }
  }
  return validPort;
}

/**
 * ## _applyLivereloadConditions
 * Applies business logic to provided options object, sets default
 *
 * @private
 * @param {Object} options
 * @returns {Object} validOptions
 */
function _applyLivereloadConditions(options) {
  const validOptions = util.cloneObject(options);
  /* 1. Turn off livereload if release build is on */
  if (validOptions.buildType === 'release' && !validOptions.livereload) {
    util.log.warning('Livereload can\'t be used for release mode. Turning it off.');
    validOptions.livereload = false;
  }

  /* 2. Not release and livereload not defined, use the default value */
  if (validOptions.buildType !== 'release' && !validOptions.livereload && validOptions.livereload !== false) {
    validOptions.livereload = config('defaultServeConfig').options.livereload;
    validOptions.livereloadPort = options.livereloadPort || config('defaultServeConfig').options.livereloadPort;
  }

  /* 3. Release build can't be livereloaded */
  if (validOptions.buildType === 'release' && validOptions.livereload === true) {
    util.log.error('Livereload can\'t be used for release build');
  }

  /* 4. Livereload is not supported on device */
  if (validOptions.destination === 'device') {
    util.log.warning('Livereload can\'t be used on the device. Turning it off.');
    validOptions.livereload = false;
  }
  return validOptions;
}

/**
 * ## _getBuildAction
 * Calling ojet.build or just noop function to start promise chain
 *
 * @private
 * @returns {function} - Build action
 */
function _getBuildAction() {
  if (config.get('serve').build) {
    /* Build */
    return () => {
      util.log('Building app.');
      const serveConfig = config.get('serve');
      const buildConfig = serveConfig.buildOptions;
      Object.assign(buildConfig, {
        buildForServe: true,
        buildType: serveConfig.buildType,
        buildConfig: serveConfig.buildConfig,
        svg: serveConfig.svg,
        theme: serveConfig.theme,
        themes: serveConfig.themes,
        sassCompile: serveConfig.sassCompile,
        destination: serveConfig.destination,
        userOptions: serveConfig.userOptions
      });
      return ojetBuild(config.get('platform'), buildConfig);
    };
  }
  /* Do Not build - noop function to start promise chain */
  return () => new Promise((res) => {
    util.log('Skipping build...');
    res();
  });
}
