import { ACCENT, ACCENT2, BG2, BORDER, TEXT, MUTED } from "../data.js";
import RevealSection from "../components/RevealSection.jsx";

export default function Connect({ sectionsRef }) {
  return (
    <>
      <section id="Connect" data-section="Connect" ref={(el) => (sectionsRef.current["Connect"] = el)} style={{ padding: "5rem 2rem 8rem", maxWidth: "1500px", margin: "0 auto" }}>
        <RevealSection>
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's connect</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "stretch" }}>

            {/* LEFT — Bio + Resume */}
            <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "1.1rem 1.5rem", flex: 1 }}>
                <p style={{ fontSize: "15px", color: "#B0B0C8", lineHeight: 1.8, marginBottom: "0.5rem" }}>
                  I'm a 3rd year student actively learning, building, and exploring. Open to conversations about{" "}
                  <em style={{ color: TEXT, fontStyle: "normal" }}>AI safety, cloud engineering, research collaborations,</em>{" "}
                  or just interesting problems worth solving.
                </p>
                <p style={{ fontSize: "15px", color: MUTED, lineHeight: 1.7, marginTop: "1rem" }}>
                  Reach out - I respond to everyone.
                </p>
              </div>
              <a href="/resume.pdf" download className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "1.1rem 1.5rem", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none", width: "100%" }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"} />
                </svg>
                Download Resume
              </a>
            </div>

            {/* RIGHT — Social links */}
            <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a href="https://github.com/RohitBoora05" target="_blank" rel="noreferrer" className="connect-link">
                <span style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(232,232,240,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill={TEXT}><path d={"M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"}/></svg>
                </span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: TEXT, marginBottom: "2px" }}>GitHub</p>
                  <p style={{ fontSize: "12px", color: MUTED }}>github.com/RohitBoora05</p>
                </div>
                <span style={{ marginLeft: "auto", color: MUTED, fontSize: "16px" }}>{">"}</span>
              </a>

              <a href="https://www.linkedin.com/in/rohtiboora-ai" target="_blank" rel="noreferrer" className="connect-link">
                <span style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(10,102,194,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="#0A66C2"><path d={"M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"}/></svg>
                </span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: TEXT, marginBottom: "2px" }}>LinkedIn</p>
                  <p style={{ fontSize: "12px", color: MUTED }}>linkedin.com/in/rohtiboora-ai</p>
                </div>
                <span style={{ marginLeft: "auto", color: MUTED, fontSize: "16px" }}>{">"}</span>
              </a>

              <a href="mailto:rohitboora2005@gmail.com" className="connect-link">
                <span style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(234,67,53,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="#EA4335"><path d={"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"}/></svg>
                </span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: TEXT, marginBottom: "2px" }}>Email</p>
                  <p style={{ fontSize: "12px", color: MUTED }}>rohitboora2005@gmail.com</p>
                </div>
                <span style={{ marginLeft: "auto", color: MUTED, fontSize: "16px" }}>{">"}</span>
              </a>
            </div>

          </div>
        </RevealSection>
      </section>

      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: MUTED }}>Rohit Boora - Built with React + AWS - 2026</p>
      </footer>
    </>
  );
}
