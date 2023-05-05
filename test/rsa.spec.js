const KsCryp = require('..');
const obj = { name: "des", age: 15 };
describe('RSA', () => {

    it("valid key pair generation", async (done) => {
        const opt = await KsCryp.generate("rsa");
        expect(opt).toBeInstanceOf(Object);
        expect(opt.privateKey.length > 1).toBe(true);
        expect(opt.publicKey.length > 1).toBe(true);
        done();
    });

    it("valid encode/decode", async (done) => {
        const opt = await KsCryp.generate("rsa");
        const dat = "123.-.456";
        const enc = KsCryp.encode(dat, "rsa", { ...opt });
        const dec = KsCryp.decode(enc, "rsa", { ...opt });

        expect(enc.length > 1).toBe(true);
        expect(dec.length > 1).toBe(true);
        expect(dec).toBe(dat);
        done();
    });

    it("valid sing/verify", async (done) => {
        const opt = await KsCryp.generate("rsa");
        const dat = "123.-.456";
        const signed = KsCryp.sign(dat, "rsa", { ...opt });
        const verify = KsCryp.verify(signed, "rsa", { ...opt, source: dat });

        expect(signed.length > 1).toBe(true);
        expect(verify).toBe(true);
        done();
    });
});