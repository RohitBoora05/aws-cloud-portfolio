import { useState, useEffect, useRef } from "react";

const ACCENT = "#7C6FD4";
const ACCENT2 = "#A78BFA";
const BG = "#0A0A0F";
const BG2 = "#0F0F1A";
const BG3 = "#13131F";
const BORDER = "rgba(124,111,212,0.15)";
const TEXT = "#E8E8F0";
const MUTED = "#6B6B8A";

const NAV_LINKS = ["About", "What I Do", "Experience", "Projects", "Stack", "Connect"];

const SKILLS_WHAT = [
  {
    title: "AI Developer", icon: "🧠",
    points: [
      "3rd year BTech student in AI & Data Science",
      "Builds small models for analytics and data analysis",
      "Studies AI from a safety & security perspective",
      "Exploring mechanistic interpretability",
      "Understands models internally — not just uses them",
      "Daily LLM practitioner with a critical, research-oriented mindset",
    ],
  },
  {
    title: "Cloud Engineer", icon: "☁️",
    points: [
      "Building hands-on cloud infrastructure via this portfolio",
      "Preparing for AWS Cloud Practitioner certification",
      "Working with S3, CloudFront, Lambda, DynamoDB, EC2",
      "Infrastructure as Code with Terraform & Docker",
      "Learning from fundamentals — the right way",
    ],
  },
];

const EXPERIENCE = [
  { period: "Q4 2024", title: "Fundamentals: C Programming", desc: "Studied core programming concepts, memory management, and control flow. Built a number guessing game with hot/cold proximity hints — first project beyond coursework." },
  { period: "Q2 2025", title: "Python & Scripting", desc: "Transitioned to Python, focused on scripting, automation, and building practical tools from scratch." },
  { period: "Q3 2025", title: "SIH Hackathon Preparation: Stream Selector", desc: "Developed an AI-based academic stream recommendation system during SIH preparation round. Processed student response data to classify suitable career streams." },
  { period: "Q1 2026 (Feb)", title: "Internship: ShadowFox | Python Development", desc: "Delivered Hangman game, a BeautifulSoup web scraper, and an advanced NLP analysis project. First production-level Python work in a structured environment." },
  { period: "Q1 2026", title: "BERT Architecture Analysis", desc: "Independent deep dive into transformer internals — analysed encoder layers, multi-head attention mechanisms, and token embeddings using HuggingFace. Fully documented on GitHub." },
  { period: "Q1 2026", title: "AWS Workshop: Cloud Foundations", desc: "Hands-on provisioning of core AWS services — S3, EC2, RDS, IAM, Elastic Load Balancer, CloudWatch, VPC. First structured exposure to cloud infrastructure management." },
  { period: "Q2 2026", title: "Mechanistic Interpretability", desc: "Encountered the MI review paper while researching model internals. Pivoted toward AI safety and interpretability research as a long-term focus area." },
  { period: "Q2 2026", title: "AWS Portfolio + Certification Track", desc: "Building production-grade cloud infrastructure — S3, CloudFront, Lambda, DynamoDB, EC2, Terraform, Docker. Actively preparing for AWS Cloud Practitioner certification." },
];

