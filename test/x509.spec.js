const KsCryp = require('..');
describe('X509', () => {

    it("valid X.509 generation", async (done) => {
        const opts = {
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
        };
        const cert = await KsCryp.generate("x509", opts);
        expect(cert).toBeInstanceOf(Object);
        expect(cert.privateKey.length > 1).toBe(true);
        expect(cert.publicKey.length > 1).toBe(true);
        done();
    });

});