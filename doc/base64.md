
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