const KsDriver = require("../KsDriver");

class KsURL extends KsDriver {

    encode(data, options) {
        const character = options?.character || { '/': '_', '\\+': '-', '=': '.' };
        return this.replace(data, character);
    }

    decode(data, options) {
        const character = options?.character || { _: '/', '-': '+', '\\.': '=' };
        return this.replace(data, character);
    }
}
module.exports = KsURL;