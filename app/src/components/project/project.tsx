import { FC } from "react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  accent: string;
  demoUrl: string;
}

const projects: Project[] = [
  {
    title: "Café Menu Platform",
    description:
      "Full-stack café menu app with Next.js frontend (SEO-optimized, SSR) and a FastAPI backend. Features token-based auth, protected routes, and relational DB managed via SQLAlchemy and SQLite.",
    tags: ["Next.js", "FastAPI", "SQLAlchemy", "Authentication", "SEO"],
    accent: "#64FFDA",
    demoUrl: "https://github.com/aliyazdanpanah-beep/coffeeCode",
  },
  {
    title: "Freelance Marketplace Redesign",
    description:
      "Redesigned 13+ pages of a freelance marketplace platform. Worked closely with the product manager to improve UI consistency, user flow, and overall engagement.",
    tags: ["Next.js", "TypeScript", "Bootstrap", "UI/UX"],
    accent: "#8B5CF6",
    demoUrl: "https://lancerify.com/",
  },
  {
    title: "Full-Stack Auth System",
    description:
      "Secure login/registration system with client-side session management, protected routes, and a Python backend. Built with React Query for server-state sync.",
    tags: ["Next.js", "TypeScript", "FastAPI", "React Query", "Context API"],
    accent: "#F59E0B",
    demoUrl: "https://github.com/aliyazdanpanah-beep/Blog",
  },
  {
    title: "E-Commerce UI Prototype",
    description:
      "Responsive shop interface featuring product filtering, cart simulation, and clean component architecture using React Router and CSS Modules.",
    tags: ["React", "React Router", "CSS Modules", "Responsive Design"],
    accent: "#EC4899",
    demoUrl: "https://coruscating-gingersnap-18c856.netlify.app/store",
  },
];

const Project: FC = () => {
  return (
    <section
      id="projects"
      style={{
        padding: "clamp(60px, 10vh, 100px) max(16px, 10vw)",
      }}
    >
      <p
        className="section-label"
        style={{ marginBottom: "clamp(10px, 2vh, 12px)" }}
      >
        03. Projects
      </p>
      <h2
        className="display-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "#CCD6F6",
          marginBottom: "clamp(12px, 2vh, 16px)",
        }}
      >
        Things I&apos;ve built
      </h2>
      <p
        style={{
          color: "#8892B0",
          fontSize: "clamp(13px, 3.5vw, 15px)",
          marginBottom: "clamp(32px, 6vh, 48px)",
          maxWidth: "min(480px, 90vw)",
          lineHeight: 1.6,
        }}
      >
        A selection of projects that show how I think about architecture, UX,
        and engineering trade-offs.
      </p>

      <div
        className="projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(16px, 3vw, 20px)",
        }}
      >
        {projects.map((p) => (
          <div
            key={p.title}
            className="project-card"
            style={{
              background: "#0D1526",
              border: "1px solid #1E2A45",
              padding: "clamp(20px, 4vw, 28px)",
              transition: "border-color 0.3s ease, transform 0.3s ease",
              cursor: "default",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = p.accent;
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1E2A45";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Header with icon and demo link */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "clamp(10px, 2vh, 12px)",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: p.accent,
                  fontSize: "clamp(10px, 2.5vw, 11px)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                ⬡ Project
              </div>

              {/* Demo Link - Styled like the project */}
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(10px, 2.5vw, 11px)",
                  color: p.accent,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  background: "rgba(100,255,218,0)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `rgba(${
                    p.accent === "#64FFDA"
                      ? "100,255,218"
                      : p.accent === "#8B5CF6"
                      ? "139,92,246"
                      : p.accent === "#F59E0B"
                      ? "245,158,11"
                      : "236,72,153"
                  }, 0.1)`;
                  e.currentTarget.style.transform = "translateX(2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(100,255,218,0)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span>🔗</span>
                Demo ↗
              </a>
            </div>

            <h3
              className="display-heading"
              style={{
                color: "#CCD6F6",
                fontSize: "clamp(18px, 4vw, 20px)",
                marginBottom: "clamp(10px, 2vh, 12px)",
                lineHeight: 1.3,
              }}
            >
              {p.title}
            </h3>

            <p
              style={{
                color: "#8892B0",
                fontSize: "clamp(13px, 3vw, 14px)",
                lineHeight: "clamp(1.6, 1.7, 1.75)",
                marginBottom: "clamp(16px, 3vh, 20px)",
                flex: 1,
              }}
            >
              {p.description}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(6px, 2vw, 8px)",
                marginTop: "auto",
              }}
            >
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "clamp(10px, 2.5vw, 11px)",
                    color: p.accent,
                    opacity: 0.8,
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.8";
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
