sha3_512 = require('../src/sha3.js').sha3_512;
sha3_384 = require('../src/sha3.js').sha3_384;
sha3_256 = require('../src/sha3.js').sha3_256;
sha3_224 = require('../src/sha3.js').sha3_224;
expect = require('expect.js');
require('./test.js');

delete require.cache[require.resolve('../src/sha3.js')]
delete require.cache[require.resolve('./test.js')]
sha3_512 = null;
sha3_384 = null;
sha3_256 = null;
sha3_224 = null;

JS_SHA3_TEST = true;
require('../src/sha3.js');
require('./test.js');
