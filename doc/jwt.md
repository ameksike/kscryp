## JWT

JWT (JSON Web Tokens) is a method for securely transmitting information between parties as a JSON object. JWT is composed of three parts: the header, the payload, and the signature. The header contains information about the type of token and the cryptographic algorithm used to secure it. The payload contains the actual information being transmitted, such as a user ID or permissions. The signature is created by encoding the header and payload with a secret key, which ensures the integrity of the token and prevents tampering. JWTs are commonly used for authentication and authorization purposes, as they allow users to securely transmit information between different systems without the need for an actual session or cookie.

### JWT Encode

```js
const payload = {
  userId: 11111,
  domain: 33333,
};
const config = {
  privateKey: "ccb0eea8a",
  expiresIn: "30y",
};
const jwtEnc = KsCryp.encode(payload, "jwt", config);
console.log(
  jwtEnc ===
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMTExLCJkb21haW4iOjMzMzMzLCJpYXQiOjE2ODE5MDE5ODMsImV4cCI6MjYyODYyOTk4M30.vTVf34ZTYcCmR9Hw2AbM4nodxN2ArVVe7rVTHsoi6ng"
);
```

### JWT Decode

```js
const jwtDec = KsCryp.decode(jwtEnc, "jwt", config);
console.log(jwtDec.userId === payload.userId, jwtDec.domain === payload.domain);
```

### JWT Decode without Private Key

```js
const jwtStr =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJuYW1lIjoidGVzdDEiLCJpYXQiOjE2OTIyOTg2OTYsImV4cCI6MTY5MjMwMDQ5Nn0.XACLhB1ggc1wvEQxt6JQBuCaP9djw7OO8e85A7L9TzM";

const jwtObj = KsCryp.decode(jwtStr, "jwt", { verify: false });

console.log(jwtObj.name === "test1");
```

### JWT Decode Token

```js
const jwtStr =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJuYW1lIjoidGVzdDEiLCJpYXQiOjE2OTIyOTg2OTYsImV4cCI6MTY5MjMwMDQ5Nn0.XACLhB1ggc1wvEQxt6JQBuCaP9djw7OO8e85A7L9TzM";

const jwtObj = KsCryp.decode(jwtStr, "jwt", { verify: false, validate: true });

console.log(
  jwtObj.name === "test1",
  jwtObj.sts === false,
  jwtObj.exp === 1692300496,
  jwtObj.iat === 1692298696
);
```

### JWT encode/decode using a x509 certificate
To implement JWT (JSON Web Tokens) in Node.js using asymmetric encryption, allowing for sharing the public key to verify the JWT, you can use this library for creating and verifying tokens, and also for handling cryptographic operations. Here's a step-by-step guide:

```js
(async () => {
    // First, you need to generate an RSA key pair consisting of a private key (for signing JWTs) and a public key (for verifying JWTs). You can use KsCryp x509 algorithm to generate the key pair:

    const cert = await KsCryp.generate("x509", {
        altNameIPs: ['127.0.0.1', '55.77.55.77'],
        altNameURIs: ['http://localhost', 'https://test.com'],
        validityDays: 300,
        length: 2048,
        data: {
            commonName: 'my.test.com',
            stateOrProvinceName: 'Barcelona',
            countryName: 'ES',
            localityName: 'Barcelona',
            organizationName: 'Aircraft',
            organizationNameShort: 'TesTas'
        }
    });

    // use the in memory private key to encode 
    const enc = KsCryp.encode(payload, "jwt", {
        expiresIn: "30y",
        algorithm: 'RS256',
        privateKey: cert.privateKey,
    });

    // use the in memory public key to decode 
    const dec = KsCryp.decode(enc, "jwt", {
        algorithm: ['RS256'],
        privateKey: cert.publicKey
    });

    console.log(
        typeof enc === "string",
        typeof dec === "object",
        cert.publicKey !== cert.privateKey,
        dec.userId === payload.userId
    )
})()
```

### JWT Supported algorithms
Array of supported algorithms. The following algorithms [are currently supported](https://www.npmjs.com/package/jsonwebtoken#algorithms-supported).