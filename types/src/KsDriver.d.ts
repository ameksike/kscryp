export = KsDriver;
declare class KsDriver {
    constructor(lib: any);
    lib: any;
    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data
     * @param {Object} options Object config.
     * @return {String|Buffer} data
     */
    encode(value: any, options: any): string | Buffer;
    /**
     * @description Decoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {Object} options Object config.
     * @return {String|Object} data
     */
    decode(value: any, options: any): string | any;
    /**
     * @description Verify data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {Object} options Config options
     * @return {Boolean} data
     */
    verify(value: any, options: any): boolean;
    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {Object} options Config options
     * @return {String|Buffer} data
     */
    sign(value: any, options: any): string | Buffer;
    /**
     * @description Encoded data from an algorithm
     * @param {Object} options Object config options based on selected algorithm
     * @return {String|Buffer} data
     */
    generate(options: any): string | Buffer;
    /**
     * @description get a string as a result of a character substitution
     * @param {String} data
     * @param {Array} character
     * @returns {String} value
     */
    replace(data: string, character: any[]): string;
    /**
     * @description
     * @param {*} value
     * @param {*} error
     * @param {*} options
     * @returns
     */
    respond(value: any, error: any, options: any): any;
    /**
     * @description check if it is a valid value based on a certain data type
     * @param {*} value
     * @param {String} type
     * @returns {Boolean} value
     */
    isValid(value: any, type: string): boolean;
    /**
     * @description get string encode
     * @param {String} data
     * @param {Object} options
     * @returns {String}
     */
    getEncoding(data: string, options: any): string;
}
