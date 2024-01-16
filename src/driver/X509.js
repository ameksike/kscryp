const crypto = require('crypto');
const KsDriver = require("../KsDriver");

class KsX509 extends KsDriver {

    generate(payload, options) {
        const forge = require('node-forge');
        const { altNameIPs, altNameURIs, validityDays, caCertificate, data, length } = payload || {};
        const pair = caCertificate || forge.pki.rsa.generateKeyPair(length || 2048);
        const x509 = forge.pki.createCertificate();

        const attrs = [
            { name: 'commonName', value: data?.commonName || 'ksike.com' },
            { name: 'countryName', value: data?.countryName || 'ES' },
            { shortName: 'ST', value: data?.stateOrProvinceName || 'KSDT' },
            { name: 'localityName', value: data?.localityName || 'Barcelona' },
            { name: 'organizationName', value: data?.organizationName || 'Ksike Develop Team' },
            { shortName: 'OU', value: data?.organizationNameShort || 'KSDT' },
        ];

        x509.publicKey = pair.publicKey;
        x509.serialNumber = '01' + crypto.randomBytes(19).toString("hex");
        x509.validity.notBefore = new Date();
        x509.validity.notAfter = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * (validityDays ?? 1));
        x509.setSubject(attrs);
        x509.setIssuer(attrs);
        x509.setExtensions([
            {
                name: 'subjectAltName',
                altNames: [
                    ...(altNameURIs?.map ? altNameURIs.map(item => ({ type: 6, value: item })) : []),
                    ...(altNameURIs?.map ? altNameIPs.map(item => ({ type: 7, ip: item })) : [])
                ]
            }, {
                name: 'subjectKeyIdentifier'
            }, {
                name: 'basicConstraints',
                cA: true
            }, {
                name: 'keyUsage',
                keyCertSign: true,
                digitalSignature: true,
                nonRepudiation: true,
                keyEncipherment: true,
                dataEncipherment: true
            }, {
                name: 'extKeyUsage',
                serverAuth: true,
                clientAuth: true,
                codeSigning: true,
                emailProtection: true,
                timeStamping: true
            }, {
                name: 'nsCertType',
                client: true,
                server: true,
                email: true,
                objsign: true,
                sslCA: true,
                emailCA: true,
                objCA: true
            }
        ]);

        // Set the public key
        x509.publicKey = pair.publicKey;

        // Sign the private key, algorithm: sha256
        if (payload.signatureAlgorithm && forge.md[payload.signatureAlgorithm]) {
            const algorithm = forge.md[payload.signatureAlgorithm];
            x509.sign(pair.privateKey, algorithm.create());
        } else {
            x509.sign(pair.privateKey);
        }

        // convert a Forge certificate and private key to PEM
        const publicKey = forge.pki.certificateToPem(x509);
        const privateKey = forge.pki.privateKeyToPem(pair.privateKey);

        return { publicKey, privateKey };
    }

}
module.exports = KsX509;