const PROJECTS = [
  { num: "01", title: "Explain My Mistake Engine", desc: "A cognitive mistake taxonomy framework for GATE CS exam analysis. Identifies which mental process failed at the moment of decision — 8 non-overlapping cognitive failure categories. Built for post-exam self-diagnosis, not topic tracking.", tags: ["Python", "Cognitive Science", "ML", "NLP"], link: "https://github.com/RohitBoora05/Explain-my-mistake-engine", status: "In Progress" },
  { num: "02", title: "BERT Architecture Analysis", desc: "Deep analysis of Google's BERT model — encoder layers, multi-head attention mechanisms, token embeddings. First hands-on study of transformer internals from a mechanistic perspective. Fully documented on GitHub.", tags: ["Python", "HuggingFace", "Transformers", "Jupyter"], link: "https://github.com/RohitBoora05/SHADOWFOX", status: "Complete" },
  { num: "03", title: "AWS Cloud Portfolio", desc: "Production-grade cloud infrastructure built from scratch — serverless visitor counter, FastAPI AI backend, CI/CD pipeline via GitHub Actions. Covers S3, CloudFront, Lambda, DynamoDB, EC2, Terraform, Docker.", tags: ["AWS", "React", "Lambda", "Terraform", "Docker"], link: "https://github.com/RohitBoora05/aws-cloud-portfolio", status: "In Progress" },
  { num: "04", title: "Career Stream Advisor", desc: "AI-based academic stream recommendation system. Processes student responses to classify suitable career paths between Science and Commerce streams. Built during SIH preparation round.", tags: ["Python", "AI", "Classification", "NLP"], link: "https://github.com/RohitBoora05/career-stream-advisor", status: "Complete" },
];

// Stack rows — each row scrolls at different speed for depth effect
const STACK_ROWS = [
  {
    label: "Languages & Web",
    color: "#7C6FD4",
    items: [
      { name: "Python", logo: "PY", color: "#3776AB" },
      { name: "JavaScript", logo: "JS", color: "#F7DF1E" },
      { name: "C", logo: "C", color: "#5C6BC0" },
      { name: "C++", logo: "C++", color: "#00599C" },
      { name: "R", logo: "R", color: "#276DC3" },
      { name: "React", logo: "⚛", color: "#61DAFB" },
      { name: "FastAPI", logo: "⚡", color: "#009688" },
      { name: "HTML", logo: "HT", color: "#E34F26" },
      { name: "CSS", logo: "CS", color: "#1572B6" },
      { name: "Vite", logo: "V", color: "#646CFF" },
    ],
  },
  {
    label: "AI / ML & Python Libraries",
    color: "#EE4C2C",
    items: [
      { name: "PyTorch", logo: "🔥", color: "#EE4C2C" },
      { name: "TensorFlow", logo: "TF", color: "#FF6F00" },
      { name: "HuggingFace", logo: "🤗", color: "#FFD21E" },
      { name: "Transformers", logo: "TR", color: "#A78BFA" },
      { name: "BERT", logo: "BE", color: "#4285F4" },
      { name: "Scikit-learn", logo: "SK", color: "#F7931E" },
      { name: "NumPy", logo: "NP", color: "#4DABCF" },
      { name: "Pandas", logo: "PD", color: "#150458" },
      { name: "Matplotlib", logo: "MP", color: "#11557C" },
      { name: "Seaborn", logo: "SB", color: "#4C72B0" },
      { name: "Mech. Interp.", logo: "MI", color: "#7C6FD4" },
      { name: "BeautifulSoup", logo: "BS", color: "#3E8B5E" },
      { name: "Jupyter", logo: "J", color: "#F37626" },
      { name: "Requests", logo: "RQ", color: "#2196F3" },
    ],
  },
  {
    label: "AWS Cloud",
    color: "#FF9900",
    items: [
      { name: "S3", logo: "S3", color: "#FF9900" },
      { name: "EC2", logo: "EC2", color: "#FF9900" },
      { name: "Lambda", logo: "λ", color: "#FF9900" },
      { name: "DynamoDB", logo: "DB", color: "#FF9900" },
      { name: "CloudFront", logo: "CF", color: "#FF9900" },
      { name: "API Gateway", logo: "AG", color: "#FF9900" },
      { name: "IAM", logo: "IAM", color: "#FF9900" },
      { name: "CloudWatch", logo: "CW", color: "#FF9900" },
      { name: "RDS", logo: "RDS", color: "#FF9900" },
      { name: "VPC", logo: "VPC", color: "#FF9900" },
      { name: "SNS", logo: "SNS", color: "#FF9900" },
      { name: "ELB", logo: "ELB", color: "#FF9900" },
      { name: "Aurora", logo: "AU", color: "#FF9900" },
      { name: "ElastiCache", logo: "EC", color: "#FF9900" },
      { name: "AMIs", logo: "AM", color: "#FF9900" },
    ],
  },
  {
    label: "DevOps, OS & Tools",
    color: "#7B42BC",
    items: [
      { name: "Docker", logo: "🐳", color: "#2496ED" },
      { name: "Terraform", logo: "TF", color: "#7B42BC" },
      { name: "GitHub Actions", logo: "GA", color: "#2088FF" },
      { name: "Git", logo: "GIT", color: "#F05032" },
      { name: "Linux", logo: "🐧", color: "#FCC624" },
      { name: "Ubuntu", logo: "UB", color: "#E95420" },
      { name: "WSL", logo: "WS", color: "#0078D4" },
      { name: "VS Code", logo: "VS", color: "#007ACC" },
      { name: "GitHub", logo: "GH", color: "#E8E8F0" },
      { name: "AWS CLI", logo: "CLI", color: "#FF9900" },
      { name: "Virtual Machines", logo: "VM", color: "#607D8B" },
      { name: "R Studio", logo: "RS", color: "#276DC3" },
    ],
  },
];

