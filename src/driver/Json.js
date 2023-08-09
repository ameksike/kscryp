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

    #clean(val) {
        if (typeof val !== "string") {
            return val;
        }
        return val
            .replace(/\\r|\r|\n|\\n/g, "")

            .replace(/{[\s|\\]+"/g, '{"')
            .replace(/[\s|\\]+"[\s|,]*}/g, '"}')
            .replace(/\[[\s|\\]+"/g, '["')
            .replace(/[\s|\\]+"[\s|,]*\]/g, '"]')
            .replace(/,[\s|\\]+"/g, ',"')
            .replace(/[\s|\\]+"\s*,/g, '",')
            .replace(/:[\s|\\]+"/g, ':"')
            .replace(/[\s|\\]+"\s*:/g, '":')

            .replace(/[\s|'|"]+{/g, '{')
            .replace(/}[\s|'|"]+/g, '}')
            .replace(/[\s|'|"]+\[/g, '[')
            .replace(/\][\s|'|"]+/g, ']')
  
            .replace(/\][\s|,]+\]/g, ']]')
            .replace(/\}[\s|,]+\]/g, '}]')
            .replace(/\][\s|,]+\}/g, ']}')
            .replace(/\}[\s|,]+\}/g, '}}')

            .replace(/true[\s|,]+\}/g, 'true}')
            .replace(/false[\s|,]+\}/g, 'false}')
            .replace(/true[\s|,]+\]/g, 'true]')
            .replace(/false[\s|,]+\]/g, 'false]')
        ;
    }

    encode(value, options) {
        options = options || {};
        try {
            options.validType = "object";
            options.clean && (value = this.#clean(value));
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
            options.clean && (value = this.#clean(value));
            return this.respond(value, null, options) ?? JSON.parse(value);
        }
        catch (error) {
            return this.respond(value, error, options);
        }
    }
}
module.exports = KsJson;