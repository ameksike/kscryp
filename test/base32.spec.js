const KsCryp = require('../');

describe('Base32', () => {

    it("valid encode", () => {
        const res1 = KsCryp.encode("12345", "Base32");
        const res2 = KsCryp.encode({ "name": "daniel", "age": 12 }, "Base32");
        const res3 = KsCryp.encode("á#$-/%@(1[*]=?+¿&q9021567Fxzóñ).", "Base32");

        expect(res1).toBe("GEZDGNBV");
        expect(res2).toBe("PMRG4YLNMURDUITEMFXGSZLMEIWCEYLHMURDUMJSPU======");
        expect(res3).toBe("YOQSGJBNF4SUAKBRLMVF2PJ7FPBL6JTRHEYDEMJVGY3UM6D2YOZ4HMJJFY======");
        
    });

    it("valid decode", () => {
        const res1 = KsCryp.decode("GEZDGNBV", "Base32");
        const res2 = KsCryp.decode("PMRG4YLNMURDUITEMFXGSZLMEIWCEYLHMURDUMJSPU======", "Base32");
        const res3 = KsCryp.decode("PMRG4YLNMURDUITEMFXGSZLMEIWCEYLHMURDUMJSPU", "Base32", { json: true });
        const res4 = KsCryp.decode("YOQSGJBNF4SUAKBRLMVF2PJ7FPBL6JTRHEYDEMJVGY3UM6D2YOZ4HMJJFY======", "Base32");
        const res5 = KsCryp.decode("YOQSGJBNF4SUAKBRLMVF2PJ7FPBL6JTRHEYDEMJVGY3UM6D2YOZ4HMJJFY", "Base32");

        expect(res1).toBe("12345");
        expect(res2).toBe('{"name":"daniel","age":12}');
        expect(res3.name).toBe("daniel");
        expect(res3.age).toBe(12);
        expect(res4).toBe("á#$-/%@(1[*]=?+¿&q9021567Fxzóñ).");
        expect(res5).toBe("á#$-/%@(1[*]=?+¿&q9021567Fxzóñ).");
    });
});