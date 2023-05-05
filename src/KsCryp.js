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
    run(algorithm, params, action = "encode") {
        try {
            return this.get(algorithm)[action](...params);
        }
        catch (error) {
            this.log({
                src: "kscryp:" + algorithm + ":" + action,
                error: { message: error?.message || error, stack: error?.stack },
                data: params
            });
            return null;
        }
    }

    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data 
     * @param {String} algorithm String [json | base64 | sha1 | sha256 | md5 | totp | hash | hex | pkce | hash | basic | token | jwt | checksum]
     * @param {Object} options Object config options based on selected algorithm.
     * @return {String|Buffer} data
     */
    encode(data, algorithm, options) {
        return this.run(algorithm, [data, options], "encode");
    }

    /**
     * @description Decoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {String} algorithm String [json | base64 | hash | totp | checksum | hex | basic | token | jwt | signature ]
     * @param {Object} options Object config options based on selected algorithm
     * @return {String|Object} data
     */
    decode(data, algorithm, options) {
        return this.run(algorithm, [data, options], "decode");
    }

    /**
     * @description Verify data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {String} algorithm String [json | base64 | hash | totp | checksum | hex | basic | token | jwt | signature ]
     * @param {Object} options Object config options based on selected algorithm
     * @return {Boolean} data
     */
    verify(data, algorithm, options) {
        return this.run(algorithm, [data, options], "verify");
    }

    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {String} algorithm String [json | base64 | hash | totp | checksum | hex | basic | token | jwt | signature ]
     * @param {Object} options Object config options based on selected algorithm
     * @return {String|Buffer} data
     */
    sign(data, algorithm, options) {
        return this.run(algorithm, [data, options], "sign") ||
            this.run(algorithm, [data, options], "encode");
    }

    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {String} algorithm String [json | base64 | hash | totp | checksum | hex | basic | token | jwt | signature ]
     * @param {Object} options Object config options based on selected algorithm
     * @return {String|Buffer} data
     */
    generate(algorithm, options) {
        return this.run(algorithm, [options], "generate");
    }

    /**
     * @description set an external driver format
     * @param {Object} payload 
     * @param {String} alias [OPTIONAL]
     * @returns {Object}
     */
    use() {
        try {
            this.drv?.set && this.drv.set(...arguments);
            return this;
        }
        catch (error) {
            this.log(error);
            return null;
        }
    }

    /**
     * @description set an external driver format
     * @param {Object} payload 
     * @param {String} alias [OPTIONAL]
     * @returns {Object}
     */
    set() {
        return this.use(...arguments);
    }

    /**
     * @description get a certain algorithm implementation 
     * @param {String} algorithm 
     * @returns {Object}
     */
    get(algorithm) {
        return algorithm && this.drv.get({
            name: algorithm || this.default,
            params: [this]
        });
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