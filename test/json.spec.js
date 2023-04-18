
describe('JSON', () => {

    it('decode valid data', () => {
        const srtObj = '{ "age": 1, "name": "test", "live":true, "work": { "lat": 1 } }';
        const resObj = target.decode(srtObj, "json");
        const resOb1 = target.decode({ age: 1 }, "json");
        const resOb2 = target.decode({ age: 1 }, "json", { strict: true });

        expect(resOb1.age).to.be.eq(1);
        expect(resOb2).to.be.eq("");
        expect(resObj).to.be.an.instanceof(Object);
        expect(resObj.live).to.be.eq(true);
        expect(resObj.name).to.be.eq("test");
        expect(resObj.age).to.be.eq(1);
        expect(resObj.work.lat).to.be.eq(1);
    });

    it('decode wrong data', () => {
        expect(target.decode("{-}", "json")).to.be.eq("{-}");
        expect(target.decode("{.}", "json", { defaultValue: null, strict: true })).to.be.eq(null);
        expect(target.decode("{}", "json", { defaultValue: null, strict: true })).to.be.an.instanceof(Object);
        expect(target.decode("121212", "json", { defaultValue: false, strict: true })).to.be.eq(false);
        expect(target.decode("121212", "json", { defaultValue: false, strict: false })).to.be.eq("121212");
        expect(target.decode("test", "json", { defaultValue: false, strict: false })).to.be.eq("test");
    });

    it('encode wrong data', () => {
        expect(target.encode("{.}", "json")).to.be.eq("{.}");
        expect(target.encode("{.}", "json", { strict: false })).to.be.eq('{.}');
        expect(target.encode("{.}", "json", { defaultValue: false, strict: true })).to.be.eq(false);
        expect(target.encode("121212", "json", { defaultValue: false, strict: true })).to.be.eq(false);
        expect(target.encode(121212, "json", { defaultValue: false, strict: true })).to.be.eq(false);
        expect(target.encode(121212, "json", { strict: true })).to.be.eq("");
        expect(target.encode(121212, "json")).to.be.eq(121212);
        expect(target.encode("121212", "json", { strict: false })).to.be.eq('121212');
        expect(target.encode("test", "json", { strict: false })).to.be.eq('test');
    });

    it('encode valid data', () => {
        const srtObj = '{"age":1,"name":"test","live":true,"work":{"lat":1}}';
        const resObj = { "age": 1, "name": "test", "live": true, "work": { "lat": 1 } };
        expect(target.encode(resObj, "json")).to.be.eq(srtObj);
    });
});
