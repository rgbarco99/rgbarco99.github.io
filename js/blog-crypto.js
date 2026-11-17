/* =====================================================================
   blog-crypto.js — Cifrado AES-256-GCM + PBKDF2
   Web Crypto API nativa, sin dependencias externas.

   API pública (window.blogCrypto):
     encrypt(plaintext, password) → { encryptedBody, iv, salt }
     decrypt(encryptedBody, iv, salt, password) → plaintext
   ===================================================================== */

const blogCrypto = (() => {

  /* ── Helpers base64 ─────────────────────────────────────────────── */
  const toB64   = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
  const fromB64 = b64 => Uint8Array.from(atob(b64), c => c.charCodeAt(0));

  /* ── Derivar clave AES-GCM desde contraseña (PBKDF2) ───────────── */
  async function deriveKey(password, salt) {
    const raw = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' },
      raw,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /* ── Cifrar ─────────────────────────────────────────────────────── */
  async function encrypt(plaintext, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv   = crypto.getRandomValues(new Uint8Array(12));
    const key  = await deriveKey(password, salt);
    const buf  = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(plaintext)
    );
    return {
      encryptedBody: toB64(buf),
      iv:   toB64(iv),
      salt: toB64(salt)
    };
  }

  /* ── Descifrar ──────────────────────────────────────────────────── */
  async function decrypt(encryptedBody, iv, salt, password) {
    const saltBuf   = fromB64(salt);
    const ivBuf     = fromB64(iv);
    const cipherBuf = fromB64(encryptedBody);
    const key = await deriveKey(password, saltBuf);
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: ivBuf },
      key,
      cipherBuf
    );
    return new TextDecoder().decode(plain);
  }

  /* ── SHA-256 (para validar contraseña) ──────────────────────────── */
  async function sha256(str) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  return { encrypt, decrypt, sha256, toB64, fromB64 };
})();

window.blogCrypto = blogCrypto;
