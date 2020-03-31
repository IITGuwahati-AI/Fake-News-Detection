/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

/**
 * # Dependencies
 */
const path = require('path');
const Gaze = require('gaze').Gaze;
const tinylr = require('tiny-lr');

const watchall = {
  running: false
};
const watchers = {};

const buildCommon = require('../buildCommon');
const serveHybridFileChangeHandler = require('../serveHybridFileChangeHandler');
const serveWebFileChangeHandler = require('../serveWebFileChangeHandler');
const util = require('../util');
const config = require('../config');
const valid = require('../validations');
const CONSTANTS = require('../constants');

/**
 * # serve Watch Module
 *
 * @public
 */
module.exports = function (opts, liverealodPort) {
  util.log('Starting watcher.');
  const watchOpts = _addSrcOverride(opts);
  return new Promise((resolve, reject) => {
    if (watchall.running === false) {
      _startLiveReloadServer(watchOpts, liverealodPort)
        .then(_startWatchers)
        .then(() => {
          watchall.running = true;
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      resolve();
    }
  });
};

function _addSrcOverride(opts) {
  const result = opts;
  const srcOverrideDir = (config.get('platform') === 'web') ?
    config('paths').src.web : config('paths').src.hybrid;
  result.sourceFiles.files.push(`${srcOverrideDir}/**/*`);
  return result;
}

function _startLiveReloadServer(opts, port) {
  return new Promise((resolve, reject) => {
    const server = tinylr({ port });
    server.listen(port, (err) => {
      if (err) {
        reject(err);
      }
      util.log(`Listening on port ${port}.`);
      watchall.server = server;
      resolve(opts);
    });
  });
}

function _startWatchers(opts) {
  util.log('Watching files.');
  return new Promise((resolve, reject) => {
    try {
      Object.keys(opts).forEach((watchTarget) => {
        watchers[watchTarget] = _startWatcher(opts[watchTarget].files, watchTarget, opts);
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

function _startWatcher(targetFiles, target, opts) {
  const watcher = new Gaze(targetFiles);

  watcher.on('ready', () => {
    util.log(`Watcher: ${target} is ready.`);
  });

  watcher.on('changed', (file) => {
    util.log(`Changed: ${file}`);
    _defaultFileChangeHandler({ opts, target, filePath: file })
      .then(_runCustomPostWatchPromise)
      .then(() => {
        watchall.server.changed({ body: { files: [file] } });
        util.log('Page reloaded resume watching.');
      })
      .catch((err) => {
        util.log.error(err);
      });
  });

  watcher.on('added', (file) => {
    util.log(`Added: ${file}`);
    _defaultFileChangeHandler({ opts, target, filePath: file })
      .then(() => {
        watchall.server.changed({ body: { files: [file] } });
        util.log('Page reloaded resume watching.');
      })
      .catch((err) => {
        util.log.error(err);
      });
  });

  return watcher;
}

function _defaultFileChangeHandler(context) {
  const buildContext = _getBuildContext();
  const filePath = context.filePath;
  return new Promise((resolve, reject) => {
    try {
      if (_isThemeFile(filePath)) {
        if (util.isCcaSassFile(filePath)) {
          config('changedCcaTheme', _getCcaPath(filePath));
          config('changedTheme', null);
        } else {
          config('changedTheme', _getThemeObjFromPath(filePath));
          config('changedCcaTheme', null);
        }
        resolve(context);
      } else if (config.get('platform') === 'web') {
        serveWebFileChangeHandler(filePath, buildContext);
        resolve(context);
      } else {
        serveHybridFileChangeHandler(filePath, buildContext, _isSrcFile(context.target));
        resolve(context);
      }
    } catch (err) {
      reject(err);
    }
  });
}

function _isSrcFile(target) {
  return target === 'sourceFiles';
}

function _runCustomPostWatchPromise(context) {
  // programmatically build a promise chain to run all custom commands in sequence
  let commandSequence = Promise.resolve();
  const customCommands = context.opts[context.target].commands;
  if (!customCommands) {
    return commandSequence;
  }
  util.log(`Trigggering commands ${customCommands}.`);
  customCommands.forEach((command) => {
    const commandPromise = _getCommandPromise(command);
    commandSequence = commandSequence.then(() => commandPromise)
      .then(() => {
        util.log(`Command ${command} completed..`);
      });
  });
  return commandSequence;
}

function _getCommandPromise(command) {
  if (command === 'compileSass') {
    return _getCompileSassPromise();
  }

  if (command === 'copyThemes') {
    return _getCopyThemePromise();
  }

  return util.exec(command);
}

function _getCompileSassPromise() {
  // Skip sass compile tasks if the global sass compile is disabled
  if (config('serve').sassCompile === false) {
    return Promise.resolve();
  }

  const context = _getBuildContext();
  context.changedTheme = _getThemeObjFromName(config('changedTheme'), context.opts);
  context.changedCcaTheme = config('changedCcaTheme');
  return new Promise((resolve, reject) => {
    buildCommon.sass(context)
    .then(buildCommon.copyThemes)
    .then(() => {
      resolve();
    })
    .catch(err => reject(err));
  });
}

function _getCopyThemePromise() {
  const context = _getBuildContext();
  context.changedTheme = _getThemeObjFromName(config('changedTheme'), context.opts);
  return new Promise((resolve, reject) => {
    buildCommon.copyThemes(context)
    .then(() => {
      resolve();
    })
    .catch(err => reject(err));
  });
}

function _isThemeFile(filePath) {
  const srcThemes = new RegExp(config('paths').src.themes);
  const stagingThemes = new RegExp(config('paths').staging.themes);
  const srcPath = new RegExp(config('paths').src.common);
  return srcThemes.test(filePath) || stagingThemes.test(filePath)
    || path.extname(filePath) === '.scss' || (path.extname(filePath) === '.css' && !srcPath.test(filePath));
}

function _getCcaPath(filePath) {
  const pathArray = filePath.split(path.sep);
  // cca index +1 to get one level down /jet-composites and +1 for the slice
  const ccaIndex = pathArray.indexOf(CONSTANTS.JET_COMPOSITE_DIRECTORY) + 2;
  return path.normalize(pathArray.slice(0, ccaIndex).join(path.sep));
}

function _getThemeObjFromPath(filePath) {
  const allThemes = util.getAllThemes();
  const result = {};
  const themeName = allThemes.filter(singleTheme => filePath.indexOf(singleTheme) !== -1);
  if (themeName.length === 1) {
    result.name = themeName[0];
  } else {
    // find the theme with longest legnth ['alta', 'alta_test']
    result.name = themeName.reduce((acc, cur) => ((cur.length > acc.length) ? cur : acc), '');
  }
  const allPlatforms = CONSTANTS.SUPPORTED_PLATFORMS;
  let themePlatform = config('platform');
  allPlatforms.forEach((singlePlatform) => {
    themePlatform = (filePath.indexOf(singlePlatform) === -1) ? themePlatform : singlePlatform;
  });
  result.platform = themePlatform;
  return result;
}

function _getThemeObjFromName(theme, opts) {
  if (theme === null) return null;
  if (theme.name === opts.theme.name) {
    return opts.theme;
  }
  return valid.getThemeObject(theme.name, theme.platform);
}

function _getBuildContext() {
  const validPlatform = config.get('platform');
  const options = valid.buildOptions(config.get('serve'), validPlatform, true);
  const validBuildType = valid.buildType(options);
  options.buildType = validBuildType;
  options.cssonly = true;
  options.themes = undefined; // disable compiling all themes for livereload
  const context =
    {
      buildType: validBuildType,
      opts: options,
      platform: validPlatform
    };
  return context;
}

