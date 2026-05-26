import { ACCENT, BORDER, TEXT } from "../data.js";
import RevealSection from "../components/RevealSection.jsx";

export default function About({ sectionsRef }) {
  return (
    <section id="About" data-section="About" ref={(el) => (sectionsRef.current["About"] = el)} style={{ padding: "5rem 4rem", maxWidth: "1500px", margin: "0 auto" }}>
      <RevealSection>
        <p className="section-label">About</p>
        <h2 className="section-title">Who I am</h2>
        <div style={{ background: "#0F0F1A", border: `1px solid ${BORDER}`, borderRadius: "12px", padding: "2rem 2.5rem" }}>
          <p className="about-text">I'm a programmer in an age where everyone claims programming is obsolete - <em>I strongly disagree.</em> It's more critical than ever. As AI agents autonomously push code and ship features without proper review, we're seeing more system crashes, security vulnerabilities, and technical debt built on blind trust.</p>
          <br />
          <p className="about-text"><em>I believe in learning to do it properly.</em></p>
          <br />
          <p className="about-text">As an AI developer, I understand what AI actually is - <em>a highly sophisticated statistical next-token prediction system.</em> Incredibly powerful, but not magic, and certainly not a solution to everything. That understanding is precisely what separates engineers who build reliable, secure systems from those who don't.</p>
        </div>
      </RevealSection>
    </section>
  );
}
