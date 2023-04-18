const KsDriver = require("../KsDriver");

class KsJson extends KsDriver {

    encode(value, options) {
        options = options || {};
        const avoidCCS = () => {
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
        try {
            options.validType = "object";
            return this.respond(value, null, options) ?? JSON.stringify(value, avoidCCS());
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