# Message Encryption Implementation

This document explains the implementation of message encryption for the chat functionality in the application.

## Overview

We've implemented a simple but effective encryption mechanism for chat messages in the application. This ensures that messages are stored in an encrypted format in the database, adding a layer of security to user communications.

## Implementation Details

1. **Encryption Utility**: `messageEncryption.ts`

   - Uses Node.js crypto module with AES-256-CBC encryption
   - Provides `encryptMessage` and `decryptMessage` functions
   - Falls back gracefully if encryption fails
   - Uses an `ENC:` prefix to identify encrypted content

2. **Integration Points**:
   - `application.service.ts`: Encrypts messages when saving and decrypts when retrieving
   - No database schema changes required - we use the existing `content` field for the encrypted text

## How it Works

1. When a user sends a message, the content is encrypted before being stored in the database
2. Encrypted messages are prefixed with `ENC:` to distinguish them from unencrypted content
3. When messages are retrieved, the system checks for the `ENC:` prefix:
   - If present, it decrypts the content
   - If not present, it returns the original content (for backward compatibility)
4. All encryption/decryption happens server-side, requiring no client-side changes

## Configuration

Two environment variables are used:

- `MESSAGE_ENCRYPTION_KEY`: The main encryption key
- `MESSAGE_ENCRYPTION_IV`: The initialization vector for the encryption

### Generating Secure Keys

```bash
# Generate a secure encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate a 16-character initialization vector
node -e "console.log(require('crypto').randomBytes(8).toString('hex'))"
```

Add these to your environment variables (in `.env` file or hosting platform).

## Security Considerations

- This implementation uses a single platform-wide encryption key
- Messages are encrypted/decrypted server-side
- The implementation focuses on simplicity while providing reasonable security
- It protects against database breaches but not against server compromises

## Limitations

- Existing messages prior to this implementation remain unencrypted, but are properly handled
- Messages are decrypted on the server before being sent to clients
- Uses a single key for all conversations
