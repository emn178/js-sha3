(function(shake_256, shake_128) {
  describe('shake_128', function() {
    context('with 256 output', function() {
      it('should be equal', function() {
        expect(shake_128('', 256)).to.be('7f9c2ba4e88f827d616045507605853ed73b8093f6efbc88eb1a6eacfa66ef26');
        expect(shake_128('The quick brown fox jumps over the lazy dog', 256)).to.be('f4202e3c5852f9182a0430fd8144f0a74b95e7417ecae17db0f8cfeed0e3e66e');
        expect(shake_128('The quick brown fox jumps over the lazy dof', 256)).to.be('853f4538be0db9621a6cea659a06c1107b1f83f02b13d18297bd39d7411cf10c');
      });
    });

    context('with 8 output', function() {
      it('should be equal', function() {
        expect(shake_128('', 8)).to.be('7f');
        expect(shake_128('The quick brown fox jumps over the lazy dog', 8)).to.be('f4');
        expect(shake_128('The quick brown fox jumps over the lazy dof', 8)).to.be('85');
      });
    });

    context('with more output', function() {
      it('should be equal', function() {
        expect(shake_128('', 16)).to.be('7f9c');
        expect(shake_128('', 24)).to.be('7f9c2b');
      });
    });

    context('with 8 output ArrayBuffer', function() {
      it('should be equal', function() {
        expect(shake_128.buffer('', 8).toHexString()).to.be('7f');
        expect(shake_128.buffer('The quick brown fox jumps over the lazy dog', 8).toHexString()).to.be('f4');
        expect(shake_128.buffer('The quick brown fox jumps over the lazy dof', 8).toHexString()).to.be('85');
      });
    });
  });

  describe('shake_256', function() {
    context('with 512 output', function() {
      it('should be equal', function() {
        expect(shake_256('', 512)).to.be('46b9dd2b0ba88d13233b3feb743eeb243fcd52ea62b81b82b50c27646ed5762fd75dc4ddd8c0f200cb05019d67b592f6fc821c49479ab48640292eacb3b7c4be');
      });
    });
    context('with 8 output', function() {
      it('should be equal', function() {
        expect(shake_256('', 8)).to.be('46');
      });
    });
  });
})(shake_256, shake_128);
