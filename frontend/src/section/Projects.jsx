import { ACCENT, ACCENT2, MUTED, TEXT, PROJECTS } from "../data.js";
import RevealSection from "../components/RevealSection.jsx";

export default function Projects({ sectionsRef }) {
  return (
    <section id="Projects" data-section="Projects" ref={(el) => (sectionsRef.current["Projects"] = el)} style={{ padding: "5rem 4rem", maxWidth: "1500px", margin: "0 auto" }}>
      <RevealSection>
        <p className="section-label">Work</p>
        <h2 className="section-title">Projects</h2>
        <div className="grid-2">
          {PROJECTS.map((p, i) => (
            <RevealSection key={p.num} delay={i * 100}>
              <div className="proj-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: ACCENT, opacity: 0.5 }}>{p.num}</span>
                  <span className={`status-badge ${p.status === "Complete" ? "status-complete" : p.status === "In Progress" ? "status-progress" : "status-soon"}`}>{p.status}</span>
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1rem", fontWeight: 700, color: TEXT, marginBottom: "0.75rem" }}>{p.title}</h3>
                <p style={{ fontSize: "17px", color: MUTED, lineHeight: 1.7, marginBottom: "1.25rem" }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1.25rem" }}>
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: ACCENT2, textDecoration: "none", letterSpacing: "0.03em", marginTop: "auto", paddingTop: "1rem", display: "block" }}>{"View on GitHub >"}</a>
              </div>
            </RevealSection>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}
