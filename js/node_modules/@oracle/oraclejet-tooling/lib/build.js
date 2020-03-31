/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

const buildWeb = require('./buildWeb');
const buildHybrid = require('./buildHybrid');
const buildComponent = require('./buildComponent');
const valid = require('./validations');
const config = require('./config');
/**
* # API
* ## ojet.build([platform],[options])
* @public
* @param {string} [platform='web']           - Platform, defaults to 'web'
* @param {Object} [options]                  - Options object
* @param {string} [options.buildType]        - buildType 'dev' or 'release'
* @param {string} [options.theme]            - Theme, default to alta:platform
* @param {Array} [options.themes]            - Themes, default to first theme in the array
* @param {boolean} [options.sassCompile]     - Whether to compile sass
* @param {string} [options.destination='emulator'] -Cordova build flag --emulator or --device
* @param {string} [options.buildConfig]      - Path to build configuration file
* @param {boolean} [options.buildForServe]   - Whether to invoke build just for Serve
* @param {string} [options.setDefaultConfig] - String path to default json file
* @param {string} [options.staingPath]       - Path to the staging directory
* @param {object} [options.inject]           - Object for inject task configuration
* @param {object} [options.uglify]           - Object for uglify task configuration
* @param {object} [options.copyToRelase]     - Object for copyToRelease task configuration
* @param {object} [options.requireJs]        - Object for requireJs task configuration
* @param {object} [options.sass]             - Object for sass task configuration
* @returns {Promise}
*/
module.exports = function build(platform, options) {
  if (Object.prototype.hasOwnProperty.call(options, 'component')) {
    config.loadOraclejetConfig('web');
    return buildComponent(options.component);
  }
  config.loadOraclejetConfig(platform);
  const validPlatform = valid.platform(platform);
  const validOptions = valid.buildOptions(options, validPlatform);
  const validBuildType = valid.buildType(validOptions);
  config.set('platform', validPlatform);
  if (platform === 'web') {
    return buildWeb(validBuildType, validOptions);
  }

  return buildHybrid(validBuildType, validPlatform, validOptions);
};
