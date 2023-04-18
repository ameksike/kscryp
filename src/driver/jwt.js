const KsDriver = require("../KsDriver");

class KsJWT extends KsDriver {

    encode(data, options) {
        options = options || {};
        const jwt = require('jsonwebtoken');
        const AUTH_PRIVATE_KEY = options.privateKey || process.env.AUTH_PRIVATE_KEY;
        const AUTH_PRIVATE_KEY_EXP_TIME = options.privateKeyExpTime || process.env.AUTH_PRIVATE_KEY_EXP_TIME;
        return jwt.sign(data, AUTH_PRIVATE_KEY, {
            expiresIn: AUTH_PRIVATE_KEY_EXP_TIME
        });
    }

    decode(data, options) {
        const jwt = require('jsonwebtoken');
        const AUTH_PRIVATE_KEY = options.privateKey || process.env.AUTH_PRIVATE_KEY;
        return jwt.verify(data, AUTH_PRIVATE_KEY, options.callback);
    }
}
module.exports = KsJWT;