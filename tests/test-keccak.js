(function(keccak_512, keccak_384, keccak_256, keccak_224) {
  describe('keccak_512', function() {
    context('when ascii', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_512('')).to.be('0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e');
          expect(keccak_512('The quick brown fox jumps over the lazy dog')).to.be('d135bb84d0439dbac432247ee573a23ea7d3c9deb2a968eb31d47c4fb45f1ef4422d6c531b5b9bd6f449ebcc449ea94d0a8f05f62130fda612da53c79659f609');
          expect(keccak_512('The quick brown fox jumps over the lazy dog.')).to.be('ab7192d2b11f51c7dd744e7b3441febf397ca07bf812cceae122ca4ded6387889064f8db9230f173f6d1ab6e24b6e50f065b039f799f5592360a6558eb52d760');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_512('The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.')).to.be('10dcbf6389980ce3594547939bbc685363d28adbd6a05bc4abd7fc62e7693a1f6e33569fed5a380bfecb56ae811d25939b95823f39bb0f16a08740629d066d43');
        });
      });
    });

    context('when UTF8', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_512('中文')).to.be('2f6a1bd50562230229af34b0ccf46b8754b89d23ae2c5bf7840b4acfcef86f87395edc0a00b2bfef53bafebe3b79de2e3e01cbd8169ddbb08bde888dcc893524');
          expect(keccak_512('aécio')).to.be('c452ec93e83d4795fcab62a76eed0d88f2231a995ce108ac8f130246f87c4a11cb18a2c1a688a5695906a6f863e71bbe8997c6610319ab97f12d2e5bf0afe458');
          expect(keccak_512('𠜎')).to.be('8a2d72022ce19d989dbe6a0017faccbf5dc2e22c162d1c5eb168864d32dd1a71e1b4782652c148cf6ca47b77a72c96fff682e72bdfef0566d4b7cca3c9ccc59d');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_512('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一')).to.be('6a67c28aa1946ca1be8382b861aac4aaf20052f495db9b6902d13adfa603eaba5d169f8896b86d461b2949283eb98e503c3f0640188ea7d6731526fc06568d37');
          expect(keccak_512('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('d04ff5b0e85e9968be2a4d4e133c15c7ccee7497198bb651599a97d11d00bca6048d329ab75aa454566cd532648fa1cb4551985d9d645de9fa43a311a9ee8e4d');
        });
      });
    });

    context('when special length', function() {
      it('should be equal', function() {
        expect(keccak_512('012345678901234567890123456789012345678901234567890123456789012345678901')).to.be('90b1d032c3bf06dcc78a46fe52054bab1250600224bfc6dfbfb40a7877c55e89bb982799a2edf198568a4166f6736678b45e76b12fac813cfdf0a76714e5eae8');
        expect(keccak_512('01234567890123456789012345678901234567890123456789012345678901234567890')).to.be('3173e7abc754a0b2909410d78986428a9183e996864af02f421d273d9fa1b4e4a5b14e2998b20767712f53a01ff8f6ae2c3e71e51e2c0f24257b03e6da09eb77');
      });
    });
  
    context('when Array', function() {
      it('should be equal', function() {
        expect(keccak_512([])).to.be('0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e');
        expect(keccak_512([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])).to.be('d135bb84d0439dbac432247ee573a23ea7d3c9deb2a968eb31d47c4fb45f1ef4422d6c531b5b9bd6f449ebcc449ea94d0a8f05f62130fda612da53c79659f609');
      });
    });

    context('when Uint8Array', function() {
      it('should be equal', function() {
        expect(keccak_512(new Uint8Array([]))).to.be('0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e');
        expect(keccak_512(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))).to.be('d135bb84d0439dbac432247ee573a23ea7d3c9deb2a968eb31d47c4fb45f1ef4422d6c531b5b9bd6f449ebcc449ea94d0a8f05f62130fda612da53c79659f609');
      });
    });

    context('when ArrayBuffer', function() {
      it('should be equal', function() {
        expect(keccak_512(new ArrayBuffer(0))).to.be('0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e');
      });
    });

    context('when output ArrayBuffer', function() {
      it('should be equal', function() {
        expect(keccak_512.buffer('').toHexString()).to.be('0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e');
      });
    });
  });

  describe('keccak_384', function() {
    context('when ascii', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_384('')).to.be('2c23146a63a29acf99e73b88f8c24eaa7dc60aa771780ccc006afbfa8fe2479b2dd2b21362337441ac12b515911957ff');
          expect(keccak_384('The quick brown fox jumps over the lazy dog')).to.be('283990fa9d5fb731d786c5bbee94ea4db4910f18c62c03d173fc0a5e494422e8a0b3da7574dae7fa0baf005e504063b3');
          expect(keccak_384('The quick brown fox jumps over the lazy dog.')).to.be('9ad8e17325408eddb6edee6147f13856ad819bb7532668b605a24a2d958f88bd5c169e56dc4b2f89ffd325f6006d820b');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_384('The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.')).to.be('e7ec8976b4d96e43f50ae8ecdcf2d97a56236e6406e8dd00efd0d9abe885659db58a2f4b138a4ecfb1bd0052f6569516');
        });
      });
    });

    context('when UTF8', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_384('中文')).to.be('743f64bb7544c6ed923be4741b738dde18b7cee384a3a09c4e01acaaac9f19222cdee137702bd3aa05dc198373d87d6c');
          expect(keccak_384('aécio')).to.be('08990555e131af8597687614309da4c5053ce866f348544da0a0c2c78c2cc79680ebb57cfbe238286e78ea133a037897');
          expect(keccak_384('𠜎')).to.be('2a80f59abf3111f38a35a3daa25123b495f90e9736bd300e35911d19abdd8806498c581333f198ccbbf2252b57c2925d');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_384('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一')).to.be('a3b043a2f69e4326a05d478fa4c8aa2bd7612453d775af37665a0b96ef2207cdc74c50cdba1629796a5136fe77300b05');
          expect(keccak_384('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('66414c090cc3fe9c396d313cbaa100aefd335e851838b29382568b7f57357ada7c54b8fa8c17f859945bba88b2c2e332');
        });
      });
    });
  });

  describe('keccak_256', function() {
    context('when ascii', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_256('')).to.be('c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470');
          expect(keccak_256('The quick brown fox jumps over the lazy dog')).to.be('4d741b6f1eb29cb2a9b9911c82f56fa8d73b04959d3d9d222895df6c0b28aa15');
          expect(keccak_256('The quick brown fox jumps over the lazy dog.')).to.be('578951e24efd62a3d63a86f7cd19aaa53c898fe287d2552133220370240b572d');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_256('The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.')).to.be('af20018353ffb50d507f1555580f5272eca7fdab4f8295db4b1a9ad832c93f6d');
        });
      });
    });

    context('when UTF8', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_256('中文')).to.be('70a2b6579047f0a977fcb5e9120a4e07067bea9abb6916fbc2d13ffb9a4e4eee');
          expect(keccak_256('aécio')).to.be('d7d569202f04daf90432810d6163112b2695d7820da979327ebd894efb0276dc');
          expect(keccak_256('𠜎')).to.be('16a7cc7a58444cbf7e939611910ddc82e7cba65a99d3e8e08cfcda53180a2180');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_256('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一')).to.be('d1021d2d4c5c7e88098c40f422af68493b4b64c913cbd68220bf5e6127c37a88');
          expect(keccak_256('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('ffabf9bba2127c4928d360c9905cb4911f0ec21b9c3b89f3b242bccc68389e36');
        });
      });
    });
  });

  describe('keccak_224', function() {
    context('when ascii', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_224('')).to.be('f71837502ba8e10837bdd8d365adb85591895602fc552b48b7390abd');
          expect(keccak_224('The quick brown fox jumps over the lazy dog')).to.be('310aee6b30c47350576ac2873fa89fd190cdc488442f3ef654cf23fe');
          expect(keccak_224('The quick brown fox jumps over the lazy dog.')).to.be('c59d4eaeac728671c635ff645014e2afa935bebffdb5fbd207ffdeab');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_224('The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.')).to.be('8dd58b706e3a08ec4f1f202af39295b38c355a39b23308ade7218a21');
        });
      });
    });

    context('when UTF8', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_224('中文')).to.be('7bc2a0b6e7e0a055a61e4f731e2944b560f41ff98967dcbf4bbf77a5');
          expect(keccak_224('aécio')).to.be('66f3db76bf8cb35726cb278bac412d187c3484ab2083dc50ef5ffb55');
          expect(keccak_224('𠜎')).to.be('3bfa94845726f4cd5cf17d19b5eacac17b3694790e13a76d5c81c7c2');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(keccak_224('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一')).to.be('d59eef8f394ef7d96967bb0bde578785c033f7f0a21913d6ba41ed1b');
          expect(keccak_224('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('27123a2a3860d1041d4769778c4b078732bf4300f7e1c56536ab2644');
        });
      });
    });
  });
})(keccak_512, keccak_384, keccak_256, keccak_224);
