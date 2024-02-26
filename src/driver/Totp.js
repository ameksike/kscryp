const KsDriver = require("kscryp/src/KsDriver");
const crypto = require('crypto');

class TOPTP extends KsDriver {

    generateSecretKey(window = 5, encoding = "Base32") {
        const secret = crypto.randomBytes(window).toString('hex');
        return this.lib.encode(secret, encoding);
    }

    encode(data, options) {
        options = options || {};
        try {
            options.window = options.window || 5;
            options.length = options.length || 6;
            options.time = options.time || 30;
            options.timestamp = options.timestamp || Math.floor(Date.now() / 1000);

            // Time window is 30 seconds
            const timeWindow = Math.floor(options.timestamp / options.time);
            const timeBuffer = Buffer.alloc(8);
            const secret = options.secret || this.generateSecretKey(options.window);

            timeBuffer.writeUInt32BE(0, 0);
            timeBuffer.writeUInt32BE(timeWindow, 4);

            // Generate HMAC-SHA-1 hash using the secret key and time buffer
            const hmac = crypto.createHmac('sha1', Buffer.from(secret, 'hex'));
            hmac.update(timeBuffer);
            const hash = hmac.digest();

            // Extract 4 bytes from the hash starting from the last nibble of the last byte
            const offset = hash[hash.length - 1] & 0x0F;
            const tokenBuffer = hash.readUInt32BE(offset) & 0x7FFFFFFF;

            // Convert token to 6-digit format
            let token = tokenBuffer.toString();
            while (token.length < options.length) {
                token = '0' + token;
            }
            return {
                secret,
                label: data,
                token: token.slice(-1 * options.length)
            }
        }
        catch (error) {
            this.lib?.log({ src: "kscryp:TOTP:encode", data, error });
            options.error = error;
            return data;
        }
    }

    verify(data, options) {
        options = options || {};
        try {
            // Current UNIX timestamp
            const timestamp = options.timestamp || Math.floor(Date.now() / 1000);
            options.time = options.time || 30;
            for (let i = -1; i <= 1; i++) {
                // Allow some time drift (+/- 30 seconds)
                options.timestamp = timestamp + i * options.time;
                const current = this.encode(data, options);
                if (parseInt(current.token) === parseInt(data)) {
                    return true;
                }
            }
            return false;
        }
        catch (error) {
            this.lib?.log({ src: "kscryp:TOTP:decode", data, error });
            options.error = error;
            return data;
        }
    }
}
module.exports = TOPTP;