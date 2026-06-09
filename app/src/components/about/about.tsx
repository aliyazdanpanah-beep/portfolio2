const About = () => {
  return (
    <section id="about" style={{ padding: "100px max(24px, 10vw)" }}>
      <p className="section-label" style={{ marginBottom: 12 }}>
        01. About Me
      </p>
      <h2
        className="display-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "#CCD6F6",
          marginBottom: 48,
        }}
      >
        The full picture
      </h2>

      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "start",
        }}
      >
        <div>
          <p
            style={{
              color: "#8892B0",
              lineHeight: 1.85,
              marginBottom: 20,
              fontSize: 15,
            }}
          >
            I&apos;m a full-stack developer who genuinely enjoys understanding{" "}
            <em style={{ color: "#CCD6F6" }}>how systems work</em> — not just
            building features, but tracing through the architecture behind them.
            My sweet spot is the intersection of polished frontends and solid
            backend design.
          </p>
          <p
            style={{
              color: "#8892B0",
              lineHeight: 1.85,
              marginBottom: 20,
              fontSize: 15,
            }}
          >
            I work with{" "}
            <span style={{ color: "#64FFDA" }}>
              Next.js, TypeScript, and Tailwind
            </span>{" "}
            on the frontend and{" "}
            <span style={{ color: "#64FFDA" }}>
              FastAPI, SQLAlchemy, and PostgreSQL
            </span>{" "}
            on the backend. I care deeply about auth security, rendering
            strategies (SSR/SSG/ISR), and state management.
          </p>
          <p style={{ color: "#8892B0", lineHeight: 1.85, fontSize: 15 }}>
            When I&apos;m not building, I&apos;m debugging — and I consider that
            a feature, not a bug.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
          }}
        >
          {[
            ["Email", "ali.yazdanpanahfard@gmail.com"],
            ["Location", "Bushehr, Iran (Remote)"],
            ["Education", "B.Sc. Computer Engineering"],
            ["GitHub", "aliyazdanpanah-beep"],
            ["Availability", "Open to remote roles"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: 16,
                padding: "12px 16px",
                background: "#0D1526",
                border: "1px solid #1E2A45",
              }}
            >
              <span style={{ color: "#64FFDA", minWidth: 90 }}>{label}</span>
              <span style={{ color: "#8892B0" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
