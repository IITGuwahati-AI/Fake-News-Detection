/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  build: {

    stagingPath: paths => paths.staging.stagingPath,

    injectPaths: paths => ({
      startTag: '//injector:mainReleasePaths',
      endTag: '//endinjector',
      mainJs: `${paths.staging.stagingPath}/${paths.src.javascript}/main.js`,
      testJs: `${paths.staging.stagingPath}/${paths.src.tests}/${paths.src.javascript}/main.js`,
      destMainJs: `${paths.staging.stagingPath}/${paths.src.javascript}/main-temp.js`,
      mainReleasePaths: `${paths.src.common}/${paths.src.javascript}/main-release-paths.json`
    }),

    //
    // The first block directive copies all .js from src dir, (excluding main.js
    // and also excluding the jet-composites/ directory).
    // We exclude the jet-composites/ dir because the component
    // version naming is not identical under the src/ and web/ path.
    //
    uglify: paths => ({
      fileList: [
        {
          cwd: `${paths.src.common}/${paths.src.javascript}`,
          src: ['**/*.js', '!main.js', `!${paths.composites}/**/*.js`],
          dest: `${paths.staging.stagingPath}/${paths.src.javascript}`
        },
        {
          cwd: `${paths.staging.stagingPath}/${paths.src.javascript}`,
          src: ['main-temp.js'],
          dest: `${paths.staging.stagingPath}/${paths.src.javascript}`
        },
        {
          // jquery ui npm package does not provide minified scripts
          buildType: 'release',
          cwd: `${paths.staging.stagingPath}/${paths.src.javascript}/libs`,
          src: ['jquery/jqueryui-amd*min/**/*.js'],
          dest: `${paths.staging.stagingPath}/${paths.src.javascript}/libs`
        }
      ],
      options: {
        compress: {
          warnings: false
        },
        mangle: {
            // Disable mangling requirejs config to avoid optimization errors
          reserved: ['require']
        },
        output: {
          max_line_len: 32000,
          ascii_only: false,
          beautify: false,
          quote_style: 0
        },
        ie8: false
      }
    }),

    svgMin: paths => ({
      fileList: [
        {
          cwd: `${paths.staging.themes}`,
          src: ['**/*.svg'],
          dest: `${paths.staging.themes}`
        }
      ],
      options: {
        plugins: [
          { removeXMLNS: false },
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false },
          { convertStyleToAttrs: false },
          { removeEmptyAttrs: true },
          {
            removeAttrs: {
              attrs: ['xmlnsX']
            }
          }
        ]
      }
    }),

    svgSprite: {
      options: {
        shape: {
          spacing: { // Add padding
            padding: 2, // 0 would sometimes have nearby sprites bleeding in (see "layout")
            box: 'content' // I was hoping this would exclude the padding but doesn't, so have to include the padding in the background-position
          }
        }
      }
    },

    copySrcToStaging: paths => ({
      fileList: [
        {
          buildType: 'release',
          cwd: paths.src.common,
          src: [
            '**',
            `!${paths.src.javascript}/**/*.js`,
            `${paths.src.javascript}/main.js`,
            `${paths.src.javascript}/libs/**`,
            `!${paths.src.javascript}/libs/**/*debug*`,
            `!${paths.src.javascript}/libs/**/*debug*/**`,
            `!${paths.src.javascript}/main-release-paths.json`,
            `!${paths.staging.themes}/**`,
            `!${paths.src.javascript}/${paths.composites}/**`,
            '!cordova.js'
          ],
          dest: paths.staging.stagingPath
        },
        {
          buildType: 'dev',
          cwd: paths.src.common,
          src: [
            '**',
            `!${paths.src.javascript}/${paths.composites}/**`,
            `!${paths.src.javascript}/main-release-paths.json`,
            `!${paths.staging.themes}/**`,
          ],
          dest: paths.staging.stagingPath
        },
        {
          cwd: paths.src.platformSpecific,
          src: ['**'],
          dest: paths.staging.stagingPath
        },
        {
          buildType: 'dev',
          cwd: `${paths.src.common}/${paths.src.themes}`,
          src: ['**', '!**/*.scss'],
          dest: paths.staging.themes
        },
        {
          buildType: 'release',
          cwd: `${paths.src.common}/${paths.src.themes}`,
          src: ['**', '!**/*.scss', '!**.map'],
          dest: paths.staging.themes
        },
        {
          cwd: `${paths.components}`,
          src: ['**'],
          dest: `${paths.staging.stagingPath}/${paths.src.javascript}/${paths.composites}`
        },
      ],
    }),

    copyCustomLibsToStaging: {
      fileList: []
    },

    requireJs: paths => ({
      baseUrl: `${paths.staging.stagingPath}/${paths.src.javascript}`,
      name: 'main-temp',
      mainConfigFile: `${paths.staging.stagingPath}/${paths.src.javascript}/main-temp.js`,
      optimize: 'none',
      out: `${paths.staging.stagingPath}/${paths.src.javascript}/main.js`
    }),

    sass: paths => ({
      fileList: [
        {
          cwd(context) {
            return `${paths.src.common}/${paths.src.themes}/${context.theme.name}/${context.theme.platform}`;
          },
          src: ['**/*.scss', '!**/_*.scss'],
          dest(context) {
            return `${paths.staging.themes}/${context.theme.name}/${context.theme.platform}`;
          }
        },
        {
          cwd: `${paths.src.common}/${paths.src.javascript}/${paths.composites}`,
          src: ['**/*.scss', '!**/_*.scss'],
          dest: `${paths.staging.stagingPath}/${paths.src.javascript}/${paths.composites}`
        },
        {
          cwd: `${paths.components}`,
          src: ['**/*.scss', '!**/_*.scss'],
          dest: `${paths.staging.stagingPath}/${paths.src.javascript}/${paths.composites}`
        }
      ],
      options: {
        precision: 10
      }
    }),

    altasass: paths => ({
      fileList: [
        {
          cwd(context) {
            return `${context.theme.directory}`;
          },
          src: ['**/*.scss', '!**/_*.scss'],
          dest(context) {
            return `${paths.staging.themes}/${context.theme.name}/${context.theme.platform}`;
          },
          rename: (dest, file) => path.join(dest, file.replace('oj-', ''))
        }
      ],
      options: {
        precision: 10
      }
    }),

    injectTheme: {
      startTag: '<!-- injector:theme -->',
      endTag: '<!-- endinjector -->'
    }
  },

  /* Serve Config */
  serve: {
    defaultHybridPlatform: 'browser',
    // Serve API overall default options
    options: {
      livereload: true,
      build: true,
      port: 8000,
      livereloadPort: 35729,
    },

    // Sub task connect default options
    connect: paths => ({
      options: {
        hostname: '*',
        port: 8000,
        livereload: true,
        base: paths.staging.web,
        open: true
      }
    }),

    // Sub task watch default options
    watch: paths => ({
      sourceFiles:
      {
        files: [
          `${paths.src.common}/${paths.src.styles}/!(libs)/**/*.css`,
          `${paths.src.common}/${paths.src.javascript}/!(libs)/**/*.js`,
          `${paths.src.common}/${paths.src.javascript}/!(libs)/**/*.json`,
          `${paths.src.common}/${paths.src.javascript}/!(libs)/**/*.css`,
          `${paths.src.common}/${paths.src.javascript}/{,*/}*.js`,
          `${paths.src.common}/${paths.src.styles}/{,*/}*.css`,
          `${paths.src.common}/${paths.src.tests}/**/*.css`,
          `${paths.src.common}/${paths.src.tests}/**/*.js`,
          `${paths.src.common}/**/*.html`,
        ],
        options:
        {
          livereload: true,
          spawn: false,
        }
      },

      sass: {
        files: [
          `${paths.src.common}/${paths.src.themes}/**/*`,
          `${paths.components}/**/*.scss`,
          `${paths.src.common}/${paths.src.javascript}/${paths.composites}/**/*.scss`,
        ],
        options: {
          livereload: true,
          spawn: false
        },
        commands: ['compileSass']
      },

      themes: {
        files: [
          `${paths.staging.themes}/**/*`
        ],
        options: {
          livereload: true,
          spawn: false
        },
        commands: ['copyThemes']
      },
    }),
  },

  /* Platform paths */
  platforms: (paths) => {
    let androidRoot = `${paths.staging.hybrid}/platforms/android/assets/www/`;
    const android700Path = `${paths.staging.hybrid}/platforms/android/app/src/main/assets/www/`;
    androidRoot = fs.existsSync(androidRoot) ? androidRoot : android700Path;
    return {
      android: {
        root: `${androidRoot}`,
      },
      browser: {
        root: `${paths.staging.hybrid}/platforms/browser/www/`,
      },
      ios: {
        root: `${paths.staging.hybrid}/platforms/ios/www/`,
      },
      windows: {
        root: `${paths.staging.hybrid}/platforms/windows/www/`,
      }
    };
  }
};
