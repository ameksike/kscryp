const KsDriver = require("../KsDriver");

class KsJWT extends KsDriver {

    encode(data, options) {
        const jwt = require('jsonwebtoken');
        return jwt.sign(data, options?.privateKey || "!ksike!", {
            expiresIn: options?.privateKeyExpTime || "30m"
        });
    }

    decode(data, options) {
        const jwt = require('jsonwebtoken');
        return jwt.verify(data, options?.privateKey || "!ksike!", options?.callback);
    }
}
module.exports = KsJWT;