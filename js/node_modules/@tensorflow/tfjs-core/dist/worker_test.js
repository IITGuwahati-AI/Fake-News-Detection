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
var tf = require("./index");
var jasmine_util_1 = require("./jasmine_util");
var test_util_1 = require("./test_util");
var fn2workerURL = function (fn) {
    var blob = new Blob(['(' + fn.toString() + ')()'], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
};
// The source code of a web worker.
var workerTest = function () {
    //@ts-ignore
    importScripts('http://bs-local.com:12345/base/dist/tf-core.min.js');
    var a = tf.tensor1d([1, 2, 3]);
    var b = tf.tensor1d([3, 2, 1]);
    a = a.add(b);
    //@ts-ignore
    self.postMessage({ data: a.dataSync() });
};
jasmine_util_1.describeWithFlags('computation in worker', jasmine_util_1.HAS_WORKER, function () {
    it('tensor in worker', function (done) {
        var worker = new Worker(fn2workerURL(workerTest));
        worker.onmessage = function (msg) {
            var data = msg.data.data;
            test_util_1.expectArraysClose(data, [4, 4, 4]);
            done();
        };
    });
});
//# sourceMappingURL=worker_test.js.map