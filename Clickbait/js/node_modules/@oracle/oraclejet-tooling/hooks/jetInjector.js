/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

/**
 * Jet after_prepare hook.
 * Please do not modify.
 * In case you need some after_prepare functionality,
 * please follow Cordova documentation and create another hook.
 */

/**
 * # Dependencies
 */

/* Node.js native */
const fs = require('fs');
const path = require('path');

/* Constants */
const LOCAL_IP_ADDRESS = '127.0.0.1';
const ANDROID_LOCAL_IP_ADDRESS = '10.0.2.2';
const LOAD_URL_TIMEOUT_VALUE = 'loadUrlTimeoutValue';

/**
 * # After prepare hook injector API
 *
 * @public
 */

module.exports =
{
  /**
   * ## updateIndexHtml
   * Updates index.html
   *
   * @public
   * @param {string} platform
   * @param {boolean} external
   */

  updateIndexHtml(platform, external) {
    const indexHtmlPath = _getIndexHtmlPath(platform, external);
    let content;

    if (!indexHtmlPath) {
      return;
    }

    try {
      content = fs.readFileSync(indexHtmlPath, 'utf-8');

      content = _addPlatformStyleClasses(content, platform);
      content = _updateCspGapReady(content);
      if (_isLiveReloadEnabled()) {
        content = _updateCspForLiveReload(content, platform);
        content = _addLiveReloadElement(content, platform);
      }
      fs.writeFileSync(indexHtmlPath, content);
    } catch (e) {
      console.log(`Error:${e}`);
    }
  },

  /**
   * ## updateConfigXml
   * Updates config.xml
   *
   * @public
   * @param {string} platform
   */

  updateConfigXml(platform) {
    let document;
    const configXml = _getConfigXmlPath(platform);
    if (!configXml) {
      return;
    }

    try {
      document = fs.readFileSync(configXml, 'utf-8');
      if (_isLiveReloadEnabled()) {
        if (process.env.platform && process.env.port && process.env.destination) {
          document = _processConfigSrcAttribute(document);
          document = _addNavigationPermission(document);
        }
      }
      document = _addLoadUrlTimeoutPreference(document);
      fs.writeFileSync(configXml, document);
    } catch (e) {
      console.log(`Error:${e}`);
    }
  }
};

/**
 * # Private functions
 * ## _getIndexHtmlPath
 *
 * @private
 * @param {string} platform
 * @param {boolean} external
 * @returns {string || null} indexHtmlPath
 */

function _getIndexHtmlPath(platform, external) {
  let indexHtmlPath;
  let root;
  const prefix = external ? `${process.env.cordovaDirectory}/` : '';

  if (platform === 'android') {
    const android700Path = `${prefix}platforms/android/app/src/main/assets/www/`;
    root = `${prefix}platforms/android/assets/www/`;
    root = fs.existsSync(root) ? root : android700Path;
  } else if (platform === 'ios') {
    root = `${prefix}platforms/ios/www/`;
  } else if (platform === 'windows') {
    root = `${prefix}platforms/windows/www/`;
  } else if (platform === 'browser') {
    root = `${prefix}platforms/browser/www/`;
  } else {
    return null;
  }

  if (root) {
    indexHtmlPath = path.resolve(root, 'index.html');
  }

  return indexHtmlPath;
}

/**
 * ## _addPlatformStyleClasses
 * Adds platform specific css classes
 *
 * @private
 * @param {string} content      - Original content
 * @param {string} platform
 * @returns {string} newContent - Updated content
 */

