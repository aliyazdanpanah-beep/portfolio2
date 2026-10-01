const skills = [
  { name: "Next.js", level: 5 },
  { name: "React.js", level: 5 },
  { name: "TypeScript", level: 4 },
  { name: "JavaScript", level: 5 },
  { name: "html", level: 5 },
  { name: "CSS", level: 5 },
  { name: "Tailwind CSS", level: 5 },
  { name: "FastAPI", level: 4 },
  { name: "Python", level: 4 },
  { name: "PostgreSQL", level: 3 },
  { name: "SQLAlchemy", level: 3 },
  { name: "React Query", level: 4 },
  { name: "Jest", level: 4 },
  { name: "Pytest", level: 5 },
  { name: "REST API", level: 5 },
  { name: "Git / GitHub", level: 5 },
  { name: "SSR / SSG / ISR", level: 4 },
  { name: "Docker", level: 4 },
  { name: "Auth & Security", level: 4 },
];

const SkillsSEC = () => {
  return (
    <section id="skills" style={{ padding: "100px max(24px, 10vw)" }}>
      <p className="section-label" style={{ marginBottom: 12 }}>
        03. Skills
      </p>
      <h2
        className="display-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "var(--color-text)",
          marginBottom: 16,
        }}
      >
        What I work with
      </h2>
      <p
        style={{
          color: "var(--color-text-dim)",
          fontSize: 15,
          marginBottom: 48,
          maxWidth: 480,
        }}
      >
        A mix of frontend craft, backend engineering, and the glue that holds
        them together.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {skills.map((skill) => (
          <div key={skill.name} className="skill-pill">
            <span style={{ color: "var(--color-accent)", marginRight: 6 }}>▸</span>
            {skill.name}
          </div>
        ))}
      </div>

      {/* Strength bars */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
          marginTop: 48,
        }}
      >
        {[
          { label: "Frontend (React / Next.js)", pct: 70 },
          { label: "Backend (FastAPI / Python)", pct: 95 },
          { label: "Database (SQL / PostgreSQL)", pct: 80 },
          { label: "Auth & API Security", pct: 90 },
        ].map(({ label, pct }) => (
          <div key={label}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "var(--color-text-dim)",
              }}
            >
              <span>{label}</span>
              <span style={{ color: "var(--color-accent)" }}>{pct}%</span>
            </div>
            <div
              style={{
                height: 4,
                background: "var(--color-border)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-dim))",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSEC;
