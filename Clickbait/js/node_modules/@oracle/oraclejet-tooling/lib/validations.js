/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

const util = require('./util');
const DEFAULT_CONFIG = require('./defaultconfig');
const CONSTANTS = require('./constants');
const fs = require('fs-extra');
const path = require('path');
const config = require('./config');

const _ = {};
_.isFunction = require('lodash.isfunction');

module.exports = {
  theme: function _validateTheme(options, platform) {
    return _setValidThemeOption(options, platform);
  },

  platform: function _validatePlatform(platform) {
    const validPlatform = platform || _getDefaultPlatform();
    if (fs.existsSync(config('paths').src.web) || fs.existsSync(config('paths').src.hybrid)) {
      if (CONSTANTS.SUPPORTED_PLATFORMS.indexOf(validPlatform) > -1) {
        return validPlatform;
      }
      util.log.error(`Platform '${platform}' not supported`);
      return false;
    } else if (fs.existsSync(config('paths').staging.hybrid)) {
      if (CONSTANTS.SUPPORTED_HYBRID_PLATFORMS.indexOf(validPlatform) > -1) {
        return validPlatform;
      }
      util.log.error(`Platform '${platform}' not supported for hybrid app`);
      return false;
    }
    if (CONSTANTS.SUPPORTED_WEB_PLATFORMS.indexOf(validPlatform) > -1) {
      return validPlatform;
    }
    util.log.error(`Platform '${platform}' not supported for web app`);
    return false;
  },

  buildType: function _validateBuildType(options) {
    const buildType = options.buildType;
    if (buildType && buildType !== 'undefined') {
      if (buildType === 'release' || buildType === 'dev') {
        return buildType;
      } else if (buildType === 'debug') {
        return 'dev';
      }
      util.log.error(`Option buildType ${buildType} is invalid!`);
      return false;
    }
    return 'dev';
  },

  buildOptions: function _validateOption(options, platform, buildForLiveReload) {
    let opts = options || {};
    const defaultConfig = _getDefaultBuildConfig(platform);
    opts = util.mergePlatformOptions(opts, platform);
    opts = util.mergeDefaultOptions(opts, defaultConfig);
    opts = (buildForLiveReload || opts.buildForServe) ? opts : _setValidThemeOption(opts, platform);
    opts = (buildForLiveReload || opts.buildForServe) ? opts : _setValidDestination(opts);
    return opts;
  },

  getDefaultServeConfig: () => _getDefaultServeConfig(),

  getDefaultPlatformsConfig: () => _getDefaultPlatformsConfig(),

  getThemeObject: (themeStr, platform) => _getValidThemeObject(themeStr, platform)

};

function _getDefaultBuildConfig() {
  return _convertConfigFunctionToObj(DEFAULT_CONFIG.build);
}

function _getDefaultServeConfig() {
  return _convertConfigFunctionToObj(DEFAULT_CONFIG.serve);
}

function _getDefaultPlatformsConfig() {
  return DEFAULT_CONFIG.platforms(config('paths'));
}

function _convertConfigFunctionToObj(input) {
  const result = input;
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (_.isFunction(value)) {
      result[key] = value(config('paths'));
    }
  });
  return result;
}

// todo - do we want to rewrite the no-param-reassign for options ?
function _setValidDestination(options) {
  if (options.destination) {
    if (CONSTANTS.SUPPORTED_BUILD_DESTINATIONS.indexOf(options.destination) === -1) {
      util.log.error(`Destination ${options.destination} not supported. `);
    }
  } else {
   // eslint-disable-next-line no-param-reassign
    options.destination = CONSTANTS.DEFAULT_BUILD_DESTINATION;
  }
  return options;
}

