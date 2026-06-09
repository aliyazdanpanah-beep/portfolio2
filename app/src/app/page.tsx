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
  }, [navLinks]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

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

        /* Hamburger Menu Styles */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 110;
        }
        .hamburger span {
          width: 100%;
          height: 2px;
          background: #64FFDA;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        .hamburger.open span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 70%;
          max-width: 300px;
          height: 100vh;
          background: rgba(10, 15, 30, 0.98);
          backdropFilter: blur(20px);
          z-index: 105;
          padding: 80px 32px 32px;
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 24px;
          border-left: 1px solid #1E2A45;
        }
        .mobile-menu.open {
          right: 0;
        }
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          z-index: 104;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .mobile-overlay.open {
          opacity: 1;
          visibility: visible;
        }
        .mobile-nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 18px;
          color: #8892B0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 12px 0;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: #64FFDA;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .hamburger {
            display: flex;
          }
          .hero-name {
            font-size: clamp(38px, 10vw, 72px) !important;
          }
          .hero-role {
            font-size: clamp(18px, 5vw, 28px) !important;
          }
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .skills-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
          .glow-btn {
            padding: 10px 20px;
            font-size: 12px;
          }
          .section-label {
            font-size: 10px;
          }
        }

        /* Small desktop adjustments */
        @media (min-width: 769px) and (max-width: 1024px) {
          .desktop-nav {
            gap: 20px !important;
          }
          .glow-btn {
            padding: 10px 22px;
          }
        }
          /* Add these to your existing <style> tag */

/* Galaxy Fold and ultra-small devices (288px and up) */
@media (max-width: 360px) {
  .hero-name {
    font-size: 28px !important;
    line-height: 1.2 !important;
  }
  
  .hero-role {
    font-size: 16px !important;
    line-height: 1.4 !important;
  }
  
  .glow-btn {
    padding: 8px 16px !important;
    font-size: 11px !important;
    width: 100% !important;
    text-align: center !important;
  }
  
  .section-label {
    font-size: 9px !important;
    letter-spacing: 0.15em !important;
  }
  
  .display-heading {
    font-size: clamp(24px, 7vw, 32px) !important;
  }
  
  p, .about-text {
    font-size: 12px !important;
    line-height: 1.6 !important;
  }
  
  .project-card {
    padding: 16px !important;
  }
  
  .project-card h3 {
    font-size: 18px !important;
  }
  
  .skill-pill {
    font-size: 10px !important;
    padding: 4px 10px !important;
    white-space: normal !important;
    word-break: keep-all !important;
  }
  
  .contact-input {
    font-size: 12px !important;
    padding: 10px 12px !important;
  }
  
  footer {
    flex-direction: column !important;
    text-align: center !important;
    gap: 8px !important;
  }
  
  footer span {
    font-size: 9px !important;
    text-align: center !important;
  }
  
  /* Fix for info cards on tiny screens */
  .about-grid [style*="display: flex"] {
    flex-direction: column !important;
    gap: 8px !important;
  }
  
  .about-grid [style*="min-width: clamp(80px"] {
    min-width: auto !important;
  }
  
  /* Navigation adjustments */
  nav {
    padding: 0 12px !important;
  }
  
  nav span:first-child {
    font-size: 12px !important;
  }
  
  .hamburger {
    width: 24px !important;
    height: 18px !important;
  }
  
  .mobile-menu {
    width: 85% !important;
    padding: 70px 20px 20px !important;
  }
  
  .mobile-nav-link {
    font-size: 16px !important;
    padding: 10px 0 !important;
  }
}

/* For devices with very small height (like Galaxy Fold in landscape or small phones) */
@media (max-height: 700px) and (max-width: 768px) {
  section {
    padding-top: 70px !important;
    padding-bottom: 50px !important;
  }
  
  .hero-name {
    margin-bottom: 4px !important;
  }
  
  .hero-role {
    margin-bottom: 16px !important;
  }
  
  .glow-btn {
    padding: 8px 16px !important;
  }
}

/* For extremely small heights (653px as you mentioned) */
@media (max-height: 660px) {
  #home {
    min-height: auto !important;
    padding-top: 80px !important;
    padding-bottom: 60px !important;
  }
  
  .hero-name {
    font-size: clamp(24px, 6vw, 32px) !important;
  }
  
  .hero-role {
    font-size: clamp(14px, 3.5vw, 18px) !important;
    margin-bottom: 12px !important;
  }
  
  .fade-up-4 p {
    margin-bottom: 20px !important;
  }
  
  .about-grid, .projects-grid, .skills-grid {
    gap: 30px !important;
  }
}

