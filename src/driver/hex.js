const KsDriver = require("../KsDriver");

class KsHex extends KsDriver {

    encode(data, options) {
        options.encoding = this.getEncoding(data, options);
        data = this.encode(data, 'json', { strict: false });
        return Buffer.from(String(data), options.encoding).toString('hex');
    }

    decode(data, options) {
        options.encoding = this.getEncoding(data, options);
        const content = Buffer.from(data, 'hex').toString(options.encoding);
        return this.decode(content, 'json', { strict: false });
    }
}
module.exports = KsHex;