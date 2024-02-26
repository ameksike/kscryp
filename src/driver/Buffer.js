const KsDriver = require("kscryp/src/KsDriver");

class KsBuffer extends KsDriver {

    encode(data, options) {
        options = options || {};
        try {
            if (data instanceof Buffer) {
                return data;
            }
            let encoding = options.encoding || 'utf-8';
            return Buffer.from(data, encoding);
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:Buffer:encode", data, error });
            options.error = error;
            return data;
        }
    }

    decode(data, options) {
        options = options || {};
        try {
            if (typeof data === "string") {
                return data;
            }
            let encoding = options.encoding || 'utf-8';
            return data.toString(encoding);
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:Buffer:decode", data, error });
            options.error = error;
            return data;
        }
    }
}
module.exports = KsBuffer;