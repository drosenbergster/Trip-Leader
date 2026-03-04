import { useState, useEffect, useRef } from "react";

const DEFAULT_DATA = [
  {
    category: "RAFT & FRAME", icon: "🚣",
    items: [
      { item: "Raft", detail: "AIRE Tributary 14 HD", status: "have", notes: "14'3\" x 6'10\", self-bailing, 7 chambers" },
      { item: "Frame", detail: "DRE Colorado 4-Bay Double Rail", status: "have", notes: "Custom fit, attaches to D-rings" },
      { item: "Dry Box", detail: "Downriver Custom", status: "have", notes: "Bracket-mounted in Bay 2 (rowing position)" },
      { item: "Cooler", detail: "120L Hard Cooler", status: "have", notes: "Bay 5, paco pad on top for 2 passengers" },
      { item: "Rail Decking", detail: "Custom Wooden Decking", status: "have", notes: "Cam strap slots, runs length of side rails" },
      { item: "Water Cans", detail: "Heavy Duty x2", status: "have", notes: "Rigged to outside of frame" },
      { item: "Paco Pad", detail: "River Pad", status: "have", notes: "Covers cooler for passenger seating" },
    ]
  },
  {
    category: "ROWING & PADDLING", icon: "🏊",
    items: [
      { item: "Oars", detail: "Primary Set", status: "have", notes: "Main rowing oars" },
      { item: "Spare Oar", detail: "Backup Oar", status: "need", notes: "Critical safety redundancy" },
      { item: "Paddles", detail: "2x Passenger Paddles", status: "need", notes: "54-60\" for raft width, keeps crew engaged" },
    ]
  },
  {
    category: "WASTE SYSTEM", icon: "🗑️",
    items: [
      { item: "Groover", detail: "Ammo Can Groover System", status: "have", notes: "Bay 3, required on Lower Deschutes" },
      { item: "Garbage Can", detail: "20mm Steel Ammo Can", status: "have", notes: "Bay 3 alongside groover" },
      { item: "Can Crusher", detail: "Oyezvary 16oz Wall-Mount", status: "building", notes: "1/4-20 flat head SS screws + nylock nuts, mount to lid" },
      { item: "Ash Bags", detail: "Contractor Bags", status: "have", notes: "Double-bag ash, must be cold before sealing" },
    ]
  },
  {
    category: "STORAGE & ORGANIZATION", icon: "📦",
    items: [
      { item: "Dry Bags", detail: "Personal Gear Bags", status: "have", notes: "Bow/stern triangles for personal gear" },
      { item: "Gamma Lid Buckets", detail: "Food-Grade Buckets", status: "have", notes: "Dry storage, food safe" },
      { item: "Strap Bags", detail: "Organization Bags", status: "have", notes: "Straps, trash, organization" },
      { item: "Drop Bag", detail: "Catch-All Dry Bag", status: "have", notes: "Bay 4, miscellaneous items" },
      { item: "Cam Straps", detail: "Assorted Cam Straps", status: "have", notes: "Spare straps always useful on the river" },
    ]
  },
  {
    category: "COOKING & FIRE", icon: "🔥",
    items: [
      { item: "Camp Stove", detail: "Coleman 2-Burner", status: "have", notes: "Primary cooking, connects to 20lb tank" },
      { item: "Propane Tank", detail: "20lb Tank", status: "need", notes: "Runs stove + fire pit, ~430,000 BTU total" },
      { item: "Propane Fire Pit", detail: "TBD — Howl R1 / LavaBox", status: "tbd", notes: "Howl R1 (~$395, long lead time) or LavaBox (~$229, river-born)" },
      { item: "Fire Pan", detail: "Metal Fire Pan 2\"+ Sides", status: "need", notes: "Required Oct 16–May 31 on Deschutes" },
      { item: "Fire Blanket", detail: "LNT Fire Blanket", status: "need", notes: "Goes under fire pan, required" },
      { item: "Firewood", detail: "Pack-in Wood", status: "need", notes: "Gathering wood illegal on Lower Deschutes" },
      { item: "Kitchen Kit", detail: "Camp Kitchen Gear", status: "have", notes: "Stores in stern or bow triangle" },
      { item: "Table", detail: "Camp Table", status: "have", notes: "Straps to top of frame or outside rails" },
    ]
  },
  {
    category: "SAFETY", icon: "🦺",
    items: [
      { item: "PFDs", detail: "x4 Life Jackets", status: "have", notes: "One per person, non-negotiable" },
      { item: "Throw Bag", detail: "River Throw Bag", status: "need", notes: "Must be immediately accessible, not buried" },
      { item: "First Aid Kit", detail: "Comprehensive River Kit", status: "need", notes: "Accessible during the day" },
      { item: "Knife", detail: "Accessible Blade", status: "need", notes: "For entanglement, must be quickly reachable" },
      { item: "Whistles", detail: "x4 Whistles", status: "need", notes: "One per person" },
      { item: "Helmets", detail: "Optional for Class 2-3", status: "tbd", notes: "Recommend based on crew comfort level" },
      { item: "Repair Kit", detail: "PVC Raft Repair Kit", status: "need", notes: "AIRE Tributary is PVC — get PVC-specific kit" },
      { item: "Spare Valve Caps", detail: "Leafield C7 Caps", status: "need", notes: "Easy to lose, cheap insurance" },
    ]
  },
  {
    category: "PUMP & INFLATION", icon: "💨",
    items: [
      { item: "Pump", detail: "NRS Super Pump 2", status: "have", notes: "Double-chamber, up to 25 PSI" },
      { item: "Replacement Hose", detail: "NRS Super 2 Hose", status: "have", notes: "Super 2 specific — not interchangeable with Super Pump" },
    ]
  },
  {
    category: "TOOLS & REPAIR", icon: "🔧",
    items: [
      { item: "Multi-tool", detail: "Leatherman or Similar", status: "need", notes: "River essential" },
      { item: "Adjustable Wrench", detail: "Crescent Wrench", status: "need", notes: "Frame adjustments" },
      { item: "Allen Key Set", detail: "Hex Key Set", status: "need", notes: "For flat head socket screws on can crusher" },
      { item: "Gorilla Tape", detail: "Heavy Duty Tape", status: "need", notes: "Stronger than duct tape" },
      { item: "Carabiners", detail: "Spare Carabiners", status: "need", notes: "Always handy on a raft" },
      { item: "Webbing", detail: "Spare Webbing", status: "need", notes: "Rigging, rescue, tie-downs" },
    ]
  },
  {
    category: "PERMITS & LOGISTICS", icon: "📋",
    items: [
      { item: "Boater Pass", detail: "Recreation.gov", status: "need", notes: "Required year-round on Lower Deschutes" },
      { item: "Shuttle", detail: "Car Shuttle or Service", status: "need", notes: "Arrange before launch day" },
      { item: "River Map", detail: "Lower Deschutes Map", status: "need", notes: "Know Sherars Falls — mandatory portage RM 44" },
      { item: "USGS Gauge Check", detail: "Deschutes at Moody", status: "need", notes: "Check day-of for water levels" },
    ]
  },
  {
    category: "PERSONAL GEAR", icon: "🎒",
    items: [
      { item: "Cold Weather Layers", detail: "x4 Crew", status: "have", notes: "March canyon temps can hit low 30s at night" },
      { item: "Rain Gear", detail: "x4 Crew", status: "have", notes: "High desert, unexpected rain possible" },
      { item: "Cold Water Gloves", detail: "Neoprene Gloves", status: "have", notes: "Essential for March rowing" },
      { item: "Sleeping Bags", detail: "30° Rated or Better", status: "have", notes: "Verify rating before trip" },
      { item: "Headlamps", detail: "x4 Headlamps", status: "need", notes: "One per person with fresh batteries" },
      { item: "Lighters", detail: "Primary + Backup", status: "need", notes: "Waterproof preferred" },
    ]
  },
];

