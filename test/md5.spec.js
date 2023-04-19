const KsCryp = require('../');
describe('Md5', () => {

    it("valid encode", (done) => {
        const res1 = KsCryp.encode("12345", "md5");
        expect(res1).toBe("827ccb0eea8a706c4c34a16891f84e7b");
        done();
    });

    it("valid very", (done) => {
        const res1 = KsCryp.verify("827ccb0eea8a706c4c34a16891f84e7b", "md5", { key: "12345" });
        expect(res1).toBe(true);
        done();
    });
});