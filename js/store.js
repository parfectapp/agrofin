/* ============ AGROFIN · Caché local por cuenta (offline). La auth/respaldo va por la nube (cloud.js) ============ */
const Store = (() => {
  const dkey = uid => 'agrofin_cache__' + uid;

  const empty = () => ({
    meta: { name: 'Mi invernadero', area: '', cleared: false },
    cycle: { crop: 'Jitomate saladet', variety: 'Mosquetero', start: '', name: 'Ciclo actual' },
    products: ['Jitomate saladet'],
    expenses: [], harvests: [], clients: [], orders: [],
    tasks: [], irrigations: [], applications: [], inventory: [],
    log: [], notes: [],
    seeded: false,
  });

  function load(uid) {
    try { const raw = localStorage.getItem(dkey(uid)); if (raw) return { ...empty(), ...JSON.parse(raw) }; } catch (e) {}
    return empty();
  }
  function save(uid, s) { try { localStorage.setItem(dkey(uid), JSON.stringify(s)); } catch (e) {} }
  function wipe(uid) { try { localStorage.removeItem(dkey(uid)); } catch (e) {} }

  const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

  return { empty, load, save, wipe, uid };
})();