const STORAGE_KEY = "raft-gear-manifest-v1";

const statusConfig = {
  have:     { label: "HAVE IT",     color: "#2d6a4f", bg: "#d8f3dc", dot: "#52b788" },
  need:     { label: "NEED IT",     color: "#9b2226", bg: "#fde8e8", dot: "#e63946" },
  building: { label: "IN PROGRESS", color: "#7b4f12", bg: "#fff3cd", dot: "#f4a261" },
  tbd:      { label: "TBD",         color: "#444",    bg: "#e9ecef", dot: "#868e96" },
};

const ICONS = ["🚣","🏊","🗑️","📦","🔥","🦺","💨","🔧","📋","🎒","⛺","🧰","🎣","🌊","🧭","🍺","🥾","🐟","☀️","🌙","🪵","🧊","🎸","🐻","🦅"];

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function EditableCell({ value, onChange, style, multiline }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const ref = useRef();

  useEffect(() => { setVal(value); }, [value]);
  useEffect(() => { if (editing && ref.current) ref.current.focus(); }, [editing]);

  const commit = () => {
    setEditing(false);
    if (val.trim() !== value) onChange(val.trim() || value);
  };

  if (editing) {
    const sharedStyle = {
      background: "#2a2520", color: "#e8e0d0", border: "1px solid #c9a96e",
      borderRadius: "3px", padding: "3px 6px", fontFamily: "'Courier New', monospace",
      fontSize: "12px", width: "100%", outline: "none", boxSizing: "border-box", ...style
    };
    return multiline
      ? <textarea ref={ref} value={val} onChange={e => setVal(e.target.value)} onBlur={commit}
          onKeyDown={e => { if (e.key === "Escape") { setVal(value); setEditing(false); } }}
          style={{ ...sharedStyle, resize: "vertical", minHeight: "52px" }} />
      : <input ref={ref} value={val} onChange={e => setVal(e.target.value)} onBlur={commit}
          onKeyDown={e => { if (e.key === "Enter") commit(); if (e.key === "Escape") { setVal(value); setEditing(false); } }}
          style={sharedStyle} />;
  }

  return (
    <span onClick={() => setEditing(true)} title="Click to edit"
      style={{ cursor: "text", display: "block", borderBottom: "1px dashed #2e2a22", paddingBottom: "1px", ...style }}>
      {value || <span style={{ color: "#444", fontStyle: "italic" }}>—</span>}
    </span>
  );
}

