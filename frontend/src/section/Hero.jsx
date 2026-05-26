import { ACCENT, ACCENT2, BORDER, TEXT, MUTED } from "../data.js";

export default function Hero({ scrollTo }) {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px 2rem 2rem", maxWidth: "1500px", margin: "0 auto" }}>
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
            <div className="hero-fade-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <span onClick={() => scrollTo("Projects")} className="btn-primary" style={{ cursor: "pointer" }}>View Projects</span>
              <span onClick={() => scrollTo("Connect")} className="btn-primary" style={{ cursor: "pointer", borderColor: ACCENT2, color: TEXT }}>Get in Touch</span>
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div
            className="hero-fade-2 hero-photo"
            style={{
              width: "320px", height: "380px", flexShrink: 0,
              borderRadius: "16px", overflow: "hidden",
              border: "1px solid rgba(124,111,212,0.4)",
              filter: "drop-shadow(0 0 25px rgba(124,111,212,0.7)) drop-shadow(0 0 60px rgba(124,111,212,0.4)) drop-shadow(0 0 100px rgba(124,111,212,0.2))"
            }}
          >
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
