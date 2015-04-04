expect = require('expect.js');
keccak_512 = require('../src/sha3.js').keccak_512;
keccak_384 = require('../src/sha3.js').keccak_384;
keccak_256 = require('../src/sha3.js').keccak_256;
keccak_224 = require('../src/sha3.js').keccak_224;
sha3_512 = require('../src/sha3.js').sha3_512;
sha3_384 = require('../src/sha3.js').sha3_384;
sha3_256 = require('../src/sha3.js').sha3_256;
sha3_224 = require('../src/sha3.js').sha3_224;
require('./test-keccak.js');
require('./test.js');

delete require.cache[require.resolve('../src/sha3.js')]
delete require.cache[require.resolve('./test.js')]
delete require.cache[require.resolve('./test-keccak.js')]
sha3_512 = null;
sha3_384 = null;
sha3_256 = null;
sha3_224 = null;
keccak_512 = null;
keccak_384 = null;
keccak_256 = null;
keccak_224 = null;

JS_SHA3_TEST = true;
require('../src/sha3.js');
require('./test-keccak.js');
require('./test.js');
