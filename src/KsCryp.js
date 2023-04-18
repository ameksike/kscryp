const KsDp = require('ksdp');
/**
 * @description Allow encode/decode/verify base on different format
 * @module utils/Cryp
 * @requires jsonwebtoken
 * @requires md5 
 */
class KsCryp {

    constructor() {
        this.drv = new KsDp.behavioral.Strategy({
            path: __dirname,
            default: 'driver'
        });
    }

    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data 
     * @param {String} algorithm String [json | base64 | sha1 | sha256 | md5 | totp | hash | hex | pkce | hash | basic | token | jwt | checksum]
     * @param {Object} options Object config options based on selected algorithm.
     * @return {String} data
     */
    encode(data, algorithm, options) {
        return this.run(data, algorithm, options);
    }

    /**
     * @description Decoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {String} algorithm String [json | base64 | hash | totp | checksum | hex | basic | token | jwt | signature ]
     * @param {Object} options Object config options based on selected algorithm
     * @return {String|Object} data
     */
    decode(data, algorithm, options) {
        return this.run(data, algorithm, options, "Decode");
    }

    /**
     * @description Verify data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {String} algorithm String [json | base64 | hash | totp | checksum | hex | basic | token | jwt | signature ]
     * @param {Object} options Object config options based on selected algorithm
     * @return {Boolean} data
     */
    verify(data, algorithm, options) {
        return this.run(data, algorithm, options, "Verify");
    }

}

module.exports = KsCryp;