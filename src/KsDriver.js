class KsDriver {

    encode(value, options) {
        return value;
    }

    decode(value, options) {
        return value;
    }

    verify(value, options) {
        return value;
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
        function isValid(value, type) {
            const check = typeof (value) === type;
            return type === "string"
                ? (check && isNaN(value) && !value.trim().match(/^(true|false|null)$/ig))
                : check;
        }
        return isValid(value, options.validType) ? null : (strict ? defaultValue : value);
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