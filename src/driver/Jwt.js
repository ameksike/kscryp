const KsDriver = require("../KsDriver");

class KsJWT extends KsDriver {

    encode(data, options) {
        try {
            const jwt = require('jsonwebtoken');

            return jwt.sign(data, options?.privateKey || "!ksike!", {
                expiresIn: options?.expiresIn || 60 * 60
            });
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:JWT:encode", data, error });
            return null;
        }
    }

    decode(data, options) {
        try {
            if (options?.verify === false) {
                let tmp = this.unpack(data);
                return options?.full ? tmp : tmp?.data;
            }
            const jwt = require('jsonwebtoken');
            return jwt.verify(data, options?.privateKey || "!ksike!", options?.callback);
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:JWT:encode", data, error });
            return null;
        }
    }

    verify(data, options) {
        return !!this.decode(data, options);
    }

    unpack(data) {
        try {
            if (!data) {
                return null;
            }
            const lst = data.split('.');
            return {
                head: this.lib.decode(Buffer.from(lst[0], 'base64').toString(), "json"),
                data: this.lib.decode(Buffer.from(lst[1], 'base64').toString(), "json"),
                code: lst[2]
            };
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:JWT:encode", data, error });
            return null;
        }
    }
}
module.exports = KsJWT;