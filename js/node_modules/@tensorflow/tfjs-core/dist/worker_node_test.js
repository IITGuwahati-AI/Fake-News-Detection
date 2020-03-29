"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var jasmine_util_1 = require("./jasmine_util");
var test_util_1 = require("./test_util");
// tslint:disable:no-require-imports
var fn2String = function (fn) {
    var funcStr = '(' + fn.toString() + ')()';
    return funcStr;
};
// The source code of a web worker.
var workerTestNode = function () {
    // Web worker scripts in node live relative to the CWD, not to the dir of the
    // file that spawned them.
    var tf = require('./dist/index.js');
    var parentPort = require('worker_threads').parentPort;
    var a = tf.tensor1d([1, 2, 3]);
    var b = tf.tensor1d([3, 2, 1]);
    a = a.add(b);
    parentPort.postMessage({ data: a.dataSync() });
};
jasmine_util_1.describeWithFlags('computation in worker (node env)', jasmine_util_1.HAS_NODE_WORKER, function () {
    it('tensor in worker', function (done) {
        var Worker = require('worker_threads').Worker;
        var worker = new Worker(fn2String(workerTestNode), { eval: true });
        // tslint:disable-next-line:no-any
        worker.on('message', function (msg) {
            var data = msg.data;
            test_util_1.expectArraysClose(data, [4, 4, 4]);
            done();
        });
    });
});
//# sourceMappingURL=worker_node_test.js.map