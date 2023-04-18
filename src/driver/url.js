const KsDriver = require("../KsDriver");

class KsURL extends KsDriver {

    encode(data, options) {
        options.character = options.character || { '/': '_', '\\+': '-', '=': '.' };
        return this.replace(data, options.character);
    }

    decode(data, options) {
        options.character = options.character || { _: '/', '-': '+', '\\.': '=' };
        return this.replace(data, options.character);
    }
}
module.exports = KsURL;