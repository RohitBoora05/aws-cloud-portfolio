import { STACK_ROWS } from "../data.js";
import RevealSection from "../components/RevealSection.jsx";
import InfiniteRow from "../components/InfiniteRow.jsx";

export default function Stack({ sectionsRef }) {
  return (
    <section id="Stack" data-section="Stack" ref={(el) => (sectionsRef.current["Stack"] = el)} style={{ padding: "5rem 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "0 4rem" }}>
        <RevealSection>
          <p className="section-label">Technologies</p>
          <h2 className="section-title">Tech stack</h2>
        </RevealSection>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {STACK_ROWS.map((row, i) => (
          <RevealSection key={row.label} delay={i * 80}>
            <div style={{ padding: "0 4rem", maxWidth: "1500px", margin: "0 auto", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: row.color, textTransform: "uppercase", fontFamily: "'Syne', sans-serif" }}>{row.label}</span>
            </div>
            <div className="row-pause">
              <InfiniteRow items={row.items} speed={20 + i * 8} reverse={i % 2 !== 0} />
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
