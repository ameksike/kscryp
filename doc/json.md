
## Json
JSON (JavaScript Object Notation) is a lightweight data interchange format that uses a human-readable text structure to represent and transmit structured data. It consists of key-value pairs organized in objects and supports arrays, numbers, strings, booleans, and null values. JSON is widely used for data exchange between applications due to its simplicity, versatility, and ease of parsing across various programming languages.

### Decoding a string in JSON format with special characters
The issue with special characters like line breaks or double quotes when decoding a JSON string with the JSON.parse function is that they can cause parsing errors and disrupt the expected structure of the JSON data.

```js
const srtObj = `
    "{\\"name\\":    \\"PIL W2F\\",
    \\"des\\":\\"PT     
    PAL\\"}"
`;
const resObj = target.decode(srtObj, "json", { clean: true });
console.log(
    resObj.name === "PIL W2F",
    resObj.des === "PT     PAL"
)
```

### Encoding objects with cyclic dependencies

The issue of cyclic dependency arises when using the JSON.stringify function to encode objects that have circular references, causing the process to enter an infinite loop and resulting in incomplete or erroneous JSON representation.

```js
const reqObj = { "age": 1, "name": "test", "live": true, "work": { "lat": 1 } };
reqObj.ref = reqObj;
```

Using the native method JSON.stringify you should get the following error: 
```
Error: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    --- property 'ref' closes the circle
```

To solve the above problem, we can do the following:
```js
const reqStr = target.encode(reqObj, "json");

console.log(
    reqStr === '{"age":1,"name":"test","live":true,"work":{"lat":1}}'
);
```