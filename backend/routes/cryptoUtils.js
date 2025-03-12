const crypto = require('crypto');

let SECRET_KEY = process.env.CRYPTO_SECRET_KEY || 'minhachavesecreta32bytes123456789012';

if (SECRET_KEY.length < 32) {
  SECRET_KEY = SECRET_KEY.padEnd(32, '0');
} else if (SECRET_KEY.length > 32) {
  SECRET_KEY = SECRET_KEY.slice(0, 32);
}

function encrypt(text) {
  const IV = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: IV.toString('hex'),
    encryptedData: encrypted,
  };
}

function decrypt(text) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), Buffer.from(text.iv, 'hex'));
  let decrypted = decipher.update(text.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encrypt, decrypt };