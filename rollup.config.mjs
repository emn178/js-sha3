import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/sha3.mjs',
    output: {
      file: 'build/sha3.mjs',
      format: 'es'
    },
    plugins: [commonjs({
      strictRequires: false
    })]
  },
  {
    input: 'build/sha3.mjs',
    output: {
      file: 'build/sha3.min.mjs',
      format: 'es'
    },
    plugins: [terser()]
  }
];
