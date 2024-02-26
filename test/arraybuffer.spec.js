const KsCryp = require('../');

describe('ArrayBuffer', () => {

    it("valid encode/decode", () => {
        const data = "DEMO";
        const enc = KsCryp.encode(data, "ArrayBuffer");
        const en2 = KsCryp.encode(enc, "ArrayBuffer");
        const dec = KsCryp.decode(enc, "ArrayBuffer");
        const de2 = KsCryp.decode(en2, "ArrayBuffer");
        const de3 = KsCryp.decode(data, "ArrayBuffer");

        expect(enc instanceof ArrayBuffer).toBe(true);
        expect(en2 instanceof ArrayBuffer).toBe(true);
        expect(dec).toBe(data);
        expect(de2).toBe(data);
        expect(de3).toBe(data);
    });

});