
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