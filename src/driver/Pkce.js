const KsDriver = require("../KsDriver");

class KsPKCE extends KsDriver {

    encode(data, options) {
        const method = options?.method || 'plain'; // plain / sha256
        if (method !== 'plain') {
            const enco = this.lib?.encode && this.lib.encode(data, method);
            const buff = Buffer.from(enco, 'hex');
            const content = buff && this.lib?.encode && this.lib.encode(buff, 'base64', { url: true });
            return content?.replace && content.replace(/\./g, '');
        } else {
            return data;
        }
    }

    verify(data, options) {
        const inData = this.lib.encode && this.lib.encode(data, options);
        return inData === options?.secret;
    }
}
module.exports = KsPKCE;