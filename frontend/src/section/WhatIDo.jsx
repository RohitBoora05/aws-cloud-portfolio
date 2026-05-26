import { ACCENT, TEXT } from "../data.js";
import { SKILLS_WHAT } from "../data.js";
import RevealSection from "../components/RevealSection.jsx";

export default function WhatIDo({ sectionsRef }) {
  return (
    <section id="What I Do" data-section="What I Do" ref={(el) => (sectionsRef.current["What I Do"] = el)} style={{ padding: "5rem 4rem", maxWidth: "1500px", margin: "0 auto" }}>
      <RevealSection>
        <p className="section-label">Specializations</p>
        <h2 className="section-title">What I do</h2>
        <div className="grid-2">
          {SKILLS_WHAT.map((s, i) => (
             <RevealSection key={s.title} delay={i * 120} style={{ height: "100%" }}>
              <div className="what-card">
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: TEXT }}>{s.title}</h3>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {s.points.map((p) => (
                    <li key={p} style={{ display: "flex", gap: "0.6rem", fontSize: "15px", color: "#A0A0C0", lineHeight: 1.5 }}>
                      <span style={{ color: ACCENT, marginTop: "2px", flexShrink: 0 }}>{"›"}</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}
