"use client";

import About from "@/components/about/about";
import Contact from "@/components/contact/contact";
import Documents from "@/components/documents/documents";
import Experience from "@/components/experince/exprince";
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

  const navLinks = ["home", "about", "skills", "experience", "projects", "documents", "contact"];

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
        background: "var(--color-bg)",
        color: "var(--color-text)",
        fontFamily: "'Inter', system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
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
            className={`mobile-nav-link ${activeSection === id ? "active" : ""}`}
            onClick={() => scrollTo(id)}
          >
            <span style={{ color: "var(--color-accent)" }}>
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
          background: "rgba(244, 241, 222, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border)",
          padding: "0 max(24px, 5vw)",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <span
          onClick={() => scrollTo("home")}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "var(--color-accent)",
            fontSize: 14,
            cursor: "pointer",
            letterSpacing: "0.1em",
          }}
        >
          &lt;ali /&gt;
        </span> */}

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
              <span style={{ color: "var(--color-accent)" }}>
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
        radial-gradient(circle at 30% 50%, rgba(224, 122, 95, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(129, 178, 154, 0.06) 0%, transparent 60%),
        radial-gradient(circle at 20% 80%, rgba(224, 122, 95, 0.04) 0%, transparent 70%)`,
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
              "radial-gradient(ellipse at center, rgba(244, 241, 222, 0) 0%, rgba(244, 241, 222, 0.3) 100%)",
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
            color: "var(--color-text)",
            letterSpacing: "-0.02em",
            marginBottom: "clamp(4px, 2vh, 8px)",
            wordBreak: "break-word",
            fontWeight: 800,
            textShadow: "0 2px 8px rgba(224, 122, 95, 0.12)",
          }}
        >
          Ali Yazdanpanah
        </h1>

        <div
          className="hero-role fade-up-3"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(16px, 4vw, 32px)",
            color: "var(--color-text)",
            fontWeight: 500,
            marginBottom: "clamp(20px, 4vh, 28px)",
            minHeight: "clamp(2.5rem, 4rem, 3rem)",
            lineHeight: 1.4,
            textShadow: "0 2px 8px rgba(224, 122, 95, 0.1)",
          }}
        >
          {role}
          <span className="cursor" />
        </div>

        <p
          className="fade-up-4"
          style={{
            maxWidth: "min(520px, 90vw)",
            color: "var(--color-text)",
            fontSize: "clamp(14px, 3.5vw, 16px)",
            lineHeight: "clamp(1.6, 1.7, 1.75)",
            marginBottom: "clamp(32px, 6vh, 44px)",
            opacity: 0.9,
          }}
        >
          Backend-focused full-stack developer specializing in system architecture, security, and AI-augmented engineering — building resilient, production-grade platforms with{" "}
          <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>Next.js</span>,{" "}
          <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>FastAPI</span>,
          and{" "}
          <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>PostgreSQL</span>.
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
            onClick={() => scrollTo("experience")}
            style={{
              padding: "clamp(8px, 2vh, 12px) clamp(16px, 5vw, 28px)",
              fontSize: "clamp(11px, 3vw, 13px)",
            }}
          >
            View Experience
          </button>
          <button
            className="glow-btn"
            style={{
              borderColor: "var(--color-accent-dim)",
              color: "var(--color-accent-dim)",
              padding: "clamp(8px, 2vh, 12px) clamp(16px, 5vw, 28px)",
              fontSize: "clamp(11px, 3vw, 13px)",
            }}
            onClick={() => scrollTo("contact")}
          >
            Get In Touch
          </button>

          <button
            className="glow-btn--gradient"
            onClick={() => {
              const cvUrl = "/Ali_Yazdanpanahfard_CV.pdf";
              const link = document.createElement("a");
              link.href = cvUrl;
              link.download = "Ali_Yazdanpanahfard_CV.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
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

      {/* ── EXPERIENCE ── */}
      <Experience />

      <div className="divider" style={{ margin: "0 max(24px, 10vw)" }} />

      {/* ── PROJECTS ── */}
      <Project />

      <div className="divider" style={{ margin: "0 max(24px, 10vw)" }} />

      {/* ── DOCUMENTS ── */}
      <Documents />

      <div className="divider" style={{ margin: "0 max(24px, 10vw)" }} />

      {/* ── CONTACT ── */}
      <Contact />

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid var(--color-border)",
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
            color: "var(--color-text-dim)",
          }}
        >
          &lt;ali /&gt; · Built with Next.js & TypeScript
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(10px, 3vw, 12px)",
            color: "var(--color-text-dim)",
            textAlign: "right",
          }}
        >
          Designed & developed by Ali Yazdanpanahfard
        </span>
      </footer>
    </div>
  );
}
