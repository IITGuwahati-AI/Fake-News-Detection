/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(['require', 'ojs/ojcore', 'jquery', 'ojs/ojcontext', 'ojs/ojthemeutils', 'ojs/ojcomponentcore', 'ojs/ojanimation', 'ojs/ojlogger', 'ojs/ojconfig', 'ojs/ojkeyset', 'ojdnd'],
    function(localRequire, oj, $, Context, ThemeUtils, Components, AnimationUtils, Logger, Config)
{
  "use strict";
var __oj_tree_view_metadata = 
{
  "properties": {
    "currentItem": {
      "type": "any",
      "writeback": true,
      "readOnly": true
    },
    "data": {
      "type": "object"
    },
    "dnd": {
      "type": "object",
      "properties": {
        "drag": {
          "type": "object",
          "properties": {
            "items": {
              "type": "object",
              "properties": {
                "dataTypes": {
                  "type": "string|Array<string>"
                },
                "dragStart": {
                  "type": "function"
                },
                "drag": {
                  "type": "function"
                },
                "dragEnd": {
                  "type": "function"
                }
              }
            }
          }
        },
        "drop": {
          "type": "object",
          "properties": {
            "items": {
              "type": "object",
              "properties": {
                "dataTypes": {
                  "type": "string|Array<string>"
                },
                "dragEnter": {
                  "type": "function"
                },
                "dragOver": {
                  "type": "function"
                },
                "dragLeave": {
                  "type": "function"
                },
                "drop": {
                  "type": "function"
                }
              }
            }
          }
        }
      }
    },
    "expanded": {
      "type": "KeySet",
      "writeback": true,
      "value": "new ExpandedKeySet()"
    },
    "item": {
      "type": "object",
      "properties": {
        "focusable": {
          "type": "function"
        },
        "renderer": {
          "type": "function"
        },
        "selectable": {
          "type": "function"
        }
      }
    },
    "selection": {
      "type": "Array<any>",
      "writeback": true,
      "value": []
    },
    "selectionMode": {
      "type": "string",
      "enumValues": [
        "multiple",
        "none",
        "single"
      ],
      "value": "none"
    },
    "translations": {
      "type": "object",
      "value": {}
    }
  },
  "methods": {
    "getContextByNode": {},
    "refresh": {},
    "setProperty": {},
    "getProperty": {},
    "setProperties": {},
    "getNodeBySubId": {},
    "getSubIdByNode": {}
  },
  "events": {
    "ojAnimateEnd": {},
    "ojAnimateStart": {},
    "ojBeforeCollapse": {},
    "ojBeforeCurrentItem": {},
    "ojBeforeExpand": {},
    "ojCollapse": {},
    "ojExpand": {}
  },
  "extension": {}
};
/* global Set:false, Components:false, Logger:false, ThemeUtils:false, Context:false, Promise:false, Symbol:false, Config:false, localRequire:false*/

/**
 * @ojcomponent oj.ojTreeView
 * @augments oj.baseComponent
 * @since 4.0.0
 * @ojstatus preview
 * @ojshortdesc A tree view displays hierarchical relationships between items.
 * @ojrole tree
 * @ojtsimport {module: "ojtreedataprovider", type: "AMD", importName: "TreeDataProvider"}
 * @ojtsimport {module: "ojkeyset", type: "AMD", imported: ["KeySet"]}
 * @ojsignature [{
 *                target: "Type",
 *                value: "class ojTreeView<K, D> extends baseComponent<ojTreeViewSettableProperties<K,D>>",
 *                genericParameters: [{"name": "K", "description": "Type of key of the dataprovider"}, {"name": "D", "description": "Type of data from the dataprovider"}]
 *               },
 *               {
 *                target: "Type",
 *                value: "ojTreeViewSettableProperties<K,D> extends baseComponentSettableProperties",
 *                for: "SettableProperties"
 *               }]
 *
 * @classdesc
 * <h3 id="treeViewOverview-section">
 *   JET TreeView
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#treeViewOverview-section"></a>
 * </h3>
 *
 * <p>The JET TreeView allows a user to display the hierarchical relationship between the items of a tree.</p>
 *
 * <h3 id="data-section">
 *   Data
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#data-section"></a>
 * </h3>
 * <p>The JET TreeView gets its data in two different ways. The first way is from a TreeDataProvider or TreeDataSource.
 * There is one TreeDataProvider available out of the box:</p>
 * <ul>
 * <li><b>oj.ArrayTreeDataProvider</b> - Use this when the underlying data is an array.
 *  See the documentation for <a href="oj.ArrayTreeDataProvider.html">oj.ArrayTreeDataProvider</a>
 * for more details on the available options.</li>
 * </ul>
 * <p>There are two types of TreeDataSource that are available out of the box:</p>
 * <ul>
 * <li><b>oj.JsonTreeDataSource</b> - Use this when the underlying data is a JSON object.
 * See the documentation for <a href="oj.JsonTreeDataSource.html">oj.JsonTreeDataSource</a>
 * for more details on the available options.</li>
 * <li><b>oj.CollectionTreeDataSource</b> - Use this when oj.Collection is the model for each group of data.
 * See the documentation for <a href="oj.CollectionTreeDataSource.html">oj.CollectionTreeDataSource</a>
 * for more details on the available options.</li>
 * </ul>
 *
 * <p>The second way is using static HTML content as data.</p>
 *
 * <p>Example of static content</p>
 * <pre class="prettyprint">
 * <code>
 * &lt;oj-tree-view id="treeview1">
 *   &lt;ul>
 *     &lt;li>
 *       &lt;a id="group1" href="#">Group 1&lt;/a>
 *       &lt;ul>
 *         &lt;li>&lt;a id="item1-1" href="#">Item 1-1&lt;/a>&lt;/li>
 *         &lt;li>&lt;a id="item1-2" href="#">Item 1-2&lt;/a>&lt;/li>
 *       &lt;/ul>
 *     &lt;/li>
 *     &lt;li>
 *       &lt;a id="group2" href="#">Group 2&lt;/a>
 *       &lt;ul>
 *         &lt;li>&lt;a id="item2-1" href="#">Item 2-1&lt;/a>&lt;/li>
 *         &lt;li>&lt;a id="item2-2" href="#">Item 2-2&lt;/a>&lt;/li>
 *       &lt;/ul>
 *     &lt;/li>
 *   &lt;/ul>
 * &lt;/oj-tree-view>
 * </code></pre>
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
 * <h3 id="context-section">
 *   Item Context
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#context-section"></a>
 * </h3>
 *
 * <p>For item attributes, developers can specify a function as the return value.
 * The function takes a single argument, which is an object that contains contextual
 * information about the particular item. This gives developers the flexibility
 * to return different value depending on the context.</p>
 *
 * <p>The context parameter contains the following keys:</p>
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
 *       <td>The TreeView element.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>data</kbd></td>
 *       <td>The data object for the item (not available for static content).</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>datasource</kbd></td>
 *       <td>A reference to the data source object (not available for static content).</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>depth</kbd></td>
 *       <td>The depth of the item. The depth of the first level children under the invisible root is 1.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>index</kbd></td>
 *       <td>The index of the item relative to its parent, where 0 is the index of the first item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>key</kbd></td>
 *       <td>The key of the item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>leaf</kbd></td>
 *       <td>Whether the item is a leaf item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>parentElement</kbd></td>
 *       <td>The TreeView item element. The renderer can use this to directly append content.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>parentKey</kbd></td>
 *       <td>The key of the parent item. The parent key is null for root item.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * <h3 id="accessibility-section">
 *   Accessibility
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#accessibility-section"></a>
 * </h3>
 *
 * <p>Application must ensure that the context menu is available and setup with the
 * appropriate clipboard menu items so that keyboard-only users are able to reorder items
 * just by using the keyboard.
 *
 * <h3 id="perf-section">
 *   Performance
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#perf-section"></a>
 * </h3>
 *
 * <h4>Data Set Size</h4>
 * <p>As a rule of thumb, it is recommended that applications limit the amount of data to display. Displaying large
 * number of items in TreeView makes it hard for user to find what they are looking for, but affects the load time and
 * scrolling performance as well.</p>
 *
 * <h4>Item Content</h4>
 * <p>TreeView allows developers to specify arbitrary content inside its item. In order to minimize any negative effect on
 * performance, please avoid putting a large number of heavy-weight components inside because as it adds more complexity
 * to the structure, and the effect will be multiplied because there can be many items in the TreeView.</p>
 *
 * <h4>Expand All</h4>
 * <p>While TreeView provides a convenient way to initially expand all parent items in the TreeView, it might have an impact
 * on the initial rendering performance since expanding each parent item might cause a fetch from the server depending on
 * the TreeDataProvider or TreeDataSource. Other factors that could impact performance includes the depth of the tree, and the number of children
 * in each level.</p>
 *
 * <h3 id="animation-section">
 *   Animation
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#animation-section"></a>
 * </h3>
 *
 * <p>Applications can customize animations triggered by actions in TreeView by either listening for <code class="prettyprint">animateStart/animateEnd</code>
 *    events or overriding action specific style classes on the animated item.  See the documentation of <a href="oj.AnimationUtils.html">oj.AnimationUtils</a>
 *    class for details.</p>
 *
 * <p>The following are actions and their corresponding sass variables in which applications can use to customize animation effects.
 * <table class="keyboard-table">
 *   <thead>
 *     <tr>
 *       <th>Action</th>
 *       <th>Sass Variable</th>
 *       <th>Description</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td><kbd>expand</kbd></td>
 *       <td>$treeViewExpandAnimation</td>
 *       <td>When user expands an item.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>collapse</kbd></td>
 *       <td>$treeViewCollapseAnimation</td>
 *       <td>When user collapses an item.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * <h3 id="styling-section">
 *   Styling
 *   <a class="bookmarkable-link" title="Bookmarkable Link" href="#styling-section"></a>
 * </h3>
 *
 * {@ojinclude "name":"stylingDoc"}
 */
(function () {
  oj.__registerWidget('oj.ojTreeView', $.oj.baseComponent,
    {
      version: '1.0.0',
      defaultElement: '<div>',
      widgetEventPrefix: 'oj',
      options: {
        /**
         * The key of the item that has the browser focus.
         * This is a read-only attribute so page authors cannot set or change it directly.
         *
         * @expose
         * @public
         * @type {any}
         * @instance
         * @memberof! oj.ojTreeView
         * @ojshortdesc Read-only property used for retrieving the key of the item that currently has focus.
         * @readonly
         * @ojwriteback
         * @ojsignature {target:"Type", value:"K"}
         *
         *
         * @example <caption>Initialize the TreeView with the <code class="prettyprint">current-item</code> attribute specified:</caption>
         * &lt;oj-tree-view current-item='{{myCurrentItem}}'>&lt;/oj-tree-view>
         *
         * @example <caption>Get or set the <code class="prettyprint">currentItem</code> property after initialization:</caption>
         * // getter
         * var currentItemValue = myTreeView.currentItem;
         *
         * // setter
         * myTreeView.currentItem = "item2";
         */
        currentItem: null,

        /**
         * The data source for the TreeView. Accepts an instance of oj.TreeDataProvider or oj.TreeDataSource.
         * See the data source section in the introduction for out of the box data source types.
         * If the data attribute is not specified, the child elements are used as content. If there's no
         * content specified, then an empty list is rendered.
         *
         * @expose
         * @public
         * @type {Object}
         * @instance
         * @memberof! oj.ojTreeView
         * @ojshortdesc Specifies the data for the tree. See the Help documentation for more information.
         * @default null
         * @ojsignature [{target: "Type", value: "oj.TreeDataProvider<K, D>"},
         *               {target: "Type", value: "oj.TreeDataSource|oj.TreeDataProvider", consumedBy:"js"}]
         *
         * @example <caption>Initialize the TreeView with the <code class="prettyprint">data</code> attribute specified:</caption>
         * &lt;oj-tree-view data='{{myDataProvider}}'>&lt;/oj-tree-view>
         *
         * @example <caption>Get or set the <code class="prettyprint">data</code> property after initialization:</caption>
         * // getter
         * var dataValue = myTreeView.data;
         *
         * // setter
         * myTreeView.data = new oj.ArrayTreeDataProvider(myArray);
         */
        data: null,

        /**
         * Enable drag and drop functionality.<br><br>
         * JET provides support for HTML5 Drag and Drop events.  Please refer to {@link https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop third party documentation}
         * on HTML5 Drag and Drop to learn how to use it.
         *
         * @expose
         * @memberof! oj.ojTreeView
         * @ojshortdesc Customizes the drag and drop functionality. See the Help documentation for more information.
         * @type {Object}
         * @instance
         */
        dnd: {
          /**
           * @expose
           * @alias dnd.drag
           * @memberof! oj.ojTreeView
           * @ojshortdesc Customizes the drag functionality.
           * @instance
           * @type {Object}
           * @ojsignature {target: "Type", value: "?"}
           * @default null
           * @property {Object} items If this object is specified, TreeView will initiate drag operation when the user drags on an item.
           * @property {string|Array.<string>} [items.dataTypes] The MIME types to use for the dragged data in the dataTransfer object. This can be a string if there is only one
           * type, or an array of strings if multiple types are needed.<br><br>
           * For example, if selected items of employee data are being dragged, dataTypes could be "application/employees+json". Drop targets can examine the data types and decide
           * whether to accept the data. A text input may only accept "text" data type, while a chart for displaying employee data may be configured to accept the "application/employees+json" type.<br><br>
           * For each type in the array, dataTransfer.setData will be called with the specified type and the JSON version of the selected item data as the value. The selected item data
           * is an array of objects, with each object representing a model object from the underlying data source. For example, if the underlying data is an oj.Collection, then this
           * would be a oj.Model object. Note that when static HTML is used, then the value would be the HTML string of the selected item.<br><br>
           * This property is required unless the application calls setData itself in a dragStart callback function.
           * @property {function(Event, {items: Array.<D>}):void} [items.dragStart] A callback function that receives the "dragstart" event and context information as arguments:<br><br>
           * <code class="prettyprint">function(event, context)</code><br><br>
           * All of the event payloads listed below can be found under the <code class="prettyprint">context</code> argument.
           * <ul><li><code class="prettyprint">items</code>: An array of objects, with each object representing the data of one selected item.</li></ul><br>
           * This function can set its own data and drag image as needed. If dataTypes is specified, event.dataTransfer is already populated with the default data when this function is invoked.
           * If dataTypes is not specified, this function must call event.dataTransfer.setData to set the data or else the drag operation will be cancelled. In either case, the drag image is
           * set to an image of the dragged items on the TreeView.
           * @property {function(Event):void} [items.drag] A callback function that receives the "drag" event as argument:<br><br>
           * <code class="prettyprint">function(event)</code><br><br>
           * @property {function(Event):void} [items.dragEnd] A callback function that receives the "dragend" event as argument:<br><br>
           * <code class="prettyprint">function(event)</code><br><br>
           *
           * @ojsignature {target: "Type",
           *               value: "?((event: Event, context: {items: Array<D>}) => void)",
           *               for: "items.dragStart"}
           *
           * @example <caption>Initialize the TreeView such that only leaf items are focusable:</caption>
           * myTreeView.setProperty('dnd.drag.items', {
           *   'dataTypes': ['application/ojtreeviewitems+json'],
           *   'dragEnd': handleDragEnd
           * });
           */
          drag: null,

          /**
           * @typedef {Object} oj.ojTreeView.ItemsDropOnDropContext
           * @property {Element} item The item being dropped on.
           * @property {'inside'|'before'|'after'|'first'} position The drop position relative to the item being dropped on.
           */
          /**
           * @expose
           * @alias dnd.drop
           * @memberof! oj.ojTreeView
           * @ojshortdesc Customizes the drop functionality.
           * @instance
           * @type {Object}
           * @ojsignature {target: "Type", value: "?"}
           * @default null
           * @property {Object} items  An object that specifies callback functions to handle dropping items<br><br>
           * @property {string|Array.<string>} [items.dataTypes] A data type or an array of data types this component can accept.<br><br>
           * This property is required unless dragEnter, dragOver, and drop callback functions are specified to handle the corresponding events.
           * @property {function(Event, {item: Element}):void} [items.dragEnter] A callback function that receives the "dragenter" event and context information as arguments:<br><br>
           * <code class="prettyprint">function(event, context)</code><br><br>
           * All of the event payloads listed below can be found under the <code class="prettyprint">context</code> argument.
           * <ul><li><code class="prettyprint">item</code>: The item being entered.</li></ul><br>
           * This function should call <code class="prettyprint">event.preventDefault()</code> to indicate the dragged data can be accepted.
           * Otherwise, dataTypes will be matched against the drag dataTypes to determine if the data is acceptable. If there is a match, <code class="prettyprint">event.preventDefault()</code>
           * will be called to indicate that the data can be accepted.
           * @property {function(Event, {item: Element}):void} [items.dragOver] A callback function that receives the "dragover" event and context information as arguments:<br><br>
           * <code class="prettyprint">function(event, context)</code><br><br>
           * All of the event payloads listed below can be found under the <code class="prettyprint">context</code> argument.
           * <ul><li><code class="prettyprint">item</code>: The item being dragged over.</li></ul><br>
           * This function should call <code class="prettyprint">event.preventDefault()</code> to indicate the dragged data can be accepted.
           * Otherwise, dataTypes will be matched against the drag dataTypes to determine if the data is acceptable. If there is a match, <code class="prettyprint">event.preventDefault()</code>
           * will be called to indicate that the data can be accepted.
           * @property {function(Event, {item: Element}):void} [items.dragLeave] A callback function that receives the "dragleave" event and context information as arguments:<br><br>
           * <code class="prettyprint">function(event, context)</code><br><br>
           * All of the event payloads listed below can be found under the <code class="prettyprint">context</code> argument.
           * <ul><li><code class="prettyprint">item</code>: The item that was last entered.</li></ul><br>
           * @property {function(Event, oj.ojTreeView.ItemsDropOnDropContext):void} items.drop A required callback function that receives the "drop" event and context information as arguments:<br><br>
           * <code class="prettyprint">function(event, context)</code><br><br>
           * All of the event payloads listed below can be found under the <code class="prettyprint">context</code> argument.
           * <ul><li><code class="prettyprint">item</code>: The item being dropped on.</li>
           * <li><code class="prettyprint">position</code>: The drop position relative to the item being dropped on.
           * Valid values are "inside", "before", "after", and "first" (the first child of the item being dropped on).</li></ul><br>
           * This function should call <code class="prettyprint">event.preventDefault()</code> to indicate the dragged data can be accepted.<br><br>
           * If the application needs to look at the data for the item being dropped on, it can use the <code class="prettyprint">getContextByNode</code> method.
           *
           * @ojsignature [{target: "Type",
           *                value: "?((event: Event, context: {item: Element}) => void)",
           *                for: "items.dragEnter"},
           *               {target: "Type",
           *                value: "?((event: Event, context: {item: Element}) => void)",
           *                for: "items.dragOver"},
           *               {target: "Type",
           *                value: "?((event: Event, context: {item: Element}) => void)",
           *                for: "items.dragLeave"}]
           *
           *
           * @example <caption>Initialize the TreeView such that only leaf items are focusable:</caption>
           * myTreeView.setProperty('dnd.drop.items', {
           *   'dataTypes': ['application/ojtreeviewitems+json'],
           *   'drop': handleDrop
           * });
           */
          drop: null
        },

        /**
         * Specifies the key set containing the keys of the TreeView items that should be expanded.
         * Use the <a href="ExpandedKeySet.html">ExpandedKeySet</a> class to specify items to expand.
         * Use the <a href="ExpandAllKeySet.html">ExpandAllKeySet</a> class to expand all items.
         *
         * @expose
         * @memberof! oj.ojTreeView
         * @ojshortdesc Specifies the key set containing the keys of the items that should be expanded. See the Help documentation for more information.
         * @instance
         * @type {KeySet}
         * @default new ExpandedKeySet()
         * @ojwriteback
         * @ojsignature {target:"Type", value:"KeySet<K>"}
         *
         * @example <caption>Initialize the TreeView with some expanded items:</caption>
         * myTreeView.expanded = new keySet.ExpandedKeySet(['item1', 'item2']);
         *
         * @example <caption>Initialize the TreeView with all items expanded:</caption>
         * myListView.expanded = new ExpandAllKeySet();
         */
        expanded: new oj.ExpandedKeySet(),

        /**
         * The item attribute contains a subset of attributes for items.
         *
         * @expose
         * @memberof! oj.ojTreeView
         * @ojshortdesc Customizes the functionality of each item in the tree.
         * @type {Object}
         * @instance
         */
        item: {
          // TODO: Add data provider to item context
          /**
           * @typedef {Object} oj.ojTreeView.ItemContext
           * @property {Element} componentElement The TreeView element.
           * @property {D} [data] The data object of the item (not available for static content).
           * @property {number} depth The depth of the item. The depth of the first level children under the invisible root is 1.
           * @property {number} index The index of the item relative to its parent, where 0 is the index of the first item.
           * @property {K} key The key of the item.
           * @property {boolean} leaf Whether the item is a leaf item.
           * @property {Element} parentElement The TreeView item element. The renderer can use this to directly append content.
           * @property {K} [parentKey] The key of the parent item (not available for root item).
           * @ojsignature {target:"Type", value:"<K,D>", for:"genericTypeParameters"}
           */
          /**
           * A function that returns whether the item is focusable.
           * A item that is not focusable cannot be clicked on or navigated to.
           * See <a href="#context-section">itemContext</a> in the introduction
           * to see the object passed into the focusable function.
           * If no function is specified, then all the items will be focusable.
           *
           * @expose
           * @alias item.focusable
           * @ojshortdesc Specifies whether the item can receive keyboard focus. See the Help documentation for more information.
           * @memberof! oj.ojTreeView
           * @instance
           * @type {function(Object):boolean|null}
           * @ojsignature {target: "Type",
           *               value: "?((itemContext: oj.ojTreeView.ItemContext<K,D>) => boolean)",
           *               jsdocOverride: true}
           * @default null
           *
           * @example <caption>Initialize the TreeView such that only leaf items are focusable:</caption>
           * myTreeView.setProperty('item.focusable', function(itemContext)
           * {
           *   return itemContext['leaf'];
           * });
           */
          focusable: null,

          /**
           * The renderer function that renders the contents of the item. See <a href="#context-section">itemContext</a>
           * in the introduction to see the object passed into the renderer function.
           * The function should return one of the following:
           * <ul>
           *   <li>An Object with the following property:
           *     <ul><li>insert: HTMLElement | string - A string or a DOM element of the content inside the item.</li></ul>
           *   </li>
           *   <li>Nothing: If the developer chooses to manipulate the item element directly, the function should return nothing.</li>
           * </ul>
           *
           * @expose
           * @alias item.renderer
           * @ojshortdesc Specifies the renderer for the item. See the Help documentation for more information.
           * @memberof! oj.ojTreeView
           * @instance
           * @type {function(Object):Object|null}
           * @ojsignature {target: "Type",
           *               value: "?((itemContext: oj.ojTreeView.ItemContext<K,D>) => {insert: Element|string}|void)|null",
           *               jsdocOverride: true}
           * @default null
           *
           * @example <caption>Initialize the TreeView with a renderer:</caption>
           * &lt;oj-tree-view item.renderer='{{myRendererFunc}}'>&lt;/oj-tree-view>
           *
           * @example <caption>Get or set the <code class="prettyprint">renderer</code> property after initialization:</caption>
           * // getter
           * var renderer = myTreeView.item.renderer;
           *
           * // setter
           * myTreeView.item.renderer = myRendererFunc;
           */
          renderer: null,

          /**
           * A function that returns whether the item can be selected.
           * If selectionMode is set to "none" this attribute is ignored.
           * See <a href="#context-section">itemContext</a> in the introduction
           * to see the object passed into the selectable function.
           * If no function is specified, then all the items will be selectable.
           *
           * @expose
           * @alias item.selectable
           * @ojshortdesc Specifies whether the item can be selected. See the Help documentation for more information.
           * @memberof! oj.ojTreeView
           * @instance
           * @type {function(Object):boolean|null}
           * @ojsignature {target: "Type",
           *               value: "?((itemContext: oj.ojTreeView.ItemContext<K,D>) => boolean)",
           *               jsdocOverride: true}
           * @default null
           *
           * @example <caption>Initialize the TreeView with the <code class="prettyprint">selectable</code> attribute specified:</caption>
           * &lt;oj-tree-view item.selectable='{{mySelectableFunc}}'>&lt;/oj-tree-view>
           *
           * @example <caption>Get or set the <code class="prettyprint">selectable</code> property after initialization:</caption>
           * // getter
           * var selectable = myTreeView.item.selectable;
           *
           * // setter
           * myTreeView.item.selectable = mySelectableFunc;
           */
          selectable: null
        },

        /**
         * The current selections in the TreeView. An empty array indicates nothing is selected.
         *
         * @expose
         * @memberof! oj.ojTreeView
         * @ojshortdesc Specifies the current selections in the tree. An empty array indicates nothing is selected.
         * @instance
         * @type {Array.<any>}
         * @default []
         * @ojwriteback
         * @ojsignature {target:"Type", value:"Array<K>"}
         *
         * @example <caption>Initialize the TreeView with the <code class="prettyprint">selection</code> attribute specified:</caption>
         * &lt;oj-tree-view selection='{{mySelection}}'>&lt;/oj-tree-view>
         *
         * @example <caption>Get or set the <code class="prettyprint">selection</code> property after initialization:</caption>
         * // getter
         * var selectionValue = myTreeView.selection;
         *
         * // setter
         * myTreeView.selection = ['item1', 'item2', 'item3'];
         */
        selection: [],

        /**
         * Specifies whether selection can be made and the cardinality of selection in the TreeView.
         *
         * @expose
         * @memberof! oj.ojTreeView
         * @ojshortdesc Specifies the selection mode.
         * @instance
         * @type {string}
         * @default "none"
         * @ojvalue {string} "none" Selection is disabled.
         * @ojvalue {string} "single" Only one item can be selected at a time.
         * @ojvalue {string} "multiple" Multiple items can be selected at the same time.
         *
         * @example <caption>Initialize the TreeView with the <code class="prettyprint">selection-mode</code> attribute specified:</caption>
         * &lt;oj-tree-view selection-mode='multiple'>&lt;/oj-tree-view>
         *
         * @example <caption>Get or set the <code class="prettyprint">selectionMode</code> property after initialization:</caption>
         * // getter
         * var selectionModeValue = myTreeView.selectionMode;
         *
         * // setter
         * myTreeView.selectionMode = 'multiple';
         */
        selectionMode: 'none',

        // Events

        /**
         * Triggered when the default animation of a particular action has ended.
         * Note this event will not be triggered if application cancelled the default animation on animateStart.
         *
         * @expose
         * @event
         * @memberof oj.ojTreeView
         * @ojshortdesc Triggered when the default animation of a particular action has ended.
         * @instance
         * @property {'expand'|'collapse'} action The action that started the animation. See <a href="#animation-section">animation</a> section for a list of actions.
         * @property {Element} element The target of animation.
         */
        animateEnd: null,

        /**
         * Triggered when the default animation of a particular action is about to start.
         * The default animation can be cancelled by calling <code class="prettyprint">event.preventDefault()</code>.
         *
         * @expose
         * @event
         * @memberof oj.ojTreeView
         * @ojshortdesc Triggered when the default animation of a particular action is about to start.
         * @instance
         * @property {'expand'|'collapse'} action The action that starts the animation. See <a href="#animation-section">animation</a> section for a list of actions.
         * @property {Element} element The target of animation.
         * @property {function():void} endCallback If the event listener calls <code class="prettyprint">event.preventDefault()</code> to cancel the default animation, it must call the endCallback function when it finishes its own animation handling and when any custom animation ends.
         */
        animateStart: null,

        /**
         * Triggered before an item is collapsed via the <code class="prettyprint">expanded</code> attribute or via the UI.
         * Call <code class="prettyprint">event.preventDefault()</code> to veto the event, which prevents collapsing the item.
         *
         * @expose
         * @event
         * @ojcancelable
         * @memberof oj.ojTreeView
         * @ojshortdesc Triggered before an item is collapsed.
         * @instance
         * @property {any} key The key of the item to be collapsed.
         * @property {Element} item The item to be collapsed.
         * @ojsignature [{target:"Type", value:"<K>", for:"genericTypeParameters"},
         *               {target:"Type", value:"K", for:"key"}]
         */
        beforeCollapse: null,

        /**
         * Triggered before the current item is changed via the <code class="prettyprint">currentItem</code> attribute or via the UI.
         * Call <code class="prettyprint">event.preventDefault()</code> to veto the event, which prevents changing the current item.
         *
         * @expose
         * @event
         * @ojcancelable
         * @memberof oj.ojTreeView
         * @ojshortdesc Triggered before the current item is changed.
         * @instance
         * @property {any} previousKey The key of the previous item.
         * @property {Element} previousItem The previous item.
         * @property {any} key The key of the new current item.
         * @property {Element} item The new current item.
         * @ojsignature [{target:"Type", value:"<K>", for:"genericTypeParameters"},
         *               {target:"Type", value:"K", for:"previousKey"},
         *               {target:"Type", value:"K", for:"key"}]
         */
        beforeCurrentItem: null,

        /**
         * Triggered before an item is expanded via the <code class="prettyprint">expanded</code> attribute or via the UI.
         * Call <code class="prettyprint">event.preventDefault()</code> to veto the event, which prevents expanding the item.
         *
         * @expose
         * @event
         * @ojcancelable
         * @memberof oj.ojTreeView
         * @ojshortdesc Triggered before an item is expanded.
         * @instance
         * @property {any} key The key of the item to be expanded.
         * @property {Element} item The item to be expanded.
         * @ojsignature [{target:"Type", value:"<K>", for:"genericTypeParameters"},
         *               {target:"Type", value:"K", for:"key"}]
         */
        beforeExpand: null,

        /**
         * Triggered after an item has been collapsed.
         *
         * @expose
         * @event
         * @memberof oj.ojTreeView
         * @instance
         * @property {any} key The key of the item that was just collapsed.
         * @property {Element} item The item that was just collapsed.
         * @ojsignature [{target:"Type", value:"<K>", for:"genericTypeParameters"},
         *               {target:"Type", value:"K", for:"key"}]
         */
        collapse: null,

        /**
         * Triggered after an item has been expanded.
         *
         * @expose
         * @event
         * @memberof oj.ojTreeView
         * @instance
         * @property {any} key The key of the item that was just expanded.
         * @property {Element} item The item that was just expanded.
         * @ojsignature [{target:"Type", value:"<K>", for:"genericTypeParameters"},
         *               {target:"Type", value:"K", for:"key"}]
         */
        expand: null
      },

      // @inheritdoc
      _ComponentCreate: function () {
        this._super();
      },

      // @inheritdoc
      _AfterCreate: function () {
        this._super();
        this._initRender();
        this._render();
      },

      /**
       * Initializes the TreeView.
       * @private
       */
      _initRender: function () {
        var self = this;

        // Event listeners
        this._on(this.element, {
          click: function (event) {
            self._handleClick(event);
          },
          mouseover: function (event) {
            self._handleMouseOver(event);
          },
          mouseout: function (event) {
            self._handleMouseOut(event);
          },
          mousedown: function (event) {
            self._handleMouseDown(event);
          },
          mouseup: function (event) {
            self._handleMouseUp(event);
          },
          keydown: function (event) {
            self._handleKeyDown(event);
          },
          dragstart: function (event) {
            self._handleDragStart(event);
          },
          drag: function (event) {
            self._handleDragSourceEvent(event, 'drag');
          },
          dragend: function (event) {
            self._handleDragSourceEvent(event, 'dragEnd');
          },
          dragenter: function (event) {
            self._handleDropTargetEvent(event, 'dragEnter');
          },
          dragover: function (event) {
            self._handleDropTargetEvent(event, 'dragOver');
          },
          dragleave: function (event) {
            self._handleDropTargetEvent(event, 'dragLeave');
          },
          drop: function (event) {
            self._handleDropTargetEvent(event, 'drop');
          }
        });

        if (oj.DomUtils.isTouchSupported()) {
          this.element[0].addEventListener('touchstart', function (event) {
            self.touchStartEvent = event;
          });

          this.element[0].addEventListener('touchcancel', function () {
            self.touchStartEvent = null;
          });

          this.element[0].addEventListener('touchend', function (event) {
            if (self.touchStartEvent && event.changedTouches.length) {
              var overElem = document.elementFromPoint(event.changedTouches[0].clientX,
                event.changedTouches[0].clientY);
              if (overElem !== self.touchStartEvent.target) {
                self.touchStartEvent = null;
              }
            }
            self._handleMouseOut(event);
          });
        }

        // Drop marker
        var dropMarkerIcon = $(document.createElement('span'))
            .addClass('oj-treeview-drop-marker-icon oj-component-icon');

        this._dropMarker = $(document.createElement('div'))
          .addClass('oj-treeview-drop-marker')
          .append(dropMarkerIcon) // @HTMLUpdateOK
          .appendTo(this.element); // @HTMLUpdateOK

        this._dropMarkerRect = this._dropMarker[0].getBoundingClientRect();
        this._dropMarker.hide();

        this._dropLine = $(document.createElement('div'))
          .addClass('oj-treeview-drop-line')
          .appendTo(this.element); // @HTMLUpdateOK

        this._dropLineRect = this._dropLine[0].getBoundingClientRect();
        this._dropLine.hide();

        this._refreshId = 0;
        this._uiExpanded = new oj.ExpandedKeySet();
      },

      /**
       * Renders the TreeView.
       * @private
       */
      _render: function () {
        var self = this;
        this.element.removeClass('oj-complete');
        this._keyList = new Set(); // list of existing node keys

        if (this.options.data) {
          this.element.find('ul').remove();
          this._fetchChildren(null, function (response) {
            var fetchListResult = response[0];
            self._renderItems(fetchListResult.value, self.element);
            self._resetFocus();
            self.element.addClass('oj-complete');
            self._decorateTree();
            self._lastSelectedItem = null;
          });
        } else {
          this.element.find('ul').addClass('oj-treeview-list').attr('role', 'group');
          this.element.find('li').each(function () {
            var item = $(this);
            self._decorateItem(item);
          });
          this._resetFocus();
          this.element.addClass('oj-complete');
          this._decorateTree();
          this._lastSelectedItem = null;
        }
      },
      _getDataProvider: function () {
        var self = this;
        var data;
        if (self.m_dataSource == null) {
          data = self.options.data;
          if (!oj.DataProviderFeatureChecker.isTreeDataProvider(data)) {
            var adapterPromise = oj.__getRequirePromise('./ojtreedataprovideradapter', localRequire);
            if (!adapterPromise) {
              throw new Error('Cannot adapt a TreeDataSource if require() is not available');
            }

            return adapterPromise.then(function (TreeDataSourceAdapter) {
              return new TreeDataSourceAdapter(data);
            });
          }
        } else {
          data = self.m_dataSource;
        }

        return Promise.resolve(data);
      },
      /**
       * Fetch the children of a parent item from the data source.
       * @param {string} parentKey The key of the parent item.
       * @param {Function} successFunc The function to be called if the fetch is successful.
       * @private
       */
      _fetchChildren: function (parentKey, successFunc) {
        var self = this;
        var dataProviderPromiseBusyResolve = self._addBusyState('getting data provider');
        var dataProviderPromise = self._getDataProvider();
        var refreshing = this._refreshId;

        dataProviderPromise.then(function (dataProvider) {
          dataProviderPromiseBusyResolve();

          // bail out of the fetch if the component was refreshed
          if (self._refreshId !== refreshing) {
            return;
          }
          self.m_dataSource = dataProvider;

          var childDataProvider = parentKey === null ? dataProvider :
            dataProvider.getChildDataProvider(parentKey);
          if (childDataProvider != null) {
            var busyResolve = self._addBusyState('fetching data');

            var enginePromise = self._loadTemplateEngine();
            // size -1 to fetch all rows
            var dataProviderAsyncIterator =
              childDataProvider.fetchFirst({ size: -1 })[Symbol.asyncIterator]();
            var promise = dataProviderAsyncIterator.next();

            // new helper function to be called in recursion to fetch all data.
            var helperFunction = function (values) {
              // skip additional fetching if done
              if (values[0].done) {
                return values;
              }
              var nextPromise = dataProviderAsyncIterator.next();
              var fetchMoreData = nextPromise.then(function (value) {
                // bail out of the fetch if the component was refreshed
                if (self._refreshId !== refreshing) {
                  return null;
                }
                // eslint-disable-next-line no-param-reassign
                values[0].done = value.done;
                // eslint-disable-next-line no-param-reassign
                values[0].value.data = values[0].value.data.concat(value.value.data);
                // eslint-disable-next-line no-param-reassign
                values[0].value.metadata = values[0].value.metadata.concat(value.value.metadata);
                return helperFunction(values);
              }, function (reason) {
                Logger.error('Error fetching data: ' + reason);
                busyResolve();
              });
              return (fetchMoreData);
            };

            Promise.all([promise, enginePromise]).then(function (values) {
              // bail out of the fetch if the component was refreshed
              if (self._refreshId !== refreshing) {
                return null;
              }
              return helperFunction(values);
            }, function (reason) {
              Logger.error('Error fetching data: ' + reason);
              busyResolve();
            }).then(function (values) {
              // bail out of the fetch if the component was refreshed
              if (self._refreshId !== refreshing) {
                busyResolve();
                return;
              }
              successFunc(values);
              busyResolve();
            });
          }
        }, function (reason) {
          Logger.error('Error fetching data: ' + reason);
          dataProviderPromiseBusyResolve();
        });
      },

      /**
       * Render the TreeView items after the data is fetched.
       * @param {oj.FetchListResult} fetchListResult The array of item data returned by the data source.
       * @param {jQuery} parentElem The parent element to append the items to.
       * @private
       */
      _renderItems: function (fetchListResult, parentElem) {
        var ulElem = $(document.createElement('ul'))
            .addClass('oj-treeview-list')
            .attr('role', 'group')
            .appendTo(parentElem); // @HTMLUpdateOK

        for (var i = 0; i < fetchListResult.data.length; i++) {
          this._renderItem(ulElem, fetchListResult, i);
        }
      },

      /**
       * Render a TreeView item after the data is fetched.
       * @param {jQuery} ulElem The <ul> to attach the item to.
       * @param {oj.FetchListResult} fetchListResult The array of item data returned by the data source.
       * @param {number} index The index of the item.
       * @private
       */
      _renderItem: function (ulElem, fetchListResult, index, insertIndex, replace) {
        var self = this;
        var i;
        var textWrapper;

        // eslint-disable-next-line no-param-reassign
        // index += nodeSet.getStart();
        var data = fetchListResult.data[index];
        var metadata = fetchListResult.metadata[index];
        var key = metadata.key;

        // Prevent infinite recursion due to duplicated keys ()
        if (!replace) {
          if (this._keyList.has(key)) {
            throw new Error('JET TreeView nodes should not have duplicated keys: ' + key);
          }
          this._keyList.add(key);
        }

        var liElem = $(document.createElement('li'))
            .attr('id', key);

        if (replace) {
          var oldElem = this._getItemByKey(key)[0];
          // eslint-disable-next-line no-param-reassign
          ulElem = $(oldElem.parentNode);
          oldElem.parentNode.replaceChild(liElem[0], oldElem); // @HTMLUpdateOK
        } else if (insertIndex == null || insertIndex >= ulElem.children().length) {
          liElem.appendTo(ulElem);  // @HTMLUpdateOK
        } else {
          liElem.insertBefore(ulElem.children()[insertIndex]); // @HTMLUpdateOK
        }

        var context = {};
        context.parentElement = liElem;
        context.index = index;
        context.data = data;
        context.datasource = self.options.data;
        context.parentKey = self._getKey(self._getParentItem(liElem));

        context.component = Components.__GetWidgetConstructor(self.element);
        if (self._FixRendererContext) {
          context = self._FixRendererContext(context);
        }

        // dataSource always set by this point as it is post fetch
        var childDataProvider = self.m_dataSource.getChildDataProvider(key);
        metadata.leaf = (childDataProvider === null ||
          childDataProvider.isEmpty() === 'yes');
        metadata.depth = this._getDepth(liElem[0]);

        // Merge properties from metadata into item context
        var props = Object.keys(metadata);
        for (i = 0; i < props.length; i++) {
          var prop = props[i];
          context[prop] = metadata[prop];
        }

        var renderer = self.options.item.renderer;
        renderer = self._WrapCustomElementRenderer(renderer);
        var templateElement = this._getItemTemplate();
        var templateEngine = this._getTemplateEngine();

        if (renderer != null) {
          var content = renderer.call(self, context);
          if (content != null) {
            // Allow return of document fragment from jQuery create or JS document.createDocumentFragment
            if (content.parentNode === null || content.parentNode instanceof DocumentFragment) {
              liElem.append(content); // @HTMLUpdateOK
            } else if (content.parentNode != null) {
              // Parent node exists, do nothing
            } else if (content.toString) {
              textWrapper = document.createElement('span');
              textWrapper.appendChild(document.createTextNode(content.toString())); // @HTMLUpdateOK
              liElem.append(textWrapper); // @HTMLUpdateOK
            }
          }
        } else if (templateElement != null && templateEngine != null) {
          var componentElement = self.element[0];
          var nodes = templateEngine.execute(componentElement, templateElement, context, null);
          for (i = 0; i < nodes.length; i++) {
            if (nodes[i].tagName === 'LI') {
              liElem.replaceWith(nodes[i]);
              break;
            } else {
              liElem.append(nodes[i]);
            }
          }
        } else {
          textWrapper = document.createElement('span');
          textWrapper.appendChild(document.createTextNode(data == null ? '' : data.toString())); // @HTMLUpdateOK
          liElem.append(textWrapper); // @HTMLUpdateOK
        }

        // Get the item from root again as template replaces the item element
        liElem = ulElem.children().eq(insertIndex != null ? insertIndex : index);
        context.parentElement = liElem;

        // Set id on the liElem if not set by the renderer
        if (liElem.attr('id') == null) {
          liElem.attr('id', key);
        }

        // Cache data and metadata for lookup
        liElem.data('data', data).data('metadata', metadata);

        self._decorateItem(liElem);
      },

      /**
       * @param {Element} elem The li element to get depth of.
       * @return {number} depth from the li, 1 is top level
       * @private
       * @memberof oj.ojTreeView
       */
      _getDepth: function (elem) {
        var depth = 0;
        var curr = elem;
        while (curr && curr !== this.element[0]) {
          curr = curr.parentElement.parentElement;
          depth += 1;
        }
        return depth;
      },

      /**
       * Initiate loading of the template engine.  An error is thrown if the template engine failed to load.
       * @return {Promise} resolves to the template engine, or null if:
       *                   1) there's no need because no item template is specified
       *                   2) a renderer is present which takes precedence
       * @private
       * @memberof oj.ojTreeView
       */
      _loadTemplateEngine: function () {
        var self = this;

        if (this._getItemTemplate() != null && self.options.item.renderer == null) {
          return new Promise(function (resolve) {
            Config.__getTemplateEngine().then(function (engine) {
              self.m_engine = engine;
              resolve(engine);
            }, function (reason) {
              throw new Error('Error loading template engine: ' + reason);
            });
          });
        }

        return Promise.resolve(null);
      },

      /**
       * Retrieve the template engine, returns null if it has not been loaded yet
       * @private
       * @memberof oj.ojTreeView
       */
      _getTemplateEngine: function () {
        return this.m_engine;
      },

      /**
       * Returns the inline template element inside oj-list-view
       * @return {Element|null} the inline tmeplate element
       * @private
       * @memberof oj.ojTreeView
       */
      _getItemTemplate: function () {
        if (this.m_template === undefined) {
          // cache the template, assuming replacing template will require refresh
          this.m_template = null;
          var slotMap = this._getSlotMap();
          var slot = slotMap.itemTemplate;
          if (slot && slot.length > 0 && slot[0].tagName.toLowerCase() === 'template') {
            this.m_template = slot[0];
          }
        }
        return this.m_template;
      },

      /**
       * Returns the slot map object.
       * @return {object} slot Map
       * @private
       * @memberof oj.ojTreeView
       */
      _getSlotMap: function () {
        return oj.BaseCustomElementBridge.getSlotMap(this.element[0]);
      },

      /**
       * Adds the necessary attributes to a TreeView root element.
       * @private
       */
      _decorateTree: function () {
        var self = this;

        // Keyboard focus and ARIA attributes
        var root = this._getRoot();
        this._focusable({
          element: root,
          applyHighlight: true,
          setupHandlers: function (focusInHandler, focusOutHandler) {
            self._focusInHandler = focusInHandler;
            self._focusOutHandler = focusOutHandler;
          }
        });

        root.attr('tabIndex', 0)
          .on('focus', function () {
            self._focusInHandler(self._getItemContent(self._currentItem));
          })
          .on('blur', function () {
            self._focusOutHandler(self._getItemContent(self._currentItem));
          })
          .attr('role', 'tree')
          .attr('aria-labelledby', this.element.attr('id'));

        var selectionMode = this.options.selectionMode;
        if (selectionMode !== 'none') {
          root.attr('aria-multiselectable', selectionMode === 'multiple' ? 'true' : 'false');
        } else {
          root.removeAttr('aria-multiselectable');
        }
      },

      /**
       * Adds the necessary attributes to a TreeView item element.
       * @param {jQuery} item The item element to decorate.
       * @private
       */
      _decorateItem: function (item) {
        var self = this;
        item.addClass('oj-treeview-item').attr('role', 'treeitem');

        // Create wrapper for item icon and text
        var itemContent = this._getItemContent(item);
        if (itemContent.length === 0) {
          // Wrap everything except the subtree
          // Use item.contents() to include text and comment nodes as well
          itemContent = $(document.createElement('div'))
            .addClass('oj-treeview-item-content')
            .append(item.contents()) // @HTMLUpdateOK
            .appendTo(item); // @HTMLUpdateOK

          // Take the subtree out of the itemContent wrapper
          // Selector can't be used to exclude the ul when wrapping item.contents()
          itemContent.children('ul').appendTo(item); // @HTMLUpdateOK

          itemContent.find('.oj-treeview-item-icon').addClass('oj-treeview-icon');
        }

        // Initial selection
        self._select(item);

        // DnD
        var dragOptions = this._getDragOptions();
        itemContent.attr('draggable', Object.keys(dragOptions).length > 0 ? 'true' : 'false');

        // Create disclosure icon or spacer
        var disclosureIcon = item.children('.oj-treeview-spacer');
        if (disclosureIcon.length === 0) {
          disclosureIcon = $(document.createElement('ins'))
            .addClass('oj-treeview-icon oj-treeview-spacer')
            .prependTo(item); // @HTMLUpdateOK
        }

        if (self._isLeaf(item)) {
          item.addClass('oj-treeview-leaf');
        } else {
          // Expanded option
          if (self._isInitExpanded(item)) {
            self._expand(item, false);
          } else {
            self._collapse(item, false);
          }

          disclosureIcon.addClass('oj-treeview-disclosure-icon oj-component-icon oj-clickable-icon-nocontext oj-default');
        }
      },

      /**
       * Returns all the item elements that belongs to the TreeView.
       * @return {jQuery} All the item elements that belongs to the TreeView.
       * @private
       */
      _getItems: function () {
        return this.element.find('.oj-treeview-item');
      },

      /**
       * Returns the key of the provided item.
       * @param {jQuery} item The TreeView item element.
       * @return {jQuery|string|undefined} The key.
       * @private
       */
      _getKey: function (item) {
        // Rely on the key in the metadata first. The DOM id stringifies the key,
        // so it won't return the correct key if the key isn't string.
        var metadata = item.data('metadata');
        if (metadata) {
          return metadata.key;
        }
        return item.attr('id');
      },

      /**
       * Returns the item element that is identified by the provided key.
       * @param {string} key The key.
       * @return {jQuery} The item element.
       * @private
       */
      _getItemByKey: function (key) {
        // Rely on the key in the metadata first. The DOM id stringifies the key,
        // so it won't return the correct key if the key isn't string.
        var item = this.element.find('li').filter(function () {
          var metadata = $(this).data('metadata');
          if (metadata) {
            return oj.Object.compareValues(metadata.key, key);
          }
          return false;
        });

        if (item.length > 0) {
          return item;
        }
        return this.element.find('li#' + $.escapeSelector(key));
      },

      /**
       * Returns the content element of the provided item element.
       * @param {jQuery} item The TreeView item element.
       * @return {jQuery} The item content element.
       * @private
       */
      _getItemContent: function (item) {
        return item.children('.oj-treeview-item-content');
      },

      /**
       * Returns the child items of the provided item element.
       * @param {jQuery} item The TreeView item element.
       * @return {jQuery} The child item elements.
       * @private
       */
      _getChildItems: function (item) {
        return item.children('.oj-treeview-list').children('.oj-treeview-item');
      },

      /**
       * Returns the parent item of the provided item element.
       * @param {jQuery} item The TreeView item element.
       * @return {jQuery} The parent item element.
       * @private
       */
      _getParentItem: function (item) {
        return item.parent('.oj-treeview-list').parent('.oj-treeview-item');
      },

      /**
       * Returns the subtree element (ul) of the provided item element.
       * @param {jQuery} item The TreeView item element.
       * @return {jQuery} The subtree element (ul).
       * @private
       */
      _getSubtree: function (item) {
        return item.children('.oj-treeview-list');
      },

      /**
       * Returns the root ul of the TreeView.
       * @return {jQuery}
       * @private
       */
      _getRoot: function () {
        return this.element.children('.oj-treeview-list');
      },

      /**
       * Returns whether the item is a leaf item.
       * @param {jQuery} item The TreeView item element.
       * @return {boolean}
       * @private
       */
      _isLeaf: function (item) {
        var metadata = item.data('metadata');
        var hasChildren = metadata ? !metadata.leaf : this._getSubtree(item).length > 0;
        return !hasChildren;
      },

      /**
       * Returns whether item element is initially expanded in the TreeView option.
       * Note that the expanded option is not kept in sync with the actual expanded state of the TreeView.
       * @param {jQuery} item The TreeView item element.
       * @return {boolean}
       * @private
       */
      _isInitExpanded: function (item, uiExpanded) {
        var key = this._getKey(item);
        var expanded = uiExpanded != null ? uiExpanded : this.options.expanded;
        return (expanded && expanded.has) ? expanded.has(key) : false;
      },

      /**
       * Returns whether item element is currently expanded.
       * Note that the expanded option is not kept in sync with the actual expanded state of the TreeView.
       * @param {jQuery} item The TreeView item element.
       * @return {boolean}
       * @private
       */
      _isExpanded: function (item) {
        return item.hasClass('oj-expanded');
      },

      /**
       * Whether the group item is currently in the middle of expanding/collapsing
       * @param {Object} key the key of the group item
       * @return {boolean} true if it's expanding/collapsing, false otherwise
       * @private
       */
      _isDisclosing: function (key) {
        if (key && this.m_disclosing) {
          return (this.m_disclosing.indexOf(key) > -1);
        }

        return false;
      },

      /**
       * Marks a group item as currently in the middle of expanding/collapsing
       * @param {Object} key the key of the group item
       * @param {boolean} flag true or false
       * @private
       */
      _setDisclosing: function (key, flag) {
        if (key == null) {
          return;
        }

        if (this.m_disclosing == null) {
          this.m_disclosing = [];
        }

        if (flag) {
          this.m_disclosing.push(key);
        } else {
          // there should be at most one entry, but just in case remove all occurrences
          var index = this.m_disclosing.indexOf(key);
          while (index > -1) {
            this.m_disclosing.splice(index, 1);
            index = this.m_disclosing.indexOf(key);
          }
        }
      },

      /**
       * Expands an item.
       * @param {jQuery} item The TreeView item element.
       * @param {boolean} animate Whether the expand should be animated.
       * @param {Event} event The event that triggers the expand.
       * @param {boolean} vetoable Whether the expand can be vetoed by beforeExpand.
       * @private
       */
      _expand: function (item, animate, event, vetoable) {
        var self = this;

        if (this._isExpanded(item) || this._isLeaf(item) ||
          (animate && this._isDisclosing(this._getKey(item)))) {
          return;
        }

        if (animate) {
          var cancelled = !this._trigger('beforeExpand', event, this._getEventPayload(item));
          if (cancelled && vetoable !== false) {
            return;
          }
        }

        this._lastSelectedItem = null;

        var subtree = this._getSubtree(item);
        if (subtree.length === 0) {
          this._uiExpanded = this._uiExpanded.add([self._getKey(item)]);
          this._fetchChildren(self._getKey(item), function (response) {
            // if the item is already expanded or is no longer in the expanded option bail early
            // no need to check refreshId because is handled at fetchChildren layer
            // uiExpanded is used because on ui gesture the expanded is not set until
            // fetch/animation completes, so we need an internal expanded option to track that
            if (self._isExpanded(item) || (!self._isInitExpanded(item) &&
             !self._isInitExpanded(item, self._uiExpanded))) {
              return;
            }
            var fetchListResult = response[0];
            self._renderItems(fetchListResult.value, item);
            self._expandAfterFetch(item, animate, event);
          });
          return;
        }

        self._expandAfterFetch(item, animate, event);
      },

      /**
       * Expands an item after its child items have been fetched.
       * @param {jQuery} item The TreeView item element.
       * @param {boolean} animate Whether the expand should be animated.
       * @param {Event} event The event that triggers the expand.
       * @private
       */
      _expandAfterFetch: function (item, animate, event) {
        var self = this;

        item.removeClass('oj-collapsed').addClass('oj-expanded').attr('aria-expanded', 'true');

        var subtree = this._getSubtree(item);
        subtree.css('display', 'block');

        if (animate) {
          var busyResolve = this._addBusyState('animating expand');
          item.addClass('oj-treeview-animated'); // animation flag
          self._setDisclosing(self._getKey(item), true);

          this._startAnimation(subtree, 'expand').then(function () {
            self._setDisclosing(self._getKey(item), false);
            item.removeClass('oj-treeview-animated');
            self._trigger('expand', event, self._getEventPayload(item));

            // Update option and fire optionChange
            var expanded = self.options.expanded;
            var newExpanded = expanded.add([self._getKey(item)]);
            self._userOptionChange('expanded', newExpanded, event);

            busyResolve();
          });
        }
      },

      /**
       * Collapses an item.
       * @param {jQuery} item The TreeView item element.
       * @param {boolean} animate Whether the collapse should be animated.
       * @param {Event} event The event that triggers the collapse.
       * @param {boolean} vetoable Whether the collapse can be vetoed by beforeCollapse.
       * @private
       */
      _collapse: function (item, animate, event, vetoable) {
        var self = this;

        if (item.hasClass('oj-collapsed') || this._isLeaf(item) ||
          (animate && this._isDisclosing(this._getKey(item)))) {
          return;
        }

        if (animate) {
          var cancelled = !this._trigger('beforeCollapse', event, this._getEventPayload(item));
          if (cancelled && vetoable !== false) {
            return;
          }
          this._setDisclosing(this._getKey(item), true);
        }

        item.removeClass('oj-expanded').addClass('oj-collapsed').attr('aria-expanded', 'false');

        this._lastSelectedItem = null;

        var subtree = this._getSubtree(item);
        if (animate) {
          var busyResolve = this._addBusyState('animating collapse');
          item.addClass('oj-treeview-animated'); // animation flag

          this._uiExpanded = this._uiExpanded.delete([this._getKey(item)]);

          this._startAnimation(subtree, 'collapse').then(function () {
            self._setDisclosing(self._getKey(item), false);

            subtree.css('display', 'none');
            item.removeClass('oj-treeview-animated');
            self._trigger('collapse', event, self._getEventPayload(item));

            // Update option and fire optionChange
            var expanded = self.options.expanded;
            var newExpanded = expanded.delete([self._getKey(item)]);
            self._userOptionChange('expanded', newExpanded, event);

            busyResolve();
          });
        } else {
          subtree.css('display', 'none');
        }
      },

      /**
       * Starts the animation for the specific action.
       * @param {jQuery} elem The element to animate.
       * @param {string} action The name of the action to animate.
       * @return {Promise} A promise that will be resolved when the animation ends.
       * @private
       */
      _startAnimation: function (elem, action) {
        if (!this.defaultOptions) {
          this.defaultOptions =
            ThemeUtils.parseJSONFromFontFamily('oj-treeview-option-defaults');
        }

        var effects = (this.defaultOptions.animation || {})[action];
        // eslint-disable-next-line no-undef
        return AnimationUtils.startAnimation(elem[0], action, effects, this);
      },

      /**
       * Returns the default event payload for the provided item element.
       * @param {jQuery} item The TreeView item element.
       * @return {Object}
       * @private
       */
      _getEventPayload: function (item) {
        return { key: this._getKey(item), item: item[0] };
      },

      /**
       * Returns whether an action (select or focus) can be performed on the item.
       * @param {jQuery} item The TreeView item element.
       * @param {string} actionName The action name: 'select' or 'focus'.
       * @return {boolean}
       * @private
       */
      _isActionable: function (item, actionName) {
        var actionable = this.options.item[actionName + 'able'];
        if (actionable === false) {
          return false;
        } else if (typeof actionable === 'function') {
          var itemContext = this.getContextByNode(item[0]);
          return actionable(itemContext);
        }
        return true;
      },

      /**
       * Returns whether item element is selected.
       * @param {jQuery} item The TreeView item element.
       * @return {boolean}
       * @private
       */
      _isSelected: function (item) {
        var selectionMode = this.options.selectionMode;
        var selection = this.options.selection;

        if (selectionMode === 'none') {
          return false;
        } else if (selectionMode === 'single' && selection.length > 1) {
          selection = [selection[0]];
        }

        var key = this._getKey(item);
        return selection.indexOf(key) !== -1;
      },

      /**
       * Selects or unselects an item, depending on what triggers the selection.
       * @param {jQuery} item The TreeView item element.
       * @param {Event} event The event that triggers the select.
       * @private
       */
      _select: function (item, event) {
        var selectionMode = this.options.selectionMode;
        if (selectionMode === 'none') {
          return;
        }

        // Check whether the item is selectable
        if (!this._isActionable(item, 'select')) {
          return;
        }

        var isSelected = this._isSelected(item);

        if (event) {
          var sourceCapabilityTouch = event.originalEvent.sourceCapabilities &&
            event.originalEvent.sourceCapabilities.firesTouchEvents;
          var isTouch = oj.DomUtils.isTouchSupported() && (sourceCapabilityTouch ||
            (this.touchStartEvent != null && this.touchStartEvent.target === event.target));
          var isMetaKey = oj.DomUtils.isMetaKeyPressed(event);
          var isMultiple = selectionMode === 'multiple';
          var isNavigation = event.keyCode === 40 || event.keyCode === 38;
          var key = this._getKey(item);
          var selection = [];

          if (isMultiple && event.shiftKey && !isNavigation) {
            // Maintain selection of other items if meta key is pressed
            if (isMetaKey) {
              selection = this.options.selection.slice(0);
            } else {
              this._clearSelection();
            }

            // Select a range from the last selected item to the current item
            var nextItem = this._lastSelectedItem;
            var getNextItem = (nextItem && nextItem.offset().top < item.offset().top) ?
                this._getNextActionableItem.bind(this) : this._getPreviousActionableItem.bind(this);

            while (nextItem && (nextItem[0] !== item[0])) {
              var nextKey = this._getKey(nextItem);
              if (selection.indexOf(nextKey) === -1) {
                selection.push(nextKey);
                this._setSelected(nextItem);
              }
              nextItem = getNextItem(nextItem, 'select');
            }

            // Select the current item
            isSelected = true;
            selection.push(key);
          } else if (isMultiple && (isMetaKey || isTouch || isNavigation)) {
            // Toggle selection of current item while maintaining the selection of the other items
            isSelected = !isSelected;
            selection = this.options.selection.slice(0);
            if (isSelected) {
              selection.push(key);
            } else {
              selection.splice(selection.indexOf(key), 1);
            }
          } else {
            // Clear selection of all other items
            this._clearSelection();

            // On touch or spacebar, toggle the selection of the current item
            // Otherwise, select the current item even if it is already selected
            if ((isTouch || event.keyCode === 32) && isSelected) {
              isSelected = false;
              selection = [];
            } else {
              isSelected = true;
              selection = [key];
            }
          }

          // Update option and fire optionChange
          this._userOptionChange('selection', selection, event);
          this._lastSelectedItem = item;
        }

        if (isSelected) {
          this._setSelected(item);
        } else {
          this._setUnselected(item);
        }
      },

      /**
       * Style the provided item as selected.
       * @param {jQuery} item The TreeView item element.
       * @private
       */
      _setSelected: function (item) {
        this._getItemContent(item).addClass('oj-selected');
        item.attr('aria-selected', 'true');
      },

      /**
       * Style the provided item as unselected.
       * @param {jQuery} item The TreeView item element.
       * @private
       */
      _setUnselected: function (item) {
        this._getItemContent(item).removeClass('oj-selected');
        item.attr('aria-selected', 'false');
      },

      /**
       * Clears the selection of all items.
       * @private
       */
      _clearSelection: function () {
        this._setUnselected(this._getItems());
      },

      /**
       * Sets the focus (current item) on the provided item element.
       * @param {jQuery} item The TreeView item element.
       * @param {Event} event The event that triggers the focus.
       * @private
       */
      _focus: function (item, event) {
        // Check whether the item is focusable
        if (!this._isActionable(item, 'focus')) {
          return;
        }

        if (event) {
          var payload = this._getEventPayload(item);
          if (this._currentItem) {
            payload.previousKey = this._getKey(this._currentItem);
            payload.previousItem = this._currentItem[0];
          }

          var cancelled = !this._trigger('beforeCurrentItem', event, payload);
          if (cancelled) {
            return;
          }

          // Update option and fire optionChange
          this._userOptionChange('currentItem', this._getKey(item), event);
        }

        this._focusOutHandler(this._getItemContent(this._currentItem));
        this._focusInHandler(this._getItemContent(item));
        this._setCurrentItem(item);
      },

      /**
       * Resets the focus (current item) of the TreeView.
       * @private
       */
      _resetFocus: function () {
        if (this.options.currentItem) {
          var currentItem = this._getItemByKey(this.options.currentItem);
          if (currentItem.length > 0) {
            this._setCurrentItem(currentItem);
            return;
          }
        }

        // CurrentItem not specified, so default to the first item.
        // Update the option so the currentItem attribute is in sync.
        var firstItem = this._getItems().first();
        this._setCurrentItem(firstItem);
        this._userOptionChange('currentItem', this._getKey(this._currentItem), null);
      },

      /**
       * Set the provided item as the current item.
       * @param {jQuery} item The TreeView item element.
       * @private
       */
      _setCurrentItem: function (item) {
        this._currentItem = item;

        // Set the item content to be the activedescendant so that the screen reader
        // does not read the child items.
        this._getRoot().attr('aria-activedescendant', this._getKey(item));
      },

      /**
       * Adds a busy state.
       * @param {string} description The description of the busy state.
       * @return {Function} The resolve function of the busy state.
       * @private
       */
      _addBusyState: function (description) {
        var busyContext = Context.getContext(this.element[0]).getBusyContext();
        var id = this.element.attr('id');
        return busyContext.addBusyState({
          description: "The component identified by '" + id + "', " + description
        });
      },

      /**
       * Writes back a user-triggered change into the option.
       * @param {string} key The option name.
       * @param {Object} value The new value of the option.
       * @param {Event} event The event that triggers the change.
       * @private
       */
      _userOptionChange: function (key, value, event) {
        this.option(key, value, {
          _context: { originalEvent: event, writeback: true, internalSet: true }
        });
      },

      /**
       * Returns the dnd.drag.items option.
       * @return {Object} The option object. Defaults to {}.
       * @private
       */
      _getDragOptions: function () {
        return ((this.options.dnd || {}).drag || {}).items || {};
      },

      /**
       * Returns the dnd.drop.items option.
       * @return {Object} The option object. Defaults to {}.
       * @private
       */
      _getDropOptions: function () {
        return ((this.options.dnd || {}).drop || {}).items || {};
      },

      /**
       * Returns the closest item to the element.
       * @param {jQuery} elem The element.
       * @return {jQuery} The item content element.
       * @private
       */
      _getClosestItem: function (elem) {
        return elem.closest('.oj-treeview-item');
      },

      /**
       * Returns the closest item content to the element.
       * @param {jQuery} elem The element.
       * @return {jQuery} The item content element.
       * @private
       */
      _getClosestItemContent: function (elem) {
        return elem.closest('.oj-treeview-item-content');
      },

      /**
       * Returns the closest disclosure icon to the element.
       * @param {jQuery} elem The element.
       * @return {jQuery} The disclosure icon element.
       * @private
       */
      _getClosestDisclosureIcon: function (elem) {
        return elem.closest('.oj-treeview-disclosure-icon');
      },

      /**
       * Handles click event.
       * @param {Event} event The event.
       * @private
       */
      _handleClick: function (event) {
        var item;
        // Clicking on disclosure icon
        var disclosureIcon = this._getClosestDisclosureIcon($(event.target));
        if (disclosureIcon.length > 0) {
          item = disclosureIcon.closest('.oj-treeview-item');
          if (this._isExpanded(item)) {
            this._collapse(item, true, event);
          } else {
            this._expand(item, true, event);
          }
          this.touchStartEvent = null;
          return;
        }

        // Clicking on item content
        var itemContent = this._getClosestItemContent($(event.target));
        if (itemContent.length > 0) {
          item = itemContent.parent();
          this._select(item, event);
          this._focus(item, event);
          this.touchStartEvent = null;
          return;
        }

        // Clear selection otherwise
        var selectionMode = this.options.selectionMode;
        if (selectionMode !== 'none') {
          this._clearSelection();
          this._lastSelectedItem = null;
          this._userOptionChange('selection', [], event);
        }

        this.touchStartEvent = null;
      },

      /**
       * Handles mouse over event.
       * @param {Event} event The event.
       * @private
       */
      _handleMouseOver: function (event) {
        // Don't add hover effect for touch
        if (oj.DomUtils.isTouchSupported() && this.touchStartEvent) {
          return;
        }

        var target = this._getClosestDisclosureIcon($(event.target));

        if (target.length === 0) {
          target = this._getClosestItemContent($(event.target));
        }

        // Add hover effect
        target.removeClass('oj-default');
        target.addClass('oj-hover');
      },

      /**
       * Handles mouse out event.
       * @param {Event} event The event.
       * @private
       */
      _handleMouseOut: function (event) {
        var target = this._getClosestDisclosureIcon($(event.target));
        target.removeClass('oj-selected');

        if (target.length === 0) {
          target = this._getClosestItemContent($(event.target));
        }

        // Remove hover effect
        target.addClass('oj-default');
        target.removeClass('oj-hover');
      },

      /**
       * Handles mouse down event.
       * @param {Event} event The event.
       * @private
       */
      _handleMouseDown: function (event) {
        var disclosureIcon = this._getClosestDisclosureIcon($(event.target));
        disclosureIcon.addClass('oj-selected');
      },

      /**
       * Handles mouse up event.
       * @param {Event} event The event.
       * @private
       */
      _handleMouseUp: function (event) {
        var disclosureIcon = this._getClosestDisclosureIcon($(event.target));
        disclosureIcon.removeClass('oj-selected');
      },

      /**
       * Handles key down event.
       * @param {Event} event The event.
       * @private
       */
      _handleKeyDown: function (event) {
        var keyCode = event.keyCode;
        var currentItem = this._currentItem;
        var nextItem;

        if (keyCode === 38 || keyCode === 40) { // UP or DOWN
          nextItem = (keyCode === 40) ? this._getNextActionableItem(currentItem, 'focus') :
            this._getPreviousActionableItem(currentItem, 'focus');
          if (nextItem) {
            event.preventDefault(); // prevent scrolling the page
            if (this._isSelected(currentItem) && event.shiftKey) {
              // Shift+Up/Down either extends the selection to the next item or cancels previous Shift+Down/Up
              this._select(this._isSelected(nextItem) ? currentItem : nextItem, event);
            }
            this._focus(nextItem, event);
          }
        } else if (keyCode === 37 || keyCode === 39) { // LEFT or RIGHT
          var isRTL = this._GetReadingDirection() === 'rtl';
          var isEnd = (!isRTL && keyCode === 39) || (isRTL && keyCode === 37);

          if (isEnd && !this._isLeaf(currentItem) && !this._isExpanded(currentItem)) {
            event.preventDefault(); // prevent scrolling the page
            this._expand(currentItem, true, event);
          } else if (!isEnd && !this._isLeaf(currentItem) && this._isExpanded(currentItem)) {
            event.preventDefault(); // prevent scrolling the page
            this._collapse(currentItem, true, event);
          } else {
            nextItem = isEnd ? this._getNextActionableItem(currentItem, 'focus') :
              this._getPreviousActionableItem(currentItem, 'focus');
            if (nextItem) {
              event.preventDefault(); // prevent scrolling the page
              this._focus(nextItem, event);
            }
          }
        } else if (keyCode === 13 || keyCode === 32) { // ENTER or SPACE
          event.preventDefault(); // prevent scrolling the page
          this._select(currentItem, event);
        }
      },

      /**
       * Returns the item below the provided item.
       * @param {jQuery} item The TreeView item element.
       * @return {jQuery} The next item element.
       * @private
       */
      _getNextItem: function (item) {
        // If the item is expanded, go to the first child
        if (!this._isLeaf(item) && this._isExpanded(item)) {
          var firstChild = this._getChildItems(item).first();
          if (firstChild.length > 0) {
            return firstChild;
          }
        }

        // Otherwise, go to the next sibling of the item or its ancestors
        var parent = item;
        while (parent.length > 0) {
          var nextSibling = parent.next('.oj-treeview-item');
          if (nextSibling.length > 0) {
            return nextSibling;
          }

          parent = this._getParentItem(parent);
        }

        // Otherwise, don't go anywhere
        return null;
      },

      /**
       * Returns the closest item below the provided item that can accept the specified action.
       * @param {jQuery} item The TreeView item element.
       * @param {string} actionName The action name: 'select' or 'focus'.
       * @return {jQuery} The next item element.
       * @private
       */
      _getNextActionableItem: function (item, actionName) {
        while (item != null) {
          // eslint-disable-next-line no-param-reassign
          item = this._getNextItem(item);
          if (item != null && this._isActionable(item, actionName)) {
            return item;
          }
        }
        return null;
      },

      /**
       * Returns the item above the provided item.
       * @param {jQuery} item The TreeView item element.
       * @return {jQuery} The previous item element.
       * @private
       */
      _getPreviousItem: function (item) {
        // Go to the last expanded child of the previous sibling
        var prevSibling = item.prev('.oj-treeview-item');
        while (prevSibling.length > 0) {
          if (!this._isLeaf(prevSibling) && this._isExpanded(prevSibling)) {
            var lastChild = this._getChildItems(prevSibling).last();
            if (lastChild.length > 0) {
              prevSibling = lastChild;
            } else {
              return prevSibling;
            }
          } else {
            return prevSibling;
          }
        }

        // Otherwise, go to the parent
        var parent = this._getParentItem(item);
        if (parent.length > 0) {
          return parent;
        }

        // Otherwise, don't go anywhere
        return null;
      },

      /**
       * Returns the closest item above the provided item that can accept the specified action.
       * @param {jQuery} item The TreeView item element.
       * @param {string} actionName The action name: 'select' or 'focus'.
       * @return {jQuery} The previous item element.
       * @private
       */
      _getPreviousActionableItem: function (item, actionName) {
        while (item != null) {
          // eslint-disable-next-line no-param-reassign
          item = this._getPreviousItem(item);
          if (item != null && this._isActionable(item, actionName)) {
            return item;
          }
        }
        return null;
      },

      /**
       * Handles DnD dragStart event.
       * @param {Event} event The event.
       * @private
       */
      _handleDragStart: function (event) {
        var self = this;
        var isRTL = this._GetReadingDirection() === 'rtl';

        var targetItem = this._getClosestItem($(event.target));
        if (targetItem.length === 0) {
          return;
        }

        var i;
        var items = $();
        if (!this._isSelected(targetItem)) {
          this._select(targetItem, event);
          items = items.add(targetItem);
        } else {
          var selection = this.options.selection;
          for (i = 0; i < selection.length; i++) {
            items = items.add(this._getItemByKey(selection[i]));
          }
        }

        // TODO: static HTML needs to pass parent innerHTML for data
        var dragOptions = this._getDragOptions();
        var dataTransfer = event.originalEvent.dataTransfer;

        var dragImage = $(document.createElement('ul')).addClass('oj-treeview-drag-image oj-treeview-list');
        if (oj.AgentUtils.getAgentInfo().browser === oj.AgentUtils.BROWSER.SAFARI) {
          // On Safari, the drag image is not rendered if the position is fixed.
          // If we set {position: absolute; top: -10000px}, it should theoretically
          // work for all browsers (as it does for table and listview), but it
          // causes the treeview to blink frantically if you drag an unselected
          // item on Chrome. When an unselected item is dragged, the treeview applies
          // selection effect to it, but Chrome somehow doesn't like modifying the
          // DOM and setting drag image at the same time if the drag image has absolute
          // position and negative top (I tested that positive top is fine, but positive
          // top adds a scrollbar on IE). This issue never happens on table and
          // listview because they don't allow dragging unselected items.
          dragImage.css('position', 'absolute');
        }

        var dragData = [];
        var topmost = Infinity;
        var leftmost = Infinity;

        items.each(function () {
          var item = $(this);
          dragData.push(item.data('data'));

          // Clone the item for the drag image and match the offset of the original item.
          // For RTL, we have to use the left offset of the item content because the
          // left offset of the li is always zero due to the li filling up the entire line.
          var offset = item.offset();
          if (isRTL) {
            offset.left = self._getItemContent(item).offset().left;
          }

          var clonedItem = item.clone().css({
            top: offset.top,
            left: offset.left
          });

          // Don't include children in the drag image
          self._getSubtree(clonedItem).remove();

          // Drag image offset is based on the top left corner of the resulting drag image
          if (offset.top < topmost) {
            topmost = offset.top;
          }
          if (offset.left < leftmost) {
            leftmost = offset.left;
          }

          dragImage.append(clonedItem); // @HTMLUpdateOK
        });

        // : There's inconsistency in how the drag image offset is computed
        // for the native DnD impl and the polyfill. In the native impl, the offset is
        // relative to the top-left corner of the rendered drag image element. In the
        // polyfill, the offset is relative to the {top: 0, left: 0} position. To
        // reconcile this, we must make sure that the top-left corner of the rendered
        // drag image element is at the {top: 0, left: 0} position.
        dragImage.children().each(function () {
          $(this).css({
            top: parseFloat($(this).css('top')) - topmost,
            left: parseFloat($(this).css('left')) - leftmost
          });
        });

        var optionTypes = dragOptions.dataTypes;
        var dragDataTypes = (typeof optionTypes === 'string') ? [optionTypes] : (optionTypes || []);
        for (i = 0; i < dragDataTypes.length; i++) {
          dataTransfer.setData(dragDataTypes[i], JSON.stringify(dragData));
        }

        // Drag image has to be attached to the DOM when being assigned to the dataTransfer.
        // It has to be removed afterwards to prevent leaks.
        $('body').append(dragImage); // @HTMLUpdateOK
        dataTransfer.setDragImage(dragImage[0], event.pageX - leftmost, event.pageY - topmost);
        setTimeout(function () {
          dragImage.remove();
        }, 0);

        var callback = dragOptions.dragStart;
        if (callback) {
          callback(event.originalEvent, { items: dragData });
        }
      },

      /**
       * Handles DnD drag and dragEnd events.
       * @param {Event} event The event.
       * @param {string} eventType The event type (drag or dragEnd).
       * @private
       */
      _handleDragSourceEvent: function (event, eventType) {
        var callback = this._getDragOptions()[eventType];
        if (callback) {
          callback(event.originalEvent);
        }
      },

      /**
       * Handles DnD dragEnter, dragOver, dragLeave, and drop events.
       * @param {Event} event The event.
       * @param {string} eventType The event type (dragEnter, dragOver, dragLeave, or drop).
       * @private
       */
      _handleDropTargetEvent: function (event, eventType) {
        var dropOptions = this._getDropOptions();
        var optionTypes = dropOptions.dataTypes;
        var dropDataTypes = typeof optionTypes === 'string' ? [optionTypes] : (optionTypes || []);
        var callback = dropOptions[eventType];
        var targetItem = $(event.target).closest('.oj-treeview-item');

        // Position drop effects based on the spacer (disclosure icon) because it takes up the entire item height
        var spacer = targetItem.children('.oj-treeview-spacer')[0];
        var spacerRect = spacer.getBoundingClientRect();
        var spacerTop = spacer.offsetTop;
        var spacerLeft = spacer.offsetLeft;
        var middleY = spacerTop + (spacerRect.height / 2);

        var position = 'inside';
        var relativeY = event.pageY - spacerRect.top;
        if (relativeY < 0.25 * spacerRect.height) {
          position = 'before';
        } else if (relativeY > 0.75 * spacerRect.height) {
          position = this._isExpanded(targetItem) ? 'first' : 'after';
        }

        if (callback) {
          callback(event.originalEvent, { item: targetItem[0], position: position });
        }

        for (var i = 0; i < dropDataTypes.length; i++) {
          var dataTypes = event.originalEvent.dataTransfer.types;
          if (dataTypes && dataTypes.indexOf(dropDataTypes[i]) >= 0) {
            event.preventDefault();
            break;
          }
        }

        if ((eventType === 'dragEnter' || eventType === 'dragOver') &&
            event.originalEvent.defaultPrevented) {
          var isRTL = this._GetReadingDirection() === 'rtl';

          // Draw the drop target effect on dragEnter and dragOver
          var dropLineTop = middleY;
          var dropLineLeft = isRTL ?
              (spacerLeft - this._dropLineRect.width) :
              spacerLeft + spacerRect.width;

          // Align the drop marker with the disclosure icon (spacer)
          var dropMarkerTop = middleY - (this._dropMarkerRect.height / 2);
          var dropMarkerLeft = (spacerLeft + (spacerRect.width / 2)) -
              (this._dropMarkerRect.width / 2);

          if (position === 'before') {
            dropMarkerTop -= spacerRect.height / 2;
            dropLineTop -= spacerRect.height / 2;
          } else if (position === 'after' || position === 'first') {
            dropMarkerTop += spacerRect.height / 2;
            dropLineTop += spacerRect.height / 2;

            if (position === 'first') {
              // Align with the child items
              var spacerOffset = (isRTL ? -1 : 1) * spacerRect.width;
              dropMarkerLeft += spacerOffset;
              dropLineLeft += spacerOffset;
            }
          }

          this._dropMarker.css('top', dropMarkerTop + 'px').css('left', dropMarkerLeft + 'px').show();

          if (position !== 'inside') {
            this._dropLine.css('top', dropLineTop + 'px').css('left', dropLineLeft + 'px').show();
          } else {
            this._dropLine.hide();
          }
        } else {
          // Remove the drop target effect on dragLeave and drop
          this._dropMarker.hide();
          this._dropLine.hide();
        }
      },

      // @inheritdoc
      _NotifyContextMenuGesture: function (menu, event, eventType) {
        if (eventType === 'keyboard') {
          // If launched by Shift+F10, the context menu should be rendered next
          // to the currentItem.
          var launcher = this._currentItem ? this._getItemContent(this._currentItem) : this.element;
          var openOptions = {
            launcher: launcher,
            initialFocus: 'menu',
            position: { my: 'start top', at: 'start bottom', of: launcher }
          };
          this._OpenContextMenu(event, eventType, openOptions);
        } else {
          this._superApply(arguments);
        }
      },

      // @inheritdoc
      refresh: function () {
        this._super();
        this._refreshId += 1;

        delete this.m_template;
        delete this.m_engine;
        delete this.m_dataSource;

        this._render();
      },

      // @inheritdoc
      getNodeBySubId: function (locator) {
        if (locator == null) {
          return this.element ? this.element[0] : null;
        }

        var key = locator.key;
        var subId = locator.subId;
        var item = this._getItemByKey(key);
        var ret;

        if (subId === 'oj-treeview-disclosure') {
          ret = item.children('.oj-treeview-disclosure-icon')[0];
        } else if (subId === 'oj-treeview-item') {
          ret = item.children('.oj-treeview-item-content')[0];
        }

        // Non-null locators have to be handled by the component subclasses
        return ret || null;
      },

      // @inheritdoc
      getSubIdByNode: function (node) {
        if (!$.contains(this.element[0], node)) {
          return null;
        }

        var subId;
        var disclosureIcon = this._getClosestDisclosureIcon($(node));
        var item = this._getClosestItem($(node));

        if (disclosureIcon.length > 0) {
          subId = 'oj-treeview-disclosure';
        } else if (item.length > 0) {
          subId = 'oj-treeview-item';
        } else {
          return null;
        }

        return { subId: subId, key: this._getKey(item) };
      },

      /**
       * {@ojinclude "name":"nodeContextDoc"}
       * @param {!Element} node - {@ojinclude "name":"nodeContextParam"}
       * @returns {Object|null} {@ojinclude "name":"nodeContextReturn"}
       *
       * @example {@ojinclude "name":"nodeContextExample"}
       *
       * @expose
       * @instance
       * @memberof oj.ojTreeView
       * @ojshortdesc Returns an object with context for the given child DOM node. See the Help documentation for more information.
       */
      getContextByNode: function (node) {
        if (!$.contains(this.element[0], node)) {
          return null;
        }

        var item = this._getClosestItem($(node));
        if (item.length < 1) {
          return null;
        }

        var context = {};
        context.subId = 'oj-treeview-item';
        context.index = item.parent().children('.oj-treeview-item').index(item);
        context.parentKey = this._getKey(this._getParentItem(item));

        context.component = Components.__GetWidgetConstructor(this.element);
        if (this._FixRendererContext) {
          context = this._FixRendererContext(context);
        }

        var metadata = item.data('metadata');
        if (metadata) {
          context.data = item.data('data');
          context.datasource = this.options.data;

          // Merge properties from metadata into item context
          // Contains key, leaf, and depth
          var props = Object.keys(metadata);
          for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            context[prop] = metadata[prop];
          }
        } else {
          // Static content
          context.key = this._getKey(item);
          context.leaf = this._isLeaf(item);
          context.depth = item.parents('.oj-treeview-list').length;
        }

        return context;
      },

      // @inheritdoc
      // eslint-disable-next-line no-unused-vars
      _setOption: function (key, value, flags) {
        var self = this;

        // Call the super to update the property values
        this._superApply(arguments);

        if (key === 'expanded') {
          this._uiExpanded = self._uiExpanded.clear();
          this._getItems().each(function () {
            var item = $(this);
            if (self._isInitExpanded(item)) {
              self._expand(item, true);
            } else {
              self._collapse(item, true);
            }
          });
        } else if (key === 'selection') {
          this._getItems().each(function () {
            var item = $(this);
            self._select(item);
          });
        } else if (key === 'currentItem') {
          this._resetFocus();
        } else {
          this.refresh();
        }
      },
      _SetupResources: function () {
        this._super();
        this._addDataProviderEventListeners();
      },
      _ReleaseResources: function () {
        this._super();
        this._removeDataProviderEventListeners();
      },
      // @inheritdoc
      _destroy: function () {
        // TODO
        this._removeDataProviderEventListeners();
        // Call super at the end for destroy.
        this._super();
      },
      _addDataProviderEventListeners: function () {
        var dataProvider = this.options.data;
        if (dataProvider &&
          oj.DataProviderFeatureChecker.isTreeDataProvider(dataProvider)) {
          this.m_handleModelMutateEventListener = this.handleModelMutateEvent.bind(this);
          this.m_handleModelRefreshEventListener = this.handleModelRefreshEvent.bind(this);

          dataProvider.addEventListener('mutate', this.m_handleModelMutateEventListener);
          dataProvider.addEventListener('refresh', this.m_handleModelRefreshEventListener);
        }
      },
      _removeDataProviderEventListeners: function () {
        var dataProvider = this.options.data;
        if (dataProvider && oj.DataProviderFeatureChecker.isTreeDataProvider(dataProvider)) {
          dataProvider.removeEventListener('mutate', this.m_handleModelMutateEventListener);
          dataProvider.removeEventListener('refresh', this.m_handleModelRefreshEventListener);
        }
      },
      handleModelMutateEvent: function (event) {
        if (event.detail.remove != null) {
          this.handleModelRemoveEvent(event);
        }
        if (event.detail.add != null) {
          this.handleModelAddEvent(event);
        }
        if (event.detail.update != null) {
          this.handleModelChangeEvent(event);
        }
      },
      handleModelRemoveEvent: function (event) {
        var self = this;
        var keys = event.detail.remove.keys;
        var removedKeys = [];
        if (keys == null || keys.size === 0) {
          return;
        }

        keys.forEach(function (key) {
          removedKeys = removedKeys.concat(self._removeAllChildrenOfParentKey(key));
        });

        // checks whether the removed item is selected, and adjust the value as needed
        var selected = this.options.selected;
        if (selected != null) {
          var newSelected = selected.delete(removedKeys);
          // update selection option if it did changed
          if (selected !== newSelected) {
            this._userOptionChange('selection', newSelected, null);
          }
        }

        // checks whether the removed item is expanded, and adjust the value as needed
        var expanded = this.options.expanded;
        if (expanded != null) {
          var newExpanded = expanded.delete(removedKeys);
          this._uiExpanded.delete(removedKeys);
          // update selection option if it did changed
          if (expanded !== newExpanded) {
            this._userOptionChange('expanded', newExpanded, null);
          }
        }

        this._resetFocus();
      },
      _removeAllChildrenOfParentKey: function (key) {
        var self = this;
        var removedKeys = [];
        var elem = this._getItemByKey(key);
        var children = this._getChildItems(elem);
        children.each(function (index, child) {
          var childkey = self._getKey($(child));
          var childKeys = self._removeAllChildrenOfParentKey(childkey);
          removedKeys = removedKeys.concat(childKeys);
        });
        elem[0].parentNode.removeChild(elem[0]);
        this._keyList.delete(key);
        removedKeys.push(key);
        return removedKeys;
      },
      handleModelAddEvent: function (event) {
        var addEvent = event.detail.add;
        var data = addEvent.data;
        var metadata = addEvent.metadata;
        var keys = [];
        var afterKeys;
        var parentKeys = addEvent.parentKeys;
        var indexes = addEvent.indexes;
        addEvent.keys.forEach(function (key) {
          keys.push(key);
        });
        // afterKeys is deprecated, but continue to support it until we can remove it.
        // forEach can be called on both array and set.
        var afterKeyIter = addEvent.addBeforeKeys ? addEvent.addBeforeKeys : addEvent.afterKeys;
        if (afterKeyIter) {
          afterKeys = [];
          afterKeyIter.forEach(function (key) {
            afterKeys.push(key);
          });
        }

        if (data != null && keys != null && keys.length > 0 && data.length > 0 &&
          keys.length === data.length && (indexes == null || indexes.length === data.length)) {
          for (var i = 0; i < data.length; i++) {
            var index = (indexes == null) ? this._getIndex(afterKeys, i) + 1 : indexes[i];
            var parentKey = parentKeys[i];
            var subtree;
            if (parentKey == null) {
              subtree = this._getRoot();
              this._renderItem(subtree, { data: [data[i]], metadata: [metadata[i]] }, 0, index);
            } else if (this._isInitExpanded(parentKey)) {
              var parentItem = this._getItemByKey(parentKey);
              subtree = this._getSubtree();
              if (subtree.length === 0) {
                subtree = $(document.createElement('ul'))
                .addClass('oj-treeview-list')
                .attr('role', 'group')
                .appendTo(parentItem);
              }
              this._renderItem(subtree, { data: [data[i]], metadata: [metadata[i]] }, 0, index);
            }
          }
        }
      },
      handleModelChangeEvent: function (event) {
        var changeEvent = event.detail.update;
        var data = changeEvent.data;
        var metadata = changeEvent.metadata;
        var keys = changeEvent.keys;

        for (var i = 0; i < data.length; i++) {
          var elem = this._getItemByKey(keys[i]);
          if (elem != null) {
            this._renderItem(null, { data: [data[i]], metadata: [metadata[i]] }, 0, null, true);
          }
        }

        this._resetFocus();
      },
      handleModelRefreshEvent: function () {
        this.refresh();
      }
    });
}());

// Fragments
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
 *       <td rowspan="2">Item</td>
 *       <td><kbd>Tap</kbd></td>
 *       <td>Focus on the item. If <code class="prettyprint">selectionMode</code> is enabled, selects the item as well.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Press & Hold</kbd></td>
 *       <td>Display context menu</td>
 *     </tr>
 *     <tr>
 *       <td>Disclosure Icon</td>
 *       <td><kbd>Tap</kbd></td>
 *       <td>Expand or collapse the item.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @ojfragment touchDoc - Used in touch gesture section of classdesc, and standalone gesture doc
 * @memberof oj.ojTreeView
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
 *       <td><kbd>Tab</kbd></td>
 *       <td>Navigates to next focusable element on page.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift+Tab</kbd></td>
 *       <td>Navigates to previous focusable element on page.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>DownArrow</kbd></td>
 *       <td>Moves focus to the item below.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>UpArrow</kbd></td>
 *       <td>Moves focus to the item above.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>LeftArrow</kbd></td>
 *       <td>On an expanded item, collapses the item. Otherwise, move focus to the item above. The action is swapped with <kbd>RightArrow</kbd> in RTL locales.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>RightArrow</kbd></td>
 *       <td>On a collapsed item, expands the item. Otherwise, move focus to the item above. The action is swapped with <kbd>LeftArrow</kbd> in RTL locales.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift+DownArrow</kbd></td>
 *       <td>Extends the selection to the item below. Only applicable if the multiple selection is enabled.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift+UpArrow</kbd></td>
 *       <td>Extends the selection to the item above. Only applicable if the multiple selection is enabled.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Space</kbd></td>
 *       <td>Toggles the selection of the current item and deselects the other items.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Enter</kbd></td>
 *       <td>Selects the current item and deselects the other items. No op if the current item is already selected.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Ctrl+Space/Enter</kbd></td>
 *       <td>Toggles the selection of the current item while maintaining previously selected items. Only applicable if the multiple selection is enabled.</td>
 *     </tr>
 *     <tr>
 *       <td><kbd>Shift+Space/Enter</kbd></td>
 *       <td>Selects contiguous items from the last selected item to the current item. Only applicable if the multiple selection is enabled.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @ojfragment keyboardDoc - Used in keyboard section of classdesc, and standalone gesture doc
 * @memberof oj.ojTreeView
 */

// ////////////////     SUB-IDS     //////////////////

/**
 * <p>Sub-ID for TreeView items. See the <a href="#getNodeBySubId">getNodeBySubId</a>
 * method for details.</p>
 *
 * @ojsubid oj-treeview-item
 * @memberof oj.ojTreeView
 *
 * @example <caption>Get the item with key 'foo':</caption>
 * var item = myTreeView.getNodeBySubId({'subId': 'oj-treeview-item', 'key': 'foo'});
 */

/**
 * <p>Sub-ID for TreeView disclosure icons. See the <a href="#getNodeBySubId">getNodeBySubId</a>
 * method for details.</p>
 *
 * @ojsubid oj-treeview-disclosure
 * @memberof oj.ojTreeView
 *
 * @example <caption>Get the disclosure icon for the non-leaf item with key 'foo':</caption>
 * var item = myTreeView.getNodeBySubId({'subId': 'oj-treeview-disclosure', 'key': 'foo'});
 */

/**
 * <p>Context for TreeView items.</p>
 *
 * @property {Element} componentElement The TreeView element.
 * @property {Object} data The data object for the item (not available for static content).
 * @property {oj.TreeDataProvider|oj.TreeDataSource} datasource A reference to the data source object (not available for static content).
 * @property {number} depth The depth of the item. The depth of the first level children under the invisible root is 1.
 * @property {number} index The index of the item relative to its parent, where 0 is the index of the first item.
 * @property {Object} key the key of the item.
 * @property {boolean} leaf Whether the item is a leaf item.
 * @property {Object} parentKey The key of the parent item. The parent key is null for root item.
 * @ojsignature [{target:"Type", value:"oj.TreeDataProvider|oj.TreeDataSource", for:"datasource", consumedBy:"js"},
 *               {target:"Type", value:"oj.TreeDataProvider", for:"datasource", consumedBy:"ts"}]
 *
 * @ojnodecontext oj-treeview-item
 * @memberof oj.ojTreeView
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
 *       <td>oj-treeview-item-text</td>
 *       <td>Use this class on the span providing the item text in the static markup or the item renderer or template slot.</td>
 *     </tr>
 *     <tr>
 *       <td>oj-treeview-item-icon</td>
 *       <td>Use this class on the span providing the item icon in the static markup or the item renderer or template slot.</td>
 *     </tr>
 *   </tbody>
 * </table>
 *
 * @ojfragment stylingDoc - Used in Styling section of classdesc, and standalone Styling doc
 * @memberof oj.ojTreeView
 */

// Slots

/**
 * <p>The <code class="prettyprint">itemTemplate</code> slot is used to specify the template for rendering each item in the list. The slot must be a &lt;template> element.
 * The content of the template could either include the &lt;li> element, in which case that will be used as
 * the root of the item.  Or it can be just the content which excludes the &lt;li> element.</p>
 * <p>When the template is executed for each item, it will have access to the binding context containing the following properties:</p>
 * <ul>
 *   <li>$current - an object that contains information for the current item. (See the table below for a list of properties available on $current)</li>
 *   <li>alias - if as attribute was specified, the value will be used to provide an application-named alias for $current.</li>
 * </ul>
 * @ojstatus preview
 * @ojslot itemTemplate
 * @ojshortdesc The itemTemplate slot is used to specify the template for rendering each item in the tree. See the Help documentation for more information.
 * @ojmaxitems 1
 * @memberof oj.ojTreeView
 * @property {Element} componentElement The &lt;oj-tree-view> custom element
 * @property {Object} data The data for the current item being rendered
 * @property {number} index The zero-based index of the curent item
 * @property {any} key The key of the current item being rendered
 * @property {number} depth The depth of the current item being rendered. The depth of the first level children under the invisible root is 1.
 * @property {boolean} leaf True if the current item is a leaf node.
 * @property {any} parentkey The key of the parent item. The parent key is null for root nodes.
 *
 * @example <caption>Initialize the TreeView with an inline item template specified:</caption>
 * &lt;oj-tree-view>
 *   &lt;template slot='itemTemplate'>
 *     &lt;span>&lt;oj-bind-text value='[[$current.data.name]]'>&lt;/span>
 *   &lt;template>
 * &lt;/oj-tree-view>
 */

/* global __oj_tree_view_metadata:false */
(function () {
  __oj_tree_view_metadata.extension._WIDGET_NAME = 'ojTreeView';
  oj.CustomElementBridge.register('oj-tree-view', { metadata: __oj_tree_view_metadata });
}());

});