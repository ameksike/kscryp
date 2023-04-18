const KsDriver = require("../KsDriver");

class KsHex extends KsDriver {

    encode(data, options) {
        const encoding = this.getEncoding(data, options);
        data = this.lib?.encode && this.lib.encode(data, 'json', { strict: false });
        return data && Buffer.from(String(data), encoding).toString('hex');
    }

    decode(data, options) {
        const encoding = this.getEncoding(data, options);
        const content = Buffer.from(data, 'hex').toString(encoding);
        return content && this.lib.decode && this.lib.decode(content, 'json', { strict: false });
    }
}
module.exports = KsHex;