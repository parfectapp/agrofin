/* ============ AGROFIN · Persistencia + cuentas (localStorage, local en el dispositivo) ============ */
const Store = (() => {
  const UKEY = 'inverna_users';      // lista de cuentas {id,name,pw}
  const SKEY = 'inverna_session';    // id de la cuenta activa
  const dkey = uid => 'inverna_db__' + uid;   // datos por cuenta

  const empty = () => ({
    meta: { name: 'Mi invernadero', area: '', cleared: false },
    cycle: { crop: 'Jitomate saladet', variety: 'Mosquetero', start: '', name: 'Ciclo actual' },
    products: ['Jitomate saladet'],
    expenses: [], harvests: [], clients: [], orders: [],
    tasks: [], irrigations: [], applications: [], inventory: [],
    log: [], notes: [],
    seeded: false,
  });

  // ---- cuentas ----
  function users() { try { return JSON.parse(localStorage.getItem(UKEY)) || []; } catch (e) { return []; } }
  function saveUsers(u) { try { localStorage.setItem(UKEY, JSON.stringify(u)); } catch (e) {} }
  function session() { return localStorage.getItem(SKEY) || null; }
  function setSession(id) { try { id ? localStorage.setItem(SKEY, id) : localStorage.removeItem(SKEY); } catch (e) {} }

  // ---- datos de la cuenta activa ----
  function load(uid) {
    try { const raw = localStorage.getItem(dkey(uid)); if (raw) return { ...empty(), ...JSON.parse(raw) }; } catch (e) {}
    return empty();
  }
  function save(uid, s) { try { localStorage.setItem(dkey(uid), JSON.stringify(s)); } catch (e) {} }
  function wipe(uid) { try { localStorage.removeItem(dkey(uid)); } catch (e) {} }

  const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

  // hash de contraseña (auth local del dispositivo, no es identidad real)
  async function hash(pw) {
    const data = new TextEncoder().encode('agrofin::' + pw);
    const buf = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  return { empty, users, saveUsers, session, setSession, load, save, wipe, uid, hash };
})();
