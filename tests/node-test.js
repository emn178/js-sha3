expect = require('expect.js');
Worker = require('webworker-threads').Worker;

function unset() {
  delete require.cache[require.resolve('../src/sha3.js')];
  delete require.cache[require.resolve('./test.js')];
  sha3_512 = null;
  sha3_384 = null;
  sha3_256 = null;
  sha3_224 = null;
  keccak512 = null;
  keccak384 = null;
  keccak256 = null;
  keccak224 = null;
  shake128 = null;
  shake256 = null;
  kmac128 = null;
  kmac256 = null;
  BUFFER = undefined;
  JS_SHA3_NO_WINDOW = undefined;
  JS_SHA3_NO_NODE_JS = undefined;
  JS_SHA3_NO_COMMON_JS = undefined;
  JS_SHA3_NO_ARRAY_BUFFER = undefined;
  JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW = undefined;
  window = undefined;
}

function requireToGlobal() {
  var sha3 = require('../src/sha3.js');
  keccak512 = sha3.keccak512;
  keccak384 = sha3.keccak384;
  keccak256 = sha3.keccak256;
  keccak224 = sha3.keccak224;
  sha3_512 = sha3.sha3_512;
  sha3_384 = sha3.sha3_384;
  sha3_256 = sha3.sha3_256;
  sha3_224 = sha3.sha3_224;
  shake128 = sha3.shake128;
  shake256 = sha3.shake256;
  cshake128 = sha3.cshake128;
  cshake256 = sha3.cshake256;
  kmac128 = sha3.kmac128;
  kmac256 = sha3.kmac256;
}

function runCommonJsTest() {
  requireToGlobal();
  require('./test.js');
  unset();
}

function runWindowTest(extra) {
  window = global;
  require('../src/sha3.js');
  require('./test.js');
  if (extra) {
    require('./test-shake.js');
    require('./test-cshake.js');
    require('./test-kmac.js');
  }
  unset();
}

// Node.js env
BUFFER = true;
runCommonJsTest();

// Webpack browser env
JS_SHA3_NO_NODE_JS = true;
window = global;
runCommonJsTest();

// browser env
JS_SHA3_NO_NODE_JS = true;
JS_SHA3_NO_COMMON_JS = true;
runWindowTest(true);

// browser env and no array buffer
JS_SHA3_NO_NODE_JS = true;
JS_SHA3_NO_COMMON_JS = true;
JS_SHA3_NO_ARRAY_BUFFER = true;
runWindowTest();

// browser env and no isView
JS_SHA3_NO_NODE_JS = true;
JS_SHA3_NO_COMMON_JS = true;
JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW = true;
runWindowTest();

// browser AMD
JS_SHA3_NO_NODE_JS = true;
JS_SHA3_NO_COMMON_JS = true;
JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW = false;
window = global;
define = function (func) {
  sha3 = func();
  keccak512 = sha3.keccak512;
  keccak384 = sha3.keccak384;
  keccak256 = sha3.keccak256;
  keccak224 = sha3.keccak224;
  sha3_512 = sha3.sha3_512;
  sha3_384 = sha3.sha3_384;
  sha3_256 = sha3.sha3_256;
  sha3_224 = sha3.sha3_224;
  shake128 = sha3.shake128;
  shake256 = sha3.shake256;
  cshake128 = sha3.cshake128;
  cshake256 = sha3.cshake256;
  kmac128 = sha3.kmac128;
  kmac256 = sha3.kmac256;
  require('./test.js');
};
define.amd = true;

require('../src/sha3.js');
unset();

// webworker
WORKER = 'tests/worker.js';
SOURCE = 'src/sha3.js';

require('./worker-test.js');

delete require.cache[require.resolve('./worker-test.js')];

// cover webworker
JS_SHA3_NO_WINDOW = true;
JS_SHA3_NO_NODE_JS = true;
WORKER = './worker.js';
SOURCE = '../src/sha3.js';
window = global;
self = global;

Worker = function (file) {
  require(file);
  currentWorker = this;

  this.postMessage = function (data) {
    onmessage({data: data});
  };
}

postMessage = function (data) {
  currentWorker.onmessage({data: data});
}

importScripts = function () {};

requireToGlobal();
require('./worker-test.js');