function _addPlatformStyleClasses(content, platform) {
  let classAttrValue;
  let newBodyTag;
  let newContent = content;
  const classesToAdd = ['oj-hybrid', 'oj-platform-cordova'];
  let actualPlatform = platform;

  // if serving in the browser, pick up the actual platform from env
  if (actualPlatform === 'browser') {
    actualPlatform = process.env.platform;
  }

  const bodyTag = _getXmlTag(content, 'body');
  if (bodyTag) {
    classAttrValue = _getXmlAttrValue(bodyTag, 'class') || '';
    classesToAdd.push(`oj-platform-${actualPlatform}`);

    if (actualPlatform === 'ios') {
      classesToAdd.push('oj-hybrid-statusbar-spacer');
    }

    classAttrValue = _addPlatformStyleClassesIfMissing(classAttrValue, classesToAdd);

    newBodyTag = _setXmlAttrValue(bodyTag, 'class', classAttrValue);
    newContent = content.replace(bodyTag, newBodyTag);
  }
  return newContent;
}

/**
 * ## _addPlatformStyleClassIfMissing
 * appends a new marker class to the provided class attribute value
 *
 * @param {string} classStr            - original class attribute value
 * @param {Array|string} classesToAdd  - new marker class to be added
 * @returns {string}                   - an updated class attribute value
 */
function _addPlatformStyleClassesIfMissing(classStr, classesToAdd) {
  const classes = (classesToAdd instanceof Array) ? classesToAdd : [classesToAdd];
  let newClassStr = classStr;
  for (let i = 0; i < classes.length; i++) {
    if (newClassStr.indexOf(classes[i]) < 0) {
      if (newClassStr.length > 0) {
        newClassStr += ' ';
      }
      newClassStr += classes[i];
    }
  }
  return newClassStr;
}

/**
 * ## _addLiveReloadElement
 * Adds script tag for loading livereload
 *
 * @private
 * @param {string} content      - Original content
 * @param {string} platform
 * @returns {string} newContent - Updated content
 */

function _addLiveReloadElement(content, platform) {
  let newContent = content;
  const liveReloadPort = process.env.livereloadPort || 35729;
  const destination = process.env.destination;

  let liveReloadSrc = '';
  if (destination === 'browser') {
    liveReloadSrc = `http://localhost:${liveReloadPort}/livereload.js`;
  } else {
    liveReloadSrc = `http://${_getLocalIpAddress(platform)}:${liveReloadPort}/livereload.js`;
  }

  const scriptTag = `<script type="text/javascript" src="${liveReloadSrc}"></script>`;

  newContent = content.replace('</body>', `  ${scriptTag}\n  </body>`);
  return newContent;
}

/**
 * ## injectCspRule
 * Injects Content Security Policy tag with required rules
 *
 * @private
 * @param {string} content   - original content
 * @param {string} category  - category of rules
 * @param {string} cspRule   - Content Security Policy rules
 * @returns {string} content - updated content
 */

function _injectCspRule(content, category, cspRule) {
  let newContent = content;
  let scriptSrc;
  let newScriptSrc;
  const cspTag = _getXmlTagWithAttrValue(content, 'meta', 'http-equiv', 'Content-Security-Policy');

  if (!cspTag) {
    // CSP meta tag not found, do nothing
    return content;
  }
  let contentAttrValue = _getXmlAttrValue(cspTag, 'content');
  if (!contentAttrValue) {
    // no content attribute, do nothing
    return content;
  }
  const pattern = new RegExp(`${category}([^;]*)`, 'gi');
  const result = pattern.exec(contentAttrValue);
  if (result) {
    scriptSrc = result[0];
    newScriptSrc = `${scriptSrc} ${cspRule}`;
    contentAttrValue = contentAttrValue.replace(scriptSrc, newScriptSrc);
  } else {
    newScriptSrc = `; ${category} ${cspRule}`;
    contentAttrValue += newScriptSrc;
  }
  const newCspTag = _setXmlAttrValue(cspTag, 'content', contentAttrValue);
  newContent = content.replace(cspTag, newCspTag);

  return newContent;
}

/**
 * ## _updateCspGapReady
 * Updates Content Security Policy for livereload
 *
 * @private
 * @param {string} content      - Original content
 * @returns {string} newContent - Updated content
 */

