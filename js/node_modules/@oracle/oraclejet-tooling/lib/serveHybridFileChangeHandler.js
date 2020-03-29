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

/* Node.js native */
const path = require('path');

/* Oracle */
const config = require('./config');
const hookInjector = require('../hooks/jetInjector');
const indexHtmlInjector = require('./indexHtmlInjector');
const mainJsInjector = require('./mainJsInjector');
const util = require('./util');

/**
 * # serveHybrid file change procedure
 * @private
 * @param {string} filePath     - Path to the file
 * @param {Object} buildContext
 * @param {boolean} isSrc
 */

module.exports = (filePath, buildContext, isSrc) => {
  if (isSrc) {
    /* From source directory to hybrid/www and platform directories */
    _copyFileOver(filePath, buildContext);
  }
};

/**
 * ## _copyFileOver
 *
 * @private
 * @param {string} filePath - Path to the file
 * @param {object} buildContext - build context
 */
function _copyFileOver(filePath, buildContext) {
  /* Copies file over for the watch events */
  const pathComponents = util.getPathComponents(filePath);
  if (util.isPathCCA(pathComponents.end)) {
    let name = util.getCCANameFromPath(pathComponents.end);
    let version = config('componentVersionObj')[name];
    // If the simple name lookup fails, then we check to see if we have a jetpack component.
    if (version === undefined) {
      name = util.getJetpackCompNameFromConfigObj(config('componentVersionObj'), pathComponents.end);
      if (name !== null) {
        version = config('componentVersionObj')[name];
      }
    }
    const basePathArray = pathComponents.end.split(path.sep);
    let basePath = '';
    for (let i = 4; i < basePathArray.length; i++) {
      basePath = path.join(basePath, basePathArray[i]);
    }
    const ccaEndPath = path.join(config('paths').src.javascript, config('paths').composites, name, version, basePath);
    pathComponents.end = `/${ccaEndPath}`;
  }

  if (_isFileOverridden(pathComponents)) {
    console.log(`Overridden file not changed: ${filePath}`);
    return;
  }
  _copyFileToWWW(filePath, pathComponents.beg, pathComponents.end);

  /* Index.html needs an additional step of performing inject */
  const splitted = filePath.split(path.sep);
  const length = splitted.length;

  if (length > 1 && splitted[length - 1] === 'index.html' &&
      splitted[length - 2] === pathComponents.mid) {
    /* Inject the cordova.js script and use the new file as the source for copy */
    indexHtmlInjector.injectScriptTags(
      {
        updatePlatformFile: false,
        platform: config.get('platform'),
        opts: {
          destination: config.get('serve').destination
        }
      }
    );
    /* Inject Theme Path to wwww/index.html*/
    indexHtmlInjector.injectThemePath(buildContext)
    .catch((err) => {
      console.log(err);
    });

    const newIndexSrc = `${pathComponents.beg + config('paths').staging.hybrid}/www/${pathComponents.end}`;
    _copyFileToPlatforms(newIndexSrc, pathComponents.beg, pathComponents.end);
    /* This updates the file in platform folder */
    _indexHTMLPlatformInjection();
  } else if (length > 1 && splitted[length - 1] === 'main.js' && splitted[length - 2] === 'js'
          && splitted[length - 3] === pathComponents.mid) {
    // inject js/main.js paths
    mainJsInjector.injectPaths(buildContext)
    .then(() => {
      const newMainJsSrc = `${pathComponents.beg + config('paths').staging.hybrid}/www/${pathComponents.end}`;
      _copyFileToPlatforms(newMainJsSrc, pathComponents.beg, pathComponents.end);
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    _copyFileToPlatforms(filePath, pathComponents.beg, pathComponents.end);
  }
}

/**
 * ## _copyFileToWWW
 *
 * @private
 * @param {string} filePath - Path to the file
 * @param {string} begPath
 * @param {string} endPath
 */
function _copyFileToWWW(filePath, begPath, endPath) {
  fs.copySync(filePath, `${begPath + config('paths').staging.hybrid}/www${endPath}`);
}

/**
 * ## _copyFileToPlatforms
 *
 * @private
 * @param {string} filePath - Path to the file
 * @param {string} begPath
 * @param {string} endPath
 */
function _copyFileToPlatforms(filePath, begPath, endPath) {
  const platforms = _getInstalledPlatforms();
  // console.log('Installed platforms: ' + platforms)
  platforms.forEach((platform) => {
    if (config('defaultPlatformsConfig')[platform] === undefined) {
      return;
    }

    const copyPath = _getCopyPath(platform, begPath, endPath);
    // console.log(platform + ' platform copyPath: ' + copyPath)
    copyPath.forEach((currPath) => {
      const exists = fs.existsSync(currPath);

      if (exists) {
        fs.copySync(filePath, currPath);
      }
    });
  });
}

/**
 * ## _indexHTMLPlatformInjection
 *
 * @private
 */
function _indexHTMLPlatformInjection() {
  const platforms = _getInstalledPlatforms();
  platforms.forEach((platform) => {
    hookInjector.updateIndexHtml(platform, true);
  });
}

/**
 * ## _getInstalledPlatforms
 *
 * @private
 * @returns {Array} platforms
 */
function _getInstalledPlatforms() {
  try {
    const cordovaPath = path.resolve(`${config('paths').staging.hybrid}`);
    const platforms = fs.readdirSync(path.join(cordovaPath, 'platforms'));
    return platforms;
  } catch (error) {
    throw error;
  }
}

/**
 * ## _getCopyPaths
 * Get path to where hybrid platforms keeps original files
 *
 * @private
 * @param {string} platform
 * @param {string} begPath
 * @param {string} begPath
 * @returns {Array}
 */
function _getCopyPath(platform, begPath, endPath) {
  return [
    path.resolve(begPath + config('defaultPlatformsConfig')[platform].root + endPath)
  ];
}

/**
 * # _isFileOverridden
 * Checks if the source file modified under livereload is potentially overridden
 * in the src-web directory in which case the change should not be propagated
 * to the served content.
 *
 * @private
 * @param {object} pathComponents - file path specification
 * @returns {boolean}
 */
function _isFileOverridden(pathComponents) {
  const srcDir = pathComponents.mid;

  if (srcDir === config('paths').src.hybrid) {
    return false;
  }
  const pathConcat = pathComponents.beg + config('paths').staging.hybrid + pathComponents.end;

  return util.fsExistsSync(pathConcat);
}
