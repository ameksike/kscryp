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
});
