# js-sha3
[![Build Status](https://travis-ci.org/emn178/js-sha3.svg?branch=master)](https://travis-ci.org/emn178/js-sha3)
[![Coverage Status](https://coveralls.io/repos/emn178/js-sha3/badge.svg?branch=master)](https://coveralls.io/r/emn178/js-sha3?branch=master)  
[![NPM](https://nodei.co/npm/js-sha3.png?stars&downloads)](https://nodei.co/npm/js-sha3/)  
A simple SHA-3 / Keccak hash function for JavaScript supports UTF-8 encoding.

## Demo
[SHA3-512 Online](http://emn178.github.io/online-tools/sha3_512.html)  
[SHA3-384 Online](http://emn178.github.io/online-tools/sha3_384.html)  
[SHA3-256 Online](http://emn178.github.io/online-tools/sha3_256.html)  
[SHA3-224 Online](http://emn178.github.io/online-tools/sha3_224.html)  

## Download
[Compress](https://raw.github.com/emn178/js-sha3/master/build/sha3.min.js)  
[Uncompress](https://raw.github.com/emn178/js-sha3/master/src/sha3.js)

## Installation
You can also install js-sha3 by using Bower.

    bower install js-sha3

For node.js, you can use this command to install:

    npm install js-sha3

## Usage
You could use like this:
```JavaScript
sha3_512('Message to hash');
sha3_384('Message to hash');
sha3_256('Message to hash');
sha3_224('Message to hash');
```
If you use node.js, you should require the module first:
```JavaScript
sha3_512 = require('js-sha3').sha3_512;
sha3_384 = require('js-sha3').sha3_384;
sha3_256 = require('js-sha3').sha3_256;
sha3_224 = require('js-sha3').sha3_224;
```

## Example
Code
```JavaScript
sha3_512('');
sha3_512('The quick brown fox jumps over the lazy dog');
sha3_512('The quick brown fox jumps over the lazy dog.');
sha3_384('');
sha3_384('The quick brown fox jumps over the lazy dog');
sha3_384('The quick brown fox jumps over the lazy dog.');
sha3_256('');
sha3_256('The quick brown fox jumps over the lazy dog');
sha3_256('The quick brown fox jumps over the lazy dog.');
sha3_224('');
sha3_224('The quick brown fox jumps over the lazy dog');
sha3_224('The quick brown fox jumps over the lazy dog.');
```
Output

    0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e
    d135bb84d0439dbac432247ee573a23ea7d3c9deb2a968eb31d47c4fb45f1ef4422d6c531b5b9bd6f449ebcc449ea94d0a8f05f62130fda612da53c79659f609
    ab7192d2b11f51c7dd744e7b3441febf397ca07bf812cceae122ca4ded6387889064f8db9230f173f6d1ab6e24b6e50f065b039f799f5592360a6558eb52d760
    2c23146a63a29acf99e73b88f8c24eaa7dc60aa771780ccc006afbfa8fe2479b2dd2b21362337441ac12b515911957ff
    283990fa9d5fb731d786c5bbee94ea4db4910f18c62c03d173fc0a5e494422e8a0b3da7574dae7fa0baf005e504063b3
    9ad8e17325408eddb6edee6147f13856ad819bb7532668b605a24a2d958f88bd5c169e56dc4b2f89ffd325f6006d820b
    c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
    4d741b6f1eb29cb2a9b9911c82f56fa8d73b04959d3d9d222895df6c0b28aa15
    578951e24efd62a3d63a86f7cd19aaa53c898fe287d2552133220370240b572d
    f71837502ba8e10837bdd8d365adb85591895602fc552b48b7390abd
    310aee6b30c47350576ac2873fa89fd190cdc488442f3ef654cf23fe
    c59d4eaeac728671c635ff645014e2afa935bebffdb5fbd207ffdeab

It also supports UTF-8 encoding:

Code
```JavaScript
sha3_512('中文');
sha3_384('中文');
sha3_256('中文');
sha3_224('中文');
```
Output

    2f6a1bd50562230229af34b0ccf46b8754b89d23ae2c5bf7840b4acfcef86f87395edc0a00b2bfef53bafebe3b79de2e3e01cbd8169ddbb08bde888dcc893524
    743f64bb7544c6ed923be4741b738dde18b7cee384a3a09c4e01acaaac9f19222cdee137702bd3aa05dc198373d87d6c
    70a2b6579047f0a977fcb5e9120a4e07067bea9abb6916fbc2d13ffb9a4e4eee
    f71837502ba8e10837bdd8d365adb85591895602fc552b48b7390abd

## Benchmark
[UTF8](http://jsperf.com/sha3/3)  
[ASCII](http://jsperf.com/sha3/2)

## Extensions
### jQuery
If you prefer jQuery style, you can add following code to add a jQuery extension.

Code
```JavaScript
jQuery.sha3_512 = sha3_512;
jQuery.sha3_384 = sha3_384;
jQuery.sha3_256 = sha3_256;
jQuery.sha3_224 = sha3_224;
```
And then you could use like this:
```JavaScript
$.sha3_512('message');
$.sha3_384('message');
$.sha3_256('message');
$.sha3_224('message');
```
### Prototype
If you prefer prototype style, you can add following code to add a prototype extension.

Code
```JavaScript
String.prototype.sha3_512 = function() {
  return sha3_512(this);
};
String.prototype.sha3_384 = function() {
  return sha3_384(this);
};
String.prototype.sha3_256 = function() {
  return sha3_256(this);
};
String.prototype.sha3_224 = function() {
  return sha3_224(this);
};
```
And then you could use like this:
```JavaScript
'message'.sha3_512();
'message'.sha3_384();
'message'.sha3_256();
'message'.sha3_224();
```
## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/js-sha3  
Author: emn178@gmail.com
