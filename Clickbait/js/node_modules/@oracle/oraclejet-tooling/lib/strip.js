/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

const glob = require('glob');
const fs = require('fs-extra');
const util = require('./util');
const path = require('path');

const _ = {};
_.union = require('lodash.union');
_.difference = require('lodash.difference');

function _getGitIgnore() {
  let content = [];
  try {
    content = fs.readFileSync(util.destPath('.gitignore'), 'utf-8');
  } catch (e) {
    util.log.warning('No .gitignore file found.  No files will be cleaned');
    return [];
  }
  return content.split(/\r?\n/);
}

function _getCleanFileList(ignoreList) {
  let fileList = [];
  ignoreList.forEach((file) => {
    if (file.length !== 0 && !/Thumbs\.db|\.DS_Store/.test(file)) {
      const exclusion = file.indexOf('!') === 0;
      let srcPattern = exclusion ? file.slice(1) : file;
      // .gitignore file pattern may start with '/', remove it for glob matching
      srcPattern = srcPattern[0] === '/' ? srcPattern.slice(1) : srcPattern;
      const match = glob.sync(util.destPath(srcPattern), { cwd: util.destPath() });
      if (exclusion) {
        fileList = _.difference(fileList, match);
      } else {
        fileList = _.union(fileList, match);
      }
    }
  });
  return fileList;
}

module.exports = function strip() {
  const fileList = _getCleanFileList(_getGitIgnore());
  return new Promise((resolve, reject) => {
    fileList.forEach((file) => {
      if (path.extname(file) === '') {
        fs.emptyDirSync(file);
        fs.removeSync(file);
      } else {
        fs.remove(file, (err) => {
          if (err) reject(err);
        });
      }
    });
    resolve();
  });
};
