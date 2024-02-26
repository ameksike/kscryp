const KsCryp = require('../');

describe('Base32', () => {

    it("valid encode", () => {
        const res1 = KsCryp.encode("12345", "Base32");
        const res2 = KsCryp.encode({ "name": "daniel", "age": 12 }, "Base32");

        expect(res1).toBe("GEZDGNBV");
        expect(res2).toBe("PMRG4YLNMURDUITEMFXGSZLMEIWCEYLHMURDUMJSPU======");
    });

    it("valid decode", () => {
        const res1 = KsCryp.decode("GEZDGNBV", "Base32");
        const res2 = KsCryp.decode("PMRG4YLNMURDUITEMFXGSZLMEIWCEYLHMURDUMJSPU======", "Base32");
        const res3 = KsCryp.decode("PMRG4YLNMURDUITEMFXGSZLMEIWCEYLHMURDUMJSPU", "Base32", { json: true });

        expect(res1).toBe("12345");
        expect(res2).toBe('{"name":"daniel","age":12}');
        expect(res3.name).toBe("daniel");
        expect(res3.age).toBe(12);
    });
});