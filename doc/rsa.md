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
