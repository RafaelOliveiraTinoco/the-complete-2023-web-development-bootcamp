require("dotenv").config();

const crypto = require("crypto");
const cryptoAlgorithm = "aes-256-cbc"; // Advanced Encryption Standard, Key Size, Cipher mode of encryption
const cryptoEncryptionKey = Buffer.from(process.env.COOKIE_ENCRYPTION_KEY); // 256 bits or 32 bytes
const cryptoInitVector = Buffer.from(process.env.COOKIE_INIT_VECTOR); // 126 bits or 16 bytes

// encryption
module.exports.encrypt = (text) => {
    // setup cipher
    let cryptoCipher = crypto.createCipheriv(cryptoAlgorithm, cryptoEncryptionKey, cryptoInitVector);
    // encrypt and return
    return cryptoCipher.update(text, "utf-8", "hex") + cryptoCipher.final("hex");
}

// decryprion
module.exports.decrypt = (hex) => {
    // setup cipher
    let cryptoDecipher = crypto.createDecipheriv(cryptoAlgorithm, cryptoEncryptionKey, cryptoInitVector);
    return cryptoDecipher.update(hex, "hex", "utf-8") + cryptoDecipher.final("utf-8");
}