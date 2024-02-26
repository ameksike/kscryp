const KsCryp = require('../');

describe('TOTP', () => {

    it("valid encode", () => {
        const otp = KsCryp.encode("DEMO", "totp");
        const res = KsCryp.verify(otp.token, "totp", { secret: otp.secret });

        expect(res).toBe(true);
        expect(String(otp.token).length).toBe(6);
        expect(String(otp.secret).length).toBe(16);
    });

});