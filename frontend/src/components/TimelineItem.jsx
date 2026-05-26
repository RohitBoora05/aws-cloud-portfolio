import { ACCENT, TEXT, MUTED } from "../data.js";
import { useScrollReveal } from "./RevealSection.jsx";

export default function TimelineItem({ item, index }) {
  const [ref, visible] = useScrollReveal(0.2);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  return (
    <div ref={ref} style={{ display: "flex", gap: isMobile ? "0.75rem" : "1.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`, flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: visible ? ACCENT : "transparent", border: `2px solid ${ACCENT}`, boxShadow: visible ? `0 0 10px ${ACCENT}, 0 0 20px rgba(124,111,212,0.3)` : "none", transition: `background 0.4s ease ${index * 100 + 300}ms, box-shadow 0.4s ease ${index * 100 + 300}ms`, flexShrink: 0, marginTop: "3px" }} />
        <div style={{ width: "1px", flex: 1, background: `linear-gradient(to bottom, ${ACCENT}60, ${ACCENT}10)`, marginTop: "4px", minHeight: "40px" }} />
      </div>
      <div style={{ paddingBottom: "2rem", flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: "12px", color: ACCENT, fontFamily: "monospace", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>{item.period}</span>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 700, color: TEXT, marginBottom: "0.4rem", wordBreak: "break-word" }}>{item.title}</h4>
        <p style={{ fontSize: "14px", color: MUTED, lineHeight: 1.7, wordBreak: "break-word" }}>{item.desc}</p>
      </div>
    </div>
  );
}
