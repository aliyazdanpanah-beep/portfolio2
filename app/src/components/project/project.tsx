const projects = [
  {
    title: "Café Menu Platform",
    description:
      "Full-stack café menu app with Next.js frontend (SEO-optimized, SSR) and a FastAPI backend. Features token-based auth, protected routes, and relational DB managed via SQLAlchemy and SQLite.",
    tags: ["Next.js", "FastAPI", "SQLAlchemy", "Authentication", "SEO"],
    accent: "#64FFDA",
  },
  {
    title: "Freelance Marketplace Redesign",
    description:
      "Redesigned 13+ pages of a freelance marketplace platform. Worked closely with the product manager to improve UI consistency, user flow, and overall engagement.",
    tags: ["Next.js", "TypeScript", "Bootstrap", "UI/UX"],
    accent: "#8B5CF6",
  },
  {
    title: "Full-Stack Auth System",
    description:
      "Secure login/registration system with client-side session management, protected routes, and a Python backend. Built with React Query for server-state sync.",
    tags: ["Next.js", "TypeScript", "FastAPI", "React Query", "Context API"],
    accent: "#F59E0B",
  },
  {
    title: "E-Commerce UI Prototype",
    description:
      "Responsive shop interface featuring product filtering, cart simulation, and clean component architecture using React Router and CSS Modules.",
    tags: ["React", "React Router", "CSS Modules", "Responsive Design"],
    accent: "#EC4899",
  },
];

const Project = () => {
  return (
    <section id="projects" style={{ padding: "100px max(24px, 10vw)" }}>
      <p className="section-label" style={{ marginBottom: 12 }}>
        03. Projects
      </p>
      <h2
        className="display-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "#CCD6F6",
          marginBottom: 16,
        }}
      >
        Things I&apos;ve built
      </h2>
      <p
        style={{
          color: "#8892B0",
          fontSize: 15,
          marginBottom: 48,
          maxWidth: 480,
        }}
      >
        A selection of projects that show how I think about architecture, UX,
        and engineering trade-offs.
      </p>

      <div
        className="projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 20,
        }}
      >
        {projects.map((p) => (
          <div key={p.title} className="project-card">
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: p.accent,
                fontSize: 11,
                letterSpacing: "0.15em",
                marginBottom: 12,
                textTransform: "uppercase",
              }}
            >
              ⬡ Project
            </div>
            <h3
              className="display-heading"
              style={{ color: "#CCD6F6", fontSize: 20, marginBottom: 12 }}
            >
              {p.title}
            </h3>
            <p
              style={{
                color: "#8892B0",
                fontSize: 14,
                lineHeight: 1.75,
                marginBottom: 20,
              }}
            >
              {p.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: p.accent,
                    opacity: 0.8,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
