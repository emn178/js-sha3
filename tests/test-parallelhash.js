(function (parallelhash256, parallelhash128, parallelhashxof256, parallelhashxof128) {
  // https://csrc.nist.gov/CSRC/media/Projects/Cryptographic-Standards-and-Guidelines/documents/examples/ParallelHash_samples.pdf
  // https://csrc.nist.gov/CSRC/media/Projects/Cryptographic-Standards-and-Guidelines/documents/examples/ParallelHashXOF_samples.pdf
  var d1 = [
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27
  ];
  var d2 = [
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b,
    0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x2b,
    0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3a, 0x3b,
    0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x4b,
    0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x5b
  ];

  var testCases = [
    {
      name: 'parallelhash128',
      method: parallelhash128,
      cases: [
        {
          message: d1,
          blockSize: 8,
          bits: 256,
          s: '',
          output: 'ba8dc1d1d979331d3f813603c67f72609ab5e44b94a0b8f9af46514454a2b4f5'
        },
        {
          message: d1,
          blockSize: 8,
          bits: 256,
          s: 'Parallel Data',
          output: 'fc484dcb3f84dceedc353438151bee58157d6efed0445a81f165e495795b7206'
        },
        {
          message: d2,
          blockSize: 12,
          bits: 256,
          s: 'Parallel Data',
          output: 'f7fd5312896c6685c828af7e2adb97e393e7f8d54e3c2ea4b95e5aca3796e8fc'
        }
      ]
    },
    {
      name: 'parallelhash256',
      method: parallelhash256,
      cases: [
        {
          message: d1,
          blockSize: 8,
          bits: 512,
          s: '',
          output: 'bc1ef124da34495e948ead207dd9842235da432d2bbc54b4c110e64c451105531b7f2a3e0ce055c02805e7c2de1fb746af97a1dd01f43b824e31b87612410429'
        },
        {
          message: d1,
          blockSize: 8,
          bits: 512,
          s: 'Parallel Data',
          output: 'cdf15289b54f6212b4bc270528b49526006dd9b54e2b6add1ef6900dda3963bb33a72491f236969ca8afaea29c682d47a393c065b38e29fae651a2091c833110'
        },
        {
          message: d2,
          blockSize: 12,
          bits: 512,
          s: 'Parallel Data',
          output: '69d0fcb764ea055dd09334bc6021cb7e4b61348dff375da262671cdec3effa8d1b4568a6cce16b1cad946ddde27f6ce2b8dee4cd1b24851ebf00eb90d43813e9'
        }
      ]
    },
    {
      name: 'parallelhashxof128',
      method: parallelhashxof128,
      cases: [
        {
          message: d1,
          blockSize: 8,
          bits: 256,
          s: '',
          output: 'fe47d661e49ffe5b7d999922c062356750caf552985b8e8ce6667f2727c3c8d3'
        },
        {
          message: d1,
          blockSize: 8,
          bits: 256,
          s: 'Parallel Data',
          output: 'ea2a793140820f7a128b8eb70a9439f93257c6e6e79b4a540d291d6dae7098d7'
        },
        {
          message: d2,
          blockSize: 12,
          bits: 256,
          s: 'Parallel Data',
          output: '0127ad9772ab904691987fcc4a24888f341fa0db2145e872d4efd255376602f0'
        }
      ]
    },
    {
      name: 'parallelhashxof256',
      method: parallelhashxof256,
      cases: [
        {
          message: d1,
          blockSize: 8,
          bits: 512,
          s: '',
          output: 'c10a052722614684144d28474850b410757e3cba87651ba167a5cbddff7f466675fbf84bcae7378ac444be681d729499afca667fb879348bfdda427863c82f1c'
        },
        {
          message: d1,
          blockSize: 8,
          bits: 512,
          s: 'Parallel Data',
          output: '538e105f1a22f44ed2f5cc1674fbd40be803d9c99bf5f8d90a2c8193f3fe6ea768e5c1a20987e2c9c65febed03887a51d35624ed12377594b5585541dc377efc'
        },
        {
          message: d2,
          blockSize: 12,
          bits: 512,
          s: 'Parallel Data',
          output: '6b3e790b330c889a204c2fbc728d809f19367328d852f4002dc829f73afd6bcefb7fe5b607b13a801c0be5c1170bdb794e339458fdb0e62a6af3d42558970249'
        }
      ]
    }
  ];

  testCases.forEach(function (testCase) {
    describe('#' + testCase.name, function () {
      testCase.cases.forEach(function (c) {
        it('should match NIST sample vector', function () {
          expect(testCase.method(c.message, c.blockSize, c.bits, c.s)).to.be(c.output);
        });
      });
    });
  });

  describe('#parallelhash API', function () {
    it('should match instance update and method update with one-shot', function () {
      var expected = parallelhash128(d1, 8, 256, 'cache');
      var incremental = parallelhash128.create(8, 256, 'cache').update(d1.slice(0, 10)).update(d1.slice(10)).hex();
      var methodUpdate = parallelhash128.update(d1.slice(0, 5), 8, 256, 'cache').update(d1.slice(5)).hex();
      expect(incremental).to.be(expected);
      expect(methodUpdate).to.be(expected);
      expect(parallelhash128.update(d1, 8, 256, 'cache').hex()).to.be(expected);
    });

    it('should stream binary messages in irregular chunks', function () {
      var expected = parallelhash128(d2, 12, 256, '');
      var hash = parallelhash128.create(12, 256, '');
      hash.update(d2.slice(0, 1));
      hash.update(d2.slice(1, 17));
      hash.update(d2.slice(17, 50));
      hash.update(d2.slice(50));
      expect(hash.hex()).to.be(expected);
    });

    it('should stream ArrayBuffer and Uint8Array views', function () {
      var expected = parallelhash128(d1, 8, 256, '');
      var buffer = new Uint8Array(d1).buffer;
      var view = new Uint8Array(new Uint8Array(d1).buffer, 0, d1.length);
      expect(parallelhash128.create(8, 256, '').update(buffer).hex()).to.be(expected);
      expect(parallelhash128.create(8, 256, '').update(view).hex()).to.be(expected);
    });

    it('should hash empty message with n = 0', function () {
      var empty = parallelhash128([], 8, 256, '');
      var emptyString = parallelhash128('', 8, 256, '');
      expect(empty).to.be(emptyString);
      expect(empty).to.not.be(parallelhash128([0x00], 8, 256, ''));
    });

    it('should handle UTF-8 strings across block boundaries', function () {
      var message = 'åbc'; // 2 + 1 + 1 = 4 UTF-8 bytes
      var expected = parallelhash128(message, 3, 256, '');
      var hash = parallelhash128.create(3, 256, '');
      hash.update('å').update('bc');
      expect(hash.hex()).to.be(expected);
    });

    it('should encode 3-byte and 4-byte UTF-8 characters', function () {
      var message = '中\uE000\uD83D\uDE00'; // 3 + 3 + 4 = 10 UTF-8 bytes
      var expected = parallelhash128(message, 4, 256, '');
      var hash = parallelhash128.create(4, 256, '');
      hash.update('中').update('\uE000').update('\uD83D\uDE00');
      expect(hash.hex()).to.be(expected);
      expect(hash.array().length).to.be(32);
    });

    it('should keep absorbing when update is shorter than remaining block space', function () {
      var expected = parallelhash128(d1, 8, 256, '');
      var hash = parallelhash128.create(8, 256, '');
      hash.update(d1.slice(0, 3)); // partial inner block, need 5 more
      hash.update(d1.slice(3, 5)); // still short, continue same inner SHAKE
      hash.update(d1.slice(5)); // finish remaining blocks
      expect(hash.hex()).to.be(expected);
    });

    it('should not be affected by mutating input after update', function () {
      var expected = parallelhash128(d1, 8, 256, '');
      var chunk = new Uint8Array(d1.slice(0, 3));
      var rest = new Uint8Array(d1.slice(3));
      var hash = parallelhash128.create(8, 256, '');
      hash.update(chunk);
      chunk[0] = 0xff;
      chunk[1] = 0xff;
      chunk[2] = 0xff;
      hash.update(rest);
      expect(hash.hex()).to.be(expected);
    });

    it('should allow repeated output representations', function () {
      var hash = parallelhash128.create(8, 256, '').update(d1);
      var hex = hash.hex();
      var array = hash.array();
      var digest = hash.digest();
      var buffer = hash.arrayBuffer();
      expect(hash.hex()).to.be(hex);
      expect(array).to.eql(digest);
      expect(Array.prototype.slice.call(new Uint8Array(buffer))).to.eql(array);
      expect(function () { hash.update(d1); }).to.throwError(/finalize already called/);
    });

    it('should require customization like KMAC', function () {
      expect(function () { parallelhash128(d1, 8, 256); }).to.throwError(/input is invalid type/);
    });

    it('should reject invalid block sizes', function () {
      expect(function () { parallelhash128.create(0, 256, ''); }).to.throwError(/block size is invalid/);
      expect(function () { parallelhash128.create(-1, 256, ''); }).to.throwError(/block size is invalid/);
      expect(function () { parallelhash128.create(1.5, 256, ''); }).to.throwError(/block size is invalid/);
      expect(function () { parallelhash128.create(NaN, 256, ''); }).to.throwError(/block size is invalid/);
      expect(function () { parallelhash128.create(0x20000000, 256, ''); }).to.throwError(/block size is invalid/);
    });

    it('should export identical aliases', function () {
      var sha3 = require('../src/sha3.js');
      expect(sha3.parallelhash128).to.be(sha3.parallelhash_128);
      expect(sha3.parallelhash256).to.be(sha3.parallelhash_256);
      expect(sha3.parallelhashxof128).to.be(sha3.parallelhashxof_128);
      expect(sha3.parallelhashxof256).to.be(sha3.parallelhashxof_256);
    });

    it('should reject update after finalize', function () {
      var hash = parallelhash128.create(8, 256, '').update([0x00]);
      hash.hex();
      expect(function () { hash.update([0x01]); }).to.throwError(/finalize already called/);
    });
  });
})(parallelhash256, parallelhash128, parallelhashxof256, parallelhashxof128);
