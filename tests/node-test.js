expect = require('expect.js');
Worker = require("tiny-worker");

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
  kmacxof128 = null;
  kmacxof256 = null;
  tuplehash128 = null;
  tuplehash256 = null;
  tuplehashxof128 = null;
  tuplehashxof256 = null;
  parallelhash128 = null;
  parallelhash256 = null;
  parallelhashxof128 = null;
  parallelhashxof256 = null;
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
  kmacxof128 = sha3.kmacxof128;
  kmacxof256 = sha3.kmacxof256;
  tuplehash128 = sha3.tuplehash128;
  tuplehash256 = sha3.tuplehash256;
  tuplehashxof128 = sha3.tuplehashxof128;
  tuplehashxof256 = sha3.tuplehashxof256;
  parallelhash128 = sha3.parallelhash128;
  parallelhash256 = sha3.parallelhash256;
  parallelhashxof128 = sha3.parallelhashxof128;
  parallelhashxof256 = sha3.parallelhashxof256;
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
    require('./test-tuplehash.js');
    require('./test-parallelhash.js');
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
  kmacxof128 = sha3.kmacxof128;
  kmacxof256 = sha3.kmacxof256;
  tuplehash128 = sha3.tuplehash128;
  tuplehash256 = sha3.tuplehash256;
  tuplehashxof128 = sha3.tuplehashxof128;
  tuplehashxof256 = sha3.tuplehashxof256;
  parallelhash128 = sha3.parallelhash128;
  parallelhash256 = sha3.parallelhash256;
  parallelhashxof128 = sha3.parallelhashxof128;
  parallelhashxof256 = sha3.parallelhashxof256;
  require('./test.js');
};
define.amd = true;

require('../src/sha3.js');
unset();

// environment detection in isolated contexts (no Node.js globals)
describe('environment detection', function () {
  var vm = require('vm');
  var fs = require('fs');
  var path = require('path');
  var source = fs.readFileSync(path.join(__dirname, '../src/sha3.js'), 'utf8');

  function run(sandbox, script) {
    var context = vm.createContext(sandbox);
    if (script) {
      vm.runInContext(script, context);
    }
    vm.runInContext(source, context);
    return sandbox;
  }

  function check(sandbox) {
    expect(sandbox.sha3_512('abc')).to.be('b751850b1a57168a5693cd924b6b096e08f621827444f70d884f5d0240d2712e10e116e9192af3c91a7ec57647e3934057340b4cf408d5a56592f8274eec53f0');
    expect(sandbox.keccak256('abc')).to.be('4e03657aea45a94fc7d47ba826c8d667c0d1e6e33a64a036ec44f58fa12d6c45');
    expect(sandbox.shake128('abc', 256)).to.be('5881092dd818bf5cf8a3ddb793fbcba74097d5c526a6d35f97b83351940f2cc8');
  }

  it('should not treat a browser with a process polyfill as Node.js', function () {
    var sandbox = { process: { versions: { node: '18.0.0' }, env: {} } };
    sandbox.window = sandbox.self = sandbox;
    check(run(sandbox));
  });

  it('should not treat an Electron renderer as Node.js', function () {
    var sandbox = { process: { type: 'renderer', versions: { node: '20.0.0' } } };
    sandbox.window = sandbox.self = sandbox;
    check(run(sandbox));
  });

  it('should expose to the global scope in a web worker', function () {
    var sandbox = {};
    sandbox.self = sandbox;
    check(run(sandbox));
  });

  it('should load in a browser without ArrayBuffer', function () {
    var sandbox = {};
    sandbox.window = sandbox;
    check(run(sandbox, 'delete ArrayBuffer; delete Uint8Array; delete Uint32Array; delete DataView;'));
  });
});

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
