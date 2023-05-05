const KsDriver = require("../KsDriver");

class KsHash extends KsDriver {

    constructor(lib) {
        super(lib);
        this.drv = require("crypto");
        this.algorithm = "sha256";
    }

    encode(data, options) {
        options = options || {};
        options.algorithm = options.algorithm || this.algorithm;
        return this.drv.createHash(options.algorithm).update(data).digest('hex');
    }

    verify(data, options) {
        return data === this.encode(options?.key, options);
    }

    support() {
        return this.drv.getHashes() || [];
    }

    isSupported(algorithm) {
        return algorithm && this.support().includes(algorithm);
    }
}
module.exports = KsHash;