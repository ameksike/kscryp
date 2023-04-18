const KsDriver = require("../KsDriver");

class KsJWT extends KsDriver {

    encode(data, options) {
        options = options || {};
        options.encode = options.encode || 'base64';
        const key = data.key || data.id;
        const code = data.code || data.token;
        const hex = data.data && this.lib?.encode && this.lib.encode(data.data, "hex", options);
        const meta = data.data && hex ? ':' + hex : '';
        return this.lib.encode && this.lib.encode(
            `${key}:${code}${meta}`,
            options.encode,
            options
        );
    }

    decode(data, options) {
        options = options || {};
        options.encode = options.encode || 'base64';
        const bearer = data.split(' ');
        const code = bearer.length > 1 ? bearer[1] : data;
        const token = this.lib?.decode && this.lib.decode(code, options.encode).split(':');
        if (!token) {
            return null;
        }
        const content = {
            key: token[0],
            code: token[1]
        };
        if (token[2]) {
            content.data = this.lib?.decode && this.lib.decode(token[2], 'hex');
        }
        return content;
    }

}
module.exports = KsJWT;