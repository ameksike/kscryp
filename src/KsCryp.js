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
        this.default = opt?.default || "json";
    }

    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data 
     * @param {String} algorithm String [json | base64 | sha1 | sha256 | md5 | totp | hash | hex | pkce | hash | basic | token | jwt | checksum]
     * @param {Object} options Object config options based on selected algorithm.
     * @return {String} data
     */
    encode(data, algorithm, options) {
        const drv = this.drv.get({ name: algorithm || this.default, params: [{ lib: this }] });
        if (!drv.encode) {
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
        const drv = this.drv.get({ name: algorithm || this.default, params: [{ lib: this }] });
        if (!drv.encode) {
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
        const drv = this.drv.get({ name: algorithm || this.default, params: [{ lib: this }] });
        if (!drv.encode) {
            return null;
        }
        return drv.verify(data, options);
    }

}

module.exports = KsCryp;