import { ACCENT, ACCENT2, BG2, BORDER, TEXT, MUTED, EXPERIENCE } from "../data.js";
import RevealSection from "../components/RevealSection.jsx";
import TimelineItem from "../components/TimelineItem.jsx";

export default function Experience({ sectionsRef }) {
  return (
    <section id="Experience" data-section="Experience" ref={(el) => (sectionsRef.current["Experience"] = el)} style={{ padding: "5rem 4rem", maxWidth: "1500px", margin: "0 auto" }}>
      <RevealSection>
        <p className="section-label">Journey</p>
        <h2 className="section-title">Career {"&"} experience</h2>
      </RevealSection>

      <div className="exp-layout" style={{ display: "flex", gap: "4rem", alignItems: "flex-start" }}>

        {/* LEFT — Timeline */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {EXPERIENCE.map((e, i) => <TimelineItem key={e.title} item={e} index={i} />)}
        </div>

        {/* RIGHT — Sticky summary card */}
        <div className="exp-sidebar" style={{ width: "300px", flexShrink: 0, position: "sticky", top: "80px" }}>
          <RevealSection delay={200}>

            <div style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.12em", color: ACCENT, textTransform: "uppercase", fontFamily: "'Syne', sans-serif", marginBottom: "1rem" }}>Current Status</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34D399", boxShadow: "0 0 8px #34D39980", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: TEXT, fontWeight: 500 }}>Open to opportunities</span>
              </div>
              <p style={{ fontSize: "12px", color: MUTED, lineHeight: 1.6 }}>3rd year BTech — AI {"&"} Data Science. Actively building, learning, and exploring research directions.</p>
            </div>

            <div style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: ACCENT, textTransform: "uppercase", fontFamily: "'Syne', sans-serif", marginBottom: "1rem" }}>Quick Stats</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { label: "Projects shipped", value: "4+" },
                  { label: "Internships", value: "1" },
                  { label: "AWS services used", value: "15+" },
                  { label: "Hackathons", value: "SIH 2025" },
                ].map((stat) => (
                  <div key={stat.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: MUTED }}>{stat.label}</span>
                    <span style={{ fontSize: "13px", color: TEXT, fontWeight: 600, fontFamily: "monospace" }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: "12px", padding: "1.5rem" }}>
              <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: ACCENT, textTransform: "uppercase", fontFamily: "'Syne', sans-serif", marginBottom: "1rem" }}>Now Exploring</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["Mechanistic Interpretability", "AWS Cloud Practitioner", "Transformer Internals", "MLOps on AWS"].map((item) => (
                  <div key={item} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                    <span style={{ color: ACCENT2, fontSize: "12px", marginTop: "1px", flexShrink: 0 }}>{"›"}</span>
                    <span style={{ fontSize: "12px", color: "#A0A0C0", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </RevealSection>
        </div>

      </div>
    </section>
  );
}
