const KsDriver = require("../KsDriver");
const { TextEncoder, TextDecoder } = require('util');

class KsArrayBuffer extends KsDriver {

    encode(data, options) {
        options = options || {};
        try {
            if (data instanceof ArrayBuffer) {
                return data;
            }
            const encoder = new TextEncoder();
            return encoder.encode(data).buffer;
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:ArrayBuffer:encode", data, error });
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
            const decoder = new TextDecoder();
            return decoder.decode(data);
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:ArrayBuffer:decode", data, error });
            options.error = error;
            return data;
        }
    }
}
module.exports = KsArrayBuffer;