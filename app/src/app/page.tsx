"use client";

import About from "@/components/about/about";
import Contact from "@/components/contact/contact";
import Project from "@/components/project/project";
import SkillsSEC from "@/components/skills/skills";
import { useState, useEffect, useRef } from "react";

const ROLES = [
  "Full-Stack Developer",
  "React & Next.js Engineer",
  "FastAPI Backend Dev",
  "UI Problem Solver",
];

function useTypingEffect(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
      setCharIdx(0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const role = useTypingEffect(ROLES);
  const heroRef = useRef<HTMLElement>(null);

  const navLinks = ["home", "about", "skills", "projects", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((id) => document.getElementById(id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(navLinks[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div
      style={{
        background: "#0A0F1E",
        color: "#E2E8F0",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0A0F1E; }
        ::-webkit-scrollbar-thumb { background: #1E2A45; border-radius: 3px; }

        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: #8892B0;
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: none;
          letter-spacing: 0.05em;
          background: none;
          border: none;
          padding: 0;
        }
        .nav-link:hover, .nav-link.active { color: #64FFDA; }

        .glow-btn {
          background: transparent;
          border: 1px solid #64FFDA;
          color: #64FFDA;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          padding: 12px 28px;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          letter-spacing: 0.08em;
        }
        .glow-btn:hover {
          background: rgba(100,255,218,0.08);
          box-shadow: 0 0 20px rgba(100,255,218,0.2);
        }

        .project-card {
          background: #0D1526;
          border: 1px solid #1E2A45;
          padding: 28px;
          transition: border-color 0.3s, transform 0.3s;
          cursor: default;
        }
        .project-card:hover {
          border-color: #64FFDA;
          transform: translateY(-4px);
        }

        .skill-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          padding: 5px 14px;
          border: 1px solid #1E2A45;
          color: #8892B0;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .skill-pill:hover {
          border-color: #64FFDA;
          color: #64FFDA;
          background: rgba(100,255,218,0.05);
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: #64FFDA;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .display-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background: #64FFDA;
          margin-left: 3px;
          vertical-align: text-bottom;
          animation: blink 1s infinite;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-up-2 { animation: fadeUp 0.6s 0.15s ease both; }
        .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
        .fade-up-4 { animation: fadeUp 0.6s 0.45s ease both; }

        .divider { height: 1px; background: linear-gradient(90deg, transparent, #1E2A45 30%, #1E2A45 70%, transparent); }

        .contact-input {
          background: #0D1526;
          border: 1px solid #1E2A45;
          color: #E2E8F0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          padding: 12px 16px;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .contact-input:focus { border-color: #64FFDA; }
        .contact-input::placeholder { color: #4A5568; }

        @media (max-width: 768px) {
          .hero-name { font-size: clamp(38px, 10vw, 72px) !important; }
          .hero-role { font-size: clamp(18px, 5vw, 28px) !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
        }

        
      `}</style>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(10,15,30,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #1E2A45",
          padding: "0 max(24px, 5vw)",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          onClick={() => scrollTo("home")}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#64FFDA",
            fontSize: 14,
            cursor: "pointer",
            letterSpacing: "0.1em",
          }}
        >
          &lt;ali /&gt;
        </span>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32 }} className="desktop-nav">
          {navLinks.map((id) => (
            <button
              key={id}
              className={`nav-link ${activeSection === id ? "active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              <span style={{ color: "#64FFDA" }}>
                0{navLinks.indexOf(id) + 1}.
              </span>{" "}
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <a
            href="https://github.com/aliyazdanpanah-beep"
            target="_blank"
            rel="noreferrer"
            className="glow-btn"
            style={{ textDecoration: "none" }}
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="home"
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 max(24px, 10vw)",
          paddingTop: 100,
        }}
      >
        <p className="section-label fade-up" style={{ marginBottom: 20 }}>
          Hello, world. I&apos;m
        </p>
        <h1
          className="display-heading hero-name fade-up-2"
          style={{
            fontSize: "clamp(48px, 8vw, 80px)",
            lineHeight: 1.05,
            color: "#CCD6F6",
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          Ali Yazdanpanahfard
        </h1>
        <div
          className="hero-role fade-up-3"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(22px, 4vw, 32px)",
            color: "#8892B0",
            fontWeight: 500,
            marginBottom: 28,
            minHeight: "1.4em",
          }}
        >
          {role}
          <span className="cursor" />
        </div>
        <p
          className="fade-up-4"
          style={{
            maxWidth: 520,
            color: "#8892B0",
            fontSize: 16,
            lineHeight: 1.75,
            marginBottom: 44,
          }}
        >
          Frontend developer with growing backend expertise — building scalable
          full-stack applications with{" "}
          <span style={{ color: "#64FFDA" }}>Next.js</span>,{" "}
          <span style={{ color: "#64FFDA" }}>FastAPI</span>, and{" "}
          <span style={{ color: "#64FFDA" }}>PostgreSQL</span>. Based in
          Bushehr, Iran — available for remote work.
        </p>
        <div
          className="fade-up-4"
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          <button className="glow-btn" onClick={() => scrollTo("projects")}>
            View Projects
          </button>
          <button
            className="glow-btn"
            style={{ borderColor: "#8B5CF6", color: "#8B5CF6" }}
            onClick={() => scrollTo("contact")}
          >
            Get In Touch
          </button>
        </div>

        {/* Subtle grid bg */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50vw",
            height: "100vh",
            backgroundImage:
              "radial-gradient(circle at 70% 40%, rgba(100,255,218,0.04) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
      </section>

      <div className="divider" style={{ margin: "0 max(24px, 10vw)" }} />

      {/* ── ABOUT ── */}

      <About />

      <div className="divider" style={{ margin: "0 max(24px, 10vw)" }} />

      {/* ── SKILLS ── */}

      <SkillsSEC />

      <div className="divider" style={{ margin: "0 max(24px, 10vw)" }} />

      {/* ── PROJECTS ── */}

      <Project />

      <div className="divider" style={{ margin: "0 max(24px, 10vw)" }} />

      {/* ── CONTACT ── */}

      <Contact />

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid #1E2A45",
          padding: "24px max(24px, 10vw)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#4A5568",
          }}
        >
          &lt;ali /&gt; · Built with Next.js & TypeScript
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#4A5568",
          }}
        >
          Designed & developed by Ali Yazdanpanahfard
        </span>
      </footer>
    </div>
  );
}
