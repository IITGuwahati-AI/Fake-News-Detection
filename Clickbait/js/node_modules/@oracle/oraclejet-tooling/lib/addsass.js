#! /usr/bin/env node
/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

/**
 * ## Dependencies
 */
const util = require('./util');

/**
 * # 'addSass'
 *
 * @public
 * @returns {Promise}
 */
module.exports = function () {
  util.log('Performing \'npm install node-sass\'');
  return util.spawn('npm', ['install', 'node-sass@4.11.0', '--save-dev=true']);
};