function LogoBadge({ item }) {
  const isEmoji = /\p{Emoji}/u.test(item.logo);
  return (
    <div style={{
      width: "40px", height: "40px", borderRadius: "8px", flexShrink: 0,
      background: isEmoji ? "rgba(255,255,255,0.04)" : item.color + "18",
      border: `1px solid ${item.color}30`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: isEmoji ? "20px" : "9px",
      fontWeight: 700, color: isEmoji ? "unset" : item.color,
      fontFamily: "monospace", letterSpacing: "-0.02em",
    }}>
      {item.logo}
    </div>
  );
}

function InfiniteRow({ items, speed = 30, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100%" }}>
      {/* fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to right, ${BG}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: `linear-gradient(to left, ${BG}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
      <div style={{
        display: "flex", gap: "12px",
        animation: `${reverse ? "scrollLeft" : "scrollRight"} ${speed}s linear infinite`,
        width: "max-content",
      }}>
        {doubled.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "10px",
            background: BG2, border: `1px solid ${BORDER}`,
            borderRadius: "10px", padding: "10px 16px",
            flexShrink: 0, transition: "border-color 0.2s, box-shadow 0.2s",
            cursor: "default",
            minWidth: "140px",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + "60"; e.currentTarget.style.boxShadow = `0 0 16px ${item.color}18`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }}
          >
            <LogoBadge item={item} />
            <span style={{ fontSize: "12px", color: TEXT, fontWeight: 500, whiteSpace: "nowrap" }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function TimelineItem({ item, index }) {
  const [ref, visible] = useScrollReveal(0.2);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  return (
    <div ref={ref} style={{ display: "flex", gap: isMobile ? "0.75rem" : "1.5rem", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)", transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`, flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: visible ? ACCENT : "transparent", border: `2px solid ${ACCENT}`, boxShadow: visible ? `0 0 10px ${ACCENT}, 0 0 20px rgba(124,111,212,0.3)` : "none", transition: `background 0.4s ease ${index * 100 + 300}ms, box-shadow 0.4s ease ${index * 100 + 300}ms`, flexShrink: 0, marginTop: "3px" }} />
        <div style={{ width: "1px", flex: 1, background: `linear-gradient(to bottom, ${ACCENT}60, ${ACCENT}10)`, marginTop: "4px", minHeight: "40px" }} />
      </div>
      <div style={{ paddingBottom: "2rem", flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: "11px", color: ACCENT, fontFamily: "monospace", letterSpacing: "0.04em", display: "block", marginBottom: "0.3rem" }}>{item.period}</span>
        <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 700, color: TEXT, marginBottom: "0.4rem", wordBreak: "break-word" }}>{item.title}</h4>
        <p style={{ fontSize: "13px", color: MUTED, lineHeight: 1.7, wordBreak: "break-word" }}>{item.desc}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionsRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.dataset.section); }); },
      { threshold: 0.2 }
    );
    Object.values(sectionsRef.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: BG, color: TEXT, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(124,111,212,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: ${ACCENT}; border-radius: 2px; }
        html { scroll-behavior: smooth; }

        @keyframes scrollRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollLeft {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

        .nav-link { color: ${MUTED}; font-size: 13px; letter-spacing: 0.05em; cursor: pointer; padding: 5px 12px; border-radius: 20px; transition: color 0.25s, background 0.25s, box-shadow 0.25s; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .nav-github { display: none !important; }
          .about-text { font-size: 13px !important; line-height: 1.6 !important; }
          .section-title { font-size: 1.4rem !important; margin-bottom: 1.5rem !important; }
          .what-card { padding: 1.25rem !important; }
          .proj-card { padding: 1.25rem !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .connect-link { padding: 0.9rem 1rem !important; }
          section { padding-left: 1rem !important; padding-right: 1rem !important; }
          .hero-photo { width: 100% !important; height: 380px !important; margin-bottom: 1.5rem; }
        }
        .nav-link:hover { color: ${TEXT}; background: rgba(124,111,212,0.08); }
        .nav-link.active { color: ${ACCENT2}; background: rgba(124,111,212,0.12); box-shadow: 0 0 10px rgba(124,111,212,0.25), 0 0 20px rgba(124,111,212,0.1), inset 0 0 8px rgba(124,111,212,0.08); }

        .tag { background: rgba(124,111,212,0.1); border: 1px solid rgba(124,111,212,0.2); color: ${ACCENT2}; font-size: 11px; padding: 3px 10px; border-radius: 20px; white-space: nowrap; }
        .proj-card { background: ${BG2}; border: 1px solid ${BORDER}; border-radius: 12px; padding: 1.5rem; transition: border-color 0.35s, transform 0.35s, box-shadow 0.35s ; display: flex; flex-direction: column; height: 100%; }
        .proj-card:hover { border-color: rgba(124,111,212,0.45); transform: translateY(-5px); box-shadow: 0 8px 32px rgba(124,111,212,0.12), 0 0 0 1px rgba(124,111,212,0.08); }
        .what-card { background: ${BG2}; border: 1px solid ${BORDER}; border-radius: 12px; padding: 2rem; transition: border-color 0.3s, box-shadow 0.3s; }
        .what-card:hover { border-color: rgba(124,111,212,0.3); box-shadow: 0 4px 24px rgba(124,111,212,0.08); }
        .btn-primary { background: transparent; border: 1px solid rgba(124,111,212,0.4); color: ${ACCENT2}; padding: 10px 24px; border-radius: 6px; font-size: 13px; cursor: pointer; transition: all 0.25s; letter-spacing: 0.05em; text-decoration: none; display: inline-block; }
        .btn-primary:hover { background: rgba(124,111,212,0.1); border-color: ${ACCENT2}; box-shadow: 0 0 16px rgba(124,111,212,0.15); }
        .hero-line { height: 1px; background: linear-gradient(90deg, ${ACCENT}, transparent); margin: 1.5rem 0; }
        .section-label { font-size: 11px; letter-spacing: 0.15em; color: ${ACCENT}; text-transform: uppercase; margin-bottom: 0.5rem; font-family: 'Syne', sans-serif; }
        .section-title { font-family: 'Syne', sans-serif; font-size: clamp(1.6rem, 4vw, 2.2rem); font-weight: 700; color: ${TEXT}; margin-bottom: 3rem; }
        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .about-text { font-size: 15px; line-height: 1.9; color: #B0B0C8; }
        .about-text em { color: ${TEXT}; font-style: normal; font-weight: 500; }
        .hero-fade { animation: fadeUp 0.9s ease forwards; }
        .hero-fade-2 { animation: fadeUp 0.9s ease 0.15s forwards; opacity: 0; }
        .hero-fade-3 { animation: fadeUp 0.9s ease 0.3s forwards; opacity: 0; }
        .hero-fade-4 { animation: fadeUp 0.9s ease 0.45s forwards; opacity: 0; }
        .status-badge { font-size: 10px; padding: 2px 8px; border-radius: 20px; }
        .status-complete { background: rgba(52,211,153,0.1); color: #34D399; border: 1px solid rgba(52,211,153,0.2); }
        .status-progress { background: rgba(251,191,36,0.1); color: #FBBF24; border: 1px solid rgba(251,191,36,0.2); }
        .status-soon { background: rgba(124,111,212,0.1); color: ${ACCENT2}; border: 1px solid rgba(124,111,212,0.2); }
        .connect-link { display: flex; align-items: center; gap: 1rem; padding: 1.1rem 1.5rem; background: ${BG2}; border: 1px solid ${BORDER}; border-radius: 10px; text-decoration: none; color: ${TEXT}; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
        .connect-link:hover { border-color: rgba(124,111,212,0.45); transform: translateY(-3px); box-shadow: 0 6px 24px rgba(124,111,212,0.1); }
        .exp-layout { flex-direction: column !important; gap: 2rem !important; }
        .exp-sidebar { width: 100% !important; position: static !important; }
        .nav-bar-glow { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 1px; background: linear-gradient(90deg, transparent, rgba(124,111,212,0.4), transparent); pointer-events: none; }
        .row-pause:hover div { animation-play-state: paused !important; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,15,0.88)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${BORDER}`, padding: "0 1.5rem", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="nav-bar-glow" />
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "15px", color: TEXT }}>RB<span style={{ color: ACCENT }}>.</span></span>
        <div className="desktop-nav" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <span key={l} className={`nav-link ${activeSection === l ? "active" : ""}`} onClick={() => scrollTo(l)}>{l}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="https://github.com/RohitBoora05" target="_blank" rel="noreferrer" className="btn-primary nav-github" style={{ padding: "6px 16px", fontSize: "12px" }}>GitHub</a>
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
          <a href="https://github.com/RohitBoora05" target="_blank" rel="noreferrer" style={{ fontSize: "14px", color: ACCENT2, textDecoration: "none", marginTop: "1rem" }}>{"GitHub >"}</a>
        </div>
      )}

      {/* HERO */}

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
          width: "320px",
          height: "380px",
          flexShrink: 0,
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(124,111,212,0.4)",
          filter: "drop-shadow(0 0 25px rgba(124,111,212,0.7)) drop-shadow(0 0 60px rgba(124,111,212,0.4)) drop-shadow(0 0 100px rgba(124,111,212,0.2))"
        }}
      >
        <img
          src="/profile.jpg"
          alt="Rohit Boora"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block"
          }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback if image missing */}
        <div style={{ display: "none", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(124,111,212,0.12)", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontFamily: "'Syne',sans-serif", fontWeight: 700, color: ACCENT2, marginBottom: "0.75rem" }}>RB</div>
          <span style={{ fontSize: "11px", color: MUTED }}>Add profile.jpg</span>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* ABOUT */}
      <section id="About" data-section="About" ref={(el) => (sectionsRef.current["About"] = el)} style={{ padding: "5rem 4rem", maxWidth: "1500px", margin: "0 auto" }}>
        <RevealSection>
          <p className="section-label">About</p>
          <h2 className="section-title">Who I am</h2>
          <div style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: "12px", padding: "2rem 2.5rem" }}>
            <p className="about-text">I'm a programmer in an age where everyone claims programming is obsolete - <em>I strongly disagree.</em> It's more critical than ever. As AI agents autonomously push code and ship features without proper review, we're seeing more system crashes, security vulnerabilities, and technical debt built on blind trust.</p>
            <br />
            <p className="about-text"><em>I believe in learning to do it properly.</em></p>
            <br />
            <p className="about-text">As an AI developer, I understand what AI actually is - <em>a highly sophisticated statistical next-token prediction system.</em> Incredibly powerful, but not magic, and certainly not a solution to everything. That understanding is precisely what separates engineers who build reliable, secure systems from those who don't.</p>
          </div>
        </RevealSection>
      </section>

      {/* WHAT I DO */}
      <section id="What I Do" data-section="What I Do" ref={(el) => (sectionsRef.current["What I Do"] = el)} style={{ padding: "5rem 4rem", maxWidth: "1500px", margin: "0 auto" }}>
        <RevealSection>
          <p className="section-label">Specializations</p>
          <h2 className="section-title">What I do</h2>
          <div className="grid-2">
            {SKILLS_WHAT.map((s, i) => (
              <RevealSection key={s.title} delay={i * 120}>
                <div className="what-card">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: TEXT }}>{s.title}</h3>
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {s.points.map((p) => (
                      <li key={p} style={{ display: "flex", gap: "0.6rem", fontSize: "15px", color: "#9090B0", lineHeight: 1.5 }}>
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

{/* EXPERIENCE */}
<section id="Experience" data-section="Experience" ref={(el) => (sectionsRef.current["Experience"] = el)} style={{ padding: "5rem 4rem", maxWidth: "1500px", margin: "0 auto" }}>
  <RevealSection>
    <p className="section-label">Journey</p>
    <h2 className="section-title">My career {"&"} experience</h2>
  </RevealSection>

  <div className="exp-layout" style={{ display: "flex", gap: "4rem", alignItems: "flex-start" }}>

    {/* LEFT — Timeline */}
    <div style={{ flex: 1, minWidth: 0 }}>
      {EXPERIENCE.map((e, i) => <TimelineItem key={e.title} item={e} index={i} />)}
    </div>

    {/* RIGHT — Sticky summary card */}
    <div className="exp-sidebar" style={{ width: "	300px", flexShrink: 0, position: "sticky", top: "80px" }}>
      <RevealSection delay={200}>

        {/* Status */}
        <div style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: ACCENT, textTransform: "uppercase", fontFamily: "'Syne', sans-serif", marginBottom: "1rem" }}>Current Status</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34D399", boxShadow: "0 0 8px #34D39980", flexShrink: 0 }} />
            <span style={{ fontSize: "13px", color: TEXT, fontWeight: 500 }}>Open to opportunities</span>
          </div>
          <p style={{ fontSize: "12px", color: MUTED, lineHeight: 1.6 }}>3rd year BTech — AI {"&"} Data Science. Actively building, learning, and exploring research directions.</p>
        </div>

        {/* Quick stats */}
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

        {/* Currently exploring */}
        <div style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: "12px", padding: "1.5rem" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: ACCENT, textTransform: "uppercase", fontFamily: "'Syne', sans-serif", marginBottom: "1rem" }}>Now Exploring</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              "Mechanistic Interpretability",
              "AWS Cloud Practitioner",
              "Transformer Internals",
              "MLOps on AWS",
            ].map((item) => (
              <div key={item} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <span style={{ color: ACCENT2, fontSize: "12px", marginTop: "1px", flexShrink: 0 }}>{"›"}</span>
                <span style={{ fontSize: "12px", color: "#9090B0", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </RevealSection>
    </div>

  </div>
</section> 

      {/* PROJECTS */}
      <section id="Projects" data-section="Projects" ref={(el) => (sectionsRef.current["Projects"] = el)} style={{ padding: "5rem 4rem", maxWidth: "1500px", margin: "0 auto" }}>
        <RevealSection>
          <p className="section-label">Work</p>
          <h2 className="section-title">My projects</h2>
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
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: ACCENT2, textDecoration: "none", letterSpacing: "0.03em" ,marginTop: "auto", paddingTop: "1rem", display: "block" }}>{"View on GitHub >"}</a>
                </div>
              </RevealSection>
            ))}
          </div>
        </RevealSection>
      </section>

