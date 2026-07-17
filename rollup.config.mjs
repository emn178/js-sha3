import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/sha3.mjs',
  output: {
    file: 'build/sha3.mjs',
    format: 'esm'
  },
  plugins: [commonjs({
    strictRequires: false,
  })]
};