function _updateCspGapReady(content) {
  let newContent = content;
  // Must have for iOS10
  newContent = _injectCspRule(newContent, 'connect-src', 'ws: *');
  newContent = _injectCspRule(newContent, 'default-src', 'gap://ready');
  return newContent;
}

/**
 * ## _updateCspForLiveReload
 * Updates Content Security Policy for livereload
 *
 * @private
 * @param {string} content      - Original content
 * @param {string} platform
 * @returns {string} newContent - Updated content
 */

function _updateCspForLiveReload(content, platform) {
  let newContent = content;
  const liveReloadPort = process.env.livereloadPort;
  const destination = process.env.destination;

  let liveReloadSrc = '';

  if (destination === 'browser') {
    liveReloadSrc = `http://localhost:${liveReloadPort}`;
  } else {
    liveReloadSrc = `http://${_getLocalIpAddress(platform)}:${liveReloadPort}`;
  }

  newContent = _injectCspRule(newContent, 'script-src', liveReloadSrc);

  return newContent;
}

/**
 * ## _getConfigXmlPath
 *
 * @private
 * @param {string} platform
 * @returns {string || null}
 */

function _getConfigXmlPath(platform) {
  let configXmlPath;

  if (platform === 'android') {
    configXmlPath = 'platforms/android/app/src/main/res/xml';
  } else if (platform === 'ios') {
    configXmlPath = `platforms/ios/${_getAppName()}`;
  } else if (platform === 'windows') {
    configXmlPath = 'platforms/windows';
  } else if (platform === 'browser') {
    configXmlPath = 'platforms/browser';
  } else {
    return null;
  }

  return path.resolve(configXmlPath, 'config.xml');
}

/**
 * ## _getAppName
 * Gets application name
 *
 * @private
 * @returns {string} name - Application name
 */

function _getAppName() {
  const configXml = path.resolve('config.xml');
  const document = fs.readFileSync(configXml, 'utf-8');
  const name = _getXmlNodeText(document, 'name');

  return name;
}

/**
 * ## _processConfigSrcAttribute
 * Adds src tag to config.xml
 *
 * @private
 * @param {string} document      - Original content
 * @returns {string} newDocument - Updated content
 */

function _processConfigSrcAttribute(document) {
  let newDocument = document;

  // need to update the config src for livereloading
  const platform = process.env.platform;
  const destination = process.env.destination;
  const serverPort = process.env.port;
  let newSrcValue = '';

  // due to how emulator/devices work; localhost does not point to your
  // laptop and etc but its internal one, need to use ip address
  if (destination === 'browser') {
    newSrcValue = `http://localhost:${serverPort}/browser/www/index.html`;
  } else {
    newSrcValue = `http://${_getLocalIpAddress(platform)}:${serverPort}/${platform}/www/index.html`;
  }

  const contentTag = _getXmlTag(document, 'content');
  const newContentTag = _setXmlAttrValue(contentTag, 'src', newSrcValue);

  newDocument = document.replace(contentTag, newContentTag);
  return newDocument;
}

/**
 * ## _addLoadUrlTimeoutPreference
 *
 * @private
 * @param {string} document      - Original content
 * @returns {string} newDocument - Updated content
 */

function _addLoadUrlTimeoutPreference(document) {
  let newDocument = document;
  let newPreferenceTag;
  let contentTag;
  const preferenceTag = _getXmlTagWithAttrValue(document, 'preference', 'name', LOAD_URL_TIMEOUT_VALUE);

  if (preferenceTag) {
    newPreferenceTag = _setXmlAttrValue(preferenceTag, 'value', '700000');
    newDocument = document.replace(preferenceTag, newPreferenceTag);
  } else {
    // loadUrlTimeoutValue preference tag does not exist yet,
    // append it after the content tag
    contentTag = _getXmlTag(document, 'content');
    if (contentTag) {
      newPreferenceTag = `${contentTag}\n    <preference name="${LOAD_URL_TIMEOUT_VALUE}" value="700000" />`;
      newDocument = document.replace(contentTag, newPreferenceTag);
    }
  }

  return newDocument;
}

