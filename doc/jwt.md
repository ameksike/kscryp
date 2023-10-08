
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