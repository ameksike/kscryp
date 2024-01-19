export = KsCryp;
/**
 * @description Allow encode/decode/verify base on different format
 * @module KsCryp
 * @requires ksdp
 */
/**
 * @typedef {({[name:String]:Object})} List
 **/
/**
 * @typedef {'json' | 'base64' | 'sha1' | 'sha256' | 'md5' | 'totp' | 'hash' | 'hex' | 'pkce' | 'hash' | 'basic' | 'token' | 'jwt' | 'rsa' | 'checksum' } EnumAlgorithm
 * @typedef {'json' | 'base64' | 'totp' | 'hash' | 'hex' | 'signature' | 'basic' | 'token' | 'jwt' | 'checksum' | 'rsa' } EnumAlgorithmDecode
 */
declare class KsCryp {
    constructor(opt: any);
    drv: import("ksdp/types/src/behavioral/Strategy");
    cmd: import("ksdp/types/src/behavioral/Command");
    default: string;
    logger: Console;
    /**
     * @description configure library
     * @param {Object} [opt]
     * @param {String} [opt.default=json]
     * @param {Console} [opt.log]
     * @returns {Object} KsCryp
     */
    configure(opt?: {
        default?: string;
        log?: Console;
    }): any;
    /**
     * @description Encoded data from an algorithm
     * @param {EnumAlgorithm} [algorithm]
     * @param {Object} [params]
     * @param {String} [action=encode]
     * @return {String} data
     */
    run(algorithm?: EnumAlgorithm, params?: any, action?: string): string;
    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data
     * @param {EnumAlgorithm} [algorithm=json]
     * @param {Object} [options] Object config options based on selected algorithm.
     * @return {String|Buffer} data
     */
    encode(data: string | number | any, algorithm?: EnumAlgorithm, options?: any): string | Buffer;
    /**
     * @description Decoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {EnumAlgorithmDecode} [algorithm=json]
     * @param {Object} [options] Object config options based on selected algorithm
     * @return {String|Object} data
     */
    decode(data: string | number | any, algorithm?: EnumAlgorithmDecode, options?: any): string | any;
    /**
     * @description Verify data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {EnumAlgorithmDecode} [algorithm=json]
     * @param {Object} [options] Object config options based on selected algorithm
     * @return {Boolean} data
     */
    verify(data: string | number | any, algorithm?: EnumAlgorithmDecode, options?: any): boolean;
    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {EnumAlgorithmDecode} [algorithm=json]
     * @param {Object} [options] Object config options based on selected algorithm
     * @return {String|Buffer} data
     */
    sign(data: string | number | any, algorithm?: EnumAlgorithmDecode, options?: any): string | Buffer;
    /**
     * @description Encoded data from an algorithm
     * @param {EnumAlgorithmDecode} [algorithm=rsa]
     * @param {Object} [options] Object config options based on selected algorithm
     * @return {String|Buffer} data
     */
    generate(algorithm?: EnumAlgorithmDecode, options?: any): string | Buffer;
    /**
     * @description set an external driver format
     * @param {Object} payload
     * @param {String} [alias]
     * @returns {Object}
     */
    use(...args: any[]): any;
    /**
     * @description set an external driver format
     * @param {Object} payload
     * @param {String} [alias]
     * @returns {Object}
     */
    set(...args: any[]): any;
    /**
     * @description get a certain algorithm implementation
     * @param {String} [algorithm=json]
     * @returns {Object}
     */
    get(algorithm?: string): any;
    /**
     * @description internal log handler
     */
    log(...args: any[]): this;
}
declare namespace KsCryp {
    export { List, EnumAlgorithm, EnumAlgorithmDecode };
}
type List = {
    [name: string]: any;
};
type EnumAlgorithm = 'json' | 'base64' | 'sha1' | 'sha256' | 'md5' | 'totp' | 'hash' | 'hex' | 'pkce' | 'hash' | 'basic' | 'token' | 'jwt' | 'rsa' | 'checksum';
type EnumAlgorithmDecode = 'json' | 'base64' | 'totp' | 'hash' | 'hex' | 'signature' | 'basic' | 'token' | 'jwt' | 'checksum' | 'rsa';