function StatusPill({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const sc = statusConfig[status];
  const ref = useRef();

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <span onClick={() => setOpen(o => !o)} title="Click to change status"
        style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "2px 7px", borderRadius: "3px", background: sc.bg, color: sc.color, fontSize: "10px", fontWeight: "bold", letterSpacing: "0.06em", cursor: "pointer", userSelect: "none" }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: sc.dot, flexShrink: 0 }} />
        {sc.label} ▾
      </span>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 100, background: "#252018", border: "1px solid #3a3228", borderRadius: "4px", overflow: "hidden", minWidth: "130px", marginTop: "3px", boxShadow: "0 4px 16px rgba(0,0,0,0.6)" }}>
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <div key={key} onClick={() => { onChange(key); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: "7px", padding: "8px 11px", cursor: "pointer", background: key === status ? "#3a3228" : "transparent", fontSize: "10px", color: cfg.color, fontWeight: "bold", letterSpacing: "0.06em" }}
              onMouseEnter={e => e.currentTarget.style.background = "#3a3228"}
              onMouseLeave={e => e.currentTarget.style.background = key === status ? "#3a3228" : "transparent"}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: cfg.dot }} />
              {cfg.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RaftGearGrid() {
  const [gearData, setGearData] = useState(() => loadFromStorage() || DEFAULT_DATA);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(() =>
    Object.fromEntries((loadFromStorage() || DEFAULT_DATA).map(c => [c.category, true]))
  );
  const [newCatModal, setNewCatModal] = useState(false);
  const [newCat, setNewCat] = useState({ category: "", icon: "🎒" });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [savedFlash, setSavedFlash] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToStorage(gearData);
    setSavedFlash(true);
    const t = setTimeout(() => setSavedFlash(false), 1200);
    return () => clearTimeout(t);
  }, [gearData]);

  const toggle = (cat) => setExpanded(prev => ({ ...prev, [cat]: !prev[cat] }));

  const updateItem = (catIdx, itemIdx, field, value) => {
    setGearData(prev => prev.map((c, ci) => ci !== catIdx ? c : {
      ...c, items: c.items.map((it, ii) => ii !== itemIdx ? it : { ...it, [field]: value })
    }));
  };

  const deleteItem = (catIdx, itemIdx) => {
    setGearData(prev => prev.map((c, ci) => ci !== catIdx ? c : { ...c, items: c.items.filter((_, ii) => ii !== itemIdx) }));
    setDeleteConfirm(null);
  };

  const addItem = (catIdx) => {
    setGearData(prev => prev.map((c, ci) => ci !== catIdx ? c : {
      ...c, items: [...c.items, { item: "New Item", detail: "", status: "need", notes: "" }]
    }));
  };

  const deleteCategory = (catIdx) => {
    setGearData(prev => prev.filter((_, ci) => ci !== catIdx));
    setDeleteConfirm(null);
  };

  const updateCategory = (catIdx, field, value) => {
    setGearData(prev => prev.map((c, ci) => ci !== catIdx ? c : { ...c, [field]: value }));
  };

  const addCategory = () => {
    if (!newCat.category.trim()) return;
    const cat = { category: newCat.category.trim().toUpperCase(), icon: newCat.icon, items: [] };
    setGearData(prev => [...prev, cat]);
    setExpanded(prev => ({ ...prev, [cat.category]: true }));
    setNewCatModal(false);
    setNewCat({ category: "", icon: "🎒" });
  };

  const allItems = gearData.flatMap(c => c.items);
  const counts = {
    total: allItems.length,
    have: allItems.filter(i => i.status === "have").length,
    need: allItems.filter(i => i.status === "need").length,
    building: allItems.filter(i => i.status === "building").length,
    tbd: allItems.filter(i => i.status === "tbd").length,
  };

  const filtered = gearData.map((cat, catIdx) => ({
    ...cat, catIdx,
    items: (filter === "all" ? cat.items : cat.items.filter(i => i.status === filter))
      .map(it => ({ ...it, itemIdx: cat.items.indexOf(it) }))
  })).filter(cat => filter === "all" || cat.items.length > 0);

  return (
    <div style={{ fontFamily: "'Courier New', monospace", background: "#1a1a1a", minHeight: "100vh", padding: "20px", color: "#e8e0d0" }}>

      {/* Delete Modal */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#252018", border: "1px solid #8b7355", borderRadius: "6px", padding: "24px 28px", maxWidth: "340px", width: "90%" }}>
            <div style={{ color: "#e63946", fontSize: "12px", fontWeight: "bold", letterSpacing: "0.12em", marginBottom: "10px" }}>⚠ CONFIRM DELETE</div>
            <div style={{ color: "#aaa", fontSize: "12px", marginBottom: "20px", lineHeight: 1.7 }}>
              {deleteConfirm.type === "category"
                ? <>Delete <strong style={{ color: "#e8e0d0" }}>{gearData[deleteConfirm.catIdx]?.category}</strong> and all {gearData[deleteConfirm.catIdx]?.items.length} items?</>
                : <>Delete <strong style={{ color: "#e8e0d0" }}>{gearData[deleteConfirm.catIdx]?.items[deleteConfirm.itemIdx]?.item}</strong>?</>}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => deleteConfirm.type === "category" ? deleteCategory(deleteConfirm.catIdx) : deleteItem(deleteConfirm.catIdx, deleteConfirm.itemIdx)}
                style={{ flex: 1, padding: "8px", background: "#9b2226", border: "none", borderRadius: "3px", color: "#fff", fontFamily: "'Courier New', monospace", fontSize: "11px", fontWeight: "bold", cursor: "pointer", letterSpacing: "0.1em" }}>DELETE</button>
              <button onClick={() => setDeleteConfirm(null)}
                style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid #555", borderRadius: "3px", color: "#aaa", fontFamily: "'Courier New', monospace", fontSize: "11px", cursor: "pointer", letterSpacing: "0.1em" }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}

      {/* New Category Modal */}
      {newCatModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#252018", border: "1px solid #8b7355", borderRadius: "6px", padding: "24px 28px", maxWidth: "400px", width: "90%" }}>
            <div style={{ color: "#c9a96e", fontSize: "12px", fontWeight: "bold", letterSpacing: "0.15em", marginBottom: "18px" }}>+ NEW CATEGORY</div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "10px", color: "#666", letterSpacing: "0.1em", marginBottom: "6px" }}>CATEGORY NAME</div>
              <input value={newCat.category} onChange={e => setNewCat(p => ({ ...p, category: e.target.value }))}
                onKeyDown={e => { if (e.key === "Enter") addCategory(); if (e.key === "Escape") setNewCatModal(false); }}
                placeholder="e.g. CAMP FURNITURE"
                autoFocus
                style={{ width: "100%", background: "#1a1a1a", border: "1px solid #555", borderRadius: "3px", padding: "8px 10px", color: "#e8e0d0", fontFamily: "'Courier New', monospace", fontSize: "12px", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "10px", color: "#666", letterSpacing: "0.1em", marginBottom: "8px" }}>ICON</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {ICONS.map(ic => (
                  <button key={ic} onClick={() => setNewCat(p => ({ ...p, icon: ic }))}
                    style={{ width: "36px", height: "36px", fontSize: "17px", background: newCat.icon === ic ? "#3a3228" : "transparent", border: `1px solid ${newCat.icon === ic ? "#c9a96e" : "#333"}`, borderRadius: "4px", cursor: "pointer" }}>{ic}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={addCategory}
                style={{ flex: 1, padding: "8px", background: "#c9a96e", border: "none", borderRadius: "3px", color: "#1a1a1a", fontFamily: "'Courier New', monospace", fontSize: "11px", fontWeight: "bold", cursor: "pointer", letterSpacing: "0.1em" }}>CREATE</button>
              <button onClick={() => { setNewCatModal(false); setNewCat({ category: "", icon: "🎒" }); }}
                style={{ flex: 1, padding: "8px", background: "transparent", border: "1px solid #555", borderRadius: "3px", color: "#aaa", fontFamily: "'Courier New', monospace", fontSize: "11px", cursor: "pointer", letterSpacing: "0.1em" }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ borderBottom: "2px solid #8b7355", paddingBottom: "16px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <h1 style={{ margin: "0 0 4px 0", fontSize: "17px", fontWeight: "bold", letterSpacing: "0.15em", color: "#c9a96e", textTransform: "uppercase" }}>
              🚣 Lower Deschutes — Raft Gear Manifest
            </h1>
            <div style={{ fontSize: "11px", color: "#666", letterSpacing: "0.1em" }}>AIRE TRIBUTARY 14 HD · DRE COLORADO 4-BAY DOUBLE RAIL · MARCH 2026</div>
          </div>
          <div style={{ fontSize: "10px", letterSpacing: "0.08em", color: savedFlash ? "#52b788" : "#333", transition: "color 0.3s", whiteSpace: "nowrap", paddingTop: "4px" }}>
            {savedFlash ? "● SAVED" : "● AUTO-SAVE ON"}
          </div>
        </div>
        <div style={{ display: "flex", gap: "18px", marginTop: "12px", flexWrap: "wrap", alignItems: "center" }}>
          {[["TOTAL", counts.total, "#c9a96e"], ["HAVE IT", counts.have, statusConfig.have.dot], ["NEED IT", counts.need, statusConfig.need.dot], ["IN PROGRESS", counts.building, statusConfig.building.dot], ["TBD", counts.tbd, statusConfig.tbd.dot]].map(([label, count, color]) => (
            <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold", color }}>{count}</span>
              <span style={{ fontSize: "10px", color: "#666", letterSpacing: "0.08em" }}>{label}</span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ background: "#2a2520", borderRadius: "4px", height: "7px", width: "130px", overflow: "hidden" }}>
              <div style={{ background: "#52b788", height: "100%", width: `${counts.total ? (counts.have / counts.total) * 100 : 0}%`, transition: "width 0.4s" }} />
            </div>
            <span style={{ fontSize: "11px", color: "#888" }}>{counts.total ? Math.round((counts.have / counts.total) * 100) : 0}% ready</span>
          </div>
        </div>
      </div>

      {/* Filters + hint */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
          {[["all", "ALL GEAR"], ["have", "✓ HAVE IT"], ["need", "✗ NEED IT"], ["building", "⚙ IN PROGRESS"], ["tbd", "? TBD"]].map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)}
              style={{ padding: "5px 12px", fontSize: "10px", letterSpacing: "0.1em", fontFamily: "'Courier New', monospace", cursor: "pointer", border: "1px solid", borderRadius: "3px", fontWeight: filter === key ? "bold" : "normal", background: filter === key ? "#c9a96e" : "transparent", borderColor: filter === key ? "#c9a96e" : "#555", color: filter === key ? "#1a1a1a" : "#aaa" }}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ fontSize: "10px", color: "#444", letterSpacing: "0.06em" }}>✏ click any cell to edit · click status badge to change</div>
      </div>

      {/* Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filtered.map(cat => (
          <div key={cat.category + cat.catIdx} style={{ border: "1px solid #3a3228", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", background: "#252018" }}>
              <button onClick={() => toggle(cat.category)}
                style={{ width: "32px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "9px 6px 9px 14px", background: "transparent", border: "none", cursor: "pointer", fontSize: "14px" }}>
                {cat.icon}
              </button>
              <div style={{ flex: 1, padding: "9px 8px", cursor: "pointer" }} onClick={() => toggle(cat.category)}>
                <EditableCell
                  value={cat.category}
                  onChange={v => updateCategory(cat.catIdx, "category", v.toUpperCase())}
                  style={{ fontSize: "11px", fontWeight: "bold", letterSpacing: "0.15em", color: "#c9a96e" }}
                />
              </div>
              <span style={{ fontSize: "10px", color: "#555", padding: "0 8px", whiteSpace: "nowrap", cursor: "pointer" }} onClick={() => toggle(cat.category)}>
                {gearData[cat.catIdx].items.filter(i => i.status === "have").length}/{gearData[cat.catIdx].items.length} ready
              </span>
              <span style={{ fontSize: "10px", color: "#444", padding: "0 8px", cursor: "pointer" }} onClick={() => toggle(cat.category)}>
                {expanded[cat.category] ? "▲" : "▼"}
              </span>
              <button onClick={() => setDeleteConfirm({ type: "category", catIdx: cat.catIdx })} title="Delete category"
                style={{ padding: "9px 12px", background: "transparent", border: "none", cursor: "pointer", color: "#333", fontSize: "13px", lineHeight: 1, flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = "#e63946"}
                onMouseLeave={e => e.currentTarget.style.color = "#333"}>✕</button>
            </div>

            {expanded[cat.category] && (
              <>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                    <thead>
                      <tr style={{ background: "#1e1b14" }}>
                        {["ITEM", "DETAIL", "STATUS", "NOTES", ""].map((h, i) => (
                          <th key={i} style={{ padding: "6px 14px", textAlign: "left", color: "#555", fontWeight: "normal", letterSpacing: "0.12em", fontSize: "10px", borderBottom: "1px solid #2a2520", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {cat.items.map((item, rowIdx) => (
                        <tr key={item.itemIdx} style={{ background: rowIdx % 2 === 0 ? "#1a1a1a" : "#1d1b16", borderBottom: "1px solid #222" }}>
                          <td style={{ padding: "8px 14px", fontWeight: "bold", color: "#e8e0d0", minWidth: "120px" }}>
                            <EditableCell value={item.item} onChange={v => updateItem(cat.catIdx, item.itemIdx, "item", v)} />
                          </td>
                          <td style={{ padding: "8px 14px", color: "#b8a88a", minWidth: "160px" }}>
                            <EditableCell value={item.detail} onChange={v => updateItem(cat.catIdx, item.itemIdx, "detail", v)} />
                          </td>
                          <td style={{ padding: "8px 14px", whiteSpace: "nowrap" }}>
                            <StatusPill status={item.status} onChange={v => updateItem(cat.catIdx, item.itemIdx, "status", v)} />
                          </td>
                          <td style={{ padding: "8px 14px", color: "#777", fontSize: "11px", lineHeight: "1.5", minWidth: "200px" }}>
                            <EditableCell value={item.notes} onChange={v => updateItem(cat.catIdx, item.itemIdx, "notes", v)} multiline />
                          </td>
                          <td style={{ padding: "8px 10px", whiteSpace: "nowrap" }}>
                            <button onClick={() => setDeleteConfirm({ type: "item", catIdx: cat.catIdx, itemIdx: item.itemIdx })} title="Delete row"
                              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#2e2a22", fontSize: "13px", lineHeight: 1, padding: "2px 4px" }}
                              onMouseEnter={e => e.currentTarget.style.color = "#e63946"}
                              onMouseLeave={e => e.currentTarget.style.color = "#2e2a22"}>✕</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={() => addItem(cat.catIdx)}
                  style={{ width: "100%", padding: "7px 14px", background: "transparent", border: "none", borderTop: "1px dashed #2a2520", cursor: "pointer", textAlign: "left", color: "#444", fontSize: "10px", letterSpacing: "0.1em", fontFamily: "'Courier New', monospace" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#1e1b14"; e.currentTarget.style.color = "#c9a96e"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#444"; }}>
                  + ADD ITEM
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => setNewCatModal(true)}
        style={{ marginTop: "12px", width: "100%", padding: "10px", background: "transparent", border: "1px dashed #3a3228", borderRadius: "4px", cursor: "pointer", color: "#444", fontSize: "10px", letterSpacing: "0.15em", fontFamily: "'Courier New', monospace" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#c9a96e"; e.currentTarget.style.color = "#c9a96e"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#3a3228"; e.currentTarget.style.color = "#444"; }}>
        + NEW CATEGORY
      </button>

      <div style={{ marginTop: "14px", padding: "9px 14px", background: "#1e1b14", border: "1px solid #3a3228", borderRadius: "4px", fontSize: "10px", color: "#555", letterSpacing: "0.08em" }}>
        ⚠ SHERARS FALLS — MANDATORY PORTAGE AT RM 44 &nbsp;·&nbsp; BOATER PASS REQUIRED YEAR-ROUND &nbsp;·&nbsp; FIRE RESTRICTIONS JUNE 1–OCT 15
      </div>
    </div>
  );
}
