/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

module.exports = {
  WEB_DIRECTORY: 'web',
  CORDOVA_DIRECTORY: 'hybrid',
  APP_SRC_DIRECTORY: 'src',
  APP_SRC_HYBRID_DIRECTORY: 'src-hybrid',
  APP_SRC_WEB_DIRECTORY: 'src-web',
  APP_THEMES_DIRECTORY: 'themes',
  DEFAULT_THEME: 'alta',
  DEFAULT_BROWSER: 'chrome',
  COMMON_THEME_DIRECTORY: 'common',
  JET_COMPOSITE_DIRECTORY: 'jet-composites',
  JET_COMPONENTS_DIRECTORY: 'jet_components',
  NODE_MODULES_DIRECTORY: 'node_modules',
  JET_COMPONENT_JSON: 'component.json',
  SUPPORTED_PLATFORMS: ['android', 'ios', 'web', 'windows'],
  SUPPORTED_THEME_PLATFORMS: ['android', 'ios', 'web', 'windows', 'common'],
  SUPPORTED_HYBRID_PLATFORMS: ['android', 'ios', 'windows'],
  SUPPORTED_BROWSERS: ['chrome', 'firefox', 'edge', 'ie', 'safari'],
  SUPPORTED_WEB_PLATFORMS: ['web'],

  CORDOVA_CONFIG_XML: 'config.xml',

  APP_TYPE:
  {
    HYBRID: 'hybrid',
    WEB: 'web'
  },

  DEBUG_FLAG: '--debug',
  RELEASE_FLAG: '--release',
  SUPPORTED_BUILD_DESTINATIONS: ['emulator', 'device'],
  SUPPORTED_SERVE_HYBRID_DESTINATIONS: ['browser', 'emulator', 'device', 'server-only'],
  SUPPORTED_SERVE_WEB_DESTINATIONS: ['server-only'],
  DEFAULT_BUILD_DESTINATION: 'emulator',
  RESERVED_Key_ALL_THEME: 'all',
  ORACLE_JET_CONFIG_JSON: 'oraclejetconfig.json',
  PATH_TO_ORACLEJET: 'node_modules/@oracle/oraclejet/dist',
  PATH_MAPPING_JSON: 'path_mapping.json',
  PATH_MAPPING_VERSION_TOKEN: '#{version}',
  PATH_TO_HOOKS_CONFIG: 'scripts/hooks/hooks.json',

  API_TASKS: {
    ADD: 'add',
    ADDSASS: 'addsass',
    CONFIGURE: 'configure',
    CREATE: 'create',
    LIST: 'list',
    PUBLISH: 'publish',
    REMOVE: 'remove',
    SEARCH: 'search'
  },
  API_SCOPES: {
    EXCHANGE: 'exchange',
    COMPONENT: 'component',
    PACK: 'pack'
  },
  EXCHANGE_URL_PARAM: 'exchange-url'
};