/**
 * ## _addNavigationPermission
 *
 * @private
 * @param {string} document      - Original content
 * @returns {string} newDocument - Updated content
 */

function _addNavigationPermission(document) {
  // need to update the config src for livereloading
  let newDocument = document;
  const platform = process.env.platform;
  const contentTag = _getXmlTag(document, 'content');

  if (contentTag) {
    const newAllowTag = `${contentTag}\n    <allow-navigation href="http://${_getLocalIpAddress(platform)}/*" />`;
    newDocument = document.replace(contentTag, newAllowTag);
  }

  return newDocument;
}

/**
 * ## _isLiveReloadEnabled
 *
 * @private
 * @returns {boolean}
 */

function _isLiveReloadEnabled() {
  const liveReloadEnabled = process.env.livereload;
  return (liveReloadEnabled !== 'false' && liveReloadEnabled !== undefined);
}

/**
 * ## _getLocalIpAddress
 *
 * @private
 * @param {string} platform
 * @returns {string}        - IP address
 */

function _getLocalIpAddress(platform) {
  return (platform === 'android') ? ANDROID_LOCAL_IP_ADDRESS : LOCAL_IP_ADDRESS;
}

/**
 * ## _getXmlTag
 *
 * @private
 * @param {string} content
 * @param {string} tagName
 * @returns {string} tag
 */

function _getXmlTag(content, tagName) {
  let tag;
  const pattern = new RegExp(`<${tagName}([\\s\\S]*?)>`, 'gi');
  const result = pattern.exec(content);
  if (result) {
    tag = result[0];
  }

  return tag;
}

/**
 * ## _getXmlAttrValue
 *
 * @private
 * @param {string} tag         - Tag
 * @param {string} attr        - Attribute
 * @returns {string} attrValue - Attribute value
 */

function _getXmlAttrValue(tag, attr) {
  let attrValue;
  const pattern = new RegExp(`${attr}=["](.*?)["]`, 'gi');
  const result = pattern.exec(tag);
  if (result && result[1]) {
    attrValue = result[1];
  }

  return attrValue;
}

/**
 * ## _setXmlAttrValue
 *
 * @private
 * @param {string} tag
 * @param {string} attr
 * @param {string} value
 * @returns {string} newTag
 */

function _setXmlAttrValue(tag, attr, value) {
  let newTag;
  let newAttr;
  const pattern = new RegExp(`${attr}=["](.*?)["]`, 'gi');
  const result = pattern.exec(tag);
  if (result) {
    newAttr = result[0].replace(result[1], value);
    newTag = tag.replace(result[0], newAttr);
  } else {
    // add new attribute at the end, assume tag ends with '>'
    newTag = `${tag.substr(0, tag.length - 1)} ${attr}="${value}">`;
  }

  return newTag;
}

/**
 * ## _getXmlNodeText
 *
 * @private
 * @param {string} content
 * @param {string} tag
 * @returns {string} text
 */

function _getXmlNodeText(content, tag) {
  let text;
  const pattern = new RegExp(`<${tag}([\\s\\S]*?)>(.*?)<\\/${tag}>`, 'gi');
  const result = pattern.exec(content);
  if (result) {
    text = result[2];
  }

  return text;
}

/**
 * ## _getXmlTagWithAttrValue
 *
 * @private
 * @param {string} content
 * @param {string} tagName
 * @param {string} attr
 * @param {string} value
 * @returns {string || null} tag
 */

function _getXmlTagWithAttrValue(content, tagName, attr, value) {
  let tag;
  let attrValue;
  let result;
  const pattern = new RegExp(`<${tagName}([\\s\\S]*?)>`, 'gi');

  do {
    result = pattern.exec(content);
    if (result) {
      tag = result[0];
      attrValue = _getXmlAttrValue(tag, attr);
      if (attrValue && attrValue === value) {
        return tag;
      }
    }
  } while (result);

  return null;
}
