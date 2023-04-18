const KsDriver = require("../KsDriver");

class KsBase64 extends KsDriver {

    encode(data, options) {
        options = options || {};
        options.encoding = this.getEncoding(data, options)
        let content = Buffer.from(data, options.encoding).toString('base64');
        content = options.url && this.lib?.encode ? this.lib.encode(data, "url", options) : content;
        return content;
    }

    decode(data, options) {
        options = options || {};
        data = options.url && this.lib?.encode ? this.lib.decode(data, "url", options) : data;
        options.encoding = this.getEncoding(data, options);
        return Buffer.from(data, 'base64').toString(options.encoding);
    }
}
module.exports = KsBase64;