/* Fix background visibility on all small devices */
@media (max-width: 480px) {
  div[style*="radial-gradient"] {
    opacity: 0.7 !important;
  }
}
      `}</style>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((id) => (
          <button
            key={id}
            className={`mobile-nav-link ${
              activeSection === id ? "active" : ""
            }`}
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
          style={{ textDecoration: "none", textAlign: "center", marginTop: 16 }}
        >
          GitHub ↗
        </a>
      </div>

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
        <div
          className="desktop-nav"
          style={{ display: "flex", gap: 32, alignItems: "center" }}
        >
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

        {/* Hamburger Button */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── HERO ── */}
      {/* ── HERO SECTION (FULLY RESPONSIVE + FIXED BG) ── */}
      <section
        id="home"
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(80px, 15vh, 100px) max(16px, 5vw)",
          paddingTop: "clamp(80px, 12vh, 100px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Improved Background Gradient - Better visibility on small devices */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
        radial-gradient(circle at 30% 50%, rgba(100,255,218,0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 60%),
        radial-gradient(circle at 20% 80%, rgba(100,255,218,0.04) 0%, transparent 70%)
      `,
            pointerEvents: "none",
          }}
        />

        {/* Additional overlay for better text readability on very small screens */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at center, rgba(10,15,30,0) 0%, rgba(10,15,30,0.3) 100%)",
            pointerEvents: "none",
          }}
        />

        <p
          className="section-label fade-up"
          style={{ marginBottom: "clamp(12px, 3vh, 20px)" }}
        >
          Hello, world. I&apos;m
        </p>

        <h1
          className="display-heading hero-name fade-up-2"
          style={{
            fontSize: "clamp(28px, 8vw, 80px)",
            lineHeight: "clamp(1.1, 1.2, 1.05)",
            color: "#CCD6F6",
            letterSpacing: "-0.02em",
            marginBottom: "clamp(4px, 2vh, 8px)",
            wordBreak: "break-word",
          }}
        >
          Ali Yazdanpanahfard
        </h1>

        <div
          className="hero-role fade-up-3"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(16px, 4vw, 32px)",
            color: "#8892B0",
            fontWeight: 500,
            marginBottom: "clamp(20px, 4vh, 28px)",
            minHeight: "clamp(2.5rem, 4rem, 3rem)",
            lineHeight: 1.4,
          }}
        >
          {role}
          <span className="cursor" />
        </div>

        <p
          className="fade-up-4"
          style={{
            maxWidth: "min(520px, 90vw)",
            color: "#8892B0",
            fontSize: "clamp(12px, 3.5vw, 16px)",
            lineHeight: "clamp(1.6, 1.7, 1.75)",
            marginBottom: "clamp(32px, 6vh, 44px)",
          }}
        >
          Frontend developer with growing backend expertise — building scalable
          full-stack applications with{" "}
          <span style={{ color: "#64FFDA", fontWeight: 500 }}>Next.js</span>,{" "}
          <span style={{ color: "#64FFDA", fontWeight: 500 }}>FastAPI</span>,
          and{" "}
          <span style={{ color: "#64FFDA", fontWeight: 500 }}>PostgreSQL</span>.
          Based in Bushehr, Iran — available for remote work.
        </p>

        <div
          className="fade-up-4"
          style={{
            display: "flex",
            gap: "clamp(12px, 4vw, 16px)",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          <button
            className="glow-btn"
            onClick={() => scrollTo("projects")}
            style={{
              padding: "clamp(8px, 2vh, 12px) clamp(16px, 5vw, 28px)",
              fontSize: "clamp(11px, 3vw, 13px)",
            }}
          >
            View Projects
          </button>
          <button
            className="glow-btn"
            style={{
              borderColor: "#8B5CF6",
              color: "#8B5CF6",
              padding: "clamp(8px, 2vh, 12px) clamp(16px, 5vw, 28px)",
              fontSize: "clamp(11px, 3vw, 13px)",
            }}
            onClick={() => scrollTo("contact")}
          >
            Get In Touch
          </button>

          <button
  className="glow-btn"
  style={{
    background: "linear-gradient(135deg, #64FFDA, #8B5CF6)",
    color: "#0A0F1E",
    border: "1px solid #64FFDA",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "clamp(11px, 3vw, 13px)",
    fontWeight: "bold",
    padding: "clamp(8px, 2vh, 12px) clamp(16px, 5vw, 28px)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    letterSpacing: "0.08em",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 0 15px rgba(100,255,218,0.3)",
  }}
  onClick={() => {
    const cvUrl = "/resume/Ali_Yazdanpanahfard_CV.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Ali_Yazdanpanahfard_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "linear-gradient(135deg, #72FFE5, #9B6CFF)";
    e.currentTarget.style.boxShadow = "0 0 20px rgba(100,255,218,0.5)";
    e.currentTarget.style.transform = "translateY(-1px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "linear-gradient(135deg, #64FFDA, #8B5CF6)";
    e.currentTarget.style.boxShadow = "0 0 15px rgba(100,255,218,0.3)";
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  Download CV
  <span>→</span>
</button>
        </div>
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
            fontSize: "clamp(10px, 3vw, 12px)",
            color: "#4A5568",
          }}
        >
          &lt;ali /&gt; · Built with Next.js & TypeScript
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(10px, 3vw, 12px)",
            color: "#4A5568",
            textAlign: "right",
          }}
        >
          Designed & developed by Ali Yazdanpanahfard
        </span>
      </footer>
    </div>
  );
}
