/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['ojs/ojcore', 'jquery', 'ojs/ojcontext', 'ojs/ojthemeutils', 'ojs/ojtimerutils', 'ojs/ojcomponentcore', 'ojs/ojlogger', 'ojs/ojeditablevalue', 'ojs/ojoptgroup', 'ojs/ojoption', 'promise', 'ojs/ojlistdataproviderview', 'ojs/ojtreedataproviderview'], 
function(oj, $, Context, ThemeUtils, TimerUtils, Components, Logger)
{
  "use strict";
var __oj_combobox_many_metadata = 
{
  "properties": {
    "asyncValidators": {
      "type": "Array<Object>",
      "value": []
    },
    "converter": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enumValues": [
            "datetime",
            "number"
          ]
        },
        "options": {
          "type": "object"
        }
      }
    },
    "describedBy": {
      "type": "string"
    },
    "disabled": {
      "type": "boolean",
      "value": false
    },
    "displayOptions": {
      "type": "object",
      "properties": {
        "converterHint": {
          "type": "Array<string>|string",
          "value": [
            "placeholder",
            "notewindow"
          ]
        },
        "helpInstruction": {
          "type": "Array<string>|string",
          "value": [
            "notewindow"
          ]
        },
        "messages": {
          "type": "Array<string>|string",
          "value": [
            "inline"
          ]
        },
        "validatorHint": {
          "type": "Array<string>|string",
          "value": [
            "notewindow"
          ]
        }
      }
    },
    "help": {
      "type": "object",
      "properties": {
        "instruction": {
          "type": "string",
          "value": ""
        }
      }
    },
    "helpHints": {
      "type": "object",
      "properties": {
        "definition": {
          "type": "string",
          "value": ""
        },
        "source": {
          "type": "string",
          "value": ""
        }
      }
    },
    "labelHint": {
      "type": "string",
      "value": ""
    },
    "labelledBy": {
      "type": "string"
    },
    "messagesCustom": {
      "type": "Array<Object>",
      "writeback": true,
      "value": []
    },
    "minLength": {
      "type": "number",
      "value": 0
    },
    "optionRenderer": {
      "type": "function"
    },
    "options": {
      "type": "Array<Object>|object"
    },
    "optionsKeys": {
      "type": "object",
      "properties": {
        "childKeys": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string"
            },
            "value": {
              "type": "string"
            },
            "children": {
              "type": "string"
            },
            "childKeys": {
              "type": "object",
              "properties": {
                "label": {
                  "type": "string"
                },
                "value": {
                  "type": "string"
                },
                "children": {
                  "type": "string"
                },
                "childKeys": {
                  "type": "object"
                }
              }
            }
          }
        },
        "children": {
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    },
    "pickerAttributes": {
      "type": "object",
      "properties": {
        "style": {
          "type": "string"
        },
        "class": {
          "type": "string"
        }
      }
    },
    "placeholder": {
      "type": "string"
    },
    "rawValue": {
      "type": "string",
      "writeback": true,
      "readOnly": true
    },
    "readonly": {
      "type": "boolean",
      "value": false
    },
    "required": {
      "type": "boolean",
      "value": false
    },
    "translations": {
      "type": "object",
      "value": {},
      "properties": {
        "filterFurther": {
          "type": "string"
        },
        "moreMatchesFound": {
          "type": "string"
        },
        "noMatchesFound": {
          "type": "string"
        },
        "oneMatchesFound": {
          "type": "string"
        },
        "required": {
          "type": "object",
          "properties": {
            "hint": {
              "type": "string"
            },
            "messageDetail": {
              "type": "string"
            },
            "messageSummary": {
              "type": "string"
            }
          }
        }
      }
    },
    "valid": {
      "type": "string",
      "writeback": true,
      "enumValues": [
        "invalidHidden",
        "invalidShown",
        "pending",
        "valid"
      ],
      "readOnly": true
    },
    "validators": {
      "type": "Array",
      "value": []
    },
    "value": {
      "type": "Array<any>",
      "writeback": true
    },
    "valueOptions": {
      "type": "Array<Object>",
      "writeback": true
    }
  },
  "methods": {
    "refresh": {},
    "validate": {},
    "reset": {},
    "showMessages": {},
    "setProperty": {},
    "getProperty": {},
    "setProperties": {},
    "getNodeBySubId": {},
    "getSubIdByNode": {}
  },
  "events": {
    "ojAnimateStart": {},
    "ojAnimateEnd": {}
  },
  "extension": {}
};
var __oj_combobox_one_metadata = 
{
  "properties": {
    "asyncValidators": {
      "type": "Array<Object>",
      "value": []
    },
    "converter": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enumValues": [
            "datetime",
            "number"
          ]
        },
        "options": {
          "type": "object"
        }
      }
    },
    "describedBy": {
      "type": "string"
    },
    "disabled": {
      "type": "boolean",
      "value": false
    },
    "displayOptions": {
      "type": "object",
      "properties": {
        "converterHint": {
          "type": "Array<string>|string",
          "value": [
            "placeholder",
            "notewindow"
          ]
        },
        "helpInstruction": {
          "type": "Array<string>|string",
          "value": [
            "notewindow"
          ]
        },
        "messages": {
          "type": "Array<string>|string",
          "value": [
            "inline"
          ]
        },
        "validatorHint": {
          "type": "Array<string>|string",
          "value": [
            "notewindow"
          ]
        }
      }
    },
    "filterOnOpen": {
      "type": "string",
      "enumValues": [
        "none",
        "rawValue"
      ],
      "value": "none"
    },
    "help": {
      "type": "object",
      "properties": {
        "instruction": {
          "type": "string",
          "value": ""
        }
      }
    },
    "helpHints": {
      "type": "object",
      "properties": {
        "definition": {
          "type": "string",
          "value": ""
        },
        "source": {
          "type": "string",
          "value": ""
        }
      }
    },
    "labelHint": {
      "type": "string",
      "value": ""
    },
    "labelledBy": {
      "type": "string"
    },
    "messagesCustom": {
      "type": "Array<Object>",
      "writeback": true,
      "value": []
    },
    "minLength": {
      "type": "number",
      "value": 0
    },
    "optionRenderer": {
      "type": "function"
    },
    "options": {
      "type": "Array<Object>|object"
    },
    "optionsKeys": {
      "type": "object",
      "properties": {
        "childKeys": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string"
            },
            "value": {
              "type": "string"
            },
            "children": {
              "type": "string"
            },
            "childKeys": {
              "type": "object",
              "properties": {
                "label": {
                  "type": "string"
                },
                "value": {
                  "type": "string"
                },
                "children": {
                  "type": "string"
                },
                "childKeys": {
                  "type": "object"
                }
              }
            }
          }
        },
        "children": {
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    },
    "pickerAttributes": {
      "type": "object",
      "properties": {
        "style": {
          "type": "string"
        },
        "class": {
          "type": "string"
        }
      }
    },
    "placeholder": {
      "type": "string"
    },
    "rawValue": {
      "type": "string",
      "writeback": true,
      "readOnly": true
    },
    "readonly": {
      "type": "boolean",
      "value": false
    },
    "required": {
      "type": "boolean",
      "value": false
    },
    "translations": {
      "type": "object",
      "value": {},
      "properties": {
        "filterFurther": {
          "type": "string"
        },
        "moreMatchesFound": {
          "type": "string"
        },
        "noMatchesFound": {
          "type": "string"
        },
        "oneMatchesFound": {
          "type": "string"
        },
        "required": {
          "type": "object",
          "properties": {
            "hint": {
              "type": "string"
            },
            "messageDetail": {
              "type": "string"
            },
            "messageSummary": {
              "type": "string"
            }
          }
        }
      }
    },
    "valid": {
      "type": "string",
      "writeback": true,
      "enumValues": [
        "invalidHidden",
        "invalidShown",
        "pending",
        "valid"
      ],
      "readOnly": true
    },
    "validators": {
      "type": "Array",
      "value": []
    },
    "value": {
      "type": "any",
      "writeback": true
    },
    "valueOption": {
      "type": "object",
      "writeback": true,
      "properties": {
        "value": {
          "type": "any"
        },
        "label": {
          "type": "string"
        }
      }
    }
  },
  "methods": {
    "refresh": {},
    "validate": {},
    "reset": {},
    "showMessages": {},
    "setProperty": {},
    "getProperty": {},
    "setProperties": {},
    "getNodeBySubId": {},
    "getSubIdByNode": {}
  },
  "events": {
    "ojValueUpdated": {},
    "ojAnimateStart": {},
    "ojAnimateEnd": {}
  },
  "extension": {}
};
var __oj_select_many_metadata = 
{
  "properties": {
    "describedBy": {
      "type": "string"
    },
    "disabled": {
      "type": "boolean",
      "value": false
    },
    "displayOptions": {
      "type": "object",
      "properties": {
        "converterHint": {
          "type": "Array<string>|string",
          "value": [
            "placeholder",
            "notewindow"
          ]
        },
        "helpInstruction": {
          "type": "Array<string>|string",
          "value": [
            "notewindow"
          ]
        },
        "messages": {
          "type": "Array<string>|string",
          "value": [
            "inline"
          ]
        },
        "validatorHint": {
          "type": "Array<string>|string",
          "value": [
            "notewindow"
          ]
        }
      }
    },
    "help": {
      "type": "object",
      "properties": {
        "instruction": {
          "type": "string",
          "value": ""
        }
      }
    },
    "helpHints": {
      "type": "object",
      "properties": {
        "definition": {
          "type": "string",
          "value": ""
        },
        "source": {
          "type": "string",
          "value": ""
        }
      }
    },
    "labelHint": {
      "type": "string",
      "value": ""
    },
    "labelledBy": {
      "type": "string"
    },
    "messagesCustom": {
      "type": "Array<Object>",
      "writeback": true,
      "value": []
    },
    "minimumResultsForSearch": {
      "type": "number",
      "value": 15
    },
    "optionRenderer": {
      "type": "function"
    },
    "options": {
      "type": "Array<Object>|object"
    },
    "optionsKeys": {
      "type": "object",
      "properties": {
        "childKeys": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string"
            },
            "value": {
              "type": "string"
            },
            "children": {
              "type": "string"
            },
            "childKeys": {
              "type": "object"
            }
          }
        },
        "children": {
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    },
    "pickerAttributes": {
      "type": "object",
      "properties": {
        "style": {
          "type": "string"
        },
        "class": {
          "type": "string"
        }
      }
    },
    "placeholder": {
      "type": "string"
    },
    "readonly": {
      "type": "boolean",
      "value": false
    },
    "renderMode": {
      "type": "string",
      "enumValues": [
        "jet",
        "native"
      ]
    },
    "required": {
      "type": "boolean",
      "value": false
    },
    "translations": {
      "type": "object",
      "value": {},
      "properties": {
        "filterFurther": {
          "type": "string"
        },
        "moreMatchesFound": {
          "type": "string"
        },
        "noMatchesFound": {
          "type": "string"
        },
        "oneMatchesFound": {
          "type": "string"
        },
        "required": {
          "type": "object",
          "properties": {
            "hint": {
              "type": "string"
            },
            "messageDetail": {
              "type": "string"
            },
            "messageSummary": {
              "type": "string"
            }
          }
        },
        "searchField": {
          "type": "string"
        }
      }
    },
    "valid": {
      "type": "string",
      "writeback": true,
      "enumValues": [
        "invalidHidden",
        "invalidShown",
        "pending",
        "valid"
      ],
      "readOnly": true
    },
    "value": {
      "type": "Array<any>",
      "writeback": true
    },
    "valueOptions": {
      "type": "Array<Object>",
      "writeback": true
    }
  },
  "methods": {
    "refresh": {},
    "validate": {},
    "reset": {},
    "showMessages": {},
    "setProperty": {},
    "getProperty": {},
    "setProperties": {},
    "getNodeBySubId": {},
    "getSubIdByNode": {}
  },
  "events": {
    "ojAnimateStart": {},
    "ojAnimateEnd": {}
  },
  "extension": {}
};
var __oj_select_one_metadata = 
{
  "properties": {
    "describedBy": {
      "type": "string"
    },
    "disabled": {
      "type": "boolean",
      "value": false
    },
    "displayOptions": {
      "type": "object",
      "properties": {
        "converterHint": {
          "type": "Array<string>|string",
          "value": [
            "placeholder",
            "notewindow"
          ]
        },
        "helpInstruction": {
          "type": "Array<string>|string",
          "value": [
            "notewindow"
          ]
        },
        "messages": {
          "type": "Array<string>|string",
          "value": [
            "inline"
          ]
        },
        "validatorHint": {
          "type": "Array<string>|string",
          "value": [
            "notewindow"
          ]
        }
      }
    },
    "help": {
      "type": "object",
      "properties": {
        "instruction": {
          "type": "string",
          "value": ""
        }
      }
    },
    "helpHints": {
      "type": "object",
      "properties": {
        "definition": {
          "type": "string",
          "value": ""
        },
        "source": {
          "type": "string",
          "value": ""
        }
      }
    },
    "labelHint": {
      "type": "string",
      "value": ""
    },
    "labelledBy": {
      "type": "string"
    },
    "messagesCustom": {
      "type": "Array<Object>",
      "writeback": true,
      "value": []
    },
    "minimumResultsForSearch": {
      "type": "number",
      "value": 15
    },
    "optionRenderer": {
      "type": "function"
    },
    "options": {
      "type": "Array<Object>|object"
    },
    "optionsKeys": {
      "type": "object",
      "properties": {
        "childKeys": {
          "type": "object",
          "properties": {
            "label": {
              "type": "string"
            },
            "value": {
              "type": "string"
            },
            "children": {
              "type": "string"
            },
            "childKeys": {
              "type": "object"
            }
          }
        },
        "children": {
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "value": {
          "type": "string"
        }
      }
    },
    "pickerAttributes": {
      "type": "object",
      "properties": {
        "style": {
          "type": "string"
        },
        "class": {
          "type": "string"
        }
      }
    },
    "placeholder": {
      "type": "string"
    },
    "readonly": {
      "type": "boolean",
      "value": false
    },
    "renderMode": {
      "type": "string",
      "enumValues": [
        "jet",
        "native"
      ]
    },
    "required": {
      "type": "boolean",
      "value": false
    },
    "translations": {
      "type": "object",
      "value": {},
      "properties": {
        "filterFurther": {
          "type": "string"
        },
        "moreMatchesFound": {
          "type": "string"
        },
        "noMatchesFound": {
          "type": "string"
        },
        "oneMatchesFound": {
          "type": "string"
        },
        "required": {
          "type": "object",
          "properties": {
            "hint": {
              "type": "string"
            },
            "messageDetail": {
              "type": "string"
            },
            "messageSummary": {
              "type": "string"
            }
          }
        },
        "searchField": {
          "type": "string"
        }
      }
    },
    "valid": {
      "type": "string",
      "writeback": true,
      "enumValues": [
        "invalidHidden",
        "invalidShown",
        "pending",
        "valid"
      ],
      "readOnly": true
    },
    "value": {
      "type": "any",
      "writeback": true
    },
    "valueOption": {
      "type": "object",
      "writeback": true,
      "properties": {
        "value": {
          "type": "any"
        },
        "label": {
          "type": "string"
        }
      }
    }
  },
  "methods": {
    "refresh": {},
    "validate": {},
    "reset": {},
    "showMessages": {},
    "setProperty": {},
    "getProperty": {},
    "setProperties": {},
    "getNodeBySubId": {},
    "getSubIdByNode": {}
  },
  "events": {
    "ojAnimateStart": {},
    "ojAnimateEnd": {}
  },
  "extension": {}
};
/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * @preserve Copyright 2012 Igor Vaynberg
 *
 * This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
 * General Public License version 2 (the "GPL License"). You may choose either license to govern your
 * use of this software only upon the condition that you accept all of the terms of either the Apache
 * License or the GPL License.
 *
 * You may obtain a copy of the Apache License and the GPL License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
 * the specific language governing permissions and limitations under the Apache License and the GPL License.
 */

/* global Promise:false, Symbol:false, TimerUtils:false, Context:false */

/**
 * @private
 */
  var _ComboUtils = {
    // native renderMode: marker class for generated options list
    GENERATED_OPTIONS_SELECTOR: 'oj-select-options-generated',

    KEY:
    {
      TAB: 9,
      ENTER: 13,
      ESC: 27,
      SPACE: 32,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      SHIFT: 16,
      CTRL: 17,
      ALT: 18,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      HOME: 36,
      END: 35,
      BACKSPACE: 8,
      DELETE: 46,

      isControl: function (e) {
        var k = e.which;
        switch (k) {
          case _ComboUtils.KEY.SHIFT:
          case _ComboUtils.KEY.CTRL:
          case _ComboUtils.KEY.ALT:
            return true;
          default:
            if (e.metaKey) {
              return true;
            }
            return false;
        }
      },

      isFunctionKey: function (k) {
        var key = k.which ? k.which : k;
        return key >= 112 && key <= 123;
      }
    },

    /*
     * The default fetch size from the data provider
     */
    DEFAULT_FETCH_SIZE: 15,

    /*
     * The fetch size from the data provider for local filtering
     */
    FILTERING_FETCH_SIZE: 100,

    /*
     * The default delay in milliseconds between when a keystroke occurs
     * and when a search is performed to get the filtered options.
     */
    DEFAULT_QUERY_DELAY: 70,

    ValueChangeTriggerTypes:
    {
      ENTER_PRESSED: 'enter_pressed',
      OPTION_SELECTED: 'option_selected',
      BLUR: 'blur',
      SEARCH_ICON_CLICKED: 'search_icon_clicked'
    },

    lastMousePosition: { x: 0, y: 0 },
    nextUid: (function () {
      var counter = 1;
      return function () {
        var ret = counter;
        counter += 1;
        return ret;
      };
    }()),

    // TODO:
    scrollBarDimensions: null,

    // _ComboUtils
    /*
     * 4-10 times faster .each replacement
     * it overrides jQuery context of element on each iteration
     */
    each2: function (list, c) {
      var j = $.isFunction(list[0]) ? $(list[0]()) : $(list[0]);
      var i = -1;
      var l = list.length;
      while ( // eslint-disable-line
        ++i < l // eslint-disable-line
          && (j.context = j[0] = ($.isFunction(list[0]) ? list[i]() : list[i])) // eslint-disable-line
          && c.call(j[0], i, j) !== false // i=index, j=jQuery object
      ) {} // eslint-disable-line
      return list;
    },

    // _ComboUtils
    measureScrollbar: function () {
      var $template = $("<div class='oj-listbox-measure-scrollbar'></div>");
      $template.appendTo('body'); // @HTMLUpdateOK
      var dim =
        {
          width: $template.width() - $template[0].clientWidth,
          height: $template.height() - $template[0].clientHeight
        };
      $template.remove();
      return dim;
    },

    // _ComboUtils
    /*
     * Splits the string into an array of values, trimming each value.
     * An empty array is returned for nulls or empty
     */
    splitVal: function (string, separator) {
      var val;
      var i;
      var l;
      if (string === null || string.length < 1) {
        return [];
      }
      val = string.split(separator);
      for (i = 0, l = val.length; i < l; i++) {
        val[i] = $.trim(val[i]);
      }
      return val;
    },

    // _ComboUtils
    getSideBorderPadding: function (element) {
      return element.outerWidth(false) - element.width();
    },

    // _ComboUtils
    installKeyUpChangeEvent: function (element) {
      var key = 'keyup-change-value';
      element.on('keydown', function () {
        if ($.data(element, key) === undefined) {
          $.data(element, key, element.val());
        }
      });

      element.on('keyup', function (e) {
        if (e.which === _ComboUtils.KEY.ENTER) {
            //  - select and combobox stop keyboard event propegation
          e.preventDefault();
          return;
        }
        var val = $.data(element, key);
        if (val !== undefined && element.val() !== val) {
          $.removeData(element, key);
          element.trigger('keyup-change');
        }
      });
    },

    // _ComboUtils
    getSearchText: function (event) {
      var searchText;
      //  - start typing 1 letter on select box, but 2 letters displayed on searchbox
      // In case of chrome/IE, typed key is added on search element as we move focus from select element to search
      // But this is not happening on firefox and hence we need to set it as part of select element's event
      // and kill the event to avoid duplicate charecters on search field later in IE/chrome.
      // Dropdown popup will be opened on up/down/left/right arrows so excluding those as search text.

      var keycode = event.which || event.keyCode;
      if (event && event.type === 'keydown' &&
          (keycode === 32 || // spacebar
           (keycode > 47 && keycode < 58) || // number keys
           (keycode > 64 && keycode < 91) || // letter keys
           (keycode > 95 && keycode < 112) || // numpad keys
           (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
           (keycode > 218 && keycode < 223))) { // [\]' (in order)
        // Numpad keys return different keyCodes for the numbers
        // String.fromCharCode would return 'a' for '1' and so forth
        // Need to convert those keyCodes to regular number keyCodes
        if (keycode >= 96 && keycode <= 105) {
          keycode -= 48;
        }

        searchText = String.fromCharCode(keycode);
        // keydown event always return uppercase letter
        if (!event.shiftKey) {
          searchText = searchText.toLowerCase();
        }
        //  - select and combobox stop keyboard event propegation
        event.preventDefault();
      }
      return searchText;
    },

    // _ComboUtils
    /*
     * filters mouse events so an event is fired only if the mouse moved.
     *
     * filters out mouse events that occur when mouse is stationary but
     * the elements under the pointer are scrolled.
     */
    installFilteredMouseMove: function (element) {
      element.on('mousemove', function (e) {
        var lastpos = _ComboUtils.lastMousePosition;
        if (lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) {
          $(e.target).trigger('mousemove-filtered', e);
          _ComboUtils.lastMousePosition.x = e.pageX;
          _ComboUtils.lastMousePosition.y = e.pageY;
        }
      });
    },

    // _ComboUtils
    thunk: function (formula) {
      var evaluated = false;
      var value;
      return function () {
        if (evaluated === false) {
          value = formula();
          evaluated = true;
        }
        return value;
      };
    },

    // _ComboUtils
    _focus: function (widget, $el) {
      if ($el[0] === document.activeElement) {
        return;
      }

      // add busy state
      var resolveBusyState = _ComboUtils._addBusyState(widget.container, 'setting focus');

      /* set the focus in a timeout - that way the focus is set after the processing
         of the current event has finished - which seems like the only reliable way
         to set focus */
      var timer = TimerUtils.getTimer(40);
      timer.getPromise().then(function () {
        var el = $el[0];
        var pos = $el.val().length;
        var range;
        $el.focus();

          /* make sure el received focus so we do not error out when trying to manipulate the caret.
             sometimes modals or others listeners may steal it after its set */
        if ($el.is(':visible') && el === document.activeElement) {
            /* after the focus is set move the caret to the end, necessary when we val()
               just before setting focus */
          if (el.setSelectionRange) {
            el.setSelectionRange(pos, pos);
          } else if (el.createTextRange) {
            range = el.createTextRange();
            range.collapse(false);
            range.select();
          }
        }

        resolveBusyState();
        // Set a 40 timeout. In voiceover mode, previous partial value was read. See 
        // This happens on ios Safari only, not Chrome. Setting a 40 timeout fixes the issue
        // on Safari in voiceover.
      });
    },

    // _ComboUtils
    getCursorInfo: function (_el) {
      var el = $(_el)[0];
      var offset = 0;
      var length = 0;
      if ('selectionStart' in el) {
        offset = el.selectionStart;
        length = el.selectionEnd - offset;
      } else if ('selection' in document) {
        el.focus(); // Fixed???
        var sel = document.selection.createRange();
        length = document.selection.createRange().text.length;
        sel.moveStart('character', -el.value.length);
        offset = sel.text.length - length;
      }
      return { offset: offset, length: length };
    },

    // _ComboUtils
    killEvent: function (event) {
      event.preventDefault();
    },

    // _ComboUtils
    /*
     * Produces a query function that works with a local array
     */
    local: function (options, optKeys) {
      var data = options; // data elements
      var dataText;
      var tmp;
          // function used to retrieve the text portion of a data item that is matched against the search
      var text = function (item) {
        return '' + item.label;
      };

      if ($.isArray(data)) {
        tmp = data;
        data =
        {
          results: tmp
        };
      }
      if ($.isFunction(data) === false) {
        tmp = data;
        data = function () {
          return tmp;
        };
      }
      var dataItem = data();
      // select with no options
      if (dataItem && dataItem.text) {
        text = dataItem.text;
        // if text is not a function we assume it to be a key name
        if (!$.isFunction(text)) {
          // we need to store this in a separate variable because in the next step data gets reset
          // and data.text is no longer available
          dataText = dataItem.text;
          text = function (item) {
            return item[dataText];
          };
        }
      }
      return function (query) {
        var t = query.term;
        var filtered = {
          results: []
        };

        // if optionsKeys is set, we need to do the key mapping, don't return
        if (t === '' && !optKeys) {
          query.callback(data());
          return;
        }

        if (data()) {
          _ComboUtils.each2($(data().results), function (i, datum) {
            _ComboUtils._processData(query, datum, filtered.results,
                  optKeys, true, text);
          });
        }
        query.callback(filtered);
      };
    },

    // native renderMode
    createOptionTag: function (depth, value, label, formatFunc) {
      var node = $('<option>');
      node.addClass('oj-listbox-result oj-listbox-result-selectable oj-listbox-results-depth-' + depth);

      // option label
      node.attr('role', 'option');
      node.attr('id', 'oj-listbox-result-label-' + _ComboUtils.nextUid());

      node.text(formatFunc(label));
      node.attr('value', value);

      return node;
    },

    // native renderMode
    createOptgroupTag: function (container, label, formatFunc) {
      var node = $('<optgroup>');
      node.addClass('oj-listbox-results-sub');
      node.attr('label', formatFunc(label));

      container.addClass('oj-listbox-result-with-children');
      return node;
    },

    // native renderMode
    // This method turns a list of <ul>s and <li>s into <optgroup>s and <option>s
    listPopulateResults: function (_container, _list, formatFunc) {
      var populate = function (container, list, depth) {
        var node;
        var li;
        var label;
        var ul;

        list.each(function () {
          li = $(this);

          if (li.is('li')) {
            // process <li> with children
            if (li.children('ul').length > 0) {
              // get the <li> text only dont include its descendants
              label = li.contents().filter(
                function () {
                  return this.nodeType !== 1 || this.tagName.toLowerCase() !== 'ul';
                })
                .text();

              node = _ComboUtils.createOptgroupTag(container, label, formatFunc);

              ul = li.children('ul');
              populate(node, ul.children(), depth + 1);
            } else {
              // process <li> without children
              node = _ComboUtils.createOptionTag(depth, li.attr('oj-data-value'), li.text(), formatFunc);
            }
            node.appendTo(container); // @HTMLUpdateOK
          }
        });
      };

      populate(_container, _list, 0);
    },

    // native renderMode
    // This method turns <oj-optgroup>s and <oj-option>s into <optgroup>s and <option>s
    ojOptionPopulateResults: function (_container, _ojOptions, formatFunc) {
      var populate = function (container, ojOptions, depth) {
        var node;
        var ojOption;
        var label;

        ojOptions.each(function () {
          ojOption = $(this);

          if (ojOption.is('oj-option')) {
            label = ojOption.text() || ojOption.attr('label');
            node = _ComboUtils.createOptionTag(depth, ojOption.prop('value'), label, formatFunc);
          } else if (ojOption.is('oj-optgroup')) {
            label = ojOption.text() || ojOption.attr('label');
            node = _ComboUtils.createOptgroupTag(container, label, formatFunc);
            populate(node, ojOption.children(), depth + 1);
          } else if (ojOption.is('option')) {
            // the option element created for the placeholder in native mode
            node = ojOption;
          }
          node.appendTo(container); // @HTMLUpdateOK
        });
      };

      populate(_container, _ojOptions, 0);
    },

    // native renderMode
    lookupOptionKeys: function (result, optionsKeys, _key) {
      var key = optionsKeys[_key] || _key;
      return result[key];
    },

    // native renderMode
    // This method turns a JSON object into <optgroup>s and <option>s
    arrayPopulateResults: function (_container, _arrlist, formatFunc, _optionsKeys) {
      var populate = function (container, arrlist, depth, optionsKeys) {
        var item;
        var node;
        var children;
        var label;
        var value;
        for (var i = 0, l = arrlist.length; i < l; i++) {
          item = arrlist[i];

          // process children
          children = _ComboUtils.lookupOptionKeys(item, optionsKeys, 'children');
          label = _ComboUtils.lookupOptionKeys(item, optionsKeys, 'label');

          if (children && children.length > 0) {
            node = _ComboUtils.createOptgroupTag(container, label, formatFunc);
            populate(node, children, depth + 1, optionsKeys.childKeys || {});
          } else {
            // without children
            value = _ComboUtils.lookupOptionKeys(item, optionsKeys, 'value');
            node = _ComboUtils.createOptionTag(depth, value, label, formatFunc);
          }

          node.appendTo(container); // @HTMLUpdateOK
        }
      };

      populate(_container, _arrlist, 0, _optionsKeys || {});
    },

    // native renderMode
    cleanupResults: function (container) {
      container.children().not('oj-option, oj-optgroup').remove();
      container.removeClass('oj-listbox-result-with-children');
    },

    // _ComboUtils
    _addBusyState: function (element, description) {
      var desc = "The component identified by '" + element.attr('id') + "' " + description;
      var busyStateOptions = { description: desc };
      var busyContext = Context.getContext(element[0]).getBusyContext();

      return busyContext.addBusyState(busyStateOptions);
    },

    _clearBusyState: function (resolveFunc) {
      if (resolveFunc) {
        resolveFunc();
      }
    },

    isDataProvider: function (data) {
      return (data && oj.DataProviderFeatureChecker) ?
        oj.DataProviderFeatureChecker.isDataProvider(data) : false;
    },

    isTreeDataProvider: function (data) {
      return (data && oj.DataProviderFeatureChecker) ?
        oj.DataProviderFeatureChecker.isTreeDataProvider(data) : false;
    },

    getDataProvider: function (options) {
      if (options) {
        var dataProvider = options._dataProvider || options.options;
        if (_ComboUtils.isDataProvider(dataProvider)) {
          return dataProvider;
        }
      }
      return null;
    },

    clearDataProviderWrapper: function (widget) {
      // eslint-disable-next-line no-param-reassign
      widget.options._dataProvider = null;
    },

    //  - need to be able to specify the initial value of select components bound to dprv
    // traversal using depth first search
    // return an oj.Option object if found otherwise return null
    _findOption: function (ojOption, value) {
      if (ojOption.children) {
        var result = _ComboUtils._findOption(ojOption.children, value);
        if (result) {
          return result;
        }
      } else if (oj.Object.compareValues(value, ojOption.value)) {
        return ojOption;
      }
      // not found
      return null;
    },

    findOption: function (arOpts, value) {
      //  - create selectone with a valueoption and a value of object datatype doesn't work
      // need to check if arOpts is an array
      if (Array.isArray(arOpts)) {
        for (var i = 0, len = arOpts.length; i < len; i++) {
          var result = _ComboUtils._findOption(arOpts[i], value);
          if (result) {
            return result;
          }
        }
        // not found
        return null;
      }
      return _ComboUtils._findOption(arOpts, value);
    },

    findOptions: function (ojOptgroup, values) {
      var ojOptionArr = [];
      for (var i = 0; i < values.length; i++) {
        var option = _ComboUtils.findOption(ojOptgroup, values[i]);
        if (option) {
          ojOptionArr.push(option);
        }
      }

      return ojOptionArr;
    },

    //  - oj.tests.input.combobox.testcombobox display value mismatch automation failure
    findOptionFromResult: function (context, val, data) {
      var queryResult = _ComboUtils.getLastQueryResult(context);
      var match;
      if (queryResult) {
        match = _ComboUtils.findOption(queryResult, val);
      }
      if (match) {
        return { value: val, label: match.label };
      }
      return data;
    },

    // merge value and valueOption, value wins if both are specified
    // return true if the value is specified and it's not contained in valueOptions
    mergeValueAndValueOptions: function (ojContext) {
      var value = ojContext.options.value;
      var resolveLater = false;

      // multiple
      if (ojContext.multiple) {
        var valueOptions = ojContext.options.valueOptions;
        // value specified
        if (value && value.length > 0) {
          // both value and valueOptions specified, find the option for the value
          var ojoptionArr;
          if (valueOptions && valueOptions.length) {
            ojoptionArr = _ComboUtils.findOptions(valueOptions, value);
          }
          // update valueOptions if more than one
          if (!ojoptionArr || ojoptionArr.length !== valueOptions.length) {
            // need to find out the label and setValueOptions later
            resolveLater = true;
          }
        } else if (valueOptions) {
          // value not specified
          _ComboUtils.syncValueWithValueOptions(ojContext, valueOptions, value, null);
        }
      } else {
        // single
        var valueOption = ojContext.options.valueOption;
        // value specified
        if (value !== null && value !== undefined) {
          // both value and valueOption specified, find the option for the value
          var ojoption;
          if (valueOption) {
            ojoption = _ComboUtils.findOption(valueOption, value);
          }
          // update valueOption
          if (!ojoption) {
            // need to find out the label and setValueOption later
            resolveLater = true;
          }
        } else if (valueOption) {
          // value not specified
          _ComboUtils.syncValueWithValueOption(ojContext, valueOption, value, null);
        }
      }

      return resolveLater;
    },

    // single selection: keep value in sync with valueOption
    // param nativeRender can be either null or boolean
    // null: don't update display label
    // true: update display label in native mode
    // false: update display label in jet mode
    syncValueWithValueOption: function (ojContext, valueOption, value, nativeRender) {
      var newVal;
      var updateLabel = true;
      //  - resetting value when value-option and placeholder are set throws exception
      if (_ComboUtils.isValueOptionsForPlaceholder(false, valueOption)) {
        if (_ComboUtils.isValueForPlaceholder(false, value)) {
          newVal = value;
          updateLabel = false;
        } else {
          newVal = null;
        }
      } else {
        newVal = valueOption ? valueOption.value : null;
      }
      if (oj.Object.compareValues(newVal, value)) {
        //  - lov does not show the value-option label when it's updated later
        // if the value is the same, we still need to update display label
        if (nativeRender === true) {
          var selElem = ojContext.element[0];
          $(selElem.options[selElem.selectedIndex]).text(_ComboUtils.getLabel(valueOption));
        } else if (nativeRender === false) {
          var context = ojContext.select || ojContext.combobox;
          if (context && updateLabel) {
            context._updateSelection(valueOption);
          }
        }
      } else {
        _ComboUtils._forceSetValue(ojContext, newVal);
      }
    },

    // multiple selection: keep value in sync with valueOptions
    // param nativeRender can be either null or boolean
    // null: don't update display label
    // true: update display label in native mode
    // false: update display label in jet mode
    syncValueWithValueOptions: function (ojContext, valueOptions, value, nativeRender) {
      var newVal;
      var updateLabel = true;
      if (_ComboUtils.isValueOptionsForPlaceholder(true, valueOptions)) {
        if (_ComboUtils.isValueForPlaceholder(true, value)) {
          newVal = value;
          updateLabel = false;
        } else {
          newVal = _ComboUtils.getValueForPlaceholder(true);
        }
        if (!oj.Object.compareValues(newVal, value)) {
          _ComboUtils._forceSetValue(ojContext, newVal);
        }
      } else if (valueOptions) {
        newVal = [];
        for (var i = 0; i < valueOptions.length; i++) {
          newVal.push(valueOptions[i].value);
        }

        if (oj.Object.compareValues(newVal, value)) {
          //  - lov does not show the value-option label when it's updated later
          // if the value is the same, we still need to update display label
          if (nativeRender === true) {
            var s = 0;
            ojContext.element.find('option').each(function () {
              if (this.selected) {
                var label = _ComboUtils.getLabel(valueOptions[s]);
                // eslint-disable-next-line eqeqeq
                if (this.text != label) {
                  $(this).text(label);
                }
                s += 1;
              }
            });
          } else if (nativeRender === false) {
            var context = ojContext.select || ojContext.combobox;
            if (context && updateLabel) {
              context._updateSelection(valueOptions);
            }
          }
        } else {
          _ComboUtils._forceSetValue(ojContext, newVal);
        }
      }
    },

    // _ComboUtils
    // Internally set the value option, skipping validation and the check for different value
    _forceSetValue: function (_ojContext, newVal) {
      var ojContext = _ojContext;
      var flags = { doValueChangeCheck: false,
        _context: { internalSet: true, writeback: true } };

      // FIX  - VALUE UNCHANGED IN DISABLED SELECT WHEN CHANGING BOUND VALUEOPTION
      // _SetValue always performs validation, which calls _CanSetValue, which returns false if
      // the component is disabled, thereby disallowing the set.  We override _CanSetValue on the
      // component in order to force it to return true in this case.
      ojContext.forceCanSetValue = true;
      try {
        ojContext._SetValue(newVal, null, flags);
      } finally {
        delete ojContext.forceCanSetValue;
      }
    },

    // whether placeholder is specified
    isPlaceholderSpecified: function (options) {
      return typeof options.placeholder === 'string';
    },

    //  - resetting value when value-option and placeholder are set throws exception
    getFixupValueOptionsForPlaceholder: function (multiple) {
      return multiple ? [] : { value: null, label: null };
    },

    // if placeholder is specified, in addition to the normalized valueOptions format
    // (multiple: [], single: {value: null, label: null}, the valueOption(s) recognized in
    // this method also can be used in init or set
    // multiple: null, undefiend and []
    // single: null, undefined, {}, {value:null} and {value: null, label: null}
    isValueOptionsForPlaceholder: function (multiple, valOpts) {
      return (valOpts == null) || (!multiple && valOpts.value == null) ||
        oj.Object.compareValues(valOpts, _ComboUtils.getFixupValueOptionsForPlaceholder(multiple));
    },

    // return normalized valueOption(s) if placeholder is selected
    // otherwise return @parm valOpts
    getValueOptionsForPlaceholder: function (ojContext, valOpts) {
      var multiple = ojContext.multiple;
      if (ojContext._IsCustomElement() && _ComboUtils.isPlaceholderSpecified(ojContext.options) &&
          _ComboUtils.isValueOptionsForPlaceholder(multiple, valOpts)) {
        // eslint-disable-next-line no-param-reassign
        valOpts = _ComboUtils.getFixupValueOptionsForPlaceholder(multiple);
      }
      return valOpts;
    },

    getValueForPlaceholder: function (multiple) {
      return multiple ? [] : '';
    },

    isValueForPlaceholder: function (multiple, value) {
      return (value == null) || oj.Object.compareValues(value,
             _ComboUtils.getValueForPlaceholder(multiple));
    },

    //  - need to be able to specify the initial value of select components bound to dprv
    setValueOptions: function (ojContext, valueOptions) {
      var context = {
        internalSet: true,
        changed: true,
        writeback: true
      };
      var opts;
      if (ojContext.combobox && ojContext.combobox.opts) {
        opts = ojContext.combobox.opts;
      } else if (ojContext.select && ojContext.select.opts) {
        opts = ojContext.select.opts;
      }

      var newValueOptions;
      if (ojContext.multiple) {
        if (valueOptions && valueOptions.length) {
          newValueOptions = [];
          for (var i = 0; i < valueOptions.length; i++) {
            newValueOptions.push({ value: valueOptions[i].value,
              label: valueOptions[i].label });
          }
        } else {
          newValueOptions = valueOptions;
        }
        ojContext.option('valueOptions', newValueOptions, { _context: context });

        //  - placeholder is not displayed after removing selections from select many
        // update internal valueOptions
        if (opts) {
          opts.valueOptions = newValueOptions;
        }
      } else {
        var valopt = valueOptions;
        if (Array.isArray(valueOptions)) {
          valopt = valueOptions[0];
        }

        //  - resetting value when value-option and placeholder are set throws exception
        if (valopt && !_ComboUtils.isValueOptionsForPlaceholder(ojContext.multiple, valopt)) {
          newValueOptions = { value: valopt.value, label: valopt.label };
          ojContext.option('valueOption',
                           { value: valopt.value, label: valopt.label },
                           { _context: context });
        } else {
          newValueOptions = valopt;
        }
        ojContext.option('valueOption', newValueOptions, { _context: context });

        //  - placeholder is not displayed after removing selections from select many
        // update internal valueOption
        if (opts) {
          opts.valueOption = newValueOptions;
        }
      }
    },

    // update display label(s) and valueOption(s) after value was set
    updateValueOptions: function (context) {
      //  - qunit: failure across browsers in select tests
      if (!context) {
        return;
      }

      var element = context.datalist ? context.datalist : context.opts.element;
      context.opts.initSelection.call(null, element, function (_selected) {
        var multiple = context.ojContext.multiple;
        var selected = _selected;

        // in combobox, values may be new entries
        if (selected === undefined && context._classNm === 'oj-combobox') {
          var value = context.ojContext.options.value;
          if (multiple) {
            selected = [];
            for (var i = 0; i < value.length; i++) {
              selected.push(context.opts.manageNewEntry(value[i]));
            }
          } else {
            selected = context.opts.manageNewEntry(value);
          }
        }
        if (selected) {
          context.setValOpts(selected);
          if (multiple) {
            context._updateSelection(selected);
          } else {
            context._updateSelectedOption(selected);
          }
        }
      });
    },

    /*  - need to be able to specify the initial value of select components bound to dprv
     * If both dataProvider and valueOption[s] are specified, use valueOption[s[ for display values.
     * If valueOption[s] is not specified or a selected value is missing then we will fetch the real data
     * from the dataProvider like before.
     * return true if valueOption[s] is applied, false otherwise
     */
    applyValueOptions: function (context, options) {
      if (context && !context.ojContext._resolveValueOptionsLater &&
          (context._classNm === 'oj-combobox' || context._classNm === 'oj-select')) {
        var isMultiple = context.ojContext.multiple;
        var valueOptions = isMultiple ? options.valueOptions : options.valueOption;

        //  - resetting value when value-option and placeholder are set throws exception
        //  - placeholder is not displayed after removing selections from select many
        if (_ComboUtils.isValueOptionsForPlaceholder(isMultiple, valueOptions)) {
          return false;
        }
        if (valueOptions) {
          context._updateSelection(valueOptions);
          return true;
        }
      }
      return false;
    },

    isValueChanged: function (widget) {
      return widget._valueHasChanged;
    },

    setValueChanged: function (widget, val) {
      // eslint-disable-next-line no-param-reassign
      widget._valueHasChanged = val;
    },

    /*
     * If dataProvider is used and optionsKeys is specified,
     * wrap a ListViewDataProviderView or TreeViewDataProviderView around it
     * and save the wrapper
     */
    wrapDataProviderIfNeeded: function (widget, opts) {
      var wOptions = widget.options;
      var dataProvider = wOptions.options;

      if (_ComboUtils.isDataProvider(dataProvider)) {
        var wrapper;
        var optionsKeys = wOptions.optionsKeys;

        if (optionsKeys && (optionsKeys.label != null || optionsKeys.value != null)) {
          var isTree = _ComboUtils.isTreeDataProvider(dataProvider);

          if ((isTree && !(dataProvider instanceof oj.TreeDataProviderView)) ||
              (!isTree && !(dataProvider instanceof oj.ListDataProviderView))) {
            var mapFields = function (item) {
              var data = item.data;
              var mappedItem = {};
              mappedItem.data = {};

              // copy all the fields
              var keys = Object.keys(data);
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                mappedItem.data[key] = data[key];
              }

              // map label field
              if (optionsKeys.label != null) {
                mappedItem.data.label = data[optionsKeys.label];
              }
              // map value field
              if (optionsKeys.value != null) {
                mappedItem.data.value = data[optionsKeys.value];
              }

              mappedItem.metadata = { key: data[optionsKeys.value] };

              return mappedItem;
            };
            // create ListDataProviderView or TreeDataProviderView with dataMapping
            wrapper = isTree ?
              new oj.TreeDataProviderView(dataProvider,
                                          { dataMapping: { mapFields: mapFields } }) :
              new oj.ListDataProviderView(dataProvider,
                                          { dataMapping: { mapFields: mapFields } });
          }
        }
        // save the data provider or wrapper
        if (wrapper) {
          wOptions._dataProvider = wrapper;
          // update internal wrapper
          if (opts) {
            // eslint-disable-next-line no-param-reassign
            opts._dataProvider = wrapper;
          }
        }
      }
    },

    /**
     * get display label. If label is missing, String(value) will be returned
     * @private
     */
    getLabel: function (item) {
      //  - number converter with comboboxes fails on zero value entry
      // if label is null or undefined use value
      return item.label != null ? item.label : String(item.value);
    },

    /**
     * data provider event handler
     * @private
     */
    _handleDataProviderEvents: function (widget, event) {
      if (event.type === 'mutate') {
        if (event.detail.remove != null) {
          var data = event.detail.remove.data;
          var changed = false;

          var newVal = [].concat(widget.options.value);
          for (var i = 0; i < data.length; i++) {
            var index = newVal.indexOf(data[i].value);
            if (index >= 0) {
              newVal.splice(index, 1);
              changed = true;
            }
          }
          if (changed) {
            widget._setOption('value', newVal);
          }
        }
      }
      widget._setOption('options', widget.options.options);
    },

    /*
     * Add data provider event listeners
     */
    addDataProviderEventListeners: function (widget) {
      var dataProvider = _ComboUtils.getDataProvider(widget.options);
      if (dataProvider) {
        _ComboUtils.removeDataProviderEventListeners(widget);

        var dataProviderEventHandler = _ComboUtils._handleDataProviderEvents.bind(null, widget);
        // eslint-disable-next-line no-param-reassign
        widget._saveDataProviderEH = dataProviderEventHandler;

        dataProvider.addEventListener('mutate', dataProviderEventHandler);
        dataProvider.addEventListener('refresh', dataProviderEventHandler);
      }
    },

    /*
     * Remove data provider event listeners
     */
    removeDataProviderEventListeners: function (widget) {
      var dataProvider = _ComboUtils.getDataProvider(widget.options);
      var dataProviderEventHandler = widget._saveDataProviderEH;

      if (dataProvider != null && dataProviderEventHandler) {
        dataProvider.removeEventListener('mutate', dataProviderEventHandler);
        dataProvider.removeEventListener('refresh', dataProviderEventHandler);

        // eslint-disable-next-line no-param-reassign
        widget._saveDataProviderEH = undefined;
      }
    },

    // _ComboUtils
    // Add a loading indicator to the select box
    addLoadingIndicator: function (_container) {
      var container = _container;

      //  - display loading indicator when fetching label for initial value is slow
      if (container._loadingIndicatorCount === undefined) {
        container._loadingIndicatorCount = 1;
      } else {
        container._loadingIndicatorCount += 1;
      }

      // check if it's already added
      if (container._saveLoadingIndicator != null) {
        return;
      }

      // TODO: center icon
      var item = $(document.createElement('div'));
      item.uniqueId()
          .attr('role', 'presentation')
          .addClass('oj-listbox-loading-icon-container');

      var icon = $(document.createElement('div'));
      icon.addClass('oj-icon oj-listbox-loading-icon');
      item.append(icon); // @HtmlUpdateOK

      container.prepend(item); // @HtmlUpdateOK

      container._saveLoadingIndicator = item;
    },

    // _ComboUtils
    // Remove the loading indicator
    removeLoadingIndicator: function (_container) {
      var container = _container;

      //  - display loading indicator when fetching label for initial value is slow
      if (container._loadingIndicatorCount !== undefined) {
        // remove the loading indicator when reference count down to 0
        if (container._loadingIndicatorCount === 1) {
          container._loadingIndicatorCount = undefined;
          if (container._saveLoadingIndicator != null) {
            container._saveLoadingIndicator.remove();  // @HtmlUpdateOK
            container._saveLoadingIndicator = undefined;
          }
        } else {
          container._loadingIndicatorCount -= 1;
        }
      }
    },

    // _ComboUtils
    // Add dropdown message such as filter further or no matches found
    addDropdownMessage: function (container, context, messageText) {
      // check if it's already added
      if (container._saveDropdownMessage) {
        return;
      }

      var msgParent = $(document.createElement('div'));
      msgParent.addClass('oj-listbox-filter-message-box');

      var message = $(document.createElement('div'));
      message.addClass('oj-listbox-filter-message-text oj-listbox-liveregion');
      message.attr({
        role: 'region',
        'aria-live': 'polite',
      });

      var separator = $(document.createElement('div'));
      separator.addClass('oj-listbox-filter-message-separator');

      msgParent.append(message); // @HtmlUpdateOK
      msgParent.append(separator); // @HtmlUpdateOK
      container.prepend(msgParent); // @HtmlUpdateOK

      message.text(messageText);
      // eslint-disable-next-line no-param-reassign
      container._saveDropdownMessage = msgParent;
    },

    // _ComboUtils
    // Remove dropdown message
    removeDropdownMessage: function (container) {
      if (container._saveDropdownMessage) {
        container._saveDropdownMessage.remove();
        // eslint-disable-next-line no-param-reassign
        container._saveDropdownMessage = undefined;
      }
    },

    fetchFlatData: function (context, dataProvider, fetchListParms, query, dropdown, maxItems) {
      var results = [];
      var asyncIterator = dataProvider.fetchFirst(fetchListParms)[Symbol.asyncIterator]();

      function filterData(fetchResults) {
        if (fetchResults) {
          var data = fetchResults.value.data;
          if (data) {
            // skip filter locally if it is already done thru data provider
            if (fetchListParms.filterCriterion) {
              results = data;
            } else {
              for (var item, i = 0; i < data.length && results.length < maxItems; i++) {
                item = data[i];
                if (!query || !query.matcher ||
                    query.matcher(query.term, _ComboUtils.getLabel(item), item)) {
                  results.push(item);
                }
              }
            }
          }
          // clear message
          if (dropdown) {
            _ComboUtils.removeDropdownMessage(dropdown);
          }

          // not all results are fetched, display mesage for filtering further
          if (dropdown && !fetchResults.done && results.length >= maxItems) {
            _ComboUtils.addDropdownMessage(dropdown, context,
                                           context.getTranslatedString('filterFurther'));
            // eslint-disable-next-line no-param-reassign
            context._hasMore = true;
          } else {
            // fetch more
            if (!fetchResults.done && results.length < maxItems) {
              return asyncIterator.next().then(filterData);
            }
            // eslint-disable-next-line no-param-reassign
            context._hasMore = false;
          }
        }
        return Promise.resolve(results);
      }

      return asyncIterator.next().then(filterData);
    },

    fetchTreeData: function (context, rootDataProvider, fetchListParms, query, dropdown) {
      var remaining = fetchListParms.size;

      // eslint-disable-next-line no-param-reassign
      context._hasMore = false;
      if (dropdown) {
        _ComboUtils.removeDropdownMessage(dropdown);
      }

      function fetchLayer(dataProvider) {
        // eslint-disable-next-line no-param-reassign
        fetchListParms.size = remaining;

        var results = [];
        var iterator = dataProvider.fetchFirst(fetchListParms)[Symbol.asyncIterator]();
        return iterator.next().then(processChunk);

        function processChunk(fetchResult) {
          var data = fetchResult.value.data;
          var childrenPromise = fetchChildren(0);

          return childrenPromise.then(function () {
            if (fetchResult.done || remaining <= 0) {
              if (!fetchResult.done) {
                // eslint-disable-next-line no-param-reassign
                context._hasMore = true;
              }
              return Promise.resolve(results);
            }
            return iterator.next().then(processChunk);
          });

          function processItem(item, children) {
            var match = !query || !query.matcher || fetchListParms.filterCriterion ||
                query.matcher(query.term, _ComboUtils.getLabel(item), item);

            var selectable = (dataProvider.getChildDataProvider(item.value) == null);
            if (!selectable) {
              match = false;
            }
            if (match && children.length === 0) {
              remaining -= 1;
            }

            if (match || children.length > 0) {
              // keep a reference to the original row data in "data"
              var result = { label: item.label, value: item.value, data: item };
              if (item.disabled) {
                result.disabled = true;
              }
              if (!selectable || result.disabled) {
                result._jetUnSelectable = true;
              }
              if (children.length > 0) {
                result.children = children;
              }
              results.push(result);
            }
          }

          function fetchChildren(i) {
            if (i < data.length) {
              if (remaining > 0) {
                var item = data[i];
                var childDataProvider = dataProvider.getChildDataProvider(item.value);
                if (childDataProvider) {
                  return fetchLayer(childDataProvider).then(function (childResults) {
                    processItem(item, childResults);
                    return fetchChildren(i + 1);
                  });
                }
                processItem(item, []);
                return fetchChildren(i + 1);
              }
              // eslint-disable-next-line no-param-reassign
              context._hasMore = true;
            }
            return Promise.resolve(results);
          }
        }
      }

      return fetchLayer(rootDataProvider).then(function (results) {
        if (context._hasMore && dropdown) {
          _ComboUtils.addDropdownMessage(dropdown, context,
                                         context.getTranslatedString('filterFurther'));
        }

        return results;
      });
    },

    // _ComboUtils
    // Fetch from the data provider and filter the data locally until
    // the end of data or fetch size has reached
    fetchFilteredData: function (context, maxItems, query, dropdown) {
      var dataProvider = _ComboUtils.getDataProvider(context.options);
      var fetchListParms = {
        size: maxItems
      };

      // check if data provider support filtering?
      var filterCapability = dataProvider.getCapability('filter');
      var $co = oj.AttributeFilterOperator.AttributeOperator.$co;
      var $regex = oj.AttributeFilterOperator.AttributeOperator.$regex;
      var filterThruDataProvider = false;
      var filterSupportsRegex = false;

      // only filter thru data provider if it supports contains($co or $regex) operator
      if (filterCapability) {
        var filters = filterCapability.operators;
        if (filters && filters.length > 0) {
          if (filters.indexOf($co) >= 0 || filters.indexOf($regex) >= 0) {
            filterThruDataProvider = true;

            if (filters.indexOf($regex) >= 0) {
              filterSupportsRegex = true;
            }
          }
        }
      }
      var isTree = _ComboUtils.isTreeDataProvider(dataProvider);

      // have to filter
      if (query && query.term) {
        // use dataprovider filtering if supported
        if (filterThruDataProvider) {
          // TODO test in the data mapping case to see if "label" works
          // Note: revisit when tree dataProvider is supported
          // for now if optionsKey is used, 'label' must specify in optionsKeys
          var optKeys = context.options.optionsKeys;
          var attrName;
          if (optKeys && optKeys.label) {
            attrName = optKeys.label;
          } else {
            attrName = 'label';
          }
          // case insensitive query should use $regex
          if (filterSupportsRegex) {
            fetchListParms.filterCriterion =
              { op: $regex, attribute: attrName, value: new RegExp(query.term, 'i') };
          } else {
            // if no regex support just fallback to $co
            fetchListParms.filterCriterion =
              { op: $co, attribute: attrName, value: query.term };
          }
        } else if (!isTree) {
          // for local filtering increase the fetch size
          fetchListParms.size = _ComboUtils.FILTERING_FETCH_SIZE;
        }
      }

      return isTree ?
        _ComboUtils.fetchTreeData(context, dataProvider, fetchListParms, query, dropdown) :
        _ComboUtils.fetchFlatData(context, dataProvider, fetchListParms, query, dropdown, maxItems);
    },

    // used as rejected error in the fetchFromDataProvider method
    rejectedError: {},

    // _ComboUtils
    // add busy state
    // display an animated gif if it is fetch initially
    // fetch from the data provider
    // display message for furthur filtering if not all results are fetched
    // if multiple queries are in progress, discard all but the last query
    fetchFromDataProvider: function (widget, options, query, fetchSize) {
      var context = widget.ojContext;

      // add busy context
      if (!context._fetchResolveFunc) {
        context._fetchResolveFunc = _ComboUtils._addBusyState(widget.container, 'fetching data');
      }

      // reject the previous promise to avoid out of order request
      if (context._saveRejectFunc) {
        context._saveRejectFunc(_ComboUtils.rejectedError);
      }

      // save the current reject function
      var remotePromise = new Promise(function (resolve, reject) {
        context._saveRejectFunc = reject;
      });

      // display spinning icon only for the initial fetch
      if (widget.selection && options.fetchType === 'init' && !context._spinnerContainer) {
        context._spinnerContainer = widget.selection;

        _ComboUtils.addLoadingIndicator(context._spinnerContainer);
        // eslint-disable-next-line no-param-reassign
        options.fetchType = null;
      }

      // fetch data from dataProvider
      var fs = (fetchSize || options.fetchSize || _ComboUtils.DEFAULT_FETCH_SIZE);
      var fetchPromise =
        _ComboUtils.fetchFilteredData(context, fs, query, widget.dropdown).then(
          function (fetchResults) {
            //  - search not shown before typing a character
            context._resultCount = fetchResults ? fetchResults.length : 0;
            return fetchResults;
          });

      // if multiple queries are in progress, discard all but the last query
      Promise.race([remotePromise, fetchPromise]).then(function (fetchResults) {
        // clear the reject function
        context._saveRejectFunc = null;

        if (context._spinnerContainer) {
          _ComboUtils.removeLoadingIndicator(context._spinnerContainer);
          context._spinnerContainer = undefined;
        }

        //  - search not shown before typing a character
        if (context._resolveSearchBoxLater) {
          widget._showSearchBox('');
        }

        query.callback({
          results: fetchResults
        });

        if (context._fetchResolveFunc) {
          // clear busy context
          context._fetchResolveFunc();
          context._fetchResolveFunc = null;
        }
      },
      function (error) {
        // don't remove busy state if the reject coming from Promise.race
        if (error !== _ComboUtils.rejectedError && context._fetchResolveFunc) {
          query.callback();
          context._fetchResolveFunc();
          context._fetchResolveFunc = null;
        }
      });
    },

    // _ComboUtils
    // fetch first block of data from the data provider
    fetchFirstBlockFromDataProvider: function (container, options, fetchSize) {
      var dataProvider = _ComboUtils.getDataProvider(options);

      // add busy context
      var fetchResolveFunc = _ComboUtils._addBusyState(container, 'fetching selected data');

      var fetchListParms = {
        size: (fetchSize || _ComboUtils.DEFAULT_FETCH_SIZE)
      };

      if (_ComboUtils.isTreeDataProvider(dataProvider)) {
        return _ComboUtils.fetchTreeData({}, dataProvider, fetchListParms, null, null).then(
          function (fetchResults) {
            // return the leaf node data
            if (fetchSize === 1 && fetchResults && fetchResults.length > 0) {
              var selval = fetchResults[0];
              for (; selval.children;) {
                selval = selval.children[0];
              }
              // eslint-disable-next-line no-param-reassign
              fetchResults = [selval];
            }
            _ComboUtils._clearBusyState(fetchResolveFunc);
            return fetchResults;
          },
          function () {
            _ComboUtils._clearBusyState(fetchResolveFunc);
            return null;
          });
      }

      var asyncIterator = dataProvider.fetchFirst(fetchListParms)[Symbol.asyncIterator]();
      return asyncIterator.next().then(
        function (fetchResults) {
          _ComboUtils._clearBusyState(fetchResolveFunc);
          return fetchResults.value.data;
        },
        function () {
          _ComboUtils._clearBusyState(fetchResolveFunc);
          return null;
        });
    },

    duringFetchByKey: function (container) {
      return container._fetchByKeys;
    },

    // _ComboUtils
    // fetch the data row by its key("value")
    fetchByKeyFromDataProvider: function (widget, options, query) {
      var dataProvider = _ComboUtils.getDataProvider(options);
      // add busy context
      var container = (widget && widget.selection) ? widget.container : widget;
      var fetchResolveFunc = _ComboUtils._addBusyState(container, 'fetching selected data');

      //  - display loading indicator when fetching label for initial value is slow
      if (widget && widget.selection) {
        if (widget.opts.fetchType === 'init' && !container._spinnerContainer) {
          container._spinnerContainer = widget.selection;
          _ComboUtils.addLoadingIndicator(container._spinnerContainer);
        }
      }

      //  - sdp.fetchbykeys method is being called twice for a single value
      // Stored the selected value in container._fetchByKeys, it will be cleared when the promise
      // is resolved or rejected. When this method is called again with the same selected value,
      // don't make another call to dataProvider.fetchByKeys because the previous one is in flight.
      var fetchPromise;
      if (container._fetchByKeys && container._fetchByKeys.promise &&
          oj.Object.compareValues(query.value, container._fetchByKeys.key)) {
        fetchPromise = container._fetchByKeys.promise;
      } else {
        fetchPromise = dataProvider.fetchByKeys({ keys: query.value });
        // save key and promise
        // eslint-disable-next-line no-param-reassign
        container._fetchByKeys = {
          key: query.value,
          promise: fetchPromise
        };
      }

      // fetch the data row by its key("value")
      fetchPromise.then(function (fetchResults) {
        //  - sdp.fetchbykeys method is being called twice for a single value
        // eslint-disable-next-line no-param-reassign
        container._fetchByKeys = undefined;

        if (container._spinnerContainer) {
          _ComboUtils.removeLoadingIndicator(container._spinnerContainer);
          container._spinnerContainer = undefined;
        }

        var values = [];
        fetchResults.results.forEach(function (val) {
          values.push(val.data);
        });

        query.callback({
          results: values
        });
        _ComboUtils._clearBusyState(fetchResolveFunc);
      },
      function () {
        //  - sdp.fetchbykeys method is being called twice for a single value
        // eslint-disable-next-line no-param-reassign
        container._fetchByKeys = undefined;
        query.callback();
        _ComboUtils._clearBusyState(fetchResolveFunc);
      });
    },

    // _ComboUtils
    // check if the specified value is in the dataProvider
    // return a promise with the following results
    // 1) null: value is invalid or reject by fetchByKeyFromDataProvider
    // 2) array of valid values
    validateFromDataProvider: function (container, options, value) {
      // eslint-disable-next-line no-unused-vars
      return new Promise(function (resolve, reject) {
        _ComboUtils.fetchByKeyFromDataProvider(container, options,
          { value: Array.isArray(value) ? value : [value],
            callback: function (data) {
              var results = null;
              //  - need to be able to specify the initial value of select components bound to dprv
              if (data && data.results.length) {
                results = {};
                results.value = [];
                results.valueOptions = [];
                for (var i = 0; i < data.results.length; i++) {
                  results.valueOptions.push(data.results[i]);
                  results.value.push(data.results[i].value);
                }
              }
              resolve(results);
            } });
      });
    },

    // _ComboUtils
    // Readonly support for the custom element only
    isReadonly: function (widget) {
      return widget._IsCustomElement() &&
        (widget.options.readOnly || widget.options.loading === 'loading');
    },

    /*
     * Produces a query function that works with a remote data
     */
    remote: function (options, optKeys) {
      return function (query) {
        var context = {
          component: this.ojContext
        };
        if (query.value) {
          context.value = query.value;
        } else {
          context.term = query.term || '';
        }

        options(context).then(function (data) {
          var filtered = {
            results: []
          };

          if (data) {
            _ComboUtils.each2($(data), function (i, datum) {
              _ComboUtils._processData(query, datum, filtered.results, optKeys,
                false);
            });
          }

          query.callback(filtered);
        });
      };
    },

    // _ComboUtils
    /*
     * Maps the optionsKeys and options array and creates the array of
     * Label-Value objects. If options array is local data then
     * it filters the result array based on the term entered in the search field.
     */
    _processData: function (query, data, collection, keys, isLocal, text) {
      var group;

      var datum = data[0];

      // key mappings
      if (!datum.label && (keys && keys.label)) {
        datum.label = datum[keys.label];
      }
      if (!datum.value && (keys && keys.value)) {
        datum.value = datum[keys.value];
      }
      if (!datum.children && (keys && keys.children)) {
        datum.children = datum[keys.children];
        delete datum[keys.children];
      }

      if (datum.children) {
        group = {};
        var attrs = Object.keys(datum);
        for (var k = 0; k < attrs.length; k++) {
          var attr = attrs[k];
          group[attr] = datum[attr];
        }

        group.children = [];
        _ComboUtils.each2($(datum.children), function (i, childDatum) {
          _ComboUtils._processData(query, childDatum, group.children,
            ((keys && keys.childKeys) ? keys.childKeys : null),
            isLocal, text);
        });

        //  - group labels participate in the filtering
        // Reverted. In the nested data case, group may be selectable. Without putting the
        // group data in the collection, we will find no match and new entry may be created for combobox.
        // For group that has matching children, we need to call the matcher on the group label
        // to update the matches array. This needs to be done before checking the group.children.length.
        if (!isLocal || query.matcher(query.term, text(group), datum) || group.children.length) {
          collection.push(group);
        }
      } else if (!isLocal || query.matcher(query.term, text(datum), datum)) {
        collection.push(datum);
      }
    },

    // _ComboUtils
    checkFormatter: function (ojContext, formatter, formatterName) {
      if ($.isFunction(formatter)) {
        return true;
      }
      if (!formatter) {
        return false;
      }

      throw new Error(formatterName + ' must be a function or a false value');
    },

    // _ComboUtils
    /*
     * Creates a new class
     */
    clazz: function (SuperClass, methods) {
      var constructor = function () {};
      oj.Object.createSubclass(constructor, SuperClass, '');
      constructor.prototype = $.extend(constructor.prototype, methods);
      return constructor;
    },

    // _ComboUtils
    LAST_QUERY_RESULT: 'last-query-result',
    getLastQueryResult: function (context) {
      var queryResult = $.data(context.container,
        context._classNm + '-' + _ComboUtils.LAST_QUERY_RESULT);

      return queryResult;
    },
    saveLastQueryResult: function (context, queryResult) {
      $.data(context.container,
        context._classNm + '-' + _ComboUtils.LAST_QUERY_RESULT, queryResult);
    }
  };

  var _ojChoiceDefaults = {
    closeOnSelect: true,
    openOnEnter: true,
    formatNoMatches: function (ojContext) {
      return ojContext.getTranslatedString('noMatchesFound');
    },
    formatMoreMatches: function (ojContext, num) {
      if (num === 1) {
        return ojContext.getTranslatedString('oneMatchesFound');
      }
      return ojContext.getTranslatedString('moreMatchesFound',
                                           { num: ('' + num) });
    },
    id: function (e) {
      return e.id;
    },
    matcher: function (term, text) {
      return ('' + text).toUpperCase().indexOf(('' + term).toUpperCase()) >= 0;
    },

    separator: ','
  };

  // eslint-disable-next-line no-unused-vars
  var _AbstractOjChoice = _ComboUtils.clazz(Object,
    {
      // _AbstractOjChoice
      _bind: function (func) {
        var self = this;
        return function () {
          func.apply(self, arguments);
        };
      },

      // _AbstractOjChoice
      _customOptionRenderer: function (elems) {
        var elem;
        var self = this;

        elems.each(function () {
          elem = $(this);

          if (elem.is('oj-option')) {
            elem.wrap('<li></li>'); // @HTMLUpdateOK
          } else if (elem.is('oj-optgroup')) {
            elem.wrap('<li></li>'); // @HTMLUpdateOK
            self._customOptionRenderer(elem.children());
            elem.children().wrapAll("<ul class='oj-listbox-result-sub'></ul>"); // @HTMLUpdateOK
          }
        });
      },

      // _AbstractOjChoice
      _init: function (_opts) {
        var results;
        var search;
        var className = this._classNm;
        var elemName = this._elemNm;
        var resultsSelector = '.oj-listbox-results';

        this.ojContext = _opts.ojContext;
        var opts = this._prepareOpts(_opts);
        this.opts = opts;
        this.id = opts.id;
        this.headerInitialized = false;
        this.isOjOption = this.ojContext._IsCustomElement() && !opts.options &&
                          opts.element.find('oj-option').length > 0;

        // destroy if called on an existing component
        if (opts.element.data(elemName) !== undefined &&
          opts.element.data(elemName) !== null) {
          opts.element.data(elemName)._destroy();
        }
        this.container = this._createContainer();
        this.container.find('.oj-listbox-drop').css('display', 'none');

        //  - ojselect - rootAttributes are not propagated to generated jet component
        var rootAttr = opts.rootAttributes;
        this.containerId = (rootAttr && rootAttr.id) ?
          rootAttr.id :
          'ojChoiceId_' + (this._getAttribute('id') || 'autogen' + _ComboUtils.nextUid());

        // eslint-disable-next-line no-useless-escape
        this.containerSelector = '#' + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1'); // @HTMLUpdateOK
        this.container.attr('id', this.containerId);
        // cache the body so future lookups are cheap
        this.body = _ComboUtils.thunk(function () {
          return opts.element.closest('body');
        }
          );
        // We’re copying the style attribute over from the outer element to
        // the container. Normally setting the style attribute would
        // trigger a CSP inline style violation. However, we won’t hit this
        // because when CSP is enabled, the outer element won’t have a style
        // attribute and thus attr(‘style’) won’t be called.
        var style = this._getAttribute('style');
        if (style) {
          this.container.attr('style', this._getAttribute('style'));
        }
        this.elementTabIndex = this._getAttribute('tabindex');

        // 'opts.element' is initialized in _setup() menthod in component files
        // ojcombobox.js, ojselect.js and ojInputSearch.js.

        // swap container for the element
        this.opts.element
        .data(elemName, this)
        .attr('tabindex', '-1')
        .before(this.container);  // @HtmlUpdateOk
        this.container.data(elemName, this);
        this.dropdown = this.container.find('.oj-listbox-drop');
        this.dropdown.data('ojlistbox', this);

        //  - let the ojselect popup accept the custom css class name from the component
        this._setPickerAttributes(opts.pickerAttributes);

        // link the shared dropdown dom to the target component instance
        var containerId = this.containerId;
        this.dropdown.attr('data-oj-containerid', containerId);

        results = this.container.find(resultsSelector);
        this.results = results;
        this.results.on('click', _ComboUtils.killEvent);

        //  - oghag missing label for ojselect and ojcombobox
        if (!this.ojContext._IsCustomElement()) {
          var alabel = this.ojContext.element.attr('aria-label');
          if (alabel) {
            results.attr('aria-label', alabel);
          }
        }

        // if html ul element is provided, use it instead
        if (opts.list && $('#' + opts.list).is('ul')) {
          var dropdownList = $('#' + opts.list);
          this.dropdownListParent = dropdownList.parent();
          dropdownList.addClass('oj-listbox-results').attr('role', 'listbox');
          this.results.replaceWith(dropdownList); // @HTMLUpdateOK
          results = this.container.find(resultsSelector);
          this.results = results;
          this.results.css('display', '');
        }

        // custom element syntax with oj-option elements
        if (this.isOjOption) {
          var elems = opts.element.children();
          this._customOptionRenderer(elems);
          this.results.append(opts.element.children()); // @HTMLUpdateOK
          this.datalist = this.results;
        }

        if (className === 'oj-select') {
          search = this.container.find('input.oj-listbox-input');
        } else {
          search = this.container.find('input.' + className + '-input');
        }
        this.search = search;

        this.queryCount = 0;
        this.resultsPage = 0;
        this.context = null;

        // initialize the container
        this._initContainer();
        this.container.on('click', _ComboUtils.killEvent);
        _ComboUtils.installFilteredMouseMove(this.results);
        this.dropdown.on('mousemove-filtered touchstart touchmove touchend', resultsSelector, this._bind(this._highlightUnderEvent));
        // do not propagate change event from the search field out of the component
        $(this.container).on('change', '.' + className + '-input', function (e) {
          e.stopPropagation();
        }
        );
        $(this.dropdown).on('change', '.' + className + '-input', function (e) {
          e.stopPropagation();
        }
        );

        var self = this;
        _ComboUtils.installKeyUpChangeEvent(search);
        search.on('keyup-change input paste', this._bind(this._updateResults));
        search.on('focus', function () {
          search.addClass(className + '-focused');

          if (className !== 'oj-select') {
            self.container.addClass('oj-focus');
          }
        }
        );
        search.on('blur', function () {
          search.removeClass(className + '-focused');

          if (className !== 'oj-select') {
            self.container.removeClass('oj-focus');
          }
        }
        );
        this.dropdown.on('mouseup', resultsSelector, this._bind(function (e) {
          if ($(e.target).closest('.oj-listbox-result-selectable').length > 0) {
            this._highlightUnderEvent(e);
            this._selectHighlighted(null, e);
          }
        }
          ));
        // trap all mouse events from leaving the dropdown. sometimes there may be a modal that is listening
        // for mouse events outside of itself so it can close itself. since the dropdown is now outside the combobox's
        // dom it will trigger the popup close, which is not what we want
        this.dropdown.on('click mouseup mousedown', function (e) {
          e.stopPropagation();
        }
        );
        if ($.isFunction(this.opts.initSelection)) {
          // /support ko options-binding
          // init dataProvider fetchType
          this.opts.fetchType = 'init';
          var valOpts = this.getValOpts();
          if ((this.ojContext.multiple && (!valOpts || valOpts.length === 0)) ||
              (!this.ojContext.multiple && !valOpts)) {
            valOpts = null;
          }
          this._initSelection(valOpts);
        }
        var readonly = opts.element.prop('readonly');
        if (readonly === undefined) {
          readonly = false;
        }
        this._readonly(readonly);
        var disabled = opts.element.prop('disabled');
        if (disabled === undefined) {
          disabled = false;
        }
        this._enable(!disabled);
        // Calculate size of scrollbar
        _ComboUtils.scrollBarDimensions = _ComboUtils.scrollBarDimensions ||
                                          _ComboUtils.measureScrollbar();
        this.autofocus = opts.element.prop('autofocus');
        opts.element.prop('autofocus', false);
        if (this.autofocus) {
          this._focus();
        }

        _ComboUtils.addDataProviderEventListeners(opts.ojContext);

        // Readonly support
        this.applyReadonlyState();
      },

      // _AbstractOjChoice
      // Readonly support
      applyReadonlyState: function () {
        var $content = this.ojContext._GetContentElement();
        if (_ComboUtils.isReadonly(this.ojContext)) {
          this.container.addClass('oj-read-only');
          if (this._classNm === 'oj-combobox') {
            if (this.ojContext.multiple) {
              // the following code is for oj-combobox-many
              $content = null;
              this.selection.attr('tabindex', '0');
              if (this.ojContext.options.labelledBy) {
                // for oj-combobox-many in readonly mode, when you click on the field it is the
                // wrapper that gets focus, not the input, so you need aria-labelledby to point
                // to label element's id.
                var defaultLabelId = this.uuid + '_Label';
                var ariaLabelledBy =
                oj.EditableValueUtils._getOjLabelAriaLabelledBy(
                  this.ojContext.options.labelledBy, defaultLabelId);
                if (ariaLabelledBy) {
                  this.selection.attr('aria-labelledby', ariaLabelledBy);
                }
              }
            } else {
              $content.attr('readonly', true);
            }
          } else if (this._classNm === 'oj-select') {
            $content.attr('aria-readonly', 'true');
          }
          if ($content) {
            $content.removeAttr('role');
            $content.removeAttr('aria-expanded');
          }
        } else {
          this.container.removeClass('oj-read-only');
          if (this._classNm === 'oj-combobox') {
            if (this.ojContext.multiple) {
              $content = null;
              this.selection.removeAttr('tabindex');
              this.selection.removeAttr('aria-labelledby');
            } else {
              $content.removeAttr('readonly', true);
            }
          } else if (this._classNm === 'oj-select') {
            $content.removeAttr('aria-readonly');
          }
          if ($content) {
            $content.attr('role', 'combobox');
            $content.attr('aria-expanded', 'false');
          }
        }

        this._enableInterface();
      },

      // _AbstractOjChoice
      _clickAwayHandler: function (event) {
        var dropdown = this.dropdown;
        var self;

        //  - period character in element id prevents options box open/close
        // escapeSelector handles special characters
        if ($(event.target).closest(dropdown).length ||
            $(event.target).closest('#' + $.escapeSelector(dropdown.attr('data-oj-containerid'))).length) {
          return;
        }

        if (dropdown.length > 0) {
          self = dropdown.data('ojlistbox');
          self.close(event);
        }
      },

      // _AbstractOjChoice
      _surrogateRemoveHandler: function () {
        if (this.dropdown) {
          this.dropdown.remove();
        }
      },

      // _AbstractOjChoice
      _destroy: function () {
        var closeDelayTimer = this._closeDelayTimer;
        if (!isNaN(closeDelayTimer)) {
          delete this._closeDelayTimer;
          window.clearTimeout(closeDelayTimer);
        }

        var element = this.opts.element;
        var ojcomp = element.data(this._elemNm);

        this.close();
        if (this.propertyObserver) {
          delete this.propertyObserver;
          this.propertyObserver = null;
        }

        // 'results' is initialized in _init() method and it can not be changed by an external developer.

        // clean up the ul list
        if (this.opts.list && this.results) {
          this._cleanupList(this.results);
          // Move to original parent
          if (this.dropdownListParent) {
            this.dropdownListParent.append(this.results); // @HtmlUpdateOk
          }
        } else if (this.isOjOption && this.results) {
          this._unwrapOjOptions(this.results);
          this.opts.element.append(this.results.children()); // @HtmlUpdateOk
        }

        if (ojcomp !== undefined) {
          // Move the element outside the container to its original place
          ojcomp.container.after(element); // @HTMLUpdateOK
          ojcomp.container.remove();
          ojcomp.dropdown.remove();
          element
          .removeAttr('aria-hidden')
          .removeData(this._elemNm)
          .off('.' + this._classNm)
          .prop('autofocus', this.autofocus || false);
          if (this.elementTabIndex) {
            element.attr(
              {
                tabindex: this.elementTabIndex
              }
            );
          } else {
            element.removeAttr('tabindex');
          }
          element.show();
        }
      },

      // _AbstractOjChoice
      /*
       * unwrap oj-option and oj-optgroup
       */
      _unwrapOjOptions: function (list) {
        var children = list.children();
        var elem;
        var self = this;

        children.each(function () {
          elem = $(this);

          if (elem.is('li')) {
            // oj-optgroup
            if (elem.hasClass('oj-listbox-result-with-children') || elem.children('oj-optgroup').length > 0) {
              // if the oj-optgroup went through the populateResults call
              if (elem.hasClass('oj-listbox-result-with-children')) {
                elem.children('.oj-listbox-result-label').remove();
              }
              // unwrap children
              self._unwrapOjOptions(elem.find('oj-optgroup').children());
              // unwrap the <ul>
              elem.find('oj-optgroup').children().children().unwrap();
              // unwrap the <li>
              elem.find('oj-optgroup').unwrap();
            } else if (elem.hasClass('oj-listbox-result')) {
              // unwrap the <li>
              // if the oj-option went through the populateResults call
              elem.find('oj-option').unwrap().unwrap();
            } else {
              elem.find('oj-option').unwrap();
            }
          }
        });
      },

      // _AbstractOjChoice
      /*
       * Clean up the html list provided by app
       */
      _cleanupList: function (list) {
        if (list && list.is('ul')) {
          list.removeClass('oj-listbox-results oj-listbox-result-sub');
          list.removeAttr('role');
          for (var i = list.children().length - 1; i >= 0; i--) {
            this._cleanupList($(list.children()[i]));
          }
        } else if (list.is('li')) {
          if (list.hasClass('oj-listbox-placeholder') ||
              list.hasClass('oj-listbox-no-results')) {
            list.remove();
          }

          // remove added li classes starts with oj-listbox-
          if (list.attr('class')) {
            list.attr('class', list.attr('class').replace(/oj-listbox-\S+/g, ''));
          }

          // remove wrapping div
          var wrappingDiv = list.children('.oj-listbox-result-label');
          if (wrappingDiv) {
            wrappingDiv.contents().unwrap();
          }

          if (list.css('display') === 'none') {
            list.css('display', '');
          }

          this._cleanupList(list.children('ul'));
        }
      },

      // _AbstractOjChoice
      /*
       * Processes option/optgroup/li element and return data object
       */
      _optionToData: function (element) {
        if (element.is('option') || element.is('oj-option')) {
          return {
            value: element.prop('value') || element.attr('value'),
            label: element.text().trim() || element.attr('label'),
            element: element.get(),
            css: element.attr('class'),
            disabled: element.prop('disabled'),
            locked: (element.attr('locked') === 'locked') || (element.data('locked') === true)
          };
        } else if (element.is('optgroup') || element.is('oj-optgroup')) {
          return {
            label: element.prop('label') || element.attr('label'),
            disabled: element.prop('disabled'),
            children: [],
            element: element.get(),
            css: element.attr('class')
          };
        } else if (element.is('li')) {
          var itemLabel;
          var itemValue;
          var disabled;
          var groupData = null;
          var elemChildren = element.children();

          if (elemChildren && elemChildren.length > 0 && elemChildren.is('ul')) {
            itemLabel = (element.attr('oj-data-label') ? element.attr('oj-data-label') :
                         element.clone().children().remove().end()
                         .text()
                         .trim());
            itemValue = element.attr('oj-data-value');
            groupData = [];
          } else if (elemChildren && elemChildren.length > 0 && elemChildren.is('oj-optgroup')) {
            itemLabel = elemChildren.prop('label');
            disabled = elemChildren.prop('disabled');
            groupData = [];
          } else {
            var ojOptionItem = element.find('oj-option');
            itemLabel = element.attr('oj-data-label') ? element.attr('oj-data-label') :
                        element.text().trim();
            itemValue = ojOptionItem.length > 0 ? ojOptionItem.prop('value') :
                                                  element.attr('oj-data-value');
            disabled = ojOptionItem.length > 0 ? ojOptionItem.prop('disabled') :
                                                  undefined;
          }

          return {
            value: itemValue,
            label: itemLabel,
            disabled: disabled,
            element: element.get(),
            css: element.attr('class'),
            children: groupData
          };
        }

        return undefined;
      },

      // _AbstractOjChoice
      /*
       * Prepares the option items to display in the drop down
       */
      _prepareOpts: function (_opts) {
        var opts = _opts;
        var element;
        var datalist;
        var self = this;

        // clone the options array if optionsKeys is specified
        if (opts.options && Array.isArray(opts.options) && opts.optionsKeys) {
          opts.options = $.extend(true, [], opts.options);
        }

        element = opts.element;
        var tagName = element.get(0).tagName.toLowerCase();

        if (opts.ojContext._IsCustomElement()) {
          if (!opts.options && opts.element.children().length > 0) {
            datalist = $(element);
            this.datalist = datalist;
          }
        } else if (tagName === 'input' && element.attr('list')) {
          datalist = $('#' + element.attr('list'));
          this.datalist = datalist;
        } else if (tagName === 'select' && element.children().length > 0) {
          // /ojselect
          datalist = element;
          this.datalist = datalist;
        } else if (opts.list) {
          // if html ul list is provided
          datalist = $('#' + opts.list);
          this.datalist = datalist;
        }

        opts = $.extend({},
          {
            populateResults: function (_container, _results, query, _showPlaceholder) {
              var populate;
              var id = this.opts.id;
              var isTreeDataProvider =
                _ComboUtils.isTreeDataProvider(_ComboUtils.getDataProvider(this.opts));

              var optionRenderer = this.opts.optionRenderer;
              if (typeof optionRenderer !== 'function') {
                // cannot be non-function
                optionRenderer = null;
              }

              if (this.opts.ojContext._IsCustomElement() && optionRenderer) {
                // update renderer for custom element format
                var origRenderer = optionRenderer;
                optionRenderer = function (context) {
                  var obj = origRenderer(context);

                  // New interface is for the renderer to return oj-option or oj-optgroup element
                  if (obj && (obj.tagName === 'OJ-OPTION' || obj.tagName === 'OJ-OPTGROUP')) {
                    // Add the data-oj-binding-provider attribute if it doesn't have one so that it will be upgraded
                    if (!obj.hasAttribute('data-oj-binding-provider')) {
                      obj.setAttribute('data-oj-binding-provider', 'none');
                    }

                    return obj;
                  }

                  // Maintain backward compatibility with old interface
                  return obj && obj.insert ? obj.insert : null;
                };
              }

              populate = function (resultsParent, results, container, depth, showPlaceholder) {
                var i;
                var l;
                var result;
                var selectable;
                var disabled;
                var node;
                var label;
                var formatted;

                var processChildren = function (_node, _result) {
                  if (_result.children && _result.children.length > 0) {
                    var nestedList = _result.element && $(_result.element[0]).is('li') &&
                        $(_result.element[0]).children('ul');

                    var innerContainer = nestedList ? $(_result.element[0]).children('ul') :
                        $('<ul></ul>');

                    if (!innerContainer.hasClass('oj-listbox-result-sub')) {
                      innerContainer.addClass('oj-listbox-result-sub');
                    }

                    populate(_result, _result.children, innerContainer, depth + 1, false);

                    if (!nestedList) {
                      _node.append(innerContainer); // @HTMLUpdateOK
                    }
                  }
                };

                var termHighlight = function (highlighterSection, highlighterClass, pattern) {
                  function innerHighlight(_node, pat) {
                    var skip = 0;
                    if (_node.nodeType === 3) {
                      var pos = _node.data.toUpperCase().indexOf(pat);
                      if (pos >= 0) {
                        var spannode = document.createElement('span');
                        spannode.className = highlighterClass;
                        //  - issue with ojselect component when filtering certain lower case char
                        // This is a temporary fix to avoid exceptions.
                        // For real fix, we need to know the beginning and ending offset of the match.
                        var middlebit = _node.splitText(Math.min(pos, _node.data.length));
                        middlebit.splitText(Math.min(pat.length, middlebit.data.length));
                        var middleclone = middlebit.cloneNode(true);

                        spannode.appendChild(middleclone); // @HTMLUpdateOK
                        middlebit.parentNode.replaceChild(spannode, middlebit); // @HtmlUpdateOk

                        skip = 1;
                      }
                    } else if (_node.nodeType === 1 && _node.childNodes
                      && !/(script|style)/i.test(_node.tagName)) {
                      // This function is to highlight the text appeared in the passed-in node.
                      // So recursively it checks for child nodes also.
                      // But need not to highlight the text appeared in <script> and <style> tags, so skipping them.
                      for (var h = 0; h < _node.childNodes.length; h++) {
                        h += innerHighlight(_node.childNodes[h], pat);
                      }
                    }
                    return skip;
                  }

                  if (highlighterSection.length && pattern && pattern.length) {
                    highlighterSection.each(function () {
                      innerHighlight(this, pattern.toUpperCase());
                    });
                  }
                };

                var highlightLabelNode = function (labelNode) {
                  if (opts.highlightTermInOptions(query)) {
                    var highlighterSection = labelNode
                      .find('.oj-listbox-highlighter-section');
                    if (!highlighterSection.length) {
                      highlighterSection = labelNode;
                    }

                    termHighlight(highlighterSection, 'oj-listbox-highlighter',
                      query.term);
                  }
                };

                var createLabelContent = function (labelNode, _result) {
                  var contentNode;
                  if (optionRenderer) {
                    // For treeDataProvider, we store the whole original data item on the result wrapper
                    // object instead of copying all the fields, now we need to pass the stored original
                    // data to an option-renderer
                    var contextData = isTreeDataProvider ? _result.data : _result;
                    var context = {
                      index: i,
                      depth: depth,
                      leaf: !_result.children,
                      parent: resultsParent,
                      data: contextData,
                      component: opts.ojContext,
                      parentElement: labelNode.get(0)
                    };

                    if (opts.ojContext._FixRendererContext) {
                      context = opts.ojContext._FixRendererContext(context);
                    }

                    // if an element is returned from the renderer and
                    // the parent of that element is null, we will append
                    // the returned element to the parentElement.
                    // If non-null, we won't do anything, assuming that the
                    // rendered content has already added into the DOM somewhere.
                    var content = optionRenderer.call(opts.ojContext, context);
                    if (content !== null) {
                      // allow return of document fragment from jquery create or
                      // js document.createDocumentFragment
                      if (content.parentNode === null
                        || content.parentNode instanceof DocumentFragment) {
                        labelNode.get(0).appendChild(content); // @HTMLUpdateOK
                        contentNode = content;
                      }
                    }
                  } else {
                    formatted = opts.formatResult(_result);
                    if (formatted !== undefined) {
                      labelNode.text(formatted);
                      labelNode.attr('aria-label', formatted);
                    }
                  }

                  highlightLabelNode(labelNode);

                  return contentNode;
                };

                //  - ojselect does not show placeholder text when data option is specified
                //  - placeholder text is a selectable item that results in an error for ojcomponent
                // /ojselect only add placeholder to dropdown if there is no search filter
                // /and not required
                var placeholder = self._getPlaceholder();
                if (showPlaceholder && placeholder !== null && !query.term &&
                    container.find('.oj-listbox-placeholder').length <= 0 &&
                    (tagName !== 'select' || !self.ojContext._IsRequired())) {
                  // create placeholder item
                  result = {
                    value: '',
                    label: placeholder
                  };

                  node = $('<li></li>');
                  node.addClass('oj-listbox-placeholder oj-listbox-results-depth-0 oj-listbox-result oj-listbox-result-selectable');
                  node.attr('role', 'presentation');

                  label = $(document.createElement('div'));
                  label.addClass('oj-listbox-result-label');
                  label.attr('id', 'oj-listbox-result-label-' + _ComboUtils.nextUid());
                  label.attr('role', 'option');

                  formatted = opts.formatResult(result);
                  if (formatted !== undefined) {
                    label.text(formatted);
                  }

                  label.attr('aria-label', formatted);
                  node.append(label); // @HTMLUpdateOK

                  node.data(self._elemNm, result);
                  container.prepend(node); // @HTMLUpdateOK
                }

                for (i = 0, l = results.length; i < l; i++) {
                  result = results[i];
                  disabled = (result.disabled === true);
                  selectable = isTreeDataProvider ? !result._jetUnSelectable :
                    ((!disabled) && (id(result) !== undefined));

                  var isList = result.element && $(result.element[0]).is('li');
                  node = isList ? $(result.element[0]) : $('<li></li>');

                  if (node.hasClass('oj-listbox-result')) {
                    if (result.children && result.children.length > 0) {
                      processChildren(node, result);
                    }

                    highlightLabelNode($(result.element[0]).children('div'));
                    $(result.element[0]).css('display', '');
                  } else {
                    node.addClass('oj-listbox-results-depth-' + depth);
                    node.addClass('oj-listbox-result');
                    node.addClass(selectable ? 'oj-listbox-result-selectable' : 'oj-listbox-result-unselectable');
                    if (disabled) {
                      node.addClass('oj-disabled');
                    }
                    if (result.children) {
                      node.addClass('oj-listbox-result-with-children');
                    }
                    node.attr('role', 'presentation');

                    label = $(document.createElement('div'));
                    label.addClass('oj-listbox-result-label');
                    label.attr('id', 'oj-listbox-result-label-' + _ComboUtils.nextUid());
                    label.attr('role', 'option');
                    if (disabled) {
                      label.attr('aria-disabled', 'true');
                    }

                    // append label to node
                    if (!isList) {
                      var content = createLabelContent(label, result);
                      node.append(label); // @HTMLUpdateOK

                      if (content && ((content.tagName === 'OJ-OPTION') || (content.tagName === 'OJ-OPTGROUP'))) {
                        // Update the disabled state on ancestors
                        if (content.getAttribute('disabled')) {
                          node.removeClass('oj-listbox-result-selectable');
                          node.addClass('oj-listbox-result-unselectable oj-disabled');
                          label.attr('aria-disabled', 'true');
                        }

                        // Create text for oj-optgroup
                        if (content.tagName === 'OJ-OPTGROUP' && content.hasAttribute('label')) {
                          // Insert a text node for the label attribute
                          var labelText = content.getAttribute('label');
                          var textNode = document.createTextNode(labelText);
                          content.insertBefore(textNode, content.firstChild);
                        }
                      }
                    }

                    // process children
                    if (result.children && result.children.length > 0) {
                      processChildren(node, result);
                    }

                    node.data(self._elemNm, result);
                    if (!isList) {
                      container.append(node); // @HTMLUpdateOK
                    } else {
                      var elem = $(result.element[0]);
                      // oj-optgroup
                      if (elem.children('oj-optgroup').length > 0) {
                        var groupLabel = elem.children('oj-optgroup').prop('label') + '';
                        elem.prepend(label.text(groupLabel)); // @HTMLUpdateOK
                      } else if (elem.children('oj-option').length > 0) {
                        elem.contents().wrapAll(label); // @HTMLUpdateOK
                      } else {
                        // wrap the li contents except the nested ul with wrapping div
                        elem.contents().filter(function () {
                          return this.tagName !== 'UL';
                        }).wrapAll(label); // @HTMLUpdateOK
                      }

                      highlightLabelNode(elem.children('div'));
                      elem.css('display', '');
                    }
                  }
                }
              };

              // /ojselect placehholder
              populate(null, _results, _container, 0, _showPlaceholder);
            },

            highlightTermInOptions: function (query) {
              return (!(query.initial === true));
            }
          }, _ojChoiceDefaults, opts);

        opts.id = function (e) {
          return e.value;
        };

        opts.formatResult = function (result) {
          var label = _ComboUtils.getLabel(result);
          return (!isNaN(label) ? this.ojContext._formatValue(label) : label);
        };

        opts.formatSelection = function (data) {
          var label = _ComboUtils.getLabel(data);
          if (data && label) {
            if (isNaN(label)) {
              return label;
            }
            return this.ojContext._formatValue(label);
          }
          return undefined;
        };

        if (tagName !== 'select' && opts.manageNewEntry !== null) {
          opts.manageNewEntry = function (term) {
            var entry = {};
            entry.label = $.trim(term);
            entry.value = entry.label;
            return entry;
          };
        }

        if (this.datalist) {
          opts.query = this._bind(function (query) {
            var data = {
              results: [],
              more: false
            };
            var term = query.term;
            var children;
            var process;

            process = function (elm, collection) {
              var group;
              var elems;
              var nestedLi = elm.children() && elm.children().length > 0
                      && (elm.children().is('ul') || elm.children().is('oj-optgroup'));
              if (elm.is('option') || elm.is('oj-option') || (elm.is('li') && !nestedLi)) {
                if (query.matcher(term, elm.text() || elm.attr('label'), elm)) {
                  collection.push(self._optionToData(elm));
                }
              } else if (elm.is('optgroup') || elm.is('oj-optgroup') || (elm.is('li') && nestedLi)) {
                group = self._optionToData(elm);

                if (elm.is('optgroup') || elm.is('oj-optgroup')) {
                  elems = elm.children();
                } else if (elm.children('oj-optgroup')) {
                  elems = elm.children().children('ul').children();
                } else {
                  elm.children('ul').children();
                }

                _ComboUtils.each2(elems, function (i, el) {
                  process(el, group.children);
                });

                if (group.children.length > 0) {
                  collection.push(group);
                }
              }
            };

            children = this.datalist.children();

              // /ojselect remove existing placeholder item
            if (this._getPlaceholder() !== undefined && children.length > 0 &&
                  children.first().attr('value') === '') {
              children = children.slice(1);
            }

            _ComboUtils.each2(children, function (i, elm) {
              process(elm, data.results);
            }
              );
            query.callback(data);
          }
            );
        } else if ('options' in opts) {
          var dataOptions = opts.options;

          if (_ComboUtils.getDataProvider(opts)) {
            opts.query = function (query) {
              if (query.value) {
                _ComboUtils.fetchByKeyFromDataProvider(self, opts, query);
              } else {
                _ComboUtils.fetchFromDataProvider(self, opts, query);
              }
            };
          } else if ($.isFunction(dataOptions)) {
            opts.query = _ComboUtils.remote(dataOptions,
                                            opts.optionsKeys ? opts.optionsKeys : null);
          } else {
            opts.query = _ComboUtils.local(dataOptions,
                                           opts.optionsKeys ? opts.optionsKeys : null);
          }
        }

        return opts;
      },

      // _AbstractOjChoice
      _createHeader: function () {
        var headerElem = this.opts.element.find('.oj-listbox-header');
        if (headerElem.length) {
          this.header = $('<li>', {
            class: 'oj-listbox-result-header oj-listbox-result-unselectable',
            role: 'presentation'
          });

          this.header.append(headerElem.children()); // @HTMLUpdateOK
          this._initializeHeaderItems();

          var resultsNHeaderContainer = $('<ul>',
            { class: 'oj-listbox-results-with-header',
              role: 'listbox' });

          resultsNHeaderContainer.append(this.header); // @HTMLUpdateOK
          resultsNHeaderContainer.appendTo(this.results.parent()); // @HTMLUpdateOK

          var resultsWrapper = $('<li>', { role: 'presentation' });
          resultsNHeaderContainer.append(resultsWrapper); // @HTMLUpdateOK

          this.results.attr('role', 'presentation');
          this.results.appendTo(resultsWrapper); // @HTMLUpdateOK
        }

        this.headerInitialized = true;
      },

      _initializeHeaderItems: function () {
        this.headerItems = this.header.find("li[role='option'], li:not([role])");
        this.headerItems.uniqueId();

        this.header.find('ul').attr('role', 'presentation');
        this.header.find('li:not([role])').attr('role', 'option');

        var selector = 'a, input, select, textarea, button, object, .oj-component-initnode';
        this.header.find(selector).each(function () {
          $(this).attr('tabIndex', -1);
        });
      },

      _isHeaderItem: function (item) {
        var isHeaderItem = false;

        this.headerItems.each(function () {
          if ($(this).attr('id') === item) {
            isHeaderItem = true;
            return false;
          }
          return true;
        });

        return isHeaderItem;
      },

      _getNextHeaderItem: function (currentItem) {
        if (!this.headerItems) {
          return null;
        }

        if (!currentItem) {
          return this.headerItems.first();
        }

        var foundCurrentItem = false;
        var nextItem = null;
        this.headerItems.each(function () {
          if (foundCurrentItem) {
            nextItem = $(this);
            return false;
          }

          foundCurrentItem = ($(this).attr('id') === currentItem);
          return true;
        });

        return nextItem;
      },

      _getPreviousHeaderItem: function (currentItem) {
        if (!this.headerItems) {
          return null;
        }

        var previousItem = null;
        this.headerItems.each(function () {
          if ($(this).attr('id') === currentItem) {
            return false;
          }

          previousItem = $(this);
          return true;
        });

        return previousItem;
      },

      _setFocusOnHeaderItem: function (item) {
        var focusable = item.find('.oj-component .oj-enabled').first();
        if (focusable.length === 0) {
          var selector = 'a, input, select, textarea, button, object, .oj-component-initnode';
          focusable = item.find(selector).first();
          if (focusable.length === 0) {
            focusable = item.children().first();
          }
        }
        if (focusable) {
          focusable.addClass('oj-focus oj-focus-highlight oj-focus-only');
        }
      },

      _removeHighlightFromHeaderItems: function () {
        if (this.headerItems) {
          this.headerItems.find('.oj-focus')
                  .removeClass('oj-focus oj-focus-highlight oj-focus-only');
        }
      },

      // _AbstractOjChoice
      _triggerSelect: function (data) {
        var evt = $.Event(this._elemNm + '-selecting',
          {
            val: this.id(data),
            object: data
          }
          );
        this.opts.element.trigger(evt);
        return !evt.isDefaultPrevented();
      },

      // _AbstractOjChoice
      _isInterfaceEnabled: function () {
        return this.enabledInterface === true;
      },

      // _AbstractOjChoice
      _enableInterface: function () {
        // Readonly support
        var enabled = this._enabled &&
            !(_ComboUtils.isReadonly(this.ojContext) || this._readonly);

        if (enabled === this.enabledInterface) {
          return false;
        }

        // Readonly support
        if (!_ComboUtils.isReadonly(this.ojContext)) {
          this.container.toggleClass('oj-disabled', !enabled);
        }
        this.close();
        this.enabledInterface = enabled;

        return true;
      },

      // _AbstractOjChoice
      _enable: function (_enabled) {
        var enabled = _enabled;
        if (enabled === undefined) {
          enabled = true;
        }
        if (this._enabled === enabled) {
          return;
        }
        this._enabled = enabled;

        this.opts.element.prop('disabled', !(enabled || _ComboUtils.isReadonly(this.ojContext)));

        this.container.toggleClass('oj-enabled', enabled);

        this._enableInterface();
      },

      // _AbstractOjChoice
      _disable: function () {
        this._enable(false);
      },

      // _AbstractOjChoice
      _readonly: function (_enabled) {
        var enabled = _enabled;
        if (enabled === undefined) {
          enabled = false;
        }
        if (this._readonly === enabled) {
          return false;
        }
        this._readonly = enabled;

        this.opts.element.prop('readonly', enabled);
        this._enableInterface();
        return true;
      },

      // _AbstractOjChoice
      _opened: function () {
        return this.container.hasClass('oj-listbox-dropdown-open');
      },

      // return the element one which we want to position the listbox-dropdown. We don't
      // want it to be the container because we add the inline messages to the container
      // and if we line up to the container when it has inline messages, the dropdown
      // appears after the inline messages. We want it to always appear next to the input,
      // which is the first child of the container.
      // _AbstractOjChoice
      _getDropdownPositionElement: function () {
        return this.container.children().first();
      },

      // _AbstractOjChoice
      _usingHandler: function (pos, props) {
        // if the input part of the component is clipped in overflow, implicitly close the dropdown popup.
        if (oj.PositionUtils.isAligningPositionClipped(props)) {
          // add busy state
          var resolveBusyState = _ComboUtils._addBusyState(this.container, 'closing popup');
          this._closeDelayTimer = window.setTimeout(function () {
            $.proxy(this.close, this);
            resolveBusyState();
          }, 1);

          return;
        }

        var container = this.container;
        var dropdown = props.element.element;
        dropdown.css(pos);

        if (props.vertical === 'bottom') {
          container.addClass('oj-listbox-drop-above');
          dropdown.addClass('oj-listbox-drop-above');
        } else {
          container.removeClass('oj-listbox-drop-above');
          dropdown.removeClass('oj-listbox-drop-above');
        }
      },

      // _AbstractOjChoice
      _getDropdownPosition: function () {
        var position = {
          my: 'start top',
          at: 'start bottom',
          of: this._getDropdownPositionElement(),
          collision: 'flip',
          using: $.proxy(this._usingHandler, this)
        };
        var isRtl = oj.DomUtils.getReadingDirection() === 'rtl';
        return oj.PositionUtils.normalizeHorizontalAlignment(position, isRtl);
      },

      // _AbstractOjChoice
      _positionDropdown: function () {
        var dropdown = this.dropdown;
        var position = this._getDropdownPosition();
        var container = this.container;

        dropdown.css('width', container.outerWidth());
        dropdown.position(position);
      },

      // _AbstractOjChoice
      // beforeExpand
      _shouldOpen: function (e) {
        if (this._opened()) {
          return false;
        }
        // Readonly support
        if (this._enabled === false || _ComboUtils.isReadonly(this.ojContext) ||
            this._readonly === true) {
          return false;
        }

        var eventData = {
          component: this.opts.element
        };

        return this.ojContext._trigger('beforeExpand', e, eventData);
      },

      // _AbstractOjChoice
      _clearDropdownAlignmentPreference: function () {
        // clear the classes used to figure out the preference of where the dropdown should be opened
        this.container.removeClass('oj-listbox-drop-above');
        this.dropdown.removeClass('oj-listbox-drop-above');
      },

      // _AbstractOjChoice
      /**
       * Opens the dropdown
       *
       * @return {boolean} whether or not dropdown was opened. This method will return false if, for example,
       * the dropdown is already open, or if the 'open' event listener on the element called preventDefault().
       * @ignore
       */
      open: function (e, dontUpdateResults) {
        if (!this._shouldOpen(e)) {
          return false;
        }
        this._opening(e, dontUpdateResults);
        return true;
      },

      // _AbstractOjChoice
      _opening: function () {
        if (!this.headerInitialized) {
          this._createHeader();
        }

        // this._clearPlaceholder();
        this.container.addClass('oj-listbox-dropdown-open');
      },

      // _AbstractOjChoice
      _showDropDown: function () {
        if (!this._opened()) {
          // Just to make sure that _opening() method is called before calling
          // the _showDropDown().
          return;
        }

        var alreadyExpanded = this._getActiveContainer().attr('aria-expanded');
        if (alreadyExpanded === 'true') {
          return;
        }

        this._clearDropdownAlignmentPreference();

        //  - picking ojselect value using filter and keyboard may cause dropdown close error
        // For signle select only -
        // if popup exists, refresh its content, otherwise create a popup

        var popupRoot = this.dropdown.parent();
        if (this._classNm === 'oj-select' && this.opts.multiple !== true &&
            popupRoot && popupRoot.hasClass('oj-listbox-drop-layer')) {
          oj.PopupService.getInstance()
            .triggerOnDescendents(popupRoot, oj.PopupService.EVENT.POPUP_REFRESH);
        } else {
          if (this.dropdown[0] !== this.body().children().last()[0]) {
            this.dropdown.detach().appendTo(this.body()); // @HTMLUpdateOK
          }

          this.dropdown.appendTo(this.body()); // @HTMLUpdateOK

          if (this.header) {
            this.dropdown.find('.oj-listbox-results-with-header').prepend(this.header); // @HTMLUpdateOK
            this.header.show();
          }

          var psEvents = {};
          psEvents[oj.PopupService.EVENT.POPUP_CLOSE] = $.proxy(this.close, this);
          psEvents[oj.PopupService.EVENT.POPUP_REMOVE] =
            $.proxy(this._surrogateRemoveHandler, this);
          psEvents[oj.PopupService.EVENT.POPUP_AUTODISMISS] =
            $.proxy(this._clickAwayHandler, this);
          psEvents[oj.PopupService.EVENT.POPUP_REFRESH] = $.proxy(this._positionDropdown, this);

          /** @type {!Object.<oj.PopupService.OPTION, ?>} */
          var psOptions = {};
          psOptions[oj.PopupService.OPTION.POPUP] = this.dropdown;
          psOptions[oj.PopupService.OPTION.LAUNCHER] = this.opts.element;
          psOptions[oj.PopupService.OPTION.EVENTS] = psEvents;
          psOptions[oj.PopupService.OPTION.POSITION] = this._getDropdownPosition();
          psOptions[oj.PopupService.OPTION.LAYER_SELECTORS] = 'oj-listbox-drop-layer';
          psOptions[oj.PopupService.OPTION.CUSTOM_ELEMENT] = this.ojContext._IsCustomElement();
          oj.PopupService.getInstance().open(psOptions);

          // move the global id to the correct dropdown
          $('#oj-listbox-drop').removeAttr('id');
          this.dropdown.attr('id', 'oj-listbox-drop');

          var containerId = this.containerId;
          this.dropdown.attr('data-oj-containerid', containerId);
        }

        // show the elements
        this._positionDropdown();

        // /select: accessibility
        this._getActiveContainer().attr('aria-expanded', true);
      },

      // _AbstractOjChoice
      // eslint-disable-next-line no-unused-vars
      close: function (event) {
        if (!this._opened()) {
          return;
        }

        this.container.removeClass('oj-listbox-dropdown-open');

        var dropDownVisible = this._getActiveContainer().attr('aria-expanded');
        delete this.ojContext._resolveSearchBoxLater;

        if (!dropDownVisible || dropDownVisible === 'false') {
          return;
        }

        var cid = this.containerId;
        var scroll = 'scroll.' + cid;
        var resize = 'resize.' + cid;
        var orient = 'orientationchange.' + cid;

        // unbind event listeners
        this.container.parents().add(window).each(function () {
          $(this).off(scroll).off(resize).off(orient);
        }
        );

        this._clearDropdownAlignmentPreference();

        /** @type {!Object.<oj.PopupService.OPTION, ?>} */
        var psOptions = {};
        psOptions[oj.PopupService.OPTION.POPUP] = this.dropdown;
        oj.PopupService.getInstance().close(psOptions);

        if (this.header) {
          // When popup opened header will be shown in the popup.
          // But once it is closed contents of the popup will be removed,
          // but the header should not be detached from the DOM,
          // because knockout binding will be lost. That is why header will be
          // moved under the component container. And when again popup opened
          // it will be added back to the popup.
          this.header.hide();
          this.header.appendTo(this.container); // @HTMLUpdateOK
        }

        this.dropdown.removeAttr('data-oj-containerid');
        this.dropdown.removeAttr('id');

        if (this.opts.list || this.isOjOption) {
          this._removeHighlight();
        } else {
          this.dropdown.detach();
          this.results.empty();
        }

        // /select: accessibility
        this._getActiveContainer().attr('aria-expanded', false);

        if (this._elemNm === 'ojcombobox') {
          this._getActiveContainer().removeAttr('aria-activedescendant');
        }

        //  - press escape after search in select causes select to become unresponsive
        $.removeData(this.container, this._classNm + '-last-term');
      },


      // _AbstractOjChoice
      _setPickerAttributes: function (pickerAttributes) {
        oj.EditableValueUtils.setPickerAttributes(this.dropdown, pickerAttributes);
      },

      // _AbstractOjChoice
      _clearSearch: function () {},

      // _AbstractOjChoice
      _ensureHighlightVisible: function () {
        var results = this.results;
        var children;
        var child;
        var hb;
        var rb;
        var y;
        var more;

        var index = this._highlight();

        if (index < 0) {
          return;
        }

        children = this._findHighlightableChoices();
        child = $(children[index]);
        hb = child.offset().top + child.outerHeight(true);

        // if this is the last child lets also make sure oj-combobox-more-results is visible
        if (index === children.length - 1) {
          more = results.find('li.oj-listbox-more-results');
          if (more.length > 0) {
            hb = more.offset().top + more.outerHeight(true);
          }
        }

        rb = results.offset().top + results.outerHeight(true);
        if (hb > rb) {
          results.scrollTop(results.scrollTop() + (hb - rb));
        }
        y = child.offset().top - results.offset().top;

        // make sure the top of the element is visible
        if (y < 0 && child.css('display') !== 'none') {
          results.scrollTop(results.scrollTop() + y); // y is negative
        }
      },

      // _AbstractOjChoice
      _findHighlightableChoices: function () {
        return this.results.find('.oj-listbox-result-selectable:not(.oj-disabled, .oj-selected)')
                           .filter(function () {
                             return $(this).css('display') !== 'none';
                           });
      },

      // _AbstractOjChoice
      _moveHighlight: function (delta) {
        var choices = this._findHighlightableChoices();
        var index = this._highlight();

        if (this.header && (index <= 0 || index === (choices.length - 1))) {
          var activeDescendant = this._getActiveContainer().attr('aria-activedescendant');
          var isHeaderItem = this._isHeaderItem(activeDescendant);
          if (!isHeaderItem) {
            activeDescendant = null;
          }

          var headerItem = null;
          if (delta > 0 && (index < 0 || index === (choices.length - 1))) {
            headerItem = this._getNextHeaderItem(activeDescendant);
          } else if (delta < 0 && ((isHeaderItem && index < 0) || index === 0)) {
            headerItem = this._getPreviousHeaderItem(activeDescendant);
          }

          if (headerItem) {
            this._removeHighlight();
            this._setFocusOnHeaderItem(headerItem);

            this._getActiveContainer().attr('aria-activedescendant',
              headerItem.attr('id'));

            return;
          } else if (isHeaderItem && delta < 0) {
            index = 0;
          }
        }

        while (index >= -1 && index < choices.length) {
          index += delta;

          // support cycling through the first/last item
          if (index === choices.length) {
            index = 0;
          } else if (index === -1) {
            index = choices.length - 1;
          }

          var choice = $(choices[index]);
          if (choice.hasClass('oj-listbox-result-selectable') && !choice.hasClass('oj-disabled') &&
              !choice.hasClass('oj-selected')) {
            this._highlight(index);
            break;
          }
        }
      },

      // _AbstractOjChoice
      _highlight: function (_index) {
        var index = _index;
        var choices = this._findHighlightableChoices();
        var choice;

        var searchBox = this.dropdown.find('.oj-listbox-search');
        var searchVisible = (searchBox && !searchBox.attr('aria-hidden'));

        if (arguments.length === 0) {
          // If no argumnets passed then currently highlighted
          // option will be returned.
          var curSelected = choices.filter('.oj-hover');
          if (!curSelected.length) {
            curSelected = choices.children('.oj-hover')
              .closest('.oj-listbox-result');
          }
          //  - acc: screenreader not reading ojselect items
          if (searchVisible) {
            this._updateMatchesCount(curSelected.text());
          }
          return choices.get().indexOf(curSelected[0]);
        }

        if (index >= choices.length) {
          index = choices.length - 1;
        }
        if (index < 0) {
          index = 0;
        }

        this._removeHighlight();

        choice = $(choices[index]);

        if (choice.hasClass('oj-listbox-result-with-children')) {
          var sels = choice.children('.oj-listbox-result-label');
          sels.addClass('oj-hover');
          //  - acc: screenreader not reading ojselect items
          if (searchVisible) {
            this._updateMatchesCount(sels.text());
          }
        } else {
          choice.addClass('oj-hover');
          //  - acc: screenreader not reading ojselect items
          if (searchVisible) {
            this._updateMatchesCount(choice.text());
          }
        }

        // ensure assistive technology can determine the active choice
        // /select: accessibility
        this._getActiveContainer().attr('aria-activedescendant',
                                        choice.find('.oj-listbox-result-label').attr('id'));

        this._ensureHighlightVisible();
        return 0;
      },

      // _AbstractOjChoice
      _removeHighlight: function () {
        this.results.find('.oj-hover').removeClass('oj-hover');
        this._removeHighlightFromHeaderItems();

        if (this._elemNm === 'ojcombobox') {
          this._getActiveContainer().removeAttr('aria-activedescendant');
        }
      },

      // _AbstractOjChoice
      _highlightUnderEvent: function (event) {
        var el = $(event.target).closest('.oj-listbox-result-selectable');
        if (el.length > 0 && !el.is('.oj-hover')) {
          var choices = this._findHighlightableChoices();
          this._highlight(choices.index(el));
        } else if (el.length === 0) {
          // if we are over an unselectable item remove all highlights
          this._removeHighlight();
        }
      },

      // _AbstractOjChoice
      _updateMatchesCount: function (translatedString) {
        // write to this liveRegion only when the dropdown message box doesn't exist
        if (!this.dropdown.find('.oj-listbox-filter-message-text').length) {
          var liveRegion = this.container.find('.oj-listbox-liveregion');
          if (liveRegion.length) {
            liveRegion.text(translatedString);
          }
        }
      },

      // _AbstractOjChoice
      _updateResults: function (initial) {
        var search = this.search;
        var self = this;
        var term = search.val();
        var lastTerm = $.data(this.container, this._classNm + '-last-term');

        // prevent duplicate queries against the same term
        // not applying to multi select since user can search the same term after making selection
        // it's ok for single select since the last term will be updated after selection
        if (initial !== true && lastTerm && (term === lastTerm) && this.opts.multiple !== true) {
          return;
        }

        // In IE even for chnage of placeholder fires 'input' event,
        // so in such cases we don't need to query for results.
        if (!lastTerm && !term && initial && initial.type === 'input') {
          return;
        }

        $.data(this.container, this._classNm + '-last-term', term);

        var minLength = this.opts.minLength || 0;
        if (term.length >= minLength) {
          if (this._queryTimer) {
            this._queryTimer.clear();
          }

          if (!initial || initial === true) {
            this._queryResults(initial);
          } else {
            this._queryResolveBusyState = _ComboUtils._addBusyState(this.container, 'query results');
            this._queryTimer = TimerUtils.getTimer(_ComboUtils.DEFAULT_QUERY_DELAY);
            this._queryTimer.getPromise()
              .then(function (completed) {
                if (completed) {
                  self._queryResults(initial);
                }
              })
              .then(this._queryResolveBusyState);
          }
        } else {
          this.close();
        }
      },

      // _AbstractOjChoice
      _queryResults: function (initial) {
        var search = this.search;
        var results = this.results;
        var opts = this.opts;
        var self = this;
        var input;
        var term = search.val();
        // sequence number used to drop out-of-order responses
        var queryNumber = 0;

        var minLength = opts.minLength || 0;
        if (minLength > term.length) {
          this.close();
          return;
        }

        this.open(null, true);


        function postRender() {
          self._positionDropdown();

          if (self.header && self.headerItems.length) {
            var highlightableChoices = self._findHighlightableChoices();
            var totalOptions = self.headerItems.length
              + highlightableChoices.length;

            self.headerItems.attr('aria-setsize', totalOptions);
            if (highlightableChoices.length) {
              var highlightableOptions = highlightableChoices.children("[role='option']");
              highlightableOptions.attr('aria-setsize', totalOptions);
              highlightableOptions.first().attr('aria-posinset', self.headerItems.length + 1);
            }
          }
        }

        this.queryCount += 1;
        queryNumber = this.queryCount;

        this._removeHighlight();
        input = this.search.val();
        if (input !== undefined && input !== null
          && (initial !== true || opts.inputSearch || opts.filterOnOpen === 'rawValue' || opts.minLength > 0)) {
          term = input;
        } else {
          term = '';
        }

        this.resultsPage = 1;

        opts.query(
          {
            element: opts.element,
            term: term,
            page: this.resultsPage,
            context: null,
            matcher: opts.matcher,
            callback: this._bind(function (data) {
              // ignore old responses
              if (queryNumber !== this.queryCount) {
                return;
              }

              // ignore a response if the oj-combobox has been closed before it was received
              if (!this._opened()) {
                return;
              }

              // clear dropdown message if any
              if (!opts.ojContext._hasMore) {
                _ComboUtils.removeDropdownMessage(self.dropdown);
              }

              // save context, if any
              this.context = (!data || data.context === undefined) ? null : data.context;
              // create a default choice and prepend it to the list

              if ((!data
                   || (data.results && data.results.length === 0)
                   || (this._isDataSelected(data) && this.ojContext.isValid()))
                  && _ComboUtils.checkFormatter(self.ojContext,
                                                opts.formatNoMatches,
                                                'formatNoMatches')) {
                var transtr = opts.formatNoMatches(self.ojContext, search.val());
                if (this._classNm === 'oj-select' || this.header) {
                  this._showDropDown();
                  this._preprocessResults(results);

                  postRender();
                  _ComboUtils.addDropdownMessage(self.dropdown, self.ojContext, transtr);

                  // if no search box, don't need a separator
                  if (!this._hasSearchBox()) {
                    var separator = self.dropdown.find('.oj-listbox-filter-message-separator');
                    if (separator.length) {
                      separator.css('display', 'none');
                    }
                  }
                } else {
                  this.close();
                }

                this._updateMatchesCount(transtr);
                return;
              }

              _ComboUtils.saveLastQueryResult(this, data.results);

              this._showDropDown();
              this._preprocessResults(results);

              self.opts.populateResults.call(this, results, data.results,
                {
                  term: search.val(),
                  page: this.resultsPage,
                  context: null,
                  initial: initial
                },
              this._showPlaceholder()
            );
              this._postprocessResults(data, initial);
              postRender();

              this._updateMatchesCount(opts.formatMoreMatches(self.ojContext,
                                      this._findHighlightableChoices().length));
            })
          }
        );
      },

      // _AbstractOjChoice
      _preprocessResults: function (results) {
        if (this.opts.list || this.isOjOption) {
          var resultList = results.children();

          // hide the list items
          this._hideResultList(resultList);
        } else {
          results.empty();
        }
      },

      // _AbstractOjChoice
      _normalizeHighlighterLabel: function (item) {
        var highlighterSection;
        var labelNode;
        if (item.children('div').children('oj-option').length > 0) {
          // The text may be wrapped inside another span with foreach data-bind
          highlighterSection = item.children('div').children('oj-option').find('.oj-listbox-highlighter');
          labelNode = item.children('div').children('oj-option')[0];
        } else {
          highlighterSection = item.children('div').children('.oj-listbox-highlighter');
          labelNode = item.children('div')[0];
        }
        if (highlighterSection.length > 0) {
          for (var i = 0; i < highlighterSection.length; i++) {
            // remove spans
            $(highlighterSection[i].childNodes).unwrap();
          }
          // merge back text nodes
          labelNode.normalize();
        }
      },

      // _AbstractOjChoice
      _hideResultList: function (resultList) {
        for (var i = 0; i < resultList.length; i++) {
          var item = $(resultList[i]);
          if (item.is('LI')) {
            if (item.hasClass('oj-listbox-no-results') ||
                item.hasClass('oj-listbox-placeholder')) {
              item.remove();
            }

            item.css('display', 'none');
            if (item.hasClass('oj-selected')) {
              item.removeClass('oj-selected');
            }

            // remove highlighter section and merge back text nodes
            this._normalizeHighlighterLabel(item);
          }

          var nested;
          if (item.children('oj-optgroup')) {
            nested = item.children('oj-optgroup').children('ul');
          } else {
            nested = item.children('ul');
          }

          if (nested && nested.children()) {
            this._hideResultList(nested.children());
          }
        }
      },

      // _AbstractOjChoice
      _cancel: function (event) {
        this.close(event);
      },

      // _AbstractOjChoice
      _focusSearch: function () {
        _ComboUtils._focus(this, this.search);
      },

      // _AbstractOjChoice
      _selectHighlighted: function (_options, event) {
        var options = _options;
        if (this.header) {
          var activeDescendant = this._getActiveContainer().attr('aria-activedescendant');
          if (this._isHeaderItem(activeDescendant)) {
            // There can be clickable elements in the custom header and
            // which can also be selected through UP/DOWN arrow keys.
            // When such header elements selected through keyboard
            // they should work as if they have clicked.
            // That is why simulating the click on header options.

            var activeItem = $('#' + activeDescendant);
            var selector = 'a, input, select, textarea, button, object';
            var clickable = activeItem.find(selector).first();
            if (clickable.length === 0) {
              clickable = activeItem.children();
            }
            if (clickable.length) {
              clickable[0].click();
            }

            this.close(event);
            return;
          }
        }

        var index = this._highlight();
        var highlighted = this.results.find('.oj-hover');
        var data = highlighted.closest('.oj-listbox-result').data(this._elemNm);

        if (data) {
          this._highlight(index);

          var previousValue = this.getVal();
          options = options || {};
          options.trigger = _ComboUtils.ValueChangeTriggerTypes.OPTION_SELECTED;

          this._onSelect(data, options, event);
          this._triggerUpdateEvent(data, options, event);
          this._triggerValueUpdatedEvent(data, previousValue);

          if (event && event.type === 'keydown') {
            // This flag will be used in "keyup" event handler to avoid
            // the re-process of the event.
            this.enterKeyEventHandled = true;
          }
        } else if (options && options.noFocus) {
          this.close(event);
        }
      },

      // _AbstractOjChoice
      _getPlaceholder: function () {
        return this.opts.element.attr('placeholder') ||
        this.opts.element.attr('data-placeholder') || // jquery 1.4 compat
        this.opts.element.data('placeholder') ||
        this.opts.placeholder;
      },

      // _AbstractOjChoice
      _setPlaceholder: function () {
        var placeholder = this._getPlaceholder();

        if (!placeholder) {
          return;
        }
        // placeholder text of selectMany is in the <li> of this.selection
        if (this.ojContext.multiple && this._classNm === 'oj-select') {
          var defLi = this.selection.find('.oj-select-default');
          defLi.text(placeholder);
        } else {
          this.search.attr('placeholder', placeholder);
        }
      },

      // _AbstractOjChoice
      _initContainerWidth: function () {
        function resolveContainerWidth() {
          var style;
          var attrs;
          var matches;
          var i;
          var l;
          var attr;

          // check if there is inline style on the element that contains width
          style = this._getAttribute('style');
          if (style !== undefined && style !== null) {
            attrs = style.split(';');
            for (i = 0, l = attrs.length; i < l; i++) {
              attr = attrs[i].replace(/\s/g, ''); // @HTMLUpdateOK
              matches = attr.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i);
              if (matches !== null && matches.length >= 1) {
                return matches[1];
              }
            }
          }
          return null;
        }

        var width = resolveContainerWidth.call(this);
        if (width !== null) {
          this.container.css('width', width);
        }
      },

      //  - selected value got replaced once the label for initial value is available
      valHasChanged: function () {
        var container = this.container;

        if (_ComboUtils.duringFetchByKey(container)) {
          _ComboUtils.setValueChanged(this.ojContext, true);
          // remove loading indicator
          var spinnerContainer = this.selection;
          if (spinnerContainer._saveLoadingIndicator && !this.ojContext.multiple) {
            _ComboUtils.removeLoadingIndicator(spinnerContainer);
          }
        }
      },

      // _AbstractOjChoice
      getVal: function () {
        return this.ojContext.option('value');
      },


      // _AbstractOjChoice
      // /pass original event
      setVal: function (val, event, context) {
        //  - selected value got replaced once the label for initial value is available
        this.valHasChanged();

        var options = { doValueChangeCheck: false };
        if (context) {
          options._context = context;
        }

        //  - need to be asble to specify the initial value of select components bound to dprv
        var multiple = this.ojContext.multiple;
        if (!this._skipSetValueOptions) {
          //  - resetting value when value-option and placeholder are set throws exception
          if (_ComboUtils.isValueForPlaceholder(multiple, val) && this._getPlaceholder() !== null) {
            this.setValOpts(_ComboUtils.getFixupValueOptionsForPlaceholder(multiple));
          } else {
            var queryResult = _ComboUtils.getLastQueryResult(this);
            var match;

            if (queryResult) {
              if (multiple) {
                match = _ComboUtils.findOptions(queryResult, val);
              } else {
                match = _ComboUtils.findOption(queryResult, val);
              }
            }
            // set valueOption
            if (match) {
              // clone valueOption otherwise it will not trigger change event
              this.setValOpts(match);
            } else if (this._classNm === 'oj-combobox') {
              // new entry?
              this.ojContext._resolveValueOptionsLater =
                _ComboUtils.findOption(this.getValOpts(), val) != null;
            } else {
              this.ojContext._resolveValueOptionsLater = true;
            }
          }
        }

        // Fix  - CUSTOM MESSAGES ARE BEING CLEARED WHEN THE VALUE DOESN'T CHANGE
        // If the value has not changed, bypass the call to _SetValue method in EditableValue.
        // Because we don't have to set the value again in EditableValue.
        var previousVal = this.getVal();
        if (!Array.isArray(val) && !this.ojContext._IsCustomElement()) {
          //  - select needs implementation fixes...
          // 1. _SetValue() compares the value passed in to the last saved display value. This is
          // from ADF and is useful for comparing display values for inputs but since combo sets an
          // array, this check is not needed.
          // 2. To bypass the check call this method when the value has changed and with the
          // additional parameter.
          if (!oj.Object.compareValues(previousVal, [val])) {
            this.ojContext._SetValue([val], event, options);
          }
        } else if (!oj.Object.compareValues(previousVal, val)) {
          //  - select needs implementation fixes...
          this.ojContext._SetValue(val, event, options);
        }
      },

      getValOpts: function () {
        var ojContext = this.ojContext;
        return ojContext.multiple ?
          ojContext.option('valueOptions') : ojContext.option('valueOption');
      },

      setValOpts: function (valOpts) {
        var ojContext = this.ojContext;
        var multiple = ojContext.multiple;
        var fixupValOpts = _ComboUtils.getFixupValueOptionsForPlaceholder(multiple);
        var oldValOpts = multiple ? ojContext.options.valueOptions : ojContext.options.valueOption;

        // dont fire option change event if the valueOption(s) already represents a placeholder
        if (_ComboUtils.isValueOptionsForPlaceholder(multiple, valOpts) &&
            _ComboUtils.isValueOptionsForPlaceholder(multiple, oldValOpts) &&
            _ComboUtils.isPlaceholderSpecified(ojContext.options)) {
          if (multiple) {
            ojContext.options.valueOptions = fixupValOpts;
          } else {
            ojContext.options.valueOption = fixupValOpts;
          }
        } else if (!oj.Object.compareValues(valOpts, this.getValOpts())) {
          _ComboUtils.setValueOptions(ojContext, valOpts);
        }
        if (multiple) {
          this.opts.valueOptions = valOpts;
        } else {
          this.opts.valueOption = valOpts;
        }
      },

      // _AbstractOjChoice
      // eslint-disable-next-line no-unused-vars
      _triggerUpdateEvent: function (val, context, event) {
        // This method is overridden in OjInputSeachContainer to fire the
        // "update" event. As this event is relevant for only ojInputSearch,
        // there is no default implementation.
      },

      // _AbstractOjChoice
      // eslint-disable-next-line no-unused-vars
      _triggerValueUpdatedEvent: function (data, previousValue) {
        // This method is overridden in OjSingleCombobox to fire the
        // "ojValueUpdated" custom event. As this event is relevant for only oj-combobox-one,
        // there is no default implementation.
      },

      // _AbstractOjChoice
      // /ojselect placeholder
      _showPlaceholder: function () {
        return false;
      },

      // _AbstractOjChoice
      // select: accessibility
      _getActiveContainer: function () {
        return this.search;
      },

      // _AbstractOjChoice
      _getAttribute: function (id) {
        return this.opts.ojContext._IsCustomElement() ?
               this.opts.ojContext.OuterWrapper.getAttribute(id) :
               this.opts.element.attr(id);
      },

      // _AbstractOjChoice
      _showSearchBox: function (searchText) {
        var focusOnSearchBox = false;
        var searchBox = this.dropdown.find('.oj-listbox-search');
        if (searchBox) {
          // hide and show the search box
          if (this._hasSearchBox()) {
            this.dropdown.find('.oj-listbox-search-wrapper')
              .removeClass('oj-helper-hidden-accessible');

            $(searchBox).removeAttr('aria-hidden');
            this.search.val(searchText);
            focusOnSearchBox = true;
          } else {
            this.dropdown.find('.oj-listbox-search-wrapper')
              .addClass('oj-helper-hidden-accessible');

            $(searchBox).attr('aria-hidden', 'true');
          }
        }

        // if search box is being displayed, focus on the search box otherwise focus on the select box
        _ComboUtils._focus(this, focusOnSearchBox ? this.search : this.selection);

        // /disable "click" on spyglass
        if (focusOnSearchBox) {
          var self = this;
          searchBox.find('.oj-listbox-spyglass-box').on('mouseup click', function (e) {
            self.search.focus();
            //  - select and combobox stop keyboard event propegation
            e.preventDefault();
          });
        }
      },

      // _AbstractOjChoice
      _hasSearchBox: function () {
        if (this._userTyping) {
          return true;
        }

        var threshold = this.opts.minimumResultsForSearch;
        var len;
        if (this.opts.list) {
          len = $('#' + this.opts.list).find('li').length;
        } else if (_ComboUtils.isDataProvider(this.opts.options)) {
          //  - search not shown before typing a character
          // in case of dataProvider and if data is not available,
          // return true temporary, but resolve later when data is ready

          if (this.ojContext._resultCount === undefined) {
            len = threshold + 1;
            this.ojContext._resolveSearchBoxLater = true;
          } else {
            len = this.ojContext._resultCount;
            delete this.ojContext._resolveSearchBoxLater;
          }
        } else if (this.datalist) {
          if (this.ojContext._IsCustomElement()) {
            // get the count of oj-options
            len = this.datalist.children().find('oj-option').length;
          } else {
            // get the length from the select options
            len = this.datalist[0].length;
          }
        } else if (this.opts.options) {
          len = this.opts.options.length;
        }
        return len > threshold;
      },

      // eslint-disable-next-line no-unused-vars
      _isDataSelected: function (data) {
        return false;
      },

      _findItem: function (list, value) {
        for (var i = 0; i < list.length; i++) {
          if ($(list[i]).data(this._elemNm).value === value) {
            return list[i];
          }
        }
        return null;
      }

    });

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * @preserve Copyright 2012 Igor Vaynberg
 *
 * This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
 * General Public License version 2 (the "GPL License"). You may choose either license to govern your
 * use of this software only upon the condition that you accept all of the terms of either the Apache
 * License or the GPL License.
 *
 * You may obtain a copy of the Apache License and the GPL License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
 * the specific language governing permissions and limitations under the Apache License and the GPL License.
 */

/* global _ComboUtils:false, _AbstractOjChoice:false, Logger:false */

/**
 * @private
 */
var _AbstractSingleChoice = _ComboUtils.clazz(_AbstractOjChoice,
  {
    // _AbstractSingleChoice
    _enableInterface: function () {
      if (_AbstractSingleChoice.superclass._enableInterface.apply(this, arguments)) {
        this.search.prop('disabled', !(this._isInterfaceEnabled() || _ComboUtils.isReadonly(this.ojContext)));
      }
    },

    // _AbstractSingleChoice
    _focus: function () {
      if (this._opened()) {
        this.close();
      }
    },

    // _AbstractSingleChoice
    _destroy: function () {
      $("label[for='" + this.search.attr('id') + "']")
        .attr('for', this.opts.element.attr('id'));
      _AbstractSingleChoice.superclass._destroy.apply(this, arguments);
    },

      // _AbstractSingleChoice
    _clear: function (event) {
      var data = this.selection.data(this._elemNm);
      if (data) {
        // guard against queued quick consecutive clicks

        // This method will be invoked with or without event but 'data' will be null when it is invoked without event.
        // This logic is intended to clear the existing value when user manualy removes text in placeholder input box(which only happens for Combobox).
        // Ideally we should pass event, when we invoke _SetValue() if it is invoked on a UI action. So adding a warning message if event is null.
        if (!event) {
          Logger.warn('Event should not be null when user modified the value in UI');
        }

        //  - error 'value is required' is shown even though it has a value
        // only clear value when it's not "select" and "required"
        var emptyVal = this.ojContext._IsCustomElement() ? '' : [];

        if (this._classNm !== 'oj-select' || !this.ojContext._IsRequired()) {
          this.setVal(emptyVal, event);
        }

        this.search.val('');
        this.selection.removeData(this._elemNm);
      }
      this._setPlaceholder();
    },

    // _AbstractSingleChoice
    _initSelection: function () {
      //  - need to be able to specify the initial value of select components bound to dprv
      if (!_ComboUtils.applyValueOptions(this, this.opts)) {
        var element = this.datalist ? this.datalist : this.opts.element;
        this.opts.initSelection.call(null, element, this._bind(this._updateSelectedOption));
      }
    },

    // _AbstractSingleChoice
    _containerKeydownHandler: function (e) {
      if (!this._isInterfaceEnabled()) {
        return;
      }

      if (e.which === _ComboUtils.KEY.PAGE_UP || e.which === _ComboUtils.KEY.PAGE_DOWN) {
          // prevent the page from scrolling
        e.preventDefault();
        return;
      }

      switch (e.which) {
        case _ComboUtils.KEY.UP:
        case _ComboUtils.KEY.DOWN:
          if (this._opened()) {
            this._moveHighlight((e.which === _ComboUtils.KEY.UP) ? -1 : 1);
          } else {
            this.open(e);
          }
          //  - select and combobox stop keyboard event propegation
          e.preventDefault();
          return;

        case _ComboUtils.KEY.ENTER:
          // Fix :  PRESSING 'ENTER' WITHIN DROPDOWN SHOULD NOT PROPAGATE
          if (this._opened()) {
            e.stopPropagation();
          }
          this._selectHighlighted(null, e);
          //  - select and combobox stop keyboard event propegation
          e.preventDefault();
          if (!this._opened()) {
            this._userTyping = false;
          }
          return;

        case _ComboUtils.KEY.TAB:
          this.close(e);
          this._userTyping = false;
          return;

        case _ComboUtils.KEY.ESC:
          if (this._opened()) {
            this._cancel(e);
            // prevent the page from scrolling
            e.preventDefault();
          }
          this._userTyping = false;
          return;

        default:
          break;
      }

      // /ojselect: used by select
      this._userTyping = true;
    },

    // _AbstractSingleChoice
    _containerKeyupHandler: function (e) {
      if (this._isInterfaceEnabled()) {
        if (!this._opened()) {
          this.open(e);
        }
      }
    },

    // _AbstractSingleChoice
    _initContainer: function () {
      var container = this.container;

      //  - ojselect id attribute on oj-select-choice div is not meaningful
      var rootAttr = this.opts.rootAttributes;
      var idSuffix = (rootAttr && rootAttr.id) ?
          rootAttr.id :
          (this._getAttribute('id') || _ComboUtils.nextUid());

      var selection = container.find('.' + this._classNm + '-choice');
      this.selection = selection;
      //  - ojselect missing id attribute on oj-select-choice div
      selection.attr('id', this._classNm + '-choice-' + idSuffix);

      // add aria associations
      selection.find('.' + this._classNm + '-input').attr('id', this._classNm + '-input-' + idSuffix);
      if (!this.results.attr('id')) {
        this.results.attr('id', 'oj-listbox-results-' + idSuffix);
      }

      var liveRegion = container.find('.oj-listbox-liveregion');
      if (liveRegion.length) {
        liveRegion.attr('id', 'oj-listbox-live-' + idSuffix);
      }
      //  - Accessibility : JAWS does not read aria-controls attribute set on ojselect
      if (this._classNm !== 'oj-select') {
        this.search.attr('aria-owns', this.results.attr('id'));
      }

      if (!this.ojContext._IsCustomElement()) {
        var elementLabel = $("label[for='" + this._getAttribute('id') + "']");
        if (!elementLabel.attr('id')) {
          elementLabel.attr('id', this._classNm + '-label-' + idSuffix);
        }
        this.search.attr('aria-labelledby', elementLabel.attr('id'));
        this.opts.element.attr('aria-labelledby', elementLabel.attr('id'));
        if (this.search.attr('id')) {
          elementLabel.attr('for', this.search.attr('id'));
        }
      }

      if (this._getAttribute('aria-label')) {
        this.search.attr('aria-label', this._getAttribute('aria-label'));
      }

      if (this._getAttribute('aria-controls')) {
        this.search.attr('aria-controls', this._getAttribute('aria-controls'));
      }

      selection.on('keydown', this._bind(this._containerKeydownHandler));
      // selection.on("keyup-change input", this._bind(this._containerKeyupHandler));

      selection.on('mousedown', this._bind(function (e) {
        // if the mousedown target is the end slot, do nothing
        if (e.target.getAttribute('slot') === 'end' || $(this._endSlot).find(e.target).length > 0) {
          return;
        }
        // /prevent user from focusing on disabled select
        if (this.opts.element.prop('disabled')) {
          _ComboUtils.killEvent(e);
        }

        // if select box gets focus ring via keyboard event previously, clear it now
        selection.removeClass('oj-focus-highlight');

        if (this._opened()) {
          this.close(e);
        } else if (this._isInterfaceEnabled()) {
          this.open(e);
        }

        //  - keyboard flashes briefly on ios.
        var hidden = this.search.parent().attr('aria-hidden');
        if (hidden && hidden === 'true') {
          this.selection.focus();
        } else {
          this.search.focus();
        }

            // prevent focus move back
        if ($(e.target).hasClass('oj-combobox-open-icon')) {
          _ComboUtils.killEvent(e);
        }

        this.container.addClass('oj-active');
      }));

      selection.on('mouseup', this._bind(function () {
        this.container.removeClass('oj-active');
      }));

      selection.on('focus', this._bind(function (e) {
        _ComboUtils.killEvent(e);
      }));

      this.search.on('compositionstart', this._bind(function () {
        // See _isComposing in InputBase for comments on what this does
        this.ojContext._isComposing = true;
      }));

      this.search.on('compositionend', this._bind(function (e) {
        this.ojContext._isComposing = false;
        this.ojContext._SetRawValue(this.search.val(), e);
      }));

      this.search.on('input', this._bind(function (e) {
        if (!this.ojContext._isComposing) {
          this.ojContext._SetRawValue(this.search.val(), e);
        }
      }));

      this.search.on('focus', this._bind(function () {
        this._previousDisplayValue = this.search.val();
      }));

      this.search.on('blur keyup', this._bind(function (e) {
        if (e.type === 'keyup' && e.keyCode !== 10 && e.keyCode !== 13) {
          return;
        }

        if (this.search.val() !== undefined && this.results.find('.oj-hover').length <= 0
            && (e.type !== 'keyup' || !this.enterKeyEventHandled)) {
          // Call _onSelect if no previous data and there is typed in text
          // or the previous data is different from typed in text
          if (this.opts.manageNewEntry) {
            var value = this.search.val();
            var valopt = this.opts.manageNewEntry(value);

            var trigger = e.type === 'blur'
                  ? _ComboUtils.ValueChangeTriggerTypes.BLUR
                  : _ComboUtils.ValueChangeTriggerTypes.ENTER_PRESSED;
            var options = {
              trigger: trigger
            };

            var selectionData = this.selection.data(this._elemNm);
            var previousValue = this.getVal();

            if ((!selectionData && value !== '')
                    || (selectionData && (selectionData.label !== value))
                    || (!this.ojContext.isValid() && value !== this._previousDisplayValue)) {
              this._onSelect(valopt, options, e);

              if (e.type !== 'blur') {
                this._triggerUpdateEvent(valopt, options, e);
                this._triggerValueUpdatedEvent(valopt, previousValue);
              }
            } else if (e.type === 'keyup') {
              // if the value stays the same, we still want to fire valueUpdated event to support search use cases
              if (selectionData && selectionData.label === value) {
                valopt = selectionData;
              }

              this._triggerUpdateEvent(valopt, options, e);
              this._triggerValueUpdatedEvent(valopt, previousValue);
            }
          } else if (this.opts.manageNewEntry == null) {
            var data = this.selection.data(this._elemNm);
            if (this.search.val() === '') {
              if (this._classNm !== 'oj-select') {
                this._clear(e);
              }
            } else if (!data && this.search.val() !== '') {
              this._clearSearch();
            } else if (this._classNm !== 'oj-select') {
              //  - typing in search text & pressing enter, changes user entered search text
              var formatted = this.opts.formatSelection(data);
              if (formatted !== undefined) {
                this.search.val(formatted);
              }
            }
          }
        }
        this.search.removeClass(this._classNm + '-focused');
        this.container.removeClass('oj-focus');

        // Clearing the flag which is set while processing the keydown event
        // in _selectHighlighted() method.
        this.enterKeyEventHandled = false;
      }
          ));

      this._initContainerWidth();

      this.opts.element.hide().attr('aria-hidden', true);
      this.container.append(this.opts.element); // @HTMLUpdateOK

      this._setPlaceholder();
    },

    // _AbstractSingleChoice
    _prepareOpts: function () {
      var opts = _AbstractSingleChoice.superclass._prepareOpts.apply(this, arguments);
      var self = this;

      // /ojselect set initial selected value
      var tagName = opts.element.get(0).tagName.toLowerCase();
      if ((tagName === 'input' && opts.element.attr('list')) ||
          (tagName === 'select' && opts.element.children().length > 0) ||
          (opts.ojContext._IsCustomElement() && !opts.options) ||
          opts.list) {
        var eleName = opts.list ? 'li' : 'option';

        if (opts.ojContext._IsCustomElement()) {
          eleName = 'oj-option';
        }

        // install the selection initializer
        opts.initSelection = function (element, callback) {
          var selected;
          var value = self.getVal();
          if (Array.isArray(value) && !opts.ojContext._IsCustomElement()) {
            value = value[0];
          }

          if (value !== undefined && value !== null) {
            selected = self._optionToData(element.find(eleName).filter(function () {
              var elemValue;
              if (eleName === 'li') {
                elemValue = this.getAttribute('oj-data-value');
              } else if (eleName === 'option' || eleName === 'oj-option') {
                elemValue = this.value;
              }

              return oj.Object.compareValues(elemValue, value);
            }
                ));

            //  - select list behaves differently when using options attribute vs options tag
            if (tagName === 'select' && selected === undefined) {
              value = null;
            }
          }
          if (value === undefined || value === null) {
            selected = self._optionToData(element.find(eleName).filter(function () {
              if (eleName === 'li') {
                return this.getAttribute('oj-data-selected') === true;
              } else if (eleName === 'option') {
                return this.selected;
              }
              return false;
            }));
                // set first oj-option for oj-select
            if (self._classNm === 'oj-select' && selected === undefined
                && opts.ojContext._IsCustomElement()) {
              selected = self._optionToData($(element.find(eleName)[0]));
              oj.Logger.info('Select identified by ' + self.container.attr('id') +
                ' defaults to first option because the value is not set.');
            }
          }
          callback(selected);
        };

        //  - ojselect should ignore the invalid value set programmatically
        opts.validate = function (element, value) {
          var selected;

          if (value !== undefined && value !== null) {
            selected = self._optionToData(element.find(eleName).filter(function () {
              var elemValue;
              if (eleName === 'li') {
                elemValue = this.getAttribute('oj-data-value');
              } else if (eleName === 'option' || eleName === 'oj-option') {
                elemValue = this.value;
              }

              return oj.Object.compareValues(elemValue, value);
            }));
          }

          return !!selected;
        };
      } else if ('options' in opts || (this.getVal() && this.getVal().length > 0)) {
        if (_ComboUtils.isDataProvider(opts.options) ||
              $.isFunction(opts.options)) {
          // install default initSelection when applied to hidden input
          // and getting data from remote
          opts.initSelection = function (element, callback) {
            var findOption = function (results, optionValue) {
              for (var i = 0, l = results.length; i < l; i++) {
                var result = results[i];
                if (oj.Object.compareValues(optionValue, opts.id(result))) {
                  return result;
                }

                if (result.children) {
                  var found = findOption(result.children, optionValue);
                  if (found) {
                    return found;
                  }
                }
              }

              return null;
            };

            var id = self._getValueItem();
            var match = null;
            if (!id) {
              var optionsKeys = self.ojContext.options.optionsKeys;
              if ((tagName === 'select') && !self.ojContext._HasPlaceholderSet() &&
                  (!optionsKeys || (!optionsKeys.value && !optionsKeys.label))) {
                _ComboUtils.fetchFirstBlockFromDataProvider(self.container, opts, 1).then(
                  function (data) {
                    if (data && data.length > 0) {
                      callback(data[0]);
                      oj.Logger.info('Select identified by ' + self.container.attr('id') +
                        ' defaults to first option because the value is not set.');
                    }
                  });
              } else {
                callback(match);
              }
              return;
            }

            // This data will be saved after querying the options.
            var queryResult = _ComboUtils.getLastQueryResult(self);
            if (queryResult) {
              match = findOption(queryResult, id);
            }

            if (!match) {
              // currentItem will hold the selected object with value and label.
              // Which updated everytime value is changed.
              var currentItem = self.currentItem;
              if (currentItem && currentItem.length
                  && oj.Object.compareValues(id, opts.id(currentItem[0]))) {
                match = currentItem[0];
                oj.Logger.info('Select identified by ' + self.container.attr('id') +
                  ' defaults to first option due to invalid value.');
              }
            }

            // valueChangeTrigger will have one of the values from
            // _ComboUtils._ValueChangeTriggerTypes, which represents the
            // what triggered the value change. But if value is programmatically
            // updated this will be null. So if valueChangeTrigger is null
            // querying for the options again as component will not have list
            // of options in case value is updated programmatically.
            if (!match && !self.valueChangeTrigger) {
              opts.query(
                {
                  value: [id],
                  callback: !$.isFunction(callback) ? $.noop : function (qryResult) {
                    //  - While fetching the label for the initial value,
                    // user can still interact the component and pick a new value.
                    if (!_ComboUtils.isDataProvider(opts.options) ||
                        (oj.Object.compareValues(id, self.getVal()) &&
                         !_ComboUtils.isValueChanged(self.ojContext))) {
                      if (qryResult && qryResult.results) {
                        match = findOption(qryResult.results, id);
                      }
                      callback(match);
                      _ComboUtils.setValueChanged(self.ojContext, undefined);
                    }
                  }
                });
            } else {
              callback(match);
            }
          };
        } else {
          // install default initSelection when applied to hidden input and data is local
          //  - ojselect does not display selected value
          opts.initSelection = function (element, callback) {
            var id = self._getValueItem();
            // search in data by id, storing the actual matching item
            // var first = null;
            //  - ojselect - validator error message is not shown
            // initialize first = placeholder if we have a placeholder and select value is not required
            var usePlaceholder = (tagName === 'select') &&
                                   self.ojContext._HasPlaceholderSet() &&
                                   !self.ojContext._IsRequired();
            var first = usePlaceholder ? self._getPlaceholder() : null;

            var match = null;
            opts.query(
              {
                matcher: function (term, text, el) {
                  var isMatch = oj.Object.compareValues(id, opts.id(el));
                  if (isMatch) {
                    match = el;
                  }
                  // /ojselect save the 1st option
                  if (first == null) {
                    first = el;
                  }
                  return isMatch;
                },
                callback: !$.isFunction(callback) ? $.noop : function () {
                  // ojselect if no match, pick the 1st option
                  // If the option data is pending, don't send the placeholder to the callback
                  // so the value won't be nulled out
                  if (!match && tagName === 'select' && !self.ojContext._isOptionDataPending()) {
                    match = first;
                    oj.Logger.info('Select identified by ' + self.container.attr('id') +
                      ' defaults to ' + (usePlaceholder ? 'placeholder' : 'first option') + ' due to invalid value.');
                  }
                  callback(match);
                }
              }
              );
          };

          //  - ojselect should ignore the invalid value set programmatically
          opts.validate = function (element, value) {
            var id = value;

            // search in data by id, storing the actual matching item
            var match = null;
            opts.query(
              {
                matcher: function (term, text, el) {
                  var isMatch = oj.Object.compareValues(id, opts.id(el));
                  if (isMatch) {
                    match = el;
                  }
                  return isMatch;
                },
                callback: $.noop
              }
              );

            return !!match;
          };
        }
      }
      return opts;
    },

    // _AbstractSingleChoice
    _postprocessResults: function (data, initial, noHighlightUpdate) {
      var selected = -1;
      var self = this;
      var highlightableChoices;

      highlightableChoices = this._findHighlightableChoices();
      _ComboUtils.each2(highlightableChoices, function (i, elm) {
        var valueItem = self._getValueItem();

        if (valueItem && oj.Object.compareValues(valueItem, self.id(elm.data(self._elemNm)))) {
          selected = i;
          return false;
        }
        return true;
      }
        );

      // and highlight it
      if (noHighlightUpdate !== false) {
        if (initial === true && selected >= 0) {
          this._highlight(selected);
        }
      }
    },

    // _AbstractSingleChoice
    // /pass original event
    _onSelect: function (data, options, event) {
      if (!this._triggerSelect(data)) {
        return;
      }

      var context;
      if (options && options.trigger) {
        context = {
          optionMetadata: {
            trigger: options.trigger
          }
        };
      }

      // var old = this.getVal()? this.getVal()[0] : null;
      // selection will be updated after _SetValue is called
      // this._updateSelection(data);
      this.close(event);
      // When there is validation error, the value option may retain the previous value
      // although the display value is different. In that case, user should be able to still
      // select the previous valid value to get rid off the invalid style and message.
      /* if (!(old === this.id(data)))*/
      var val;
      var valopt = data;
      if (this.id(data).length === 0) {
        val = this.ojContext._IsCustomElement() ? _ComboUtils.getValueForPlaceholder(false) : [];
        valopt = _ComboUtils.getFixupValueOptionsForPlaceholder(false);
      } else {
        val = this.id(data);
      }
      // setValueOptions before setVal so that new entry already in valueOption.
      // this is to avoid looking for new entry on the dataProvider
      if (this._classNm === 'oj-combobox') {
        this._skipSetValueOptions = true;
          //  - oj.tests.input.combobox.testcombobox display value mismatch automation failure
        this.setValOpts(_ComboUtils.findOptionFromResult(this, val, valopt));
      }
      this.setVal(val, event, context);
      this._skipSetValueOptions = false;
      if (event.type !== 'blur') {
        this._focusSearch();
      }
    },

    // _AbstractSingleChoice
    _clearSearch: function () {
      this.search.val('');
    },

    // _AbstractSingleChoice
    _getValueItem: function () {
      var valueItem = null;
      var val = this.getVal();

      // value supports any type including boolean, so a simple if (val) check will not work
      if (val !== null && val !== undefined) {
        if (!this.ojContext._IsCustomElement() && val.length) {
          valueItem = val[0];
        } else {
          valueItem = val;
        }
      }
      return valueItem;
    }

  }
    );


/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * @preserve Copyright 2012 Igor Vaynberg
 *
 * This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
 * General Public License version 2 (the "GPL License"). You may choose either license to govern your
 * use of this software only upon the condition that you accept all of the terms of either the Apache
 * License or the GPL License.
 *
 * You may obtain a copy of the Apache License and the GPL License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
 * the specific language governing permissions and limitations under the Apache License and the GPL License.
 */

/* global _ComboUtils:false, _AbstractSingleChoice:false */

/**
 * @private
 */
  var _OjSingleCombobox = _ComboUtils.clazz(_AbstractSingleChoice,
    {
      _elemNm: 'ojcombobox',
      _classNm: 'oj-combobox',

      _createContainer: function () {
        var container = $(document.createElement('div')).attr(
          {
            class: 'oj-combobox oj-component'
          }
          ).html([ // @HTMLUpdateOK
            "<div class='oj-combobox-choice' tabindex='-1' role='presentation'>",
            "   <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off'",
            "       spellcheck='false' class='oj-combobox-input' role='combobox' aria-expanded='false' aria-autocomplete='list' />",
            "   <abbr class='oj-combobox-clear-entry' role='presentation'></abbr>",
            "   <span class='oj-combobox-divider' role='presentation'></span>",
            "   <a class='oj-combobox-arrow oj-combobox-icon oj-component-icon oj-clickable-icon-nocontext oj-combobox-open-icon'",
            "       role='button' aria-label='expand'></a>",
            '</div>',
            "<div class='oj-listbox-drop' role='presentation'>",
            "   <ul class='oj-listbox-results' role='listbox'>",
            '   </ul>',
            '</div>',

            "<div role='region' class='oj-helper-hidden-accessible oj-listbox-liveregion' aria-live='polite'></div>"

          ].join('')); // @HTMLUpdateOK

        // if end slot is provided, use the slot instead
        if (this.ojContext._IsCustomElement()) {
          var slotMap = oj.BaseCustomElementBridge.getSlotMap(this.ojContext.OuterWrapper);
          var endSlot = slotMap.end;

          if (endSlot) {
            // remove the divider
            container.find('.oj-combobox-divider').remove();
            // remove the default arrow anchor
            container.find('.oj-combobox-arrow').remove();
            // append the slot at the end
            container.find('.oj-combobox-choice').append(endSlot); // @HTMLUpdateOK

            this._endSlot = endSlot;
          }
        }

        return container;
      },

      _triggerValueUpdatedEvent: function (data, previousValue) {
        if (!this.ojContext._IsCustomElement()) {
          return;
        }

        var value = this.id(data);
        if (value === undefined || value === null) {
          // If the value is entered by user (not by selecting an option) then
          // only 'label' will be present in the data object.
          value = data.label ? data.label : '';
        }

        if (!this.ojContext.isValid()) {
          return;
        }

        var detail = {};
        var element = this.ojContext.OuterWrapper;

        detail.value = value;
        detail.previousValue = previousValue;

        var eventName = 'ojValueUpdated';
        var valueUpdatedEvent = new CustomEvent(eventName, { detail: detail });
        element.dispatchEvent(valueUpdatedEvent);
      },

      // eslint-disable-next-line no-unused-vars
      _enable: function (enabled) {
        _OjSingleCombobox.superclass._enable.apply(this, arguments);

        if (this._enabled) {
          this.container.find('.oj-combobox-arrow').removeClass('oj-disabled');
        } else {
          this.container.find('.oj-combobox-arrow').addClass('oj-disabled');
        }
      },

      // eslint-disable-next-line no-unused-vars
      close: function (event) {
        if (!this._opened()) {
          return;
        }
        _OjSingleCombobox.superclass.close.apply(this, arguments);
      },

      _opening: function (event, dontUpdateResults) {
        // if beforeExpand is not cancelled
        _OjSingleCombobox.superclass._opening.apply(this, arguments);

        if (!dontUpdateResults) {
          this._updateResults(true);
        }
      },

      _containerKeydownHandler: function (e) {
        // If oj-button is used in the end slot, let the button handle the key down event
        if (e.target.getAttribute('slot') === 'end' || $(this._endSlot).find(e.target).length > 0) {
          return;
        }
        // /ignore control key and function key
        if (_ComboUtils.KEY.isControl(e) || _ComboUtils.KEY.isFunctionKey(e)) {
          return;
        }

        _OjSingleCombobox.superclass._containerKeydownHandler.apply(this, arguments);
      },

      _updateSelection: function (data) {
        var formatted;

        var item = [];
        this.selection.data(this._elemNm, data);
        if (data !== null && data.length !== 0) {
          formatted = this.opts.formatSelection(data);
          if (formatted !== undefined && this.search.val() !== formatted) {
            this.search.val(formatted);
          }
          this.search.removeClass(this._classNm + '-default');

          item.push(data);
        } else {
          // data will be null only when user set it programmatically.
          this.search.val('');
          this._setPlaceholder();
        }

        // Storing this data so that it will be used when setting the display value.
        this.currentItem = item;
      },

      _updateSelectedOption: function (selected) {
        if (selected !== undefined && selected !== null) {
          this._updateSelection(selected);
          //  - need to be able to specify the initial value of select components bound to dprv
          this.setValOpts(selected);
        } else {
          // if we found no match, update the selection with the value
          var value = this.getVal();
          var data;
          if (!value) {
            data = null;
          } else if (!Array.isArray(value)) {
            data = { label: value };
          } else if (value.length) {
            data = { label: value[0] };
          } else {
            data = null;
          }
          this._updateSelection(data);
          // if value is a new entry
          if (!selected && value) {
            this.setValOpts({
              value: value,
              label: _ComboUtils.getLabel({ value: value })
            });
          } else {
            this.setValOpts(selected);
          }
        }
      }
    });

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * @preserve Copyright 2012 Igor Vaynberg
 *
 * This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
 * General Public License version 2 (the "GPL License"). You may choose either license to govern your
 * use of this software only upon the condition that you accept all of the terms of either the Apache
 * License or the GPL License.
 *
 * You may obtain a copy of the Apache License and the GPL License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
 * the specific language governing permissions and limitations under the Apache License and the GPL License.
 */

/* global _ComboUtils:false, _AbstractSingleChoice:false */
/**
 * @private
 */
var _OjSingleSelect = _ComboUtils.clazz(_AbstractSingleChoice,
  {
    _elemNm: 'ojselect',
    _classNm: 'oj-select',
    _userTyping: false,


      // _OjSingleSelect
    _createContainer: function () {
      var container = $(document.createElement('div')).attr(
        {
          class: 'oj-select oj-component'
        }
          ).html([  // @HTMLUpdateOK
            "<div class='oj-select-choice' tabindex='0' role='combobox' ",
            "     aria-autocomplete='none' aria-expanded='false'>",
            "  <span class='oj-select-chosen'></span>",
            "  <abbr class='oj-select-search-choice-close' role='presentation'></abbr>",
            "  <a class='oj-select-arrow oj-component-icon oj-clickable-icon-nocontext oj-select-open-icon' role='presentation'>",
            '</a></div>',

            "<div class='oj-listbox-drop' role='dialog'>",

            "  <div class='oj-listbox-search-wrapper'>",

            "  <div class='oj-listbox-search'>",
            "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off'",
            "           spellcheck='false' class='oj-listbox-input' title='Search field' ",
            "           role='combobox' aria-expanded='false' aria-autocomplete='list' />",

            "    <span class='oj-listbox-spyglass-box'>",
            "      <span class='oj-component-icon oj-clickable-icon-nocontext oj-listbox-search-icon' role='presentation'>",
            "       <b role='presentation'></b></span>",
            '    </span>',
            '  </div>',

            '  </div>',

            "   <ul class='oj-listbox-results' role='listbox'>",
            '   </ul>',
            '</div>',

            "<div role='region' class='oj-helper-hidden-accessible oj-listbox-liveregion' aria-live='polite'></div>"

          ].join('')); // @HTMLUpdateOK

      return container;
    },

    // _OjSingleSelect
    // eslint-disable-next-line no-unused-vars
    _enable: function (enabled) {
      _OjSingleSelect.superclass._enable.apply(this, arguments);

        //  - dropdown icon is in disabled state after enabling ojselect
      if (this._enabled) {
        this.selection.attr('tabindex', '0');
        this.container.find('.oj-select-arrow').removeClass('oj-disabled');
      } else {
          // Don't allow focus on a disabled "select"
        this.selection.attr('tabindex', '-1');
          //  - disabled select icon hover still shows changes
        this.container.find('.oj-select-arrow').addClass('oj-disabled');
      }
    },

    // _OjSingleSelect
    close: function (event) {
      if (!this._opened()) {
        return;
      }
      _OjSingleSelect.superclass.close.apply(this, arguments);

      this.selection
          .attr('aria-expanded', false)
          .removeAttr('aria-haspopup')
          .removeAttr('aria-owns');

      this.search
          .attr('aria-expanded', false)
          .removeAttr('aria-controls');

      //  - required validation err is not displayed when user tabs out
      // always clear search text when dropdown close
      if (!this._testClear(event)) {
        this._clearSearch();
      }

      //  - ojselect input field grabs focus on paste
      // don't set focus on the select box if event target is not select element
      if (!(event instanceof MouseEvent) ||
            event.target === this.selection || event.target === this.search) {
        _ComboUtils._focus(this, this.selection);
      }

      // /remove "mouse click" listeners on spyglass
      this.container.find('.oj-listbox-spyglass-box').off('mouseup click');
    },

      // _OjSingleSelect
    _opening: function (event, dontUpdateResults) {
      _OjSingleSelect.superclass._opening.apply(this, arguments);

      //  - select input gets stuck with sdp fetchchain delay
      // show drop down in order to show the searchBox
      this._showDropDown();
      var searchText = _ComboUtils.getSearchText(event);

      // select: focus still stay on the selectBox if open dropdown by mouse click
      this._showSearchBox(searchText);

      if (!dontUpdateResults) {
        if (searchText) {
          this._updateResults();
        } else {
          this._updateResults(true);
        }
      }
    },

    // _OjSingleSelect
    _showDropDown: function () {
      if (!this._opened()) {
        // Just to make sure that _opening() method is called before calling
        // the _showDropDown().
        return;
      }

      var expanding = (this.selection.attr('aria-expanded') !== 'true');
      _OjSingleSelect.superclass._showDropDown.apply(this, arguments);

      if (expanding) {
        this.selection
            .attr('aria-expanded', true)
            .attr('aria-haspopup', 'dialog')
            .attr('aria-owns', this.results.attr('id'));

        this.search
            .attr('aria-expanded', true)
            .attr('aria-controls',
                  this.results.attr('id') + ' ' + this.container.find('.oj-listbox-liveregion').attr('id'));
      }

      //  - search moves cursor to end, difficult to edit search
    },

    // _OjSingleSelect
    _initContainer: function () {
      // /ojselect placeholder
      var selectedId = this.containerId + '_selected';
      this.text = this.container.find('.oj-select-chosen').attr('id', selectedId);

      _OjSingleSelect.superclass._initContainer.apply(this, arguments);

      // /select: accessibility
      this.selection
        .attr({
          'aria-labelledby': this.search.attr('aria-labelledby'),
          'aria-describedby': selectedId
        });

      //  - missing select label
      var label = this._getAttribute('aria-label');
      if (label) {
        this.selection.attr('aria-label', label);
      }

      this.search.on('keydown', this._bind(this._containerKeydownHandler));
      this.search.on('keyup-change input', this._bind(this._containerKeyupHandler));

      //  - nls: hardcoded string 'search field' in select component
      this.search.attr('title', this.ojContext.getTranslatedString('searchField'));

      //  - required validation err is not displayed when user tabs out
      var self = this;
      this.selection.on('blur', function (e) {
        self._testClear(e);
      });
    },

    // _OjSingleSelect
    _initSelection: function () {
      if (this._isPlaceholderOptionSelected()) {
        this._updateSelection(null);
        this.close();
        this._setPlaceholder();
      } else {
        _OjSingleSelect.superclass._initSelection.apply(this, arguments);
      }
    },

    // _OjSingleSelect
    _updateSelectedOption: function (selected) {
      if (selected !== undefined && selected !== null) {
        // ojSelect by default use first option if user set a value which is not listed in original option items.
        // So need to update options to reflect the correct value in component state.
        var selectedVal;
        var value = this.getVal();

        if (Array.isArray(value) && !this.ojContext._IsCustomElement()) {
          value = value[0];
        }

        selectedVal = this.opts.id(selected);

        // editableValue doesn't accept undefined value
        if (selectedVal === undefined) {
          selectedVal = null;
        }

        //  - the selected option of the ojselect not reflected in the value variable
        if (!oj.Object.compareValues(value, selectedVal)) {
          this.ojContext._setInitialSelectedValue(selectedVal);
        }

        this.setValOpts(selected);
        this._updateSelection(selected);

        this.close();
      } else {
        this.setValOpts(null);
      }
    },

    // _OjSingleSelect
    _updateSelection: function (data) {
      this.selection.data(this._elemNm, data);
      //  - ojet select displaying values incorrectly
      if (data !== null) {
        this.text.text((typeof data === 'string') ?
                         data :
                         _ComboUtils.getLabel(data));
      }

        // make sure placeholder text has "oj-select-default" class
      if (data && data.id !== '') {
        this.text.removeClass(this._classNm + '-default');
      }
    },

    // _OjSingleSelect
    _getActiveContainer: function () {
      var expanded = this.search.attr('aria-expanded');
      return (expanded && this._hasSearchBox()) ? this.search : this.selection;
    },

    // _OjSingleSelect
    _isPlaceholderOptionSelected: function () {
      // /ojselect allow placeholder to be an empty string
      if (this._getPlaceholder() === null) {
        return false; // no placeholder specified so no option should be considered
      }

      var cval = this.getVal();
      cval = Array.isArray(cval) ? cval[0] : cval;
      // This method is used to check whether placeholder text need to be displayed in ui or not and hence checking current value should be fine.
      return _ComboUtils.isValueForPlaceholder(false, cval);
    },

    // _OjSingleSelect
    // /ojselect placeholder this method should be in AbstractOjChoice
    _getPlaceholder: function () {
      return this.opts.placeholder;
    },

    // _OjSingleSelect
    _showPlaceholder: function () {
      return true;
    },

    // _OjSingleSelect
    _setPlaceholder: function () {
      var placeholder = this._getPlaceholder();

      if (this._isPlaceholderOptionSelected() && placeholder !== undefined) {
        this.text.text(placeholder).addClass(this._classNm + '-default');
      }
    },

    // _OjSingleSelect
    setVal: function (val, event, context) {
      // /pass original event
      _OjSingleSelect.superclass.setVal.call(this, val, event, context);
      this.selection.data('selectVal', val);
    },

    // _OjSingleSelect
    _containerKeydownHandler: function (e) {
      //  - strange text show up after type in "<" in the select component
      //  - keyboard handling issues
      if ((_ComboUtils.KEY.isControl(e) && e.which !== _ComboUtils.KEY.SHIFT) ||
          (e.which === _ComboUtils.KEY.SHIFT) ||
            _ComboUtils.KEY.isFunctionKey(e)) {
        return;
      }

      switch (e.which) {
        case _ComboUtils.KEY.TAB:
          this.close(e);
          // James: tab out of an expanded poplist, focus is going all the way to the top of the page.
          this.selection.focus();

          //  - required validation err is not displayed when user tabs out
          this._testClear(e);
          return;

        // open dropdown on Enter
        case _ComboUtils.KEY.ENTER:
          if (e.target === this.selection[0] && !this._opened()) {
            this.open(e);
            //  - select and combobox stop keyboard event propegation
            e.preventDefault();
            return;
          }
          break;

        default:
          break;
      }

      _OjSingleSelect.superclass._containerKeydownHandler.apply(this, arguments);


      if (this._userTyping) {
        //  - select input gets stuck with sdp fetchchain delay
        // force opening the dropdown to show seach text in the searchbox
        this.open(e);

        //  - ojselect search box does not appear when i start typing
        if (this._opened()) {
          var searchBox = this.dropdown.find('.oj-listbox-search');
          if ($(searchBox).attr('aria-hidden') === 'true') {
            var searchText = _ComboUtils.getSearchText(e);
            if (searchText) {
              this._showSearchBox(searchText);
              this._updateResults();
            }
          }
        }
      }
    },

    // _OjSingleSelect
    //  - required validation err is not displayed when user tabs out
    _testClear: function (event) {
      if (this.text.text() === '') {
        // In the case when the selected option or oj-option has empty text for label
        // but has valid value, we don't want to clear the value out -- see 
        //  - lov does not show the value-option label when it's updated later
        if ((this.datalist && this.selection.data(this._elemNm)
             && this.selection.data(this._elemNm).value) ||
            !_ComboUtils.isValueForPlaceholder(false, this.ojContext.options.value)) {
          return false;
        }

        this._clear(event);
        return true;
      }
      return false;
    }

  });

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */
/**
 * @preserve Copyright 2012 Igor Vaynberg
 *
 * This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
 * General Public License version 2 (the "GPL License"). You may choose either license to govern your
 * use of this software only upon the condition that you accept all of the terms of either the Apache
 * License or the GPL License.
 *
 * You may obtain a copy of the Apache License and the GPL License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
 * the specific language governing permissions and limitations under the Apache License and the GPL License.
 */

/* global _ComboUtils:false, _AbstractOjChoice:false */
/**
 * @private
 */
var _AbstractMultiChoice = _ComboUtils.clazz(_AbstractOjChoice,
  {
    _prepareOpts: function () {
      var opts = _AbstractMultiChoice.superclass._prepareOpts.apply(this, arguments);
      var self = this;

      var tagName = opts.element.get(0).tagName.toLowerCase();
      if ((tagName === 'input' && opts.element.attr('list')) ||
        (tagName === 'select' && opts.element.children().length > 0) ||
        (opts.ojContext._IsCustomElement() && !opts.options) ||
        opts.list) {
        var eleName = opts.list ? 'li' : 'option';

        if (opts.ojContext._IsCustomElement()) {
          eleName = 'oj-option';
        }

        // install the selection initializer
        opts.initSelection = function (element, callback) {
          var selected;
          var data = [];
          if (self.getVal()) {
            var ids = self.getVal();
            for (var i = 0; i < ids.length; i++) {
              var id = ids[i];
              // eslint-disable-next-line no-loop-func
              selected = element.find(eleName).filter(function () {
                var elemValue;
                if (eleName === 'li') {
                  elemValue = this.getAttribute('oj-data-value');
                } else if (eleName === 'option' || eleName === 'oj-option') {
                  elemValue = this.value;
                }

                return oj.Object.compareValues(elemValue, id);
              });

              if (selected && selected.length) {
                data.push(self._optionToData(selected));
              } else if (self._elemNm === 'ojcombobox') {
                // If user entered value which is not listed in predefiend options
                data.push({ value: id, label: id });
              }
            }
          } else if (tagName !== 'select') {
            // don't do this for select since it returns the first option as selected by default
            selected = element.find(eleName).filter(function () {
              if (eleName === 'option') {
                return this.selected;
              } else if (eleName === 'li') {
                return this.getAttribute('oj-data-selected') === true;
              } else if (eleName === 'oj-option') {
                return this.getAttribute('selected') === true;
              }
              return false;
            });

            _ComboUtils.each2(selected, function (index, elm) {
              data.push(self._optionToData(elm));
            }
            );
          }
          callback(data);
        };
      } else if ('options' in opts) {
        if (_ComboUtils.isDataProvider(opts.options) ||
            $.isFunction(opts.options)) {
          // install default initSelection when applied to hidden input and data is remote
          opts.initSelection = function (element, callback) {
            var findOptions = function (results, optionValues) {
              var foundOptions = [];
              for (var i = 0, l = results.length; i < l; i++) {
                var result = results[i];
                var idx = optionValues.indexOf(opts.id(result));
                if (idx >= 0) {
                  foundOptions.push(result);
                }

                if (result.children) {
                  var childOptions = findOptions(result.children, optionValues);
                  if (childOptions && childOptions.length) {
                    $.merge(foundOptions, childOptions);
                  }
                }
              }

              return foundOptions;
            };

            var ids = self.getVal();
            // search in data by array of ids, storing matching items in a list
            var matches = [];

            // This data will be saved after querying the options.
            var queryResult = _ComboUtils.getLastQueryResult(self);
            if (queryResult) {
              matches = findOptions(queryResult, ids);
            }

            var reorderOptions = function () {
              // Reorder matches based on the order they appear in the ids array because right now
              // they are in the order in which they appear in data array.
              // If not found in the current result, then will check in the saved current item.
              var ordered = [];
              for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                var found = false;
                for (var j = 0; j < matches.length; j++) {
                  var match = matches[j];
                  if (oj.Object.compareValues(id, opts.id(match))) {
                    ordered.push(match);
                    matches.splice(j, 1);
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  // currentItem will hold the selected object with value and label.
                  // Which updated everytime value is changed.
                  var currentItem = self.currentItem;
                  if (currentItem && currentItem.length) {
                    for (var k = 0; k < currentItem.length; k++) {
                      if (oj.Object.compareValues(id, opts.id(currentItem[k]))) {
                        ordered.push(currentItem[k]);
                        found = true;
                        break;
                      }
                    }
                  }

                  if (!found && self._elemNm === 'ojcombobox') {
                    // If user entered value which is not listed in predefiend options
                    ordered.push({ value: id, label: id });
                  }
                }
              }

              callback(ordered);
            };

            // valueChangeTrigger will have one of the values from
            // _ComboUtils._ValueChangeTriggerTypes, which represents the
            // what triggered the value change. But if value is programmatically
            // updated this will be null. So if valueChangeTrigger is null
            // querying for the options again as component will not have list
            // of options in case value is updated programmatically.
            if (!self.valueChangeTrigger) {
              opts.query(
                {
                  value: ids,
                  callback: function (qryResult) {
                    if (qryResult && qryResult.results) {
                      var results = findOptions(qryResult.results, ids);
                      if (results && results.length) {
                        var concat = results;
                        if (_ComboUtils.isDataProvider(opts.options)) {
                          //  - While fetching the label for the initial value,
                          // user can still interact the component and pick a new value.
                          concat = [];
                          var vals = self.getVal();
                          if (oj.Object.compareValues(ids, vals) &&
                              !_ComboUtils.isValueChanged(self.ojContext)) {
                            concat = results;
                          } else {
                            var v;
                            var found;
                            var valOpts = self.getValOpts();
                            // value has changed, concatenate results and value options
                            vals.forEach(function (val) {
                              found = false;
                              for (v = 0; v < valOpts.length; v++) {
                                if (oj.Object.compareValues(valOpts[v].value, val)) {
                                  found = true;
                                  concat.push(valOpts[v]);
                                  break;
                                }
                              }
                              if (!found) {
                                for (v = 0; v < results.length; v++) {
                                  if (oj.Object.compareValues(results[v].value, val)) {
                                    concat.push({
                                      value: results[v].value,
                                      label: results[v].label
                                    });
                                    break;
                                  }
                                }
                              }
                            });
                            // update ids and valueOptions
                            ids = vals;
                            _ComboUtils.setValueOptions(self.ojContext, concat);
                          }
                        }
                        $.merge(matches, concat);
                      }
                    }
                    _ComboUtils.setValueChanged(self.ojContext, undefined);
                    reorderOptions();
                  }
                }
              );
            } else {
              reorderOptions();
            }
          };
        } else {
          // install default initSelection when applied to hidden input and data is local
          opts.initSelection = function (element, callback) {
            var ids = self.getVal();

            if (!ids || ids.length === 0) {
              return;
            }

            // search in data by array of ids, storing matching items in a list
            var matches = [];
            opts.query(
              {
                matcher: function (term, text, el) {
                  var isMatch = $.grep(ids, function (id) {
                    return oj.Object.compareValues(id, opts.id(el));
                  }
                  ).length;
                  if (isMatch) {
                    matches.push(el);
                  }
                  return isMatch;
                },
                callback: !$.isFunction(callback) ? $.noop : function () {
                // reorder matches based on the order they appear in the ids array because right now
                // they are in the order in which they appear in data array
                  var ordered = [];
                  for (var i = 0; i < ids.length; i++) {
                    var id = ids[i];
                    var found = false;
                    for (var j = 0; j < matches.length; j++) {
                      var match = matches[j];
                      if (oj.Object.compareValues(id, opts.id(match))) {
                        ordered.push(match);
                        matches.splice(j, 1);
                        found = true;
                        break;
                      }
                    }
                    if (!found && self._elemNm === 'ojcombobox') {
                    // If user entered value which is not listed in predefiend options
                      ordered.push({ value: id, label: id });
                    }
                  }
                  callback(ordered);
                }
              }
            );
          };
        }
      }
      return opts;
    },

    _selectChoice: function (choice) {
      var selected = this.container.find('.' + this._classNm + '-selected-choice.oj-focus');
      if (!selected.length || (choice && choice[0] !== selected[0])) {
        if (selected.length) {
          this.opts.element.trigger('choice-deselected', selected);
        }
        selected.removeClass('oj-focus');
        if (choice && choice.length) {
          if (this._elemNm === 'ojcombobox') {
            this.close();
          }
          choice.addClass('oj-focus');
          this.container.find('.' + this._classNm + '-description')
            .text(choice.attr('valueText') + '. Press back space to delete.')
            .attr('aria-live', 'assertive');
          this.opts.element.trigger('choice-selected', choice);
        }
      }
    },

    _destroy: function () {
      $("label[for='" + this.search.attr('id') + "']")
      .attr('for', this.opts.element.attr('id'));
      _AbstractMultiChoice.superclass._destroy.apply(this, arguments);
    },

    _initContainer: function () {
      var selector = '.' + this._classNm + '-choices';
      var idSuffix = _ComboUtils.nextUid();
      var elementLabel;

      this.searchContainer = this.container.find('.' + this._classNm + '-search-field');

      var selection = this.container.find(selector);
      this.selection = selection;

      var _this = this;
      this.selection.on('click',
                        '.' + this._classNm + '-selected-choice:not(.' + this._classNm + '-locked)',
                        function () {
                          if (this._elemNm === 'ojcombobox') {
                            _this.search[0].focus();
                          } // Fixed??
                          _this._selectChoice($(this));
                        });

      this._contentElement = (this._elemNm === 'ojcombobox') ? this.search : this.selection;

      // add aria associations
      selection.find('.' + this._classNm + '-input').attr('id', this._classNm + '-input-' + idSuffix);
      if (!this.results.attr('id')) {
        this.results.attr('id', 'oj-listbox-results-' + idSuffix);
      }
      this._contentElement.attr('aria-owns', this.results.attr('id'));

      if (!this.ojContext._IsCustomElement()) {
        elementLabel = $("label[for='" + this._getAttribute('id') + "']");
        if (!elementLabel.attr('id')) {
          elementLabel.attr('id', this._classNm + '-label-' + idSuffix);
        }
        this._contentElement.attr('aria-labelledby', elementLabel.attr('id'));
        this.opts.element.attr('aria-labelledby', elementLabel.attr('id'));
        if (this.search.attr('id')) {
          elementLabel.attr('for', this.search.attr('id'));
        }
      }

      if (this._getAttribute('aria-label')) {
        this._contentElement.attr('aria-label', this._getAttribute('aria-label'));
      }

      if (this._getAttribute('aria-controls')) {
        this._contentElement.attr('aria-controls', this._getAttribute('aria-controls'));
      }

      if (this.elementTabIndex) {
        this._contentElement.attr('tabindex', this.elementTabIndex);
      }

      this.keydowns = 0;
      // Add keydown keyup handler on the select box for ojselect
      if (this._elemNm === 'ojselect') {
        this.selection.on('keydown', this._bind(this._containerKeydownHandler));
        this.selection.on('keyup', this._bind(function () {
          this.keydowns = 0;
        }
        ));
      }
      this.search.on('keydown', this._bind(this._containerKeydownHandler));

      this.search.on('keyup', this._bind(function () {
        this.keydowns = 0;
      }
        ));

      this.search.on('compositionstart', this._bind(function () {
        // See _isComposing in InputBase for comments on what this does
        this.ojContext._isComposing = true;
      }));

      this.search.on('compositionend', this._bind(function (e) {
        this.ojContext._isComposing = false;
        this.ojContext._SetRawValue(this.search.val(), e);
      }));

      this.search.on('input', this._bind(function (e) {
        if (!this.ojContext._isComposing) {
          this.ojContext._SetRawValue(this.search.val(), e);
        }
      }
        ));

      this.search.on('blur keyup', this._bind(function (e) {
        if (e.type === 'keyup' && e.keyCode !== 10 && e.keyCode !== 13) {
          return;
        }

        if (this.opts.manageNewEntry && this.search.val() && this.results.find('.oj-hover').length <= 0) {
          var data = this.opts.manageNewEntry(this.search.val());

          var trigger = e.type === 'blur'
               ? _ComboUtils.ValueChangeTriggerTypes.BLUR
               : _ComboUtils.ValueChangeTriggerTypes.ENTER_PRESSED;
          var options =
            {
              trigger: trigger
            };

          this._onSelect(data, options, e);
        }
        this.search.removeClass(this._classNm + '-focused');
        this.container.removeClass('oj-focus');
        this._selectChoice(null);
        // : component oj-combobox-many displays validation error message even when no value is entered in the component
        // do not clear search if the input text is invalid
        // this will allow users to correct any invalid input text
        if (!this._opened() && this._classNm !== 'oj-select' && this.ojContext.isValid()) {
          this._clearSearch();
        }
        e.stopImmediatePropagation();
      }
        ));

      this.container.on('click touchstart', selector, this._bind(function (e) {
        if (!this._isInterfaceEnabled()) {
          return;
        }
        if ($(e.target).closest('.' + this._classNm + '-selected-choice').length > 0) {
            // clicked inside a selected choice, do not open
          return;
        }
        this._selectChoice(null);
        if (this._opened()) {
          this.close(e);
        } else {
          this.open(e);
          if (this._elemNm === 'ojcombobox' || this._hasSearchBox()) {
            this._focusSearch();
          }
        }
        e.preventDefault();
      }
        ));

      this._initContainerWidth();
      this.opts.element.hide().attr('aria-hidden', true);
      this.container.append(this.opts.element); // @HTMLUpdateOK

      // set the placeholder if necessary
      this._clearSearch();
    },

    _containerKeydownHandler: function (e) {
      if (!this._isInterfaceEnabled()) {
        return;
      }

      this.keydowns += 1;
      var selected = this.selection.find('.' + this._classNm + '-selected-choice.oj-focus');
      var prev = selected.prev('.' + this._classNm + '-selected-choice:not(.' + this._classNm + '-locked)');
      var next = selected.next('.' + this._classNm + '-selected-choice:not(.' + this._classNm + '-locked)');
      var pos = (this._elemNm === 'ojselect' && !this._userTyping) ? _ComboUtils.getCursorInfo(this.selection) : _ComboUtils.getCursorInfo(this.search);

      if (selected.length &&
          (e.which === _ComboUtils.KEY.LEFT
           || e.which === _ComboUtils.KEY.RIGHT
           || e.which === _ComboUtils.KEY.BACKSPACE
           || e.which === _ComboUtils.KEY.DELETE
           || e.which === _ComboUtils.KEY.ENTER)) {
        var selectedChoice = selected;
        if (e.which === _ComboUtils.KEY.LEFT && prev.length) {
          selectedChoice = prev;
        } else if (e.which === _ComboUtils.KEY.RIGHT) {
          selectedChoice = next.length ? next : null;
        } else if (e.which === _ComboUtils.KEY.BACKSPACE) {
          this._unselect(selected.first(), e);
          this._resetSearchWidth();
          selectedChoice = prev.length ? prev : next;
        } else if (e.which === _ComboUtils.KEY.DELETE) {
          this._unselect(selected.first(), e);
          this._resetSearchWidth();
          selectedChoice = next.length ? next : null;
        } else if (e.which === _ComboUtils.KEY.ENTER) {
          selectedChoice = null;
        }

        this._selectChoice(selectedChoice);
        e.preventDefault();
        if (!selectedChoice || !selectedChoice.length) {
          this.open(e);
        }
        return;
      } else if (((e.which === _ComboUtils.KEY.BACKSPACE && this.keydowns === 1)
           || e.which === _ComboUtils.KEY.LEFT) && (pos.offset === 0 && !pos.length)) {
        this._selectChoice(this.selection.find('.' + this._classNm + '-selected-choice:not(.' + this._classNm + '-locked)').last());
        e.preventDefault();
        return;
      }

      this._selectChoice(null);


      if (this._opened()) {
        switch (e.which) {
          case _ComboUtils.KEY.UP:
          case _ComboUtils.KEY.DOWN:
            this._moveHighlight((e.which === _ComboUtils.KEY.UP) ? -1 : 1);
            e.preventDefault();
            return;
          case _ComboUtils.KEY.ENTER:
            this._selectHighlighted(null, e);
            e.preventDefault();
            // Fix :  PRESSING 'ENTER' WITHIN DROPDOWN SHOULD NOT PROPAGATE
            e.stopPropagation();
            return;
          case _ComboUtils.KEY.TAB:
            this.close(e);
            return;
          case _ComboUtils.KEY.ESC:
            this._cancel(e);
            e.preventDefault();
            return;
          default:
            break;
        }
        // bring up the search box if user started typing after the drop down is already opened
        // do not close the drop down if user pressed control keys or function keys
        if (this._userTyping === false &&
            !(_ComboUtils.KEY.isControl(e) || _ComboUtils.KEY.isFunctionKey(e))) {
          this._userTyping = true;
          this.close();
        }
      }

      if (e.which === _ComboUtils.KEY.TAB
          || _ComboUtils.KEY.isControl(e)
          || _ComboUtils.KEY.isFunctionKey(e)
          || e.which === _ComboUtils.KEY.ESC) {
        return;
      }

      // when user typed in text and hit enter, we don't want to open drop down
      if (e.which === _ComboUtils.KEY.ENTER && this.search.val() && this._elemNm === 'ojcombobox') {
        return;
      }

      switch (e.which) {
        case _ComboUtils.KEY.UP:
        case _ComboUtils.KEY.DOWN:
          this.open(e);
          e.preventDefault();
          return;
        case _ComboUtils.KEY.PAGE_UP:
        case _ComboUtils.KEY.PAGE_DOWN:
        // prevent the page from scrolling
          e.preventDefault();
          return;
        case _ComboUtils.KEY.ENTER:
        // prevent form from being submitted
          e.preventDefault();
          return;
        default:
          break;
      }

      // ojselect: used by select
      this._userTyping = true;
    },

    _enableInterface: function () {
      if (_AbstractMultiChoice.superclass._enableInterface.apply(this, arguments)) {
        this.search.prop('disabled', !(this._isInterfaceEnabled() || _ComboUtils.isReadonly(this.ojContext)));
      }
    },

    _initSelection: function (valueOptions) {
      var vv = this.getVal();
      if ((vv === null || vv.length === 0) && (this._classNm === 'oj-select' || this.opts.element.text().trim() === '')) {
        this._updateSelection(valueOptions || []);
        this.close();
        // set the placeholder if necessary
        this._clearSearch();
      }
      if (this.datalist || (this.getVal() !== null && this.getVal().length)) {
        var self = this;
        var element;

        if (this.datalist) {
          element = this.datalist;
        } else {
          element = this.opts.element;
        }

        //  - need to be able to specify the initial value of select components bound to dprv
        if (!_ComboUtils.applyValueOptions(this, this.opts)) {
          this.opts.initSelection.call(null, element, function (data) {
            if (data !== undefined && data !== null && data.length !== 0) {
              self._updateSelection(data);
              self.close();
              // set the placeholder if necessary
              self._clearSearch();
            }
          });
        }
      }
    },

    // eslint-disable-next-line no-unused-vars
    close: function (event) {
      if (!this._opened()) {
        return;
      }
      _AbstractMultiChoice.superclass.close.apply(this, arguments);
    },

    _focus: function () {
      this.close();
      this.search.focus();
    },

    _updateSelection: function (data) {
      var ids = [];
      var filtered = [];
      var self = this;

      // filter out duplicates
      $(data).each(function () {
        if (ids.indexOf(self.id(this)) < 0) {
          ids.push(self.id(this));
          filtered.push(this);
        }
      }
      );

      if (this.opts.fetchType === 'init' && filtered && filtered.length > 0 &&
          (this._classNm === 'oj-combobox' || this._classNm === 'oj-select')) {
        this.setValOpts(filtered);
      }

      this.selection.find('.' + this._classNm + '-selected-choice').remove();
      //  - screen reader does not read combobox default value
      // this is to reset aria-describedBy on the contentElement
      // the aria-describedBy will be updated in _addSelectedChoice
      this._contentElement.attr('aria-describedBy', '');
      this.selection.find('.oj-select-default').remove();
      $(filtered).each(function () {
        self._addSelectedChoice(this);
      }
      );

      // Storing this data so that it will be used when setting the display value.
      this.currentItem = filtered;
      this.currentValue = ids;

      self._postprocessResults();
    },

    _onSelect: function (data, options, event) {
      if (!this._triggerSelect(data)) {
        return;
      }

      var context;
      if (options && options.trigger) {
        context =
        {
          optionMetadata:
          {
            trigger: options.trigger
          }
        };
      }

      // selection will be added when _SetValue is called
      // this._addSelectedChoice(data);
      var id = this.id(data);
      // Clone the value before invoking setVal(), otherwise it will not trigger change event.
      var val = this.getVal() ? this.getVal().slice(0) : [];
      // Initial Value options
      var valOptsInit = this.getValOpts() ? this.getValOpts().slice(0) : [];
      var valOpts = valOptsInit.slice(0);
      var isSelectCombobox = (this._classNm === 'oj-combobox' || this._classNm === 'oj-select');

      // If the component is invalid, we will not get all the values matching the displayed value
      if (!this.ojContext.isValid()) {
        val = this.currentValue.slice(0);
      }

      var self = this;
      $(data).each(function (index) {
        if (val.indexOf(id) < 0 && id !== '') {
          val.push(id);
          if (isSelectCombobox) {
            //  - oj.tests.input.combobox.testcombobox display value mismatch automation failure
            if (Array.isArray(data)) {
              valOpts.push(_ComboUtils.findOptionFromResult(self, id, data[index]));
            } else {
              valOpts.push(_ComboUtils.findOptionFromResult(self, id, data));
            }
          }
        }
      });

      // setValueOptions before setVal so that new entry already in valueOptions
      // this is to avoid looking for new entry on the dataProvider
      if (isSelectCombobox) {
        this._skipSetValueOptions = true;
        this.setValOpts(valOpts);
      }
      this.setVal(val, event, context);
      // : component oj-combobox-many displays the list of the values - does not exclude the invalid values
      // If the input text is invalid, restore to initial value options
      if (isSelectCombobox && !this.ojContext.isValid()) {
        this.setValOpts(valOptsInit);
      }
      this._skipSetValueOptions = false;

      if (this.select || !this.opts.closeOnSelect) {
        this._postprocessResults(data, false, this.opts.closeOnSelect === true);
      }
      if (this.opts.closeOnSelect) {
        this.close(event);
        // do not reset search width if the input text is invalid
        // this will allow users to correct any invalid input text
        if (this.ojContext.isValid()) {
          this._resetSearchWidth();
        }
      }

      if ((!options || !options.noFocus) && this._elemNm === 'ojcombobox') {
        this._focusSearch();
      }
    },

    _cancel: function (event) {
      this.close(event);
      if (this._elemNm === 'ojcombobox') {
        this._focusSearch();
      }
    },

    _addSelectedChoice: function (data) {
      var enableChoice = !data.locked;
      var enabledItem = $(
          "<li class='" + this._classNm + "-selected-choice'>" +
          '    <div></div>' +
          "    <a href='#' onclick='return false;' role='button' aria-label='remove' class='" + this._classNm + '-clear-entry ' +
          '      oj-component-icon oj-clickable-icon-nocontext ' + this._classNm + "-clear-entry-icon' tabindex='-1'>" +
          '    </a>' +
          '</li>');
      var disabledItem = $(
          // "<li class='oj-combobox-selected-choice oj-combobox-locked'>" +
          "<li class='" + this._classNm + '-selected-choice ' + this._classNm + "-locked'>" +
          '<div></div>' +
          '</li>');
      var choice = enableChoice ? enabledItem : disabledItem;
      var formatted;

      formatted = this.opts.formatSelection(data);
      if (formatted !== undefined) {
        // set the text and id for the label
        var selectedLabelId = this._classNm + '-selected-choice-label-' + _ComboUtils.nextUid();
        choice.find('div').addClass(this._classNm + '-selected-choice-label').text(formatted).attr('id', selectedLabelId);
        choice.find('.' + this._classNm + '-clear-entry').attr('aria-label', formatted + ' remove');
        choice.attr('valueText', formatted);
        //  - screen reader does not read combobox default value
        // update aria-describedBy with the selection label id on the contentElement
        // so the labels for the selected items can be read out by the screen reader
        var describedById = this._contentElement.attr('aria-describedBy');
        this._contentElement.attr('aria-describedBy', (describedById ? describedById + ' ' : '') + selectedLabelId);
        if (this._classNm === 'oj-combobox') {
          this.selection.attr('aria-describedBy', (describedById ? describedById + ' ' : '') + selectedLabelId);
        }
      }
      if (enableChoice) {
        choice.find('.' + this._classNm + '-clear-entry')
        .on('mousedown', _ComboUtils.killEvent)
        .on('click dblclick', this._bind(function (e) {
          if (!this._isInterfaceEnabled()) {
            return;
          }

          $(e.target).closest('.' + this._classNm + '-selected-choice').fadeOut('fast', this._bind(function () {
            this._unselect($(e.target), e);
            this.selection.find('.' + this._classNm + '-selected-choice.oj-focus').removeClass('oj-focus');
            this.close(e);
            if (this._elemNm === 'ojcombobox') {
              this._focusSearch();
            }
          }
              )).dequeue();
          _ComboUtils.killEvent(e);
        }
          ));
      }
      choice.data(this._elemNm, data);

      // searchContainer is initialized in _initContainer() method.
      // And this can not be changed by an external developer. It is constructed by component only.
      if (this._elemNm === 'ojcombobox') {
        choice.insertBefore(this.searchContainer); // @HtmlUpdateOk
      } else {
        this.selection.append(choice); // @HtmlUpdateOk
      }
    },

    // keep valueOptions in sync with value
    _syncValueOptions: function (ojContext, value, valueOptions) {
      var newValOpts = [];
      if (value && valueOptions) {
        for (var i = 0; i < value.length; i++) {
          for (var j = 0; j < valueOptions.length; j++) {
            var newOpt = valueOptions[j];
            if (oj.Object.compareValues(newOpt.value, value[i])) {
              newValOpts.push(newOpt);
            }
          }
        }
        _ComboUtils.setValueOptions(ojContext, newValOpts);
      }
    },

    _unselect: function (oselected, event) {
      var val = this.getVal() ? this.getVal().slice(0) : [];
      var selected = oselected.closest('.' + this._classNm + '-selected-choice');

      if (selected.length === 0) {
        // TODO: translation string
        throw new Error('Invalid argument: ' + selected + '. Must be .'
                        + this._classNm + '-selected-choice');
      }

      var data = selected.data(this._elemNm);
      if (!data) {
        // prevent a race condition when the 'x' is clicked really fast repeatedly the event can be queued
        // and invoked on an element already removed
        return;
      }

      // If the component is invalid, we will not get all the values matching the displayed value
      if (!this.ojContext.isValid()) {
        val = this.currentValue;
      }

      var index = val.indexOf(this.id(data));
      while (index >= 0) {
        val.splice(index, 1);
        this._syncValueOptions(this.ojContext, val, this.getValOpts());
        this._skipSetValueOptions = true;
        this.setVal(val, event);
        this._skipSetValueOptions = false;
        if (this.select) {
          this._postprocessResults();
        }
        index = val.indexOf(this.id(data));
      }

      selected.remove();
    },

    // eslint-disable-next-line no-unused-vars
    _postprocessResults: function (data, initial, noHighlightUpdate) {
      // display all available options in the drop down if the component is in invaid state
      if (!this.ojContext.isValid()) {
        return;
      }
      var val = this.getVal();
      var choices = this.results.find('.oj-listbox-result');
      var compound = this.results.find('.oj-listbox-result-with-children');
      var self = this;

      _ComboUtils.each2(choices, function (i, choice) {
        var id = self.id(choice.data(self._elemNm));
        if (val && val.indexOf(id) >= 0) {
          choice.addClass('oj-selected');
          // mark all children of the selected parent as selected
          choice.find('.oj-listbox-result-selectable').addClass('oj-selected');
        }
      }
      );
      _ComboUtils.each2(compound, function (i, choice) {
        // hide an optgroup if it doesnt have any selectable children
        if (!choice.is('.oj-listbox-result-selectable')
           && choice.find('.oj-listbox-result-selectable:not(.oj-selected)').length === 0) {
          choice.addClass('oj-selected');
        }
      }
      );

      if (!choices.filter('.oj-listbox-result:not(.oj-selected)').length > 0 && this._classNm !== 'oj-select') {
        this.close();
      }
    },

    _isDataSelected: function (data) {
      var val = this.getVal();

      if (!val || val.length === 0) {
        return false;
      }

      var results = data.results;
      for (var i = 0; i < results.length; i++) {
        if (val.indexOf(this.id(results[i])) === -1) {
          return false;
        }
      }

      return true;
    },

    _resetSearchWidth: function () {
      // do nothing. subclass override
    },

    setVal: function (val, event, context) {
      var unique = [];
      var vals = val;

      //  - selected value got replaced once the label for initial value is available
      this.valHasChanged();

      if (typeof val === 'string') {
        vals = _ComboUtils.splitVal(val, this.opts.separator);
      }

      // filter out duplicates
      for (var i = 0; i < vals.length; i++) {
        if (unique.indexOf(vals[i]) < 0) {
          unique.push(vals[i]);
        }
      }

      var options =
        {
          doValueChangeCheck: false
        };
      if (context) {
        options._context = context;
      }

      //  - need to be able to specify the initial value of select components bound to dprv
      // set valueOption
      if (!this._skipSetValueOptions) {
        var queryResult = _ComboUtils.getLastQueryResult(this);
        var match;
        if (queryResult) {
          match = _ComboUtils.findOptions(queryResult, vals);
        }
        if (match && match.length) {
          _ComboUtils.setValueOptions(this.ojContext, match);
        }
      }

      // Fix  - CUSTOM MESSAGES ARE BEING CLEARED WHEN THE VALUE DOESN'T CHANGE
      // If the value has not changed, bypass the call to _SetValue method in EditableValue.
      // Because we don't have to set the same value again in EditableValue.
      var previousVal = this.getVal();
      if (!oj.Object.compareValues(previousVal, unique)) {
        this.ojContext._SetValue(unique, event, options);
      }

      if (this.ojContext.isValid() || unique.length === 0) {
        this.currentValue = unique;
      }

      this.search.attr('aria-activedescendant', this.opts.element.attr('id'));
    }
  });

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * @preserve Copyright 2012 Igor Vaynberg
 *
 * This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
 * General Public License version 2 (the "GPL License"). You may choose either license to govern your
 * use of this software only upon the condition that you accept all of the terms of either the Apache
 * License or the GPL License.
 *
 * You may obtain a copy of the Apache License and the GPL License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
 * the specific language governing permissions and limitations under the Apache License and the GPL License.
 */

/* global _ComboUtils:false, _AbstractMultiChoice:false */


/**
 * @private
 */
var _OjMultiCombobox = _ComboUtils.clazz(_AbstractMultiChoice,
  {
    _elemNm: 'ojcombobox',
    _classNm: 'oj-combobox',

    _createContainer: function () {
      var container = $(document.createElement('div')).attr(
        {
          class: 'oj-combobox oj-combobox-multi oj-component'
        }
        ).html([  // @HTMLUpdateOK
          "<ul class='oj-combobox-choices'>",
          "  <li class='oj-combobox-search-field'><span class='oj-helper-hidden'>&nbsp;</span>",
          "    <input type='text' role='combobox' aria-expanded='false' aria-autocomplete='list' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='oj-combobox-input'>",
          '  </li>',
          '</ul>',
          "<div class='oj-combobox-description oj-helper-hidden-accessible'/>",
          "<div class='oj-listbox-drop oj-listbox-drop-multi'>",
          "   <ul class='oj-listbox-results' role='listbox'>",
          '   </ul>',
          '</div>',

          "<div role='region' class='oj-helper-hidden-accessible oj-listbox-liveregion' aria-live='polite'></div>"

        ].join('')); // @HTMLUpdateOK
      return container;
    },

    _opening: function (event, dontUpdateResults) {
      // if beforeExpand is not cancelled
      // beforeExpand event will be triggered in base class _shouldOpen method
      this._resizeSearch();
      _OjMultiCombobox.superclass._opening.apply(this, arguments);
      this._focusSearch();

      if (!dontUpdateResults) {
        this._updateResults(true);
      }

      this.search.focus();
    },

    _clearSearch: function () {
      var placeholder = this._getPlaceholder();
      var maxWidth = this._getMaxSearchWidth();

      //  - need to be able to specify the initial value of select components bound to dprv
      if (placeholder != null &&
          _ComboUtils.isValueForPlaceholder(true, this.getVal()) &&
          _ComboUtils.isValueOptionsForPlaceholder(true, this.getValOpts())) {
        this.search.attr('placeholder', placeholder);
        // stretch the search box to full width of the container so as much of the placeholder is visible as possible
        // we could call this._resizeSearch(), but we do not because that requires a sizer and we do not want to create one so early because of a firefox bug, see #944
        this.search.val('').width(maxWidth > 0 ? maxWidth : this.container.css('width'));

        //  when the component is pre-created, the input box would get the default size
        this.searchContainer.width('100%');
      } else {
        this.search.attr('placeholder', '');
        this.search.val('').width(10);

        // reset the search container, so the input doesn't go to the next line if there is still room
        this.searchContainer.width('auto');
      }
    },

    _resetSearchWidth: function () {
      this.search.width(10);
    },

    _getMaxSearchWidth: function () {
      return this.selection.width() - _ComboUtils.getSideBorderPadding(this.search);
    },

    _textWidth: function (text) {
      var textSpan = document.createElement('span');
      var textNode = document.createTextNode(text);

      textSpan.style.display = 'none';
      textSpan.appendChild(textNode); // @HTMLUpdateOK
      $('body').append(textSpan); // @HTMLUpdateOK
      var width = $('body').find('span:last').width();
      $('body').find('span:last').remove();
      return width;
    },

    _resizeSearch: function () {
      var minimumWidth;
      var left;
      var maxWidth;
      var containerLeft;
      var searchWidth;
      var sideBorderPadding = _ComboUtils.getSideBorderPadding(this.search);

      minimumWidth = this._textWidth(this.search.val()) + 10;
      left = this.search.offset().left;
      maxWidth = this.selection.width();
      containerLeft = this.selection.offset().left;
      searchWidth = maxWidth - (left - containerLeft) - sideBorderPadding;
      if (searchWidth < minimumWidth) {
        searchWidth = maxWidth - sideBorderPadding;
      }
      if (searchWidth < 40) {
        searchWidth = maxWidth - sideBorderPadding;
      }
      if (searchWidth <= 0) {
        searchWidth = minimumWidth;
      }
      this.search.width(Math.floor(searchWidth));
    }

  }
  );

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */

/**
 * @preserve Copyright 2012 Igor Vaynberg
 *
 * This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
 * General Public License version 2 (the "GPL License"). You may choose either license to govern your
 * use of this software only upon the condition that you accept all of the terms of either the Apache
 * License or the GPL License.
 *
 * You may obtain a copy of the Apache License and the GPL License at:
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
 * the specific language governing permissions and limitations under the Apache License and the GPL License.
 */

/* global _ComboUtils:false, _AbstractMultiChoice:false */

/**
 * @private
 */
var _OjMultiSelect = _ComboUtils.clazz(_AbstractMultiChoice,
  {
    _elemNm: 'ojselect',
    _classNm: 'oj-select',
    _userTyping: false,

    _createContainer: function () {
      var container = $(document.createElement('div')).attr(
        {
          class: 'oj-select oj-select-multi oj-component'
        }
        ).html([// @HTMLUpdateOK
          "<ul class='oj-select-choices' tabindex='0' role='combobox' ",
          "  aria-autocomplete='none' aria-expanded='false'>",
          '</ul>',
          "<div class='oj-listbox-drop' role='dialog'>",

          "  <div class='oj-listbox-search-wrapper'>",

          "  <div class='oj-listbox-search'>",
          "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off'",
          "           spellcheck='false' class='oj-listbox-input' title='Search field' ",
          "           role='combobox' aria-expanded='false' aria-autocomplete='list' />",

          "    <span class='oj-listbox-spyglass-box'>",
          "      <span class='oj-component-icon oj-clickable-icon-nocontext oj-listbox-search-icon' role='presentation'>",
          "       <b role='presentation'></b></span>",
          '    </span>',
          '  </div>',

          '  </div>',

          "   <ul class='oj-listbox-results' role='listbox'>",
          '   </ul>',
          '</div>',

          "<div role='region' class='oj-helper-hidden-accessible oj-listbox-liveregion' aria-live='polite'></div>"
        ].join('')); // @HTMLUpdateOK
      return container;
    },

    _containerKeydownHandler: function (e) {
      _OjMultiSelect.superclass._containerKeydownHandler.apply(this, arguments);

      if (this._userTyping && !this._opened()) {
        this.open(e);
      }
    },

    _opening: function (event, dontUpdateResults) {
      // if beforeExpand is not cancelled
      // beforeExpand event will be triggered in base class _shouldOpen method
      _OjMultiSelect.superclass._opening.apply(this, arguments);

      //  - select input gets stuck with sdp fetchchain delay
      // show drop down in order to show the searchBox
      this._showDropDown();

      var searchText = _ComboUtils.getSearchText(event);

      // select: focus still stay on the selectBox if open dropdown by mouse click
      this._showSearchBox(searchText);

      if (!dontUpdateResults) {
        if (searchText) {
          this._updateResults();
        } else {
          this._updateResults(true);
        }
      }
    },

    close: function (event) {
      // reset _userTyping after drop down is closed
      if (this._userTyping === true) {
        this._userTyping = false;
      }

      _OjMultiSelect.superclass.close.apply(this, arguments);

      if (event && (!(event instanceof MouseEvent) ||
                    event.target === this.selection || event.target === this.search)) {
        _ComboUtils._focus(this, this.selection);
      }
    },

    _clearSearch: function () {
      var placeholder = this._getPlaceholder();

      if (placeholder != null &&
          _ComboUtils.isValueForPlaceholder(true, this.getVal()) &&
          _ComboUtils.isValueOptionsForPlaceholder(true, this.getValOpts())) {
        var node = $('<li></li>');
        node.addClass('oj-select-default');
        node.text(placeholder);
        this.selection.append(node); // @HTMLUpdateOK
      }
    }

  }
  );

/* global _ComboUtils:false, _OjSingleCombobox:false */

/**
 * @private
 */
var _OjInputSeachContainer = _ComboUtils.clazz(_OjSingleCombobox,
  {
    _elemNm: 'ojinputsearch',
    _classNm: 'oj-inputsearch',

    // _OjInputSeachContainer
    _createContainer: function () {
      var container = $(document.createElement('div')).attr(
        {
          class: 'oj-inputsearch oj-component'
        }
      ).html([// @HTMLUpdateOK
        "<div class='oj-inputsearch-choice' tabindex='-1' role='presentation'>",
        "   <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off'",
        "       spellcheck='false' class='oj-inputsearch-input' role='combobox' aria-expanded='false' aria-autocomplete='list' />",
        "   <a class='oj-inputsearch-search-button oj-inputsearch-search-icon oj-component-icon oj-clickable-icon-nocontext'",
        "       role='button' aria-label='search'></a>",
        '</div>',
        "<div class='oj-listbox-drop' role='presentation'>",
        "   <ul class='oj-listbox-results' role='listbox'>",
        '   </ul>',
        '</div>',

        "<div role='region' class='oj-helper-hidden-accessible oj-listbox-liveregion' aria-live='polite'></div>"
      ].join(''));

      var trigger = container.find('.oj-inputsearch-search-button');
      this._attachSearchIconClickHandler(trigger);
      return container;
    },

    _attachSearchIconClickHandler: function (trigger) {
      var self = this;
      trigger.on('click', function (event) {
        if (!self._isInterfaceEnabled()) {
          return undefined;
        }

        if (self.opts.manageNewEntry) {
          var value = self.search.val();
          var data = self.opts.manageNewEntry(value);
          var options = {
            trigger: _ComboUtils.ValueChangeTriggerTypes.SEARCH_ICON_CLICKED
          };

          var selectionData = self.selection.data(self._elemNm);
          if (((!selectionData && value !== '')
              || (selectionData && (selectionData.label !== value))
              || (!self.ojContext.isValid()
                    && value !== self._previousDisplayValue))) {
            self._onSelect(data, options, event);
            self._triggerUpdateEvent(data, options, event);
          } else {
            if (selectionData && selectionData.label === value) {
              data = selectionData;
            }

            self._triggerUpdateEvent(data, options, event);
          }
        }
        return false;
      }).on('mousedown', function (event) {
        event.stopPropagation();
        return false;
      });
    },

    // _OjInputSeachContainer
    // eslint-disable-next-line no-unused-vars
    _enable: function (enabled) {
      _OjInputSeachContainer.superclass._enable.apply(this, arguments);

      if (this._enabled) {
        this.container.find('.oj-inputsearch-search-button').removeClass('oj-disabled');
      } else {
        this.container.find('.oj-inputsearch-search-button').addClass('oj-disabled');
      }
    },

    // _OjInputSeachContainer
    // Overriding this method to fire the "update" event which is relevant to
    // only InputSearch
    _triggerUpdateEvent: function (data, context, event) {
      var trigger;
      if (context) {
        trigger = context.trigger;
      }

      var options = {
        _context: {
          optionMetadata: {
            trigger: trigger
          }
        }
      };

      var value = this.id(data);
      if (!value || value.length === 0) {
        // If the value is entered by user (not by selecting an option) then
        // only 'label' will be present in the data object.
        value = data.label ? data.label : [];
      }
      // inputSearch is a widget component, and only has synchronous validation
      var parsed = this.ojContext._AsyncValidate(value, event, options);
      if (parsed === undefined || !this.ojContext.isValid()) {
        return;
      }

      if (typeof value === 'string') {
        value = [value];
      }

      var eventData = {
        value: value,
        optionMetadata: {
          trigger: trigger
        }
      };

      this.ojContext._trigger('update', event, eventData);
    },

    // _OjInputSeachContainer
    // eslint-disable-next-line no-unused-vars
    _prepareOpts: function (_opts) {
      var opts = _OjInputSeachContainer.superclass._prepareOpts.apply(this, arguments);

      opts.highlightTermInOptions = function () {
        return true;
      };

      return opts;
    }
  }
);

/**
 * Copyright (c) 2017, Oracle and/or its affiliates.
 * All rights reserved.
 */

/* jslint browser: true,devel:true*/
/**
 * The oj.Optgroup interface defines API for a group option of the JET Select and Combobox.
 * Use <code class="prettyprint">oj.Option</code> for a leaf option and <code class="prettyprint">oj.Optgroup</code> for a group option.
 * <ul>
 * <li><code class="prettyprint">children</code> is a required attribute to group the Option children.</li>
 * <li><code class="prettyprint">label</code> is a required attribute</li>
 * </ul>
 * <p>See <a href="oj.Option.html">oj.Option</a> for a leaf option</p>
 * <p>See {@link oj.ojComboboxOne#options}</p>
 * <p>See {@link oj.ojComboboxMany#options}</p>
 * <p>See {@link oj.ojSelectOne#options}</p>
 * <p>See {@link oj.ojSelectMany#options}</p>
 * @since 4.1.0
 * @export
 * @interface oj.Optgroup
 */

/**
 * Label is a required attribute. It is used to display the group label.
 *
 * @export
 * @expose
 * @memberof oj.Optgroup
 * @instance
 * @name label
 * @type {string}
 */

/**
 * disabled is an optional attribute. When specified, all options in the group is not selectable.
 *
 * @export
 * @expose
 * @memberof oj.Optgroup
 * @instance
 * @name disabled
 * @type {boolean}
 * @ojsignature { target: "Type",
 *                value: "?"}
 */

/**
 * Children is a required attribute. It is used to group its Option or Optgroup children.
 *
 * @export
 * @expose
 * @memberof oj.Optgroup
 * @instance
 * @name children
 * @type {Array.<oj.Option|oj.Optgroup>}
 */

/**
 * End of jsdoc
 */

/**
 * Copyright (c) 2017, Oracle and/or its affiliates.
 * All rights reserved.
 */

/* jslint browser: true,devel:true*/
/**
 * The oj.Option interface defines API for a leaf option of the JET select and combobox.
 * Use <code class="prettyprint">oj.Option</code> for a leaf option and <code class="prettyprint">oj.Optgroup</code> for a group option.
 * <ul>
 * <li><code class="prettyprint">value</code> is a required attribute. It must be a row key in the data provider.</li>
 * <li><code class="prettyprint">label</code> is an optional attribute. If missing, String(value) is used.</li>
 * </ul>
 * <p>See <a href="oj.Optgroup.html">oj.Optgroup</a> for group option</p>
 * <p>See {@link oj.ojComboboxOne#options}</p>
 * <p>See {@link oj.ojComboboxMany#options}</p>
 * <p>See {@link oj.ojSelectOne#options}</p>
 * <p>See {@link oj.ojSelectMany#options}</p>
 * <p>See {@link oj.ojMenuSelectMany#options}</p>
 * @since 4.1.0
 * @export
 * @interface oj.Option
 */

/**
 * value is required attribute. It must be the row key in the data provider because JET Select and Combobox use "value" to fetch the displayed "label".
 *
 * @export
 * @expose
 * @memberof oj.Option
 * @instance
 * @name value
 * @type {Object}
 */

/**
 * label is an optional attribute. It is the display label for the option item. If it's missing, String(value) will be used.
 *
 * @export
 * @expose
 * @memberof oj.Option
 * @instance
 * @name label
 * @type {string}
 * @ojsignature { target: "Type",
 *                value: "?"}
 */

/**
 * disabled is an optional attribute. When disabled is true, the option item is not selectable.
 *
 * @export
 * @expose
 * @memberof oj.Option
 * @instance
 * @name disabled
 * @type {boolean}
 * @ojsignature { target: "Type",
 *                value: "?"}
 */

/**
 * End of jsdoc
 */

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */

/* global _ComboUtils:false, _OjMultiCombobox:false, _OjSingleCombobox:false, Promise:false */

  /**
   * @ojcomponent oj.ojComboboxOne
   * @augments oj.ojCombobox
   * @since 0.6.0
   * @ojdisplayname Single-select Combobox
   * @ojshortdesc A combobox one is a dropdown list that supports single selection, text input, and search filtering.
   * @ojrole combobox
   * @ojsignature [{
   *                target: "Type",
   *                value: "class ojComboboxOne<K, D, V= any> extends ojCombobox<V, ojComboboxOneSettableProperties<K, D, V>, V, string>",
   *                genericParameters: [{"name": "K", "description": "Type of key of the dataprovider"}, {"name": "D", "description": "Type of data from the dataprovider"}
   *                , {"name": "V", "description": "Type of value of the component"}]
   *               },
   *               {
   *                target: "Type",
   *                value: "ojComboboxOneSettableProperties<K, D, V=any> extends ojComboboxSettableProperties<V>",
   *                for: "SettableProperties"
   *               }
   *              ]
   * @ojstatus preview
   *
   * @classdesc
   * <h3 id="comboboxOneOverview-section">
   *   JET Combobox One
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#comboboxOneOverview-section"></a>
   * </h3>
   * <p>Description: JET Combobox One provides support for single-select, text input, and search filtering.</p>
   *
   * <p>A JET Combobox One can be created with the following markup.</p>
   *
   * <pre class="prettyprint">
   * <code>
   * &lt;oj-combobox-one>
   *   &lt;oj-option value="option 1">option 1&lt;/oj-option>
   *   &lt;oj-option value="option 2">option 2&lt;/oj-option>
   *   &lt;oj-option value="option 3">option 3&lt;/oj-option>
   *   &lt;oj-option value="option 4">option 4&lt;/oj-option>
   * &lt;/oj-combobox-one>
   * </code></pre>
   *
   * {@ojinclude "name":"validationAndMessagingDoc"}
   *
   * <h3 id="touch-section">
   *   Touch End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#touch-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"touchDocOne"}
   *
   * <h3 id="keyboard-section">
   *   Keyboard End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#keyboard-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"keyboardDocOne"}
   *
   * <h3 id="perf-section">
   *   Performance
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#perf-section"></a>
   * </h3>
   *
   * <h4>Page Load</h4>
   * <p>If the <a href="#options">options</a> attribute is a data provider, and if there is an initially selected value, setting the <a href="#valueOption">valueOption</a> attribute initially can improve page load performance because the element will not have to fetch the selected label from the data provider.</p>
   * <p>When using a data provider, the dropdown data isn't fetched until the user opens the dropdown.</p>
   *
   * <h3 id="styling-section">
   *   Styling
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"stylingDoc"}
   *
   * {@ojinclude "name":"comboboxCommon"}
   */

   /**
   * @ojcomponent oj.ojComboboxMany
   * @augments oj.ojCombobox
   * @since 0.6.0
   * @ojdisplayname Multi-select Combobox
   * @ojshortdesc A combobox many is a dropdown list that supports multiple selections, text input, and search filtering.
   * @ojrole combobox
   * @ojsignature [{
   *                target: "Type",
   *                value: "class ojComboboxMany<K, D, V= any> extends ojCombobox<Array<V>, ojComboboxManySettableProperties<K, D, V>, Array<V>, Array<string>>",
   *                genericParameters: [{"name": "K", "description": "Type of key of the dataprovider"}, {"name": "D", "description": "Type of data from the dataprovider"}
   *                ,{"name": "V", "description": "Type of each item in the value of the component"}]
   *               },
   *               {
   *                target: "Type",
   *                value: "ojComboboxManySettableProperties<K, D, V= any> extends ojComboboxSettableProperties<Array<V>>",
   *                for: "SettableProperties"
   *               }
   *              ]
   * @ojstatus preview
   *
   * @classdesc
   * <h3 id="comboboxManyOverview-section">
   *   JET Combobox Many
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#comboboxManyOverview-section"></a>
   * </h3>
   * <p>Description: JET Combobox Many provides support for multi-select, text input, and search filtering.</p>
   *
   * <p>A JET Combobox Many can be created with the following markup.</p>
   *
   * <pre class="prettyprint">
   * <code>
   * &lt;oj-combobox-many>
   *   &lt;oj-option value="option 1">option 1&lt;/oj-option>
   *   &lt;oj-option value="option 2">option 2&lt;/oj-option>
   *   &lt;oj-option value="option 3">option 3&lt;/oj-option>
   *   &lt;oj-option value="option 4">option 4&lt;/oj-option>
   * &lt;/oj-combobox-many>
   * </code></pre>
   *
   * {@ojinclude "name":"validationAndMessagingDoc"}
   *
   * <h3 id="touch-section">
   *   Touch End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#touch-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"touchDocMany"}
   *
   * <h3 id="keyboard-section">
   *   Keyboard End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#keyboard-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"keyboardDocMany"}
   *
   * <h3 id="perf-section">
   *   Performance
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#perf-section"></a>
   * </h3>
   *
   * <h4>Page Load</h4>
   * <p>If the <a href="#options">options</a> attribute is a data provider, and if there are initially selected values, setting the <a href="#valueOptions">valueOptions</a> attribute initially can improve page load performance because the element will not have to fetch the selected labels from the data provider.</p>
   * <p>When using a data provider, the dropdown data isn't fetched until the user opens the dropdown.</p>
   *
   * <h3 id="styling-section">
   *   Styling
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"stylingDoc"}
   *
   * {@ojinclude "name":"comboboxCommon"}
   */

  /**
   * @ojcomponent oj.ojCombobox
   * @augments oj.editableValue
   * @since 0.6.0
   * @abstract
   * @ojsignature [{
   *                target: "Type",
   *                value: "abstract class ojCombobox<V, SP extends ojComboboxSettableProperties<V, SV, RV>, SV=V, RV=V> extends editableValue<V, SP, SV, RV>"
   *               },
   *               {
   *                target: "Type",
   *                value: "ojComboboxSettableProperties<V, SV= V, RV= V> extends editableValueSettableProperties<V, SV, RV>",
   *                for: "SettableProperties"
   *               }
   *              ]
   * @ojstatus preview
   * @hideconstructor
   * @classdesc
   */

  /**
   *
   * <h3 id="rtl-section">
   *   Reading direction
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#rtl-section"></a>
   * </h3>
   *
   * <p>As with any JET element, in the unusual case that the directionality (LTR or RTL) changes post-init, the Combobox must be <code class="prettyprint">refresh()</code>ed.</p>
   *
   *
   * <h3 id="a11y-section">
   *   Accessibility
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#a11y-section"></a>
   * </h3>
   * <p>
   * It is up to the application developer to associate an oj-label to the combobox element.
   * You should put an <code>id</code> on the combobox element, and then set
   * the <code>for</code> attribute on the oj-label to be the combobox element's id.
   * </p>
   * <p>
   * The element will decorate its associated label with required and help
   * information, if the <code>required</code> and <code>help</code> attributes are set.
   * </p>
   *
   * @ojfragment comboboxCommon
   * @memberof oj.ojCombobox
   */
  oj.__registerWidget('oj.ojCombobox', $.oj.editableValue,
    {
      defaultElement: '<input>',
      widgetEventPrefix: 'oj',
      options:
      {
      /**
       * {@ojinclude "name":"comboboxCommonAsyncValidators"}
       *
       * @example <caption>Create an Object that duck-types the oj.AsyncValidator interface.
       * Bind the Object to the JET form component's async-validators attribute. The
       * validator's 'validate' method will be called when the user changes the input.</caption>
       *  self.asyncValidator1 = {
       *    // required validate method
       *    'validate': function(value) {
       *      return new Promise(function(resolve, reject) {
       *        var successful = someBackendMethod();
       *        if (successful) {
       *          resolve(true);
       *        } else {
       *          reject(new Error('The options are incorrect.'));
       *        }
       *      });
       *    },
       *    // optional hint attribute. hint shows up when user sets focus to input.
       *    'hint': new Promise(function (resolve, reject) {
       *      var backendHint = getSomeBackendHint();
       *      resolve(backendHint);
       *    });
       *  };
       *  -- HTML --
       *  &lt;oj-combobox-one async-validators="[[[asyncValidator1]]]">&lt;/oj-combobox-one>
       * @example <caption>Initialize the component with multiple AsyncValidator
       * duck-typed instances:</caption>
       * -- HTML --
       * &lt;oj-combobox-one
                  async-validators="[[[asyncValidator1, asyncValidator2]]]">&lt;/oj-combobox-one>
       *
       * @example <caption>Get or set the <code class="prettyprint">asyncValidators</code>
       * property after initialization:</caption>
       * // getter
       * var validators = myComp.asyncValidators;
       *
       * // setter
       * var myValidators = [{
       * 'validate' : function(value) {
       *   return new Promise(function(resolve, reject) {
       *   // mock server-side delay
       *   setTimeout(function () {
       *     if (valuePassesValidation) {
       *       resolve(true);
       *     } else {
       *       reject(new Error('the options are incorrect'));
       *     }
       *   },10);
       *   });
       * }
       * }];
       * myComp.asyncValidators = myValidators;
       * @name asyncValidators
       * @ojshortdesc Specifies a list of asynchronous validators used by the component when performing validation. Use async-validators when you need to perform some validation work on the server. See the Help documentation for more information.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojComboboxOne
       * @default []
       * @ojsignature  { target: "Type",
       *       value: "Array<oj.AsyncValidator<V>>",
       *       jsdocOverride: true}
       * @type {Array.<Object>}
       */
      /**
       * {@ojinclude "name":"comboboxCommonAsyncValidators"}
       *
       * @example <caption>Create an Object that duck-types the oj.AsyncValidator interface.
       * Bind the Object to the JET form component's async-validators attribute. The
       * validator's 'validate' method will be called when the user changes the input.</caption>
       *  self.asyncValidator1 = {
       *    // required validate method
       *    'validate': function(value) {
       *      return new Promise(function(resolve, reject) {
       *        var successful = someBackendMethod();
       *        if (successful) {
       *          resolve(true);
       *        } else {
       *          reject(new Error('The amount of purchase is too high. It is ' + value));
       *        }
       *      });
       *    },
       *    // optional hint attribute. hint shows up when user sets focus to input.
       *    'hint': new Promise(function (resolve, reject) {
       *      var formattedMaxPurchase = getSomeBackendFormattedMaxPurchase();
       *      resolve(maxPurchase + " is the maximum.");
       *    });
       *  };
       *  -- HTML --
       *  &lt;oj-combobox-many async-validators="[[[asyncValidator1]]]">&lt;/oj-combobox-many>
       * @example <caption>Initialize the component with multiple AsyncValidator
       * duck-typed instances:</caption>
       * -- HTML --
       * &lt;oj-combobox-many
                  async-validators="[[[asyncValidator1, asyncValidator2]]]">&lt;/oj-combobox-many>
       *
       * @example <caption>Get or set the <code class="prettyprint">asyncValidators</code>
       * property after initialization:</caption>
       * // getter
       * var validators = myComp.asyncValidators;
       *
       * // setter
       * var myValidators = [{
       * 'validate' : function(value) {
       *   return new Promise(function(resolve, reject) {
       *   // mock server-side delay
       *   setTimeout(function () {
       *     if (value === "pass" || value === "another pass") {
       *       resolve(true);
       *     } else {
       *       reject(new Error("value isn't 'pass' or 'another pass'. It is " + value.));
       *     }
       *   },10);
       *   });
       * }
       * }];
       * myComp.asyncValidators = myValidators;
       * @name asyncValidators
       * @ojshortdesc Specifies a list of asynchronous validators used by the component when performing validation. Use async-validators when you need to perform some validation work on the server. See the Help documentation for more information.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojComboboxMany
       * @default []
       * @ojsignature  { target: "Type",
       *       value: "Array<oj.AsyncValidator<Array<V>>>",
       *       jsdocOverride: true}
       * @type {Array.<Object>}
       */
      /**
       * List of asynchronous validators used by the component when performing validation.
       * Use <code class="prettyprint">async-validators</code> when you need to
       * perform some validation work on the server. Otherwise, use
       * <code class="prettyprint">validators</code>, which are synchronous.
       * <p>
       * Each item in the Array is an instance that duck types {@link oj.AsyncValidator}.
       * Implicit validators created by a component when certain attributes
       * are present (e.g. <code class="prettyprint">required</code> attribute) are separate from
       * validators specified through the <code class="prettyprint">async-validators</code>
       * attribute and the <code class="prettyprint">validators</code> attribute.
       * At runtime when the component runs validation, it
       * combines the implicit validators with the list specified through the
       * <code class="prettyprint">validators</code>
       * attribute and also the list specified through the
       * <code class="prettyprint">async-validators</code> attribute.
       * Error messages are shown as soon as each async validator returns;
       * we do not wait until all the async validators finish to show errors.
       * If the component's valid state changes for the worse, it is also updated
       * as each validator returns so valid will be invalidShown
       * as soon as the first validator has an Error.
       * </p>
       * <p> It is recommended that you show the
       * value you are validating in the error message because if the async operation takes a while,
       * the user could be typing in a new value when the error message comes back
       * and might be confused what value the error is for. However, if the user enters a new value
       * (like presses Enter or Tab), a new validation lifecycle will start
       * and validation errors for the previous value will not be shown to the user.
       * If you need to format the value for the error message,
       * you can use
       * <code class="prettyprint">oj.IntlConverterUtils.getConverterInstance(converterOption)</code>
       * to get the converter instance,
       * then call <code class="prettyprint">converter.format(value)</code>.
       * </p>
       * <p>
       * Hints exposed by async-validators and validators are shown in the notewindow by default,
       * or as determined by the 'validatorHint' property set on the
       * <code class="prettyprint">display-options</code> attribute.
       * </p>
       * <p>Since async validators are run asynchronously, you should wait on the BusyContext before
       * you check valid property or the value property. Alternatively you can add a callback to
       * the validChanged or valueChanged events.
       * </p>
       * <p>
       * The steps performed always, running validation and clearing messages is the same as
       * for the <code class="prettyprint">validators</code> attribute.
       * </p>
       * <br/>
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojCombobox
       * @default []
       * @ojfragment comboboxCommonAsyncValidators
       */
        asyncValidators: [],
      /**
       * {@ojinclude "name":"comboboxCommonConverter"}
       *
       * @property {'number'|'datetime'} type - the converter type registered with the oj.ConverterFactory.
       * Supported types are 'number' and 'datetime'. See {@link oj.ConverterFactory} for details. <br/>
       * E.g., <code class="prettyprint">{converter: {type: 'number'}</code>
       * @property {Object=} options - optional Object literal of options that the converter expects.
       * See {@link oj.IntlNumberConverter} for options supported by the number converter.
       * E.g., <code class="prettyprint">{converter: {type: 'number', options: {style: 'decimal'}}</code>
       *
       * @example <caption>Initialize the Combobox with a number converter instance:</caption>
       * &lt;oj-combobox-one converter="[[salaryConverter]]">&lt;/oj-combobox-one><br/>
       * // Initialize converter instance using currency options
       * var options = {style: 'currency', 'currency': 'USD', maximumFractionDigits: 0};
       * var numberConverterFactory = oj.Validation.converterFactory("number");
       * var salaryConverter = numberConverterFactory.createConverter(options);
       * @example <caption>Initialize the Combobox with converter object literal:</caption>
       * &lt;oj-combobox-one converter='{"type": "number", "options": {"style": "decimal"}}'>&lt;/oj-combobox-one>
       * @example <caption>Get or set the <code class="prettyprint">converter</code>
       *  property after initialization:</caption>
       * // getter
       * var converter = myComp.converter;
       *
       * // setter
       * myComp.converter = myConverter;
       *
       * @name converter
       * @ojshortdesc An object that converts the value. See the Help documentation for more information.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojComboboxOne
       * @ojsignature {
       *    target: "Type",
       *    value: "Promise<oj.Converter<V>>|oj.Converter<V>|oj.Validation.RegisteredConverter|null",
       *    jsdocOverride: true}
       * @type {Object|null}
       * @default null
       */
      /**
       * {@ojinclude "name":"comboboxCommonConverter"}
       *
       * @property {'number'|'datetime'} type - the converter type registered with the oj.ConverterFactory.
       * Supported types are 'number' and 'datetime'. See {@link oj.ConverterFactory} for details. <br/>
       * E.g., <code class="prettyprint">{converter: {type: 'number'}</code>
       * @property {Object=} options - optional Object literal of options that the converter expects.
       * See {@link oj.IntlNumberConverter} for options supported by the number converter.
       * E.g., <code class="prettyprint">{converter: {type: 'number', options: {style: 'decimal'}}</code>
       *
       * @example <caption>Initialize the Combobox with a number converter instance:</caption>
       * &lt;oj-combobox-many converter="[[salaryConverter]]">&lt;/oj-combobox-many><br/>
       * // Initialize converter instance using currency options
       * var options = {style: 'currency', 'currency': 'USD', maximumFractionDigits: 0};
       * var numberConverterFactory = oj.Validation.converterFactory("number");
       * var salaryConverter = numberConverterFactory.createConverter(options);
       *
       * @example <caption>Initialize the Combobox with converter object literal:</caption>
       * &lt;oj-combobox-many converter='{"type": "number", "options": {"style": "decimal"}}'>&lt;/oj-combobox-many>
       * @example <caption>Get or set the <code class="prettyprint">converter</code>
       *  property after initialization:</caption>
       * // getter
       * var converter = myComp.converter;
       *
       * // setter
       * myComp.converter = myConverter;
       *
       * @name converter
       * @ojshortdesc An object that converts the value. See the Help documentation for more information.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojComboboxMany
       * @ojsignature {
       *    target: "Type",
       *    value: "Promise<oj.Converter<V>>|oj.Converter<V>|oj.Validation.RegisteredConverter|null",
       *    jsdocOverride: true}
       * @type {Object|null}
       * @default null
       */
      /**
       * A converter instance or Promise to a converter instance that duck types {@link oj.Converter}.
       * Or an object literal containing the following properties.
       * <p>
       * When <code class="prettyprint">converter</code> property changes due to programmatic
       * intervention, the element performs various tasks based on the current state it is in. </br>
       *
       * <h4>Steps Performed Always</h4>
       * <ul>
       * <li>Any cached converter instance is cleared and new converter created. The converter hint is
       * pushed to messaging. E.g., notewindow displays the new hint(s).
       * </li>
       * </ul>
       *
       * <h4>Running Validation</h4>
       * <ul>
       * <li>if element is valid when <code class="prettyprint">converter</code> property changes, the
       * display value is refreshed.</li>
       * <li>if element is invalid and is showing messages when
       * <code class="prettyprint">converter</code> property changes, then all messages generated by the
       * element are cleared and full validation run using its current display value.
       * <ul>
       *   <li>if there are validation errors, then <code class="prettyprint">value</code>
       *   property is not updated, and the errors are shown. The display value is not refreshed in this case. </li>
       *   <li>if no errors result from the validation, <code class="prettyprint">value</code>
       *   property is updated; page author can listen to the <code class="prettyprint">valueChanged</code>
       *   event on the <code class="prettyprint">value</code> property to clear custom errors. The
       *   display value is refreshed with the formatted value provided by converter.</li>
       * </ul>
       * </li>
       * <li>if element is invalid and has deferred messages when
       * <code class="prettyprint">converter</code> property changes, then the display value is
       * refreshed with the formatted value provided by converter.</li>
       * </ul>
       * </p>
       *
       * <h4>Clearing Messages</h4>
       * <ul>
       * <li>When element messages are cleared in the cases described above, messages created by
       * the element are cleared.</li>
       * <li><code class="prettyprint">messages-custom</code> property is not cleared. Page authors can
       * choose to clear it explicitly when setting the converter property.</li>
       * </ul>
       * </p>
       *
       * @ojshortdesc An object that converts the value. See the Help documentation for more information.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojCombobox
       * @ojfragment comboboxCommonConverter
       */
        converter: null,

      /**
       * Whether to filter the list with the current display value on opening the drop down. This can be used to support search use cases.
       * This only applies to the initial opening of the drop down. When the user starts typing, the dropdown filters as usual.
       *
       * @example <caption>Initialize the combobox with the <code class="prettyprint">filter-on-open</code> attribute specified:</caption>
       * &lt;oj-combobox-one filter-on-open="rawValue">&lt;/oj-combobox-one>
       *
       * @example <caption>Get or set the <code class="prettyprint">filter-on-open</code> property after initialization:</caption>
       * // getter
       * var filterOnOpenValue = myCombobox.filterOnOpen;
       *
       * // setter
       * myCombobox.filterOnOpen = "rawValue";
       *
       * @ojshortdesc Whether to filter the drop down list on open.
       * @expose
       * @instance
       * @memberof oj.ojComboboxOne
       * @type {string}
       * @since 4.2.0
       * @ojstatus preview
       * @ojvalue {string} "none"  Show all available options without filtering on open.
       * @ojvalue {string} "rawValue" Filter the drop down list on open with the rawValue (current display value).
       * @default "none"
       */
        filterOnOpen: 'none',

       /**
       * {@ojinclude "name":"comboboxCommonLabelledBy"}
       * @name labelledBy
       * @expose
       * @ojshortdesc The oj-label sets the labelledBy property
       * programmatically on the form component.
       * @type {string|null}
       * @default null
       * @since 7.0.0
       * @access public
       * @instance
       * @memberof oj.ojComboboxMany
       */
      /**
       * {@ojinclude "name":"comboboxCommonLabelledBy"}
       * @name labelledBy
       * @expose
       * @ojshortdesc The oj-label sets the labelledBy property
       * programmatically on the form component.
       * @type {string|null}
       * @default null
       * @since 7.0.0
       * @access public
       * @instance
       * @memberof oj.ojComboboxOne
       */
      /**
       * <p>
       * The oj-label sets the labelledBy property programmatically on the form component
       * to make it easy for the form component to find its oj-label component (a
       * document.getElementById call.)
       * </p>
       * <p>
       * The application developer should use the 'for'/'id api
       * to link the oj-label with the form component;
       * the 'for' on the oj-label to point to the 'id' on the input form component.
       * This is the most performant way for the oj-label to find its form component.
       * </p>
       *
       * // setter
       * myComp.labelledBy = "labelId";
       *
       * @expose
       * @ojshortdesc The oj-label sets the labelledBy property
       * programmatically on the form component.
       * @type {string|null}
       * @default null
       * @since 7.0.0
       * @access public
       * @instance
       * @memberof oj.ojCombobox
       * @ojfragment comboboxCommonLabelledBy
       */
        labelledBy: null,
      /**
       * The placeholder text to set on the element. The placeholder specifies a short hint that can be displayed before user
       * selects or enters a value.
       *
       * @example <caption>Initialize the combobox with the <code class="prettyprint">placeholder</code> attribute specified:</caption>
       * &lt;oj-combobox-one placeholder="Please select ...">&lt;/oj-combobox-one>
       *
       * @example <caption>Get or set the <code class="prettyprint">placeholder</code> property after initialization:</caption>
       * // getter
       * var placeholderValue = myCombobox.placeholder;
       *
       * // setter
       * myCombobox.placeholder = "Select a value";
       *
       * @name placeholder
       * @ojshortdesc A short hint that can be displayed before user selects or enters a value.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojComboboxOne
       * @type {string|null}
       * @default null
       */
      /**
       * The placeholder text to set on the element. The placeholder specifies a short hint that can be displayed before user
       * selects or enters a value.
       *
       * @example <caption>Initialize the combobox with the <code class="prettyprint">placeholder</code> attribute specified:</caption>
       * &lt;oj-combobox-many placeholder="Please select ...">&lt;/oj-combobox-many>
       *
       * @example <caption>Get or set the <code class="prettyprint">placeholder</code> property after initialization:</caption>
       * // getter
       * var placeholderValue = myCombobox.placeholder;
       *
       * // setter
       * myCombobox.placeholder = "Select values";
       *
       * @name placeholder
       * @ojshortdesc A short hint that can be displayed before user selects or enters a value.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojComboboxMany
       * @type {string|null}
       * @default null
       */
        placeholder: null,


      /**
       * @typedef {Object} oj.ojCombobox.Option
       * @property {boolean=} disabled Option item is disabled.
       * @property {string=} label The display label for the option item. If it's missing, string(value) will be used.
       * @property {any} value The value of the option item.
       */
      /**
       * @typedef {Object} oj.ojCombobox.Optgroup
       * @property {boolean=} disabled Option group is disabled.
       * @property {string} label The display label for the option group.
       * @property {Array.<Object>} children The Option or Optgroup children.
       * @ojsignature { target: "Type", value: "Array.<oj.ojCombobox.Option|oj.ojCombobox.Optgroup>", for: "children", jsdocOverride: true}
       */
      /**
       * {@ojinclude "name":"comboboxCommonOptions"}
       * @name options
       * @ojshortdesc The option items for the Combobox.
       * @expose
       * @access public
       * @instance
       * @type {Array.<Object>|Object|null}
       * @ojsignature { target: "Type",
       *                value: "Array<oj.ojCombobox.Option|oj.ojCombobox.Optgroup>|oj.DataProvider<K, D>|null",
       *                jsdocOverride: true}
       * @default null
       * @memberof oj.ojComboboxOne
       *
       * @example <caption>Initialize the Combobox with the <code class="prettyprint">options</code> specified:</caption>
       * &lt;oj-combobox-one options="[[dataArray]]">&lt;/oj-combobox-one>
       *
       * @example <caption>The options array should contain objects with value and label properties:</caption>
       * var dataArray = [{value: 'option1', label: 'Option 1'},
       *                  {value: 'option2', label: 'Option 2', disabled: true},
       *                  {value: 'option3', label: 'Option 3'}];
       *
       * @example <caption>Initialize the Combobox with a data provider and data mapping:</caption>
       * &lt;oj-combobox-one options="[[dataProvider]]">&lt;/oj-combobox-one>
       *
       * @example <caption>Data mapping can be used if data doesn't have value and label properties.</caption>
       * // actual field names are "id" and "name"
       * var dataArray = [
       *            {id: 'Id 1', name: 'Name 1'},
       *            {id: 'Id 2', name: 'Name 2'},
       *            {id: 'Id 3', name: 'Name 3'}];
       *
       * // In mapfields, map "name" to "label" and "id" to "value"
       * var mapFields = function(item) {
       *   var data = item['data'];
       *   var mappedItem = {};
       *   mappedItem['data'] = {};
       *   mappedItem['data']['label'] = data['name'];
       *   mappedItem['data']['value'] = data['id'];
       *   mappedItem['metadata'] = {'key': data['id']};
       *   return mappedItem;
       * };
       * var dataMapping = {'mapFields': mapFields};
       *
       * var arrayDataProvider = new oj.ArrayDataProvider(dataArray, {keyAttributes: 'id'});
       * var dataProvider = new oj.ListDataProviderView(arrayDataProvider, {'dataMapping': dataMapping});
       */
      /**
       * {@ojinclude "name":"comboboxCommonOptions"}
       * @name options
       * @ojshortdesc The option items for the Combobox.
       * @expose
       * @access public
       * @instance
       * @type {Array.<Object>|Object|null}
       *
       * @ojsignature { target: "Type",
       *                value: "Array<oj.ojCombobox.Option|oj.ojCombobox.Optgroup>|oj.DataProvider<K, D>|null",
       *                jsdocOverride: true}
       * @default null
       * @memberof oj.ojComboboxMany
       *
       * @example <caption>Initialize the Combobox with the <code class="prettyprint">options</code> specified:</caption>
       * &lt;oj-combobox-many options="[[dataArray]]">&lt;/oj-combobox-many>
       *
       * @example <caption>The options array should contain objects with value and label properties:</caption>
       * var dataArray = [{value: 'option1', label: 'Option 1'},
       *                  {value: 'option2', label: 'Option 2', disabled: true},
       *                  {value: 'option3', label: 'Option 3'}];
       *
       * @example <caption>Initialize the Combobox with a data provider and data mapping:</caption>
       * &lt;oj-combobox-many options="[[dataProvider]]">&lt;/oj-combobox-many>
       *
       * @example <caption>Data mapping can be used if data doesn't have value and label properties.</caption>
       * // actual field names are "id" and "name"
       * var dataArray = [
       *            {id: 'Id 1', name: 'Name 1'},
       *            {id: 'Id 2', name: 'Name 2'},
       *            {id: 'Id 3', name: 'Name 3'}];
       *
       * // In mapfields, map "name" to "label" and "id" to "value"
       * var mapFields = function(item) {
       *   var data = item['data'];
       *   var mappedItem = {};
       *   mappedItem['data'] = {};
       *   mappedItem['data']['label'] = data['name'];
       *   mappedItem['data']['value'] = data['id'];
       *   mappedItem['metadata'] = {'key': data['id']};
       *   return mappedItem;
       * };
       * var dataMapping = {'mapFields': mapFields};
       *
       * var arrayDataProvider = new oj.ArrayDataProvider(dataArray, {keyAttributes: 'id'});
       * var dataProvider = new oj.ListDataProviderView(arrayDataProvider, {'dataMapping': dataMapping});
       */
      /**
       * The option items for the Combobox. This attribute can be used instead of providing a list of <code class="prettyprint">oj-option</code> or <code class="prettyprint">oj-optgroup</code> child elements of the Combobox element.
       * This attribute accepts:
       * <ol>
       * <li>an array of <code class="prettyprint">oj.ojCombobox.Option</code> and/or <code class="prettyprint">oj.ojCombobox.Optgroup</code>.
       *   <ul>
       *   <li>Use <code class="prettyprint">oj.ojCombobox.Option</code> for a leaf option.</li>
       *   <li>Use <code class="prettyprint">oj.ojCombobox.Optgroup</code> for a group option.</li>
       *   </ul>
       * </li>
       * <li>a data provider. This data provider must implement <a href="oj.DataProvider.html">oj.DataProvider</a>.
       *   <ul>
       *   <li><code class="prettyprint">value</code> in <code class="prettyprint">oj.ojCombobox.Option</code> must be the row key in the data provider.</li>
       *   <li>A maximum of 15 rows will be displayed in the dropdown. If more than 15 results are available then users need to filter further.</li>
       *   <li>If the data provider supports the filter criteria capability including the contains (<code class="prettyprint">$co or $regex</code>) operator, JET Combobox will request the data provider to do filtering. Otherwise it will filter internally.</li>
       *   <li>See also <a href="#perf-section">Improve page load performance</a></li>
       *   </ul>
       * </li>
       * </ol>
       *
       * @expose
       * @memberof oj.ojCombobox
       * @instance
       * @ojfragment comboboxCommonOptions
       */
        options: null,

      /**
       * @typedef {Object} oj.ojCombobox.OptionsKeys
       * @property {?string=} label The key name for the label.
       * @property {?string=} value The key name for the value.
       * @property {?string=} children The key name for the children.
       * @property {?Object=} childKeys The object for the child keys.
       * @ojsignature {target:"Type", for:"childKeys", value:"oj.ojCombobox.OptionsKeys", jsdocOverride:true}
       */
      /**
       * {@ojinclude "name":"comboboxCommonOptionsKeys"}
       *
       * @example <caption>Initialize the Combobox with <code class="prettyprint">options-keys</code> specified. This allows the key names to be redefined in the options array.</caption>
       * &lt;oj-combobox-one options-keys="[[optionsKeys]]">&lt;/oj-combobox-one>
       * @example var optionsKeys = {value : "state_abbr", label : "state_name"};
       * @example <caption>Redefine keys for data with subgroups.</caption>
       * var optionsKeys = {label : "regions", children : "states",
       *                    childKeys : {value : "state_abbr", label : "state_name"}};
       * @name optionsKeys
       * @ojshortdesc Specify the key names to use in the options array.  Depending on options-keys means that the signature of the data does not match what is supported by the options attribute.
       * @expose
       * @access public
       * @instance
       * @type {?Object}
       * @default null
       * @memberof oj.ojComboboxOne
       * @ojsignature {target:"Type", value:"oj.ojCombobox.OptionsKeys|null", jsdocOverride:true}
       */
      /**
       * {@ojinclude "name":"comboboxCommonOptionsKeys"}
       *
       * @example <caption>Initialize the Combobox with <code class="prettyprint">options-keys</code> specified. This allows the key names to be redefined in the options array.</caption>
       * &lt;oj-combobox-many options-keys="[[optionsKeys]]">&lt;/oj-combobox-many>
       * @example var optionsKeys = {value : "state_abbr", label : "state_name"};
       * @example <caption>Redefine keys for data with subgroups.</caption>
       * var optionsKeys = {label : "regions", children : "states",
       *                    childKeys : {value : "state_abbr", label : "state_name"}};
       * @name optionsKeys
       * @ojshortdesc Specify the key names to use in the options array.  Depending on options-keys means that the signature of the data does not match what is supported by the options attribute.
       * @expose
       * @access public
       * @instance
       * @type {?Object}
       * @default null
       * @memberof oj.ojComboboxMany
       * @ojsignature {target:"Type", value:"oj.ojCombobox.OptionsKeys|null", jsdocOverride:true}
       */
      /**
       * Specify the key names to use in the options array.
       * <p>Depending on options-keys means that the signature of the data does not match what is supported by the options attribute. When using Typescript, this would result in a compilation error.</p>
       * <p>Best practice is to use a <a href="oj.ListDataProviderView.html">oj.ListDataProviderView</a> with data mapping as a replacement.</p>
       * <p>However, for the app that must fetch data from a REST endpoint where the data fields do not match those that are supported by the options attribute, you may use the options-keys with any dataProvider that implements <a href="oj.DataProvider.html">oj.DataProvider</a> interface.</p>
       * <p>Note: <code class="prettyprint">child-keys</code> and <code class="prettyprint">children</code> properties in <code class="prettyprint">options-keys</code> are ignored when using a <a href="oj.TreeDataProvider.html">oj.TreeDataProvider</a>.</p>
       *
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojCombobox
       * @ojfragment comboboxCommonOptionsKeys
       */
        optionsKeys: {
        /**
         * The key name for the label.
         *
         * @name optionsKeys.label
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojComboboxOne
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */
        /**
         * The key name for the label.
         *
         * @name optionsKeys.label
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojComboboxMany
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */

        /**
         * The key name for the value.
         *
         * @name optionsKeys.value
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojComboboxOne
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */
        /**
         * The key name for the value.
         *
         * @name optionsKeys.value
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojComboboxMany
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */

        /**
         * The key name for the children. It is ignored when using a <a href="oj.TreeDataProvider.html">oj.TreeDataProvider</a>.
         *
         * @name optionsKeys.children
         * @ojshortdesc The key name for the children. It is ignored when using a TreeDataProvider.
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojComboboxOne
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */
        /**
         * The key name for the children. It is ignored when using a <a href="oj.TreeDataProvider.html">oj.TreeDataProvider</a>.
         *
         * @name optionsKeys.children
         * @ojshortdesc The key name for the children. It is ignored when using a TreeDataProvider.
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojComboboxMany
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */

        /**
         * The object for the child keys. It is ignored when using a <a href="oj.TreeDataProvider.html">oj.TreeDataProvider</a>.
         *
         * @name optionsKeys.childKeys
         * @ojshortdesc The object for the child keys. It is ignored when using a TreeDataProvider.
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojComboboxOne
         * @type {?Object}
         * @ojsignature {target:"Type", value:"oj.ojCombobox.OptionsKeys", jsdocOverride:true}
         * @default null
         * @property {?string=} label The key name for the label.
         * @property {?string=} value The key name for the value.
         * @property {?string=} children The key name for the children.
         * @property {?Object=} childKeys The object for the child keys.
         * @ojsignature {target:"Type", for:"childKeys", value:"oj.ojCombobox.OptionsKeys|null", jsdocOverride:true}
         */
        /**
         * The object for the child keys. It is ignored when using a <a href="oj.TreeDataProvider.html">oj.TreeDataProvider</a>.
         *
         * @name optionsKeys.childKeys
         * @ojshortdesc The object for the child keys. It is ignored when using a TreeDataProvider.
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojComboboxMany
         * @type {?Object}
         * @ojsignature {target:"Type", value:"oj.ojCombobox.OptionsKeys", jsdocOverride:true}
         * @default null
         * @property {?string=} label The key name for the label.
         * @property {?string=} value The key name for the value.
         * @property {?string=} children The key name for the children.
         * @property {?Object=} childKeys The object for the child keys.
         * @ojsignature {target:"Type", for:"childKeys", value:"oj.ojCombobox.OptionsKeys|null", jsdocOverride:true}
         */
        },

      /**
       * <p>Attributes specified here will be set on the picker DOM element when it's launched.
       * <p>The supported attributes are <code class="prettyprint">class</code> and <code class="prettyprint">style</code>, which are appended to the picker's class and style, if any.
       * Note: 1) picker-attributes is not applied in the native theme.
       * 2) setting this attribute after element creation has no effect.
       *
       * @property {string=} style The css style to append to the picker.
       * @property {string=} class The css class to append to the picker.
       *
       * @example <caption>Initialize the combobox specifying a set of attributes to be set on the picker DOM element:</caption>
       * &lt;oj-combobox-one picker-attributes="[[pickerAttributes]]">&lt;/oj-combobox-one>
       * @example var pickerAttributes = {
       *   "style": "color:blue;",
       *   "class": "my-class"
       * };
       *
       * @name pickerAttributes
       * @ojshortdesc The style attributes for the drop down.
       * @expose
       * @memberof oj.ojComboboxOne
       * @instance
       * @type {?Object}
       * @default null
       */
      /**
       * <p>Attributes specified here will be set on the picker DOM element when it's launched.
       * <p>The supported attributes are <code class="prettyprint">class</code> and <code class="prettyprint">style</code>, which are appended to the picker's class and style, if any.
       * Note: 1) picker-attributes is not applied in the native theme.
       * 2) setting this attribute after element creation has no effect.
       *
       * @property {string=} style The css style to append to the picker.
       * @property {string=} class The css class to append to the picker.
       *
       * @example <caption>Initialize the combobox specifying a set of attributes to be set on the picker DOM element:</caption>
       * &lt;oj-combobox-many picker-attributes="[[pickerAttributes]]">&lt;/oj-combobox-many>
       * @example var pickerAttributes = {
       *   "style": "color:blue;",
       *   "class": "my-class"
       * };
       *
       * @name pickerAttributes
       * @ojshortdesc The style attributes for the drop down.
       * @expose
       * @memberof oj.ojComboboxMany
       * @instance
       * @type {?Object}
       * @default null
       */
        pickerAttributes: null,

      /**
       * @typedef {Object} oj.ojCombobox.OptionContext
       * @property {Element} componentElement A reference to the combobox element.
       * @property {?Element} parent The parent of the data item. The parent is null for root node.
       * @property {number} index The index of the option, where 0 is the index of the first option. In the hierarchical case the index is relative to its parent.
       * @property {number } depth The depth of the option. The depth of the first level children under the invisible root is 0.
       * @property {boolean} leaf Whether the option is a leaf or a group.
       * @property {Object} data The data object for the option.
       * @property {Element} parentElement The option label element. The renderer can use this to directly append content.
       */
      /**
       * {@ojinclude "name":"comboboxCommonOptionRenderer"}
       * @name optionRenderer
       * @ojshortdesc The renderer function that renders the content of each option.
       * @expose
       * @memberof oj.ojComboboxOne
       * @instance
       * @type {null|function(Object):Object}
       * @ojsignature { target: "Type",
       *                value: "?((param0: oj.ojCombobox.OptionContext) => Element)|null",
       *                jsdocOverride: true}
       * @default null
       * @example <caption>Initialize the Combobox with a renderer:</caption>
       * &lt;oj-combobox-one option-renderer="[[optionRenderer]]">&lt;/oj-combobox-one>
       * @example var optionRenderer = function(context) {
       *            var ojOption = document.createElement('oj-option');
       *            // Set the textContent or append other child nodes
       *            ojOption.textContent = context.data['FIRST_NAME'] + ' ' + context.data['LAST_NAME'];
       *            return ojOption;
       *          };
       */
      /**
       * {@ojinclude "name":"comboboxCommonOptionRenderer"}
       * @name optionRenderer
       * @ojshortdesc The renderer function that renders the content of each option.
       * @expose
       * @memberof oj.ojComboboxMany
       * @instance
       * @type {null|function(Object):Object}
       * @ojsignature { target: "Type",
       *                value: "?((param0: oj.ojCombobox.OptionContext) => Element)|null",
       *                jsdocOverride: true}
       * @default null
       * @example <caption>Initialize the Combobox with a renderer:</caption>
       * &lt;oj-combobox-many option-renderer="[[optionRenderer]]">&lt;/oj-combobox-many>
       * @example var optionRenderer = function(context) {
       *            var ojOption = document.createElement('oj-option');
       *            // Set the textContent or append other child nodes
       *            ojOption.textContent = context.data['FIRST_NAME'] + ' ' + context.data['LAST_NAME'];
       *            return ojOption;
       *          };
       */
      /**
       * The renderer function that renders the content of each option.
       * The function should return an oj-option element (for leaf option) or an oj-optgroup element (for group option).
       * <p>It is not necessary to set the "value" attribute on the oj-option as it is available from the options data.</p>
       * <p><b>
       * Note: Prior to version 6.1.0, the function could also return one of the following:
       * <ul>
       *   <li>An Object with the following property:
       *     <ul><li>insert: HTMLElement - A DOM element representing the content of the option.</li></ul>
       *   </li>
       *   <li>undefined: If the developer chooses to manipulate the option content directly, the function should return undefined.</li>
       * </ul>
       * This is deprecated and support may be removed in the future.
       * </b></p>
       *
       * <p>The <code class="prettyprint">option-renderer</code> decides only
       * how the options' content has to be rendered in the drop down.
       * Once an option is selected from the drop down,
       * what value has to be displayed in the in input field is decided by the
       * label field in the data object. See <a href="#options">options</a>
       * and <a href="#optionsKeys">options-keys</a> for configuring option label and value.
       * </p>
       *
       * <p>The context parameter passed to the renderer contains the following keys:</p>
       * <table class="keyboard-table">
       *   <thead>
       *     <tr>
       *       <th>Key</th>
       *       <th>Description</th>
       *     </tr>
       *   </thead>
       *   <tbody>
       *     <tr>
       *       <td><kbd>componentElement</kbd></td>
       *       <td>A reference to the Combobox element.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>parent</kbd></td>
       *       <td>The parent of the data item. The parent is null for root node.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>index</kbd></td>
       *       <td>The index of the option, where 0 is the index of the first option. In the hierarchical case the index is relative to its parent.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>depth</kbd></td>
       *       <td>The depth of the option. The depth of the first level children under the invisible root is 0.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>leaf</kbd></td>
       *       <td>Whether the option is a leaf or a group.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>data</kbd></td>
       *       <td>The data object for the option.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>parentElement</kbd></td>
       *       <td>The option label element.  The renderer can use this to directly append content.</td>
       *     </tr>
       *   </tbody>
       * </table>
       *
       * @expose
       * @memberof oj.ojCombobox
       * @instance
       * @ojfragment comboboxCommonOptionRenderer
       */
        optionRenderer: null,

      /**
       * The minimum number of characters a user must type before a options
       * filtering is performed. Zero is useful for local data with just a few items,
       * but a higher value should be used when a single character search could match a few thousand items.
       *
       * @expose
       * @memberof oj.ojComboboxOne
       * @name minLength
       * @ojshortdesc The minimum number of characters a user must type before search filtering is performed.
       * @instance
       * @type {number}
       * @default 0
       * @ojmin 0
       *
       * @example <caption>Initialize the Combobox with the <code class="prettyprint">min-length</code> attribute specified:</caption>
       * &lt;oj-combobox-one min-length="2">&lt;/oj-combobox-one>
       *
       * @example <caption>Get or set the <code class="prettyprint">minLength</code> property after initialization:</caption>
       * // getter
       * var minLengthValue = myCombobox.minLength;
       *
       * // setter
       * myCombobox.minLength = 3;
       *
       */
      /**
       * The minimum number of characters a user must type before a options
       * filtering is performed. Zero is useful for local data with just a few items,
       * but a higher value should be used when a single character search could match a few thousand items.
       *
       * @expose
       * @memberof oj.ojComboboxMany
       * @name minLength
       * @ojshortdesc The minimum number of characters a user must type before search filtering is performed.
       * @instance
       * @type {number}
       * @default 0
       * @ojmin 0
       *
       * @example <caption>Initialize the Combobox with the <code class="prettyprint">min-length</code> attribute specified:</caption>
       * &lt;oj-combobox-many min-length="2">&lt;/oj-combobox-many>
       *
       * @example <caption>Get or set the <code class="prettyprint">minLength</code> property after initialization:</caption>
       * // getter
       * var minLengthValue = myCombobox.minLength;
       *
       * // setter
       * myCombobox.minLength = 3;
       *
       */
        minLength: 0,

      /**
       * {@ojinclude "name":"comboboxCommonRawValue"}
       *
       * @name rawValue
       * @ojshortdesc The currently displayed text retrieved from the input field.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojComboboxOne
       * @type {?string}
       * @default null
       * @since 1.2.1
       * @readonly
       * @ojwriteback
       */
      /**
       * {@ojinclude "name":"comboboxCommonRawValue"}
       *
       * @name rawValue
       * @ojshortdesc The currently displayed text retrieved from the input field.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojComboboxMany
       * @type {?string}
       * @default null
       * @since 1.2.1
       * @readonly
       * @ojwriteback
       */
      /**
       * <p>The  <code class="prettyprint">rawValue</code> is the read-only property for retrieving
       * the current value from the input field in string form. The main consumer of
       * <code class="prettyprint">rawValue</code> is a converter.</p>
       * <p>
       * The <code class="prettyprint">rawValue</code> updates on the 'input' javascript event,
       * so the <code class="prettyprint">rawValue</code> changes as the value of the input is changed.
       * If the user types in '1,200' into the field, the rawValue will be '1', then '1,', then '1,2',
       * ..., and finally '1,200'. Then when the user blurs or presses
       * Enter the <code class="prettyprint">value</code> property gets converted and validated
       * (if there is a converter or validators) and then gets updated if valid.
       * </p>
       * <p>This is a read-only attribute so page authors cannot set or change it directly.</p>
       *
       * @example <caption>Get the <code class="prettyprint">rawValue</code> property after initialization:</caption>
       * // getter
       * var rawValue = myCombobox.rawValue;
       *
       * @ojshortdesc The currently displayed text retrieved from the input field.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojCombobox
       * @ojfragment comboboxCommonRawValue
       */
        rawValue: null,

     /**
      * {@ojinclude "name":"comboboxCommonRequired"}
      *
      * @example <caption>Initialize the Combobox with the <code class="prettyprint">required</code> attribute:</caption>
      * &lt;oj-combobox-one required="[[isRequired]]">&lt;/oj-combobox-one>
      *
      * @example <caption>Get or set the <code class="prettyprint">required</code> property after initialization:</caption>
      * // getter
      * var requiredValue = myCombobox.required;
      *
      * // setter
      * myCombobox.required = true;
      *
      * @name required
      * @ojshortdesc Specifies whether a value is required.
      * @expose
      * @access public
      * @instance
      * @memberof oj.ojComboboxOne
      * @type {boolean}
      * @default false
      * @since 0.7.0
      * @see #translations
      */
     /**
      * {@ojinclude "name":"comboboxCommonRequired"}
      *
      * @example <caption>Initialize the Combobox with the <code class="prettyprint">required</code> attribute:</caption>
      * &lt;oj-combobox-many required="[[isRequired]]">&lt;/oj-combobox-many>
      *
      * @example <caption>Get or set the <code class="prettyprint">required</code> property after initialization:</caption>
      * // getter
      * var requiredValue = myCombobox.required;
      *
      * // setter
      * myCombobox.required = true;
      *
      * @name required
      * @ojshortdesc Specifies whether a value is required.
      * @expose
      * @access public
      * @instance
      * @memberof oj.ojComboboxMany
      * @type {boolean}
      * @default false
      * @since 0.7.0
      * @see #translations
      */
     /**
      * Whether the Combobox is required or optional. When required is set to true, an implicit
      * required validator is created using the validator factory -
      * <code class="prettyprint">oj.Validation.validatorFactory(oj.ValidatorFactory.VALIDATOR_TYPE_REQUIRED).createValidator()</code>.
      *
      * Translations specified using the <code class="prettyprint">translations.required</code> attribute
      * and the label associated with the Combobox, are passed through to the options parameter of the
      * createValidator method.
      *
      * <p>
      * When <code class="prettyprint">required</code> property changes due to programmatic intervention,
      * the Combobox may clear messages and run validation, based on the current state it's in. </br>
      *
      * <h4>Running Validation</h4>
      * <ul>
      * <li>if element is valid when required is set to true, then it runs deferred validation on
      * the value. This is to ensure errors are not flagged unnecessarily.
      * </li>
      * <li>if element is invalid and has deferred messages when required is set to false, then
      * element messages are cleared but no deferred validation is run.
      * </li>
      * <li>if element is invalid and currently showing invalid messages when required is set, then
      * element messages are cleared and normal validation is run using the current display value.
      * <ul>
      *   <li>if there are validation errors, then <code class="prettyprint">value</code>
      *   property is not updated and the error is shown.
      *   </li>
      *   <li>if no errors result from the validation, the <code class="prettyprint">value</code>
      *   property is updated; page author can listen to the <code class="prettyprint">valueChanged</code>
      *   event on the <code class="prettyprint">value</code> property to clear custom errors.</li>
      * </ul>
      * </li>
      * </ul>
      *
      * <h4>Clearing Messages</h4>
      * <ul>
      * <li>Only messages created by the element are cleared.</li>
      * <li><code class="prettyprint">messages-custom</code> attribute is not cleared.</li>
      * </ul>
      *
      * </p>
      *
      * This property set to <code class="prettyprint">false</code> implies that a value is not required to be provided by the user.
      * This is the default.
      * This property set to <code class="prettyprint">true</code> implies that a value is required to be provided by user and the
      * input's label will render a required icon. Additionally a required validator -
      * {@link oj.RequiredValidator} - is implicitly used if no explicit required validator is set.
      * An explicit required validator can be set by page authors using the validators attribute.
      *
      * @expose
      * @access public
      * @instance
      * @memberof oj.ojCombobox
      * @since 0.7.0
      * @see #translations
      * @ojfragment comboboxCommonRequired
      */
        required: false,

      /**
       * Dictates element's readonly state.
       *
       * @example <caption>Initialize the combobox with the <code class="prettyprint">readonly</code> attribute:</caption>
       * &lt;oj-some-element readonly>&lt;/oj-some-element>
       *
       * @example <caption>Get or set the <code class="prettyprint">readonly</code> property after initialization:</caption>
       * // getter
       * var ro = myComp.readonly;
       *
       * // setter
       * myComp.readonly = false;
       *
       * @name readOnly
       * @alias readonly
       * @expose
       * @ojshortdesc Specifies whether the component is read-only. A read-only element cannot be modified, but user interaction is allowed. See the Help documentation for more information.
       * @access public
       * @instance
       * @memberof oj.ojComboboxOne
       * @type {boolean}
       * @default false
       */
      /**
       * Dictates element's readonly state.
       *
       * @example <caption>Initialize the combobox with the <code class="prettyprint">readonly</code> attribute:</caption>
       * &lt;oj-some-element readonly>&lt;/oj-some-element>
       *
       * @example <caption>Get or set the <code class="prettyprint">readonly</code> property after initialization:</caption>
       * // getter
       * var ro = myComp.readonly;
       *
       * // setter
       * myComp.readonly = false;
       *
       * @name readOnly
       * @alias readonly
       * @expose
       * @ojshortdesc Specifies whether the component is read-only. A read-only element cannot be modified, but user interaction is allowed. See the Help documentation for more information.
       * @access public
       * @instance
       * @memberof oj.ojComboboxMany
       * @type {boolean}
       * @default false
       */
        readOnly: false,

     /**
      * {@ojinclude "name":"comboboxCommonValidators"}
      *
      * @property {string} type - the validator type that has a {@link oj.ValidatorFactory} that can
      * be retrieved using the {@link oj.Validation} module. For a list of supported validators refer
      * to {@link oj.ValidatorFactory}. <br/>
      * E.g., <code class="prettyprint">{validators: [{type: 'regExp'}]}</code>
      * @property {Object=} options - optional Object literal of options that the validator expects.
      * <br/>
      * E.g., <code class="prettyprint">{validators: [{type: 'regExp', options: {pattern: '[a-zA-Z0-9]{3,}'}}]}</code>
      *
      * @example <caption>Initialize the Combobox with validator object literal:</caption>
      * &lt;oj-combobox-one validators="[[validators]]">&lt;/oj-combobox-one>
      * @example var validators = [{
      *     type: 'regExp',
      *     options : {
      *       pattern: '[a-zA-Z0-9]{3,}'
      *     }
      *   }];
      *
      * NOTE: oj.Validation.validatorFactory('numberRange') returns the validator factory that is used
      * to instantiate a range validator for numbers.
      *
      * @example <caption>Initialize the Combobox with multiple validator instances:</caption>
      * var validator1 = new MyCustomValidator({'foo': 'A'});
      * var validator2 = new MyCustomValidator({'foo': 'B'});
      * var validators = [validator1, validator2];
      * &lt;oj-combobox-one validators="[[validators]]">&lt;/oj-combobox-one>
      *
      * @example <caption>Get or set the <code class="prettyprint">validators</code> property after initialization:</caption>
      * // get one
      * var validator = myCombobox.validators[0];
      *
      * // get all
      * var validators = myCombobox.validators;
      *
      * // set all
      * myCombobox.validators = myValidators;
      *
      * @name validators
      * @ojshortdesc Specifies a list of synchronous validators for performing validation by the element. See the Help documentation for more information.
      * @expose
      * @access public
      * @instance
      * @memberof oj.ojComboboxOne
      * @type {Array}
      * @default []
      * @ojsignature  { target: "Type",
      *   value: "Array<oj.Validator<V>|oj.Validation.RegisteredValidator>|null",
      *   jsdocOverride: true}
      */
     /**
      * {@ojinclude "name":"comboboxCommonValidators"}
      *
      * @property {string} type - the validator type that has a {@link oj.ValidatorFactory} that can
      * be retrieved using the {@link oj.Validation} module. For a list of supported validators refer
      * to {@link oj.ValidatorFactory}. <br/>
      * E.g., <code class="prettyprint">{validators: [{type: 'regExp'}]}</code>
      * @property {Object=} options - optional Object literal of options that the validator expects.
      * <br/>
      * E.g., <code class="prettyprint">{validators: [{type: 'regExp', options: {pattern: '[a-zA-Z0-9]{3,}'}}]}</code>
      *
      * @example <caption>Initialize the Combobox with validator object literal:</caption>
      * &lt;oj-combobox-many validators="[[validators]]">&lt;/oj-combobox-many>
      * @example var validators = [{
      *     type: 'regExp',
      *     options : {
      *       pattern: '[a-zA-Z0-9]{3,}'
      *     }
      *   }];
      *
      * NOTE: oj.Validation.validatorFactory('numberRange') returns the validator factory that is used
      * to instantiate a range validator for numbers.
      *
      * @example <caption>Initialize the Combobox with multiple validator instances:</caption>
      * var validator1 = new MyCustomValidator({'foo': 'A'});
      * var validator2 = new MyCustomValidator({'foo': 'B'});
      * var validators = [validator1, validator2];
      * &lt;oj-combobox-many validators="[[validators]]">&lt;/oj-combobox-many>
      *
      * @example <caption>Get or set the <code class="prettyprint">validators</code> property after initialization:</caption>
      * // get one
      * var validator = myCombobox.validators[0];
      *
      * // get all
      * var validators = myCombobox.validators;
      *
      * // set all
      * myCombobox.validators = myValidators;
      *
      * @name validators
      * @ojshortdesc Specifies a list of synchronous validators for performing validation by the element. See the Help documentation for more information.
      * @expose
      * @access public
      * @instance
      * @memberof oj.ojComboboxMany
      * @type {Array}
      * @default []
      * @ojsignature  { target: "Type",
      *   value: "Array<oj.Validator<V>|oj.Validation.RegisteredValidator>|null",
      *   jsdocOverride: true}
      */
      /**
       * List of synchronous validators used by component along with asynchronous validators
       * and the implicit component validators when performing validation. Each item is either an
       * instance that duck types {@link oj.Validator}, or is an Object literal containing the
       * properties listed below.
       * <p>
       * Implicit validators are created by the element when certain attributes are present.
       * For example, if the <code class="prettyprint">required</code>
       * attribute is set, an implicit {@link oj.RequiredValidator} is created.
       * At runtime when the component runs validation, it
       * combines all the implicit validators with all the validators
       * specified through this <code class="prettyprint">validators</code> attribute
       * and the <code class="prettyprint">async-validators</code> attribute, and
       * runs all of them.
       * </p>
       * <p>
       * Hints exposed by validators are shown in the notewindow by default, or as determined by the
       * 'validatorHint' property set on the <code class="prettyprint">display-options</code>
       * attribute.
       * </p>
       *
       * <p>
       * When <code class="prettyprint">validators</code> property changes due to programmatic
       * intervention, the element may decide to clear messages and run validation, based on the
       * current state it is in. </br>
       *
       * <h4>Steps Performed Always</h4>
       * <ul>
       * <li>The cached list of validator instances are cleared and new validator hints is pushed to
       * messaging. E.g., notewindow displays the new hint(s).
       * </li>
       * </ul>
       *
       * <h4>Running Validation</h4>
       * <ul>
       * <li>if element is valid when validators changes, element does nothing other than the
       * steps it always performs.</li>
       * <li>if element is invalid and is showing messages -
       * <code class="prettyprint">messages-shown</code> property is non-empty, when
       * <code class="prettyprint">validators</code> or
       * <code class="prettyprint">async-validators</code changes then all element messages
       * are cleared and full validation run using the display value on the element.
       * <ul>
       *   <li>if there are validation errors, then <code class="prettyprint">value</code>
       *   property is not updated and the error is shown.
       *   </li>
       *   <li>if no errors result from the validation, the <code class="prettyprint">value</code>
       *   property is updated; page author can listen to the <code class="prettyprint">valueChanged</code>
       *   event on the <code class="prettyprint">value</code> property to clear custom errors.</li>
       * </ul>
       * </li>
       * <li>if element is invalid and has deferred messages when validators changes, it does
       * nothing other than the steps it performs always.</li>
       * </ul>
       * </p>
       *
       * <h4>Clearing Messages</h4>
       * <ul>
       * <li>Only messages created by the element are cleared.</li>
       * <li><code class="prettyprint">messages-custom</code> property is not cleared.</li>
       * </ul>
       * </p>
       *
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojCombobox
       * @ojfragment comboboxCommonValidators
       */
        validators: [],

      /**
       * The <code class="prettyprint">valueOption</code> is similar to the <code class="prettyprint">value</code>, but is an
       * Object which contains both a value and display label.
       * The <code class="prettyprint">value</code> and <code class="prettyprint">valueOption</code> are kept in sync.
       * If initially both are set, the selected value in the <code class="prettyprint">value</code> attribute has precedence.
       * <p>Note: If the <code class="prettyprint">options</code> attribute is a data provider, and if there is an initially selected value, setting the <code class="prettyprint">valueOption</code> attribute initially can improve page load performance because the element will not have to fetch the selected label from the data provider.</p>
       * <p>If <code class="prettyprint">valueOption</code> is not specified or the selected value is missing, then the label will be fetched from the data provider.</p>
       *
       * @name valueOption
       * @ojshortdesc The current value of the element and its associated display label.
       * @expose
       * @instance
       * @type {null | Object}
       * @default null
       * @ojwriteback
       *
       * @property {any} value current value of JET Combobox
       * @property {string} [label] display label of value above. If missing, String(value) is used.
       * @memberof oj.ojComboboxOne
       * @ojsignature { target: "Type",
       *                value: "V|null", for: "value"}
       *
       * @example <caption>Initialize the Combobox with the <code class="prettyprint">value-option</code> attribute specified:</caption>
       * &lt;oj-combobox-one value-option="[[valueOption]]">&lt;/oj-combobox-one>
       *
       * @example <caption>Object with value and label properties:</caption>
       * var valueOption = {'value': 'val1', 'label': 'Label 1'};
       *
       * @example <caption>Get or set the <code class="prettyprint">valueOption</code> property after initialization:</caption>
       * // getter
       * var valueOption = myCombobox.valueOption;
       *
       * // setter
       * myCombobox.valueOption = valueOption;
       */
        valueOption: null,

      /**
       * The <code class="prettyprint">valueOptions</code> is similar to the <code class="prettyprint">value</code>, but is an array
       * of Objects and each Object contains both a value and display label.
       * The <code class="prettyprint">value</code> and <code class="prettyprint">valueOptions</code> are kept in sync.
       * If initially both are set, the selected values in the <code class="prettyprint">value</code> attribute has precedence.
       * <p>Note: If the <code class="prettyprint">options</code> attribute is a data provider, and if there are initially selected values, setting the <code class="prettyprint">valueOptions</code> attribute initially can improve page load performance because the element will not have to fetch the selected labels from the data provider.</p>
       *<p>If <code class="prettyprint">valueOptions</code> is not specified or one of the selected values is missing, then the labels will be fetched from the data provider.</p>
       *
       * @name valueOptions
       * @ojshortdesc The current values of the element and their associated display labels.
       * @expose
       * @instance
       * @type {null | Array.<Object>}
       * @default null
       * @ojwriteback
       *
       * @property {any} value a current value of JET Combobox
       * @property {string} [label] display label of value above. If missing, String(value) is used.
       * @ojsignature { target: "Type",
       *                value: "Array<{value: V, label?: string}> | null",
       *                jsdocOverride: true}
       *
       * @memberof oj.ojComboboxMany
       *
       * @example <caption>Initialize the Combobox with the <code class="prettyprint">value-options</code> attribute specified:</caption>
       * &lt;oj-combobox-many value-options="[[optionsArray]]">&lt;/oj-combobox-many>
       *
       * @example <caption>Array of Objects with value and label properties:</caption>
       * var optionsArray = [{'value': 'val1', 'label': 'Label 1'},
       *                     {'value': 'val2', 'label': 'Label 2'}];
       *
       * @example <caption>Get or set the <code class="prettyprint">valueOptions</code> property after initialization:</caption>
       * // getter
       * var valueOptions = myCombobox.valueOptions;
       *
       * // setter
       * myCombobox.valueOptions = optionsArray;
       */
        valueOptions: null,

      /**
       * The value of the element. It supports any type.
       *
       * @example <caption>Initialize the combobox with the <code class="prettyprint">value</code> attribute specified:</caption>
       * &lt;oj-combobox-one value="option1">&lt;/oj-combobox-one>
       *
       * @example <caption>Get or set the <code class="prettyprint">value</code> property after initialization:</caption>
       * // getter
       * var value = myCombobox.value;
       *
       * // setter
       * myCombobox.value = "option1";
       *
       * @member
       * @name value
       * @ojshortdesc The value of the element.
       * @access public
       * @instance
       * @memberof oj.ojComboboxOne
       * @type {any}
       * @ojsignature { target: "Type",
       *                value: "V|null"}
       * @default null
       * @ojwriteback
       */
      /**
       * The value of the element. The value is an array with any type of items.
       *
       * @example <caption>Initialize the combobox with the <code class="prettyprint">value</code> attribute specified:</caption>
       * &lt;oj-combobox-many value="{{val}}">&lt;/oj-combobox-many>
       * @example var val = ['option1', 'option2'];
       *
       * @example <caption>Get or set the <code class="prettyprint">value</code> property after initialization:</caption>
       * // getter
       * var value = myCombobox.value;
       *
       * // setter
       * myCombobox.value = ["option1", "option2"];
       *
       * @member
       * @name value
       * @ojshortdesc The value of the element.
       * @access public
       * @instance
       * @memberof oj.ojComboboxMany
       * @type {Array.<any>|null}
       * @ojsignature { target: "Type",
       *                value: "Array<V>|null"}
       * @default null
       * @ojwriteback
       */

      /**
       * Triggered when the value is submitted by the user through pressing the enter key or selecting from the drop down list.
       * This is to support search use cases.
       * The event will be fired even if the value is the same. This will help the application to re-submit the search query for the same value.
       * The event is not triggered if the submitted value fails validation. The event is not triggered on blur or tab out.
       *
       * @example <caption>Define an event listener.</caption>
       * var listener = function( event )
       * {
       *   // Get the search term
       *   var term = event['detail']['value'];
       *
       *   // search with the term
       * };
       * @ojshortdesc Event handler for when the value is submitted by the user.
       * @expose
       * @event
       * @memberof oj.ojComboboxOne
       * @since 4.2.0
       * @ojstatus preview
       * @instance
       * @property {any} value the current value
       * @property {any} previousValue the previous value
       */
        valueUpdated: null
      },

      /**
       * Returns a jQuery object containing the element visually representing the combobox.
       *
       * <p>This method does not accept any arguments.
       *
       * @memberof! oj.ojCombobox
       * @instance
       * @public
       * @ignore
       * @return {jQuery} the combobox
       */
      widget: function () {
        return this.combobox.container;
      },


      /**
       * @memberof! oj.ojCombobox
       * @instance
       * @protected
       * @override
       */
      _ComponentCreate: function () {
        this._super();
        _ComboUtils.wrapDataProviderIfNeeded(this, null);
        this._setup();
      },

      /**
       * @memberof! oj.ojCombobox
       * @instance
       * @protected
       * @override
       */
      _AfterCreate: function () {
        this._super();

        if (this._IsCustomElement()) {
          oj.EditableValueUtils._setInputId(
            this._GetContentElement()[0], this.OuterWrapper.id, this.options.labelledBy);
        }
      },

      /**
       * @memberof! oj.ojCombobox
       * @instance
       * @protected
       * @override
       */
      _InitOptions: function (originalDefaults, constructorOptions) {
        var props = [{ attribute: 'disabled', validateOption: true },
                     { attribute: 'placeholder' },
                     { attribute: 'required', coerceDomValue: true, validateOption: true },
                     { attribute: 'title' }
                     // {attribute: "value"}
        ];

        this._super(originalDefaults, constructorOptions);
        oj.EditableValueUtils.initializeOptionsFromDom(props, constructorOptions, this);

        this.multiple = !this._IsCustomElement() ? this.options.multiple :
                      this.OuterWrapper.nodeName === 'OJ-COMBOBOX-MANY';

        if (this.options.value === undefined) {
          if (!this._IsCustomElement()) {
            this.options.value = (this.element.attr('value') !== undefined) ? _ComboUtils.splitVal(this.element.val(), ',') : null;
          }
        } else {
          // clone the value, otherwise _setDisplayValue will not be invoked on binding value to ko observableArray.
          // TODO: Need to revisit this once 18724975 is fixed.
          var value = this.options.value;
          if (Array.isArray(value)) {
            if (!this._IsCustomElement()) {
              value = value.slice(0);
            }
          } else if (typeof value === 'string') {
            if (this.multiple === true) {
              value = _ComboUtils.splitVal(value, ',');
            } else if (!this._IsCustomElement()) {
              value = [value];
            }
          }
          this.options.value = value;
        }
      },
   /**
    * Whether the component is required.
    *
    * @return {boolean} true if required; false
    *
    * @memberof! oj.ojCombobox
    * @instance
    * @protected
    * @override
    */
      _IsRequired: function () {
        return this.options.required;
      },
    /**
     * @memberof! oj.ojCombobox
     * @instance
     * @private
     */
      _labelledByChangedForInputComp: oj.EditableValueUtils._labelledByChangedForInputComp,
    /**
     * Performs post processing after required option is set by taking the following steps.
     *
     * - if component is invalid and has messgesShown -> required: false/true -> clear component errors;
     * run full validation with UI value (we don't know if the UI error is from a required validator
     * or something else);<br/>
     * &nbsp;&nbsp;- if there are validation errors, then value not pushed to model; messagesShown is
     * updated<br/>
     * &nbsp;&nbsp;- if no errors result from the validation, push value to model; author needs to
     * listen to optionChange(value) to clear custom errors.<br/>
     *
     * - if component is invalid and has messagesHidden -> required: false -> clear component
     * errors; no deferred validation is run.<br/>
     * - if component has no error -> required: true -> run deferred validation (we don't want to flag
     * errors unnecessarily)<br/>
     * - messagesCustom is never cleared<br/>
     *
     * @param {string} option
     *
     * @memberof! oj.ojCombobox
     * @instance
     * @protected
     */
      _AfterSetOptionRequired: oj.EditableValueUtils._AfterSetOptionRequired,

    /**
     * When validators option changes, take the following steps.
     *
     * - Clear the cached normalized list of all validator instances. push new hints to messaging.<br/>
     * - if component is valid -> validators changes -> no change<br/>
     * - if component is invalid has messagesShown -> validators changes -> clear all component
     * messages and re-run full validation on displayValue. if there are no errors push value to
     * model;<br/>
     * - if component is invalid has messagesHidden -> validators changes -> do nothing; doesn't change
     * the required-ness of component <br/>
     * - messagesCustom is not cleared.<br/>
     *
     * NOTE: The behavior applies to any option that creates implicit validators - min, max, pattern,
     * etc. Components can call this method when these options change.
     *
     * @memberof! oj.ojCombobox
     * @instance
     * @protected
     */
      _AfterSetOptionValidators: oj.EditableValueUtils._AfterSetOptionValidators,
      /**
        * When async-validators attribute changes, take the following steps.
        *
        * - Clear the cached normalized list of all validator instances. push new hints to messaging.<br/>
        * - if component is valid -> validators changes -> no change<br/>
        * - if component is invalid has messagesShown -> validators changes -> clear all component
        * messages and re-run full validation on displayValue. if there are no errors push value to
        * model;<br/>
        * - if component is invalid has messagesHidden -> validators changes -> do nothing; doesn't change
        * the required-ness of component <br/>
        * - messagesCustom is not cleared.<br/>
        * @memberof! oj.ojCombobox
        * @instance
        * @protected
        */
      _AfterSetOptionAsyncValidators: oj.EditableValueUtils._AfterSetOptionAsyncValidators,
    /**
     * Performs post processing after converter option changes by taking the following steps.
     *
     * - always push new converter hint to messaging <br/>
     * - if component has no errors -> refresh UI value<br/>
     * - if component is invalid has messagesShown -> clear all component errors and run full
     * validation using display value. <br/>
     * &nbsp;&nbsp;- if there are validation errors, value is not pushed to model; messagesShown is
     * updated.<br/>
     * &nbsp;&nbsp;- if no errors result from the validation, push value to model; author needs to
     * listen to optionChange(value) to clear custom errors.<br/>
     * - if component is invalid has messagesHidden -> refresh UI value. no need to run deferred
     * validations. <br/>
     * - messagesCustom is never cleared<br/>
     *
     * @memberof! oj.ojCombobox
     * @instance
     * @protected
     */
      _AfterSetOptionConverter: oj.EditableValueUtils._AfterSetOptionConverter,
    /**
     * Called when converter option changes and we have gotten the new converter
     * @memberof! oj.ojCombobox
     * @instance
     * @protected
     */
      _ResetConverter: oj.EditableValueUtils._ResetConverter,
    /**
     * Returns the normalized converter instance.
     *
     * @return {Object} a converter instance or null
     * @memberof! oj.ojCombobox
     * @instance
     * @protected
     */
      _GetConverter: oj.EditableValueUtils._GetConverter,
    /**
     * This returns an array of all validators
     * normalized from the validators option set on the component. <br/>
     * @return {Array} of validators.
     * @memberof! oj.ojCombobox
     * @instance
     * @protected
     */
      _GetNormalizedValidatorsFromOption: oj.EditableValueUtils._GetNormalizedValidatorsFromOption,
   /**
    * This returns an array of all async validators
    * normalized from the async-validators attribute set on the component. <br/>
    * @return {Array} of validators.
    * @memberof! oj.ojCombobox
    * @instance
    * @protected
    */
      _GetNormalizedAsyncValidatorsFromOption:
        oj.EditableValueUtils._GetNormalizedAsyncValidatorsFromOption,

      _setup: function () {
        var opts = {};
        var multi = this.multiple;

        opts.element = this.element;
        opts.ojContext = this;

        // fixup valueOption(s) if placeholder is selected
        if (_ComboUtils.isValueForPlaceholder(multi, this.options.value)) {
          if (multi) {
            this.options.valueOptions =
              _ComboUtils.getValueOptionsForPlaceholder(this, this.options.valueOptions);
          } else {
            this.options.valueOption =
              _ComboUtils.getValueOptionsForPlaceholder(this, this.options.valueOption);
          }
        }
        opts = $.extend(this.options, opts);

        this.combobox = multi ? new _OjMultiCombobox() : new _OjSingleCombobox();

        this.combobox._init(opts);
        this._refreshRequired(this.options.required);

        //  - need to be able to specify the initial value of select components bound to dprv
        this._resolveValueOptionsLater = _ComboUtils.mergeValueAndValueOptions(this);
      },

    /**
     * @memberof! oj.ojCombobox
     * @instance
     * @private
     */
      _refreshRequired: oj.EditableValueUtils._refreshRequired,

    /**
     * Called to find out if aria-required is unsupported.
     * @memberof! oj.ojCombobox
     * @instance
     * @protected
     */
      _AriaRequiredUnsupported: function () {
        return false;
      },
    /**
     * @memberof! oj.ojCombobox
     * @instance
     * @protected
     * @override
     */
      _destroy: function () {
        this.combobox._destroy();
        this._super();
      },

    /**
     * Refreshes the combobox.
     *
     * <p>This method does not accept any arguments.
     *
     * @expose
     * @memberof oj.ojCombobox
     * @instance
     * @return {void}
     * @ojshortdesc Refreshes the combobox.
     * @public
     */
      refresh: function () {
        this._super();

        this.combobox._destroy();
        this._setup();
        this._SetRootAttributes();
      },

      /**
       * Handles options specific to combobox.
       * @override
       * @protected
       * @memberof! oj.ojCombobox
       */
      _setOption: function (key, _value, flags) {
        var value = _value;
        var multi = this.multiple;

        if (key === 'value') {
          if (Array.isArray(value)) {
            if (!this._IsCustomElement()) {
              value = value.slice(0);
            }
          } else if (typeof value === 'string') {
            if (multi === true) {
              value = _ComboUtils.splitVal(value, ',');
            } else if (!this._IsCustomElement()) {
              value = [value];
            }
          }

          // valueChangeTrigger will be used while setting the display value.
          if (flags && flags._context && flags._context.optionMetadata) {
            this.combobox.valueChangeTrigger = flags._context.optionMetadata.trigger;
          } else {
            this.combobox.valueChangeTrigger = null;
          }

          //  - placeholder is not displayed after removing selections from select many
          //  - resetting value when value-option and placeholder are set throws exception
          if ((typeof this.options.placeholder === 'string') &&
              ((value == null || (value && value.length === 0)) ||
               (this._IsCustomElement() && _ComboUtils.isValueForPlaceholder(multi, value)))) {
            _ComboUtils.setValueOptions(this,
                                        _ComboUtils.getFixupValueOptionsForPlaceholder(multi));
            this._super(key, value, flags);
            return;
          }
        }

        // if we have a new data provider, remove the old dataProvider event listeners
        if (key === 'options') {
          _ComboUtils.removeDataProviderEventListeners(this);
          _ComboUtils.clearDataProviderWrapper(this);
        } else if (key === 'valueOption' && multi !== true) {
          // fixup valueOption
          value = _ComboUtils.getValueOptionsForPlaceholder(this, value);
          //  - unable to clear values on lov value-option, to get the placeholder to show
          this.combobox.opts.valueOption = value;
        } else if ((key === 'valueOptions' && multi === true)) {
          // fixup valueOptions
          value = _ComboUtils.getValueOptionsForPlaceholder(this, value);
          //  - unable to clear values on lov value-option, to get the placeholder to show
          this.combobox.opts.valueOptions = value;
        }
        this._super(key, value, flags);

        //  - need to be able to specify the initial value of select components bound to dprv
        if (key === 'valueOption' && multi !== true) {
          _ComboUtils.syncValueWithValueOption(this, value, this.options.value, false);
        } else if (key === 'valueOptions' && multi === true) {
          _ComboUtils.syncValueWithValueOptions(this, value, this.options.value, false);
        } else if (key === 'value') {
          // update valueOptions
          _ComboUtils.updateValueOptions(this.combobox);
        } else if (key === 'options') {
          // only add data provider event listeners to new data provider
          if (_ComboUtils.isDataProvider(value)) {
            _ComboUtils.wrapDataProviderIfNeeded(this, this.combobox ? this.combobox.opts : null);
            _ComboUtils.addDataProviderEventListeners(this);
          }
          this.combobox.opts.options = value;
          this.combobox.opts = this.combobox._prepareOpts(this.combobox.opts);
        } else if (key === 'disabled') {
          if (value) {
            this.combobox._disable();
          } else {
            this.combobox._enable();
          }
          // Readonly support
        } else if (key === 'readOnly') {
          this.combobox.applyReadonlyState();
        } else if (key === 'labelledBy') {
          if (this.options.labelledBy) {
            var id = this._GetContentElement()[0].id;
            this._labelledByChangedForInputComp(this.options.labelledBy, id);
          }
        }
      },
      /**
       * Performs post processing after _SetOption() is called. Different options when changed perform
       * different tasks. See _AfterSetOption[OptionName] method for details.
       *
       * @param {string} option
       * @param {Object|string=} previous
       * @param {Object=} flags
       * @protected
       * @memberof! oj.ojCombobox
       * @instance
       * @override
       */
      // eslint-disable-next-line no-unused-vars
      _AfterSetOption: function (option, previous, flags) {
        this._superApply(arguments);
        switch (option) {
          case 'required':
            this._AfterSetOptionRequired(option);
            break;
          case 'validators':
            this._AfterSetOptionValidators(option);
            break;
          case 'converter':
            this._AfterSetOptionConverter(option);
            break;
          case 'asyncValidators':
            this._AfterSetOptionAsyncValidators(option);
            break;
          default:
            break;
        }
      },

      // 19670748, dropdown popup should be closed on subtreeDetached notification.
      _NotifyDetached: function () {
        this._superApply(arguments);
        this.combobox.close();
      },

      // 19670748, dropdown popup should be closed on subtreeHidden notification.
      _NotifyHidden: function () {
        this._superApply(arguments);
        this.combobox.close();
      },

      /**
       * Override to do the delay connect/disconnect
       * @memberof oj.ojCombobox
       * @override
       * @protected
       */
      _VerifyConnectedForSetup: function () {
        //  - temp moving oj-select from one elem to another should not cause fetch
        return true;
      },

      /**
       * Updates display value of combobox.
       * @override
       * @protected
       * @memberof! oj.ojCombobox
       */
      // eslint-disable-next-line no-unused-vars
      _SetDisplayValue: function (displayValue) {
        //  - need to be able to specify the initial value of select components bound to dprv
        if (_ComboUtils.applyValueOptions(this.combobox, this.options)) {
          if (this.multiple) {
            this.combobox._clearSearch();
          }
        } else {
          this.combobox._initSelection();
        }
        this._resolveValueOptionsLater = false;
      },

      /**
       * Set the placeholder.
       * @override
       * @protected
       * @memberof! oj.ojCombobox
       */
      _SetPlaceholder: function (value) {
        if (this.combobox) {
          this.combobox.opts.placeholder = value;
          // TODO: pavitra - noticed that some combobox tests fail because the _setPlaceholder is
          // undefined, when this method is called from _AfterCreate().
          if (this.combobox._setPlaceholder) {
            this.combobox._setPlaceholder();
          }
        }
      },

    /**
       * Parses the value using the converter set and returns the parsed value. If parsing fails the
       * error is written into the element
       *
       * @override
       * @protected
       * @memberof! oj.ojCombobox
       * @instance
       */
      _parseValue: function (_submittedValue) {
        var parsedVal;
        var submittedValue = _submittedValue;

        if (typeof submittedValue === 'string') {
          if (this.multiple === true) {
            submittedValue = _ComboUtils.splitVal(submittedValue, ',');
          } else if (!this._IsCustomElement()) {
            submittedValue = [submittedValue];
          }
        }
        if (Array.isArray(submittedValue)) {
          parsedVal = [];
          for (var i = 0; i < submittedValue.length; i++) {
            var parsed = this._super(submittedValue[i]);
            parsedVal.push(parsed);
          }
        } else {
          parsedVal = this._super(submittedValue);
        }
        return parsedVal;
      },

    /**
     * Returns the messaging launcher element  i.e., where user sets focus that triggers the popup.
     * Usually this is the element input or select that will receive focus and on which the popup
     * for messaging is initialized.
     *
     * @override
     * @protected
     * @memberof! oj.ojCombobox
     * @return {Object} jquery element which represents the messaging launcher component
     */
      _GetMessagingLauncherElement: function () {
        return this.combobox.search;
      },

    /**
     * @override
     * @protected
     * @memberof! oj.ojCombobox
     *
     * @param {!Object} menu The JET Menu to open as a context menu.  Always non-<code class="prettyprint">null</code>.
     * @param {!Event} event What triggered the menu launch.  Always non-<code class="prettyprint">null</code>.
     * @param {string} eventType "mouse", "touch", or "keyboard".  Never <code class="prettyprint">null</code>.
     */
      _NotifyContextMenuGesture: function (menu, event, eventType) {
      // The default baseComponent behavior in _OpenContextMenu assumes this.element for the
      // launcher. In this case, the original element the component is bound to is
      // hidden (display: none). Pass in an openOption override.
        var launcher = this._GetMessagingLauncherElement();
        this._OpenContextMenu(event, eventType, { launcher: launcher });
      },

    /**
     * Returns the jquery element that represents the content part of the component.
     * This is usually the component that user sets focus on (tabindex is set 0) and
     * where aria attributes like aria-required, aria-labeledby etc. are set. This is
     * also the element where the new value is updated. Usually this is the same as
     * the _GetMessagingLauncherElement.
     *
     * @override
     * @protected
     * @memberof! oj.ojCombobox
     * @return {jQuery} jquery element which represents the content.
     */
      _GetContentElement: function () {
        return this.combobox.search;
      },

    /**
     * Returns the default styleclass for the component.
     *
     * @return {string}
     * @expose
     * @memberof! oj.ojCombobox
     * @override
     * @protected
     */
      _GetDefaultStyleClass: function () {
        return 'oj-combobox';
      },

    /**
     *
     * @protected
     * @override
     * @instance
     * @memberof! oj.ojCombobox
     */
      _SetLoading: function () {
        this._super();
        this.combobox.applyReadonlyState();
      },

    /**
     *
     * @protected
     * @override
     * @instance
     * @memberof! oj.ojCombobox
     */
      _ClearLoading: function () {
        this._super();
        this.combobox.applyReadonlyState();
      },
    /**
     * <ol>
     * <li>All messages are cleared, including custom messages added by the app. </li>
     * <li>If no converter is present then processing continues to next step. If a converter is
     * present, the UI value is first converted (i.e., parsed). If there is a parse error then
     * the messages are shown.</li>
     * <li>If there are no validators setup for the component the <code class="prettyprint">value</code>
     * option is updated using the display value. Otherwise all
     * validators are run in sequence using the parsed value from the previous step. The implicit
     * required validator is run first if the component is marked required. When a validation error is
     * encountered it is remembered and the next validator in the sequence is run. </li>
     * <li>At the end of validation if there are errors, the messages are shown.
     * If there were no errors, then the
     * <code class="prettyprint">value</code> option is updated.</li>
     * </ol>
     *
     * @example <caption>Validate component using its current value.</caption>
     * myComp.validate();
     *
     * @example <caption>Validate component and use the Promise's resolved state.</caption>
     * myComp.validate().then(
     *  function(result) {
     *    if(result === "valid")
     *    {
     *      submitForm();
     *    }
     *  });
     * @return {Promise} Promise resolves to "valid" if there were no converter parse errors and
     * the component passed all validations.
     * The Promise resolves to "invalid" if there were converter parse errors or
     * if there were validation errors.
     * @ojshortdesc Validates the component's display value using all converters and validators registered on the component. If there are no validation errors, then the value is updated. See the Help documentation for more information.
     * @method
     * @access public
     * @expose
     * @instance
     * @memberof oj.ojCombobox
     * @ojstatus preview
     */
      validate: function () {
        var displayValueForSetValue = this._getDisplayValueForSetValue();
        var returnValue;

        // returns Promise that resolves to true|false or boolean
        returnValue = this._SetValue(displayValueForSetValue, null,
          this._VALIDATE_METHOD_OPTIONS);

        if (this._IsCustomElement()) {
          if (!(returnValue instanceof Promise)) {
            returnValue = Promise.resolve(returnValue ? 'valid' : 'invalid');
          } else {
            returnValue = returnValue.then(function (booleanSetValueReturn) {
              return Promise.resolve(booleanSetValueReturn ? 'valid' : 'invalid');
            });
          }
        }
        return returnValue;
      },

      /**
       * Whether a value can be set on the component. For example, if the component is
       * disabled or readOnly then setting value on component is a no-op.
       *
       * @see #_SetValue
       * @return {boolean}
       * @memberof oj.ojCombobox
       * @override
       * @instance
       * @protected
       */
      _CanSetValue: function () {
        // FIX  - VALUE UNCHANGED IN DISABLED SELECT WHEN CHANGING BOUND VALUEOPTION
        // _SetValue always performs validation, which calls _CanSetValue, which returns false if
        // the component is disabled, thereby disallowing the set.  Override _CanSetValue here
        // so that we can force it to return true when syncing the value with the valueOption[s]
        // from _ComboUtils.syncValueWithValueOption[s].
        if (this.forceCanSetValue) {
          return true;
        }
        return this._super();
      },

      _getDisplayValueForSetValue: function () {
        var displayValue = null;
        var newValue = null;

        if (this.multiple !== true) {
          // Fix  - oj-combobox data provider options validate label copied to value
          // getValOpts returns the current value option of the ojComboboxOne
          displayValue = this.combobox.getValOpts() ? this.combobox.getValOpts().value : null;
          if (!this._IsCustomElement()) {
            if (displayValue === undefined || displayValue === null || displayValue === '') {
              newValue = [];
            } else {
              newValue = [displayValue];
            }
          } else {
            newValue = displayValue;
          }
        } else {
          var existingValue = this.combobox.getVal() ? this.combobox.getVal() : [];
          displayValue = this.combobox.search.val();

          if (displayValue === undefined || displayValue === null || displayValue === '') {
            newValue = existingValue;
          } else {
            existingValue.push(displayValue);
            newValue = existingValue;
          }
        }
        return newValue;
      },

      _getDropdown: function () {
        if (this.combobox && this.combobox._opened()) {
          var dropdown = $('.oj-listbox-drop');
          for (var i = 0; i < dropdown.length; i++) {
            if ($(dropdown[i]).attr('id') === 'oj-listbox-drop' &&
                $(dropdown[i]).attr('data-oj-containerid') === this.combobox.containerId) {
              return $(dropdown[i]);
            }
          }
        }
        return null;
      },

      _findItem: function (list, value) {
        for (var i = 0; i < list.length; i++) {
          if ($(list[i]).data('ojcombobox').value === value) {
            return list[i];
          }
        }
        return null;
      },


    // ////////////////     SUB-IDS     //////////////////

    /**
     * <p>Sub-ID for the input field</p>
     * @ojsubid oj-combobox-input
     * @memberof oj.ojCombobox
     *
     * @example <caption>Get the input field element</caption>
     * var node = myElement.getNodeBySubId({'subId': 'oj-combobox-input'});
     */

    /**
     * <p>Sub-ID for the drop down arrow of single-select combobox.</p>
     *
     * @ojsubid oj-combobox-arrow
     * @memberof oj.ojComboboxOne
     *
     * @example <caption>Get the drop down arrow of the combobox</caption>
     * var node = myElement.getNodeBySubId({'subId': 'oj-combobox-arrow'});
     */

    /**
     * <p>Sub-ID for the list item.</p>
     *
     * @ojsubid oj-listitem
     * @memberof oj.ojCombobox
     *
     * @example <caption>Get the listitem corresponding to value "myVal"</caption>
     * var node = myElement.getNodeBySubId({'subId': 'oj-listitem', 'value': 'myVal'});
     */

    /**
     * <p>Sub-ID for the remove icon of selected item.</p>
     *
     * @ojsubid oj-combobox-remove
     * @memberof oj.ojComboboxMany
     *
     * @example <caption>Get the element corresponding to the remove icon for the selected item with
     * value "myVal"</caption>
     * var node = myElement.getNodeBySubId({'subId': 'oj-combobox-remove', 'value': 'myVal'});
     */

    /**
     * <p>Sub-ID for the dropdown box.</p>
     *
     * @ojsubid oj-combobox-drop
     * @deprecated 1.2.0 This sub-ID is not needed since it is not an interactive element.
     * @memberof oj.ojCombobox
     * @ignore
     *
     * @example <caption>Get the dropdown box</caption>
     * var node = myElement.getNodeBySubId({'subId': 'oj-combobox-drop'});
     */

    /**
     * <p>Sub-ID for the filtered result list.</p>
     *
     * @ojsubid oj-combobox-results
     * @deprecated 1.2.0 This sub-ID is not needed since it is not an interactive element.
     * @memberof oj.ojCombobox
     * @ignore
     *
     * @example <caption>Get the filtered result list</caption>
     * var node = myElement.getNodeBySubId({'subId': 'oj-combobox-results'});
     */

    /**
     * <p>Sub-ID for the selected items. This returns a
     * list of the selected items.</p>
     *
     * @ojsubid oj-combobox-selection
     * @deprecated 1.2.0 This sub-ID is not needed since it is not an interactive element.
     * @memberof oj.ojComboboxMany
     * @ignore
     *
     * @example <caption>Get the list of selected items</caption>
     * var node = myElement.getNodeBySubId({'subId': 'oj-combobox-selection'});
     */

      // @inheritdoc
      getNodeBySubId: function (locator) {
        var node = null;
        var subId;
        if (locator == null) {
          return this.combobox.container ? this.combobox.container[0] : null;
        }

        node = this._super(locator);


        if (!node) {
          subId = locator.subId;
          if (subId === 'oj-combobox-drop') {
            subId = 'oj-listbox-drop';
          }

          if (subId === 'oj-combobox-results') {
            subId = 'oj-listbox-results';
          }

          if (subId === 'oj-combobox-selection') {
            subId = 'oj-combobox-selected-choice';
          }

          var dropdown = this._getDropdown();

          switch (subId) {
            case 'oj-combobox-input':
            case 'oj-combobox-arrow':
              node = this.widget().find('.' + subId)[0];
              break;
            case 'oj-listitem':
              if (dropdown) {
                var list = dropdown.find('.oj-listbox-result');
                node = this._findItem(list, locator.value);
              }
              break;
            case 'oj-combobox-remove':
              var selectedItems = this.widget().find('.oj-combobox-selected-choice');
              var item = this._findItem(selectedItems, locator.value);
              node = item ? $(item).find('.oj-combobox-clear-entry-icon')[0] : null;
              break;
            case 'oj-listbox-drop':
              if (dropdown) {
                node = dropdown[0];
              }
              break;
            case 'oj-listbox-results':
              if (dropdown) {
                node = dropdown.find('.' + subId)[0];
              }
              break;
            case 'oj-combobox-selected-choice':
              node = this.widget().find('.' + subId).toArray();
              break;
            default:
              break;
          }
        }

        // Non-null locators have to be handled by the component subclasses
        return node || null;
      },

    /**
     * Returns the subId object for the given child DOM node.  For more details, see
     * <a href="#getNodeBySubId">getNodeBySubId</a>.
     *
     * @expose
     * @override
     * @ignore
     * @memberof oj.ojCombobox
     * @instance
     *
     * @param {!Element} node - child DOM node
     * @return {Object|null} The subId for the DOM node, or <code class="prettyprint">null</code> when none is found.
     *
     * @example <caption>Get the subId for a certain DOM node:</caption>
     * myElement.getSubIdByNode(node);
     */
      getSubIdByNode: function (node) {
        var subId = null;

        if (node != null) {
          var nodeCached = $(node);

          if (nodeCached.hasClass('oj-combobox-input')) {
            subId = { subId: 'oj-combobox-input' };
          } else if (nodeCached.hasClass('oj-combobox-arrow')) {
            subId = { subId: 'oj-combobox-arrow' };
          } else if (nodeCached.hasClass('oj-listbox-result')) {
            subId = { subId: 'oj-listitem', value: nodeCached.data('ojcombobox').value };
          } else if (nodeCached.hasClass('oj-combobox-clear-entry-icon')) {
            subId = { subId: 'oj-combobox-remove', value: nodeCached.closest('.oj-combobox-selected-choice').data('ojcombobox').value };
          } else {
            subId = this._super(node);
          }
        }

        return subId;
      }


  // Fragments:

  /**
   * <p>The &lt;oj-combobox-one> element accepts <code class="prettyprint">oj-option</code> elements as children. See the [oj-option]{@link oj.ojOption} documentation for details about
   * accepted children and slots.</p>
   *
   * @ojchild Default
   * @memberof oj.ojComboboxOne
   * @ojshortdesc The oj-combobox-one element accepts oj-option elements as children.
   *
   * @example <caption>Initialize the Combobox with child content specified:</caption>
   * &lt;oj-combobox-one>
   *   &lt;oj-option value="option1">Option 1&lt;/oj-option>
   *   &lt;oj-option value="option2">Option 2&lt;/oj-option>
   *   &lt;oj-option value="option3">Option 3&lt;/oj-option>
   * &lt;/oj-combobox-one>
   */

  /**
   * <p>The &lt;oj-combobox-many> element accepts <code class="prettyprint">oj-option</code> elements as children. See the [oj-option]{@link oj.ojOption} documentation for details about
   * accepted children and slots.</p>
   *
   * @ojchild Default
   * @memberof oj.ojComboboxMany
   * @ojshortdesc The oj-combobox-many element accepts oj-option elements as children.
   *
   * @example <caption>Initialize the Combobox with child content specified:</caption>
   * &lt;oj-combobox-many>
   *   &lt;oj-option value="option1">Option 1&lt;/oj-option>
   *   &lt;oj-option value="option2">Option 2&lt;/oj-option>
   *   &lt;oj-option value="option3">Option 3&lt;/oj-option>
   * &lt;/oj-combobox-many>
   */

  /**
   * <p>The <code class="prettyprint">end</code> slot is for replacing combobox one's drop down arrow and the divider.
   * For example, a magnifying glass icon for a search field can be provided in this slot.
   * When the slot is provided with empty content, nothing will be rendered in the slot.
   * When the slot is not provided, the default drop down arrow icon and the divider will be rendered.</p>
   *
   * @ojslot end
   * @ojshortdesc The end slot enables replacement of the combobox's drop down arrow and divider. See the Help documentation for more information.
   * @since 4.2.0
   * @ojstatus preview
   * @memberof oj.ojComboboxOne
   *
   * @example <caption>Initialize the Combobox one with child content specified for the end slot:</caption>
   * &lt;oj-combobox-one>
   *   &lt;a slot='end' class='mySearchButtonClass'>&lt;/a>
   * &lt;/oj-combobox-one>
   */


 /**
   * <table class="keyboard-table">
   *   <thead>
   *     <tr>
   *       <th>Target</th>
   *       <th>Gesture</th>
   *       <th>Action</th>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td>Input Field</td>
   *       <td><kbd>Tap</kbd></td>
   *       <td> If the drop down is not open, expand the drop down list. Otherwise, close the drop down list.
   *       If hints, title or messages exist in a notewindow,
   *        pop up the notewindow.</td>
   *     </tr>
   *     <tr>
   *       <td>Arrow Button</td>
   *       <td><kbd>Tap</kbd></td>
   *       <td> If the drop down is not open, expand the drop down list. Otherwise, close the drop down list.</td>
   *     </tr>
   *     <tr>
   *       <td>Option Item</td>
   *       <td><kbd>Tap</kbd></td>
   *       <td>Tap on an option item in the drop down list to select.</td>
   *     </tr>
   *   </tbody>
   *  </table>
   *
   * <p>Disabled option items receive no highlight and are not selectable.</p>
   *
   * @ojfragment touchDocOne - Used in touch gesture section of classdesc, and standalone gesture doc
   * @memberof oj.ojComboboxOne
   * @instance
   */

  /**
   * <table class="keyboard-table">
   *   <thead>
   *     <tr>
   *       <th>Target</th>
   *       <th>Gesture</th>
   *       <th>Action</th>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td>Input Field</td>
   *       <td><kbd>Tap</kbd></td>
   *       <td> If the drop down is not open, expand the drop down list. Otherwise, close the drop down list.
   *       If hints, title or messages exist in a notewindow,
   *        pop up the notewindow.</td>
   *     </tr>
   *     <tr>
   *       <td>Option Item</td>
   *       <td><kbd>Tap</kbd></td>
   *       <td>Tap on an option item in the drop down list to add to selection.</td>
   *     </tr>
   *     <tr>
   *       <td>Selected item with remove icon</td>
   *       <td><kbd>Tap</kbd></td>
   *       <td>Remove item from the selected items list by tapping on the remove icon.</td>
   *     </tr>
   *   </tbody>
   *  </table>
   *
   * <p>Disabled option items receive no highlight and are not selectable.</p>
   *
   * @ojfragment touchDocMany - Used in touch gesture section of classdesc, and standalone gesture doc
   * @memberof oj.ojComboboxMany
   * @instance
   */

 /**
   * <table class="keyboard-table">
   *   <thead>
   *     <tr>
   *       <th>Target</th>
   *       <th>Key</th>
   *       <th>Action</th>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *      <td>Option item</td>
   *       <td><kbd>Enter</kbd></td>
   *       <td> Select the highlighted choice from the drop down.</td>
   *     </tr>
   *     <tr>
   *       <td>Input field</td>
   *       <td><kbd>Enter</kbd></td>
   *       <td>Set the input text as the value.</td>
   *     </tr>
   *     <tr>
   *      <td>Drop down</td>
   *       <td><kbd>UpArrow or DownArrow</kbd></td>
   *       <td> Highlight the option item on the drop down list in the direction of the arrow.
   *         If the drop down is not open, expand the drop down list.</td>
   *     </tr>
   *     <tr>
   *      <td>Drop down</td>
   *       <td><kbd>Esc</kbd></td>
   *       <td> Collapse the drop down list. If the drop down is already closed, do nothing.</td>
   *     </tr>
   *     <tr>
   *      <td>Combobox</td>
   *       <td><kbd>Tab In</kbd></td>
   *       <td>Set focus to the combobox. If hints, title or messages exist in a notewindow,
   *        pop up the notewindow.</td>
   *     </tr>
   *   </tbody>
   *  </table>
   *
   * <p>Disabled option items receive no highlight and are not selectable.</p>
   *
   * @ojfragment keyboardDocOne - Used in keyboard section of classdesc, and standalone gesture doc
   * @memberof oj.ojComboboxOne
   * @instance
   */

  /**
   * <table class="keyboard-table">
   *   <thead>
   *     <tr>
   *       <th>Target</th>
   *       <th>Key</th>
   *       <th>Action</th>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *      <td>Option item</td>
   *       <td><kbd>Enter</kbd></td>
   *       <td> Select the highlighted item from the drop down.</td>
   *     </tr>
   *     <tr>
   *       <td>Input field</td>
   *       <td><kbd>Enter</kbd></td>
   *       <td>Add the input text to selections.</td>
   *     </tr>
   *     <tr>
   *      <td>Drop down</td>
   *       <td><kbd>UpArrow or DownArrow</kbd></td>
   *       <td> Highlight the option item on the drop down list in the direction of the arrow.
   *         If the drop down is not open, expand the drop down list.</td>
   *     </tr>
   *     <tr>
   *      <td>Combobox</td>
   *       <td><kbd>LeftArrow or RightArrow</kbd></td>
   *       <td> Move focus to the previous or next selected item.</td>
   *     </tr>
   *     <tr>
   *       <td>Selected item with remove icon</td>
   *       <td><kbd>Backspace or Delete</kbd></td>
   *       <td>Remove the selected item having focus.</td>
   *     </tr>
   *     <tr>
   *      <td>Drop down</td>
   *       <td><kbd>Esc</kbd></td>
   *       <td> Collapse the drop down list. If the drop down is already closed, do nothing.</td>
   *     </tr>
   *     <tr>
   *      <td>Combobox</td>
   *       <td><kbd>Tab In</kbd></td>
   *       <td>Set focus to the combobox. If hints, title or messages exist in a notewindow,
   *        pop up the notewindow.</td>
   *     </tr>
   *   </tbody>
   *  </table>
   *
   * <p>Disabled option items receive no highlight and are not selectable.</p>
   *
   * @ojfragment keyboardDocMany - Used in keyboard section of classdesc, and standalone gesture doc
   * @memberof oj.ojComboboxMany
   * @instance
   */
  /**
   * {@ojinclude "name":"ojStylingDocIntro"}
   * <p>The form control style classes can be applied to the component, or an ancestor element. When
   * applied to an ancestor element, all form components that support the style classes will be affected.
   *
   *  <table class="generic-table styling-table">
   *   <thead>
   *     <tr>
   *       <th>{@ojinclude "name":"ojStylingDocClassHeader"}</th>
   *       <th>{@ojinclude "name":"ojStylingDocDescriptionHeader"}</th>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td>oj-form-control-full-width</td>
   *       <td>Changes the max-width to 100% so that form components will occupy
   *           all the available horizontal space
   *       </td>
   *     </tr>
   *     <tr>
   *       <td>oj-form-control-text-align-right</td>
   *       <td>Aligns the text to the right regardless of the reading direction.
   *           This is normally used for right aligning numbers
   *       </td>
   *     </tr>
   *     <tr>
   *       <td>oj-form-control-text-align-start</td>
   *       <td>Aligns the text to the left in ltr and to the right in rtl</td>
   *     </tr>
   *     <tr>
   *       <td>oj-form-control-text-align-end</td>
   *       <td>Aligns the text to the right in ltr and to the left in rtl</td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * @ojfragment stylingDoc - Used in Styling section of classdesc, and standalone Styling doc
   * @memberof oj.ojCombobox
   */

    });

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */

/* global _ComboUtils:false, _OjInputSeachContainer:false, Logger:false */

  /**
   * @ojcomponent oj.ojInputSearch
   * @ignore
   * @augments oj.editableValue
   * @since 1.2.0
   *
   * @classdesc
   * <h3 id="inputSearchOverview-section">
   *   JET InputSearch Component
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#inputSearchOverview-section"></a>
   * </h3>
   *
   * <p>Description: JET InputSearch enhances a html input into a auto-suggest search input field.</p>
   *
   * <p>A JET InputSearch can be created with the following markup.</p>
   *
   * <pre class="prettyprint">
   * <code>
   * &lt;input list="items" data-bind="ojComponent: {component: 'ojInputSearch'}"/>
   * &lt;datalist id="items">
   *   &lt;option value="option 1">option 1&lt;/option>
   *   &lt;option value="option 2">option 2&lt;/option>
   *   &lt;option value="option 3">option 3&lt;/option>
   *   &lt;option value="option 4">option 4&lt;/option>
   * &lt;/datalist>
   * </code></pre>
   *
   * <p>Static <code class="prettyprint">options</code> array to provide the option items.</p>
   *
   * <pre class="prettyprint">
   * <code>
   * &lt;input data-bind="ojComponent: {component: 'ojInputSearch', options:
   *                                     [{value: 'option1', label: 'option1'}, {value: 'option2', label: 'option2'}]}"/>
   * </code></pre>
   *
   * <p>Options can be provided dynamically based on input instead of statically specifying the options array as shown in the above example</p>
   *
   * <pre class="prettyprint">
   * <code>
   * &lt;input data-bind="ojComponent: {component: 'ojInputSearch', options: function(optionContext) {
   *                                                                           return new Promise(function(fulfill, reject) {
   *                                                                             var term = context.term;
   *
   *                                                                             // Prepare options based on current 'term'.
   *                                                                             var options = [];
   *
   *                                                                             fulfill(options);
   *                                                                           }
   *                                                                         }}"/>
   * </code></pre>
   *
   * <h3 id="styling-section">
   *   Styling
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"stylingDoc"}
   *
   * <h3 id="touch-section">
   *   Touch End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#touch-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"touchDoc"}
   *
   * <h3 id="keyboard-section">
   *   Keyboard End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#keyboard-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"keyboardDoc"}
   *
   *
   *
   * <h3 id="rtl-section">
   *   Reading direction
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#rtl-section"></a>
   * </h3>
   *
   * <p>As with any JET component, in the unusual case that the directionality (LTR or RTL) changes post-init, the InputSearch must be <code class="prettyprint">refresh()</code>ed.</p>
   *
   *
   * <h3 id="pseudos-section">
   *   Pseudo-selectors
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#pseudos-section"></a>
   * </h3>
   *
   * <p>The <code class="prettyprint">:oj-inputsearch</code> pseudo-selector can be used in jQuery expressions to select JET InputSearch.  For example:</p>
   *
   * <pre class="prettyprint">
   * <code>$( ":oj-inputsearch" ) // selects all JET InputSearch on the page
   * $myEventTarget.closest( ":oj-inputsearch" ) // selects the closest ancestor that is a JET InputSearch
   * </code></pre>
   *
   * <h3 id="a11y-section">
   *   Accessibility
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#a11y-section"></a>
   * </h3>
   * <p>
   * It is up to the application developer to associate the label to the input component.
   * For InputSearch, you should put an <code>id</code> on the input, and then set
   * the <code>for</code> attribute on the label to be the input's id.
   * </p>
   * <h3 id="label-section">
   *   Label and InputSearch
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#label-section"></a>
   * </h3>
   * <p>
   * For accessibility, you should associate a label element with the input
   * by putting an <code>id</code> on the input, and then setting the
   * <code>for</code> attribute on the label to be the input's id.
   * </p>
   * <p>
   * The component will decorate its associated label with required and help
   * information, if the <code>required</code> and <code>help</code> options are set.
   * </p>
   * <h3 id="jqui2jet-section">
   *   JET for jQuery UI developers
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#jqui2jet-section"></a>
   * </h3>
   *
   * <p>Event names for all JET components are prefixed with "oj", instead of component-specific prefixes like "InputSearch".</p>
   *
   * @desc Creates a JET InputSearch.
   * @example <caption>Initialize the InputSearch with no options specified:</caption>
   * $( ".selector" ).ojInputSearch();
   *
   * @example <caption>Initialize the InputSearch with some options:</caption>
   * $( ".selector" ).ojInputSearch( { "minLength": 2, "placeholder": "Search..." } );
   *
   * @example <caption>Initialize the InputSearch via the JET <code class="prettyprint">ojComponent</code> binding:</caption>
   * &lt;div id="search" data-bind="ojComponent: { component: 'ojInputSearch',
   *                                                    minLength: 2}">
   */
  oj.__registerWidget('oj.ojInputSearch', $.oj.editableValue,
    {
      defaultElement: '<input>',
      widgetEventPrefix: 'oj',
      options:
      {
      /**
       * The placeholder text to set on the element. Though it is possible to set placeholder
       * attribute on the element itself, the component will only read the value when the component
       * is created. Subsequent changes to the element's placeholder attribute will not be picked up
       * and page authors should update the option directly.
       *
       *
       * @example <caption>Initialize the InputSearch with the <code class="prettyprint">placeholder</code> option specified:</caption>
       * $( ".selector" ).ojInputSearch( { "placeholder": "Search ..." } );
       *
       * @default when the option is not set, the element's placeholder attribute is used if it exists.
       *
       * @expose
       * @access public
       * @instance
       * @memberof! oj.ojInputSearch
       * @type {string|null|undefined}
       */
        placeholder: undefined,
      /**
        * Whether the component is required or optional. When required is set to true, an implicit
        * required validator is created using the validator factory -
        * <code class="prettyprint">oj.Validation.validatorFactory(oj.ValidatorFactory.VALIDATOR_TYPE_REQUIRED).createValidator()</code>.
        *
        * Translations specified using the <code class="prettyprint">translations.required</code> option
        * and the label associated with the component, are passed through to the options parameter of the
        * createValidator method.
        *
        * <p>
        * When <code class="prettyprint">required</code> option changes due to programmatic intervention,
        * the component may clear messages and run validation, based on the current state it's in. </br>
        *
        * <h4>Running Validation</h4>
        * <ul>
        * <li>if component is valid when required is set to true, then it runs deferred validation on
        * the option value. This is to ensure errors are not flagged unnecessarily.
        * </li>
        * <li>if component is invalid and has deferred messages when required is set to false, then
        * component messages are cleared but no deferred validation is run.
        * </li>
        * <li>if component is invalid and currently showing invalid messages when required is set, then
        * component messages are cleared and normal validation is run using the current display value.
        * <ul>
        *   <li>if there are validation errors, then <code class="prettyprint">value</code>
        *   option is not updated and the error is shown.
        *   </li>
        *   <li>if no errors result from the validation, the <code class="prettyprint">value</code>
        *   option is updated; page author can listen to the <code class="prettyprint">optionChange</code>
        *   event on the <code class="prettyprint">value</code> option to clear custom errors.</li>
        * </ul>
        * </li>
        * </ul>
        *
        * <h4>Clearing Messages</h4>
        * <ul>
        * <li>Only messages created by the component are cleared.</li>
        * <li><code class="prettyprint">messagesCustom</code> option is not cleared.</li>
        * </ul>
        *
        * </p>
        *
        * This property set to <code class="prettyprint">false</code> implies that a value is not required to be provided by the user.
        * This is the default.
        * This property set to <code class="prettyprint">true</code> implies that a value is required to be provided by user and the
        * input's label will render a required icon. Additionally a required validator -
        * {@link oj.RequiredValidator} - is implicitly used if no explicit required validator is set.
        * An explicit required validator can be set by page authors using the validators option.
        *
        * @example <caption>Initialize the component with the <code class="prettyprint">required</code> option:</caption>
        * $(".selector").ojInputSearch({required: true});<br/>
        * @example <caption>Initialize <code class="prettyprint">required</code> option from html attribute 'required':</caption>
        * &lt;input list="browsers" required/><br/>
        * // retreiving the required option returns true
        * $(".selector").ojInputSearch("option", "required");<br/>
        *
        * @example <caption>Customize messages and hints used by implicit required validator when
        * <code class="prettyprint">required</code> option is set:</caption>
        * &lt;input list="browsers" required data-bind="ojComponent: {
        *   component: 'ojInputSearch',
        *   value: password,
        *   translations: {'required': {
        *                 hint: 'custom: enter at least 3 alphabets',
        *                 messageSummary: 'custom: \'{label}\' is Required',
        *                 messageDetail: 'custom: please enter a valid value for \'{label}\''}}}"/\>
        * @expose
        * @access public
        * @instance
        * @default when the option is not set, the element's required property is used as its initial value if it exists.
        * @memberof! oj.ojInputSearch
        * @type {boolean}
        * @default false
        * @since 0.7.0
        * @see #translations
        */
        required: false,

      /**
       * The id of the html list for the InputSearch.
       *
       * @example <caption>Initialize the InputSearch with the <code class="prettyprint">list</code> option specified:</caption>
       * $( ".selector" ).ojInputSearch( { "list": "list" } );
       *
       * @example <caption>The <code class="prettyprint">list</code> points to a html <code class="prettyprint">ul</code> element.
       * The value for the list item should be specified with <code class="prettyprint">oj-data-value</code> field. By default, we use the first text node for search filtering. An optional <code class="prettyprint">oj-data-label</code> field can be added to the list item, in which case it will take precedence over the text node.</caption>
       * &lt;ul id="list"&gt;
       * &lt;li oj-data-value="li1"&gt;Item 1&lt;/li&gt;
       * &lt;li oj-data-value="li2"&gt;Item 2&lt;/li&gt;
       * &lt;/ul&gt;
       *
       * @expose
       * @memberof! oj.ojInputSearch
       * @instance
       * @type {string|null|undefined}
       */
        list: undefined,

      /**
       * The option items for the InputSearch. Options can be specified as an array of objects containing value and label.
       * The value is used as the value of the option item and label as the label. Both should be of string type.
       * Group data can be provided with label and a children array containing the option items.
       * Option item can be set as disabled.
       *
       * <p>Options can be provided dynamically based on the text typed in the input field
       * by specifying a function as <code class="prettyprint">options</code> instead of static array.
       * This function will be invoked when there is a change in input field and it should return a <code class="prettyprint">Promise</code>.
       * The return type should be an array of objects containing value and label as similar to the static array as mentioned above.</p>
       *
       * <p>The context paramter passed to the <code class="prettyprint">options</code> function contains the following keys:</p>
       * <table class="keyboard-table">
       *   <thead>
       *     <tr>
       *       <th>Key</th>
       *       <th>Description</th>
       *     </tr>
       *   </thead>
       *   <tbody>
       *     <tr>
       *       <td><kbd>component</kbd></td>
       *       <td>A reference to the InputSearch widget constructor.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>term</kbd></td>
       *       <td>The text based on which options have to be filtered.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>value</kbd></td>
       *       <td>The same options callback function will be used get the value-label object when <code class="prettyprint">value</code> is set programmatically. In such cases context object will have <code class="prettyprint">value</code> instead of <code class="prettyprint">term</code>. Value will be of type Array and when this key is passed in the context, callback function should return array of options for all values.</td>
       *     </tr>
       *   </tbody>
       * </table>
       *
       * @expose
       * @memberof! oj.ojInputSearch
       * @instance
       * @type {Array|function(Object)}
       *
       * @example <caption>Initialize the InputSearch with the <code class="prettyprint">options</code> specified:</caption>
       * $( ".selector" ).ojInputSearch( { "options": [{value: 'option1', label: 'option1'}, {value: 'option2', label: 'option2', disabled: true}, {value: 'option3', label: 'option3'}] } );
       *
       * @example <caption>Initialize the InputSearch with group data:</caption>
       * $( ".selector" ).ojInputSearch( { "options": [{label : 'group1', children: [{value: 'option1', label: 'option1'}, {value: 'option2', label: 'option2'}]}, {label: 'group2', children: [{value: 'option3', label: 'option3'}]} ] } );
       *
       * @example <caption>Initialize the InputSearch <code class="prettyprint">options</code> with a function:</caption>
       * $( ".selector" ).ojInputSearch({ "options": function(optionContext) {
       *                                               return new Promise(function(fulfill, reject) {
       *                                                 var term = context.term;
       *
       *                                                 // Prepare options based on current 'term'.
       *                                                 var options = [];
       *
       *                                                 fulfill(options);
       *                                               }
       *                                             }});
       */
        options: null,

      /**
       * Specify the key names to use in the options array.
       *
       * @expose
       * @memberof! oj.ojInputSearch
       * @instance
       * @type {Object}
       *
       * @example <caption>Initialize the InputSearch with <code class="prettyprint">optionsKeys</code> specified. This allows the key names to be redefined in the options array.</caption>
       * $( ".selector" ).ojInputSearch( { "optionsKeys": {value : "state_abbr", label : "state_name"} } );
       *
       * @example <caption>Redefine keys for data with subgroups.</caption>
       * $( ".selector" ).ojInputSearch( { "optionsKeys": {label : "regions", children : "states", childKeys : {value : "state_abbr", label : "state_name"}} } );
       */
        optionsKeys: null,

      /**
       * <p>Attributes specified here will be set on the picker DOM element when it's launched.
       * <p>The supported attributes are <code class="prettyprint">class</code> and <code class="prettyprint">style</code>, which are appended to the picker's class and style, if any.
       * Note: 1) pickerAttributes is not applied in the native theme.
       * 2) setting this option after component creation has no effect.
       *
       * @example <caption>Initialize the inputSearch specifying a set of attributes to be set on the picker DOM element:</caption>
       * $( ".selector" ).ojInputSearch({ "pickerAttributes": {
       *   "style": "color:blue;",
       *   "class": "my-class"
       * }});
       *
       * @example <caption>Get the <code class="prettyprint">pickerAttributes</code> option, after initialization:</caption>
       * // getter
       * var inputSearch = $( ".selector" ).ojInputSearch( "option", "pickerAttributes" );
       *
       * @expose
       * @memberof! oj.ojInputSearch
       * @instance
       * @type {?Object}
       * @default <code class="prettyprint">null</code>
       */
        pickerAttributes: null,

      /**
       * The renderer function that renders the content of an each option.
       * The function must return a DOM element representing the content of the option.
       * If the developer chooses to manipulate the option content directly,
       * the function should return nothing.
       *
       * <p>The <code class="prettyprint">optionRenderer</code> decides only
       * how the options' content has to be rendered in the drop down.
       * Once an option is selected from the drop down,
       * what value has to be displayed in the in input field is decided by the
       * label field in the data object. See <a href="#options">options</a>
       * and <a href="#optionsKeys">optionsKeys</a> for configuring option label and value.
       * </p>
       *
       * <p>The context paramter passed to the renderer contains the following keys:</p>
       * <table class="keyboard-table">
       *   <thead>
       *     <tr>
       *       <th>Key</th>
       *       <th>Description</th>
       *     </tr>
       *   </thead>
       *   <tbody>
       *     <tr>
       *       <td><kbd>component</kbd></td>
       *       <td>A reference to the InputSearch widget constructor.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>parent</kbd></td>
       *       <td>The parent of the data item. The parent is null for root node.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>index</kbd></td>
       *       <td>The index of the option, where 0 is the index of the first option. In the hierarchical case the index is relative to its parent.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>depth</kbd></td>
       *       <td>The depth of the option. The depth of the first level children under the invisible root is 0.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>leaf</kbd></td>
       *       <td>Whether the option is a leaf or a group.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>data</kbd></td>
       *       <td>The data object for the option.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>parentElement</kbd></td>
       *       <td>The option label element.  The renderer can use this to directly append content.</td>
       *     </tr>
       *   </tbody>
       * </table>
       *
       * @expose
       * @memberof! oj.ojInputSearch
       * @instance
       * @type {function(Object)|null}
       * @default <code class="prettyprint">null</code>
       *
       * @example <caption>Initialize the InputSearch with a renderer:</caption>
       * $( ".selector" ).ojInputSearch({ "optionRenderer": function(optionContext) {
       *                                                      return optionContext['data']['FIRST_NAME'];}});
       *
       * @example <caption>Get or set the <code class="prettyprint">renderer</code> option, after initialization:</caption>
       * // set the renderer function
       * $( ".selector" ).ojInputSearch( "option", "optionRenderer", myFunction});
       */
        optionRenderer: null,

      /**
       * The knockout template used to render the content of the option in drop down.
       *
       * This attribute is only exposed via the <code class="prettyprint">ojComponent</code> binding, and is not a
       * component option.
       *
       * @ojbindingonly
       * @name optionTemplate
       * @memberof! oj.ojInputSearch
       * @instance
       * @type {string|null}
       * @default <code class="prettyprint">null</code>
       *
       * @example <caption>Specify the <code class="prettyprint">template</code> when initializing InputSearch:</caption>
       * // set the template
       * &lt;ul id="inputsearch" data-bind="ojComponent: {component: 'ojInputSearch', optionTemplate: 'my_template'}"&gt;&lt;/ul&gt;
       */

      /**
       * The minimum number of characters a user must type before a options
       * filtering is performed. Zero is useful for local data with just a few items,
       * but a higher value should be used when a single character search could match a few thousand items.
       *
       * @expose
       * @memberof! oj.ojInputSearch
       * @instance
       * @type {?number}
       * @default <code class="prettyprint">0</code>
       *
       * @example <caption>Initialize the InputSearch with the <code class="prettyprint">minLength</code> option specified:</caption>
       * $( ".selector" ).ojInputSearch( { "minLength": 2 } );
       */
        minLength: 0,

      /**
       * Triggered immediately before the InputSearch drop down is expanded.
       *
       * @expose
       * @event
       * @memberof! oj.ojInputSearch
       * @instance
       * @property {Event} event <code class="prettyprint">jQuery</code> event object
       * @property {Object} ui Parameters
       *
       * @example <caption>Initialize the InputSearch with the <code class="prettyprint">beforeExpand</code> callback specified:</caption>
       * $( ".selector" ).ojInputSearch({
       *     "beforeExpand": function( event, ui ) {}
       * });
       *
       * @example <caption>Bind an event listener to the <code class="prettyprint">ojbeforeexpand</code> event:</caption>
       * $( ".selector" ).on( "ojbeforeexpand", function( event, ui ) {} );
       */
        beforeExpand: null,

      /**
       * <p>The  <code class="prettyprint">rawValue</code> is the read-only option for retrieving
       * the currently displayed value from the input field in text form.</p>
       * <p>
       * The <code class="prettyprint">rawValue</code> updates on the 'input' javascript event,
       * so the <code class="prettyprint">rawValue</code> changes as the value of the input is changed.
       * If the user types in '1,200' into the field, the rawValue will be '1', then '1,', then '1,2',
       * ..., and finally '1,200'. Then when the user blurs or presses
       * Enter the <code class="prettyprint">value</code> option gets updated.
       * </p>
       * <p>This is a read-only option so page authors cannot set or change it directly.</p>
       * @expose
       * @access public
       * @instance
       * @memberof! oj.ojInputSearch
       * @type {string|undefined}
       * @since 2.0.2
       * @readonly
       */
        rawValue: undefined,

      /**
       * Fired whenever a component option changes, whether due to user interaction or programmatic
       * intervention.  If the new value is the same as the previous value, no event will be fired.  The event
       * listener will receive two parameters described below:
       *
       * @expose
       * @event
       * @memberof! oj.ojInputSearch
       * @instance
       * @property {Event} event <code class="prettyprint">jQuery</code> event object
       * @property {Object} ui event payload
       * @property {string} ui.option the name of the option that is changing
       * @property {Object} ui.previousValue - an Object holding the previous value of the option.
       * When previousValue is not a primitive type, i.e., is an Object, it may hold the same value as
       * the value property.
       * @property {Object} ui.value - an Object holding the current value of the option.
       * @property {?Object} ui.subproperty - an Object holding information about the subproperty that changed.
       * @property {string} ui.subproperty.path - the subproperty path that changed.
       * @property {Object} ui.subproperty.previousValue - an Object holding the previous value of the subproperty.
       * @property {Object} ui.subproperty.value - an Object holding the current value of the subproperty.
       * @property {Object} ui.optionMetadata information about the option that is changing
       * @property {string} ui.optionMetadata.writeback <code class="prettyprint">"shouldWrite"</code> or
       *           <code class="prettyprint">"shouldNotWrite"</code>.  For use by the JET writeback mechanism.
       * @property {string} ui.optionMetadata.trigger This property indicates the what triggered the
       *           <code class="prettyprint">value</code> option change. Possible trigger types are:
       *             <code class="prettyprint">enter_pressed</code>,
       *             <code class="prettyprint">option_selected</code>,
       *             <code class="prettyprint">blur</code> and
       *             <code class="prettyprint">search_icon_clicked</code>
       *
       * @example <caption>Initialize component with the <code class="prettyprint">optionChange</code> callback</caption>
       * $(".selector").ojInputSearch({
       *   'optionChange': function (event, ui) {
       *        if (ui['option'] === 'value') { // handle value change }
       *    }
       * });
       * @example <caption>Bind an event listener to the ojoptionchange event</caption>
       * $(".selector").on({
       *   'ojoptionchange': function (event, ui) {
       *       window.console.log("option that changed is: " + ui['option']);
       *   };
       * });
       */
        optionChange: null,

      /**
       * <p>Fired whenever the value is submitted by the user.</p>
       *
       * <p>This event is similar to the <code class="prettyprint">value</code>
       * <a href="#event:optionChange">optionChange</a> event. The optionChange
       * event will be fired only if there is a change in the value,
       * but the <code class="prettyprint">update</code> event will be fired
       * even if there is no change in the value. This will help the
       * application to re-submit the search query for the same value.</p>
       *
       * <p><code class="prettyprint">update</code> event will be fired after the
       * 'value' <code class="prettyprint">optionChange</code> event.</p>
       *
       * @expose
       * @event
       * @memberof! oj.ojInputSearch
       * @instance
       * @property {Event} event <code class="prettyprint">jQuery</code> event object
       * @property {Object} ui Parameters
       * @property {Object} ui.value - an Object holding the current value.
       * @property {Object} ui.optionMetadata information about the event.
       * @property {string} ui.optionMetadata.trigger This property indicates the what triggered the
       *             <code class="prettyprint">update</code> event. Possible trigger types are:
       *             <code class="prettyprint">enter_pressed</code>,
       *             <code class="prettyprint">option_selected</code> and
       *             <code class="prettyprint">search_icon_clicked</code>
       *
       * @example <caption>Initialize component with the <code class="prettyprint">update</code> callback</caption>
       * $(".selector").ojInputSearch({
       *   'update': function (event, data) {
       *        // handle update event
       *    }
       * });
       * @example <caption>Bind an event listener to the ojupdate event</caption>
       * $(".selector").on({
       *   'ojupdate': function (event, data) {
       *       window.console.log("Update event fired");
       *   };
       * });
       */
        update: null,
    /**
     * List of validators used by component when performing validation. Each item is either an
     * instance that duck types {@link oj.Validator}, or is an Object literal containing the
     * properties listed below. Implicit validators created by a component when certain options
     * are present (e.g. <code class="prettyprint">required</code> option), are separate from
     * validators specified through this option. At runtime when the component runs validation, it
     * combines the implicit validators with the list specified through this option.
     * <p>
     * Hints exposed by validators are shown in the notewindow by default, or as determined by the
     * 'validatorHint' property set on the <code class="prettyprint">displayOptions</code>
     * option.
     * </p>
     *
     * <p>
     * When <code class="prettyprint">validators</code> option changes due to programmatic
     * intervention, the component may decide to clear messages and run validation, based on the
     * current state it is in. </br>
     *
     * <h4>Steps Performed Always</h4>
     * <ul>
     * <li>The cached list of validator instances are cleared and new validator hints is pushed to
     * messaging. E.g., notewindow displays the new hint(s).
     * </li>
     * </ul>
     *
     * <h4>Running Validation</h4>
     * <ul>
     * <li>if component is valid when validators changes, component does nothing other than the
     * steps it always performs.</li>
     * <li>if component is invalid and is showing messages when
     * <code class="prettyprint">validators</code> changes then all component messages are cleared
     * and full validation run using the display value on the component.
     * <ul>
     *   <li>if there are validation errors, then <code class="prettyprint">value</code>
     *   option is not updated and the error is shown.
     *   </li>
     *   <li>if no errors result from the validation, the <code class="prettyprint">value</code>
     *   option is updated; page author can listen to the <code class="prettyprint">optionChange</code>
     *   event on the <code class="prettyprint">value</code> option to clear custom errors.</li>
     * </ul>
     * </li>
     * <li>if component is invalid and has deferred messages when validators changes, it does
     * nothing other than the steps it performs always.</li>
     * </ul>
     * </p>
     *
     * <h4>Clearing Messages</h4>
     * <ul>
     * <li>Only messages created by the component are cleared.</li>
     * <li><code class="prettyprint">messagesCustom</code> option is not cleared.</li>
     * </ul>
     * </p>
     *
     * @property {string} type - the validator type that has a {@link oj.ValidatorFactory} that can
     * be retrieved using the {@link oj.Validation} module. For a list of supported validators refer
     * to {@link oj.ValidatorFactory}. <br/>
     * E.g., <code class="prettyprint">{validators: [{type: 'regExp'}]}</code>
     * @property {Object=} options - optional Object literal of options that the validator expects.
     * <br/>
     * E.g., <code class="prettyprint">{validators: [{type: 'regExp', options: {pattern: '[a-zA-Z0-9]{3,}'}}]}</code>

     *
     * @example <caption>Initialize the component with validator object literal:</caption>
     * $(".selector").ojInputSearch({
     *   validators: [{
     *     type: 'regExp',
     *     options : {
     *       pattern: '[a-zA-Z0-9]{3,}'
     *     }
     *   }],
     * });
     *
     * NOTE: oj.Validation.validatorFactory('numberRange') returns the validator factory that is used
     * to instantiate a range validator for numbers.
     *
     * @example <caption>Initialize the component with multiple validator instances:</caption>
     * var validator1 = new MyCustomValidator({'foo': 'A'});
     * var validator2 = new MyCustomValidator({'foo': 'B'});
     * $(".selector").ojInputSearch({
     *   value: 'option',
     *   validators: [validator1, validator2]
     * });
     *
     * @expose
     * @access public
     * @instance
     * @memberof! oj.ojInputSearch
     * @type {Array|undefined}
     */
        validators: undefined

      /**
       * The type of value is an array, and an array will always be returned from the component.
       * The first element of the array will be used as the value.
       * As a convenience we allow a string to be passed into the setter,
       * but note that the value option can only be bound to a knockout observableArray.
       *
       * @example <caption>Initialize the InputSearch with the <code class="prettyprint">value</code> option specified:</caption>
       * $(".selector").ojInputSearch({'value': "option"});<br/>
       *
       * @example <caption>Get or set the <code class="prettyprint">value</code> option, after initialization:</caption>
       * // Getter: returns value
       * $(".selector").ojInputSearch("option", "value");
       * // Setter: sets value with array containing "option1"
       * $(".selector").ojInputSearch("option", "value", ["option1"]);
       * // Setter: sets value with string "option1"
       * $(".selector").ojInputSearch("option", "value", "option1");
       *
       * @member
       * @name  value
       * @access public
       * @instance
       * @default When the option is not set, the element's value property is used as its initial value if it exists.
       * @memberof! oj.ojInputSearch
       * @type {string|Array}
       */
      },

    /**
     * Returns a jQuery object containing the element visually representing the InputSearch.
     *
     * <p>This method does not accept any arguments.
     *
     * @expose
     * @memberof! oj.ojInputSearch
     * @instance
     * @return {jQuery} the ojInputSearch
     */
      widget: function () {
        return this.inputSearch.container;
      },
    /**
     * @override
     * @private
     */
      _ComponentCreate: function () {
        this._super();
        this._setup();
      },

      _InitOptions: function (originalDefaults, constructorOptions) {
        var props = [{ attribute: 'disabled', validateOption: true },
                   { attribute: 'placeholder' },
                   { attribute: 'required', coerceDomValue: true, validateOption: true },
                   { attribute: 'title' }
        ];

        this._super(originalDefaults, constructorOptions);
        oj.EditableValueUtils.initializeOptionsFromDom(props, constructorOptions, this);

        if (this.options.value === undefined) {
          this.options.value = (this.element.attr('value') !== undefined)
            ? _ComboUtils.splitVal(this.element.val(), ',') : null;
        } else {
          var value = this.options.value;
          if (Array.isArray(value)) {
            value = value.slice(0);
          } else if (typeof value === 'string') {
            value = [value];
          }
          this.options.value = value;
        }
      },
        /**
      * Performs post processing after _SetOption() is called. Different options when changed perform
      * different tasks. See _AfterSetOption[OptionName] method for details.
      *
      * @param {string} option
      * @param {Object|string=} previous
      * @param {Object=} flags
      * @protected
      * @memberof! oj.ojInputSearch
      * @instance
      * @override
      */
      // eslint-disable-next-line no-unused-vars
      _AfterSetOption: function (option, previous, flags) {
        this._superApply(arguments);
        switch (option) {
          case 'required':
            this._AfterSetOptionRequired(option);
            break;
          case 'validators':
            this._AfterSetOptionValidators(option);
            break;
          default:
            break;
        }
      },
    /**
     * Whether the component is required.
     *
     * @return {boolean} true if required; false
     *
     * @memberof! oj.ojInputSearch
     * @instance
     * @protected
     * @override
     */
      _IsRequired: function () {
        return this.options.required;
      },
    /**
     * Performs post processing after required option is set by taking the following steps.
     *
     * - if component is invalid and has messgesShown -> required: false/true -> clear component errors;
     * run full validation with UI value (we don't know if the UI error is from a required validator
     * or something else);<br/>
     * &nbsp;&nbsp;- if there are validation errors, then value not pushed to model; messagesShown is
     * updated<br/>
     * &nbsp;&nbsp;- if no errors result from the validation, push value to model; author needs to
     * listen to optionChange(value) to clear custom errors.<br/>
     *
     * - if component is invalid and has messagesHidden -> required: false -> clear component
     * errors; no deferred validation is run.<br/>
     * - if component has no error -> required: true -> run deferred validation (we don't want to flag
     * errors unnecessarily)<br/>
     * - messagesCustom is never cleared<br/>
     *
     * @param {string} option
     *
     * @memberof! oj.ojInputSearch
     * @instance
     * @protected
     */
      _AfterSetOptionRequired: oj.EditableValueUtils._AfterSetOptionRequired,
    /**
     * When validators option changes, take the following steps.
     *
     * - Clear the cached normalized list of all validator instances. push new hints to messaging.<br/>
     * - if component is valid -> validators changes -> no change<br/>
     * - if component is invalid has messagesShown -> validators changes -> clear all component
     * messages and re-run full validation on displayValue. if there are no errors push value to
     * model;<br/>
     * - if component is invalid has messagesHidden -> validators changes -> do nothing; doesn't change
     * the required-ness of component <br/>
     * - messagesCustom is not cleared.<br/>
     *
     * NOTE: The behavior applies to any option that creates implicit validators - min, max, pattern,
     * etc. Components can call this method when these options change.
     *
     * @memberof! oj.ojInputSearch
     * @instance
     * @protected
     */
      _AfterSetOptionValidators: oj.EditableValueUtils._AfterSetOptionValidators,
    /**
     * @memberof! oj.ojInputSearch
     * @instance
     * @private
     */
      _refreshRequired: oj.EditableValueUtils._refreshRequired,
    /**
     * This returns an array of all validators
     * normalized from the validators option set on the component. <br/>
     * @return {Array} of validators.
     * @memberof! oj.ojInputSearch
     * @instance
     * @protected
     */
      _GetNormalizedValidatorsFromOption: oj.EditableValueUtils._GetNormalizedValidatorsFromOption,

    /**
     * Called to find out if aria-required is unsupported.
     * @memberof! oj.ojInputSearch
     * @instance
     * @protected
     */
      _AriaRequiredUnsupported: function () {
        return false;
      },
    /**
     * @memberof! oj.ojInputSearch
     * @instance
     * @private
     */
      _setup: function () {
        var opts = {};
        opts.element = this.element;
        opts.ojContext = this;
        opts.inputSearch = true;
        opts = $.extend(this.options, opts);

        this.inputSearch = new _OjInputSeachContainer();
        this.inputSearch._init(opts);
        this._refreshRequired(this.options.required);
      },

    /**
     * @override
     * @private
     */
      _destroy: function () {
        this.inputSearch._destroy();
        this._super();
      },

    /**
     * Refreshes the InputSearch.
     *
     * <p>This method does not accept any arguments.
     *
     * @expose
     * @memberof! oj.ojInputSearch
     * @instance
     */
      refresh: function () {
        this._super();

        this.inputSearch._destroy();
        this._setup();
        this._SetRootAttributes();
      },

    /**
     * Handles options specific to InputSearch.
     * @override
     * @protected
     * @memberof! oj.ojInputSearch
     */
      _setOption: function (key, _value, flags) {
        var value = _value;
        if (key === 'value') {
        // clone the value, otherwise _setDisplayValue will not be invoked on binding value to ko observableArray.
        // TODO: Need to revisit this once 18724975 is fixed.

          if (value != null) {
            if (Array.isArray(value)) {
              value = value.slice(0);
            } else if (typeof value === 'string') {
              value = [value];
            } else {
              Logger.error('ojInputSearch value has to be an array of string or a string.');
            }
          }

        // valueChangeTrigger will be used while setting the display value.
          if (flags && flags._context && flags._context.optionMetadata) {
            this.inputSearch.valueChangeTrigger = flags._context.optionMetadata.trigger;
          } else {
            this.inputSearch.valueChangeTrigger = null;
          }
        }

        this._super(key, value, flags);

        if (key === 'options') {
          this.inputSearch.opts.options = value;
          this.inputSearch.opts = this.inputSearch._prepareOpts(this.inputSearch.opts);
        }

        if (key === 'disabled') {
          if (value) {
            this.inputSearch._disable();
          } else {
            this.inputSearch._enable();
          }
        }
      },

      _NotifyDetached: function () {
        this._superApply(arguments);
        this.inputSearch.close();
      },

    // 19670748, dropdown popup should be closed on subtreeHidden notification.
      _NotifyHidden: function () {
        this._superApply(arguments);
        this.inputSearch.close();
      },

      /**
       * Updates display value of InputSearch.
       * @override
       * @protected
       * @memberof! oj.ojInputSearch
       */
      // eslint-disable-next-line no-unused-vars
      _SetDisplayValue: function (displayValue) {
        this.inputSearch._initSelection();
      },

    /**
     * Set the placeholder.
     * @override
     * @protected
     * @memberof! oj.ojInputSearch
     */
      _SetPlaceholder: function (value) {
        if (this.inputSearch) {
          this.inputSearch.opts.placeholder = value;
          if (this.inputSearch._setPlaceholder) {
            this.inputSearch._setPlaceholder();
          }
        }
      },

    /**
     * Validates the component's value using the converter and all validators registered on
     * the component.
     * @return {boolean} true if component passed validation,
     * false if there were validation errors.
     * @example <caption>Validate component using its current value.</caption>
     * // validate display value.
     * $(.selector).ojInputSearch('validate');
     *
     * @expose
     * @override
     * @memberof! oj.ojInputSearch
     * @instance
     */
      validate: function () {
        var displayValue = this.inputSearch.search.val();
        var newValue = null;

        var existingValue = [];
        if (this.isValid()) {
          existingValue = this.inputSearch.getVal();
        }

        if (displayValue === undefined || displayValue === null || displayValue === '') {
          newValue = existingValue;
        } else {
          newValue = [displayValue];
        }

        return this._SetValue(newValue, null, this._VALIDATE_METHOD_OPTIONS);
      },

    /**
     * Parses the value using the converter set and returns the parsed value. If parsing fails the
     * error is written into the element
     *
     * @override
     * @protected
     * @memberof! oj.ojInputSearch
     * @instance
     */
      _parseValue: function (submittedValue) {
        var parsedVal = [];
        var parsed;

        if (submittedValue == null) {
          return parsedVal;
        }

        if (Array.isArray(submittedValue)) {
          for (var i = 0; i < submittedValue.length; i++) {
            parsed = this._super(submittedValue[i]);
            parsedVal.push(parsed.toString());
          }
        } else if (typeof submittedValue === 'string') {
          parsed = this._super(submittedValue);
          parsedVal.push(parsed.toString());
        } else {
          Logger.error('ojInputSearch value has to be an array of string or a string.');
        }

        return parsedVal;
      },

    /**
     * Returns the messaging launcher element  i.e., where user sets focus that triggers the popup.
     * Usually this is the element input or select that will receive focus and on which the popup
     * for messaging is initialized.
     *
     * @override
     * @protected
     * @memberof! oj.ojInputSearch
     * @return {Object} jquery element which represents the messaging launcher component
     */
      _GetMessagingLauncherElement: function () {
        return this.inputSearch.search;
      },

    /**
     * Returns the jquery element that represents the content part of the component.
     * This is usually the component that user sets focus on (tabindex is set 0) and
     * where aria attributes like aria-required, aria-labeledby etc. are set. This is
     * also the element where the new value is updated. Usually this is the same as
     * the _GetMessagingLauncherElement.
     *
     * @override
     * @protected
     * @memberof! oj.ojInputSearch
     * @return {jQuery} jquery element which represents the content.
     */
      _GetContentElement: function () {
        return this.inputSearch.search;
      },

    /**
     * Returns the default styleclass for the component.
     *
     * @return {string}
     * @expose
     * @memberof! oj.ojInputSearch
     * @override
     * @protected
     */
      _GetDefaultStyleClass: function () {
        return 'oj-inputsearch';
      },

      _getDropdown: function () {
        if (this.inputSearch && this.inputSearch._opened()) {
          var dropdown = $('.oj-listbox-drop');
          for (var i = 0; i < dropdown.length; i++) {
            if ($(dropdown[i]).attr('id') === 'oj-listbox-drop' &&
                $(dropdown[i]).attr('data-oj-containerid') === this.inputSearch.containerId) {
              return $(dropdown[i]);
            }
          }
        }
        return null;
      },

    /**
     * Opens the InputSearch drop-down.
     *
     * @expose
     * @memberof oj.ojInputSearch
     * @instance
     */
      expand: function () {
        this.inputSearch.open();
      },

    /**
     * Closes the InputSearch drop-down.
     *
     * @expose
     * @memberof oj.ojInputSearch
     * @instance
     */
      collapse: function () {
        this.inputSearch.close();
      },

    // ////////////////     SUB-IDS     //////////////////

    /**
     * <p>Sub-ID for the input field
     *
     * <p>See the <a href="#getNodeBySubId">getNodeBySubId</a> and
     * <a href="#getSubIdByNode">getSubIdByNode</a> methods for details.
     *
     * @ojsubid
     * @member
     * @name oj-inputsearch-input
     * @memberof oj.ojInputSearch
     * @instance
     *
     * @example <caption>Get the input field element</caption>
     * var node = $( ".selector" ).ojInputSearch( "getNodeBySubId", {'subId': 'oj-inputsearch-input'} );
     */

    /**
     * <p>Sub-ID for the search icon of InputSearch.
     *
     * <p>See the <a href="#getNodeBySubId">getNodeBySubId</a> and
     * <a href="#getSubIdByNode">getSubIdByNode</a> methods for details.
     *
     * @ojsubid
     * @member
     * @name oj-inputsearch-search
     * @memberof oj.ojInputSearch
     * @instance
     *
     * @example <caption>Get the search icon of the InputSearch</caption>
     * var node = $( ".selector" ).ojInputSearch( "getNodeBySubId", {'subId': 'oj-inputsearch-search'} );
     */

    /**
     * <p>Sub-ID for the list item.</p>
     *
     * @ojsubid oj-listitem
     * @memberof oj.ojInputSearch
     *
     * @example <caption>Get the listitem corresponding to value "myVal"</caption>
     * var node = $( ".selector" ).ojInputSearch( "getNodeBySubId", {'subId': 'oj-listitem', 'value': 'myVal'} );
     */

      getNodeBySubId: function (locator) {
        var node = null;
        var subId;
        if (locator === null) {
          return this.inputSearch.container ? this.inputSearch.container[0] : null;
        }

        node = this._super(locator);


        if (!node) {
          subId = locator.subId;
          if (subId === 'oj-inputsearch-search') {
            subId = 'oj-inputsearch-search-button';
          }

          switch (subId) {
            case 'oj-inputsearch-input':
            case 'oj-inputsearch-search-button':
              node = this.widget().find('.' + subId)[0];
              break;
            case 'oj-listitem':
              var dropdown = this._getDropdown();
              if (dropdown) {
                var list = dropdown.find('.oj-listbox-result');
                node = this.inputSearch._findItem(list, locator.value);
              }
              break;
            default:
              break;
          }
        }

      // Non-null locators have to be handled by the component subclasses
        return node || null;
      },

    /**
     * Returns the subId object for the given child DOM node.  For more details, see
     * <a href="#getNodeBySubId">getNodeBySubId</a>.
     *
     * @expose
     * @override
     * @ignore
     * @memberof oj.ojInputSearch
     * @instance
     *
     * @param {!Element} node - child DOM node
     * @return {Object|null} The subId for the DOM node, or <code class="prettyprint">null</code> when none is found.
     *
     * @example <caption>Get the subId for a certain DOM node:</caption>
     * var subId = $( ".selector" ).ojInputSearch( "getSubIdByNode", node );
     */
      getSubIdByNode: function (node) {
        var subId = null;

        if (node != null) {
          var nodeCached = $(node);

          if (nodeCached.hasClass('oj-inputsearch-input')) {
            subId = { subId: 'oj-inputsearch-input' };
          } else if (nodeCached.hasClass('oj-inputsearch-search-button')) {
            subId = { subId: 'oj-inputsearch-search' };
          } else if (nodeCached.hasClass('oj-listbox-result')) {
            subId = { subId: 'oj-listitem', value: nodeCached.data('ojinputsearch').value };
          } else {
            subId = this._super(node);
          }
        }
        return subId;
      }

    // Fragments:

  /**
     * <table class="keyboard-table">
     *   <thead>
     *     <tr>
     *       <th>Target</th>
     *       <th>Gesture</th>
     *       <th>Action</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>Input Field</td>
     *       <td><kbd>Tap</kbd></td>
     *       <td> If the drop down is not open, expand the drop down list. Otherwise, close the drop down list
     *       If hints, title or messages exist in a notewindow,
     *        pop up the notewindow.</td>
     *     </tr>
     *     <tr>
     *       <td>Search Button</td>
     *       <td><kbd>Tap</kbd></td>
     *       <td> Updates the value with the text entered in the input field and fires the <code class="prettyprint">optionChange</code> event which can be used to perform search.</td>
     *     </tr>
     *     <tr>
     *       <td>Option Item</td>
     *       <td><kbd>Tap</kbd></td>
     *       <td>Tap on a option item in the drop down list to select item.</td>
     *     </tr>
     *   </tbody>
     *  </table>
     *
     * <p>Disabled option items receive no highlight and are not selectable.</p>
   *
   *
   * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
   * @memberof oj.ojInputSearch
   */

  /**
     * <table class="keyboard-table">
   *   <thead>
   *     <tr>
   *       <th>Target</th>
   *       <th>Key</th>
   *       <th>Action</th>
   *     </tr>
   *   </thead>
     *   <tbody>
     *     <tr>
     *      <td>Input</td>
     *       <td><kbd>Enter</kbd></td>
     *       <td> Select the highlighted choice from the drop down.</td>
     *     </tr>
     *     <tr>
     *      <td>Input</td>
     *       <td><kbd>UpArrow or DownArrow</kbd></td>
     *       <td> Highlight the option item on the drop down list in the direction of the arrow.
     *         If the drop down is not open, expand the drop down list.</td>
     *     </tr>
     *     <tr>
     *      <td>Input</td>
     *       <td><kbd>Esc</kbd></td>
     *       <td> Collapse the drop down list. If the drop down is already closed, do nothing.</td>
     *     </tr>
     *     <tr>
     *        <td>Input</td>
     *       <td><kbd>Tab In</kbd></td>
     *       <td>Set focus to the input. If hints, title or messages exist in a notewindow,
     *        pop up the notewindow.</td>
     *     </tr>
     *   </tbody>
     *  </table>
     *
     * <p>Disabled option items receive no highlight and are not selectable.</p>
   *
   * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
   * @memberof oj.ojInputSearch
   */

  /**
   * {@ojinclude "name":"ojStylingDocIntro"}
   *
   * <table class="generic-table styling-table">
   *   <thead>
   *     <tr>
   *       <th>{@ojinclude "name":"ojStylingDocClassHeader"}</th>
   *       <th>{@ojinclude "name":"ojStylingDocDescriptionHeader"}</th>
   *     </tr>
   *   </thead>
   *   <tbody>
   *     <tr>
   *       <td>oj-listbox-header</td>
   *       <td>Optional. Custom header options can be added to the drop down through this styling.</td>
   *     </tr>
   *     <tr>
   *       <td>oj-listbox-highlighter-section</td>
   *       <td>Optional. Styling to control the which part of the option label has to be considered for highlighting.</td>
   *     </tr>
   *   </tbody>
   * </table>
   *
   * @ojfragment stylingDoc - Used in Styling section of classdesc, and standalone Styling doc
   * @memberof oj.ojInputSearch
   */

    });

/**
 * Copyright (c) 2014, Oracle and/or its affiliates.
 * All rights reserved.
 */

/* global _ComboUtils:false, _OjMultiSelect:false, _OjSingleSelect:false, Components:false, Logger:false, ThemeUtils:false, Promise:false */

  /**
   * @ojcomponent oj.ojSelectOne
   * @augments oj.ojSelect
   * @since 0.6.0
   * @ojdisplayname Single Select
   * @ojshortdesc A select one is a dropdown list that supports single selection and search filtering.
   * @ojrole combobox
   * @ojsignature [{
   *                target: "Type",
   *                value: "class ojSelectOne<K, D, V = any> extends ojSelect<V, ojSelectOneSettableProperties<K, D, V>>",
   *                genericParameters: [{"name": "K", "description": "Type of key of the dataprovider"}, {"name": "D", "description": "Type of data from the dataprovider"},
   *                , {"name": "V", "description": "Type of value of the component"}]
   *               },
   *               {
   *                target: "Type",
   *                value: "ojSelectOneSettableProperties<K, D, V= any> extends ojSelectSettableProperties<V>",
   *                for: "SettableProperties"
   *               }
   *              ]
   * @ojtsimport {module: "ojdataprovider", type: "AMD", imported: ["DataProvider"]}
   * @ojtsimport {module: "ojvalidation-base", type: "AMD", imported:["Converter", "Validator", "Validation", "AsyncValidator"]}
   * @ojstatus preview
   *
   * @classdesc
   * <h3 id="selectOverview-section">
   *   JET Select One
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#selectOverview-section"></a>
   * </h3>
   * <p>Description: JET Select One provides support for single-select and search filtering.</p>
   *
   * <p>A JET Select One can be created with the following markup.</p>
   *
   * <pre class="prettyprint">
   * <code>
   * &lt;oj-select-one>
   *   &lt;oj-option value="option 1">option 1&lt;/oj-option>
   *   &lt;oj-option value="option 2">option 2&lt;/oj-option>
   *   &lt;oj-option value="option 3">option 3&lt;/oj-option>
   *   &lt;oj-option value="option 4">option 4&lt;/oj-option>
   * &lt;/oj-select-one>
   * </code></pre>
   *
   * {@ojinclude "name":"validationAndMessagingDoc"}
   *
   * <h3 id="touch-section">
   *   Touch End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#touch-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"touchDocOne"}
   *
   * <h3 id="keyboard-section">
   *   Keyboard End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#keyboard-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"keyboardDocOne"}
   *
   * <h3 id="perf-section">
   *   Performance
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#perf-section"></a>
   * </h3>
   *
   * <h4>Page Load</h4>
   * <p>If the <a href="#options">options</a> attribute is a data provider, and if there is an initially selected value, setting the <a href="#valueOption">valueOption</a> attribute initially can improve page load performance because the element will not have to fetch the selected label from the data provider.</p>
   * <p>When using a data provider and renderMode is 'jet', the dropdown data isn't fetched until the user opens the dropdown.</p>
   *
   * <h3 id="styling-section">
   *   Styling
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"stylingDoc"}
   *
   * {@ojinclude "name":"selectCommon"}
   */

  /**
   * @ojcomponent oj.ojSelectMany
   * @augments oj.ojSelect
   * @since 0.6.0
   * @ojdisplayname Multi Select
   * @ojshortdesc A select many is a dropdown list that supports multiple selections and search filtering.
   * @ojrole combobox
   * @ojsignature [{
   *                target: "Type",
   *                value: "class ojSelectMany<K, D, V=any> extends ojSelect<Array<V>, ojSelectManySettableProperties<K, D, V>>",
   *                genericParameters: [{"name": "K", "description": "Type of key of the dataprovider"}, {"name": "D", "description": "Type of data from the dataprovider"}
   *                , {"name": "V", "description": "Type of each item in the value of the component"}]
   *               },
   *               {
   *                target: "Type",
   *                value: "ojSelectManySettableProperties<K, D, V=Array<any>> extends ojSelectSettableProperties<Array<V>>",
   *                for: "SettableProperties"
   *               }
   *              ]
   * @ojstatus preview
   *
   * @classdesc
   * <h3 id="selectOverview-section">
   *   JET Select Many
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#selectOverview-section"></a>
   * </h3>
   * <p>Description: JET Select Many provides support for multi-select and search filtering.</p>
   *
   * <p>A JET Select Many can be created with the following markup.</p>
   *
   * <pre class="prettyprint">
   * <code>
   * &lt;oj-select-many>
   *   &lt;oj-option value="option 1">option 1&lt;/oj-option>
   *   &lt;oj-option value="option 2">option 2&lt;/oj-option>
   *   &lt;oj-option value="option 3">option 3&lt;/oj-option>
   *   &lt;oj-option value="option 4">option 4&lt;/oj-option>
   * &lt;/oj-select-many>
   * </code></pre>
   *
   * {@ojinclude "name":"validationAndMessagingDoc"}
   *
   * <h3 id="touch-section">
   *   Touch End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#touch-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"touchDocMany"}
   *
   * <h3 id="keyboard-section">
   *   Keyboard End User Information
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#keyboard-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"keyboardDocMany"}
   *
   * <h3 id="perf-section">
   *   Performance
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#perf-section"></a>
   * </h3>
   *
   * <h4>Page Load</h4>
   * <p>If the <a href="#options">options</a> attribute is a data provider, and if there are initially selected values, setting the <a href="#valueOptions">valueOptions</a> attribute initially can improve page load performance because the element will not have to fetch the selected labels from the data provider.</p>
   * <p>When using a data provider and renderMode is 'jet', the dropdown data isn't fetched until the user opens the dropdown.</p>
   *
   * <h3 id="styling-section">
   *   Styling
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
   * </h3>
   *
   * {@ojinclude "name":"stylingDoc"}
   *
   * {@ojinclude "name":"selectCommon"}
   */

  /**
   * @ojcomponent oj.ojSelect
   * @augments oj.editableValue
   * @since 0.6.0
   * @abstract
   * @ojsignature [{
   *                target: "Type",
   *                value: "abstract class ojSelect<V, SP extends ojSelectSettableProperties<V, SV>, SV=V> extends editableValue<V, SP, SV>"
   *               },
   *               {
   *                target: "Type",
   *                value: "ojSelectSettableProperties<V, SV=V> extends editableValueSettableProperties<V, SV>",
   *                for: "SettableProperties"
   *               }
   *              ]
   * @ojstatus preview
   * @hideconstructor
   * @classdesc
   */
  /**
   * <h3 id="rtl-section">
   *   Reading direction
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#rtl-section"></a>
   * </h3>
   *
   * <p>As with any JET element, in the unusual case that the directionality (LTR or RTL) changes post-init, the Select must be <code class="prettyprint">refresh()</code>ed.
   *
   * <h3 id="a11y-section">
   *   Accessibility
   *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#a11y-section"></a>
   * </h3>
   * <p>
   * It is up to the application developer to associate an oj-label to the select element.
   * You should put an <code>id</code> on the select element, and then set
   * the <code>for</code> attribute on the oj-label to be the select's id.
   * </p>
   * <p>
   * The element will decorate its associated label with required and help
   * information, if the <code>required</code> and <code>help</code> attributes are set.
   * </p>
   *
   * @ojfragment selectCommon
   * @memberof oj.ojSelect
   */
  oj.__registerWidget('oj.ojSelect', $.oj.editableValue,
    {
      defaultElement: '<select>',
      widgetEventPrefix: 'oj',
      options:
      {
      /**
       * <p>
       * The oj-label sets the labelledBy property programmatically on the form component
       * to make it easy for the form component to find its oj-label component (a
       * document.getElementById call.)
       * </p>
       * <p>
       * The application developer should use the 'for'/'id api
       * to link the oj-label with the form component;
       * the 'for' on the oj-label to point to the 'id' on the input form component.
       * This is the most performant way for the oj-label to find its form component.
       * </p>
       *
       * @example <caption>Initialize component with <code class="prettyprint">for</code> attribute:</caption>
       * &lt;oj-label for="selectOneId">Name:&lt;/oj-label>
       * &lt;oj-select-one id="selectOneId">
       * &lt;/oj-select-one>
       * // ojLabel then writes the labelled-by attribute on the oj-switch.
       * &lt;oj-label id="labelId" for="selectOneId">Name:&lt;/oj-label>
       * &lt;oj-select-one id="selectOneId" labelled-by"labelId">
       * &lt;/oj-select-one>
       *
       * @example <caption>Get or set the <code class="prettyprint">labelledBy</code> property after initialization:</caption>
       * // getter
       * var labelledBy = myComp.labelledBy;
       *
       * // setter
       * myComp.labelledBy = "labelId";
       *
       * @expose
       * @name labelledBy
       * @ojshortdesc The oj-label sets the labelledBy property
       * programmatically on the form component.
       * @type {string|null}
       * @public
       * @instance
       * @since 7.0.0
       * @memberof oj.ojSelectOne
       */
     /**
       * <p>
       * The oj-label sets the labelledBy property programmatically on the form component
       * to make it easy for the form component to find its oj-label component (a
       * document.getElementById call.)
       * </p>
       * <p>
       * The application developer should use the 'for'/'id api
       * to link the oj-label with the form component;
       * the 'for' on the oj-label to point to the 'id' on the input form component.
       * This is the most performant way for the oj-label to find its form component.
       * </p>
       *
       * @example <caption>Initialize component with <code class="prettyprint">for</code> attribute:</caption>
       * &lt;oj-label for="selectManyId">Name:&lt;/oj-label>
       * &lt;oj-select-many id="selectManyId">
       * &lt;/oj-select-many>
       * // ojLabel then writes the labelled-by attribute on the oj-switch.
       * &lt;oj-label id="labelId" for="selectManyId">Name:&lt;/oj-label>
       * &lt;oj-select-many id="selectManyId" labelled-by"labelId">
       * &lt;/oj-select-many>
       *
       * @example <caption>Get or set the <code class="prettyprint">labelledBy</code> property after initialization:</caption>
       * // getter
       * var labelledBy = myComp.labelledBy;
       *
       * // setter
       * myComp.labelledBy = "labelId";
       *
       * @expose
       * @name labelledBy
       * @ojshortdesc The oj-label sets the labelledBy property
       * programmatically on the form component.
       * @type {string|null}
       * @public
       * @instance
       * @since 7.0.0
       * @memberof oj.ojSelectMany
       */
     /**
       * <p>
       * The oj-label sets the labelledBy property programmatically on the form component
       * to make it easy for the form component to find its oj-label component (a
       * document.getElementById call.)
       * </p>
       * <p>
       * The application developer should use the 'for'/'id api
       * to link the oj-label with the form component;
       * the 'for' on the oj-label to point to the 'id' on the input form component.
       * This is the most performant way for the oj-label to find its form component.
       * </p>
       *
       *
       * // setter
       * myComp.labelledBy = "labelId";
       *
       * @expose
       * @ojshortdesc The oj-label sets the labelledBy property
       * programmatically on the form component.
       * @type {string|null}
       * @default null
       * @public
       * @instance
       * @since 7.0.0
       * @memberof oj.ojSelect
       */
        labelledBy: null,
      /**
       * {@ojinclude "name":"selectCommonMinimumResultsForSearch"}
       *
       * @example <caption>Initialize the select with the <code class="prettyprint">minimum-results-for-search</code> attribute specified:</caption>
       * &lt;oj-select-one minimum-results-for-search="10">&lt;/oj-select-one>
       *
       * @example <caption>Get or set the <code class="prettyprint">minimumResultsForSearch</code> property after initialization:</caption>
       * // getter
       * var minimumResultsForSearch = mySelect.minimumResultsForSearch;
       *
       * // setter
       * mySelect.minimumResultsForSearch = 10;
       *
       * @name minimumResultsForSearch
       * @ojshortdesc The threshold for showing the search box in the dropdown.
       * @expose
       * @memberof oj.ojSelectOne
       * @instance
       * @type {number}
       * @default 15
       * @ojmin 0
       */
      /**
       * {@ojinclude "name":"selectCommonMinimumResultsForSearch"}
       *
       * @example <caption>Initialize the select with the <code class="prettyprint">minimum-results-for-search</code> attribute specified:</caption>
       * &lt;oj-select-many minimum-results-for-search="10">&lt;/oj-select-many>
       *
       * @example <caption>Get or set the <code class="prettyprint">minimumResultsForSearch</code> property after initialization:</caption>
       * // getter
       * var minimumResultsForSearch = mySelect.minimumResultsForSearch;
       *
       * // setter
       * mySelect.minimumResultsForSearch = 10;
       *
       * @name minimumResultsForSearch
       * @ojshortdesc The threshold for showing the search box in the dropdown.
       * @expose
       * @memberof oj.ojSelectMany
       * @instance
       * @type {number}
       * @default 15
       * @ojmin 0
       */
      /**
       * The threshold for showing the search box in the dropdown when it's expanded.
       * The search box is always displayed when the results size is greater than
       * the threshold, otherwise the search box is initially turned off.
       * However, the search box is displayed as soon as the user starts typing.
       *
       * @ojshortdesc The threshold for showing the search box in the dropdown.
       * @expose
       * @memberof oj.ojSelect
       * @instance
       * @ojfragment selectCommonMinimumResultsForSearch
       */
        minimumResultsForSearch: 15,

      /**
       * The placeholder text to set on the element.<p>
       * If the <code class="prettyprint">placeholder</code> attribute is specified to a string, ojselect will adds a placeholder item at the beginning of the dropdown list with
       *  <ul>
       *  <li>displayValue: placeholder text</li>
       *  <li>value: an empty string</li>
       *  </ul>
       * The placeholder item in the dropdown is selectable. However, it's not a valid choice, i.e. validation will fail if the select element is a required field.<p>
       * The placeholder item doesn't participate in the filtering, so it will not appear in the result list with a filter specified.<p>
       * Placeholder text can be an empty string, please see the select placeholder cookbook demo.
       *
       * @example <caption>Initialize the select with the <code class="prettyprint">placeholder</code> attribute specified:</caption>
       * &lt;oj-select-one placeholder="Please select ...">&lt;/oj-select-one>
       *
       * @example <caption>Get or set the <code class="prettyprint">placeholder</code> property after initialization:</caption>
       * // getter
       * var placeholderValue = mySelect.placeholder;
       *
       * // setter
       * mySelect.placeholder = "Select a value";
       *
       * @name placeholder
       * @ojshortdesc A short hint that can be displayed before user selects a value.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojSelectOne
       * @type {string|null}
       * @default null
       */
      /**
       * The placeholder text to set on the element. The placeholder specifies a short hint that can be displayed before user
       * selects a value.
       *
       * @example <caption>Initialize the select with the <code class="prettyprint">placeholder</code> attribute specified:</caption>
       * &lt;oj-select-many placeholder="Please select ...">&lt;/oj-select-many>
       *
       * @example <caption>Get or set the <code class="prettyprint">placeholder</code> property after initialization:</caption>
       * // getter
       * var placeholderValue = mySelect.placeholder;
       *
       * // setter
       * mySelect.placeholder = "Select values";
       *
       * @name placeholder
       * @ojshortdesc A short hint that can be displayed before user selects a value.
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojSelectMany
       * @type {string|null}
       * @default null
       */
        placeholder: null,

      /**
       * @typedef {Object} oj.ojSelect.OptionContext
       * @property {Element} componentElement A reference to the Select element.
       * @property {?Element} parent The parent of the data item. The parent is null for root node.
       * @property {number} index The index of the option, where 0 is the index of the first option. In the hierarchical case the index is relative to its parent.
       * @property {number } depth The depth of the option. The depth of the first level children under the invisible root is 0.
       * @property {boolean} leaf Whether the option is a leaf or a group.
       * @property {Object} data The data object for the option.
       * @property {Element} parentElement The option label element. The renderer can use this to directly append content.
       */
      /**
       * {@ojinclude "name":"selectCommonOptionRenderer"}
       * @name optionRenderer
       * @ojshortdesc The renderer function that renders the content of each option.
       * @expose
       * @memberof oj.ojSelectOne
       * @instance
       * @type {null|function(Object):Object}
       * @ojsignature { target: "Type",
       *                value: "?((param0: oj.ojSelect.OptionContext) => Element)|null",
       *                jsdocOverride: true}
       * @default null
       * @example <caption>Initialize the select with a renderer:</caption>
       * &lt;oj-select-one option-renderer="[[optionRenderer]]">&lt;/oj-select-one>
       * @example var optionRenderer = function(context) {
       *            var ojOption = document.createElement('oj-option');
       *            // Set the textContent or append other child nodes
       *            ojOption.textContent = context.data['FIRST_NAME'] + ' ' + context.data['LAST_NAME'];
       *            return ojOption;
       *          };
       */
      /**
       * {@ojinclude "name":"selectCommonOptionRenderer"}
       * @name optionRenderer
       * @ojshortdesc The renderer function that renders the content of each option.
       * @expose
       * @memberof oj.ojSelectMany
       * @instance
       * @type {null|function(Object):Object}
       * @ojsignature { target: "Type",
       *                value: "?((param0: oj.ojSelect.OptionContext) => Element)|null",
       *                jsdocOverride: true}
       * @default null
       * @example <caption>Initialize the Select with a renderer:</caption>
       * &lt;oj-select-many option-renderer="[[optionRenderer]]">&lt;/oj-select-many>
       * @example var optionRenderer = function(context) {
       *            var ojOption = document.createElement('oj-option');
       *            // Set the textContent or append other child nodes
       *            ojOption.textContent = context.data['FIRST_NAME'] + ' ' + context.data['LAST_NAME'];
       *            return ojOption;
       *          };
       */
      /**
       * The renderer function that renders the content of each option.
       * The function should return an oj-option element (for leaf option) or an oj-optgroup element (for group option).
       * <p>It is not necessary to set the "value" attribute on the oj-option as it is available from the options data.</p>
       * <p><b>
       * Note: Prior to version 6.1.0, the function could also return one of the following:
       * <ul>
       *   <li>An Object with the following property:
       *     <ul><li>insert: HTMLElement - A DOM element representing the content of the option.</li></ul>
       *   </li>
       *   <li>undefined: If the developer chooses to manipulate the option content directly, the function should return undefined.</li>
       * </ul>
       * This is deprecated and support may be removed in the future.
       * </b></p>
       *
       * <p>The <code class="prettyprint">option-renderer</code> decides only
       * how the options' content has to be rendered in the drop down.
       * Once an option is selected from the drop down,
       * what value has to be displayed in the in input field is decided by the
       * label field in the data object. See <a href="#options">options</a>
       * and <a href="#optionsKeys">options-keys</a> for configuring option label and value.
       * </p>
       *
       * <p>The context parameter passed to the renderer contains the following keys:</p>
       * <table class="keyboard-table">
       *   <thead>
       *     <tr>
       *       <th>Key</th>
       *       <th>Description</th>
       *     </tr>
       *   </thead>
       *   <tbody>
       *     <tr>
       *       <td><kbd>componentElement</kbd></td>
       *       <td>A reference to the Select element.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>parent</kbd></td>
       *       <td>The parent of the data item. The parent is null for root node.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>index</kbd></td>
       *       <td>The index of the option, where 0 is the index of the first option. In the hierarchical case the index is relative to its parent.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>depth</kbd></td>
       *       <td>The depth of the option. The depth of the first level children under the invisible root is 0.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>leaf</kbd></td>
       *       <td>Whether the option is a leaf or a group.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>data</kbd></td>
       *       <td>The data object for the option.</td>
       *     </tr>
       *     <tr>
       *       <td><kbd>parentElement</kbd></td>
       *       <td>The option label element.  The renderer can use this to directly append content.</td>
       *     </tr>
       *   </tbody>
       * </table>
       *
       * @expose
       * @memberof oj.ojSelect
       * @instance
       * @ojfragment selectCommonOptionRenderer
       */
        optionRenderer: null,

      /**
       * @typedef {Object} oj.ojSelect.Option
       * @property {boolean=} disabled Option item is disabled.
       * @property {string=} label The display label for the option item. If it's missing, string(value) will be used.
       * @property {any} value The value of the option item.
       */
      /**
       * @typedef {Object} oj.ojSelect.Optgroup
       * @property {boolean=} disabled Option group is disabled.
       * @property {string} label The display label for the option group.
       * @property {Array.<oj.ojSelect.Option|oj.ojSelect.Optgroup>} children The Option or Optgroup children.
       */
      /**
       * {@ojinclude "name":"selectCommonOptions"}
       *
       * @name options
       * @ojshortdesc The option items for the Select.
       * @expose
       * @access public
       * @instance
       * @type {Array.<Object>|Object|null}
       * @ojsignature { target: "Type",
       *                value: "Array<oj.ojSelect.Option|oj.ojSelect.Optgroup>|oj.DataProvider<K, D>|null",
       *                jsdocOverride: true}
       * @default null
       * @memberof oj.ojSelectOne
       *
       * @example <caption>Initialize the Select with the <code class="prettyprint">options</code> attribute specified:</caption>
       * &lt;oj-select-one options="[[dataArray]]">&lt;/oj-select-one>
       *
       * @example <caption>The options array should contain objects with value and label properties:</caption>
       * var dataArray = [{value: 'option1', label: 'Option 1'},
       *                  {value: 'option2', label: 'Option 2', disabled: true},
       *                  {value: 'option3', label: 'Option 3'}];
       *
       * @example <caption>Initialize the Select with a data provider and data mapping:</caption>
       * &lt;oj-select-one options="[[dataProvider]]">&lt;/oj-select-one>
       *
       * @example <caption>Data mapping can be used if data doesn't have value and label properties.</caption>
       * // actual field names are "id" and "name"
       * var dataArray = [
       *            {id: 'Id 1', name: 'Name 1'},
       *            {id: 'Id 2', name: 'Name 2'},
       *            {id: 'Id 3', name: 'Name 3'}];
       *
       * // In mapfields, map "name" to "label" and "id" to "value"
       * var mapFields = function(item) {
       *   var data = item['data'];
       *   var mappedItem = {};
       *   mappedItem['data'] = {};
       *   mappedItem['data']['label'] = data['name'];
       *   mappedItem['data']['value'] = data['id'];
       *   mappedItem['metadata'] = {'key': data['id']};
       *   return mappedItem;
       * };
       * var dataMapping = {'mapFields': mapFields};
       *
       * var arrayDataProvider = new oj.ArrayDataProvider(dataArray, {keyAttributes: 'id'});
       * var dataProvider = new oj.ListDataProviderView(arrayDataProvider, {'dataMapping': dataMapping});
       */
      /**
       * {@ojinclude "name":"selectCommonOptions"}
       *
       * @name options
       * @ojshortdesc The option items for the Select.
       * @expose
       * @access public
       * @instance
       * @type {Array.<Object>|Object|null}
       * @ojsignature { target: "Type",
       *                value: "Array<oj.ojSelect.Option|oj.ojSelect.Optgroup>|oj.DataProvider<K, D>|null",
       *                jsdocOverride: true}
       * @default null
       * @memberof oj.ojSelectMany
       *
       * @example <caption>Initialize the Select with the <code class="prettyprint">options</code> attribute specified:</caption>
       * &lt;oj-select-many options="[[dataArray]]">&lt;/oj-select-many>
       *
       * @example <caption>The options array should contain objects with value and label properties:</caption>
       * var dataArray = [{value: 'option1', label: 'Option 1'},
       *                  {value: 'option2', label: 'Option 2', disabled: true},
       *                  {value: 'option3', label: 'Option 3'}];
       *
       * @example <caption>Initialize the Select with a data provider and data mapping:</caption>
       * &lt;oj-select-many options="[[dataProvider]]">&lt;/oj-select-many>
       *
       * @example <caption>Data mapping can be used if data doesn't have value and label properties.</caption>
       * // actual field names are "id" and "name"
       * var dataArray = [
       *            {id: 'Id 1', name: 'Name 1'},
       *            {id: 'Id 2', name: 'Name 2'},
       *            {id: 'Id 3', name: 'Name 3'}];
       *
       * // In mapfields, map "name" to "label" and "id" to "value"
       * var mapFields = function(item) {
       *   var data = item['data'];
       *   var mappedItem = {};
       *   mappedItem['data'] = {};
       *   mappedItem['data']['label'] = data['name'];
       *   mappedItem['data']['value'] = data['id'];
       *   mappedItem['metadata'] = {'key': data['id']};
       *   return mappedItem;
       * };
       * var dataMapping = {'mapFields': mapFields};
       *
       * var arrayDataProvider = new oj.ArrayDataProvider(dataArray, {keyAttributes: 'id'});
       * var dataProvider = new oj.ListDataProviderView(arrayDataProvider, {'dataMapping': dataMapping});
       */
      /**
       * The option items for the Select. This attribute can be used instead of providing a list of <code class="prettyprint">oj-option</code> or <code class="prettyprint">oj-optgroup</code> child elements of the Select element.
       * This attribute accepts:
       * <ol>
       * <li>an array of <code class="prettyprint">oj.ojSelect.Option</code> and/or <code class="prettyprint">oj.ojSelect.Optgroup</code>.
       *   <ul>
       *   <li>Use <code class="prettyprint">oj.ojSelect.Option</code> for a leaf option.</li>
       *   <li>Use <code class="prettyprint">oj.ojSelect.Optgroup</code> for a group option.</li>
       *   </ul>
       * </li>
       * <li>a data provider. This data provider must implement <a href="oj.DataProvider.html">oj.DataProvider</a>.
       *   <ul>
       *   <li><code class="prettyprint">value</code> in <code class="prettyprint">oj.ojSelect.Option</code> must be the row key in the data provider.</li>
       *   <li>A maximum of 15 rows will be displayed in the dropdown. If more than 15 results are available then users need to filter further. Please note that users can't filter further if render-mode is <code class="prettyprint">native</code>.</li>
       *   <li>If the data provider supports the filter criteria capability including the contains (<code class="prettyprint">$co or $regex</code>) operator, JET Select will request the data provider to do filtering. Otherwise it will filter internally.</li>
       *   <li>See also <a href="#perf-section">Improve page load performance</a></li>
       *   </ul>
       * </li>
       * </ol>
       *
       * @expose
       * @memberof oj.ojSelect
       * @instance
       * @ojfragment selectCommonOptions
       */
        options: null,

      /**
       * @typedef {Object} oj.ojSelect.OptionsKeys
       * @property {?string=} label The key name for the label.
       * @property {?string=} value The key name for the value.
       * @property {?string=} children The key name for the children.
       * @property {?Object=} childKeys The object for the child keys.
       * @ojsignature {target:"Type", value:"?(oj.ojSelect.OptionsKeys)", for:"childKeys", jsdocOverride:true}
       */
      /**
       * {@ojinclude "name":"selectCommonOptionsKeys"}
       *
       * @example <caption>Initialize the Select with <code class="prettyprint">options-keys</code> specified. This allows the key names to be redefined in the options array.</caption>
       * &lt;oj-select-one options-keys="[[optionsKeys]]">&lt;/oj-select-one>
       * @example var optionsKeys = {value : "state_abbr", label : "state_name"};
       * @example <caption>Redefine keys for data with subgroups.</caption>
       * var optionsKeys = {label : "regions", children : "states",
       *                    childKeys : {value : "state_abbr", label : "state_name"}};
       *
       * @name optionsKeys
       * @ojshortdesc Specify the key names to use in the options array.  Depending on options-keys means that the signature of the data does not match what is supported by the options attribute.
       * @expose
       * @access public
       * @instance
       * @type {?Object}
       * @default null
       * @memberof oj.ojSelectOne
       * @ojsignature {target:"Type", value:"oj.ojSelect.OptionsKeys|null", jsdocOverride:true}
       */
      /**
       * {@ojinclude "name":"selectCommonOptionsKeys"}
       *
       * @example <caption>Initialize the Select with <code class="prettyprint">options-keys</code> specified. This allows the key names to be redefined in the options array.</caption>
       * &lt;oj-select-many options-keys="[[optionsKeys]]">&lt;/oj-select-many>
       * @example var optionsKeys = {value : "state_abbr", label : "state_name"};
       * @example <caption>Redefine keys for data with subgroups.</caption>
       * var optionsKeys = {label : "regions", children : "states",
       *                    childKeys : {value : "state_abbr", label : "state_name"}};
       *
       * @name optionsKeys
       * @ojshortdesc Specify the key names to use in the options array.  Depending on options-keys means that the signature of the data does not match what is supported by the options attribute.
       * @expose
       * @access public
       * @instance
       * @type {?Object}
       * @default null
       * @memberof oj.ojSelectMany
       * @ojsignature {target:"Type", value:"oj.ojSelect.OptionsKeys|null", jsdocOverride:true}
       */
      /**
       * Specify the key names to use in the options array.
       * <p>Depending on options-keys means that the signature of the data does not match what is supported by the options attribute. When using Typescript, this would result in a compilation error.</p>
       * <p>Best practice is to use a <a href="oj.ListDataProviderView.html">oj.ListDataProviderView</a> with data mapping as a replacement.</p>
       * <p>However, for the app that must fetch data from a REST endpoint where the data fields do not match those that are supported by the options attribute, you may use the options-keys with any dataProvider that implements <a href="oj.DataProvider.html">oj.DataProvider</a> interface.</p>
       * <p>Note: <code class="prettyprint">child-keys</code> and <code class="prettyprint">children</code> properties in <code class="prettyprint">options-keys</code> are ignored when using a <a href="oj.TreeDataProvider.html">oj.TreeDataProvider</a>.</p>
       *
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojSelect
       * @ojfragment selectCommonOptionsKeys
       */
        optionsKeys: {
        /**
         * The key name for the label.
         *
         * @name optionsKeys.label
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojSelectOne
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */
        /**
         * The key name for the label.
         *
         * @name optionsKeys.label
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojSelectMany
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */

        /**
         * The key name for the value.
         *
         * @name optionsKeys.value
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojSelectOne
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */
        /**
         * The key name for the value.
         *
         * @name optionsKeys.value
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojSelectMany
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */

        /**
         * The key name for the children. It is ignored when using a <a href="oj.TreeDataProvider.html">oj.TreeDataProvider</a>.
         *
         * @name optionsKeys.children
         * @ojshortdesc The key name for the children. It is ignored when using a TreeDataProvider.
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojSelectOne
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */
        /**
         * The key name for the children. It is ignored when using a <a href="oj.TreeDataProvider.html">oj.TreeDataProvider</a>.
         *
         * @name optionsKeys.children
         * @ojshortdesc The key name for the children. It is ignored when using a TreeDataProvider.
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojSelectMany
         * @type {?string}
         * @ojsignature { target: "Type",
         *                value: "?"}
         * @default null
         */

        /**
         * The object for the child keys. It is ignored when using a <a href="oj.TreeDataProvider.html">oj.TreeDataProvider</a>.
         *
         * @name optionsKeys.childKeys
         * @ojshortdesc The object for the child keys. It is ignored when using a TreeDataProvider.
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojSelectOne
         * @type {?Object}
         * @default null
         * @ojsignature {target:"Type", value:"oj.ojSelect.OptionsKeys|null", jsdocOverride:true}
         */
        /**
         * The object for the child keys. It is ignored when using a <a href="oj.TreeDataProvider.html">oj.TreeDataProvider</a>.
         *
         * @name optionsKeys.childKeys
         * @ojshortdesc The object for the child keys. It is ignored when using a TreeDataProvider.
         * @expose
         * @public
         * @instance
         * @memberof! oj.ojSelectMany
         * @type {?Object}
         * @default null
         * @ojsignature {target:"Type", value:"oj.ojSelect.OptionsKeys|null", jsdocOverride:true}
         */
        },

      /**
       * <p>Attributes specified here will be set on the picker DOM element when it's launched.
       * <p>The supported attributes are <code class="prettyprint">class</code> and <code class="prettyprint">style</code>, which are appended to the picker's class and style, if any.
       * Note: 1) picker-attributes is not applied in the native renderMode.
       * 2) setting this attribute after element creation has no effect.
       *
       * @property {string=} style The css style to append to the picker.
       * @property {string=} class The css class to append to the picker.
       *
       * @example <caption>Initialize the select specifying a set of attributes to be set on the picker DOM element:</caption>
       * &lt;oj-select-one picker-attributes="[[pickerAttributes]]">&lt;/oj-select-one>
       * @example var pickerAttributes = {
       *   "style": "color:blue;",
       *   "class": "my-class"
       * };
       *
       * @name pickerAttributes
       * @ojshortdesc The style attributes for the drop down.
       * @expose
       * @memberof oj.ojSelectOne
       * @instance
       * @type {?Object}
       * @default null
       */
      /**
       * <p>Attributes specified here will be set on the picker DOM element when it's launched.
       * <p>The supported attributes are <code class="prettyprint">class</code> and <code class="prettyprint">style</code>, which are appended to the picker's class and style, if any.
       * Note: 1) picker-attributes is not applied in the native renderMode.
       * 2) setting this attribute after element creation has no effect.
       *
       * @property {string=} style The css style to append to the picker.
       * @property {string=} class The css class to append to the picker.
       *
       * @example <caption>Initialize the select specifying a set of attributes to be set on the picker DOM element:</caption>
       * &lt;oj-select-many picker-attributes="[[pickerAttributes]]">&lt;/oj-select-many>
       * @example var pickerAttributes = {
       *   "style": "color:blue;",
       *   "class": "my-class"
       * };
       *
       * @name pickerAttributes
       * @ojshortdesc The style attributes for the drop down.
       * @expose
       * @memberof oj.ojSelectMany
       * @instance
       * @type {?Object}
       * @default null
       */
        pickerAttributes: null,

      /**
      * {@ojinclude "name":"selectCommonRequired"}
      *
      * @example <caption>Initialize the select with the <code class="prettyprint">required</code> attribute:</caption>
      * &lt;oj-select-one required="[[isRequired]]">&lt;/oj-select-one>
      *
      * @example <caption>Get or set the <code class="prettyprint">required</code> property after initialization:</caption>
      * // getter
      * var requiredValue = mySelect.required;
      *
      * // setter
      * mySelect.required = true;
      *
      * @name required
      * @expose
      * @ojshortdesc Specifies whether a value is required.
      * @access public
      * @instance
      * @memberof oj.ojSelectOne
      * @type {boolean}
      * @default false
      * @since 0.7.0
      * @see #translations
      */
     /**
      * {@ojinclude "name":"selectCommonRequired"}
      *
      * @example <caption>Initialize the select with the <code class="prettyprint">required</code> attribute:</caption>
      * &lt;oj-select-many required="[[isRequired]]">&lt;/oj-select-many>
      *
      * @example <caption>Get or set the <code class="prettyprint">required</code> property after initialization:</caption>
      * // getter
      * var requiredValue = mySelect.required;
      *
      * // setter
      * mySelect.required = true;
      *
      * @name required
      * @expose
      * @ojshortdesc Specifies whether a value is required.
      * @access public
      * @instance
      * @memberof oj.ojSelectMany
      * @type {boolean}
      * @default false
      * @since 0.7.0
      * @see #translations
      */
      /**
       * Whether the element is required or optional. When required is set to true, an implicit
       * required validator is created using the validator factory -
       * <code class="prettyprint">oj.Validation.validatorFactory(oj.ValidatorFactory.VALIDATOR_TYPE_REQUIRED).createValidator()</code>.
       *
       * Translations specified using the <code class="prettyprint">translations.required</code> attribute
       * and the label associated with the element, are passed through to the options parameter of the
       * createValidator method.
       *
       * <p>
       * When <code class="prettyprint">required</code> property changes due to programmatic intervention,
       * the element may clear messages and run validation, based on the current state it's in. </br>
       *
       * <h4>Running Validation</h4>
       * <ul>
       * <li>if element is valid when required is set to true, then it runs deferred validation on
       * the value. This is to ensure errors are not flagged unnecessarily.
       * </li>
       * <li>if element is invalid and has deferred messages when required is set to false, then
       * element messages are cleared but no deferred validation is run.
       * </li>
       * <li>if element is invalid and currently showing invalid messages when required is set, then
       * element messages are cleared and normal validation is run using the current display value.
       * <ul>
       *   <li>if there are validation errors, then <code class="prettyprint">value</code>
       *   property is not updated and the error is shown.
       *   </li>
       *   <li>if no errors result from the validation, the <code class="prettyprint">value</code>
       *   property is updated; page author can listen to the <code class="prettyprint">optionChange</code>
       *   event on the <code class="prettyprint">value</code> property to clear custom errors.</li>
       * </ul>
       * </li>
       * </ul>
       *
       * <h4>Clearing Messages</h4>
       * <ul>
       * <li>Only messages created by the element are cleared.</li>
       * <li><code class="prettyprint">messages-custom</code> property is not cleared.</li>
       * </ul>
       *
       * </p>
       *
       * This property set to <code class="prettyprint">false</code> implies that a value is not required to be provided by the user.
       * This is the default.
       * This property set to <code class="prettyprint">true</code> implies that a value is required to be provided by user and the
       * input's label will render a required icon. Additionally a required validator -
       * {@link oj.RequiredValidator} - is implicitly used if no explicit required validator is set.
       * An explicit required validator can be set by page authors using the validators attribute.
       *
       * @expose
       * @access public
       * @instance
       * @memberof oj.ojSelect
       * @since 0.7.0
       * @see #translations
       * @ojfragment selectCommonRequired
       */
        required: false,

      /**
       * Dictates element's readonly state.
       *
       * @example <caption>Initialize the select with the <code class="prettyprint">readonly</code> attribute:</caption>
       * &lt;oj-some-element readonly>&lt;/oj-some-element>
       *
       * @example <caption>Get or set the <code class="prettyprint">readonly</code> property after initialization:</caption>
       * // getter
       * var ro = myComp.readonly;
       *
       * // setter
       * myComp.readonly = false;
       *
       * @name readOnly
       * @alias readonly
       * @expose
       * @ojshortdesc Specifies whether a value is readonly
       * @access public
       * @instance
       * @memberof oj.ojSelectOne
       * @type {boolean}
       * @default false
       */
      /**
       * Dictates element's readonly state.
       *
       * @example <caption>Initialize the select with <code class="prettyprint">readonly</code> attribute:</caption>
       * &lt;oj-some-element readonly>&lt;/oj-some-element>
       *
       * @example <caption>Get or set the <code class="prettyprint">readonly</code> property after initialization:</caption>
       * // getter
       * var ro = myComp.readonly;
       *
       * // setter
       * myComp.readonly = false;
       *
       * @name readOnly
       * @alias readonly
       * @expose
       * @ojshortdesc Specifies whether a value is readonly
       * @access public
       * @instance
       * @memberof oj.ojSelectMany
       * @type {boolean}
       * @default false
       */
        readOnly: false,

      /**
       * {@ojinclude "name":"selectCommonRenderMode"}
       * @example <caption>Set the <code class="prettyprint">render-mode</code> attribute:</caption>
       * &lt;oj-select-one render-mode="native">&lt;/oj-select-one>
       *
       * @example <caption>Get or set the <code class="prettyprint">renderMode</code> property after initialization:</caption>
       * // getter
       * var renderMode = mySelect.renderMode;
       *
       * // setter
       * mySelect.renderMode = "native";
       *
       * @name renderMode
       * @ojshortdesc Specifies whether to render select in JET or as a HTML Select tag.
       * @expose
       * @memberof oj.ojSelectOne
       * @instance
       * @type {string}
       * @ojvalue {string} "jet" Render the select in jet mode.
       * @ojvalue {string} "native" Render the select in native mode.
       */
      /**
       * {@ojinclude "name":"selectCommonRenderMode"}
       * @example <caption>Set the <code class="prettyprint">render-mode</code> attribute:</caption>
       * &lt;oj-select-many render-mode="native">&lt;/oj-select-many>
       *
       * @example <caption>Get or set the <code class="prettyprint">renderMode</code> property after initialization:</caption>
       * // getter
       * var renderMode = mySelect.renderMode;
       *
       * // setter
       * mySelect.renderMode = "native";
       *
       * @name renderMode
       * @ojshortdesc Specifies whether to render select in JET or as a HTML Select tag.
       * @expose
       * @memberof oj.ojSelectMany
       * @instance
       * @type {string}
       * @ojvalue {string} "jet" Render the select in jet mode.
       * @ojvalue {string} "native" Render the select in native mode.
       */
      /**
       * The render-mode attribute allows applications to specify whether to render select in JET or as a HTML Select tag.
       * Valid Values: jet, native
       *
       * <ul>
       *  <li> jet - Applications get full JET functionality.</li>
       *  <li> native - Applications get the HTML Select tag functionality and additional JET features below:
       *    <ul>
       *      <li>validation</li>
       *      <li>placeholder</li>
       *      <li>options (ko.observableArray)</li>
       *      <li>list</li>
       *      <li>optionKeys</li>
       *    </ul>
       *  With native renderMode, the functionality that is sacrificed compared to jet rendermode is:
       *    <ul>
       *      <li>no search box (no filtering)</li>
       *      <li>for multiple select, only number of selected items is displayed in the selectbox, not the selected values</li>
       *      <li>beforeExpand event isn't fired when the popup picker opens.</li>
       *      <li>only one level nesting optgroups in the popup picker due to the HTML optgroup limitation</li>
       *      <li>no image support in the option list</li>
       *      <li>All Sub-IDs are not available in the native renderMode.</li>
       *      <li>pickerAttributes is not applied in the native renderMode.</li>
       *      <li>when using data provider a maximum of 15 rows will be displayed in the dropdown, users can't filter further.</li>
       *    </ul>
       * </ul>
       *
       * The default value depends on the theme. In alta-android, alta-ios and alta-windows themes, the default is "native" and it's "jet" for all other themes.
       *
       * @expose
       * @memberof oj.ojSelect
       * @instance
       * @ojfragment selectCommonRenderMode
       */
        renderMode: 'jet',

      /**
       * The <code class="prettyprint">valueOption</code> is similar to the <code class="prettyprint">value</code>, but is an
       * Object which contains both a value and display label.
       * The <code class="prettyprint">value</code> and <code class="prettyprint">valueOption</code> are kept in sync.
       * If initially both are set, the selected value in the <code class="prettyprint">value</code> attribute has precedence.
       * <p>Note: If the <code class="prettyprint">options</code> attribute is a data provider, and if there is an initially selected value, setting the <code class="prettyprint">valueOption</code> attribute initially can improve page load performance because the element will not have to fetch the selected label from the data provider.</p>
       * <p>If <code class="prettyprint">valueOption</code> is not specified or the selected value is missing, then the label will be fetched from the data provider.</p>
       *
       * @name valueOption
       * @ojshortdesc The current value of the element and its associated display label.
       * @expose
       * @instance
       * @type {null | Object}
       * @default null
       * @ojwriteback
       *
       * @property {any} value current value of JET Select
       * @property {string} [label] display label of value above. If missing, String(value) is used.
       * @memberof oj.ojSelectOne
       * @ojsignature { target: "Type",
       *                value: "V|null", for: "value"}
       *
       * @example <caption>Initialize the Select with the <code class="prettyprint">value-option</code> attribute specified:</caption>
       * &lt;oj-select-one value-option="[[valueOption]]">&lt;/oj-select-one>
       *
       * @example <caption>Object with value and label properties:</caption>
       * var valueOption = {'value': 'val1', 'label': 'Label 1'};
       *
       * @example <caption>Get or set the <code class="prettyprint">valueOption</code> property after initialization:</caption>
       * // getter
       * var valueOption = mySelect.valueOption;
       *
       * // setter
       * mySelect.valueOption = valueOption;
       */
        valueOption: null,

      /**
       * The <code class="prettyprint">valueOptions</code> is similar to the <code class="prettyprint">value</code>, but is an array
       * of Objects and each Object contains both a value and display label.
       * The <code class="prettyprint">value</code> and <code class="prettyprint">valueOptions</code> are kept in sync.
       * If initially both are set, the selected values in the <code class="prettyprint">value</code> attribute has precedence.
       * <p>Note: If the <code class="prettyprint">options</code> attribute is a data provider, and if there are initially selected values, setting the <code class="prettyprint">valueOptions</code> attribute initially can improve page load performance because the element will not have to fetch the selected labels from the data provider.</p>
       *<p>If <code class="prettyprint">valueOptions</code> is not specified or one of the selected values is missing, then the labels will be fetched from the data provider.</p>
       *
       * @name valueOptions
       * @ojshortdesc The current values of the element and their associated display labels.
       * @expose
       * @instance
       * @type {null | Array.<Object>}
       * @default null
       * @ojwriteback
       *
       * @property {any} value a current value of JET Select
       * @property {string} [label] display label of value above. If missing, String(value) is used.
       * @ojsignature { target: "Type",
       *                value: "Array<{value: V, label?: string}> | null",
       *                jsdocOverride: true}
       *
       * @memberof oj.ojSelectMany
       *
       * @example <caption>Initialize the Select with the <code class="prettyprint">value-options</code> attribute specified:</caption>
       * &lt;oj-select-many value-options="[[optionsArray]]">&lt;/oj-select-many>
       *
       * @example <caption>Array of Objects with value and label properties:</caption>
       * var optionsArray = [{'value': 'val1', 'label': 'Label 1'},
       *                     {'value': 'val2', 'label': 'Label 2'}];
       *
       * @example <caption>Get or set the <code class="prettyprint">valueOptions</code> property after initialization:</caption>
       * // getter
       * var valueOptions = mySelect.valueOptions;
       *
       * // setter
       * mySelect.valueOptions = optionsArray;
       */
        valueOptions: null

      /**
       * The value of the element. It supports any type. Select only accepts a value that's in the drop down list.
       * When the value attribute is not set, the first option is used as its initial value if it exists.
       * Trying to set a new value that's not in the drop down list fails validation and the new value is not set.
       * <p>If a value is specified before the data for the drop down list is available, then that value is set initially.
       * When the data for the drop down list is available, the initially set value is validated.
       * If it fails validation, the first option will be set as the value instead.</p>
       *
       * @example <caption>Initialize the select with the <code class="prettyprint">value</code> attribute specified:</caption>
       * &lt;oj-select-one value="option1">&lt;/oj-select-one>
       *
       * @example <caption>Get or set the <code class="prettyprint">value</code> property after initialization:</caption>
       * // getter
       * var value = mySelect.value;
       *
       * // setter
       * mySelect.value = "option1";
       *
       * @member
       * @name value
       * @ojshortdesc The value of the element.
       * @access public
       * @instance
       * @memberof oj.ojSelectOne
       * @type {any}
       * @ojsignature { target: "Type",
       *                value: "V|null"}
       * @ojwriteback
       */
      /**
       * The value of the element. The value is an array with any type of items.
       *
       * @example <caption>Initialize the select with the <code class="prettyprint">value</code> attribute specified:</caption>
       * &lt;oj-select-many value="{{val}}">&lt;/oj-select-many>
       * @example var val = ['option1', 'option2'];
       *
       * @example <caption>Get or set the <code class="prettyprint">value</code> property after initialization:</caption>
       * // getter
       * var value = mySelect.value;
       *
       * // setter
       * mySelect.value = ["option1", "option2"];
       *
       * @member
       * @name value
       * @ojshortdesc The value of the element.
       * @access public
       * @instance
       * @memberof oj.ojSelectMany
       * @type {Array.<any>|null}
       * @ojsignature { target: "Type",
       *                value: "Array<V>|null"}
       * @default null
       * @ojwriteback
       */
      },

    /**
     * Returns a jQuery object containing the element visually representing the select.
     *
     * <p>This method does not accept any arguments.
     *
     * @expose
     * @memberof! oj.ojSelect
     * @instance
     * @public
     * @ignore
     * @return {jQuery} the select
     */
      widget: function () {
      // native renderMode
        if (this.select) {
          return this.select.container;
        }
        return this.element.parent();
      },

    /**
     * @override
     * @protected
     * @instance
     * @memberof! oj.ojSelect
     */
      _ComponentCreate: function () {
        this._super();
        _ComboUtils.wrapDataProviderIfNeeded(this, null);
        this._setup();
      },

    /**
     * @override
     * @protected
     * @instance
     * @memberof! oj.ojSelect
     */
      _AfterCreate: function () {
        var ariaLabelledBy;
        this._super();

        // For custom element syntax, we need to get the label id and
        // set aria-labelledby on the focusable element.
        if (this._IsCustomElement()) {
          if (this.options.labelledBy) {
            var defaultLabelId = this.uuid + '_Label';
            ariaLabelledBy =
            oj.EditableValueUtils._getOjLabelAriaLabelledBy(
              this.options.labelledBy, defaultLabelId);
            // Readonly support
            if (ariaLabelledBy && (!this.multiple || !_ComboUtils.isReadonly(this))) {
              this._GetContentElement().attr('aria-labelledby', ariaLabelledBy);
            }
            // update the required translation text
            if (this._IsRequired() && this.options.translations.required) {
              this._implicitReqValidator = null;
              this._getImplicitRequiredValidator();
            }
          }
        }
      },

    /**
      * Performs post processing after _SetOption() is called. Different options when changed perform
      * different tasks. See _AfterSetOption[OptionName] method for details.
      *
      * @param {string} option
      * @param {Object|string=} previous
      * @param {Object=} flags
      * @protected
      * @memberof! oj.ojSelect
      * @instance
      * @override
      */
      // eslint-disable-next-line no-unused-vars
      _AfterSetOption: function (option, previous, flags) {
        this._superApply(arguments);
        switch (option) {
          case 'required':
            this._AfterSetOptionRequired(option);
            break;
          default:
            break;
        }
      },

    /**
     * Whether the component is required.
     *
     * @return {boolean} true if required; false
     *
     * @memberof! oj.ojSelect
     * @instance
     * @protected
     * @override
     */
      _IsRequired: function () {
        return this.options.required;
      },

    /**
     * Performs post processing after required option is set by taking the following steps.
     *
     * - if component is invalid and has messgesShown -> required: false/true -> clear component errors;
     * run full validation with UI value (we don't know if the UI error is from a required validator
     * or something else);<br/>
     * &nbsp;&nbsp;- if there are validation errors, then value not pushed to model; messagesShown is
     * updated<br/>
     * &nbsp;&nbsp;- if no errors result from the validation, push value to model; author needs to
     * listen to optionChange(value) to clear custom errors.<br/>
     *
     * - if component is invalid and has messagesHidden -> required: false -> clear component
     * errors; no deferred validation is run.<br/>
     * - if component has no error -> required: true -> run deferred validation (we don't want to flag
     * errors unnecessarily)<br/>
     * - messagesCustom is never cleared<br/>
     *
     * @param {string} option
     *
     * @memberof! oj.ojSelect
     * @instance
     * @protected
     */
      _AfterSetOptionRequired: oj.EditableValueUtils._AfterSetOptionRequired,

      // native renderMode
      _nativeSetDisabled: function (disabled) {
        if (disabled) {
          this.element.attr('disabled', '');
          this.element.parent()
          .addClass('oj-disabled')
          .removeClass('oj-enabled');
        } else {
          this.element.removeAttr('disabled');
          this.element.parent()
          .removeClass('oj-disabled')
          .addClass('oj-enabled');
        }
      },

      _nativeChangeHandler: function (event) {
        var arr = [];
        var arrValOpts = [];
        var emptyValueAllowed = (!this._IsRequired() && this._HasPlaceholderSet());

        // NOTE: option and optgroup
        $(event.target).find('option').each(function () {
          if (this.selected && (this.value ||
                              (emptyValueAllowed && this.value === ''))) {
            arr.push(this.value);
            arrValOpts.push({ value: this.value, label: this.text });
          }
        });

        if (_ComboUtils.duringFetchByKey(this.element)) {
          _ComboUtils.setValueChanged(this, true);
        }

        // - ie11 multiple select with keyboard fails
        if (!this._IsCustomElement() || this.multiple === true) {
          this._SetValue(arr, event, { doValueChangeCheck: false,
            _context: { internalSet: true } });
          _ComboUtils.setValueOptions(this, arrValOpts);
        } else {
          this._SetValue(arr[0], event, { doValueChangeCheck: false,
            _context: { internalSet: true } });
          _ComboUtils.setValueOptions(this, arrValOpts[0]);
        }
      },

      _nativeQueryCallback: function (data) {
        if (!data) {
          return;
        }

        // populate data in dropdown here
        var element = this.element;

        // if options is a dataProvider, it was wrapped with LPDV
        // don't pass in optionsKeys
        _ComboUtils.arrayPopulateResults(element, data,
        this._formatValue.bind(this),
        _ComboUtils.isDataProvider(this.options.options) ?
          null : this.options.optionsKeys);

        element.addClass(_ComboUtils.GENERATED_OPTIONS_SELECTOR);
      },

      _nativeSetSelected: function (value) {
        var selected = null;
        if (value) {
          selected = value;
        } else {
          if (this._HasPlaceholderSet()) {
            if (this.options.required) {
              selected = this._nativeFindFirstEnabledOptionValue();
            }
            this._SetPlaceholder(this.options.placeholder);
          }

          // default to the first enabled option
          if (selected === null) {
            var option = this._nativeFindFirstEnabledOption();
            selected = this._nativeFindFirstEnabledOptionValue(option);
            _ComboUtils.setValueOptions(this,
                                        { value: selected, label: option.text() });
          }
        }
        this._setInitialSelectedValue(selected);
      },

      // fetch first block from data provider
      // when data available validate the selected value
      _nativeFetchFromDataProvider: function () {
        var self = this;
        _ComboUtils.fetchFirstBlockFromDataProvider(this.element,
                                                    self.options).then(
        function (data) {
          self._nativeQueryCallback(data);
          if (data.length) {
          // make sure value still valid
            var selected = self.options.value;
            if (selected) {
              _ComboUtils.validateFromDataProvider(self.element,
                                                   self.options,
                                                   selected).then(
              function (results) {
                //  - need to be able to specify the initial value of select components bound to dprv
                if (_ComboUtils.isValueChanged(self) && self.multiple === false) {
                  _ComboUtils.setValueChanged(self, undefined);
                } else {
                  var vals;
                  var valOpts;
                  if (_ComboUtils.isValueChanged(self) && self.multiple) {
                    valOpts = self.options.valueOptions;
                    vals = self.options.value;
                    _ComboUtils.setValueChanged(self, undefined);
                  }
                  if (results) {
                    var valueOptions = results.valueOptions;
                    if (Array.isArray(valueOptions) && valueOptions.length) {
                      _ComboUtils.setValueOptions(self,
                        valOpts ? valueOptions.concat(valOpts) : valueOptions);
                    }
                    // only set value if it is valid
                    var values = results.value;
                    if (Array.isArray(values) && values.length) {
                      vals = vals ? values.concat(vals) : values;

                      var cval = self.multiple ? vals : values[0];
                      self._nativeSetSelected(cval);

                      //  - select component binding broken in mobile
                      // need update the selected value property
                      // Note: setting multiple selected values causing
                      // the selection to be cleared
                      if (!self.multiple || cval.length === 1) {
                        self.element[0].value = cval;
                      }
                    }
                  }
                }
              });
            } else {
              // no selected value, default to placeholder or 1st item
              self._nativeSetSelected();
            }
          }
        });
      },

      _nativeSetup: function () {
        var element = this.element;

        // add a <div> around <select> for validation error
        element.wrap('<div>').parent() // @HTMLUpdateOK
        .addClass('oj-select-native oj-component oj-select oj-form-control');
        element.addClass('oj-select-select oj-component-initnode');

        // multiple attr
        if (this.multiple) {
          if (!element[0].multiple) {
            element[0].multiple = true;
          }

          element.parent().prepend("<a class='oj-select-arrow oj-component-icon oj-clickable-icon-nocontext oj-select-multiple-open-icon' role='presentation'></a>");  // @HTMLUpdateOK
        } else {
          element.parent().prepend("<a class='oj-select-arrow oj-component-icon oj-clickable-icon-nocontext oj-select-open-icon' role='presentation'></a>");  // @HTMLUpdateOK
        }
      // disable attr
        this._nativeSetDisabled(this.options.disabled);

        if (this.options.list) {
          _ComboUtils.listPopulateResults(element,
                                        $('#' + this.options.list).children(),
                                        this._formatValue.bind(this));
          element.addClass(_ComboUtils.GENERATED_OPTIONS_SELECTOR);
        } else if (this.options.options) {
          if (_ComboUtils.getDataProvider(this.options)) {
            this._nativeFetchFromDataProvider();
          } else {
            this._nativeQueryCallback(this.options.options);
          }
        } else if (this._IsCustomElement()) {
// TODO: TEST if the dropdown only contains a placeholder don't call ojOptionPopulateResults
          var children = element.children();
          if (children.length !== 1 || !children.hasClass('oj-listbox-placeholder')) {
          // handle custom element with oj-option, oj-optgroup case
            _ComboUtils.ojOptionPopulateResults(element, children,
                                                this._formatValue.bind(this));
            element.addClass(_ComboUtils.GENERATED_OPTIONS_SELECTOR);
          }
        }

        this._focusable({
          element: element,
          applyHighlight: true
        });

        //  - the selected option of the ojselect not reflected in the value variable
        if (!this.options.value && !this._HasPlaceholderSet() &&
            !_ComboUtils.getDataProvider(this.options)) {
          this._setInitialSelectedValue(this._nativeFindFirstEnabledOptionValue());
        }

      // add a change listener
        element.change(this._nativeChangeHandler.bind(this));

        _ComboUtils.addDataProviderEventListeners(this);
      },

      // native renderMode
      _jetSetup: function () {
        var opts = {};

        opts.element = this.element;
        opts.ojContext = this;
        opts = $.extend(this.options, opts);

        this.select = this.multiple ? new _OjMultiSelect() : new _OjSingleSelect();
        this.select._init(opts);

        this.select.container.addClass('oj-select-jet oj-form-control');

        this._focusable({
          element: this.select.selection,
          applyHighlight: true
        });

//      var arrow = this.select.selection.children(".oj-select-arrow");
//      this._AddHoverable(arrow);
//      this._AddActiveable(arrow);
      },

    //  - the selected option of the ojselect not reflected in the value variable
      _setInitialSelectedValue: function (selectedVal) {
        var selected;

        if (!this._IsCustomElement()) {
          selected = Array.isArray(selectedVal) ? selectedVal : [selectedVal];
        } else {
          selected = selectedVal;
        }

        this._SetValue(selected,
                     null, { doValueChangeCheck: false,
                       _context: { internalSet: true, writeback: true },
                       changed: true,
                     });
      },

      // ojselect
      _setup: function () {
        // fixup valueOption(s) if placeholder is selected
        if (_ComboUtils.isValueForPlaceholder(this.multiple, this.options.value)) {
          if (this.multiple) {
            this.options.valueOptions =
              _ComboUtils.getValueOptionsForPlaceholder(this, this.options.valueOptions);
          } else {
            this.options.valueOption =
              _ComboUtils.getValueOptionsForPlaceholder(this, this.options.valueOption);
          }
        }
        //  - need to be able to specify the initial value of select components bound to dprv
        this._resolveValueOptionsLater = _ComboUtils.mergeValueAndValueOptions(this);
        if (this._isNative()) {
          this._nativeSetup();
        } else {
          this._jetSetup();
        }
        this._refreshRequired(this.options.required);
      },

    /**
     * Refreshes the visual state of the select. JET elements require a <code
     * class="prettyprint">refresh()</code> after the DOM is programmatically
     * changed.
     *
     * <p>This method does not accept any arguments.
     *
     * @expose
     * @memberof oj.ojSelect
     * @instance
     * @return {void}
     * @ojshortdesc Refreshes the visual state of the select.
     * @public
     */
      refresh: function () {
        this._super();

      // cleanup the old HTML and setup the new HTML markups
        this._cleanup();

        this._setup();
      // TODO: apply value in options for the selected value

        if (this._isNative() && this.options.value) {
          this.element.val(this.options.value);
        }

      // re apply root attributes settings
        this._SetRootAttributes();
      },
    /**
     * @memberof! oj.ojSelect
     * @instance
     * @private
     */
      _refreshRequired: oj.EditableValueUtils._refreshRequired,

    /**
     * Called to find out if aria-required is unsupported.
     * @memberof! oj.ojSelect
     * @instance
     * @protected
     */
      _AriaRequiredUnsupported: function () {
        return false;
      },
    /**
     * @override
     * @private
     * @memberof! oj.ojSelect
     */
      _destroy: function () {
      // native renderMode
        this._cleanup();
        this._super();
      },

      // 19670760, dropdown popup should be closed on subtreeDetached notification.
      _NotifyDetached: function () {
        this._superApply(arguments);
      // native renderMode
        if (this.select) {
          this.select.close();
        }
      },

      // 19670760, dropdown popup should be closed on subtreeHidden notification.
      _NotifyHidden: function () {
        this._superApply(arguments);
      // native renderMode
        if (this.select) {
          this.select.close();
        }
      },

    /**
       * Override to do the delay connect/disconnect
       * @memberof oj.ojSelect
       * @override
       * @protected
       */
      _VerifyConnectedForSetup: function () {
        //  - temp moving oj-select from one elem to another should not cause fetch
        return true;
      },

    /**
     * Set the placeholder.
     * @override
     * @protected
     * @memberof! oj.ojSelect
     */
      _SetPlaceholder: function (value) {
      /*
       * Commented out the content to fix the side effect from
       * the change made in EditableValue._initComponentMessaging (Revision: 9016).
       * EditableValue called SetPlaceholder with an empty string which made
       * every ojselect to have an empty placeholder in the dropdown.
       * Note: don't remove the method because there is more calls from EditableValue
       * to ojselect before this.select is initialized.
       * ex: _GetContentElement

      if (this.select)
      {
        this.select.opts.placeholder = value;
        this.select._setPlaceholder();
      }
      */

      // native renderMode
      // add a placeholder option if needed
        if (this._isNative() && value != null) {
          var placeholder = $(this.element.children('option:first-child'));

        // if a placeholder option exists, use it
          if (placeholder && placeholder.attr('value') === '') {
            placeholder.text(this.options.placeholder);
            placeholder.attr('value', '');
          } else {
            placeholder = _ComboUtils.createOptionTag(0, '', value, this._formatValue.bind(this));
            placeholder.addClass('oj-listbox-placeholder');

          //  - placeholder text is a selectable item that results in an error for ojcomponent
            this._hidePlaceholder(placeholder, this._IsRequired());
            placeholder.prependTo(this.element); // @HTMLUpdateOK
          }
        }
      },

    /**
     * whether the placeholder option is set
     *
     * @memberof! oj.ojSelect
     * @instance
     * @protected
     */
      _HasPlaceholderSet: function () {
      //  - an empty placeholder shows up if data changed after first binding
        return _ComboUtils.isPlaceholderSpecified(this.options);
      },

    /**
     * Clear the placeholder option
     *
     * @memberof! oj.ojSelect
     * @instance
     * @protected
     */
      _ClearPlaceholder: function () {
      //  - an empty placeholder shows up if data changed after first binding
        this._SetPlaceholderOption(null);
        this._SetPlaceholder(null);
      },

    /**
     * @memberof! oj.ojSelect
     * @instance
     * @protected
     * @override
     */
      _InitOptions: function (originalDefaults, constructorOptions) {
        var props = [{ attribute: 'disabled', validateOption: true },
                     { attribute: 'placeholder' },
                     { attribute: 'required', coerceDomValue: true, validateOption: true },
                     { attribute: 'title' }
                     // {attribute: "value"}
        ];

        this._super(originalDefaults, constructorOptions);
        oj.EditableValueUtils.initializeOptionsFromDom(props, constructorOptions, this);

        this.multiple = !this._IsCustomElement() ? this.options.multiple :
                      this.OuterWrapper.nodeName === 'OJ-SELECT-MANY';

        // TODO: PAVI - Let's discuss
        if (this.options.value === undefined) {
          if (!this._IsCustomElement()) {
            this.options.value = (this.element.attr('value') !== undefined) ? _ComboUtils.splitVal(this.element.val(), ',') : null;
          }
        } else {
          // clone the value, otherwise _setDisplayValue will not be invoked on binding value to ko observableArray.
          // TODO: Need to revisit this once 18724975 is fixed.
          var value = this.options.value;
          if (Array.isArray(value)) {
            if (!this._IsCustomElement()) {
              value = value.slice(0);
            }
          }

          this.options.value = value;
        }
      },

    /**
     * Updates display value.
     * @override
     * @protected
     * @memberof! oj.ojSelect
     */
      _SetDisplayValue: function (displayValue) {
        if (this.select) {
        //  - need to be able to specify the initial value of select components bound to dprv
          if (!_ComboUtils.applyValueOptions(this.select, this.options)) {
            this.select._initSelection();
          }
          this._resolveValueOptionsLater = false;
        } else {
          // if displayValue is null, let it default to 1st option or placeholder
          // see demo pages: disable and placeholder
          var opts;
          if (displayValue == null) {
            if (this._HasPlaceholderSet()) {
              this.element[0].selectedIndex = 0;
              this.element.addClass('oj-select-default');
            }
            // update valueOptions
            if (this._resolveValueOptionsLater) {
              //  - reseting value when value-option and placeholder are set
              // throws exception
              _ComboUtils.setValueOptions(this,
                _ComboUtils.getFixupValueOptionsForPlaceholder(this.multiple));
            }
          } else {
            //  - oj-select-one throws exception for mobile when selectedindex = -1 on refresh
            var valSet = false;
            var selectedVal = displayValue;
            var label;
            if (!this.multiple) {
              if (Array.isArray(displayValue)) {
                selectedVal = displayValue[0];
              }
              label = this._nativeFindLabel(selectedVal);
              if (label === null) {
                Logger.warn('JET select: selected value not found');
                // default to 1st option if exists
                if (this.element[0].options && this.element[0].options.length > 0) {
                  this.element[0].selectedIndex = 0;
                  selectedVal = this.element[0].value;
                  label = this.element[0].text;
                  valSet = true;
                } else {
                  label = String(displayValue);
                }
              }
            }
            if (!valSet) {
              this.element.val(displayValue);
            }
            // eslint-disable-next-line no-param-reassign
            displayValue = selectedVal;

            // update valueOptions
            if (this._resolveValueOptionsLater) {
              if (this.multiple) {
                // collect the selected values and labels
                var s = 0;
                opts = [];
                this.element.find('option').each(function () {
                  if (this.selected) {
                    opts.push({ value: displayValue[s], label: this.text });
                    s += 1;
                  }
                });
              } else {
                opts = { value: displayValue, label: label };
              }
              _ComboUtils.setValueOptions(this, opts);
            }
          }
          this._resolveValueOptionsLater = false;
        }
      },

    /**
     * <ol>
     * <li>All messages are cleared, including custom messages added by the app. </li>
     * <li>The implicit required validator is run first if the component
     * is marked required. </li>
     * <li>At the end of validation if there are errors, the messages are shown.
     * If there were no errors, then the
     * <code class="prettyprint">value</code> option is updated.</li>
     * </ol>
     *
     * @example <caption>Validate component using its current value.</caption>
     * myComp.validate();
     *
     * @example <caption>Validate component and use the Promise's resolved state.</caption>
     * myComp.validate().then(
     *  function(result) {
     *    if(result === "valid")
     *    {
     *      submitForm();
     *    }
     *  });
     * @return {Promise} Promise resolves to "valid" if the component passed validation.
     * The Promise resolves to "invalid" if there were validation errors.
     * @ojshortdesc Validates the component's display value using all validators registered on the component. If there are no validation errors, then the value is updated. See the Help documentation for more information.
     * @method
     * @access public
     * @expose
     * @instance
     * @memberof oj.ojSelect
     * @ojstatus preview
     */
      validate: function () {
        var returnValue;

        if (this.multiple === true) {
          var displayValue = this.select.search.val();
          var existingValue = this.select.getVal() ? this.select.getVal() : [];
          var newValue = null;

          if (displayValue === undefined || displayValue === null || displayValue === '') {
            newValue = existingValue;
          } else {
            existingValue.push(displayValue);
            newValue = existingValue;
          }
          // _SetValue returns boolean when there is no async validator or
          // converter, else it returns a Promise. Since ojselect has no validator or
          // converter, this will always return true or false. validate needs to
          // return a Promise if customElement.
          returnValue = this._SetValue(newValue, null, this._VALIDATE_METHOD_OPTIONS);
        }

        //  - select needs implementation fixes...
        if (this.select) {
          returnValue = this._SetValue(
          this.select.getVal(), null, this._VALIDATE_METHOD_OPTIONS);
        }
        // for widget components, validate() returns boolean. Else it returns a Promise
        // that resolves to 'valid' or 'invalid'
        if (this._IsCustomElement()) {
          returnValue = Promise.resolve(returnValue ? 'valid' : 'invalid');
        }
        return returnValue;
      },

      /**
       * Whether a value can be set on the component. For example, if the component is
       * disabled or readOnly then setting value on component is a no-op.
       *
       * @see #_SetValue
       * @return {boolean}
       * @memberof oj.ojSelect
       * @override
       * @instance
       * @protected
       */
      _CanSetValue: function () {
        // FIX  - VALUE UNCHANGED IN DISABLED SELECT WHEN CHANGING BOUND VALUEOPTION
        // _SetValue always performs validation, which calls _CanSetValue, which returns false if
        // the component is disabled, thereby disallowing the set.  Override _CanSetValue here
        // so that we can force it to return true when syncing the value with the valueOption[s]
        // from _ComboUtils.syncValueWithValueOption[s].
        if (this.forceCanSetValue) {
          return true;
        }
        return this._super();
      },

      // return 1st enabled option jquery object
      _nativeFindFirstEnabledOption: function () {
        // treeDataProvider
        var enaOptions;
        if (_ComboUtils.isTreeDataProvider(this.options.options)) {
          enaOptions = this.element.find('option:not(:disabled)');
        } else {
          enaOptions = this.element.children('option:not(:disabled)');
        }

        return (enaOptions.length > 0) ? $(enaOptions[0]) : null;
      },

      // native renderMode
      _nativeFindFirstEnabledOptionValue: function (enaOption) {
        if (!enaOption) {
          // eslint-disable-next-line no-param-reassign
          enaOption = this._nativeFindFirstEnabledOption();
        }
        if (enaOption) {
          if (this._IsCustomElement()) {
            // send the value as it is for custom element
            //  - oj-select-one writes initial value as array in native rendering mode
            return enaOption.attr('value');
          }
          // send the value in an array for widget
          return [enaOption.attr('value')];
        }

        return null;
      },

      _nativeSetOptions: function (options) {
        var oSelected = this.options.value;
        var element = this.element;

        // if options list is generated during setup, remove it
        if (element.hasClass(_ComboUtils.GENERATED_OPTIONS_SELECTOR)) {
          _ComboUtils.cleanupResults(element);
        } else {
          var children = element.children();
          if (children.length > 0) {
            children.remove();
          }
        }

        // if data provider, fetch data
        if (_ComboUtils.isDataProvider(options)) {
          this._nativeFetchFromDataProvider();
        } else {
          _ComboUtils.arrayPopulateResults(element,
                                         options,
                                         this._formatValue.bind(this),
                                         this.options.optionsKeys);
          var defVal = null;
          if (this._HasPlaceholderSet()) {
            if (this.options.required) {
              defVal = this._nativeFindFirstEnabledOptionValue();
            }

            this._SetPlaceholder();
          }

          // default to the first enabled option
          if (defVal === null) {
            defVal = this._nativeFindFirstEnabledOptionValue();
          }

          this.options.value = defVal;
          this.option('value', oSelected);
        }
        element.addClass(_ComboUtils.GENERATED_OPTIONS_SELECTOR);
      },

      _removePlaceholderInMultiValues: function (valArr) {
        var val;
        var narr = [];

        for (var i = 0; i < valArr.length; i++) {
          val = valArr[i];
          if (val != null) {
            if (val.length > 0) {
              // remove placeholder if it was already added to arr
              if (narr.length === 1 && narr[0] === '') {
                narr.pop();
              }
              narr.push(val);
            } else if (narr.length === 0) {
              // val is a placeholder
              narr.push(val);
            }
          }
        }
        return narr;
      },

      //  - oj-select-one throws exception for mobile when selectedindex = -1 on refresh
      // return label if found otherwise null
      _nativeFindLabel: function (value) {
        var options = this.element[0].options;
        if (options && options.length > 0) {
          for (var i = 0; i < options.length; i++) {
            if (options[i].value === value) {
              return $(options[i]).text();
            }
          }
        }
        return null;
      },

      /**
       * Handles options specific to select.
       * @override
       * @protected
       * @memberof! oj.ojSelect
       */
      _setOption: function (key, _value, flags) {
        var value = _value;
        var selected;
        var self = this;
        var selfSuper = this._super;
        var multi = this.multiple;

        if (key === 'value') {
          // clone the value, otherwise _setDisplayValue will not be invoked on binding value to ko observableArray.
          // TODO: Need to revisit this once 18724975 is fixed.

          if (this._HasPlaceholderSet() &&
            ((value && value.length === 0) ||
             (this._IsCustomElement() && _ComboUtils.isValueForPlaceholder(multi, value)))) {
            //  - placeholder is not displayed after removing selections from select many
            _ComboUtils.setValueOptions(this,
                                        _ComboUtils.getFixupValueOptionsForPlaceholder(multi));
            this._super(key, value, flags);
            return;
          }

          // native renderMode
          var element;
          if (this.select) {
            element = this.select.datalist;
            if (!element) {
              element = this.select.opts.element;
            }
          }

          var customSelectOne = this._IsCustomElement() && !multi;

          // turn value to an array
          if (!Array.isArray(value) && !customSelectOne) {
            value = [value];
          }

          if (this._isNative()) {
            if (!customSelectOne) {
              value = this._removePlaceholderInMultiValues(value);
            }

            // set oj-select-default on the select tag if the selected value is a placeholder and a singleton
            if ((!this._IsCustomElement() && value.length === 1 && value[0] === '') ||
                (this._IsCustomElement() && this._HasPlaceholderSet() &&
                 _ComboUtils.isValueForPlaceholder(multi, value))) {
              this.element.addClass('oj-select-default');
            } else {
              this.element.removeClass('oj-select-default');
            }
          }

          if (_ComboUtils.getDataProvider(this.options) && value) {
            if (this.select) {
              this.select.opts.options = this.options.options;
            }

            _ComboUtils.validateFromDataProvider(
              this._isNative() ? this.element : this.select.container, this.options, value)
              .then(function (results) {
                //  - need to be able to specify the initial value of select components bound to dprv
                if (results) {
                  var valueOptions = results.valueOptions;
                  if (Array.isArray(valueOptions) && valueOptions.length) {
                    _ComboUtils.setValueOptions(self, valueOptions);
                  }
                  // only set value if it is valid
                  var values = results.value;
                  if (Array.isArray(values) && values.length) {
                    var cval = multi ? values : values[0];
                    selfSuper.call(self, key, cval);

                    //  - select component binding broken in mobile
                    if (self._isNative()) {
                      // need update the selected value property
                      self.element[0].value = cval;
                    }
                  }
                }
              });
            //  - ojselect allows to set invalid value when using dataprovider
            return;
          } else if (!customSelectOne) {
            //  - ojselect should ignore the invalid value set programmatically
            var newArr = [];
            for (var i = 0; i < value.length; i++) {
              if (this.select) {
                // Note: both multi select and remote data cases, the validate function is not available
                if (!this.select.opts.validate ||
                  this.select.opts.validate(element, value[i]) ||
                    this._isOptionDataPending()) {
                  newArr.push(value[i]);
                }
              } else if (this.element.find("option[value='" + value[i] + "']").length > 0) {
                newArr.push(value[i]);
              }
            }

            // only set values that are valid
            //  - can't remove last selected value in multi-select ojselect
            // multi select allows empty array
            if (newArr.length > 0 || multi) {
              if (this._isNative()) {
                this._nativeSetSelected(newArr);
              } else {
                this._super(key, newArr, flags);
                //  - need to be able to specify the initial value of select components bound to dprv
                _ComboUtils.updateValueOptions(this.select);
              }
            }
            return;
          }
          if (!(this.select && this.select.opts.validate) ||
              this.select.opts.validate(element, value) ||
              this._isOptionDataPending()) {
            this._super(key, value, flags);

              //  - need to be able to specify the initial value of select components bound to dprv
            _ComboUtils.updateValueOptions(this.select);
          }
          return;
        } else if (key === 'placeholder') {
          if (this.select) {
            this.select.opts.placeholder = value;
            if (_ComboUtils.isValueForPlaceholder(multi, this.options.value)) {
              this.select._setPlaceholder();
            }
          } else {
            // native renderMode
            selected = this.options.value;
            if (!selected || selected.length === 0 || !selected[0]) {
              this.element[0].selectedIndex = 0;
            }
          }
        } else if (key === 'minimumResultsForSearch') {
          // native renderMode
          if (this.select) {
            this.select.opts.minimumResultsForSearch = value;
          }
        } else if (key === 'renderMode') {
          this._cleanup();
          this.options.renderMode = value;
          this.refresh();
        }

        // if we have a new data provider, remove the old dataProvider event listeners
        if (key === 'options') {
          _ComboUtils.removeDataProviderEventListeners(this);
          _ComboUtils.clearDataProviderWrapper(this);
        } else if (key === 'valueOption' && multi !== true) {
          // fixup valueOption
          value = _ComboUtils.getValueOptionsForPlaceholder(this, value);
          if (this.select) {
            this.select.opts.valueOption = value;
          }
        } else if (key === 'valueOptions' && multi === true) {
          // fixup valueOptions
          value = _ComboUtils.getValueOptionsForPlaceholder(this, value);
          if (this.select) {
            this.select.opts.valueOptions = value;
          }
        }
        this._super(key, value, flags);

        if (key === 'disabled') {
          if (this.select) {
            if (value) {
              this.select._disable();
            } else {
              this.select._enable();
            }
          } else {
            this._nativeSetDisabled(value);
          }
          // Readonly support
        } else if (key === 'readOnly') {
          if (this.select) {
            this.select.applyReadonlyState();
          }
          if (this.options.renderMode === 'native') {
            this.refresh();
          }
        } else if (key === 'valueOption' && multi !== true) {
          //  - need to be able to specify the initial value of select components bound to dprv
          _ComboUtils.syncValueWithValueOption(this, value, this.options.value, this._isNative());
        } else if (key === 'valueOptions' && multi === true) {
          _ComboUtils.syncValueWithValueOptions(this, value, this.options.value, this._isNative());
        } else if (key === 'options') {
          // if options is a new data provider
          // wrap it with LVDP if it doesn't implement FetchByKeys
          // add event listeners
          if (_ComboUtils.isDataProvider(value)) {
          // update internal dataProviderWrapper
            _ComboUtils.wrapDataProviderIfNeeded(this, this.select ? this.select.opts : null);
            _ComboUtils.addDataProviderEventListeners(this);
          }
          if (this.select) {
            // make sure the value still valid
            selected = this.select.getVal();
            if (_ComboUtils.getDataProvider(this.options) && selected) {
              //  - need to be able to specify the initial value of select components bound to dprv
              if (_ComboUtils.applyValueOptions(this.select, this.options)) {
                this.select.opts.options = value;
                this.select.opts = self.select._prepareOpts(this.select.opts);
              } else {
                _ComboUtils.validateFromDataProvider(this.select.container, this.options,
                                                     this.options.value).then(
              function (results) {
                //  - need to be able to specify the initial value of select components bound to dprv
                var values = results ? results.value : null;
                if (values) {
                  var valueOptions = results.valueOptions;
                  if (Array.isArray(valueOptions) && valueOptions.length) {
                    _ComboUtils.setValueOptions(self, valueOptions);
                  }
                  // only set value if it is valid
                  if (Array.isArray(values) && values.length) {
                    selfSuper.call(self, 'value', multi ? values : values[0]);
                  }
                } else if (self.options.placeholder) {
                  // use placeholder if specified
                  if (!multi) {
                    self.select._updateSelectedOption(self.options.placeholder);
                  }
                } else {
                  // the selected value is no longer valid, fetch 1st item from data provider
                  _ComboUtils.fetchFirstBlockFromDataProvider(self.select.container,
                                                              self.options, 1).then(
                    function (data) {
                      // At this point if we still don't have a selected value then default to the first item
                      if (data && data.length > 0 && selected === self.select.getVal()) {
                        self.select._updateSelectedOption(data[0]);
                      } else {
                        selfSuper.call(self, 'value', null);
                        // update select box
                        if (!multi) {
                          self.select.text.text('');
                        }
                      }
                    });
                }
                self.select.opts.options = value;
                self.select.opts = self.select._prepareOpts(self.select.opts);
              });
              }
            } else {
              //  - an empty placeholder shows up if data changed after first binding
              //  - ojselect - validator error message is not shown
              //  - ojselect tooltip no longer appears once options and value observables change
              this.select.opts.options = value;
              this.select.opts = this.select._prepareOpts(this.select.opts);

              // make sure the value still valid
              this.select.setValOpts(null);
              this._super('value', selected);
            }
          } else {
            this._nativeSetOptions(value);
          }
        } else if (key === 'required' && this._isNative()) {
          var placeholder = $(this.element.find('.oj-listbox-placeholder'));
          if (placeholder && placeholder.attr('value') === '') {
          // hide placeholder when required is true
            this._hidePlaceholder(placeholder, value);
          }
        } else if (key === 'multiple' && !this._IsCustomElement()) {
          this.multiple = value;
        } else if (key === 'labelledBy') {
          if (this.options.labelledBy) {
            var defaultLabelId = this.uuid + '_Label';
            var ariaLabelledBy =
            oj.EditableValueUtils._getOjLabelAriaLabelledBy(
              this.options.labelledBy, defaultLabelId);
            // Readonly support
            if (ariaLabelledBy && (!this.multiple || !_ComboUtils.isReadonly(this))) {
              this._GetContentElement().attr('aria-labelledby', ariaLabelledBy);
            }
            // update the required translation text
            if (this._IsRequired() && this.options.translations.required) {
              this._implicitReqValidator = null;
              this._getImplicitRequiredValidator();
            }
          }
        }
      },

      _isOptionDataPending: function () {
        var options = this.options.options;
        var datalist = this.select.datalist;

        if (datalist) {
        // check if the data provided via html
          if (datalist.children().length === 0) {
            return true;
          }
        } else if (_ComboUtils.isDataProvider(options)) {
          //  - replacing options in select after value is set -> writes over the value
          // skip validation if a value is specified when the data is empty, don't fetch data until user opens dropdown.
          // We validate value and set displayValue when the drop down data is available
          return true;
        } else if (!options || options.length === 0) {
          // check the options array
          return true;
        }
        return false;
      },

      _getDropdown: function () {
        // native renderMode
        if (this.select && this.select._opened()) {
          //  - certain subids does not work inside a popup or dialog
          var dropdown = this.select.dropdown;
          if (dropdown &&
              dropdown.attr('data-oj-containerid') === this.select.containerId) {
            return dropdown;
          }
        }
        return null;
      },

      _hidePlaceholder: function (placeholder, hide) {
        if (hide) {
          placeholder.attr('disabled', '');
          placeholder.attr('hidden', '');
        } else {
          placeholder.removeAttr('disabled');
          placeholder.removeAttr('hidden');
        }
      },

      // native renderMode
      _isNative: function () {
        // Readonly support
        return this.options.renderMode === 'native' && !_ComboUtils.isReadonly(this);
      },

      // native renderMode
      _cleanup: function () {
        // Readonly support
        if (this.element.parent().hasClass('oj-select-native')) {
          // remove the change listner
          this.element.off('change');

          // if options list is generated during setup, remove it
          if (this.element.hasClass(_ComboUtils.GENERATED_OPTIONS_SELECTOR)) {
            _ComboUtils.cleanupResults(this.element);
          }

          // remove wrapper
          if (this.element.parent().hasClass('oj-select-native')) {
            this.element.parent().children('.oj-select-arrow').remove();
            this.element.unwrap();
          }

          this.element.removeClass('oj-select-select oj-component-initnode');
          this.element.attr({
            'aria-labelledby': ''
          });
        // Readonly support
        } else if (this.select) {
          this.select._destroy();
          this.select = undefined;
        }
      },


// ////////////////     SUB-IDS     //////////////////

/**
 * <p>Sub-ID for the selected text in the select box. This is not available in the native renderMode.</p>
 *
 * @ojsubid oj-select-chosen
 * @deprecated 1.2.0 This sub-ID is not needed since it is not an interactive element.
 * @memberof oj.ojSelect
 * @ignore
 * @instance
 */

/**
 * <p>Sub-ID for the dropdown box. See the <a href="#minimumResultsForSearch">minimum-results-for-search</a> attribute for details. This is not available in the native renderMode.</p>
 *
 * @ojsubid oj-select-drop
 * @deprecated 1.2.0 This sub-ID is not needed since it is not an interactive element.
 * @memberof oj.ojSelect
 * @ignore
 */

/**
 * <p>Sub-ID for the search box. Note:</p>
 * <ul>
 * <li>the search box is not always visible</li>
 * <li>the Sub-Id is not available in the native renderMode</li>
 * </ul>
 * <p>See the <a href="#minimumResultsForSearch">minimum-results-for-search</a> attribute for details.
 * <p>See the <a href="#getNodeBySubId">getNodeBySubId</a> and
 * <a href="#getSubIdByNode">getSubIdByNode</a> methods for details.
 *
 * @ojsubid oj-select-search
 * @ignore
 * @deprecated 1.2.0 This sub-ID is not needed since it is not an interactive element.
 * @memberof oj.ojSelect
 */

/**
 * <p>Sub-ID for the search input element. Note:</p>
 * <ul>
 * <li>the search input is not always visible</li>
 * <li>the Sub-Id is not available in the native renderMode</li>
 * </ul>
 *
 * <p>See the <a href="#minimumResultsForSearch">minimum-results-for-search</a> attribute for details.</p>
 *
 * @ojsubid oj-listbox-input
 * @deprecated 1.2.0 please see oj-select-input
 * @memberof oj.ojSelect
 * @ignore
 */

/**
 * <p>Sub-ID for the filtered result list. This Sub-Id is not available in the native renderMode.</p>
 *
 * @ojsubid oj-select-results
 * @deprecated 1.2.0 This sub-ID is not needed since it is not an interactive element.
 * @memberof oj.ojSelect
 * @ignore
 */

/**
 * <p>Sub-ID for the filtered result item. Note:</p>
 * <ul>
 * <li>To lookup a filtered result item, the dropdown must be open and the locator object should have:
 *     subId: 'oj-listbox-result-label' and index: number.
 * </li>
 * <li>the Sub-Id is not available in the native renderMode</li>
 * </ul>
 *
 * @ojsubid oj-listbox-result-label
 * @deprecated 1.2.0 This sub-ID is not needed since it is not an interactive element.
 * @memberof oj.ojSelect
 * @ignore
 */

/**
 * <p>Sub-ID for the search input field. It's only visible when the results size is greater than the minimum-results-for-search threshold or when user starts typing into the select box. This Sub-Id is not available in the native renderMode.</p>
 * @ojsubid oj-select-input
 * @memberof oj.ojSelect
 *
 * @example <caption>Get the input field element</caption>
 * var node = myElement.getNodeBySubId({'subId': 'oj-select-input'});
 */

/**
 * <p>Sub-ID for the drop down arrow. This Sub-Id is not available in the native renderMode.</p>
 *
 * @ojsubid oj-select-arrow
 * @memberof oj.ojSelectOne
 *
 * @example <caption>Get the drop down arrow of the select</caption>
 * var node = myElement.getNodeBySubId({'subId': 'oj-select-arrow'});
 */

/**
 * <p>Sub-ID for the list item. This Sub-Id is not available in the native renderMode.</p>
 *
 * @ojsubid oj-listitem
 * @memberof oj.ojSelect
 *
 * @example <caption>Get the listitem corresponding to value "myVal"</caption>
 * var node = myElement.getNodeBySubId({'subId': 'oj-listitem', 'value': 'myVal'});
 */

/**
 * <p>Sub-ID for the remove icon of selected item. This Sub-Id is not available in the native renderMode.</p>
 *
 * @ojsubid oj-select-remove
 * @memberof oj.ojSelectMany
 *
 * @example <caption>Get the element corresponding to the remove icon for the selected item with
 * value "myVal"</caption>
 * var node = myElement.getNodeBySubId({'subId': 'oj-select-remove', 'value': 'myVal'});
 */

    // @inheritdoc
      getNodeBySubId: function (locator) {
        var node = null;
        var subId;
        if (locator == null) {
          var container = this.widget();
          return container ? container[0] : null;
        } else if (this._isNative()) {
          // doesn't support any sub ID in native mode
          return null;
        }

        node = this._super(locator);


        if (!node) {
          var dropdown = this._getDropdown();

          subId = locator.subId;
          switch (subId) {
            case 'oj-select-drop':
              if (dropdown) {
                node = dropdown[0];
              }
              break;
            case 'oj-select-results':
              if (dropdown) {
                node = dropdown.find('.oj-listbox-results')[0];
              }
              break;
            case 'oj-select-search':
              if (dropdown) {
                node = dropdown.find('.oj-listbox-search')[0];
              }
              break;
            case 'oj-select-input':
            case 'oj-listbox-input':
              if (dropdown) {
                node = dropdown.find('.oj-listbox-input')[0];
              }
              break;
            case 'oj-select-choice':
            case 'oj-select-chosen':
            case 'oj-select-arrow':
              node = this.widget().find('.' + subId)[0];
              break;
            case 'oj-listitem':
              if (dropdown) {
                var list = dropdown.find('.oj-listbox-result');
                node = this.select._findItem(list, locator.value);
              }
              break;
            case 'oj-select-remove':
              var selectedItems = this.widget().find('.oj-select-selected-choice');
              var item = this.select._findItem(selectedItems, locator.value);
              node = item ? $(item).find('.oj-select-clear-entry-icon')[0] : null;
              break;

          //  - ojselect - not able to attach id for generated jet component
            case 'oj-listbox-result-label':
              if (dropdown) {
              // list of 'li'
                var ddlist = $('#' + this.select.results.attr('id')).children();
                var index = locator.index;

                if (ddlist.length && index < ddlist.length) {
                  node = ddlist.eq(index).find('.' + subId)[0];
                }
              }
              break;

            default:
              break;
          }
        }
      // Non-null locators have to be handled by the component subclasses
        return node || null;
      },

    /**
     * Returns the subId object for the given child DOM node.  For more details, see
     * <a href="#getNodeBySubId">getNodeBySubId</a>.
     *
     * @expose
     * @ignore
     * @override
     * @memberof oj.ojSelect
     * @instance
     *
     * @param {!Element} node - child DOM node
     * @return {Object|null} The subId for the DOM node, or <code class="prettyprint">null</code> when none is found.
     *
     * @example <caption>Get the subId for a certain DOM node:</caption>
     * var subId = myElement.getSubIdByNode(node);
     */
      getSubIdByNode: function (node) {
        if (this._isNative()) {
          return this._super(node);
        }

        var subId = null;
        if (node != null) {
          var nodeCached = $(node);

          if (nodeCached.hasClass('oj-listbox-input')) {
            subId = { subId: 'oj-select-input' };
          } else if (nodeCached.hasClass('oj-select-arrow')) {
            subId = { subId: 'oj-select-arrow' };
          } else if (nodeCached.hasClass('oj-listbox-result')) {
            subId = { subId: 'oj-listitem', value: nodeCached.data('ojselect').value };
          } else if (nodeCached.hasClass('oj-select-clear-entry-icon')) {
            subId = { subId: 'oj-select-remove', value: nodeCached.closest('.oj-select-selected-choice').data('ojselect').value };
          } else {
            subId = this._super(node);
          }
        }

        return subId;
      },

    /**
     * Returns the default styleclass for the component. Currently this is
     * used to pass to the ojLabel component, which will append -label and
     * add the style class onto the label. This way we can style the label
     * specific to the input component. For example, for inline labels, the
     * radioset/checkboxset components need to have margin-top:0, whereas all the
     * other inputs need it to be .5em. So we'll have a special margin-top style
     * for .oj-label-inline.oj-radioset-label
     * All input components must override
     *
     * @return {string}
     * @expose
     * @memberof! oj.ojSelect
     * @override
     * @protected
     */
      _GetDefaultStyleClass: function () {
        return 'oj-select';
      },

    /**
     * Returns the messaging launcher element i.e., where user sets focus that triggers the popup.
     * Usually this is the element input or select that will receive focus and on which the popup
     * for messaging is initialized.
     *
     * @override
     * @protected
     * @memberof! oj.ojSelect
     * @return {Object} jquery element which represents the messaging launcher component
     */
      _GetMessagingLauncherElement: function () {
        // native renderMode
        if (this.select) {
          return this.select.selection;
        }
        return this.element;
      },

    /**
     * Returns the jquery element that represents the content part of the component.
     * This is usually the component that user sets focus on (tabindex is set 0) and
     * where aria attributes like aria-required, aria-labeledby etc. are set. This is
     * also the element where the new value is updated. Usually this is the same as
     * the _GetMessagingLauncherElement.
     *
     * @override
     * @protected
     * @memberof! oj.ojSelect
     * @return {jQuery} jquery element which represents the content.
     */
      _GetContentElement: function () {
      // native renderMode
        if (this.select) {
          return this.select.selection;
        }
        return this.element;
      }

    // Fragments:

    /**
     * <p>The &lt;oj-select-one> element accepts <code class="prettyprint">oj-option</code> elements as children. See the [oj-option]{@link oj.ojOption} documentation for details about
     * accepted children and slots.</p>
     *
     * @ojchild Default
     * @memberof oj.ojSelectOne
     * @ojshortdesc The oj-select-one element accepts oj-option elements as children.
     *
     * @example <caption>Initialize the select with child content specified:</caption>
     * &lt;oj-select-one>
     *   &lt;oj-option value="option1">Option 1&lt;/oj-option>
     *   &lt;oj-option value="option2">Option 2&lt;/oj-option>
     *   &lt;oj-option value="option3">Option 3&lt;/oj-option>
     * &lt;/oj-select-one>
     */

    /**
     * <p>The &lt;oj-select-many> element accepts <code class="prettyprint">oj-option</code> elements as children. See the [oj-option]{@link oj.ojOption} documentation for details about
     * accepted children and slots.</p>
     *
     * @ojchild Default
     * @memberof oj.ojSelectMany
     * @ojshortdesc The oj-select-many element accepts oj-option elements as children.
     *
     * @example <caption>Initialize the select with child content specified:</caption>
     * &lt;oj-select-many>
     *   &lt;oj-option value="option1">Option 1&lt;/oj-option>
     *   &lt;oj-option value="option2">Option 2&lt;/oj-option>
     *   &lt;oj-option value="option3">Option 3&lt;/oj-option>
     * &lt;/oj-select-many>
     */

    /**
     * <table class="keyboard-table">
     *   <thead>
     *     <tr>
     *       <th>Target</th>
     *       <th>Gesture</th>
     *       <th>Action</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>Select box or Arrow button</td>
     *       <td><kbd>Tap</kbd></td>
     *       <td>If the drop down is not open, expand the drop down list. Otherwise, close the drop down list.
     *       If hints, title or messages exist in a notewindow,
     *        pop up the notewindow on tapping on select box.</td>
     *     </tr>
     *     <tr>
     *       <td>Option item</td>
     *       <td><kbd>Tap</kbd></td>
     *       <td>Tap on a option item in the drop down list to select a new item.</td>
     *     </tr>
     *     <tr>
     *       <td>Drop down</td>
     *       <td><kbd>swipe up/down</kbd></td>
     *       <td>Scroll the drop down list vertically</td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * @ojfragment touchDocOne - Used in touch gesture section of classdesc, and standalone gesture doc
     * @memberof oj.ojSelectOne
     * @instance
     */

    /**
     * <table class="keyboard-table">
     *   <thead>
     *     <tr>
     *       <th>Target</th>
     *       <th>Gesture</th>
     *       <th>Action</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>Select box</td>
     *       <td><kbd>Tap</kbd></td>
     *       <td>If the drop down is not open, expand the drop down list. Otherwise, close the drop down list.
     *       If hints, title or messages exist in a notewindow,
     *        pop up the notewindow.</td>
     *     </tr>
     *     <tr>
     *       <td>Option item</td>
     *       <td><kbd>Tap</kbd></td>
     *       <td>Tap on a option item in the drop down list to add to selection.</td>
     *     </tr>
     *     <tr>
     *       <td>Selected item with remove icon</td>
     *       <td><kbd>Tap</kbd></td>
     *       <td>Remove item from the selected items list by tapping on the remove icon.</td>
     *     </tr>
     *     <tr>
     *       <td>Drop down</td>
     *       <td><kbd>swipe up/down</kbd></td>
     *       <td>Scroll the drop down list vertically</td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * @ojfragment touchDocMany - Used in touch gesture section of classdesc, and standalone gesture doc
     * @memberof oj.ojSelectMany
     * @instance
     */

    /**
     * <table class="keyboard-table">
     *   <thead>
     *     <tr>
     *       <th>Target</th>
     *       <th>Key</th>
     *       <th>Action</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>Option item</td>
     *       <td><kbd>Enter</kbd></td>
     *       <td>Select the highlighted choice from the drop down list.</tr>
     *     </tr>
     *     <tr>
     *       <td>Drop down</td>
     *       <td><kbd>UpArrow or DownArrow</kbd></td>
     *       <td>Highlight the option item in the direction of the arrow. If the drop down is not open, expand the drop down list.</tr>
     *     </tr>
     *     <tr>
     *       <td>Drop down</td>
     *       <td><kbd>Esc</kbd></td>
     *       <td>Collapse the drop down list. If the drop down is already closed, do nothing.</tr>
     *     </tr>
     *     <tr>
     *       <td>Select box or search box</td>
     *       <td><kbd>any characters for the search term</kbd></td>
     *       <td>filter down the results with the search term.</td>
     *     </tr>
     *     <tr>
     *       <td>Select</td>
     *       <td><kbd>Tab In</kbd></td>
     *       <td>Set focus to the select. If hints, title or messages exist in a notewindow,
     *        pop up the notewindow.</td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * <p>Disabled option items receive no highlight and are not selectable.
     *
     * @ojfragment keyboardDocOne - Used in keyboard section of classdesc, and standalone gesture doc
     * @memberof oj.ojSelectOne
     * @instance
     */

    /**
     * <table class="keyboard-table">
     *   <thead>
     *     <tr>
     *       <th>Target</th>
     *       <th>Key</th>
     *       <th>Action</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>Option item</td>
     *       <td><kbd>Enter</kbd></td>
     *       <td>Select the highlighted choice from the drop down list.</tr>
     *     </tr>
     *     <tr>
     *       <td>Drop down</td>
     *       <td><kbd>UpArrow or DownArrow</kbd></td>
     *       <td>Highlight the option item in the direction of the arrow. If the drop down is not open, expand the drop down list.</tr>
     *     </tr>
     *     <tr>
     *      <td>Select box</td>
     *       <td><kbd>LeftArrow or RightArrow</kbd></td>
     *       <td> Move focus to the previous or next selected item.</td>
     *     </tr>
     *     <tr>
     *       <td>Selected item with remove icon</td>
     *       <td><kbd>Backspace or Delete</kbd></td>
     *       <td>Remove the selected item having focus.</td>
     *     </tr>
     *     <tr>
     *       <td>Drop down</td>
     *       <td><kbd>Esc</kbd></td>
     *       <td>Collapse the drop down list. If the drop down is already closed, do nothing.</tr>
     *     </tr>
     *     <tr>
     *       <td>Select box or search box</td>
     *       <td><kbd>any characters for the search term</kbd></td>
     *       <td>filter down the results with the search term.</td>
     *     </tr>
     *     <tr>
     *       <td>Select</td>
     *       <td><kbd>Tab In</kbd></td>
     *       <td>Set focus to the select. If hints, title or messages exist in a notewindow,
     *        pop up the notewindow.</td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * <p>Disabled option items receive no highlight and are not selectable.
     *
     * @ojfragment keyboardDocMany - Used in keyboard section of classdesc, and standalone gesture doc
     * @memberof oj.ojSelectMany
     * @instance
     */
    /**
     * {@ojinclude "name":"ojStylingDocIntro"}
     * <p>The form control style classes can be applied to the component, or an ancestor element. When
     * applied to an ancestor element, all form components that support the style classes will be affected.
     *
     * <table class="generic-table styling-table">
     *   <thead>
     *     <tr>
     *       <th>{@ojinclude "name":"ojStylingDocClassHeader"}</th>
     *       <th>{@ojinclude "name":"ojStylingDocDescriptionHeader"}</th>
     *     </tr>
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>oj-form-control-full-width</td>
     *       <td>Changes the max-width to 100% so that form components will occupy
     *           all the available horizontal space
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>oj-form-control-text-align-right</td>
     *       <td>Aligns the text to the right regardless of the reading direction or default text alignment.
     *           This is normally used for right aligning numbers
     *       </td>
     *     </tr>
     *     <tr>
     *       <td>oj-form-control-text-align-start</td>
     *       <td>Aligns the text to the left in ltr and to the right in rtl</td>
     *     </tr>
     *     <tr>
     *       <td>oj-form-control-text-align-end</td>
     *       <td>Aligns the text to the right in ltr and to the left in rtl</td>
     *     </tr>
     *   </tbody>
     * </table>
     *
     * @ojfragment stylingDoc - Used in Styling section of classdesc, and standalone Styling doc
     * @memberof oj.ojSelect
     */

    }
  );

  Components.setDefaultOptions(
    {
    // converterHint is defaulted to placeholder and notewindow in EditableValue.
    // For ojselect, we don't want a converterHint.
      ojSelect: // properties for all ojSelect components
      {
        displayOptions:
        {
          converterHint: ['none']
        },

      // native renderMode
        renderMode: Components.createDynamicPropertyGetter(
        function () {
          return (ThemeUtils.parseJSONFromFontFamily('oj-select-option-defaults') || {}).renderMode;
        })
      }

    }
);

/* global __oj_combobox_one_metadata:false */
(function () {
  __oj_combobox_one_metadata.extension._WIDGET_NAME = 'ojCombobox';
  __oj_combobox_one_metadata.extension._INNER_ELEM = 'input';
  __oj_combobox_one_metadata.extension._ALIASED_PROPS = { readonly: 'readOnly' };
  oj.CustomElementBridge.register('oj-combobox-one', { metadata: __oj_combobox_one_metadata });
}());

/* global __oj_combobox_many_metadata:false */
(function () {
  __oj_combobox_many_metadata.extension._WIDGET_NAME = 'ojCombobox';
  __oj_combobox_many_metadata.extension._INNER_ELEM = 'input';
  __oj_combobox_many_metadata.extension._ALIASED_PROPS = { readonly: 'readOnly' };
  oj.CustomElementBridge.register('oj-combobox-many', { metadata: __oj_combobox_many_metadata });
}());

/* global __oj_select_one_metadata:false */
(function () {
  __oj_select_one_metadata.extension._WIDGET_NAME = 'ojSelect';
  __oj_select_one_metadata.extension._INNER_ELEM = 'select';
  __oj_select_one_metadata.extension._ALIASED_PROPS = { readonly: 'readOnly' };
  oj.CustomElementBridge.register('oj-select-one', { metadata: __oj_select_one_metadata });
}());

/* global __oj_select_many_metadata:false */
(function () {
  __oj_select_many_metadata.extension._WIDGET_NAME = 'ojSelect';
  __oj_select_many_metadata.extension._INNER_ELEM = 'select';
  __oj_select_many_metadata.extension._ALIASED_PROPS = { readonly: 'readOnly' };
  oj.CustomElementBridge.register('oj-select-many', { metadata: __oj_select_many_metadata });
}());

});