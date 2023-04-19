const KsCryp = require('../');
const obj = { name: "des", age: 15 };
describe('Hex', () => {

    it("valid encode", (done) => {
        const res1 = KsCryp.encode("12345", "hex");
        const res2 = KsCryp.encode(obj, "hex");

        expect(res1).toBe("3132333435");
        expect(res2).toBe("7b226e616d65223a22646573222c22616765223a31357d");
        done();
    });

    it("valid decode", (done) => {
        const res1 = KsCryp.decode("3132333435", "hex");
        const res2 = KsCryp.decode("7b226e616d65223a22646573222c22616765223a31357d", "hex");
        const res3 = KsCryp.decode("7b226e616d65223a22646573222c22616765223a31357d", "hex", { json: true });

        expect(res1).toBe("12345");
        expect(res2).toBe('{"name":"des","age":15}');
        expect(res3.name).toBe('des');
        expect(res3.age).toBe(15);
        done();
    });
});