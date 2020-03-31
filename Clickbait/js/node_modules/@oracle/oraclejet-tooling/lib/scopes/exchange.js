#! /usr/bin/env node
/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

/**
 * ## Dependencies
 */
// Node
const fs = require('fs');

// Oracle
const CONSTANTS = require('../constants');
const util = require('../util');

/**
 * # Exchange
 *
 * @public
 */
const exchange = module.exports;

/**
 * ## configure
 *
 * @public
 * @param {string} url - exchange url
 */
exchange.configureUrl = function (url) {
  return new Promise((resolve) => {
    const configObj = util.readJsonAndReturnObject(`./${CONSTANTS.ORACLE_JET_CONFIG_JSON}`);
    configObj[CONSTANTS.EXCHANGE_URL_PARAM] = url;
    try {
      fs.writeFileSync(`./${CONSTANTS.ORACLE_JET_CONFIG_JSON}`, JSON.stringify(configObj, null, 2));
      util.log.success(`Exchange url set: '${url}'`);
      resolve();
    } catch (e) {
      util.log.error('Exchange url could not be set.', true);
    }
  });
};

/**
 * ## search
 *
 * @public
 * @param {string} parameter
 * @param {Object} options
 * @returns {Promise}
 */
exchange.search = function (parameter, options) {
  return new Promise((resolve) => {
    util.ensureParameters(parameter, CONSTANTS.API_TASKS.SEARCH);
    util.log(`Searching for '${parameter}' in the Exchange ...`);
    util.request({
      path: `/components/?q=${parameter}*&format=full`,
    }).then((response) => {
      let responseBody = '';
      response.on('data', (respBody) => {
        responseBody += respBody;
      });
      response.on('end', () => {
        util.checkForHttpErrors(response, responseBody);
        const components = JSON.parse(responseBody).items;

        if (components.length === 0) {
          util.log.success('No components found.');
        } else {
          _customisePrintOutput(options);
          _printHead();
          _printResults(components, parameter);
        }
        resolve();
      });
    }).catch((error) => {
      util.log.error(error, true);
    });
  });
};

const table = {
  name: 40,
  displayName: 40,
  tags: 40,
  description: 40
};

const space = ' ';

/**
 * ## _customisePrintOutput
 *
 * @private
 * @param {Object} options
 */

function _customisePrintOutput(options) {
  // Versions
  if (options.versions) {
    // Do not show tags and description
    delete table.tags;
    delete table.description;

    // Use this space to show all available versions
    table.versions = 80;
  }
}

/**
 * ## _printHead
 *
 * @private
 */
function _printHead() {
  let headLine = '';
  Object.keys(table).forEach((key) => {
    const colSpaces = table[key] - key.length;
    if (colSpaces < 0) {
      headLine += `<${key.substring(0, table[key] - 2)}>${space}`;
    } else {
      headLine += `<${key}>${space.repeat(colSpaces - 2)}${space}`;
    }
  });
  util.log(headLine);
}

/**
 * ## _printResults
 *
 * @private
 * @param {Array} components
 * @param {string} parameter
 */
function _printResults(components, parameter) {
  components.forEach((component) => {
    const comp = component;
    let line = '';

    Object.keys(table).forEach((key) => {
      // 'displayName' and 'description' are within metadata[component] scope
      if (['displayName', 'description'].indexOf(key) > -1) {
        comp[key] = comp.component[key] || '';
      }

      if (util.hasProperty(comp, key)) {
        // Custom handling for 'tags'
        if (key === 'tags') {
          comp[key] = _processTags(comp[key], parameter);
        }

        const colSpaces = table[key] - comp[key].length;

        if (colSpaces < 0) {
          line += comp[key].substring(0, table[key]) + space;
        } else {
          line += comp[key] + space.repeat(colSpaces) + space;
        }
      }
    });

    util.log(line);
  });
}

/**
 * ## _processTags
 *
 * @private
 * @param {Array} tags
 * @param {string} parameter
 */
function _processTags(tags, parameter) {
  const lowerCaseTags = tags.map(value => value.toLowerCase());

  function matchTag(tag) {
    return tag.match(parameter.toLowerCase());
  }

  const i = lowerCaseTags.findIndex(matchTag);

  return i > -1 ? tags[i] : tags[0] || '';
}
