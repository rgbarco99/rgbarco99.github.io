/* =====================================================================
   admin-auth.js — Autenticación de administrador compartida
   (blog-admin, certs-admin, recs-admin, blog y blog-post)

   Modelo:
   · No existe ningún hash de la contraseña en el código.
   · La única pieza pública es js/admin-config.json, que contiene, cifrados
     con AES-256-GCM + PBKDF2 (310 000 iteraciones) usando la contraseña de
     admin como clave:
       - tokenEnc: el token de GitHub (para publicar).
       - keyEnc:   una clave maestra aleatoria con la que se envuelven las
                   contraseñas de los posts privados. Es estable: rotar el
                   token o cambiar la contraseña no obliga a re-cifrar posts.
   · La contraseña es correcta si y solo si descifra ese token
     (AES-GCM es autenticado: una contraseña errónea siempre falla).
   · Cambiar la contraseña = re-cifrar el token y publicar ese único
     fichero. Todas las páginas y dispositivos leen el mismo fichero,
     así que no puede haber contraseñas distintas por dispositivo.

   Requiere js/blog-crypto.js cargado antes.
   ===================================================================== */

const adminAuth = (() => {

  const OWNER       = 'rgbarco99';
  const REPO        = 'rgbarco99.github.io';
  const BRANCH      = 'main';
  const CONFIG_PATH = 'js/admin-config.json';

  const SS_AUTH     = '_admin_auth';
  const SS_PW       = '_admin_pw';
  /* Copia local de la config recién publicada, mientras GitHub Pages
     redespliega (~1 min). Solo contiene el blob cifrado, igual que el
     fichero público. */
  const LS_PENDING  = '_admin_config_pending';
  /* Claves antiguas (versión con hash por página). Solo se leen para migrar. */
  const LS_LEGACY_TOKEN = '_github_token_enc';
  const LS_LEGACY_HASH  = '_admin_pw_hash';

  let _config = null;
  let _token  = null;
  let _key    = null;

  /* ── Config ─────────────────────────────────────────────────────── */
  async function loadConfig() {
    let remote = { tokenEnc: null, updated: 0 };
    try {
      const r = await fetch(`${CONFIG_PATH}?t=${Date.now()}`, { cache: 'no-store' });
      if (r.ok) remote = await r.json();
    } catch { /* sin conexión o fichero inexistente */ }

    let pending = null;
    try { pending = JSON.parse(localStorage.getItem(LS_PENDING) || 'null'); } catch {}
    if (pending && (pending.updated || 0) > (remote.updated || 0)) {
      _config = pending;
    } else {
      _config = remote;
      try { localStorage.removeItem(LS_PENDING); } catch {}
    }
    return _config;
  }

  function hasToken() { return !!(_config && _config.tokenEnc); }

  async function decryptBlob(pw, enc) {
    if (!enc || !pw) return null;
    try { return await blogCrypto.decrypt(enc.encryptedBody, enc.iv, enc.salt, pw); }
    catch { return null; }
  }
  const decryptToken = (pw, enc = _config && _config.tokenEnc) => decryptBlob(pw, enc);

  function randomKey() {
    return blogCrypto.toB64(crypto.getRandomValues(new Uint8Array(32)));
  }

  /* ── Sesión ─────────────────────────────────────────────────────── */
  function sessionPw() { return sessionStorage.getItem(SS_PW); }
  function isLoggedIn() { return sessionStorage.getItem(SS_AUTH) === 'ok' && !!sessionPw(); }

  function setSession(pw, token, key) {
    sessionStorage.setItem(SS_AUTH, 'ok');
    sessionStorage.setItem(SS_PW, pw);
    _token = token;
    _key   = key || null;
  }

  function logout() {
    sessionStorage.removeItem(SS_AUTH);
    sessionStorage.removeItem(SS_PW);
    _token = null;
    _key   = null;
  }

  /** Intenta iniciar sesión. Devuelve { ok } o { ok:false, setup:true } si no hay token configurado. */
  async function login(pw) {
    if (!_config) await loadConfig();
    if (!hasToken()) return { ok: false, setup: true };
    const token = await decryptToken(pw);
    if (!token) return { ok: false };
    setSession(pw, token, await decryptBlob(pw, _config.keyEnc));
    cleanupLegacy();
    return { ok: true };
  }

  /** Comprueba que la sesión guardada sigue siendo válida (p. ej. si se cambió la contraseña en otro dispositivo). */
  async function restore() {
    if (!isLoggedIn()) return false;
    if (!_config) await loadConfig();
    const token = await decryptToken(sessionPw());
    if (!token) { logout(); return false; }
    _token = token;
    return true;
  }

  async function getMasterKey() {
    if (_key) return _key;
    if (!isLoggedIn()) return null;
    if (!_config) await loadConfig();
    _key = await decryptBlob(sessionPw(), _config.keyEnc);
    return _key;
  }

  async function getToken() {
    if (_token) return _token;
    if (!isLoggedIn()) return null;
    if (!_config) await loadConfig();
    _token = await decryptToken(sessionPw());
    return _token;
  }

  function cleanupLegacy() {
    try { localStorage.removeItem(LS_LEGACY_HASH); localStorage.removeItem(LS_LEGACY_TOKEN); } catch {}
  }

  /* ── GitHub API ─────────────────────────────────────────────────── */
  function toBase64Unicode(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }

  function headers(token) {
    return { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' };
  }

  /** Comprueba que el token es válido y puede escribir en el repo. */
  async function verifyTokenAccess(token) {
    const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, { headers: headers(token) });
    if (r.status === 401) throw new Error('Token inválido o revocado.');
    if (!r.ok) throw new Error(`GitHub respondió ${r.status} al comprobar el token.`);
    const j = await r.json();
    if (!j.permissions || !j.permissions.push) throw new Error('El token no tiene permiso de escritura (contents:write) en el repositorio.');
    return true;
  }

  async function putFile(path, content, message, token) {
    token = token || await getToken();
    if (!token) throw new Error('No hay token de GitHub disponible.');
    const url    = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
    const getRes = await fetch(`${url}?ref=${BRANCH}`, { headers: headers(token) });
    const sha    = getRes.ok ? (await getRes.json()).sha : undefined;
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: headers(token),
      body: JSON.stringify({ message, content: toBase64Unicode(content), ...(sha ? { sha } : {}), branch: BRANCH }),
    });
    if (!putRes.ok) {
      const err = await putRes.json().catch(() => ({}));
      throw new Error(err.message || `GitHub PUT ${putRes.status}`);
    }
    return putRes.json();
  }

  /** Cifra token + clave maestra con la contraseña y publica js/admin-config.json. */
  async function publishConfig(token, pw, key, message) {
    const pack = e => ({ encryptedBody: e.encryptedBody, iv: e.iv, salt: e.salt });
    const [tEnc, kEnc] = await Promise.all([blogCrypto.encrypt(token, pw), blogCrypto.encrypt(key, pw)]);
    const cfg = { tokenEnc: pack(tEnc), keyEnc: pack(kEnc), updated: Date.now() };
    await putFile(CONFIG_PATH, JSON.stringify(cfg, null, 2) + '\n', message, token);
    _config = cfg;
    try { localStorage.setItem(LS_PENDING, JSON.stringify(cfg)); } catch {}
    setSession(pw, token, key);
    cleanupLegacy();
    return cfg;
  }

  /** Configuración inicial (no hay token publicado). */
  async function setup(pw, token) {
    await verifyTokenAccess(token);
    return publishConfig(token, pw, randomKey(), 'admin: initial encrypted admin config');
  }

  /** Sustituye el token manteniendo la contraseña y la clave maestra. */
  async function replaceToken(newToken) {
    const pw = sessionPw();
    if (!pw) throw new Error('Sesión caducada.');
    await verifyTokenAccess(newToken);
    const key = (await getMasterKey()) || randomKey();
    return publishConfig(newToken, pw, key, 'admin: rotate GitHub token');
  }

  /** Cambia la contraseña de admin (re-cifra token y clave maestra y publica). */
  async function changePassword(oldPw, newPw) {
    if (!_config) await loadConfig();
    const token = await decryptToken(oldPw);
    if (!token) throw new Error('La contraseña actual es incorrecta.');
    const key = (await decryptBlob(oldPw, _config.keyEnc)) || randomKey();
    return publishConfig(token, newPw, key, 'admin: change admin password');
  }

  /* ── Posts privados ─────────────────────────────────────────────── */
  /** Envuelve la contraseña de un post con la clave maestra. */
  async function wrapPostPw(postPw) {
    const key = await getMasterKey();
    if (!key) throw new Error('Clave maestra no disponible. Inicia sesión de nuevo.');
    const e = await blogCrypto.encrypt(postPw, key);
    return { adminEncryptedPw: e.encryptedBody, adminPwIv: e.iv, adminPwSalt: e.salt };
  }

  /** Descifra la contraseña de un post privado (clave maestra; formatos antiguos: token o contraseña de admin). */
  async function decryptPostPw(p, extraKeys = []) {
    if (!p || !p.adminEncryptedPw) throw new Error('Post sin contraseña de admin');
    const keys = [await getMasterKey(), await getToken(), sessionPw(), ...extraKeys].filter(Boolean);
    for (const k of keys) {
      try { return await blogCrypto.decrypt(p.adminEncryptedPw, p.adminPwIv, p.adminPwSalt, k); } catch {}
    }
    throw new Error('No se pudo descifrar la contraseña del post');
  }

  /** ¿Está envuelta con la clave maestra actual? (si no, conviene migrarla) */
  async function isWrappedWithMasterKey(p) {
    const key = await getMasterKey();
    if (!key || !p.adminEncryptedPw) return false;
    try { await blogCrypto.decrypt(p.adminEncryptedPw, p.adminPwIv, p.adminPwSalt, key); return true; }
    catch { return false; }
  }

  /* ── Pantalla de bloqueo compartida (páginas *-admin.html) ──────── */
  /**
   * Conecta el formulario #admin-lock-form. Si no hay token publicado,
   * convierte la tarjeta en un asistente de configuración inicial.
   */
  async function initLockScreen(onUnlock) {
    const form   = document.getElementById('admin-lock-form');
    const input  = document.getElementById('admin-password');
    const errEl  = document.getElementById('admin-error');
    const submit = document.getElementById('admin-submit');

    await loadConfig();
    if (await restore()) { onUnlock(); return; }
    if (!hasToken()) { renderSetup(form, onUnlock); return; }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const pw = input.value;
      if (!pw) return;
      submit.disabled = true;
      const label = submit.querySelector('span');
      const orig  = label ? label.textContent : '';
      if (label) label.textContent = 'Verificando…';
      try {
        const res = await login(pw);
        if (res.ok) { errEl.textContent = ''; onUnlock(); return; }
        if (res.setup) { renderSetup(form, onUnlock); return; }
        const card = document.querySelector('.blog-lock-card');
        if (card) { card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake'); }
        errEl.textContent = '❌ Contraseña incorrecta.';
        input.value = ''; input.focus();
      } finally {
        submit.disabled = false;
        if (label) label.textContent = orig;
      }
    });
  }

  function renderSetup(form, onUnlock) {
    const card = form.closest('.blog-lock-card');
    const desc = card && card.querySelector('.blog-lock-desc');
    if (desc) desc.innerHTML = 'No hay ningún token configurado. Crea la contraseña de administrador y pega un ' +
      '<strong>token nuevo</strong> de GitHub con permiso <code>contents:write</code> sobre este repositorio.';
    form.innerHTML = `
      <input type="password" id="setup-pw"  class="blog-password-input" placeholder="Nueva contraseña de admin (mín. 12)" autocomplete="new-password" style="margin-bottom:.6rem" />
      <input type="password" id="setup-pw2" class="blog-password-input" placeholder="Repite la contraseña" autocomplete="new-password" style="margin-bottom:.6rem" />
      <input type="password" id="setup-token" class="blog-password-input" placeholder="github_pat_…" autocomplete="off" style="margin-bottom:.6rem" />
      <p class="blog-error" id="setup-error" aria-live="polite"></p>
      <button type="submit" class="btn btn-primary blog-submit" id="setup-submit"><span>Configurar</span></button>`;
    const err = form.querySelector('#setup-error');
    form.onsubmit = async e => {
      e.preventDefault();
      const pw = form.querySelector('#setup-pw').value;
      const pw2 = form.querySelector('#setup-pw2').value;
      const token = form.querySelector('#setup-token').value.trim();
      err.textContent = '';
      if (pw.length < 12) { err.textContent = '❌ Usa al menos 12 caracteres.'; return; }
      if (pw !== pw2)     { err.textContent = '❌ Las contraseñas no coinciden.'; return; }
      if (!/^(ghp_|github_pat_)/.test(token)) { err.textContent = '❌ El token debe empezar por ghp_ o github_pat_.'; return; }
      const btn = form.querySelector('#setup-submit');
      btn.disabled = true; btn.querySelector('span').textContent = 'Comprobando token…';
      try {
        await setup(pw, token);
        onUnlock();
      } catch (ex) {
        err.textContent = '❌ ' + ex.message;
      } finally {
        btn.disabled = false; btn.querySelector('span').textContent = 'Configurar';
      }
    };
  }

  /* ── Datos publicados + control de concurrencia ─────────────────────
     Cada panel (blog, certs, recs) publica un fichero de datos y un
     fichero de versión {t}. Al abrir el panel se recuerda qué versión se
     cargó; antes de publicar se compara con la versión real en GitHub y,
     si alguien publicó entretanto, se aborta en vez de sobrescribir. */
  const SNAP_PREFIX = '_published_snapshot:';

  const canon = v => Array.isArray(v) ? '[' + v.map(canon).join(',') + ']'
    : (v && typeof v === 'object') ? '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'
    : JSON.stringify(v);

  function rememberPublished(dataPath, t, data) {
    try { localStorage.setItem(SNAP_PREFIX + dataPath, JSON.stringify({ t, data })); } catch {}
  }

  /** Lee lo publicado vía GitHub Pages. Si este navegador acaba de publicar
   *  algo más nuevo y Pages aún no ha redesplegado, usa esa copia. → {t, data} */
  async function loadPublished(versionPath, dataPath) {
    let t = 0, data = [];
    try {
      t    = (await fetch(versionPath, { cache: 'no-store' }).then(r => r.json())).t || 0;
      data = await fetch(`${dataPath}?t=${t}`).then(r => r.json());
    } catch { data = []; }
    try {
      const snap = JSON.parse(localStorage.getItem(SNAP_PREFIX + dataPath) || 'null');
      if (snap && snap.t > t) { t = snap.t; data = snap.data; }
      else localStorage.removeItem(SNAP_PREFIX + dataPath);
    } catch {}
    return { t, data };
  }

  /** Contenido actual de un fichero en la rama (API, sin caché de Pages). */
  async function readRemoteFile(path, token) {
    token = token || await getToken();
    const r = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`, {
      headers: { ...headers(token), Accept: 'application/vnd.github.raw+json' },
      cache: 'no-store',
    });
    if (r.status === 404) return null;
    if (!r.ok) throw new Error(`GitHub respondió ${r.status} al leer ${path}.`);
    return r.text();
  }

  /** null si lo publicado sigue en la versión baseT; si no, {t, data} con lo
   *  que hay ahora en GitHub (y lo deja como referencia en este navegador). */
  async function fetchIfNewer(versionPath, dataPath, baseT, token) {
    const vTxt    = await readRemoteFile(versionPath, token);
    const remoteT = vTxt ? (JSON.parse(vTxt).t || 0) : 0;
    if (remoteT <= baseT) return null;
    const dTxt = await readRemoteFile(dataPath, token);
    const data = dTxt ? JSON.parse(dTxt) : [];
    rememberPublished(dataPath, remoteT, data);
    return { t: remoteT, data };
  }

  /** Quita de los borradores locales las copias idénticas a lo publicado. */
  function pruneLocalCopies(localKey, published, strip = x => x) {
    try {
      const local = JSON.parse(localStorage.getItem(localKey) || '[]');
      const byId  = new Map(published.map(p => [String(p.id), canon(strip(p))]));
      const kept  = local.filter(p => byId.get(String(p.id)) !== canon(strip(p)));
      if (kept.length !== local.length) {
        if (kept.length) localStorage.setItem(localKey, JSON.stringify(kept));
        else localStorage.removeItem(localKey);
      }
    } catch {}
  }

  return {
    loadConfig, hasToken, login, logout, restore, isLoggedIn, sessionPw, getToken, getMasterKey,
    verifyTokenAccess, putFile, setup, replaceToken, changePassword,
    loadPublished, rememberPublished, fetchIfNewer, readRemoteFile, pruneLocalCopies, canon,
    wrapPostPw, decryptPostPw, isWrappedWithMasterKey, initLockScreen, toBase64Unicode,
    OWNER, REPO, BRANCH,
  };
})();

window.adminAuth = adminAuth;
