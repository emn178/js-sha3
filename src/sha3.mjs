import sha3 from './sha3.js';

export const {
  sha3_224,
  sha3_256,
  sha3_384,
  sha3_512,

  keccak_224,
  keccak_256,
  keccak_384,
  keccak_512,
  keccak224,
  keccak256,
  keccak384,
  keccak512,

  shake_128,
  shake_256,
  shake128,
  shake256,

  cshake_128,
  cshake_256,
  cshake128,
  cshake256,

  kmac_128,
  kmac_256,
  kmac128,
  kmac256,
  kmacxof_128,
  kmacxof_256,
  kmacxof128,
  kmacxof256,

  tuplehash_128,
  tuplehash_256,
  tuplehash128,
  tuplehash256,
  tuplehashxof_128,
  tuplehashxof_256,
  tuplehashxof128,
  tuplehashxof256
} = sha3;

export default sha3;
