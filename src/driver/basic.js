const KsDriver = require("../KsDriver");

class KsJWT extends KsDriver {

    encode(data, options) {
        options.encode = options.encode || 'base64';
        const key = data.key || data.id;
        const code = data.code || data.token;
        const meta = data.data ? ':' + this.encode(data.data, 'hex') : '';
        return this.encode(
            `${key}:${code}${meta}`,
            options.encode,
            options
        );
    }

    decode(data, options) {
        options.encode = options.encode || 'base64';
        const bearer = data.split(' ');
        const code = bearer.length > 1 ? bearer[1] : data;
        const token = this.decode(code, options.encode).split(':');
        const content = {
            key: token[0],
            code: token[1]
        };
        if (token[2]) {
            content.data = this.decode(token[2], 'hex');
        }
        return content;
    }

}
module.exports = KsJWT;