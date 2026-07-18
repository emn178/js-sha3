type Message = string | number[] | ArrayBuffer | Uint8Array;

interface Hasher {
  /**
   * Update hash
   *
   * @param message The message you want to hash.
   */
  update(message: Message): Hasher;

  /**
   * Return hash in hex string.
   */
  hex(): string;

  /**
   * Return hash in hex string.
   */
  toString(): string;

  /**
   * Return hash in ArrayBuffer.
   */
  arrayBuffer(): ArrayBuffer;

  /**
   * Return hash in integer array.
   */
  digest(): number[];

  /**
   * Return hash in integer array.
   */
  array(): number[];
}

interface Hash {
  /**
   * Hash and return hex string.
   *
   * @param message The message you want to hash.
   */
  (message: Message): string;

  /**
   * Hash and return hex string.
   *
   * @param message The message you want to hash.
   */
  hex(message: Message): string;

  /**
   * Hash and return ArrayBuffer.
   *
   * @param message The message you want to hash.
   */
  arrayBuffer(message: Message): ArrayBuffer;

  /**
   * Hash and return integer array.
   *
   * @param message The message you want to hash.
   */
  digest(message: Message): number[];

  /**
   * Hash and return integer array.
   *
   * @param message The message you want to hash.
   */
  array(message: Message): number[];

  /**
   * Create a hash object.
   */
  create(): Hasher;

  /**
   * Create a hash object and hash message.
   *
   * @param message The message you want to hash.
   */
  update(message: Message): Hasher;
}

interface ShakeHash {
  /**
   * Hash and return hex string.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   */
  (message: Message, outputBits: number): string;

  /**
   * Hash and return hex string.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   */
  hex(message: Message, outputBits: number): string;

  /**
   * Hash and return ArrayBuffer.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   */
  arrayBuffer(message: Message, outputBits: number): ArrayBuffer;

  /**
   * Hash and return integer array.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   */
  digest(message: Message, outputBits: number): number[];

  /**
   * Hash and return integer array.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   */
  array(message: Message, outputBits: number): number[];

  /**
   * Create a hash object.
   *
   * @param outputBits The length of output.
   * @param outputBits The length of output.
   */
  create(outputBits: number): Hasher;

  /**
   * Create a hash object and hash message.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   */
  update(message: Message, outputBits: number): Hasher;
}

interface CshakeHash {
  /**
   * Hash and return hex string.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param functionName The function name string.
   * @param customization The customization string.
   */
  (message: Message, outputBits: number, functionName: Message, customization: Message): string;

  /**
   * Hash and return hex string.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param functionName The function name string.
   * @param customization The customization string.
   */
  hex(message: Message, outputBits: number, functionName: Message, customization: Message): string;

  /**
   * Hash and return ArrayBuffer.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param functionName The function name string.
   * @param customization The customization string.
   */
  arrayBuffer(message: Message, outputBits: number, functionName: Message, customization: Message): ArrayBuffer;

  /**
   * Hash and return integer array.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param functionName The function name string.
   * @param customization The customization string.
   */
  digest(message: Message, outputBits: number, functionName: Message, customization: Message): number[];

  /**
   * Hash and return integer array.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param functionName The function name string.
   * @param customization The customization string.
   */
  array(message: Message, outputBits: number, functionName: Message, customization: Message): number[];

  /**
   * Create a hash object.
   *
   * @param outputBits The length of output.
   * @param outputBits The length of output.
   */
  create(outputBits: number): Hasher;

  /**
   * Create a hash object.
   *
   * @param outputBits The length of output.
   * @param functionName The function name string.
   * @param customization The customization string.
   */
  create(outputBits: number, functionName: Message, customization: Message): Hasher;

  /**
   * Create a hash object and hash message.
   *
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param functionName The function name string.
   * @param customization The customization string.
   */
  update(message: Message, outputBits: number, functionName: Message, customization: Message): Hasher;
}

