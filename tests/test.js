(function(sha3_512, sha3_384, sha3_256, sha3_224) {
  ArrayBuffer.prototype.toHexString = function (argument) {
    var array = new Uint8Array(this);
    var hex = '';
    for(var i = 0;i < array.length;++i) {
      var c = array[i].toString('16');
      hex += c.length == 1 ? '0' + c : c;
    }
    return hex;
  };
  describe('sha3_512', function() {
    context('when ascii', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_512('')).to.be('a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26');
          expect(sha3_512('The quick brown fox jumps over the lazy dog')).to.be('01dedd5de4ef14642445ba5f5b97c15e47b9ad931326e4b0727cd94cefc44fff23f07bf543139939b49128caf436dc1bdee54fcb24023a08d9403f9b4bf0d450');
          expect(sha3_512('The quick brown fox jumps over the lazy dog.')).to.be('18f4f4bd419603f95538837003d9d254c26c23765565162247483f65c50303597bc9ce4d289f21d1c2f1f458828e33dc442100331b35e7eb031b5d38ba6460f8');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_512('The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.')).to.be('4f8bcf3a60d3ee56a0bd405c3e6bb37dac44b6781c41bf76c91a5d8e621d472b7b13b8806d88914af3d97585df996363ebe17566d5dfeb6f4884a7949ba8263d');
        });
      });
    });

    context('when UTF8', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_512('中文')).to.be('059bbe2efc50cc30e4d8ec5a96be697e2108fcbf9193e1296192eddabc13b143c0120d059399a13d0d42651efe23a6c1ce2d1efb576c5b207fa2516050505af7');
          expect(sha3_512('aécio')).to.be('35dfaf82d2ce4be79393dc90e327b4dd15b1c150d8a30f59d8d1b42ca4fc3c87f50b77da36acccf9dc76494d07fc57cfcc9470e627c38f95bce4deab311b87e0');
          expect(sha3_512('𠜎')).to.be('33ef254289f36527c93cd203ef1973aec1eff7475c23fa842c3092b0d30965d13b0805c61d0aa92c51245c56bfe26978c35c00f26eb558a043982043ee8b178c');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_512('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一')).to.be('accb127bb24b0ffbb7550dc637222d2f78538a8a186c98bc5efdad685b9b396639f34148bf0b94ed470f0e9c3665dc3b4c1cb321bacd32dd317a646295e073d9');
          expect(sha3_512('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('5b70eaad083f1b86fd535b6812e02f5f2876a4bd8b43aede8d62ae71bb1743ebd919dc41be56d73ba45b67b2876ff215d0575788560e7b0c92b879f8a2fc3111');
        });
      });
    });

    context('when special length', function() {
      it('should be equal', function() {
        expect(sha3_512('012345678901234567890123456789012345678901234567890123456789012345678901')).to.be('bce9da5b408846edd5bec9f26c2dee9bd835215c3f2b3876197067d87bc4d1af0cd97f94fda59761a0d804fe82383be2c6c4886fbb82e005fcf899449029f221');
        expect(sha3_512('01234567890123456789012345678901234567890123456789012345678901234567890')).to.be('8bdcb85e6b52c29fafac0d3daf65492f2e3499e066da1a095a65eb1144849a26b2790a8b39c2a7fb747456f749391d953841a61cb13289f9806f04981c180a86');
      });
    });
  
    context('when Array', function() {
      it('should be equal', function() {
        expect(sha3_512([])).to.be('a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26');
        expect(sha3_512([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])).to.be('01dedd5de4ef14642445ba5f5b97c15e47b9ad931326e4b0727cd94cefc44fff23f07bf543139939b49128caf436dc1bdee54fcb24023a08d9403f9b4bf0d450');
      });
    });

    context('when Uint8Array', function() {
      it('should be equal', function() {
        expect(sha3_512(new Uint8Array([]))).to.be('a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26');
        expect(sha3_512(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))).to.be('01dedd5de4ef14642445ba5f5b97c15e47b9ad931326e4b0727cd94cefc44fff23f07bf543139939b49128caf436dc1bdee54fcb24023a08d9403f9b4bf0d450');
      });
    });

    context('when ArrayBuffer', function() {
      it('should be equal', function() {
        expect(sha3_512(new ArrayBuffer(0))).to.be('a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26');
      });
    });

    context('when output ArrayBuffer', function() {
      it('should be equal', function() {
        expect(sha3_512.buffer('').toHexString()).to.be('a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26');
      });
    });

    context('#hex', function() {
      it('should be equal', function() {
        expect(sha3_512.hex('')).to.be(sha3_512(''));
      });
    });
  });

  describe('sha3_384', function() {
    context('when ascii', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_384('')).to.be('0c63a75b845e4f7d01107d852e4c2485c51a50aaaa94fc61995e71bbee983a2ac3713831264adb47fb6bd1e058d5f004');
          expect(sha3_384('The quick brown fox jumps over the lazy dog')).to.be('7063465e08a93bce31cd89d2e3ca8f602498696e253592ed26f07bf7e703cf328581e1471a7ba7ab119b1a9ebdf8be41');
          expect(sha3_384('The quick brown fox jumps over the lazy dog.')).to.be('1a34d81695b622df178bc74df7124fe12fac0f64ba5250b78b99c1273d4b080168e10652894ecad5f1f4d5b965437fb9');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_384('The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.')).to.be('ca6b121a6060bc85de05e5a8d70577838fad2481b092c8263d6f7bcbe5148740f0c7f9c4dc27061339570496956aaef6');
        });
      });
    });

    context('when UTF8', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_384('中文')).to.be('9fb5b99e3c546f2738dcd50a14e9aef9c313800c1bf8cf76bc9b2c3a23307841364c5a2d0794702662c5796fb72f5432');
          expect(sha3_384('aécio')).to.be('70b447f1bd5ce5a4753ccf7a3697eca0315954774374bc1042aff19582ccc32d5067f7da6c2bea9d6d344e11924cbe72');
          expect(sha3_384('𠜎')).to.be('7add8d544b0a7cf188b54b1697a046f77e49d5f292e7ffe56feeed90a500b0bf026b9b68892888a1bafb9f8cb89ed874');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_384('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一')).to.be('7d0f80fe5c79a04a2a37a30a440e0cc068eb78fe6c3182246ede29645c144b5d33c44607cb2c3111ba77ffc66107f1cd');
          expect(sha3_384('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('e344b95c6a961a27793eff00fa5103ef78b4180fe41c93fc60a31aff49b3b5e95a92c84fda9a6c80fa403b7df58db59f');
        });
      });
    });
  });

  describe('sha3_256', function() {
    context('when ascii', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_256('')).to.be('a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a');
          expect(sha3_256('The quick brown fox jumps over the lazy dog')).to.be('69070dda01975c8c120c3aada1b282394e7f032fa9cf32f4cb2259a0897dfc04');
          expect(sha3_256('The quick brown fox jumps over the lazy dog.')).to.be('a80f839cd4f83f6c3dafc87feae470045e4eb0d366397d5c6ce34ba1739f734d');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_256('The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.')).to.be('fa198893674a0bf9fb35980504e8cefb250aabd2311a37e5d2205f07fb023d36');
        });
      });
    });

    context('when UTF8', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_256('中文')).to.be('ac5305da3d18be1aed44aa7c70ea548da243a59a5fd546f489348fd5718fb1a0');
          expect(sha3_256('aécio')).to.be('65c756408eb6c35a1ffa2d7e09711bdc9f0b28716b1376223844a2b4c52b6718');
          expect(sha3_256('𠜎')).to.be('babe9afc555b0311700dfb0b5b6296d49347b3d770480baedfcdc47a4aea6e82');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_256('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一')).to.be('4b2f36e4320b86e6ead0ad001e47e6d9e7fcf0044cd5a5fd65490a633c0372a4');
          expect(sha3_256('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('558a7f843b1ac5e7a8bbef90357876bcce0612992d0dfa2907e95521612f507f');
        });
      });
    });
  });

  describe('sha3_224', function() {
    context('when ascii', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_224('')).to.be('6b4e03423667dbb73b6e15454f0eb1abd4597f9a1b078e3f5b5a6bc7');
          expect(sha3_224('The quick brown fox jumps over the lazy dog')).to.be('d15dadceaa4d5d7bb3b48f446421d542e08ad8887305e28d58335795');
          expect(sha3_224('The quick brown fox jumps over the lazy dog.')).to.be('2d0708903833afabdd232a20201176e8b58c5be8a6fe74265ac54db0');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_224('The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.')).to.be('06885009a28e43e15bf1af718561ad211515a27b542eabc36764a0ca');
        });
      });
    });

    context('when UTF8', function() {
      context('and less than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_224('中文')).to.be('106d169e10b61c2a2a05554d3e631ec94467f8316640f29545d163ee');
          expect(sha3_224('aécio')).to.be('b16bad54608dc01864a5d7510d4c19b09f3a0f39cfc4ba1e53aa952a');
          expect(sha3_224('𠜎')).to.be('f59253c41cb87e5cd953311656716cb5b64dbafc9e8155f0dd68123c');
        });
      });

      context('and more than 128 bytes', function() {
        it('should be equal', function() {
          expect(sha3_224('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一')).to.be('135c13deb71fdf6fb77b52b720c43ddd6ce7467f9147a74248557114');
          expect(sha3_224('訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。')).to.be('bd05581e02445c53e05aad2014f6a3819d77a9dff918b8c6bf60bd06');
        });
      });
    });
  });
})(sha3_512, sha3_384, sha3_256, sha3_224);
