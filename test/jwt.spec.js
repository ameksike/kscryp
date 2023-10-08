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

    it("unpack", (done) => {
        const jwtStr = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDEiLCJpYXQiOjE2OTIyOTg2OTYsImV4cCI6MTY5MjMwMDQ5Nn0.XACLhB1ggc1wvEQxt6JQBuCaP9djw7OO8e85A7L9TzM";
        const jwtObj = KsCryp.decode(jwtStr, "jwt", { verify: false });

        expect(jwtObj).toBeInstanceOf(Object);
        expect(jwtObj.name).toBe("test1");
        expect(jwtObj.sts).toBe(undefined);
        expect(jwtObj.exp).toBe(1692300496);
        expect(jwtObj.iat).toBe(1692298696);
        done();
    });

    it("decompress and validate", (done) => {
        const jwtStr = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDEiLCJpYXQiOjE2OTIyOTg2OTYsImV4cCI6MTY5MjMwMDQ5Nn0.XACLhB1ggc1wvEQxt6JQBuCaP9djw7OO8e85A7L9TzM";
        const jwtObj = KsCryp.decode(jwtStr, "jwt", { verify: false, validate: true });

        expect(jwtObj).toBeInstanceOf(Object);
        expect(jwtObj.name).toBe("test1");
        expect(jwtObj.sts).toBe(false);
        expect(jwtObj.exp).toBe(1692300496);
        expect(jwtObj.iat).toBe(1692298696);
        done();
    });

});