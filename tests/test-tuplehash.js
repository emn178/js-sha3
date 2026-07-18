(function (tuplehash256, tuplehash128, tuplehashxof256, tuplehashxof128, kmac128) {
  // https://csrc.nist.gov/CSRC/media/Projects/Cryptographic-Standards-and-Guidelines/documents/examples/TupleHash_samples.pdf
  // https://csrc.nist.gov/CSRC/media/Projects/Cryptographic-Standards-and-Guidelines/documents/examples/TupleHashXOF_samples.pdf
  var t1 = [0x00, 0x01, 0x02];
  var t2 = [0x10, 0x11, 0x12, 0x13, 0x14, 0x15];
  var t3 = [0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28];

  var testCases = [
    {
      name: 'tuplehash128',
      method: tuplehash128,
      cases: [
        {
          inputs: [t1, t2],
          bits: 256,
          s: '',
          output: 'c5d8786c1afb9b82111ab34b65b2c0048fa64e6d48e263264ce1707d3ffc8ed1'
        },
        {
          inputs: [t1, t2],
          bits: 256,
          s: 'My Tuple App',
          output: '75cdb20ff4db1154e841d758e24160c54bae86eb8c13e7f5f40eb35588e96dfb'
        },
        {
          inputs: [t1, t2, t3],
          bits: 256,
          s: 'My Tuple App',
          output: 'e60f202c89a2631eda8d4c588ca5fd07f39e5151998deccf973adb3804bb6e84'
        }
      ]
    },
    {
      name: 'tuplehash256',
      method: tuplehash256,
      cases: [
        {
          inputs: [t1, t2],
          bits: 512,
          s: '',
          output: 'cfb7058caca5e668f81a12a20a2195ce97a925f1dba3e7449a56f82201ec607311ac2696b1ab5ea2352df1423bde7bd4bb78c9aed1a853c78672f9eb23bbe194'
        },
        {
          inputs: [t1, t2],
          bits: 512,
          s: 'My Tuple App',
          output: '147c2191d5ed7efd98dbd96d7ab5a11692576f5fe2a5065f3e33de6bba9f3aa1c4e9a068a289c61c95aab30aee1e410b0b607de3620e24a4e3bf9852a1d4367e'
        },
        {
          inputs: [t1, t2, t3],
          bits: 512,
          s: 'My Tuple App',
          output: '45000be63f9b6bfd89f54717670f69a9bc763591a4f05c50d68891a744bcc6e7d6d5b5e82c018da999ed35b0bb49c9678e526abd8e85c13ed254021db9e790ce'
        }
      ]
    },
    {
      name: 'tuplehashxof128',
      method: tuplehashxof128,
      cases: [
        {
          inputs: [t1, t2],
          bits: 256,
          s: '',
          output: '2f103cd7c32320353495c68de1a8129245c6325f6f2a3d608d92179c96e68488'
        },
        {
          inputs: [t1, t2],
          bits: 256,
          s: 'My Tuple App',
          output: '3fc8ad69453128292859a18b6c67d7ad85f01b32815e22ce839c49ec374e9b9a'
        },
        {
          inputs: [t1, t2, t3],
          bits: 256,
          s: 'My Tuple App',
          output: '900fe16cad098d28e74d632ed852f99daab7f7df4d99e775657885b4bf76d6f8'
        }
      ]
    },
    {
      name: 'tuplehashxof256',
      method: tuplehashxof256,
      cases: [
        {
          inputs: [t1, t2],
          bits: 512,
          s: '',
          output: '03ded4610ed6450a1e3f8bc44951d14fbc384ab0efe57b000df6b6df5aae7cd568e77377daf13f37ec75cf5fc598b6841d51dd207c991cd45d210ba60ac52eb9'
        },
        {
          inputs: [t1, t2],
          bits: 512,
          s: 'My Tuple App',
          output: '6483cb3c9952eb20e830af4785851fc597ee3bf93bb7602c0ef6a65d741aeca7e63c3b128981aa05c6d27438c79d2754bb1b7191f125d6620fca12ce658b2442'
        },
        {
          inputs: [t1, t2, t3],
          bits: 512,
          s: 'My Tuple App',
          output: '0c59b11464f2336c34663ed51b2b950bec743610856f36c28d1d088d8a2446284dd09830a6a178dc752376199fae935d86cfdee5913d4922dfd369b66a53c897'
        }
      ]
    }
  ];

  testCases.forEach(function (testCase) {
    describe('#' + testCase.name, function () {
      testCase.cases.forEach(function (c) {
        it('should match NIST sample vector', function () {
          expect(testCase.method(c.inputs, c.bits, c.s)).to.be(c.output);
        });
      });
    });
  });

  describe('#tuplehash API', function () {
    it('should treat empty tuple and empty inputs as valid', function () {
      var emptyTuple = tuplehash128([], 256, '');
      var oneEmpty = tuplehash128([''], 256, '');
      var twoEmpty = tuplehash128(['', ''], 256, '');
      expect(emptyTuple).to.not.be(oneEmpty);
      expect(oneEmpty).to.not.be(twoEmpty);
      expect(twoEmpty).to.not.be(tuplehash128(['', '', ''], 256, ''));
      expect(tuplehash128.create(256, '').update('').update(t1).hex()).to.be(tuplehash128(['', t1], 256, ''));
    });

    it('should distinguish tuple boundaries', function () {
      expect(tuplehash128(['abc', 'd'], 256, '')).to.not.be(tuplehash128(['ab', 'cd'], 256, ''));
    });

    it('should match instance update and method update with one-shot', function () {
      var expected = tuplehash128(['abc', 'd'], 256, 'cache');
      var incremental = tuplehash128.create(256, 'cache').update('abc').update('d').hex();
      var methodUpdate = tuplehash128.update(['abc'], 256, 'cache').update('d').hex();
      expect(incremental).to.be(expected);
      expect(methodUpdate).to.be(expected);
      expect(tuplehash128.update(['abc', 'd'], 256, 'cache').hex()).to.be(expected);
    });

    it('should stream binary messages in irregular chunks', function () {
      var bytes = [];
      for (var i = 0; i < 200; ++i) {
        bytes.push(i & 0xff);
      }
      var expected = tuplehash128([bytes, t1], 256, '');
      var hash = tuplehash128.create(256, '');
      hash.beginInput(bytes.length);
      hash.updateChunk(bytes.slice(0, 1));
      hash.updateChunk(bytes.slice(1, 17));
      hash.updateChunk(bytes.slice(17, 168));
      hash.updateChunk(bytes.slice(168));
      hash.beginInput(t1.length);
      hash.updateChunk(t1);
      expect(hash.hex()).to.be(expected);
    });

    it('should stream ArrayBuffer and Uint8Array views', function () {
      var expected = tuplehash128([t1, t2], 256, '');
      var buffer = new Uint8Array(t1).buffer;
      var view = new Uint8Array(new Uint8Array(t2).buffer, 0, t2.length);
      var hash = tuplehash128.create(256, '');
      hash.beginInput(t1.length).updateChunk(buffer);
      hash.beginInput(t2.length).updateChunk(view);
      expect(hash.hex()).to.be(expected);
    });

    it('should support zero-length streaming input', function () {
      var expected = tuplehash128(['', t1], 256, '');
      var hash = tuplehash128.create(256, '');
      hash.beginInput(0);
      hash.beginInput(t1.length).updateChunk(t1);
      expect(hash.hex()).to.be(expected);
    });

    it('should reject invalid streaming usage', function () {
      var hash = tuplehash128.create(256, '');
      expect(function () { hash.updateChunk(t1); }).to.throwError(/no active tuple input/);
      hash.beginInput(2);
      expect(function () { hash.updateChunk([1, 2, 3]); }).to.throwError(/exceeds declared length/);
      expect(function () { hash.beginInput(1); }).to.throwError(/incomplete/);
      expect(function () { hash.update(t1); }).to.throwError(/incomplete/);
      expect(function () { hash.hex(); }).to.throwError(/incomplete/);
      hash.updateChunk([1]);
      expect(function () { hash.hex(); }).to.throwError(/incomplete/);
    });

    it('should reject invalid beginInput lengths', function () {
      var hash = tuplehash128.create(256, '');
      expect(function () { hash.beginInput(-1); }).to.throwError(/byte length is invalid/);
      expect(function () { hash.beginInput(1.5); }).to.throwError(/byte length is invalid/);
      expect(function () { hash.beginInput(NaN); }).to.throwError(/byte length is invalid/);
      expect(function () { hash.beginInput(0x20000000); }).to.throwError(/byte length is invalid/);
    });

    it('should allow repeated output representations', function () {
      var hash = tuplehash128.create(256, '').update(t1).update(t2);
      var hex = hash.hex();
      var array = hash.array();
      var digest = hash.digest();
      var buffer = hash.arrayBuffer();
      expect(hash.hex()).to.be(hex);
      expect(array).to.eql(digest);
      expect(Array.prototype.slice.call(new Uint8Array(buffer))).to.eql(array);
      expect(function () { hash.update(t1); }).to.throwError(/finalize already called/);
      expect(function () { hash.updateChunk(t1); }).to.throwError(/no active tuple input/);
    });

    it('should require customization like KMAC', function () {
      expect(function () { tuplehash128([t1], 256); }).to.throwError(/input is invalid type/);
    });

    it('should require inputs to be an array', function () {
      expect(function () { tuplehash128('abc', 256, ''); }).to.throwError(/input is invalid type/);
      expect(function () { tuplehash128.update(t1, 256, ''); }).to.throwError(/input is invalid type/);
      expect(function () { tuplehash128.hex(null, 256, ''); }).to.throwError(/input is invalid type/);
      expect(function () { tuplehashxof128(undefined, 256, ''); }).to.throwError(/input is invalid type/);
    });

    it('should export identical aliases', function () {
      var sha3 = require('../src/sha3.js');
      expect(sha3.tuplehash128).to.be(sha3.tuplehash_128);
      expect(sha3.tuplehash256).to.be(sha3.tuplehash_256);
      expect(sha3.tuplehashxof128).to.be(sha3.tuplehashxof_128);
      expect(sha3.tuplehashxof256).to.be(sha3.tuplehashxof_256);
    });

    it('should count UTF-8 string bytes for streaming', function () {
      var message = 'åbc'; // 2 + 1 + 1 = 4 UTF-8 bytes
      var expected = tuplehash128([message], 256, '');
      var hash = tuplehash128.create(256, '');
      hash.beginInput(4).updateChunk('å').updateChunk('bc');
      expect(hash.hex()).to.be(expected);
      expect(message.length).to.be(3);
    });

    it('should count 3-byte and 4-byte UTF-8 string bytes for streaming', function () {
      var message = '中\uE000\uD83D\uDE00'; // 3 + 3 + 4 = 10 UTF-8 bytes
      var expected = tuplehash128([message], 256, '');
      var hash = tuplehash128.create(256, '');
      hash.beginInput(10).updateChunk('中').updateChunk('\uE000').updateChunk('\uD83D\uDE00');
      expect(hash.hex()).to.be(expected);
    });

    it('should reject update and beginInput after finalize', function () {
      var hash = tuplehash128.create(256, '').update([0x00]);
      hash.hex();
      expect(function () { hash.update([0x01]); }).to.throwError(/finalize already called/);
      expect(function () { hash.beginInput(1); }).to.throwError(/finalize already called/);
    });
  });

  describe('#kmac repeated output', function () {
    it('should allow repeated output reads after finalize fix', function () {
      var hash = kmac128.create([0x40, 0x41, 0x42, 0x43, 0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4A, 0x4B, 0x4C, 0x4D, 0x4E, 0x4F, 0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5A, 0x5B, 0x5C, 0x5D, 0x5E, 0x5F], 256, '');
      hash.update([0x00, 0x01, 0x02, 0x03]);
      var hex = hash.hex();
      expect(hash.hex()).to.be(hex);
      expect(hash.array().length).to.be(32);
    });
  });
})(tuplehash256, tuplehash128, tuplehashxof256, tuplehashxof128, kmac128);
