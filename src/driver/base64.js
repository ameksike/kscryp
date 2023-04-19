const KsDriver = require("../KsDriver");

class KsBase64 extends KsDriver {

    encode(data, options) {
        try {
            options = options || {};
            options.encoding = this.getEncoding(data, options)
            let rawcont = typeof (data) !== "string" && this.lib?.encode ? this.lib.encode(data, "json", options) : data;
            let content = Buffer.from(rawcont, options.encoding).toString('base64');
            content = options.url && this.lib?.encode ? this.lib.encode(data, "url", options) : content;
            return content;
        }
        catch (error) {
            this.lib?.log({ src: "kscryp:Base64:encode", data, error });
            return data;
        }
    }

    decode(data, options) {
        try {
            options = options || {};
            data = options.url && this.lib?.encode ? this.lib.decode(data, "url", options) : data;
            options.encoding = this.getEncoding(data, options);
            const content = Buffer.from(data, 'base64').toString(options.encoding);
            return options.json && content ? this.lib.decode(content, "json", options) : content;
        }
        catch (error) {
            this.lib?.log({ src: "kscryp:Base64:decode", data, error });
            return data;
        }
    }
}
module.exports = KsBase64;