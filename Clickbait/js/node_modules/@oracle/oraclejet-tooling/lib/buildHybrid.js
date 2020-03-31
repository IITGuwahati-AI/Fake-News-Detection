/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

const CONSTANTS = require('./constants');
const exec = require('child_process').exec;
const indexHtmlInjector = require('./indexHtmlInjector');
const buildCommon = require('./buildCommon');
const hookRunner = require('./hookRunner');
const path = require('path');
const util = require('./util');
const fs = require('fs-extra');

function _injectScriptTags(context) {
  console.log('Injecting index.html with cordova script.');
  return indexHtmlInjector.injectScriptTags(context);
}

function _invokeCordovaPrepare(context) {
  console.log('Invoke cordova prepare.');
  const platform = context.platform;
  let cwd = context.opts.stagingPath;
  cwd = path.resolve(cwd, '..');

  return new Promise((resolve, reject) => {
    const cmd = `cordova prepare ${platform}`;
    const cmdOpts = { cwd: util.destPath(cwd), stdio: [0, 'pipe', 'pipe'], maxBuffer: 1024 * 20000 };
    const cordova = exec(cmd, cmdOpts, (error) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      console.log('Cordova prepare finished.');
      resolve(context);
    });

    cordova.stdout.on('data', (data) => {
      console.log(data);
    });
  });
}

function _getCordovaBuildType(target) {
  return (target === 'release') ? CONSTANTS.RELEASE_FLAG : CONSTANTS.DEBUG_FLAG;
}

function _getCordovaBuildConfig(bConfig) {
  let resultConfig;
  if (bConfig) {
    const bcPath = path.isAbsolute(bConfig) ? bConfig : util.destPath(bConfig);
    if (!fs.existsSync(bcPath)) {
      throw new Error(`Please ensure location of buildConfig is correct, current : ${bcPath}`);
    }

    resultConfig = `--buildConfig=${bcPath}`;
  }

  return resultConfig;
}

function _getCordovaBuildDestination(destination) {
  return `--${destination}`;
}

function _getCordovaPlatformOptions(platformOptions) {
  return (platformOptions) ? `-- ${platformOptions}` : '';
}

function _invokeCordovaCompile(context) {
  console.log('Invoke cordova compile.');
  const platform = context.platform;
  const opts = context.opts;
  let cwd = opts.stagingPath;
  cwd = path.resolve(cwd, '..');

  const buildType = _getCordovaBuildType(context.buildType);
  const buildConfig = _getCordovaBuildConfig(opts.buildConfig);
  const buildDestination = _getCordovaBuildDestination(opts.destination);
  const platformOptions = _getCordovaPlatformOptions(opts.platformOptions);

  return new Promise((resolve, reject) => {
    let cmd = `cordova compile ${platform} ${buildType} ${buildDestination}`;
    if (buildConfig) cmd += ` ${buildConfig}`;
    if (platformOptions) cmd += ` ${platformOptions}`;
    const cmdOpts = { cwd: util.destPath(cwd), stdio: ['pipe', 'pipe', 'pipe'], maxBuffer: 1024 * 20000 };
    const cordova = exec(cmd, cmdOpts, (error) => {
      if (error) reject(error);
      console.log('Cordova compile finished.');
      resolve(context);
    });

    cordova.stdout.on('data', (data) => {
      console.log(data);
    });
  });
}

function _runCordovaBuildTasks(context) {
  return new Promise((resolve, reject) => {
    const opts = context.opts;
    if (opts.buildForServe) {
      resolve(context);
    } else {
      hookRunner('before_hybrid_build', context)
      .then(_invokeCordovaPrepare)
      .then(_invokeCordovaCompile)
      .then(data => resolve(data))
      .catch(err => reject(err));
    }
  });
}

function _runCommonBuildTasks(context) {
  return new Promise((resolve, reject) => {
    buildCommon.clean(context)
    .then(data => hookRunner('before_build', data))
    .then(buildCommon.copy)
    .then(buildCommon.copyLibs)
    .then(buildCommon.copyReferenceCca)
    .then(buildCommon.copyLocalCca)
    .then(buildCommon.spriteSvg)
    .then(buildCommon.sass)
    .then(buildCommon.injectCdnBundleScript)
    .then(buildCommon.copyThemes)
    .then(buildCommon.injectTheme)
    .then(_injectScriptTags)
    .then(buildCommon.injectPaths)
    .then(data => resolve(data))
    .catch(err => reject(err));
  });
}

function _runReleaseBuildTasks(context) {
  return new Promise((resolve, reject) => {
    const opts = context.opts;
    if (opts.buildType !== 'release') {
      resolve(context);
    } else {
      hookRunner('before_release_build', context)
      .then(buildCommon.uglify)
        .then(buildCommon.requireJs)
        .then(buildCommon.cleanTemp)
        .then(data => resolve(data))
        .catch(err => reject(err));
    }
  });
}

function _runWindowsLocaleFix(context) {
  return new Promise((resolve, reject) => {
    buildCommon.fixWindowsLocale(context)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

module.exports = function buildHybrid(buildType, platform, opts) {
  const context = { buildType, platform, opts };

  return new Promise((resolve, reject) => {
    _runCommonBuildTasks(context)
      .then(_runWindowsLocaleFix)
      .then(_runReleaseBuildTasks)
      .then(_runCordovaBuildTasks)
      .then(buildCommon.runAllComponentHooks)
      .then(data => hookRunner('after_build', data))
      .then((data) => {
        resolve(data);
      })
      .catch(err => reject(err));
  });
};
