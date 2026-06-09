import { FC } from "react";

interface InfoItem {
  label: string;
  value: string;
}

const About: FC = () => {
  const infoItems: InfoItem[] = [
    { label: "Email", value: "ali.yazdanpanahfard@gmail.com" },
    { label: "Location", value: "Bushehr, Iran (Remote)" },
    { label: "Education", value: "B.Sc. Computer Engineering" },
    { label: "GitHub", value: "aliyazdanpanah-beep" },
    { label: "Availability", value: "Open to remote roles" },
  ];

  return (
    <section
      id="about"
      style={{
        padding: "clamp(60px, 10vh, 100px) max(24px, 10vw)",
      }}
    >
      <p className="section-label" style={{ marginBottom: 12 }}>
        01. About Me
      </p>
      <h2
        className="display-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "#CCD6F6",
          marginBottom: "clamp(32px, 5vw, 48px)",
        }}
      >
        The full picture
      </h2>

      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "clamp(40px, 5vw, 60px)",
          alignItems: "start",
        }}
      >
        {/* Text Content */}
        <div>
          <p
            style={{
              color: "#8892B0",
              lineHeight: 1.85,
              marginBottom: 20,
              fontSize: "clamp(14px, 3.5vw, 15px)",
            }}
          >
            I&apos;m a full-stack developer who genuinely enjoys understanding{" "}
            <em style={{ color: "#CCD6F6", fontStyle: "italic" }}>
              how systems work
            </em>{" "}
            — not just building features, but tracing through the architecture
            behind them. My sweet spot is the intersection of polished
            frontends and solid backend design.
          </p>
          <p
            style={{
              color: "#8892B0",
              lineHeight: 1.85,
              marginBottom: 20,
              fontSize: "clamp(14px, 3.5vw, 15px)",
            }}
          >
            I work with{" "}
            <span style={{ color: "#64FFDA", fontWeight: 500 }}>
              Next.js, TypeScript, and Tailwind
            </span>{" "}
            on the frontend and{" "}
            <span style={{ color: "#64FFDA", fontWeight: 500 }}>
              FastAPI, SQLAlchemy, and PostgreSQL
            </span>{" "}
            on the backend. I care deeply about auth security, rendering
            strategies (SSR/SSG/ISR), and state management.
          </p>
          <p
            style={{
              color: "#8892B0",
              lineHeight: 1.85,
              fontSize: "clamp(14px, 3.5vw, 15px)",
            }}
          >
            When I&apos;m not building, I&apos;m debugging — and I consider that
            a feature, not a bug.
          </p>
        </div>

        {/* Info Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(12px, 2vw, 16px)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(11px, 3vw, 13px)",
          }}
        >
          {infoItems.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 16,
                padding: "clamp(10px, 2vw, 12px) clamp(12px, 3vw, 16px)",
                background: "#0D1526",
                border: "1px solid #1E2A45",
                borderRadius: "4px",
                transition: "border-color 0.2s ease, transform 0.2s ease",
                flexWrap: "wrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#64FFDA";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1E2A45";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <span
                style={{
                  color: "#64FFDA",
                  minWidth: "clamp(80px, 15vw, 90px)",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  color: "#8892B0",
                  wordBreak: "break-word",
                  flex: 1,
                }}
              >
                {item.label === "GitHub" ? (
                  <a
                    href={`https://github.com/${item.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#8892B0",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#64FFDA";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#8892B0";
                    }}
                  >
                    {item.value} ↗
                  </a>
                ) : item.label === "Email" ? (
                  <a
                    href={`mailto:${item.value}`}
                    style={{
                      color: "#8892B0",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#64FFDA";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#8892B0";
                    }}
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative element - optional */}
      <div
        style={{
          marginTop: "clamp(40px, 8vh, 60px)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "clamp(40px, 10vw, 60px)",
            height: "2px",
            background: "linear-gradient(90deg, #64FFDA, transparent)",
          }}
        />
      </div>
    </section>
  );
};

export default About;