const KsDriver = require("../KsDriver");

class KsBase32 extends KsDriver {

    #default = 'RFC4648';
    #chars = {
        'RFC3548': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
        'RFC4648': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
        'RFC4648_HEX': '0123456789ABCDEFGHIJKLMNOPQRSTUV',
        'CROCKFORD': '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
    };

    clean(value, key = 'RFC3548') {
        key = key.toUpperCase();
        if (key === 'RFC3548' || key === 'RFC4648' || key === 'RFC4648-HEX' || key === 'HEX') {
            return value.replace(/=+$/, '');
        }
        if (key === 'CROCKFORD') {
            return value.replace(/O/gi, '0').replace(/[IL]/gi, '1');
        }
        return value;
    }

    encode(data, options) {
        options = options || {};
        try {
            data = typeof (data) !== "string" && this.lib?.encode(data, "json", options) || data;
            let variant = options?.variant || this.#default;
            let alphabet = this.#chars[variant] || this.#chars[this.#default];
            let padding = options?.padding ?? (variant !== 'CROCKFORD');
            let view = this.lib?.encode(this.clean(data, variant), "DataView", options);
            let bits = 0;
            let value = 0;
            let output = '';
            for (let i = 0; i < view.byteLength; i++) {
                value = (value << 8) | view.getUint8(i);
                bits += 8;
                while (bits >= 5) {
                    output += alphabet[(value >>> (bits - 5)) & 31];
                    bits -= 5;
                }
            }
            if (bits > 0) {
                output += alphabet[(value << (5 - bits)) & 31];
            }
            if (padding) {
                while ((output.length % 8) !== 0) {
                    output += '=';
                }
            }
            return output;
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:Base34:encode", data, error });
            options.error = error;
            return data;
        }
    }

    decode(data, options) {
        options = options || {};
        try {
            let variant = options?.variant || this.#default;
            let alphabet = this.#chars[variant] || this.#chars[this.#default];
            data = this.clean(data, variant);
            let bits = 0;
            let index = 0;
            let value = 0;
            let output = new Uint8Array((data.length * 5 / 8) | 0);
            for (let i = 0; i < data.length; i++) {
                value = (value << 5) | alphabet.indexOf(data[i]);
                bits += 5;
                if (bits >= 8) {
                    output[index++] = (value >>> (bits - 8)) & 255;
                    bits -= 8;
                }
            }
            let result = Buffer.from(output.buffer).toString();
            return options.json && result ? this.lib.decode(result, "json", options) : result;
        }
        catch (error) {
            this.lib?.log && this.lib.log({ src: "kscryp:Base34:decode", data, error });
            options.error = error;
            return data;
        }
    }
}
module.exports = KsBase32;