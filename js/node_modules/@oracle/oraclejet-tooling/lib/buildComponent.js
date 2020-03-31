/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

const config = require('./config');
const CONSTANTS = require('./constants');
const path = require('path');
const util = require('./util');
const fs = require('fs-extra');
const hookRunner = require('./hookRunner');
const defaultOption = require('./defaultconfig');

function _getComponentJsonObj(componentPath) {
  const file = path.resolve(componentPath, 'component.json');
  if (util.fsExistsSync(file)) {
    return fs.readJsonSync(file);
  }
  return {};
}

function _copyToStaging(component) {
  const srcPath = util.getComponentPath(component);
  const componentJson = util.readJsonAndReturnObject(path.join(srcPath,
    CONSTANTS.JET_COMPONENT_JSON));

  if (!util.hasProperty(componentJson, 'version')) {
    util.log.error(`Missing property 'version' in '${component}' component's/pack's definition file.`);
  }
  //
  // Delete the web/ component directory.
  // Example destPath: web/js/jet-composites/demo-component/
  //
  const destBase = util.getDestBase();
  util.deleteDir(path.join(destBase, component));
  //
  // Copy component to both the debug and the min directory.
  // Example destPath: web/js/jet-composites/demo-component/1.0.0
  // Example min/ destPath: web/js/jet-composites/demo-component/1.0.0/min
  //
  const destPath = path.join(destBase, component, componentJson.version);
  fs.copySync(srcPath, destPath);
  fs.copySync(srcPath, path.join(destPath, 'min'));
}

//
// Build a specific component.
//
module.exports = function buildComponent(component) {
  return new Promise((resolve, reject) => {
    const componentSrcPath = util.getComponentPath(component);
    const context = { componentConfig: _getComponentJsonObj(componentSrcPath) };
    _copyToStaging(component);
    util.uglifyComponent(component, defaultOption.build.uglify(config('paths')).options)
      .then(hookRunner('after_component_build', context))
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};
