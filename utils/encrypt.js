/**
 * Encryption Utility using Web Crypto API (AES-GCM 256-bit).
 *
 * This module handles secure local encryption for user credentials.
 * Key Management: Generates a random AES-GCM key and persists it in chrome.storage.local.
 * The key is exported as a JSON Web Key (JWK) to allow storage in the browser's local state,
 * ensuring credentials can be decrypted across page reloads and browser sessions.
 * - Security: Uses browser-native crypto.subtle for performance and security.
 * - Privacy: The key never leaves the user's local browser storage.
 */

async function exportKey(key) {
  return await crypto.subtle.exportKey("jwk", key);
}

async function importKey(jwk) {
  return await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );
}

async function getEncryptionKey() {
  const result = await chrome.storage.local.get("masterKey");

  if (result.masterKey) {
    return await importKey(result.masterKey);
  }

  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const exportedKey = await exportKey(key);
  await chrome.storage.local.set({ masterKey: exportedKey });

  return key;
}

async function encryptData(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getEncryptionKey();

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    data
  );

  return {
    iv: Array.from(iv),
    encrypted: Array.from(new Uint8Array(encrypted)),
  };
}

async function decryptData(encryptedData) {
  const iv = new Uint8Array(encryptedData.iv);
  const encrypted = new Uint8Array(encryptedData.encrypted);
  const key = await getEncryptionKey();

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encrypted
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

export { encryptData, decryptData };
