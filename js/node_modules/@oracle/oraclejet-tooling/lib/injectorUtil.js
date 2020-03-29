/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

module.exports = {
  getInjectorTagsRegExp: function _getInjectorTagsRegExp(starttag, endtag) {
    const start = _escapeForRegExp(starttag);
    const end = _escapeForRegExp(endtag);
    return new RegExp(`([\t ]*)(${start})((\\n|\\r|.)*?)(${end})`, 'gi');
  }
};

function _escapeForRegExp(str) {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}
