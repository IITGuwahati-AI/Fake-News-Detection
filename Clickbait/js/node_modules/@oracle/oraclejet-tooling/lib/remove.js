#! /usr/bin/env node
/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

/**
 * ## Dependencies
 */
const component = require('./scopes/component');
const CONSTANTS = require('./constants');
const pack = require('./scopes/pack');
const util = require('./util');

/**
 * # Switch for 'ojet.remove()'
 *
 * @public
 * @param {string} scope
 * @param {Array} parameters
 * @param {boolean} isStrip
 * @returns {Promise}
 */
module.exports = function (scope, parameters, isStrip) {
  switch (scope) {
    case (CONSTANTS.API_SCOPES.COMPONENT):
      return component.remove(parameters, isStrip);
    case (CONSTANTS.API_SCOPES.PACK):
      return pack.remove(parameters);
    default:
      util.log.error(`Please specify ojet.${CONSTANTS.API_TASKS.REMOVE}() 'scope' parameter.`);
      return false;
  }
};
