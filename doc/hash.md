## HASH 
A hash function is a mathematical algorithm that takes in input data of arbitrary size and outputs a fixed-length string of characters, known as the hash value or digest. The goal of a hash function is to produce a unique output for each unique input, so that any change in the input data results in a different hash value. Hash functions are commonly used in cryptography to ensure the integrity and authenticity of data by generating unique digital signatures, and in data structures like hash tables to index and retrieve data.

There are various hash functions available, with different properties such as speed, security, and output size. Some of the most commonly used hash functions are:

### MD5 Encode
```js 
const data = "this.is.a.test";
const encMd5 = KsCryp.encode(data, "hash", { algorithm: "md5" });
```
### MD5 Verify
```js 
const data = "this.is.a.test";
const encMd5 = KsCryp.verify(resr, "hash", { key: data, algorithm: "md5" });
```

### SHA256 Encode
```js 
const data = "this.is.a.test";
const encMd5 = KsCryp.encode(data, "hash", { algorithm: "sha256" });
```
### SHA256 Verify
```js 
const data = "this.is.a.test";
const encMd5 = KsCryp.verify(resr, "hash", { key: data, algorithm: "sha256" });
```

### SHA512 Encode
```js 
const data = "this.is.a.test";
const encMd5 = KsCryp.encode(data, "hash", { algorithm: "sha512" });
```
### SHA512 Verify
```js 
const data = "this.is.a.test";
const encMd5 = KsCryp.verify(resr, "hash", { key: data, algorithm: "sha512" });
```