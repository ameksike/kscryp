const KsCryp = require('../');

describe('Base64', () => {

    it("valid encode", (done) => {
        const res1 = KsCryp.encode("12345", "base64");
        const res2 = KsCryp.encode({ "name": "daniel", "age": 12 }, "base64");

        expect(res1).toBe("MTIzNDU=");
        expect(res2).toBe("eyJuYW1lIjoiZGFuaWVsIiwiYWdlIjoxMn0=");
        done();
    });

    it("valid decode", (done) => {
        const res1 = KsCryp.decode("MTIzNDU=", "base64");
        const res2 = KsCryp.decode("eyJuYW1lIjoiZGFuaWVsIiwiYWdlIjoxMn0=", "base64");
        const res3 = KsCryp.decode("eyJuYW1lIjoiZGFuaWVsIiwiYWdlIjoxMn0=", "base64", { json: true });

        expect(res1).toBe("12345");
        expect(res2).toBe('{"name":"daniel","age":12}');
        expect(res3.name).toBe("daniel");
        expect(res3.age).toBe(12);
        done();
    });
});