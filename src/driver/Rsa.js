const KsDriver = require("../KsDriver");
const crypto = require("crypto");

class KsRSA extends KsDriver {

    encode(data, options) {
        options = options || {};
        options.format = options.format || "base64";
        const signature = crypto.publicEncrypt(
            {
                key: options?.privateKey,
                oaepHash: options?.algorithm || "sha256",
                passphrase: options?.phrase || "",
                padding: options?.padding || crypto.constants.RSA_PKCS1_OAEP_PADDING,
            },
            Buffer.from(data),
        );
        return options?.format !== "base64" ? signature : signature.toString("base64");
    }

    decode(data, options) {
        options = options || {};
        options.format = options.format || "base64";
        const signature = crypto.privateDecrypt(
            {
                key: options?.privateKey,
                padding: options?.padding || crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: options?.algorithm || "sha256",
                passphrase: options?.phrase || "",
            },
            Buffer.from(options?.format !== "base64" ? data.toString("base64") : data, "base64")
        );
        return signature.toString();
    }

    verify(data, options) {
        options = options || {};
        options.format = options.format || "base64";
        const isVerified = crypto.verify(
            options?.algorithm || "sha256",
            Buffer.from(options?.source),
            {
                key: options?.privateKey,
                padding: options?.padding || crypto.constants.RSA_PKCS1_PSS_PADDING,
                passphrase: options?.phrase || "",
            },
            Buffer.from(options?.format !== "base64" ? data.toString("base64") : data, "base64")
        );
        return isVerified;
    }

    sign(data, options) {
        options = options || {};
        options.format = options.format || "base64";
        const signature = crypto.sign(
            options?.algorithm || "sha256",
            Buffer.from(data),
            {
                key: options?.privateKey,
                passphrase: options?.phrase || "",
                padding: options?.padding || crypto.constants.RSA_PKCS1_PSS_PADDING,
            }
        );
        return options?.format !== "base64" ? signature : signature.toString("base64");
    }

    clean(str) {
        if (!str) return "";
        return str.trim().replace(/(-{5}).*(-{5})/g, '').replace(/\n|\r/g, '');
    }

    generate(options) {
        return new Promise((resolve, reject) => {
            crypto.generateKeyPair(
                "rsa",
                {
                    modulusLength: options?.length || 2048,
                    publicKeyEncoding: {
                        type: options?.public?.type || "pkcs1",
                        format: options?.public?.format || "pem",
                    },
                    privateKeyEncoding: {
                        type: options?.private?.type || "pkcs1",
                        format: options?.private?.format || "pem",
                        cipher: options?.cipher || "aes-256-cbc", //Optional
                        passphrase: options?.phrase || "", //Optional
                    },
                },
                (err, publicKey, privateKey) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            publicKey,
                            privateKey
                        });
                    }
                }
            )
        });
    }
}
module.exports = KsRSA;