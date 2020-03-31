/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

const fs = require('fs-extra');
const UglifyJS = require('uglify-es');
const glob = require('glob');

const path = require('path');
const requirejs = require('requirejs');
const util = require('./util');
const config = require('./config');

const npmCopy = require('./npmCopy');
const mainJsInjector = require('./mainJsInjector');
const indexHtmlInjector = require('./indexHtmlInjector');
const svg = require('./svg');
const CONSTANTS = require('./constants');
const hookRunner = require('./hookRunner');

function _getUglyCode(file, uglifyOptions) {
  const code = fs.readFileSync(file, 'utf-8');
  return UglifyJS.minify(code, uglifyOptions);
}

function _writeUglyCodeToFile(fileList, uglifyOptions) {
  return new Promise((resolve, reject) => {
    try {
      fileList.forEach((file) => {
        const destDir = file.dest;
        const data = _getUglyCode(file.src, uglifyOptions);
        if (data.error) throw data.error;
        fs.outputFileSync(util.destPath(destDir), data.code);
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function _copyFileToStaging(fileList) {
  return new Promise((resolve, reject) => {
    try {
      for (let i = 0; i < fileList.length; i++) {
        const destDir = fileList[i].dest;
        const srcDir = fileList[i].src;
        if (_isSvgFile(srcDir)) {
          fs.copySync(srcDir, destDir, { overwrite: false, errorOnExist: false });
        } else {
          fs.copySync(srcDir, destDir, { overwrite: true });
        }
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function _isSvgFile(fileName) {
  return path.extname(fileName) === '.svg';
}

function _getThemeSrcPath(theme) {
  return `${config('paths').staging.themes}/${theme.name}/${theme.platform}`;
}

function _getThemeDestPath(theme, stagingPath, ext, cssonly, servePlatform, serveDestination) {
  let dest;
  let base;
  const stylePath = config('paths').src.styles;
  if (cssonly) {
    if (servePlatform === 'web') {
      base = path.resolve(stagingPath);
    } else if (serveDestination === 'browser') {
      base = path.resolve(stagingPath, '..', 'platforms', serveDestination, 'www');
    } else {
      base = path.resolve(stagingPath, '..', 'platforms', servePlatform, 'assets', 'www');
    }
    dest = util.destPath(path.join(base, stylePath, theme.name, theme.version, theme.platform, '/'));
  } else {
    dest = util.destPath(path.join(stagingPath, stylePath, theme.name, theme.version, theme.platform, '/'));
  }
  return dest;
}

function _copyThemeCommonToStaging(theme, stagingPath) {
  const src = `${config('paths').staging.themes}/${theme.name}/${CONSTANTS.COMMON_THEME_DIRECTORY}`;
  const dest = util.destPath(path.join(stagingPath, config('paths').src.styles, theme.name, theme.version, CONSTANTS.COMMON_THEME_DIRECTORY));

  return new Promise((resolve, reject) => {
    util.fsExists(src, (err) => {
      if (err) {
        // do nothing, common dir is missing
        resolve();
      } else {
        try {
          fs.copySync(src, dest);
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

function _copyAltaResourcesToStaging(theme, stagingPath) {
  const srcBase = `${config('paths').staging.themes}/${CONSTANTS.DEFAULT_THEME}`;
  const destBase = util.destPath(path.join(stagingPath, config('paths').src.styles, CONSTANTS.DEFAULT_THEME, util.getJETVersion()));

  const commonSrc = path.join(srcBase, CONSTANTS.COMMON_THEME_DIRECTORY);
  const altaFontsSrc = path.join(srcBase, theme.platform, 'fonts');
  const altaImagesSrc = path.join(srcBase, theme.platform, 'images');

  const commonDest = path.join(destBase, CONSTANTS.COMMON_THEME_DIRECTORY);
  const altaFontsDest = path.join(destBase, theme.platform, 'fonts');
  const altaImagesDest = path.join(destBase, theme.platform, 'images');

  fs.copySync(commonSrc, commonDest);
  fs.copySync(altaFontsSrc, altaFontsDest);
  fs.copySync(altaImagesSrc, altaImagesDest);
}

function _copyComponentsToStaging(componentsSource) {
  return new Promise((resolve) => {
    if (util.isObjectEmpty(componentsSource)) {
      // No component source present, continue...
      resolve();
    } else {
      const componentDirectories = util.getDirectories(componentsSource.cwd);
      if (componentDirectories.length) {
        componentDirectories.forEach((component) => {
          const componentDirPath = path.resolve(CONSTANTS.JET_COMPONENTS_DIRECTORY, component);
          const componentJsonPath = path.join(
            componentDirPath, CONSTANTS.JET_COMPONENT_JSON);
          if (fs.existsSync(componentJsonPath)) {
            const componentJson = util.readJsonAndReturnObject(componentJsonPath);
            const destBase = path.join(config('paths').staging.stagingPath, config('paths').src.javascript, config('paths').composites);
            if (!util.hasProperty(componentJson, 'version')) {
              util.log.error(`Missing property 'version' in '${component}' component's/pack's definition file.`);
            }
            const destPath = path.join(destBase, component, componentJson.version);
            fs.copySync(componentDirPath, destPath);
            resolve();
          } else {
            // Folder is missing component.json, log warning and skip.
            util.log.warning(`Missing the definition file '${CONSTANTS.JET_COMPONENT_JSON}' for component / pack '${component}'.`);
            resolve();
          }
        });
      } else {
        // No components added from the Exchange, continue...
        resolve();
      }
    }
  }).catch(error => util.log.error(error));
}

function _copyFilesExcludeScss(srcBase, destBase) {
  try {
    fs.ensureDirSync(destBase);
    if (util.fsExistsSync(srcBase)) {
      const fileList = fs.readdirSync(srcBase);
      fileList.forEach((file) => {
        const fileStat = fs.statSync(path.join(srcBase, file));
        // if file is not scss file, copy to themes
        if (fileStat.isDirectory() || !/scss/.test(path.extname(file))) {
          fs.copySync(path.join(srcBase, file), path.join(destBase, file));
        }
      });
    }
  } catch (err) {
    util.log(err);
  }
}

function _copySrcResourcesToThemes(theme) {
  const srcBase = `${config('paths').src.common}/${config('paths').src.themes}/${theme.name}`;
  const destBase = util.destPath(path.join(config('paths').staging.themes, theme.name));
  const srcCommon = path.join(srcBase, CONSTANTS.COMMON_THEME_DIRECTORY);
  fs.ensureDirSync(srcCommon);
  _copyFilesExcludeScss(srcCommon, path.join(destBase, CONSTANTS.COMMON_THEME_DIRECTORY));
  _copyFilesExcludeScss(path.join(srcBase, theme.platform), path.join(destBase, theme.platform));
}

function _copyMultiThemesSrcResourcesToThemes(themes) {
  if (themes) {
    themes.forEach((singleTheme) => {
      _copySrcResourcesToThemes(singleTheme);
    });
  }
}

function _copyMultiThemesToStaging(opts, stagingPath, livereload) {
  if (opts.themes && !livereload) {
    const srcBase = config('paths').staging.themes;
    opts.themes.forEach((singleTheme) => {
      // copy css
      const src = path.join(srcBase, singleTheme.name, singleTheme.platform);
      const dest = util.destPath(path.join(stagingPath, config('paths').src.styles, singleTheme.name, singleTheme.version, singleTheme.platform, '/'));
      fs.copySync(src, dest);

      // copy common dir
      const commonSrc = `${srcBase}/${singleTheme.name}/${CONSTANTS.COMMON_THEME_DIRECTORY}`;
      const commonDest = util.destPath(path.join(stagingPath, config('paths').src.styles, singleTheme.name, singleTheme.version, CONSTANTS.COMMON_THEME_DIRECTORY));
      if (util.fsExistsSync(commonSrc)) {
        fs.copySync(commonSrc, commonDest);
      }
    });
  }
}

function _copyThemesToStaging(context) {
  const opts = context.opts;
  const buildType = context.buildType;
  const platform = context.platform;
  const stagingPath = opts.stagingPath;
  const theme = context.changedTheme || opts.theme;
  const livereload = opts.cssonly;
  // copy only the css file during serve livereload
  // copy the entire theme/platform folder during build
  const ext = util.getThemeCssExtention(buildType);
  const src = _getThemeSrcPath(theme, ext, livereload);
  const dest = _getThemeDestPath(theme, stagingPath, ext, livereload, platform, opts.destination);

  return new Promise((resolve, reject) => {
    // copy to themes

    if (theme.name !== CONSTANTS.DEFAULT_THEME && !livereload) {
      _copySrcResourcesToThemes(theme);
        // copy alta resources link imageDir, fontsDir, commonImageDir
      _copyAltaResourcesToStaging(theme, stagingPath);
    }
    _copyMultiThemesSrcResourcesToThemes(opts.themes);

    // copy to staging
    // copy theme/platform to staging
    fs.copySync(src, dest);
    // copy additional resources in themes/theme/common
    _copyThemeCommonToStaging(theme, stagingPath)
    .then(_copyMultiThemesToStaging(opts, stagingPath, livereload))
    .then(() => {
      resolve(context);
    })
    .catch(err => reject(err));
  });
}

// only runs when platform is windows, fixing locale Bug 26871715
function _renameNlsDirs() {
  const srcBase = `${config('paths').staging.stagingPath}/${config('paths').src.javascript}/libs/oj/v${util.getJETVersion()}/resources/nls`;
  const match = glob.sync('*', { cwd: srcBase, ignore: ['*.js', '*locale*'] });
  match.forEach((file) => {
    const src = path.join(srcBase, file);
    const dest = path.join(srcBase, `locale_${file}`);
    fs.copySync(src, dest, { overwrite: true });
    fs.removeSync(src);
  });
}

module.exports = {
  clean: function _clean(context) {
    util.log('Cleaning staging path.');
    const opts = context.opts;
    const stagingPath = opts.stagingPath;
    const filePath = util.destPath(stagingPath);

    return new Promise((resolve, reject) => {
      fs.emptyDir(filePath, (err) => {
        if (err) reject(err);
        resolve(context);
      });
    });
  },

  copy: function _copySrcToStaging(context) {
    util.log('Copy files to staging directory.');

    let srcFileList = context.opts.copySrcToStaging.fileList;
    // Filter out Exchange components object
    // There's no simple way to recognise those sources
    // after they are serialized to dest>src path below
    const componentsSource = srcFileList.filter((sourceObject) => { // eslint-disable-line
      return sourceObject.cwd === CONSTANTS.JET_COMPONENTS_DIRECTORY;
    });

    // Filter out non Exchange components sources
    if (componentsSource.length > 0) {
      srcFileList = srcFileList.filter((sourceObject) => { // eslint-disable-line
        return sourceObject.cwd !== CONSTANTS.JET_COMPONENTS_DIRECTORY;
      });
    }

    // Serialization to dest>src
    const fileResult = util.getFileList(context.buildType, srcFileList);

    return _copyFileToStaging(fileResult)
      .then(() => _copyComponentsToStaging(componentsSource[0]))
      .then(() => {
        util.log('Copy finished.');
        return context;
      });
  },

  copyLibs: function _copyLibsToStaging(context) {
    util.log('Copy library files to staging directory.');
    const opts = context.opts;
    const buildType = context.buildType;
    const platform = context.platform;
    const pathMappingLibs = util.getFileList(buildType,
      npmCopy.getMappingLibsList(buildType, platform));
    const nonMappingLibs = npmCopy.getNonMappingFileList(buildType, platform);
    const customLibs = util.getFileList(buildType, opts.copyCustomLibsToStaging.fileList);
    return _copyFileToStaging(nonMappingLibs.concat(pathMappingLibs, customLibs))
      .then(() => {
        util.log('Copy finished.');
        npmCopy.renameAltaThemeFiles(config('paths'));
        return context;
      });
  },

  injectPaths: function _injectMainPaths(context) {
    util.log('Running injection tasks.');
    return new Promise((resolve, reject) => {
      mainJsInjector.injectPaths(context)
        .then(() => {
          util.log('Task main.js paths injection finished.');
          resolve(context);
        })
        .catch(err => reject(err));
    });
  },

  injectLocalhostCspRule: function _injectLocalhostCspRule(context) {
    util.log('Running localhost csp rule injection task.');

    return new Promise((resolve, reject) => {
      indexHtmlInjector.injectLocalhostCspRule(context)
        .then(() => {
          util.log('Task index.html localhost csp rule injection finished.');
          resolve(context);
        })
        .catch(err => reject(err));
    });
  },

  injectCdnBundleScript: function _injectCdnBundleScript(context) {
    return new Promise((resolve, reject) => {
      indexHtmlInjector.injectCdnBundleScript(context)
        .then(() => {
          util.log('Task index.html cdn bundle injection finished.');
          resolve(context);
        })
        .catch(err => reject(err));
    });
  },

  injectTheme: function _injectTheme(context) {
    util.log('Running theme injection task.');

    return new Promise((resolve, reject) => {
      indexHtmlInjector.injectThemePath(context)
        .then(() => {
          util.log('Task index.html theme path injection finished.');
          resolve(context);
        })
        .catch(err => reject(err));
    });
  },

  copyThemes: function _copyThemes(context) {
    util.log('Running theme copy task.');
    return new Promise((resolve, reject) => {
      _copyThemesToStaging(context)
        .then(() => {
          util.log('Theme copy task finished.');
          resolve(context);
        })
        .catch(err => reject(err));
    });
  },

  uglify: function _uglify(context) {
    util.log('Running uglify task.');

    const opts = context.opts;
    const buildType = context.buildType;
    const platform = context.platform;
    const uglifyConfig = opts.uglify;
    const fileResult = util.getFileList(buildType, uglifyConfig.fileList, platform);

    return new Promise((resolve, reject) => {
      _writeUglyCodeToFile(fileResult, uglifyConfig.options)
        .then(() => {
          util.log('Task uglify finished.');
          resolve(context);
        })
        .catch(err => reject(err));
    });
  },

  requireJs: function _requireJs(context) {
    util.log('Running requirejs task.');

    const opts = context.opts;
    const requireConfig = opts.requireJs;

    return new Promise((resolve, reject) => {
      requirejs.optimize(requireConfig, () => {
        util.log('Task requirejs finished.');
        resolve(context);
      }, (err) => {
        util.log(err);
        reject(err);
      });
    });
  },

  sass: function _compileSass(context) {
    util.log('Compiling sass.');

    return new Promise((resolve, reject) => {
      if (context.opts.sassCompile === false && svg !== true) {
        util.log('Sass compile skipped.');
        resolve(context);
      } else {
        // require sass here to avoid depency error if node-sass is not installed
        const sass = require('./sass'); // eslint-disable-line global-require
        const sassPromises = sass.getPromises(context);
        Promise.all(sassPromises)
        .then(() => {
          util.log('Sass compile finished.');
          resolve(context);
        })
        .catch(err => reject(err));
      }
    });
  },
  cleanTemp: function _cleanTemp(context) {
    util.log('Cleaning mainTemp.');
    const opts = context.opts;
    let tempPath = opts.stagingPath;
    let tempName = opts.injectPaths;
    tempName = path.basename(tempName.destMainJs);
    tempPath = path.join(tempPath, config('paths').src.javascript, tempName);
    const filePath = util.destPath(tempPath);

    return new Promise((resolve, reject) => {
      fs.remove(filePath, (err) => {
        if (err) reject(err);
      });
      util.log('Task cleanMainTemp finished.');
      resolve(context);
    });
  },

  spriteSvg: function _spriteSvg(context) {
    util.log('Optimizing svg into SVG sprites.');
    return new Promise((resolve, reject) => {
      svg.spriteSvg(context, (err) => {
        if (err) reject(err);
      });
      util.log('Svg optimisation task finished.');
      resolve(context);
    });
  },

  fixWindowsLocale: function _fixWindowsLocale(context) {
    return new Promise((resolve) => {
      const platform = context.platform;
      if (platform !== 'windows') {
        return resolve(context);
      }
      _renameNlsDirs();
      return resolve(context);
    });
  },
  copyLocalCca: function _copyLocalCca(context) {
    return new Promise((resolve) => {
      const srcBase = path.join(config('paths').src.common, config('paths').src.javascript, config('paths').composites);
      const destBase = path.join(config('paths').staging.stagingPath, config('paths').src.javascript, config('paths').composites);
      const foldersContainingComponentJson = glob.sync(`*/${CONSTANTS.JET_COMPONENT_JSON}`, { cwd: srcBase });
      foldersContainingComponentJson.forEach((folder) => {
        const componentJson = util.readJsonAndReturnObject(path.join(srcBase, folder));
        // Note: +1 for the slash
        const componentName = folder.slice(0, -(CONSTANTS.JET_COMPONENT_JSON.length + 1));
        if (!util.hasProperty(componentJson, 'version')) {
          util.log.error(`Missing property 'version' in '${componentName}' component's/pack's definition file.`);
        }
        const srcPath = path.join(srcBase, componentName);
        const destPath = path.join(destBase, componentName, componentJson.version);
        // Stage the component for both debug and min
        fs.removeSync(destPath);
        // avoid recursively copy the min directory
        const filter = function (src) {
          return !/min/.test(src);
        };
        fs.copySync(srcPath, destPath);
        fs.copySync(srcPath, path.join(destPath, 'min'), { filter });
        // Minify the components - this is done for generic builds (as well as release builds)
        util.uglifyComponent(componentName, context.opts.uglify.options);
      });
      return resolve(context);
    });
  },

  //
  // Copy the reference component from the npm path into the staging directory.
  //
  // For reference components, the preferred configuration will select the minified component.
  // (provided that it exists).
  // E.g., even if the --release flag is not present,
  // we still will use the minified component.
  //
  // jet_components/oj-ref-showdown/component.json
  // jet_components/oj-ref-showdown
  //
  // Example component.json:
  // {
  //   "name": "oj-ref-showdown",
  //   "type": "reference",
  //   "package":"showdown",
  //   "version": "1.9.0",
  //   "paths": {
  //     "npm": {
  //       "min": "dist/showdown.min",
  //       "debug": "dist/showdown"
  //      },
  //      "cdn": {
  //        "min": "https://static.oracle.com/cdn/jet/packs/3rdparty/showdown/1.9.0/showdown.min",
  //        "debug": "https://static.oracle.com/cdn/jet/packs/3rdparty/showdown/1.9.0/showdown.min"
  //       }
  //    }
  // }

  copyReferenceCca(context) {
    return new Promise((resolve) => {
      util.log('Copy reference components to staging directory.');
      const componentList = util.getDirectories(`./${CONSTANTS.JET_COMPONENTS_DIRECTORY}`);
      componentList.forEach((component) => {
        const componentDirPath = `./${CONSTANTS.JET_COMPONENTS_DIRECTORY}/${component}/${CONSTANTS.JET_COMPONENT_JSON}`;
        const componentJson = util.readJsonAndReturnObject(`${componentDirPath}`);
        if (componentJson.type === 'reference') {
          const npmPckgName = componentJson.package;
          const retObj = util.getNpmPckgInitFileRelativePath(componentJson, context.buildType);
          const npmPckgInitFileRelativePath = retObj.npmPckgInitFileRelativePath;

          //
          // Select the the minimized path (if defined).
          // Otherwise select the debug path.
          // Example path from component.json:
          //
          //  "paths": {
          //    "npm": {
          //      "min": "dist/showdown.min",
          //      "debug": "dist/showdown"
          //     }
          //   }
          //

          // Copy is only necessary for npm paths.
          // (no copy is necessary for cdn paths).
          if (npmPckgInitFileRelativePath !== undefined && retObj.npm) {
            // Extract out the filename portion of the path.
            const npmPckgInitFileNameArray = npmPckgInitFileRelativePath.split('/');
            const npmPckgInitFileName = npmPckgInitFileNameArray[npmPckgInitFileNameArray.length - 1]; // eslint-disable-line max-len
            const npmPckgSrcPath = `./${CONSTANTS.NODE_MODULES_DIRECTORY}/${npmPckgName}/${npmPckgInitFileRelativePath}`; // eslint-disable-line max-len
            //
            // Construct the npm path (node_modules) to the component file.
            // E.g:
            //   ./node_modules/showdown/dist/showdown
            // Then copy this file to
            //   /web/js/libs/showdown/showdown.js
            //
            // Note - the component.json npm path does not necessarily have the .js extension,
            // so we handle this if necessary.
            //

            const destBasePath = path.join(config('paths').staging.stagingPath, config('paths').src.javascript, 'libs');
            //
            // If npmPckgSrcPath is a directory (containing multiple files),
            // then we need to copy the entire directory.
            //
            const destNpmpckgDirPath = `${destBasePath}/${npmPckgName}/${npmPckgInitFileName}`;

            if (util.fsExistsSync(npmPckgSrcPath)) {
              fs.copySync(npmPckgSrcPath, destNpmpckgDirPath);
            } else if (util.fsExistsSync(npmPckgSrcPath.concat('.js'))) {
              fs.copySync(npmPckgSrcPath.concat('.js'), destNpmpckgDirPath.concat('.js'));
            }
          }
        }
      });
      util.log('Copy finished.');
      resolve(context);
    });
  },

  //
  // For all components, run the component hooks.
  // Since there could be several components in the build,
  // we use Promise.all to wait for all component hooks to execute.
  // Return the original context object.
  //
  runAllComponentHooks: function _runAllComponentHooks(context) {
    return new Promise((resolve, reject) => {
      util.log('runAllComponentHooks ');
      const promises = [];
      // util.log('runAllComponentHooks ' + JSON.stringify(context, null, '  '));
      // strip down the context parameter.
      const newContext = util.processContextForHooks(context);
      const srcBase = path.join(config('paths').src.common, config('paths').src.javascript, config('paths').composites);
      const components = glob.sync('**/component.json', { cwd: srcBase });
      Promise.all(promises).then(() => {
        // util.log(responses);
        // Return the original context object
        resolve(context);
      }).catch(
        err => reject(err)
      );
      components.forEach((componentPath) => {
        util.log(`runAllComponentHooks for component: ${JSON.stringify(componentPath)}`);
        const componentJson = util.readJsonAndReturnObject(path.join(srcBase, componentPath));
        if (componentJson) {
          newContext.componentConfig = componentJson;
        }
        promises.push(hookRunner('after_component_build', newContext));
      });
    });
  }

};
