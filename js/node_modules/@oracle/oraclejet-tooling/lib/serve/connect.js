/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

/**
 * # Dependencies
 */

/* 3rd party */
const connect = require('connect');
const serveStatic = require('serve-static');
const serveIndex = require('serve-index');
const http = require('http');
const injectLiveReload = require('connect-livereload');
const open = require('opn');
const util = require('util');

const utils = require('../util');

/**
 * # serve Connect Module
 *
 * @public
 */
module.exports = function (opts) {
  utils.log('Starting web server.');
  const connectOpts = _processCustomOptions(opts);
  return new Promise((resolve, reject) => {
    const middlewareList = _getMiddleware(connectOpts);
    const app = connect();

    middlewareList.forEach((middleware) => {
      let middlewareArray = middleware;
      if (!util.isArray(middlewareArray)) {
        middlewareArray = [middlewareArray];
      }
      app.use.apply(app, middlewareArray); //eslint-disable-line
    });

    const server = http.createServer(app);
    const hostname = connectOpts.hostname || '0.0.0.0';
    const targetHostname = hostname === '0.0.0.0' ? 'localhost' : hostname;
    const target = `http://${targetHostname}:${connectOpts.port}`;
    console.log(`Connecting to ${target}`);
    server
      .listen(connectOpts.port, connectOpts.hostname)
      .on('listening', () => {
        utils.log.success(`Server ready: http://${targetHostname}:${connectOpts.port}`);
        if (connectOpts.open) {
          open(target);
        }
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

function _getMiddleware(options) {
  let middlewares = [];
  middlewares = _getDefaultMiddleware(options);
  if (options.livereload) {
    const livereloadConfig = { port: options.livereloadPort, hostname: options.hostname };
    middlewares.unshift(injectLiveReload(livereloadConfig));
  }
  return middlewares;
}

function _getDefaultMiddleware(options) {
  const middlewares = [];
  const middlewareOpts = options;
  if (!Array.isArray(middlewareOpts.base)) {
    middlewareOpts.base = [middlewareOpts.base];
  }
  // Options for serve-static module. See https://www.npmjs.com/package/serve-static
  const defaultStaticOptions = {};
  const directory = middlewareOpts.directory || middlewareOpts.base[middlewareOpts.base.length - 1];
  middlewareOpts.base.forEach((base) => {
    // Serve static files.
    const rootPath = base.path || base;
    const staticOptions = base.options || defaultStaticOptions;
    middlewares.push(serveStatic(rootPath, staticOptions));
  });
  // Make directory browse-able.
  middlewares.push(serveIndex(directory.path || directory));
  return middlewares;
}

function _processCustomOptions(opts) {
  const result = opts || null;
  if (opts.hostname === '*') {
    result.hostname = '';
  }

  if (opts.port === '?') {
    result.port = 0;
  }

  const defaultOpts = _getDefaultOptions();
  return Object.assign({ livereloadPort: opts.livereloadPort }, defaultOpts, result);
}

function _getDefaultOptions() {
  return {
    port: 8000,
    hostname: '0.0.0.0',
    livereload: true,
    open: true
  };
}
