/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

const fs = require('fs-extra');
const path = require('path');
const config = require('./config');
const CONSTANTS = require('./constants');
const util = require('./util');

module.exports = {};
const npmCopy = module.exports;

/**
 * # npmCopy
 * To align with Jet's 3rd party library directory structure, this config will copy from its
 * original npm location to specific path with the file name being modified to include the
 * version string.
 */

const versions = util.getLibVersionsObj();

npmCopy.getNonMappingFileList = function (buildType, platform) {
  const srcPrefix = 'node_modules/';
  const destPrefix = platform === 'web' ?
        `${config('paths').staging.web}/${config('paths').src.javascript}/libs`
        : `${config('paths').staging.hybrid}/www/${config('paths').src.javascript}/libs`;
  const cssSrcPrefix = 'node_modules/@oracle/oraclejet/dist/css/';
  let nonMappingList = [
    {
      cwd: `${srcPrefix}requirejs`,
      src: ['*.js'],
      dest: `${destPrefix}/require`
    },
    {
      cwd: `${cssSrcPrefix}alta`,
      src: ['**'],
      dest: `${config('paths').staging.themes}/alta/web`
    },
    {
      cwd: `${cssSrcPrefix}alta-windows`,
      src: ['**'],
      dest: `${config('paths').staging.themes}/alta/windows`
    },
    {
      cwd: `${cssSrcPrefix}alta-android`,
      src: ['**'],
      dest: `${config('paths').staging.themes}/alta/android`
    },
    {
      cwd: `${cssSrcPrefix}alta-ios`,
      src: ['**'],
      dest: `${config('paths').staging.themes}/alta/ios`
    },
    {
      cwd: `${cssSrcPrefix}common`,
      src: ['**'],
      dest: `${config('paths').staging.themes}/alta/common`
    },
    {
      cwd: `${srcPrefix}@oracle/oraclejet/dist/js/libs/oj/resources/nls`,
      src: ['*.js'],
      dest: `${config('paths').staging.stagingPath}/${config('paths').src.javascript}/libs/oj/v${versions.ojs}/resources/root`
    }
  ];

  const testConfig = {
    'qunit-reporter-junit/qunit-reporter-junit.js': 'qunit/qunit-reporter-junit.js',
    'qunit/qunit/qunit.js': 'qunit/qunit.js',
    'qunit/qunit/qunit.css': 'qunit/qunit.css',
  };
  nonMappingList = util.getFileList(buildType, nonMappingList);

  const testPath = path.resolve(`${config('paths').src.common}/${config('paths').src.tests}`);
  return (buildType === 'dev' && fs.existsSync(testPath))
    ? nonMappingList.concat(_getTestFileList(testConfig, srcPrefix, destPrefix))
    : nonMappingList;
};

function _getTestFileList(copyConfig, srcPrefix, destPrefix) {
  const fileList = [];
  Object.keys(copyConfig).forEach((key) => {
    const fileObj = _getTestFileObj(key, copyConfig[key], srcPrefix, destPrefix);
    fileList.push(fileObj);
  });
  return fileList;
}

function _getTestFileObj(src, dest, srcPrefix, destPrefix) {
  return {
    src: path.join(srcPrefix, src),
    dest: path.join(destPrefix, dest)
  };
}

function _getDestPrefix(platform) {
  return platform === 'web' ?
        `${config('paths').staging.web}` : `${config('paths').staging.hybrid}/www`;
}

function _getValidLibObj(buildType, libName, libObj, base, platform) {
  let cwd = libObj.cwd;
  if (libObj[buildType].cwd !== undefined) cwd = path.join(libObj.cwd, libObj[buildType].cwd);
  const src = Array.isArray(libObj[buildType].src)
    ? libObj[buildType].src : [libObj[buildType].src];
  const dest = _getValidDestFromPathMapping(libObj[buildType], libName, base, platform);
  if (_needRename(libObj[buildType].src, dest)) {
    const rename = function (pathPrefix) {
      const fileName = path.basename(_processVersionToken(libName, libObj[buildType].path));
      return path.join(pathPrefix, fileName);
    };
    return { cwd, src, dest, rename };
  }
  return { cwd, src, dest };
}

function _needRename(src, dest) {
  // when the provided src is a single file, and the requirejs path has a different name
  // example in node moduels, the lib is jquery.js, but the path is jquery-3.3.1.js
  if (Array.isArray(src)) return false;
  return path.basename(src) !== path.basename(dest);
}

function _getValidDestFromPathMapping(libObj, libName, base, platform) {
  let dest = (path.extname(libObj.path) === '' || path.extname(libObj.path) === '.min')
    ? libObj.path : path.join(libObj.path, '..');
  dest = _processVersionToken(libName, dest);
  return path.join(_getDestPrefix(platform), base, dest);
}

function _processVersionToken(libName, destPath) {
  return Object.keys(versions).indexOf(libName) !== -1
    ? destPath.replace(CONSTANTS.PATH_MAPPING_VERSION_TOKEN, versions[libName]) : destPath;
}

function _isCdnPath(libObj, useCdn, cdnUrls, buildType) {
  return (useCdn === 'cdn'
    && libObj.cdn !== undefined
    && cdnUrls[libObj.cdn] !== undefined
    && libObj[buildType].cdnPath !== undefined);
}

function _needCopyTask(buildType, libObj) {
  return Object.prototype.hasOwnProperty.call(libObj[buildType], 'src');
}

npmCopy.renameAltaThemeFiles = function (paths) {
  const fileList = {
    'oj-alta.css': 'alta.css',
    'oj-alta-min.css': 'alta.min.css'
  };

  const themePath = path.join(paths.staging.themes, CONSTANTS.DEFAULT_THEME);

  CONSTANTS.SUPPORTED_PLATFORMS.forEach((platform) => {
    Object.keys(fileList).forEach((key) => {
      fs.renameSync(path.join(themePath, platform, key),
        path.join(themePath, platform, fileList[key]));
    });
  });
};

npmCopy.getMappingLibsList = function (buildMode, platform) {
  const buildType = buildMode === 'release' ? 'release' : 'debug';
  const libsList = [];
  const masterJson = util.readPathMappingJson();
  const basePath = masterJson.baseUrl;
  Object.keys(masterJson.libs).forEach((lib) => {
    const libObj = masterJson.libs[lib];
    const isCdn = _isCdnPath(libObj, masterJson.cdn, masterJson.cdns, buildType);
    // Skip copy the library if it uses cdn
    if (!isCdn && _needCopyTask(buildType, libObj)) {
      libsList.push(_getValidLibObj(buildType, lib, libObj, basePath, platform));
    }
  });
  return libsList;
};
