const KsDp = require('ksdp');
const path = require('path');
/**
 * @description Allow encode/decode/verify base on different format
 * @module KsCryp
 * @requires ksdp
 */
class KsCryp {

    /**
     * @typedef {'json' | 'base64' | 'sha1' | 'sha256' | 'md5' | 'totp' | 'hash' | 'hex' | 'pkce' | 'hash' | 'basic' | 'token' | 'jwt' | 'rsa' | 'checksum' } EnumAlgorithm
     * @typedef {'json' | 'base64' | 'totp' | 'hash' | 'hex' | 'signature' | 'basic' | 'token' | 'jwt' | 'checksum' | 'rsa' } EnumAlgorithmDecode
     */

    constructor(opt) {
        this.drv = new KsDp.behavioral.Strategy({
            path: path.resolve(__dirname),
            default: 'driver'
        });
        this.cmd = new KsDp.behavioral.Command();
        this.default = "json";
        this.logger = console;
        this.configure(opt);
    }

    /**
     * @description configure library
     * @param {Object} [opt] 
     * @param {String} [opt.default=json] 
     * @param {Console} [opt.log] 
     * @returns {Object} KsCryp
     */
    configure(opt) {
        this.default = opt?.default ?? this.default;
        this.logger = opt?.logger ?? opt?.log ?? this.logger;
        return this;
    }

    /**
     * @description Encoded data from an algorithm
     * @param {EnumAlgorithm} [algorithm] 
     * @param {Object} [params] 
     * @param {String} [action=encode] 
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
     * @param {EnumAlgorithm} [algorithm=json] 
     * @param {Object} [options] Object config options based on selected algorithm.
     * @return {String|Buffer} data
     */
    encode(data, algorithm = 'json', options = null) {
        return this.run(algorithm, [data, options], "encode");
    }

    /**
     * @description Decoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {EnumAlgorithmDecode} [algorithm=json] 
     * @param {Object} [options] Object config options based on selected algorithm
     * @return {String|Object} data
     */
    decode(data, algorithm = 'json', options = null) {
        return this.run(algorithm, [data, options], "decode");
    }

    /**
     * @description Verify data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {EnumAlgorithmDecode} [algorithm=json] 
     * @param {Object} [options] Object config options based on selected algorithm
     * @return {Boolean} data
     */
    verify(data, algorithm = 'json', options = null) {
        return this.run(algorithm, [data, options], "verify");
    }

    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {EnumAlgorithmDecode} [algorithm=json] 
     * @param {Object} [options] Object config options based on selected algorithm
     * @return {String|Buffer} data
     */
    sign(data, algorithm = 'json', options = null) {
        return this.run(algorithm, [data, options], "sign") ||
            this.run(algorithm, [data, options], "encode");
    }

    /**
     * @description Encoded data from an algorithm
     * @param {EnumAlgorithmDecode} [algorithm=rsa] 
     * @param {Object} [options] Object config options based on selected algorithm
     * @return {String|Buffer} data
     */
    generate(algorithm = 'rsa', options = null) {
        return this.run(algorithm, [options], "generate");
    }

    /**
     * @description set an external driver format
     * @param {Object} payload 
     * @param {String} [alias]
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
     * @param {String} [alias]
     * @returns {Object}
     */
    set() {
        return this.use(...arguments);
    }

    /**
     * @description get a certain algorithm implementation 
     * @param {String} [algorithm=json] 
     * @returns {Object}
     */
    get(algorithm = 'json') {
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