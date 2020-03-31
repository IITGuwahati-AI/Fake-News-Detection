/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

const path = require('path');
const util = require('./util');
const fs = require('fs-extra');
const CONSTANT = require('./constants');
const config = require('./config');
const glob = require('glob');

function _writeSassResultToFile(options, result) {
  if (options.sourceMap) {
    fs.ensureFileSync(`${options.outFile}.map`);
    fs.outputFileSync(`${options.outFile}.map`, result.map);
  }
  fs.ensureFileSync(options.outFile);
  fs.outputFileSync(options.outFile, result.css);
}

function _getSassTaskPromise(options, context) {
  const sass = require('node-sass'); // eslint-disable-line
  return new Promise((resolve, reject) => {
    sass.render(options, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        _writeSassResultToFile(options, result);
        console.log(`sass compile\n from ${options.file}\n to    ${options.outFile} finished..`);
        resolve(context);
      }
    });
  });
}

function _getSassDest(buildType, dest) {
  const name = path.basename(dest, '.scss');
  const ext = util.getThemeCssExtention(buildType);
  let sassDest = util.destPath(path.join(path.dirname(dest), name + ext));
  if (util.isCcaSassFile(dest)) {
    const base = path.join(config('paths').staging.stagingPath, config('paths').src.javascript, config('paths').composites);
    const topDir = path.parse(path.relative(base, dest)).dir;
    const components = glob.sync('**/component.json', { cwd: path.join(base, topDir) });
    // is standalone component
    if (components.length === 1) {
      sassDest = util.destPath(path.join(base, topDir, components[0], '..', name + ext));
    } else {
      const componentJsonPath = path.join(base, topDir, 'component.json');
      const packVersion = util.fsExistsSync(componentJsonPath) ?
        util.readJsonAndReturnObject(componentJsonPath).version : '1.0.0';
      sassDest = util.destPath(path.join(base, topDir, packVersion, name + ext));
    }
  }
  return sassDest;
}

function _getSassPromises(context) {
  // compile only the changed theme during livereload
  if (context.changedTheme && context.changedTheme.compile) {
    return _getSassTasks(context.changedTheme, context);
  }

  if (context.changedCcaTheme) {
    console.log(`CCA ${context.changedCcaTheme} Changed...`);
    return _getCcaSassTasks(context, true);
  }

  return _getDefaultThemeTasks(context);
}

function _getDefaultThemeTasks(context) {
  const opts = context.opts;
  // compile the default theme
  let taskArray = [];
  if (opts.theme.compile) {
    taskArray = taskArray.concat(_getSassTasks(opts.theme, context));
  }

  // if svg is enabled, re-compile Alta
  if ((opts.svg) && opts.theme.name === CONSTANT.DEFAULT_THEME) {
    taskArray = taskArray.concat(_getAltaSassTasks(opts.theme, context));
  }

  // compile additional multi themes
  if (opts.themes) {
    opts.themes.forEach((singleTheme) => {
      if (singleTheme.compile) {
        taskArray = taskArray.concat(_getSassTasks(singleTheme, context));
      }
    });
  }

  // compile cca
  if (opts.sassCompile) {
    taskArray = taskArray.concat(_getCcaSassTasks(context, false));
  }

  return taskArray;
}

function _getCcaSassTasks(context, isCcaLiveReload) {
  const fileList = util.getFileList(context.buildType, _getCcaFileList(context.opts.sass.fileList));
  return _getSassTasksFromFileList(context.changedCcaTheme, fileList, context, isCcaLiveReload);
}

function _getSassTasks(theme, context) {
  let fileList = _getThemeFileList(context.opts.sass.fileList);
  fileList = util.getFileList(context.buildType, fileList, { theme }, { theme });
  return _getSassTasksFromFileList(theme, fileList, context, false);
}

function _getAltaSassTasks(theme, context) {
  context.opts.theme.directory = _getAltaSourcePath(context.platform); //eslint-disable-line
  let fileList = _getThemeFileList(context.opts.altasass.fileList);
  fileList = util.getFileList(context.buildType, fileList, { theme }, { theme });
  return _getSassTasksFromFileList(theme, fileList, context, false);
}

function _getAltaSourcePath(platform) {
  return path.join(CONSTANT.PATH_TO_ORACLEJET, 'scss', util.mapToSourceSkinName(platform));
}

function _getCcaFileList(fileList) {
  return fileList.filter(fileObj => util.isCcaSassFile(fileObj.cwd));
}

function _getThemeFileList(fileList) {
  return fileList.filter(fileObj => !util.isCcaSassFile(fileObj.cwd));
}

function _getSassTasksFromFileList(theme, fileList, context, isCcaLiveReload) {
  const promiseList = [];
  const opts = context.opts;
  const buildType = context.buildType;
  const sassOpts = _getSassTaskOptions(buildType, opts.sass.options);
  fileList.forEach((file) => {
    const src = file.src;
    const dest = _getSassDest(buildType, file.dest);
    if (!src || path.basename(src)[0] === '_') {
      // do nothing if the file name starts with underscore
    } else if (isCcaLiveReload && !_matchChangedCca(src, theme)) {
      // do nothing if the SASS file is not in right CCA for livereload
    } else {
      const fileOpts = {
        file: src,
        outFile: dest
      };
      const finalSassOpts = Object.assign({}, sassOpts, fileOpts);
      promiseList.push(_getSassTaskPromise(finalSassOpts, context));
    }
  });
  return promiseList;
}

function _getSassTaskOptions(buildType, defaultSassOpts) {
  let sassOpts;
  if (buildType === 'release') {
    sassOpts = {
      outputStyle: 'compressed'
    };
  } else {
    sassOpts = {
      outputStyle: 'nested',
      sourceMap: true
    };
  }

  return Object.assign({}, sassOpts, defaultSassOpts);
}

function _matchChangedCca(filePath, changedCcaTheme) {
  return filePath.indexOf(changedCcaTheme) !== -1;
}

module.exports = {
  getPromises: context => _getSassPromises(context)
};
