const KsDriver = require("../KsDriver");
const crypto = require("crypto");

class KsRSA extends KsDriver {
    constructor(lib) {
        super(lib);
        this.phrase = "Z1aqwsx-0-xswqa1Z";
        this.cipher = "aes-256-cbc";
        this.algorithm = "sha256";
        this.extension = "pem";
        this.format = "base64";
        this.length = 2048;
    }

    encode(data, options) {
        options = options || {};
        options.format = options.format || this.format;
        const opt = {
            key: options?.privateKey,
            oaepHash: options?.algorithm || this.algorithm,
            padding: options?.padding || crypto.constants.RSA_PKCS1_OAEP_PADDING,
        };
        if (options?.phrase) {
            opt.passphrase = options.phrase;
        }
        const signature = crypto.publicEncrypt(opt, Buffer.from(data),);
        return options?.format !== this.format ? signature : signature.toString(this.format);
    }

    decode(data, options) {
        options = options || {};
        options.format = options.format || this.format;
        const opt = {
            key: options?.privateKey,
            padding: options?.padding || crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: options?.algorithm || this.algorithm,
        };
        if (options?.phrase) {
            opt.passphrase = options.phrase;
        }
        const signature = crypto.privateDecrypt(
            opt,
            Buffer.from(options?.format !== this.format ? data.toString(this.format) : data, this.format)
        );
        return signature.toString();
    }

    verify(data, options) {
        options = options || {};
        options.format = options.format || this.format;
        const opt = {
            key: options?.privateKey,
            padding: options?.padding || crypto.constants.RSA_PKCS1_PSS_PADDING
        };
        if (options?.phrase) {
            opt.passphrase = options.phrase;
        }
        const isVerified = crypto.verify(
            options?.algorithm || this.algorithm,
            Buffer.from(options?.source),
            opt,
            Buffer.from(options?.format !== this.format ? data.toString(this.format) : data, this.format)
        );
        return isVerified;
    }

    sign(data, options) {
        options = options || {};
        options.format = options.format || this.format;
        const opt = {
            key: options?.privateKey,
            padding: options?.padding || crypto.constants.RSA_PKCS1_PSS_PADDING,
        };
        if (options?.phrase) {
            opt.passphrase = options.phrase;
        }
        const signature = crypto.sign(
            options?.algorithm || this.algorithm,
            Buffer.from(data),
            opt
        );
        return options?.format !== this.format ? signature : signature.toString(this.format);
    }

    clean(str) {
        if (!str) return "";
        return str.trim().replace(/(-{5}).*(-{5})/g, '').replace(/\n|\r/g, '');
    }

    generate(options) {
        return new Promise((resolve, reject) => {
            const opt = {
                modulusLength: options?.length || this.length,
                publicKeyEncoding: {
                    type: options?.public?.type || 'spki',
                    format: options?.public?.format || this.extension,
                },
                privateKeyEncoding: {
                    type: options?.private?.type || 'pkcs8',
                    format: options?.private?.format || this.extension
                },
            };
            if (options?.phrase) {
                opt.privateKeyEncoding.passphrase = options.phrase;
            }
            if (options?.cipher) {
                opt.privateKeyEncoding.cipher = options.cipher;
            }
            crypto.generateKeyPair("rsa", opt, (err, publicKey, privateKey) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        publicKey,
                        privateKey
                    });
                }
            })
        });
    }
}
module.exports = KsRSA;