const KsCryp = require('..');
describe('Hash', () => {

    it("valid md5", (done) => {
        const data = "12345";
        const resr = "827ccb0eea8a706c4c34a16891f84e7b";
        const res1 = KsCryp.encode(data, "hash", { algorithm: "md5" });
        expect(res1).toBe(resr);
        done();
    });

    it("valid SHA1", (done) => {
        const data = "a.12345.a";
        const resr = "14ca2da02547aa0eb2e1825ec947c46485dae39b";
        const res1 = KsCryp.encode(data, "hash", { algorithm: "sha1" });
        expect(res1).toBe(resr);
        done();
    });

    it("valid SHA256", (done) => {
        const data = "a.12345.a";
        const resr = "710aa2c1c4e632e2c972c2cf834978524a70d08ff98a60778001ed6052e21986";
        const res1 = KsCryp.encode(data, "hash");
        const res2 = KsCryp.encode(data, "hash", { algorithm: "sha256" });
        expect(res1).toBe(resr);
        expect(res2).toBe(resr);
        done();
    });

    it("valid SHA512", (done) => {
        const data = "a.12345.a";
        const resr = "ce7f63b79e216d8540238e8da2a7930c801421c901387b4e9cd112999a97bdeb19823202ec055ce1ef2922c8ad58ff1081882fe4e89ac5508eb3f3413b76a80b";
        const res1 = KsCryp.encode(data, "hash", { algorithm: "sha512" });
        expect(res1).toBe(resr);
        done();
    });

    it("Very md5", (done) => {
        const data = "12345";
        const resr = "827ccb0eea8a706c4c34a16891f84e7b";
        const res1 = KsCryp.verify(resr, "hash", { key: data, algorithm: "md5" });
        expect(res1).toBe(true);
        done();
    });

    it("Very SHA256", (done) => {
        const data = "a.12345.a";
        const resr = "710aa2c1c4e632e2c972c2cf834978524a70d08ff98a60778001ed6052e21986";
        const res1 = KsCryp.verify(resr, "hash", { key: data });
        expect(res1).toBe(true);
        done();
    });

});