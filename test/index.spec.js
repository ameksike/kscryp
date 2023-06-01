const KsCryp = require('../');

describe('Ksike Cryp', () => {

    beforeAll(async () => { });
    afterAll(async () => { });

    it("valid instance", (done) => {
        expect(KsCryp).toBeInstanceOf(Object);
        expect(KsCryp.encode).toBeInstanceOf(Function);
        expect(KsCryp.decode).toBeInstanceOf(Function);
        expect(KsCryp.verify).toBeInstanceOf(Function);
        expect(KsCryp.generate).toBeInstanceOf(Function);
        done();
    });
});
