const KsDp = require('ksdp');
/**
 * @description Allow encode/decode/verify base on different format
 * @module KsCryp
 * @requires ksdp
 */
class KsCryp {

    constructor(opt) {
        this.drv = new KsDp.behavioral.Strategy({
            path: __dirname,
            default: 'driver'
        });
        this.cmd = new KsDp.behavioral.Command();
        this.default = "json";
        this.logger = console;
        this.configure(opt);
    }

    /**
     * @description configure library
     * @param {Object} opt 
     * @returns {Object} KsCryp
     */
    configure(opt) {
        this.default = opt?.default ?? this.default;
        this.logger = opt?.logger ?? opt?.log ?? this.logger;
        return this;
    }

    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data 
     * @param {String} algorithm String [json | base64 | sha1 | sha256 | md5 | totp | hash | hex | pkce | hash | basic | token | jwt | checksum]
     * @param {Object} options Object config options based on selected algorithm.
     * @return {String} data
     */
    encode(data, algorithm, options) {
        const drv = this.drv.get({ name: algorithm || this.default, params: [this] });
        if (!drv?.encode) {
            return null;
        }
        return drv.encode(data, options);
    }

    /**
     * @description Decoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {String} algorithm String [json | base64 | hash | totp | checksum | hex | basic | token | jwt | signature ]
     * @param {Object} options Object config options based on selected algorithm
     * @return {String|Object} data
     */
    decode(data, algorithm, options) {
        const drv = this.drv.get({ name: algorithm || this.default, params: [this] });
        if (!drv?.encode) {
            return null;
        }
        return drv.decode(data, options);
    }

    /**
     * @description Verify data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {String} algorithm String [json | base64 | hash | totp | checksum | hex | basic | token | jwt | signature ]
     * @param {Object} options Object config options based on selected algorithm
     * @return {Boolean} data
     */
    verify(data, algorithm, options) {
        const drv = this.drv.get({ name: algorithm || this.default, params: [this] });
        if (!drv?.verify) {
            return null;
        }
        return drv.verify(data, options);
    }

    /**
     * @description set an external driver format
     * @param {Object} payload 
     * @param {String} alias [OPTIONAL]
     * @returns {Object}
     */
    use() {
        this.drv?.set && this.drv.set(...arguments);
        return this;
    }

    /**
     * @description internal log handler 
     */
    log() {
        this.logger?.log && this.logger.log(...arguments);
        return this;
    }
}

module.exports = KsCryp;