interface KmacHash {
  /**
   * Hash and return hex string.
   *
   * @param key The key string.
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  (key: Message, message: Message, outputBits: number, customization: Message): string;

  /**
   * Hash and return hex string.
   *
   * @param key The key string.
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  hex(key: Message, message: Message, outputBits: number, customization: Message): string;

  /**
   * Hash and return ArrayBuffer.
   *
   * @param key The key string.
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  arrayBuffer(key: Message, message: Message, outputBits: number, customization: Message): ArrayBuffer;

  /**
   * Hash and return integer array.
   *
   * @param key The key string.
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  digest(key: Message, message: Message, outputBits: number, customization: Message): number[];

  /**
   * Hash and return integer array.
   *
   * @param key The key string.
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  array(key: Message, message: Message, outputBits: number, customization: Message): number[];

  /**
   * Create a hash object.
   *
   * @param key The key string.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  create(key: Message, outputBits: number, customization: Message): Hasher;

  /**
   * Create a hash object and hash message.
   *
   * @param key The key string.
   * @param message The message you want to hash.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  update(key: Message, message: Message, outputBits: number, customization: Message): Hasher;
}

type TupleInput = Message[];

interface TupleHash extends Hasher {
  /**
   * Start a streaming tuple input with a known UTF-8/binary byte length.
   *
   * @param byteLength The byte length of the input that will follow through updateChunk().
   */
  beginInput(byteLength: number): TupleHash;

  /**
   * Absorb part of the active streaming tuple input.
   *
   * @param message The next message chunk.
   */
  updateChunk(message: Message): TupleHash;

  /**
   * Append one complete tuple input string.
   * Equivalent to beginInput(byteLength) followed by updateChunk(message).
   *
   * @param message The input string to encode and absorb.
   */
  update(message: Message): TupleHash;
}

interface TupleHashMethod {
  /**
   * Hash a tuple and return hex string.
   *
   * @param inputs The tuple of input strings.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  (inputs: TupleInput, outputBits: number, customization: Message): string;

  /**
   * Hash a tuple and return hex string.
   *
   * @param inputs The tuple of input strings.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  hex(inputs: TupleInput, outputBits: number, customization: Message): string;

  /**
   * Hash a tuple and return ArrayBuffer.
   *
   * @param inputs The tuple of input strings.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  arrayBuffer(inputs: TupleInput, outputBits: number, customization: Message): ArrayBuffer;

  /**
   * Hash a tuple and return integer array.
   *
   * @param inputs The tuple of input strings.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  digest(inputs: TupleInput, outputBits: number, customization: Message): number[];

  /**
   * Hash a tuple and return integer array.
   *
   * @param inputs The tuple of input strings.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  array(inputs: TupleInput, outputBits: number, customization: Message): number[];

  /**
   * Create a TupleHash object.
   *
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  create(outputBits: number, customization: Message): TupleHash;

  /**
   * Create a TupleHash object and absorb the given tuple inputs.
   *
   * @param inputs The tuple of input strings.
   * @param outputBits The length of output.
   * @param customization The customization string.
   */
  update(inputs: TupleInput, outputBits: number, customization: Message): TupleHash;
}

export var sha3_512: Hash;
export var sha3_384: Hash;
export var sha3_256: Hash;
export var sha3_224: Hash;
export var keccak_512: Hash;
export var keccak_384: Hash;
export var keccak_256: Hash;
export var keccak_224: Hash;
export var keccak512: Hash;
export var keccak384: Hash;
export var keccak256: Hash;
export var keccak224: Hash;
export var shake_128: ShakeHash;
export var shake_256: ShakeHash;
export var shake128: ShakeHash;
export var shake256: ShakeHash;
export var cshake_128: CshakeHash;
export var cshake_256: CshakeHash;
export var cshake128: CshakeHash;
export var cshake256: CshakeHash;
export var kmac_128: KmacHash;
export var kmac_256: KmacHash;
export var kmac128: KmacHash;
export var kmac256: KmacHash;
export var kmacxof_128: KmacHash;
export var kmacxof_256: KmacHash;
export var kmacxof128: KmacHash;
export var kmacxof256: KmacHash;
export var tuplehash_128: TupleHashMethod;
export var tuplehash_256: TupleHashMethod;
export var tuplehash128: TupleHashMethod;
export var tuplehash256: TupleHashMethod;
export var tuplehashxof_128: TupleHashMethod;
export var tuplehashxof_256: TupleHashMethod;
export var tuplehashxof128: TupleHashMethod;
export var tuplehashxof256: TupleHashMethod;
