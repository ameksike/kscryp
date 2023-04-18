const KsDriver = require("../KsDriver");

class KsMd5 extends KsDriver {

    encode(data) {
        const md5 = require('md5');
        return md5(data);
    }

    verify(data, options) {
        const md5 = require('md5');
        return data === md5(options?.key);
    }
}
module.exports = KsMd5;