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
 * # Switch for 'ojet.publish()'
 *
 * @public
 * @param {string} scope
 * @param {string} parameter
 * @param {Object} options
 * @returns {Promise}
 */
module.exports = function (scope, parameter, options) {
  switch (scope) {
    case (CONSTANTS.API_SCOPES.COMPONENT):
      return component.publish(parameter, options);
    case (CONSTANTS.API_SCOPES.PACK):
      return pack.publish(parameter, options);
    default:
      util.log.error(`Please specify ojet.${CONSTANTS.API_TASKS.PUBLISH}() 'scope' parameter.`);
      return false;
  }
};
