/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

const util = require('./util');
const fs = require('fs-extra');
const exec = require('child_process').exec;
const config = require('./config');
const path = require('path');
const valid = require('./validations');

const clean = function (filepath) {
  return new Promise((resolve, reject) => {
    fs.emptyDir(filepath, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Finished clean path ${filepath}..`);
        resolve();
      }
    });
  });
};

clean.platform = function (platform) {
  let validPlatform = platform || util.getDefaultPlatform();
  config.loadOraclejetConfig(platform);
  validPlatform = valid.platform(validPlatform);
  config.loadOraclejetConfig(platform);
  if (validPlatform === 'web') {
    clean(path.join(process.cwd(), config('paths').staging.web));
  } else {
    _cordovaClean(validPlatform);
  }
};

module.exports = clean;

function _cordovaClean(platform) {
  const cmd = `cordova clean ${platform}`;
  const cwd = config('paths').staging.hybrid;
  const cmdOpts = { cwd: util.destPath(cwd), stdio: [0, 'pipe', 'pipe'], maxBuffer: 1024 * 20000 };
  const cordova = exec(cmd, cmdOpts, (error) => {
    if (error) {
      console.log(error);
    }
  });

  cordova.stdout.on('data', (data) => {
    console.log(data);
  });
}
