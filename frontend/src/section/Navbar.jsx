import { useState } from "react";
import { ACCENT, ACCENT2, BORDER, TEXT, MUTED, NAV_LINKS } from "../data.js";

export default function Navbar({ activeSection, scrollTo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,15,0.88)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${BORDER}`, padding: "0 1.5rem", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="nav-bar-glow" />
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "15px", color: TEXT }}>RB<span style={{ color: ACCENT }}>.</span></span>
        <div className="desktop-nav" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <span key={l} className={`nav-link ${activeSection === l ? "active" : ""}`} onClick={() => scrollTo(l)}>{l}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="hamburger" onClick={() => setMenuOpen(m => !m)} style={{ display: "none", flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
            <span style={{ width: "22px", height: "2px", background: TEXT, borderRadius: "2px", display: "block" }} />
            <span style={{ width: "22px", height: "2px", background: TEXT, borderRadius: "2px", display: "block" }} />
            <span style={{ width: "22px", height: "2px", background: TEXT, borderRadius: "2px", display: "block" }} />
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div style={{ position: "fixed", top: "56px", left: 0, right: 0, bottom: 0, zIndex: 99, background: "rgba(10,10,15,0.97)", backdropFilter: "blur(16px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
          {NAV_LINKS.map((l) => (
            <span key={l} onClick={() => { scrollTo(l); setMenuOpen(false); }} style={{ fontSize: "1.5rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, color: activeSection === l ? ACCENT2 : TEXT, cursor: "pointer", letterSpacing: "0.05em" }}>{l}</span>
          ))}
        </div>
      )}
    </>
  );
}
