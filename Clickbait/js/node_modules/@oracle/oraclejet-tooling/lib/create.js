#! /usr/bin/env node
/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

/**
 * ## Dependencies
 */
const CONSTANTS = require('./constants');
const pack = require('./scopes/pack');
const util = require('./util');

/**
 * # Switch for 'ojet.create()'
 *
 * @public
 * @param {string} scope
 * @param {string} parameter
 * @returns {Promise}
 */
module.exports = function (scope, parameter) {
  switch (scope) {
    case (CONSTANTS.API_SCOPES.PACK):
      return pack.create(parameter);
    default:
      util.log.error(`Please specify ojet.${CONSTANTS.API_TASKS.CREATE}() 'scope' parameter.`);
      return false;
  }
};
