/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

const buildCommon = require('./buildCommon');
const hookRunner = require('./hookRunner');

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
    .then(buildCommon.injectTheme)
    .then(buildCommon.copyThemes)
    .then(buildCommon.injectPaths)
    .then(data => resolve(data))
    .catch(err => reject(err));
  });
}

module.exports = function buildWeb(buildType, opts) {
  const context = { buildType, opts, platform: 'web' };

  return new Promise((resolve, reject) => {
    _runCommonBuildTasks(context)
      .then(_runReleaseBuildTasks)
      .then(buildCommon.runAllComponentHooks)
      .then(data => hookRunner('after_build', data))
      .then((data) => {
        resolve(data);
      })
      .catch(err => reject(err));
  });
};
