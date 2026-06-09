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
        02. Skills
      </p>
      <h2
        className="display-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "#CCD6F6",
          marginBottom: 16,
        }}
      >
        What I work with
      </h2>
      <p
        style={{
          color: "#8892B0",
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
            <span style={{ color: "#64FFDA", marginRight: 6 }}>▸</span>
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
          { label: "Frontend (React / Next.js)", pct: 92 },
          { label: "Backend (FastAPI / Python)", pct: 78 },
          { label: "Database (SQL / PostgreSQL)", pct: 70 },
          { label: "Auth & API Security", pct: 82 },
        ].map(({ label, pct }) => (
          <div key={label}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#8892B0",
              }}
            >
              <span>{label}</span>
              <span style={{ color: "#64FFDA" }}>{pct}%</span>
            </div>
            <div
              style={{
                height: 4,
                background: "#1E2A45",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #64FFDA, #8B5CF6)",
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
