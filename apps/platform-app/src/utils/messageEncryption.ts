import crypto from 'crypto'

// Our encryption key and IV (stored in environment variables)
const ENCRYPTION_KEY =
  process.env.MESSAGE_ENCRYPTION_KEY ||
  'default-development-key-please-change-in-prod'
const ENCRYPTION_IV = process.env.MESSAGE_ENCRYPTION_IV || 'default-iv-16char'

/**
 * Encrypt a message string
 * @param text The plain text message to encrypt
 * @returns Encrypted message string
 */
export function encryptMessage(text: string): string {
  // For development/testing, allow using without proper keys
  if (!process.env.MESSAGE_ENCRYPTION_KEY) {
    console.warn(
      'WARNING: Using default encryption key. Set MESSAGE_ENCRYPTION_KEY in production!',
    )
  }

  try {
    // Use a simpler approach with a derived key
    const key = crypto
      .createHash('sha256')
      .update(String(ENCRYPTION_KEY))
      .digest('base64')
      .substring(0, 32)
    const iv = ENCRYPTION_IV.substring(0, 16).padEnd(16, '0')

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    // Add a marker prefix to identify encrypted content
    return `ENC:${encrypted}`
  } catch (error) {
    console.error('Encryption error:', error)
    // Fallback: return the original text if encryption fails
    return text
  }
}

/**
 * Decrypt an encrypted message string
 * @param text The encrypted message
 * @returns Decrypted plain text message
 */
export function decryptMessage(text: string): string {
  try {
    // Check if the content is actually encrypted (has our marker)
    if (!text || !text.startsWith('ENC:')) {
      // This is not encrypted content, return as is
      return text
    }

    // Remove the marker prefix
    const encryptedText = text.substring(4)

    // Use the same key derivation as in encryption
    const key = crypto
      .createHash('sha256')
      .update(String(ENCRYPTION_KEY))
      .digest('base64')
      .substring(0, 32)
    const iv = ENCRYPTION_IV.substring(0, 16).padEnd(16, '0')

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    console.error('Decryption error:', error)
    // Fallback: return the original text if decryption fails
    return text
  }
}
