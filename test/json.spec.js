const target = require("../")

describe('JSON', () => {

    it('decode valid data', () => {
        const srtObj = '{ "age": 1, "name": "test", "live":true, "work": { "lat": 1 } }';
        const resObj = target.decode(srtObj, "json");
        const resOb1 = target.decode({ age: 1 }, "json");
        const resOb2 = target.decode({ age: 1 }, "json", { strict: true });

        expect(resOb1.age).toBe(1);
        expect(resOb2).toBe("");
        expect(resObj).toBeInstanceOf(Object);
        expect(resObj.live).toBe(true);
        expect(resObj.name).toBe("test");
        expect(resObj.age).toBe(1);
        expect(resObj.work.lat).toBe(1);
    });

    it('decode wrong data', () => {
        expect(target.decode("{-}", "json")).toBe("{-}");
        expect(target.decode("{.}", "json", { defaultValue: null, strict: true })).toBe(null);
        expect(target.decode("{}", "json", { defaultValue: null, strict: true })).toBeInstanceOf(Object);
        expect(target.decode("121212", "json", { defaultValue: false, strict: true })).toBe(false);
        expect(target.decode("121212", "json", { defaultValue: false, strict: false })).toBe("121212");
        expect(target.decode("test", "json", { defaultValue: false, strict: false })).toBe("test");
    });

    it('decode valid data with special characters', () => {
        const srtObj1 = '"{\\"W2F\\":\\"PIL W2F\\",\\"PAL\\":\\"PT PAL\\"}"';
        const srtObj2 = `
            "{\\"W2F\\":    \\"PIL W2F\\",
            \\"PAL\\":\\"PT     
            PAL\\"}"
        `;
        const resObj1 = target.decode(srtObj1, "json", { defaultValue: null, strict: true });
        const resObj2 = target.decode(srtObj2, "json", { defaultValue: null, strict: true });
        const resObj3 = target.decode(srtObj2, "json");

        expect(resObj1).toBeInstanceOf(Object);
        expect(resObj2).toBeInstanceOf(Object);
        expect(resObj1.W2F).toBe("PIL W2F");
        expect(resObj2.W2F).toBe("PIL W2F");
        expect(resObj3).toBe(srtObj2);
    });

    it('encode wrong data', () => {
        expect(target.encode("{.}", "json")).toBe("{.}");
        expect(target.encode("{.}", "json", { strict: false })).toBe('{.}');
        expect(target.encode("{.}", "json", { defaultValue: false, strict: true })).toBe(false);
        expect(target.encode("121212", "json", { defaultValue: false, strict: true })).toBe(false);
        expect(target.encode(121212, "json", { defaultValue: false, strict: true })).toBe(false);
        expect(target.encode(121212, "json", { strict: true })).toBe("");
        expect(target.encode(121212, "json")).toBe(121212);
        expect(target.encode("121212", "json", { strict: false })).toBe('121212');
        expect(target.encode("test", "json", { strict: false })).toBe('test');
    });

    it('encode valid data', () => {
        const srtObj = '{"age":1,"name":"test","live":true,"work":{"lat":1}}';
        const resObj = { "age": 1, "name": "test", "live": true, "work": { "lat": 1 } };
        expect(target.encode(resObj, "json")).toBe(srtObj);
    });

    it('encode objects with cyclic dependencies', () => {
        const resStr = '{"age":1,"name":"test","live":true,"work":{"lat":1}}';
        const reqObj = { "age": 1, "name": "test", "live": true, "work": { "lat": 1 } };
        reqObj.ref = reqObj;
        const reqStr = target.encode(reqObj, "json");
        expect(typeof reqStr).toBe("string");
        expect(reqStr).toBe(resStr);
    });
});