function _setDefaultTheme(options, platform) {
  let defaultTheme = options.theme;
  if (!options.theme && options.themes) {
    // default to alta theme if options.themes equlats to 'all' or 'all:all';
    let themeName = _getThemeNameFromStr(options.themes[0]);
    let themePlatform = _getThemePlatformFromStr(options.themes[0], platform);
    themeName =
          (themeName === CONSTANTS.RESERVED_Key_ALL_THEME) ? CONSTANTS.DEFAULT_THEME : themeName;
    themePlatform =
          (themePlatform === CONSTANTS.RESERVED_Key_ALL_THEME) ? platform : themePlatform;
    defaultTheme = `${themeName}:${themePlatform}`;
  }
  return defaultTheme;
}

function _getThemeNameFromStr(themeStr) {
  return (themeStr.indexOf(':') === -1) ? themeStr : themeStr.split(':')[0];
}
function _getThemePlatformFromStr(themeStr, defaultPlatform) {
  return (themeStr.indexOf(':') === -1) ? defaultPlatform : themeStr.split(':')[1];
}

// todo - do we want to rewrite the no-param-reassign for themeStr and platform ?
function _getValidThemeObject(themeStr, platform) {
  const themeObj = {};
  if (themeStr) {
    themeStr = themeStr.replace('browser', 'web'); // eslint-disable-line no-param-reassign
    platform = platform.replace('browser', 'web'); // eslint-disable-line no-param-reassign

    if (themeStr.indexOf(':') === -1) {
      themeObj.name = themeStr;
      themeObj.platform = platform;
      themeObj.compile = _setSassCompile(themeObj);
    } else {
      const args = themeStr.split(':');
      themeObj.name = args[0];
      themeObj.platform = args[1];
      themeObj.compile = _setSassCompile(themeObj);
    }
  } else {
    themeObj.name = CONSTANTS.DEFAULT_THEME;
    themeObj.platform = platform;
    themeObj.compile = _setSassCompile(themeObj);
  }
  themeObj.version = _getThemeVersion(themeObj.name);
  return themeObj;
}

// todo - do we want to rewrite the no-param-reassign for options ?
// (disabled the eslint check for now)
function _setValidThemeOption(options, platform) {
  const themeStr = _setDefaultTheme(options, platform);
  options.theme = _getValidThemeObject(themeStr, platform); // eslint-disable-line no-param-reassign
  options.themes = _processThemesOption(options, platform); // eslint-disable-line no-param-reassign
  /* console.log(`Theme Name:Platform - ${options.theme.name}:${options.theme.platform}
                  \nTheme Version - ${options.theme.version}`);*/
  return options;
}

function _getThemesArray(themesOption, platform) {
  if (themesOption[0] === CONSTANTS.RESERVED_Key_ALL_THEME) {
    return util.getAllThemes();
  } else if (themesOption[0] === `${CONSTANTS.RESERVED_Key_ALL_THEME}:${CONSTANTS.RESERVED_Key_ALL_THEME}`) {
    // get all possible combinations when --themes =all:all
    let themesArray = [];
    const allThemes = util.getAllThemes();
    allThemes.forEach((singleTheme) => {
      const tempArray = _getThemesArrayForAllPlatforms(singleTheme);
      themesArray = themesArray.concat(tempArray);
    });
    // todo - Arrow function used ambiguously with a conditional function (no-confusing-arrow)
    const altaThemes = CONSTANTS.SUPPORTED_PLATFORMS.reduce(
        (previousValue, currentValue) =>
            ((currentValue === platform) &&
            _checkThemeFileExist(CONSTANTS.DEFAULT_THEME, currentValue) ?
            previousValue : previousValue.concat([`${CONSTANTS.DEFAULT_THEME}:${currentValue}`])), []);
    themesArray = themesArray.concat(altaThemes);
    return themesArray;
  }
  let result = [];
  themesOption.forEach((themeStr) => {
    const themeName = _getThemeNameFromStr(themeStr);
    const themePlatform = _getThemePlatformFromStr(themeStr, platform);
    // Handle --themes=themeName:all situation
    if (themePlatform === CONSTANTS.RESERVED_Key_ALL_THEME) {
      const tempArray = _getThemesArrayForAllPlatforms(themeName);
      result = result.concat(tempArray);
    } else if (themeName === CONSTANTS.RESERVED_Key_ALL_THEME) {
      const tempArray = _getThemesArrayForAllThemes(themePlatform);
      result = result.concat(tempArray);
    } else {
      result.push(`${themeName}:${themePlatform}`);
    }
  });
  return result;
}

