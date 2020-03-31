/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

const fs = require('fs-extra');
const util = require('./util');
const path = require('path');
const SVGO = require('svgo');
const glob = require('glob');
const config = require('./config');
const CONSTANTS = require('./constants');
const SVGSpriter = require('svg-sprite');

/**
 * Return the promise to optimize user provided svg files, remove redundant content
 * @param  {Object} Running context that contains all options
 * @returns {Promise} return the promise
 */

function _svgMin(context) {
  const opts = context.opts.svgMin;
  const fileResult = util.getFileList(context.buildType, opts.fileList);
  const svgo = new SVGO(opts.options);
  return new Promise((resolve, reject) => {
    try {
      fileResult.forEach((file) => {
        const src = fs.readFileSync(file.src);
        svgo.optimize(src, (result) => {
          if (result.error) reject(result.error);
          fs.outputFileSync(path.resolve(file.dest), result.data);
        });
      });
      resolve(context);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Return the promise to combine user provided svg files into a sprite.svg
 * and update the _oj.common.sprite.scss
 * @param  {Object} Running context that contains all options
 * @returns {Promise} return the promise
 */
function _svgSprite(context) {
  const opts = context.opts.svgSprite;
  const padding = opts.options.shape.spacing.padding || 2;
  const themePath = path.join(`${config('paths').staging.themes}`, CONSTANTS.DEFAULT_THEME);
  return new Promise((resolve, reject) => {
    try {
      fs.readdirSync(themePath).forEach((dir) => {
        if (CONSTANTS.SUPPORTED_THEME_PLATFORMS.indexOf(dir) !== -1) {
          opts.options.mode = _svgSpriteMode(util.mapToSourceSkinName(dir));
          const fileList = glob.sync('images/*.svg', { cwd: path.join(themePath, dir) });
          if (opts.options.shape.spacing.padding) opts.options.shape.spacing.padding = padding;
          const spriter = new SVGSpriter(opts.options);
          fileList.forEach((file) => {
            if (path.basename(file) !== 'sprite.svg') {
              const fileBase = path.join(themePath, dir);
              spriter.add(path.resolve(file), path.basename(file), fs.readFileSync(path.resolve(fileBase, file), { encoding: 'utf-8' }));
            }
          });
          spriter.compile((error, result) => {
            Object.keys(result).forEach((mode) => {
              Object.keys(result[mode]).forEach((resource) => {
                const output = result[mode][resource];
                const svgDestSuffix = 'images/sprites/sprite.svg';
                let dest = path.join(config('paths').staging.themes, CONSTANTS.DEFAULT_THEME, dir, svgDestSuffix);
                dest = path.extname(output.path) === '.svg' ? dest : output.path;
                const filePrefix = util.mapToSourceSkinName(dir).replace('-', '.');
                fs.outputFileSync(dest, output.contents);
                const content = fs.readFileSync(dest, 'utf-8').replace(/_(?!.+\.svg)/g, '-');
                if (filePrefix !== 'common') {
                  fs.outputFileSync(dest, content.replace(/common\.sprite/g, `${filePrefix}.sprite`));
                } else {
                  fs.outputFileSync(dest, content.replace(/oj-image-url/g, 'oj-common-image-url'));
                }
              });
            });
          });
        }
      });
      resolve(context);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Return the mode configuration for svg spriter
 * @param  {String} Skin name
 * @returns {Object} return the object configuration
 */
function _svgSpriteMode(skin) {
  const filePrefix = skin.replace('-', '.');
  return {
    css: {
      render: {
        scss: {
          template: `${CONSTANTS.PATH_TO_ORACLEJET}/scss/templates/svg-sprite-template.scss.txt`,
          dest: `${CONSTANTS.PATH_TO_ORACLEJET}/scss/${skin}/widgets/_oj.${filePrefix}.sprite.scss`
        }
      },
      layout: 'horizontal',
      dest: '.',
      sprite: 'sprite.svg',
      bust: false,
      example: false
    }
  };
}

module.exports = {
  spriteSvg: function _spriteSvg(context) {
    return new Promise((resolve, reject) => {
      try {
        _svgMin(context)
        .then(_svgSprite)
        .then(() => {
          resolve(context);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};
