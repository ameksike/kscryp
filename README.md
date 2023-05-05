# Ks Cryp
Introducing KsCryp, a new npm package that simplifies the process of using cryptographic algorithms in your Node.js applications. With KsCryp, you can easily perform RSA encryption, generate and verify JWTs, hash data using popular algorithms such as MD5, SHA1, SHA256, and SHA512, as well as perform JSON encoding and decoding and basic encoding.

One of the key features of KsCryp is that it provides a consistent and simple API for all of these operations. You can use the same methods to encode, decode, and verify data using any of the supported algorithms, which helps to simplify your code and reduce the potential for errors.

KsCryp also provides easy-to-use helper functions for common use cases, such as generating RSA key pairs and encrypting/decrypting data using those keys. Additionally, it includes a flexible configuration system that allows you to customize various aspects of the library to meet your specific needs.

Overall, KsCryp is a powerful yet easy-to-use cryptographic library that helps simplify the process of using popular cryptographic algorithms in your Node.js applications. Whether you're building a web application, a mobile app, or any other type of software that requires secure data handling, KsCryp can help you get up and running quickly and easily.

## Install and Use
``` npm install kscryp ```
```js 
const KsCryp = require(kscryp);
```
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

## HEX
HEX encoding is a method for representing binary data in a human-readable format. In this encoding scheme, each byte of binary data is represented by two hexadecimal digits, which are numbers and letters ranging from 0-9 and A-F. For example, the byte 10101110 would be represented as the two hexadecimal digits "AE". HEX encoding is often used in computer systems for a variety of purposes, such as displaying error messages or encoding data in URLs. 

### HEX Encode
```js 
const obj = { name: "des", age: 15 };
const hexEnc = KsCryp.encode(obj, "hex");
console.log(
    hexEnc === "7b226e616d65223a22646573222c22616765223a31357d"
)
```
### HEX Decode
```js 
const hexDec = KsCryp.decode(hexEnc, "hex", { json: true });
console.log(
    hexDec.name === obj.name,
    hexDec.age === obj.age
)
```

## Base64
Base64 encoding is a method for representing binary data in ASCII text format. In this encoding scheme, every three bytes of binary data are represented as four characters from a set of 64 characters, which includes letters, numbers, and special characters. The resulting text is larger than the original binary data, but can be transmitted or stored as plain text without modification. Base64 encoding is commonly used in email systems, as well as in web applications for encoding data such as images or audio files that need to be transmitted over HTTP or other text-based protocols. Overall, Base64 encoding provides a means of converting binary data into a form that can be transmitted or stored as plain text, making it easier to work with in various applications.

### Base64 Encode
```js 
const base64Enc = KsCryp.encode(obj, "base64");
console.log(
    base64Enc === "eyJuYW1lIjoiZGFuaWVsIiwiYWdlIjoxMn0"
)
=
```
### Base64 Decode
```js 
const base64Dec = KsCryp.decode(base64Enc, "base64");
console.log(
    base64Dec.name === obj.name,
    base64Dec.age === obj.age
)
```

## Basic
Basic encoding, also known as basic authentication, is a simple method for authenticating users over HTTP. It involves sending a username and password in plaintext, encoded using base64 encoding, in the HTTP header of each request. The format of the encoded credentials is "username:password", which is then base64 encoded and added to the Authorization header of the HTTP request. While basic encoding is simple to implement, it is not secure as the credentials are transmitted in plaintext and can easily be intercepted by malicious parties. As such, it is often used in combination with other security measures like HTTPS.

### Basic Encode
```js 
const res1 = KsCryp.encode({ key: "root", code: "12345" }, "basic");
console.log(
    res1 === 'cm9vdDoxMjM0NQ=='
)
```
It is also possible to add additional data like the following example:
```js 
const res2 = KsCryp.encode({ key: "root", code: "12345", data: { den: 123 } }, "basic");
console.log(
    res2 === 'cm9vdDoxMjM0NTo3YjIyNjQ2NTZlMjIzYTMxMzIzMzdk'
)
```
### Basic Decode
```js 
const res3 = KsCryp.decode("cm9vdDoxMjM0NTo3YjIyNjQ2NTZlMjIzYTMxMzIzMzdk", "basic");
console.log(
    res3.key === 'root',
    res3.code === '12345',
    res3.data.den === '123',
)
```

## JWT
JWT (JSON Web Tokens) is a method for securely transmitting information between parties as a JSON object. JWT is composed of three parts: the header, the payload, and the signature. The header contains information about the type of token and the cryptographic algorithm used to secure it. The payload contains the actual information being transmitted, such as a user ID or permissions. The signature is created by encoding the header and payload with a secret key, which ensures the integrity of the token and prevents tampering. JWTs are commonly used for authentication and authorization purposes, as they allow users to securely transmit information between different systems without the need for an actual session or cookie.

### JWT Encode
```js 
const payload = {
    userId: 11111,
    domain: 33333
};
const config = {
    privateKey: "ccb0eea8a",
    expiresIn: "30y"
};
const jwtEnc = KsCryp.encode(payload, "jwt", config);
console.log(
    jwtEnc === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMTExLCJkb21haW4iOjMzMzMzLCJpYXQiOjE2ODE5MDE5ODMsImV4cCI6MjYyODYyOTk4M30.vTVf34ZTYcCmR9Hw2AbM4nodxN2ArVVe7rVTHsoi6ng',
)
```
### JWT Decode
```js 
const jwtDec = KsCryp.decode(jwtEnc, "jwt", config);
console.log(
    jwtDec.userId === payload.userId,
    jwtDec.domain === payload.domain
)
```
## RSA 
RSA (Rivest–Shamir–Adleman) is a public-key cryptographic algorithm that is widely used for secure data transmission. The RSA algorithm is based on the fact that it is very difficult to factor large prime numbers. The algorithm involves generating a public-private key pair, where the public key can be distributed to anyone who wants to send an encrypted message, and the private key is kept secret and used to decrypt the message.

### Generate RSA key pair with OpenSSL
```
openssl req -x509 -new -newkey rsa:2048 -nodes \
  -subj '/C=US/ST=California/L=San Francisco/O=JankyCo/CN=Test My' \
  -keyout myCert.key \
  -out myCert.pem \
  -days 7300
```
```js
const publicKey = fs.readFileSync(path.join(__dirname, 'myCert.pem'));
const privateKey = fs.readFileSync(path.join(__dirname, 'myCert.key'));
```

### Generate RSA key pair with KsCryp 
```js
const cfg = {
    phrase : "1234567890",
    cipher : "aes-256-cbc",
    length: 2048,
    public: {
        type: 'spki',
        format: "pem",
    },
    private: {
        type: 'pkcs8',
        format: "pem",
    }
};
const opt = await KsCryp.generate("rsa", cfg);
const publicKey = opt.publicKey;
const privateKey = opt.privateKey;
```

### RSA Encode 
```js
const dat = "123.-.456";
const enc = KsCryp.encode(dat, "rsa", { privateKey, publicKey });
```

### RSA Decode 
```js
const dec = KsCryp.decode(enc, "rsa", { privateKey, publicKey });
```

The security of RSA relies on the fact that it is difficult to factor large prime numbers. However, as computing power has increased, it has become easier to break RSA encryption using brute force methods. To counter this, larger key sizes are now recommended for RSA encryption.
