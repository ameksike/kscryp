const KsDriver = require("../KsDriver");

class KsJson extends KsDriver {

    #check() {
        const seen = new WeakSet()
        return (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return
                }
                seen.add(value)
            }
            return value
        }
    }

    encode(value, options) {
        options = options || {};
        try {
            options.validType = "object";
            return this.respond(value, null, options) ?? JSON.stringify(value, this.#check());
        }
        catch (error) {
            return this.respond(value, error, options);
        }
    }

    decode(value, options) {
        options = options || {};
        try {
            options.validType = "string";
            return this.respond(value, null, options) ?? JSON.parse(value);
        }
        catch (error) {
            return this.respond(value, error, options);
        }
    }
}
module.exports = KsJson;