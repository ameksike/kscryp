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