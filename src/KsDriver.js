class KsDriver {

    constructor(lib) {
        this.lib = lib;
    }

    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data
     * @param {Object} options Object config.
     * @return {String|Buffer} data
     */
    encode(value, options) {
        return null;
    }

    /**
     * @description Decoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {Object} options Object config.
     * @return {String|Object} data
     */
    decode(value, options) {
        return null;
    }

    /**
     * @description Verify data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {Object} options Config options
     * @return {Boolean} data
     */
    verify(value, options) {
        return null;
    }

    /**
     * @description Encoded data from an algorithm
     * @param {String|Number|Object} data String to decode
     * @param {Object} options Config options
     * @return {String|Buffer} data
     */
    sign(value, options) {
        return null;
    }

    /**
     * @description Encoded data from an algorithm
     * @param {Object} options Object config options based on selected algorithm
     * @return {String|Buffer} data
     */
    generate(options) {
        return options;
    }

    /**
     * @description get a string as a result of a character substitution
     * @param {String} data 
     * @param {Array} character 
     * @returns {String} value
     */
    replace(data, character) {
        if (character) {
            for (const i in character) {
                data = data.replace(new RegExp(i, 'g'), character[i]);
            }
        }
        return data;
    }

    /**
     * @description 
     * @param {*} value 
     * @param {*} error 
     * @param {*} options 
     * @returns 
     */
    respond(value, error, options) {
        const { strict = false, defaultValue = "" } = options || {};
        if (!value || error) {
            return strict ? defaultValue : value;
        }
        return this.isValid(value, options.validType) ? null : (strict ? defaultValue : value);
    }

    /**
     * @description check if it is a valid value based on a certain data type
     * @param {*} value 
     * @param {String} type 
     * @returns {Boolean} value 
     */
    isValid(value, type) {
        const check = typeof (value) === type;
        return type === "string"
            ? (check && isNaN(value) && !value.trim().match(/^(true|false|null)$/ig))
            : check;
    }

    /**
     * @description get string encode
     * @param {String} data
     * @param {Object} options
     * @returns {String}
     */
    getEncoding(data, options) {
        return options && options.encoding
            ? options.encoding
            : /[À-ÿ\u00f1\u00d1]/gi.test(data)
                ? 'latin1'
                : 'ascii'
    }
}
module.exports = KsDriver;