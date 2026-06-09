'use client'

import { useEffect, useRef, useState } from "react";
import Project from "./../project/project";

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

const Hero = () => {
   const [menuOpen, setMenuOpen] = useState(false);
     const role = useTypingEffect(ROLES);
     const heroRef = useRef<HTMLElement>(null);
  return (
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
        <span style={{ color: "#64FFDA" }}>PostgreSQL</span>. Based in Bushehr,
        Iran — available for remote work.
      </p>
      <div
        className="fade-up-4"
        style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
      >
        <button className="glow-btn" onClick={() => scrollTo()}>
          View Projects
        </button>
        <button
          className="glow-btn"
          style={{ borderColor: "#8B5CF6", color: "#8B5CF6" }}
          onClick={() => scrollTo()}
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
  );
};

export default Hero;
