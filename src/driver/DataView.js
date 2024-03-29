const KsDriver = require("../KsDriver");
const { TextEncoder } = require('util');

class KsDataView extends KsDriver {

    encode(data, options) {
        options = options || {};
        try {
            if (data instanceof DataView) {
                return data;
            }
            if (data instanceof Int8Array || data instanceof Uint8Array || data instanceof Uint8ClampedArray) {
                return new DataView(data.buffer, data.byteOffset, data.byteLength);
            }
            if (typeof data === "string") {
                data = (new TextEncoder()).encode(data).buffer;
            }
            return new DataView(data)
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:DataView:encode", data, error });
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
            if (!(data instanceof DataView)) {
                return null;
            }
            let encoding = options.encoding || 'utf-8';
            const buffer = data?.buffer && Buffer.from(data.buffer);
            return buffer.toString(encoding);
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:DataView:decode", data, error });
            options.error = error;
            return data;
        }
    }
}
module.exports = KsDataView;