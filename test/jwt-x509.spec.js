const KsCryp = require('../');
KsCryp.configure({ logger: false });

let payload = {
    userId: 11111,
    domain: 33333
};
let cert = {};

describe('JWT', () => {

    beforeAll(async () => {
        cert = await KsCryp.generate("x509", {
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
    })

    it("valid encode/decode with x509 certificate", () => {
        const enc = KsCryp.encode(payload, "jwt", {
            expiresIn: "30y",
            algorithm: 'RS256',
            privateKey: cert.privateKey,
        });
        const dec = KsCryp.decode(enc, "jwt", {
            algorithm: ['RS256'],
            privateKey: cert.publicKey
        });
        const ver = KsCryp.verify(enc, "jwt", {
            algorithm: ['RS256'],
            privateKey: cert.publicKey
        });
        const unp = KsCryp.decode(enc, "jwt", { verify: false });
        expect(typeof (enc)).toBe("string");
        expect(enc.length > 450).toBe(true);
        expect(typeof (dec)).toBe("object");
        expect(dec.userId).toBe(payload.userId);
        expect(dec.domain).toBe(payload.domain);
        expect(unp.userId).toBe(payload.userId);
        expect(unp.domain).toBe(payload.domain);
        expect(cert.publicKey !== cert.privateKey).toBe(true);
        expect(ver).toBe(true);
    });

    it("valid encode/decode with RSA privateKey", () => {
        const enc = KsCryp.encode(payload, "jwt", {
            expiresIn: "30y",
            algorithm: 'RS256',
            privateKey: cert.privateKey,
        });
        const dec = KsCryp.decode(enc, "jwt", {
            algorithm: ['RS256'],
            privateKey: cert.privateKey
        });
        const ver = KsCryp.verify(enc, "jwt", {
            algorithm: ['RS256'],
            privateKey: cert.privateKey
        });
        expect(typeof (enc)).toBe("string");
        expect(enc.length > 450).toBe(true);
        expect(typeof (dec)).toBe("object");
        expect(dec.userId).toBe(payload.userId);
        expect(dec.domain).toBe(payload.domain);
        expect(cert.publicKey !== cert.privateKey).toBe(true);
        expect(ver).toBe(true);
    });

    it("invalid encode/decode with reverse RSA keys", () => {
        const options = {
            expiresIn: "30y",
            algorithm: 'RS256',
            privateKey: cert.publicKey,
        }
        const enc = KsCryp.encode(payload, "jwt", options);
        const dec = KsCryp.decode(enc, "jwt", {
            algorithm: ['RS256'],
            privateKey: cert.privateKey
        });
        const ver = KsCryp.verify(enc, "jwt", {
            algorithm: ['RS256'],
            privateKey: cert.privateKey
        });
        expect(options.error?.message).toBe("secretOrPrivateKey must be an asymmetric key when using RS256");
        expect(cert.publicKey !== cert.privateKey).toBe(true);
        expect(enc).toBe(null);
        expect(dec).toBe(null);
        expect(ver).toBe(false);
    });
});