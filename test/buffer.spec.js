const KsCryp = require('../');

describe('Buffer', () => {

    it("valid encode/decode", () => {
        const data = "DEMO";
        const enc = KsCryp.encode(data, "buffer");
        const en2 = KsCryp.encode(enc, "buffer");
        const dec = KsCryp.decode(enc, "buffer");
        const de2 = KsCryp.decode(en2, "buffer");
        const de3 = KsCryp.decode(data, "buffer");

        expect(enc instanceof Buffer).toBe(true);
        expect(en2 instanceof Buffer).toBe(true);
        expect(dec).toBe(data);
        expect(de2).toBe(data);
        expect(de3).toBe(data);
    });

});