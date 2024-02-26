const KsCryp = require('../');

describe('DataView', () => {

    it("valid encode/decode", () => {
        const data = "DEMO";
        const enc = KsCryp.encode(data, "DataView");
        const en2 = KsCryp.encode(enc, "DataView");
        const dec = KsCryp.decode(enc, "DataView");
        const de2 = KsCryp.decode(en2, "DataView");
        const de3 = KsCryp.decode(data, "DataView");

        expect(enc instanceof DataView).toBe(true);
        expect(en2 instanceof DataView).toBe(true);
        expect(dec).toBe(data);
        expect(de2).toBe(data);
        expect(de3).toBe(data);
    });

});