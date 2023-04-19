const KsCryp = require('../');

describe('Basic', () => {

    it("valid encode", (done) => {
        const res1 = KsCryp.encode({ key: "root", code: "12345" }, "basic");
        const res2 = KsCryp.encode({ key: "root", code: "12345", data: { den: 123 } }, "basic");
        expect(res1).toBe('cm9vdDoxMjM0NQ==');
        expect(res2).toBe('cm9vdDoxMjM0NTo3YjIyNjQ2NTZlMjIzYTMxMzIzMzdk');
        done();
    });

    it("valid decode", (done) => {
        const res1 = KsCryp.decode("cm9vdDoxMjM0NQ==", "basic");
        const res2 = KsCryp.decode("cm9vdDoxMjM0NTo3YjIyNjQ2NTZlMjIzYTMxMzIzMzdk", "basic");
        expect(res1.key).toBe("root");
        expect(res1.code).toBe("12345");
        expect(res2.key).toBe("root");
        expect(res2.code).toBe("12345");
        expect(res2.data.den).toBe(123);
        done();
    });
});