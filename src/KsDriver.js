class KsDriver {

    constructor(lib) {
        this.lib = lib;
    }

    encode(value, options) {
        return null;
    }

    decode(value, options) {
        return null;
    }

    verify(value, options) {
        return null;
    }

    sign(value, options) {
        return null;
    }

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
     * @param {STRING} data
     * @param {OBJECT} options
     * @returns {STRING}
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