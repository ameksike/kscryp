const KsDriver = require("../KsDriver");

class KsHex extends KsDriver {

    encode(data, options) {
        try {
            const encoding = this.getEncoding(data, options);
            data = this.lib?.encode && this.lib.encode(data, 'json', { strict: false });
            return data && Buffer.from(String(data), encoding).toString('hex');
        }
        catch (error) {
            this.lib?.log({ src: "kscryp:Hex:encode", data, error });
            return null;
        }
    }

    decode(data, options) {
        try {
            const encoding = this.getEncoding(data, options);
            const content = Buffer.from(data, 'hex').toString(encoding);
            return content && options?.json && this.lib.decode ? this.lib.decode(content, 'json', { strict: false }) : content;
        }
        catch (error) {
            this.lib?.log({ src: "kscryp:Hex:decode", data, error });
            return null;
        }
    }
}
module.exports = KsHex;