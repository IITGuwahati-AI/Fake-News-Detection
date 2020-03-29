/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

/**
 * # Dependencies
 */

/* Oracle */
const config = require('./config');
const util = require('./util');
const CONSTANTS = require('./constants');
const serveWatch = require('./serve/watch');
const hookRunner = require('./hookRunner');

/**
 * # ServeHybrid procedure
 *
 * @public
 * @param {function} build - build action (build or not)
 * @param {Object} resolve
 */
module.exports = (build, resolve) => {
  let buildOptions = null;
  build()
    .then((context) => {
      buildOptions = context;
      hookRunner('before_serve', context);
    })
    .then(_cdToCordovaDirectory)
    .then(_cordovaClean)
    .then(_cordovaServe)
    .then(_cordovaRun)
    .then(_cdFromCordovaDirectory)
    .then(() => {
      const serveOptions = config.get('serve');
      if (serveOptions.livereload) {
        serveWatch(serveOptions.watch, serveOptions.livereloadPort);
        hookRunner('after_serve', buildOptions);
      } else if (serveOptions.destination !== 'browser' && serveOptions.destination !== 'server-only') {
        /* If serving to Browser or running in headless mode, process can't be killed by resolve()
         as this would kill static web server */
        hookRunner('after_serve', buildOptions);
        resolve();
      }
    })
    .catch((error) => {
      if (_isCordovaError(error)) {
        util.log.error(`Something in Cordova failed. ${error}`);
      } else {
        util.log.error(error);
      }
    });
};

/**
 * # Private functions
 * ## _isCordovaError
 * Check if the error is from tooling
 *
 * @private
 * @returns {Boolean}
 */
function _isCordovaError(error) {
  return /child process exited with code: 1/.test(error);
}

/**
 * # Private functions
 * ## _cdToCordovaDirectory
 * Set Cordova directory the current working directory
 *
 * @private
 * @returns {Promise}
 */
function _cdToCordovaDirectory() {
  return new Promise((resolve) => {
    process.chdir(config('paths').staging.hybrid);
    resolve();
  });
}

/**
 * ## _cdFromCordovaDirectory
 * Set Cordova directory the current working directory
 *
 * @private
 * @returns {Promise}
 */
function _cdFromCordovaDirectory() {
  return new Promise((resolve) => {
    process.chdir('..');
    resolve();
  });
}

/**
 * ## codrovaClean
 * Cleanup project from build artifactsProcessing logic TBD...
 *
 * @private
 * @returns {Promise}
 */
function _cordovaClean() {
  const platform = config.get('platform');
  const destination = config.get('serve').destination;
  const build = config.get('serve').build;

  if (platform !== 'windows' && destination !== 'browser' && build) {
    return util.spawn('cordova', ['clean', destination === 'browser' ? 'browser' : platform]);
  }
  return null;
}

/**
 * ## _cordovaServe
 *
 * @private
 * @returns {Promise}
 */
function _cordovaServe() {
  const serveOptions = config.get('serve');
  if (serveOptions.livereload || serveOptions.destination === 'server-only') {
    return util.spawn('cordova', ['serve', serveOptions.port], 'Static file server running on');
  }
  return null;
}

/**
 * ## _cordovaRun
 *
 * @private
 * @returns {Promise}
 */
function _cordovaRun() {
  const serveOptions = config.get('serve');
  const destination = serveOptions.destination;
  const destinationTarget = (serveOptions.destinationTarget)
  ? `"${serveOptions.destinationTarget.replace(/['"]+/g, '')}"` : serveOptions.destinationTarget;

  if (destination !== 'server-only') {
    if (destination === 'browser') {
      const params = ['run', 'browser', '--', `--target=${destinationTarget}`];
      const port = serveOptions.port;
      if (port) {
        params.push(`--port=${port}`);
      }

      return util.spawn('cordova', params, 'Static file server running @');
    }
    const params = ['run'];
    const platform = config.get('platform');

    params.push(platform);

    if (destinationTarget) {
      params.push(`--target=${destinationTarget}`);
      if (destination === 'emulator') params.push(`--${destination}`);
    } else {
      // Destination can be only 'emulator' or 'device'
      params.push(`--${destination}`);
    }

    const buildConfig = config.get('serve').buildConfig;
    if (buildConfig) {
      params.push(`--buildConfig=${buildConfig}`);
    }

    const buildType = config.get('serve').buildType;
    if (buildType === 'release') {
      params.push(CONSTANTS.RELEASE_FLAG);
    } else {
      params.push(CONSTANTS.DEBUG_FLAG);
    }

    const platformOptions = serveOptions.platformOptions;
    if (platformOptions) {
      params.push('--');
      params.push(platformOptions);
    }

    if (platform === 'android') {
      // If spawned, for an unknown reason the command is not resolved properly
      // the last log message after booting Android emulator is LAUNCH SUCCESS
      // Return the promise to fix a bug when cold starting Android emulator
      return util.exec(`${'cordova '}${params.join(' ')}`, 'LAUNCH SUCCESS');
    }
    return util.exec(`${'cordova '}${params.join(' ')}`);
  }
  return null;
}
