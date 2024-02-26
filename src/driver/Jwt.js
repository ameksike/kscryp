const KsDriver = require("../KsDriver");

class KsJWT extends KsDriver {

    encode(data, options) {
        options = options || {};
        try {
            const jwt = require('jsonwebtoken');

            return jwt.sign(data, options?.privateKey || "!ksike!", {
                ...options?.extra,
                algorithm: options?.algorithm || 'HS256',
                expiresIn: options?.expiresIn || 60 * 60
            });
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:JWT:encode", data, error });
            options.error = error;
            return null;
        }
    }

    decode(data, options) {
        options = options || {};
        try {
            if (options?.verify === false) {
                let tmp = this.unpack(data);
                let res = options?.full ? tmp : tmp?.data;
                if (res && options?.validate) {
                    res.sts = this.verify(data, options);
                }
                return res;
            }
            const jwt = require('jsonwebtoken');
            return jwt.verify(data, options?.privateKey || "!ksike!", {
                ...options?.extra,
                algorithm: options?.algorithm || ['HS256']
            }, options?.callback);
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:JWT:encode", data, error });
            options.error = error;
            return null;
        }
    }

    verify(data, options) {
        options = options || {};
        options.verify = true;
        return !!this.decode(data, options);
    }

    unpack(data, options) {
        options = options || {};
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
            options.error = error;
            return null;
        }
    }
}
module.exports = KsJWT;