// storage.js: simple localStorage wrapper with export/import JSON
(function(){
  const KEY = '4xo_scout_db_v1';
  function load(){
    const raw = localStorage.getItem(KEY);
    try { return raw ? JSON.parse(raw) : { players: [] }; } catch(e){ return { players: [] }; }
  }
  function save(obj){ localStorage.setItem(KEY, JSON.stringify(obj)); }
  // Expose minimal API on window for MVP
  window.ScoutDB = {
    load, save,
    exportJSON: ()=> JSON.stringify(load(), null, 2),
    importJSON: (text)=>{ try { const obj=JSON.parse(text); save(obj); return true;} catch(e){return false;} }
  };
})();
