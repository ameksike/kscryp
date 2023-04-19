const KsCryp = require('../');
KsCryp.configure({ logger: false });
const payload = {
    userId: 11111,
    domain: 33333
};
const config = {
    privateKey: "ccb0eea8a",
    expiresIn: "30y"
};
const tokenExpired = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMTExLCJkb21haW4iOjMzMzMzLCJpYXQiOjE2ODE5MDEwNzEsImV4cCI6MTY4MTkwMTI1MX0.3V3nOWxHA5_uB_EdMikNRKFwJDq9uc43DSonrajYPn4';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMTExLCJkb21haW4iOjMzMzMzLCJpYXQiOjE2ODE5MDE5ODMsImV4cCI6MjYyODYyOTk4M30.vTVf34ZTYcCmR9Hw2AbM4nodxN2ArVVe7rVTHsoi6ng';

describe('JWT', () => {

    it("valid encode", (done) => {
        const res1 = KsCryp.encode(payload, "jwt", config);
        expect(typeof (res1)).toBe("string");
        expect(res1.length > 10).toBe(true);
        expect(res1).not.toBe(token);
        done();
    });

    it("valid decode", (done) => {
        const res1 = KsCryp.decode(token, "jwt", config);
        const res2 = KsCryp.decode(tokenExpired, "jwt", config);
        expect(res1.userId).toBe(payload.userId);
        expect(res1.domain).toBe(payload.domain);
        expect(res2).toBe(null);
        done();
    });

    it("valid very", (done) => {
        const res1 = KsCryp.verify(token, "jwt", config);
        const res2 = KsCryp.verify(tokenExpired, "jwt", config);
        expect(res1).toBe(true);
        expect(res2).toBe(false);
        done();
    });
});