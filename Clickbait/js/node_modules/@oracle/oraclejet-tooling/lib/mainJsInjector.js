/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

const fs = require('fs-extra');
const util = require('./util');
const injectorUtil = require('./injectorUtil');
const pathGenerator = require('./rjsConfigGenerator');

function _getInjectSource(mainJs) {
  return fs.readFileSync(mainJs, 'utf-8');
}

function _getInjectContent(buildType, mainPathMapping) {
  let injectCode = '\n{\n';
  Object.keys(mainPathMapping).forEach((key) => {
    const lib = mainPathMapping[key];
    injectCode += `  '${key}':'${lib}',\n`;
  });

  injectCode = injectCode.slice(0, -2);
  injectCode += '\n}\n';
  return injectCode;
}

function _replaceReleasePath(buildType, config, platform, injectedFile) {
  const injectSrc = _getInjectSource(injectedFile);
  const startTag = config.startTag;
  const endTag = config.endTag;
  const pattern = injectorUtil.getInjectorTagsRegExp(startTag, endTag);
  const lineEnding = /\r\n/.test(String(injectSrc)) ? '\r\n' : '\n';

  let injectContent = '';

  if (config.mainPathMapping) {
    injectContent = _getInjectContent(buildType, config.mainPathMapping);
    injectContent = injectContent.replace(/'/g, '"');
    injectContent = injectContent.replace(/\\/g, '/');
  } else {
    // if no main path JSON, extract the requirejs config section from source
    const result = pattern.exec(injectSrc);
    injectContent = result[3];
  }

  if (platform === 'windows') {
    injectContent = _injectWindowsResourcePaths(injectContent);
    injectContent = _appendWindowsLocaleConfig(injectContent);
  }

  // clear old content between injectors
  let injectResult = injectSrc.replace(pattern, () =>
    startTag + lineEnding + endTag
  );

   // actual injection
  injectResult = injectResult.replace(pattern, () =>
    startTag + lineEnding + injectContent + lineEnding + endTag
  );

  // inject baseUrl entry in requirejs config
  const baseUrlValue = util.readPathMappingJson().baseUrl;
  if (baseUrlValue) {
    const baseUrlPattern = /([\t ]*)('|")?baseUrl['"]?\s*:\s*['"](.*?)['"],/gi;
    const baseUrlResult = baseUrlPattern.exec(injectResult);
    if (baseUrlResult) {
      const indentStr = baseUrlResult[1];
      const stringChar = baseUrlResult[2] || "'";
      const newBaseUrl = `${indentStr}baseUrl: ${stringChar}${baseUrlValue}${stringChar},`;
      injectResult = injectResult.replace(baseUrlPattern, newBaseUrl);
    }
  }

  return injectResult;
}

//
// Update config.mainJs, replacing the path mappings that are delimited by
// the "injector" comment tags.
// (see defaultconfig.js for the default tags (look for "injectPaths")).
//
function _writeRequirePathToFile(context) {
  const config = context.opts.injectPaths;
  const buildType = context.buildType;
  const platform = context.platform;

  return new Promise((resolve, reject) => {
    let destDir = (buildType === 'release') ? config.destMainJs : config.mainJs;
    destDir = util.destPath(destDir);

    if (!fs.existsSync(config.mainJs)) resolve(context);

    const injectedContent = _replaceReleasePath(buildType, config, platform, config.mainJs);

    fs.outputFile(destDir, injectedContent, (err) => {
      if (err) reject(err);
      resolve(context);
    });
  });
}

//
// Update config.testJs, replacing the path mappings.
// (This code is similar to the above _writeRequirePathToFile() function).
//
function _writeRequirePathToTestFile(context) {
  const config = context.opts.injectPaths;
  const buildType = context.buildType;
  const platform = context.platform;

  return new Promise((resolve, reject) => {
    let destDir = config.testJs;
    destDir = util.destPath(destDir);

    if (!fs.existsSync(config.testJs)) resolve(context);

    const injectedContent = _replaceReleasePath(buildType, config, platform, config.testJs);

    fs.outputFile(destDir, injectedContent, (err) => {
      if (err) reject(err);
      resolve(context);
    });
  });
}

/**
 * _appendWindowsLocaleConfig - Work around Windows Default Locale Loading Mechanism
 * It appends an extra requirejs configuration section for the ojL10n to load with prefix "locale_"
 * the entire configuration will be inserted into main.js between the injection marks
 *
 * @param {string} content requirejs path config section
 * @return {string} updated content with locale config
 */
function _appendWindowsLocaleConfig(content) {
  const lineEnding = /\r\n/.test(String(content)) ? '\r\n' : '\n';
  const indentStr = '  ';

  const newContent = `${content},${lineEnding
                      }${indentStr}${indentStr}config: {${lineEnding
                      }${indentStr}${indentStr}${indentStr}ojL10n: {${lineEnding
                      }${indentStr}${indentStr}${indentStr}${indentStr}localePrefix: 'locale_'${lineEnding
                      }${indentStr}${indentStr}${indentStr}}${lineEnding
                      }${indentStr}${indentStr}}`;
  return newContent;
}

/**
 * _injectWindowsResourcePaths - adds extra resource path entries for windows
 *
 * @param {string} content requirejs path config section
 * @return {string} updated content with windows resource paths
 */
function _injectWindowsResourcePaths(content) {
  const lineEnding = /\r\n/.test(String(content)) ? '\r\n' : '\n';
  const translationsPattern = /([\t ]*)('|")?ojtranslations['"]?\s*:\s*['"](.*?)['"],/gi;

  const result = translationsPattern.exec(content);

  if (!result) {
    // no match, return unchanged content
    return content;
  }

  const translationsEntry = result[0];
  const indentStr = result[1];
  const stringChar = result[2] || "'";
  const resourcesPath = result[3];

  const resourceEntries = `${translationsEntry + lineEnding
       + indentStr + _createResourceEntry(resourcesPath, stringChar, 'ojtranslations')},${lineEnding
        }${indentStr}${_createResourceEntry(resourcesPath, stringChar, 'localeElements')},${lineEnding
        }${indentStr}${_createResourceEntry(resourcesPath, stringChar, 'timezoneData')},`;

  const newContent = content.replace(translationsEntry, resourceEntries);
  return newContent;
}

function _createResourceEntry(resourcesPath, stringChar, resource) {
  const entry = `${stringChar}ojtranslations/nls/${resource}${stringChar}:${
             stringChar}${resourcesPath}/root/${resource}${stringChar}`;
  return entry;
}


function _setMainPathMapping(context, pathsMapping) {
  const config = context.opts.injectPaths;
  const newContext = context;
  return new Promise((resolve) => {
    config.mainPathMapping = pathsMapping;
    newContext.opts.injectPaths = config;
    resolve(newContext);
  });
}


module.exports = {
  injectPaths: function _injectpaths(context) {
    return new Promise((resolve, reject) => {
      try {
        const newContext = context;
        const pathsObj = pathGenerator.getPathsMapping(context);
        newContext.opts.requireJs = pathGenerator.updateRJsOptimizerConfig(context);
        _setMainPathMapping(newContext, pathsObj)
        .then(_writeRequirePathToFile)
        .then(_writeRequirePathToTestFile)
        .then(() => {
          resolve(newContext);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};