{/* TECH STACK — infinite carousel rows */}
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
          <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: row.color, textTransform: "uppercase", fontFamily: "'Syne', sans-serif" }}>{row.label}</span>
        </div>
        <div className="row-pause">
          <InfiniteRow items={row.items} speed={20 + i * 8} reverse={i % 2 !== 0} />
        </div>
      </RevealSection>
    ))}
  </div>
</section>

{/* CONNECT */}
<section id="Connect" data-section="Connect" ref={(el) => (sectionsRef.current["Connect"] = el)} style={{ padding: "5rem 2rem 8rem", maxWidth: "1500px", margin: "0 auto" }}>
  <RevealSection>
    <p className="section-label">Contact</p>
    <h2 className="section-title">Let's connect</h2>

    <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", alignItems: "flex-start" }}>

      {/* LEFT — Bio text */}
      <div style={{ flex: 1, minWidth: "280px" }}>
        <div style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: "12px", padding: "2rem 2.5rem", marginBottom: "2rem" }}>
          <p style={{ fontSize: "17px", color: "#B0B0C8", lineHeight: 1.8, marginBottom: "0.5rem" }}>
            I'm a 3rd year student actively learning, building, and exploring. Open to conversations about{" "}
            <em style={{ color: TEXT, fontStyle: "normal" }}>AI safety, cloud engineering, research collaborations,</em>{" "}
            or just interesting problems worth solving.
          </p>
          <p style={{ fontSize: "18px", color: MUTED, lineHeight: 1.7, marginTop: "1rem" }}>
            Reach out - I respond to everyone.
          </p>
        </div>

        {/* Resume download 
           <a        
          href="/resume.pdf"
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            background: `rgba(124,111,212,0.12)`,
            border: `1px solid ${ACCENT2}`,
            color: ACCENT2,
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            cursor: "pointer"
          }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
  <path d={"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"}/>
</svg>

          Download Resume
        </a> */}
      </div>

      {/* RIGHT — Social links */}
      <div style={{ flex: 1, minWidth: "280px", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <a href="https://github.com/RohitBoora05" target="_blank" rel="noreferrer" className="connect-link">
          <span style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(232,232,240,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill={TEXT}><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>
          </span>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 500, color: TEXT, marginBottom: "2px" }}>GitHub</p>
            <p style={{ fontSize: "12px", color: MUTED }}>github.com/RohitBoora05</p>
          </div>
        <span style={{ marginLeft: "auto", color: MUTED, fontSize: "16px" }}>{">"}</span>
        </a>

        <a href="https://www.linkedin.com/in/rohtiboora-ai" target="_blank" rel="noreferrer" className="connect-link">
          <span style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(10,102,194,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#0A66C2"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          </span>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 500, color: TEXT, marginBottom: "2px" }}>LinkedIn</p>
            <p style={{ fontSize: "12px", color: MUTED }}>linkedin.com/in/rohtiboora-ai</p>
          </div>
        <span style={{ marginLeft: "auto", color: MUTED, fontSize: "16px" }}>{">"}</span>
        </a>

        <a href="mailto:rohitboora2005@gmail.com" className="connect-link">
          <span style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(234,67,53,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#EA4335"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </span>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 500, color: TEXT, marginBottom: "2px" }}>Email</p>
            <p style={{ fontSize: "12px", color: MUTED }}>rohitboora2005@gmail.com</p>
          </div>
        <span style={{ marginLeft: "auto", color: MUTED, fontSize: "16px" }}>{">"}</span>
        </a>
      </div>

    </div>
  </RevealSection>
</section>


{/* FOOTER */}
<footer style={{ borderTop: `1px solid ${BORDER}`, padding: "2rem", textAlign: "center" }}>
  <p style={{ fontSize: "12px", color: MUTED }}>Rohit Boora - Built with React + AWS - 2026</p>
</footer>
    </div>
  );
}