function _getThemesArrayForAllPlatforms(themeName) {
  const allPlatforms = CONSTANTS.SUPPORTED_PLATFORMS;
  // todo - Arrow function used ambiguously with a conditional function (no-confusing-arrow)
  const tempArray =
        allPlatforms.reduce((previousValue, currentValue) =>
                            (_checkThemeFileExist(themeName, currentValue) ?
                            previousValue.concat([`${themeName}:${currentValue}`]) : previousValue), []);
  return tempArray;
}

function _getThemesArrayForAllThemes(themePlatform) {
  const allThemes = util.getAllThemes();
  // todo - Arrow function used ambiguously with a conditional function (no-confusing-arrow)
  const tempArray = allThemes.reduce((previousValue, currentValue) =>
                                     (_checkThemeFileExist(currentValue, themePlatform) ?
      previousValue.concat([`${currentValue}:${themePlatform}`]) : previousValue), []);
  return tempArray;
}

function _checkThemeFileExist(themeName, themePlatform) {
  const themesDir = util.destPath(path.join(config('paths').staging.themes, themeName, themePlatform));
  const themesSrcDir = util.destPath(path.join(config('paths').src.common, config('paths').src.themes, themeName, themePlatform));
  return _checkPathExist(themesDir) || _checkPathExist(themesSrcDir);
}

function _processThemesOption(options, platform) {
  if (options.themes) {
    let themesArray = _getThemesArray(options.themes, platform);
    const defaultTheme = `${options.theme.name}:${options.theme.platform}`;
    // Remove theme that is duplicate with default theme
    themesArray = themesArray.filter(element => element !== defaultTheme);
    themesArray = themesArray.map(singleTheme => _getValidThemeObject(singleTheme, platform));
    return themesArray;
  }
  return undefined;
}

function _getThemeVersion(themeName) {
  if (themeName === CONSTANTS.DEFAULT_THEME) {
    return util.getJETVersion();
  }
  const themeJsonPath = util.destPath(path.join(config('paths').src.common, config('paths').src.themes, themeName, 'theme.json'));
  let themeJson;
  if (_checkPathExist(themeJsonPath)) {
    themeJson = fs.readJsonSync(themeJsonPath);
    return Object.prototype.hasOwnProperty.call(themeJson, 'version') ? themeJson.version : '';
  }
  return '';
}

function _getDefaultPlatform() {
  return (fs.existsSync(config('paths').staging.hybrid)) ? DEFAULT_CONFIG.serve.defaultHybridPlatform : 'web';
}

function _setSassCompile(theme) {
  // if alta, skip checking src/themes
  if (theme.name === CONSTANTS.DEFAULT_THEME) {
    return false;
  }
  const srcExist = _checkPathExist(path.join(config('paths').src.common, config('paths').src.themes, theme.name));
  const themeExist = _checkPathExist(path.join(config('paths').staging.themes, theme.name));
  if (srcExist) {
    // src/themes/theme exists, compile sass
    _validateSassInstall();
    return true;
  } else if (themeExist) {
    // src/theme missing but themes presence, skip sass compile
    return false;
  }
  util.log.error(`Theme '${theme.name}:${theme.platform}' does not exist in ` +
  `${config('paths').staging.themes} or ${config('paths').src.common}/${config('paths').src.themes}`);
  return false;
}

function _checkPathExist(themePath) {
  try {
    fs.statSync(themePath);
    return true;
  } catch (err) {
    return false;
  }
}

function _validateSassInstall() {
  // since node sass is installed separately, regardless of npm 2 or npm3,
  //  it will be installed on top level of node_modules
  const sassPackageJson = util.destPath(path.join('node_modules', 'node-sass', 'package.json'));

  try {
    fs.statSync(sassPackageJson);
  } catch (err) {
    util.log.error('Please run \'ojet add sass\' to configure your projects for SASS processing.');
  }
}
