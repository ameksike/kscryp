const KsDriver = require("../KsDriver");

class KsJWT extends KsDriver {

    encode(data, options) {
        try{
            const jwt = require('jsonwebtoken');
            return jwt.sign(data, options?.privateKey || "!ksike!", {
                expiresIn: options?.expiresIn || "30m"
            });
        }
        catch(error){
            this.lib?.log({ src: "JWT:encode", data, error });
            return null;
        }
    }

    decode(data, options) {
        try {
            const jwt = require('jsonwebtoken');
            return jwt.verify(data, options?.privateKey || "!ksike!", options?.callback);
        }
        catch(error) {
            this.lib?.log({ src: "JWT:encode", data, error });
            return null;
        }
    }

    verify(data, options) {
        return !!this.decode(data, options);
    }
}
module.exports = KsJWT;