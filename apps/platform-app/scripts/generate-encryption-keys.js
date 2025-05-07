/**
 * Script to generate secure encryption keys for message encryption
 * Run with: node scripts/generate-encryption-keys.js
 */

const crypto = require('crypto')

// Generate a secure encryption key (32 bytes = 256 bits for AES-256)
const encryptionKey = crypto.randomBytes(32).toString('hex')

// Generate a secure initialization vector (16 chars)
const iv = crypto.randomBytes(8).toString('hex')

console.log('Add these to your .env file:')
console.log('')
console.log(`MESSAGE_ENCRYPTION_KEY="${encryptionKey}"`)
console.log(`MESSAGE_ENCRYPTION_IV="${iv}"`)
console.log('')
console.log(
  'Important: Keep these values secure and do not commit them to version control!',
)
