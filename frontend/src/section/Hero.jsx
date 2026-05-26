import { ACCENT, ACCENT2, BORDER, TEXT, MUTED } from "../data.js";

export default function Hero({ scrollTo }) {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px 2rem 2rem", maxWidth: "1500px", margin: "0 auto", position: "relative" }}>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4rem", flexWrap: "wrap" }}>

          {/* LEFT — Text */}
          <div style={{ flex: 1, minWidth: "280px" }}>
            <p className="section-label hero-fade" style={{ marginBottom: "1rem" }}>Cloud Engineer | AI Developer</p>
            <h1 className="hero-fade-2" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.8rem, 8vw, 5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", color: TEXT, marginBottom: "0.5rem" }}>
              Rohit<br /><span style={{ color: ACCENT2 }}>Boora</span>
            </h1>
            <div className="hero-line hero-fade-3" />
            <p className="hero-fade-3" style={{ fontSize: "18px", color: MUTED, lineHeight: 1.7, maxWidth: "480px", marginBottom: "2rem" }}>
              I build on AWS and study AI from first principles - because engineers who understand what's inside the black box write better systems than those who don't.
            </p>
            <div className="hero-fade-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <span onClick={() => scrollTo("Projects")} className="btn-primary" style={{ cursor: "pointer" }}>View Projects</span>
              <span onClick={() => scrollTo("Connect")} className="btn-primary" style={{ cursor: "pointer" }}>Get in Touch</span>
              <a href="https://github.com/RohitBoora05" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d={"M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"}/></svg>
                GitHub
              </a>
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div className="hero-fade-2 hero-photo" style={{ width: "320px", height: "380px", flexShrink: 0, borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(124,111,212,0.4)", filter: "drop-shadow(0 0 25px rgba(124,111,212,0.7)) drop-shadow(0 0 60px rgba(124,111,212,0.4)) drop-shadow(0 0 100px rgba(124,111,212,0.2))" }}>
            <img src="/profile.jpg" alt="Rohit Boora" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            />
            <div style={{ display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(124,111,212,0.12)", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontFamily: "'Syne',sans-serif", fontWeight: 700, color: ACCENT2, marginBottom: "0.75rem" }}>RB</div>
              <span style={{ fontSize: "11px", color: MUTED }}>Add profile.jpg</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
