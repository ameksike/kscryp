const KsDriver = require("../KsDriver");

class KsPKCE extends KsDriver {

    encode(data, options) {
        const method = options.method || 'plain'; // plain / sha256
        if (method !== 'plain') {
            const enco = this.encode(data, method);
            const buff = Buffer.from(enco, 'hex');
            const content = this.encode(buff, 'base64', { url: true });
            return content.replace(/\./g, '');
        } else {
            return data;
        }
    }

    verify(data, options) {
        const inData = this.encode(data, options);
        return inData === options.secret;
    }
}
module.exports = KsPKCE;