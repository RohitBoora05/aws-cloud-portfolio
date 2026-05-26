import { useState, useEffect, useRef } from "react";
import { ACCENT, ACCENT2, BG, BORDER, TEXT, MUTED } from "../data.js";
import Navbar from "../section/Navbar.jsx";
import Hero from "../section/Hero.jsx";
import About from "../section/About.jsx";
import WhatIDo from "../section/WhatIDo.jsx";
import Experience from "../section/Experience.jsx";
import Projects from "../section/Projects.jsx";
import Stack from "../section/Stack.jsx";
import Connect from "../section/Connect.jsx";

export default function Home() {
  const [activeSection, setActiveSection] = useState("About");
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => { const onScroll = () => { const el = document.documentElement; setScrollProgress(el.scrollTop / (el.scrollHeight - el.clientHeight) * 100); }; window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
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

        @keyframes scrollRight { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scrollLeft { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
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
        .tag { background: rgba(124,111,212,0.1); border: 1px solid rgba(124,111,212,0.2); color: ${ACCENT2}; font-size: 12px; padding: 3px 10px; border-radius: 20px; white-space: nowrap; }
        .proj-card { background: #0F0F1A; border: 1px solid ${BORDER}; border-radius: 12px; padding: 1.5rem; transition: border-color 0.35s, transform 0.35s, box-shadow 0.35s; display: flex; flex-direction: column; height: 100%; }
        .proj-card:hover { border-color: rgba(124,111,212,0.45); transform: translateY(-5px); box-shadow: 0 8px 32px rgba(124,111,212,0.12), 0 0 0 1px rgba(124,111,212,0.08); }
         .what-card { background: #0F0F1A; border: 1px solid ${BORDER}; border-radius: 12px; padding: 2rem; transition: border-color 0.3s, box-shadow 0.3s; height: 100%; }
        .what-card:hover { border-color: rgba(124,111,212,0.3); box-shadow: 0 4px 24px rgba(124,111,212,0.08); }
        .btn-primary { background: transparent; border: 1px solid rgba(124,111,212,0.4); color: ${ACCENT2}; padding: 10px 24px; border-radius: 6px; font-size: 13px; cursor: pointer; transition: all 0.25s; letter-spacing: 0.05em; text-decoration: none; display: inline-block; }
        .btn-primary:hover { background: rgba(124,111,212,0.1); border-color: ${ACCENT2}; box-shadow: 0 0 16px rgba(124,111,212,0.15); }
        .hero-line { height: 1px; background: linear-gradient(90deg, ${ACCENT}, transparent); margin: 1.5rem 0; }
        .section-label { font-size: 12px; letter-spacing: 0.15em; color: ${ACCENT}; text-transform: uppercase; margin-bottom: 0.5rem; font-family: 'Syne', sans-serif; }
        .section-title { font-family: 'Syne', sans-serif; font-size: clamp(1.6rem, 4vw, 2.2rem); font-weight: 700; color: ${TEXT}; margin-bottom: 3rem; }
        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .about-text { font-size: 18px; line-height: 1.9; color: #B0B0C8; }
        .about-text em { color: ${TEXT}; font-style: normal; font-weight: 500; }
        .hero-fade { animation: fadeUp 0.9s ease forwards; }
        .hero-fade-2 { animation: fadeUp 0.9s ease 0.15s forwards; opacity: 0; }
        .hero-fade-3 { animation: fadeUp 0.9s ease 0.3s forwards; opacity: 0; }
        .hero-fade-4 { animation: fadeUp 0.9s ease 0.45s forwards; opacity: 0; }
        .status-badge { font-size: 11px; padding: 2px 8px; border-radius: 20px; }
        .status-complete { background: rgba(52,211,153,0.1); color: #34D399; border: 1px solid rgba(52,211,153,0.2); }
        .status-progress { background: rgba(251,191,36,0.1); color: #FBBF24; border: 1px solid rgba(251,191,36,0.2); }
        .status-soon { background: rgba(124,111,212,0.1); color: ${ACCENT2}; border: 1px solid rgba(124,111,212,0.2); }
        .connect-link { display: flex; align-items: center; gap: 1rem; padding: 1.1rem 1.5rem; background: #0F0F1A; border: 1px solid ${BORDER}; border-radius: 10px; text-decoration: none; color: ${TEXT}; transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
        .connect-link:hover { border-color: rgba(124,111,212,0.45); transform: translateY(-3px); box-shadow: 0 6px 24px rgba(124,111,212,0.1); }
        .exp-layout { flex-direction: column !important; gap: 2rem !important; }
        .exp-sidebar { width: 100% !important; position: static !important; }
        .nav-bar-glow { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 1px; background: linear-gradient(90deg, transparent, rgba(124,111,212,0.4), transparent); pointer-events: none; }
        .row-pause:hover div { animation-play-state: paused !important; }
      `}</style>

      <div style={{ position: "fixed", top: 0, left: 0, height: "2px", width: `${scrollProgress}%`, background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})`, transition: "width 0.1s linear", zIndex: 101 }} />
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <About sectionsRef={sectionsRef} />
      <WhatIDo sectionsRef={sectionsRef} />
      <Experience sectionsRef={sectionsRef} />
      <Projects sectionsRef={sectionsRef} />
      <Stack sectionsRef={sectionsRef} />
      <Connect sectionsRef={sectionsRef} />
    </div>
  );
}
