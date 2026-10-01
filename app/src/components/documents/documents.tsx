import { FC } from "react";

interface DocumentItem {
  title: string;
  description: string;
  date: string;
  fileUrl: string;
  fileType: "pdf" | "doc" | "jpg" | "png";
}

const documents: DocumentItem[] = [
  {
    title: "Bachelor of Science in Computer Engineering",
    description:
      "Azad Univercity of Bushehr - Bachelor’s degree in Computer Engineering with a focus on software engineering, backend development, algorithms, databases, computer systems, and software architecture, complemented by hands-on programming and software development projects.",
    date: "2024 - Present",
    fileUrl: "/documents/BSc_Computer_Engineering.pdf",
    fileType: "pdf",
  },
];

const DocumentIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "pdf":
      return <span style={{ color: "var(--color-accent)" }}></span>;
    case "doc":
      return <span style={{ color: "var(--color-accent)" }}></span>;
    case "jpg":
    case "png":
      return <span style={{ color: "var(--color-accent)" }}></span>;
    default:
      return <span style={{ color: "var(--color-accent)" }}></span>;
  }
};

const Documents: FC = () => {
  return (
    <section
      id="documents"
      style={{
        padding: "clamp(60px, 10vh, 100px) max(24px, 10vw)",
        background: "var(--color-bg)",
      }}
    >
      <p className="section-label" style={{ marginBottom: 12 }}>
        06. Documents
      </p>

      <h2
        className="display-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "var(--color-text)",
          marginBottom: "clamp(32px, 5vw, 48px)",
        }}
      >
        Credentials & Certifications
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "clamp(16px, 3vw, 20px)",
        }}
      >
        {documents.map((doc) => (
          <div
            key={doc.title}
            className="project-card"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              padding: "clamp(20px, 4vw, 28px)",
              cursor: "default",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Header with icon and date */}
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
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--color-accent)",
                  fontSize: "clamp(10px, 2.5vw, 11px)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                <DocumentIcon type={doc.fileType} />
                Credential
              </div>

              {/* Date pill */}
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(10px, 2.5vw, 12px)",
                  color: "var(--color-accent-dim)",
                  background: "rgba(224, 122, 95, 0.08)",
                  border: "1px solid rgba(224, 122, 95, 0.2)",
                  borderRadius: "999px",
                  padding: "3px 10px",
                }}
              >
                {doc.date}
              </span>
            </div>

            <h3
              className="display-heading"
              style={{
                color: "var(--color-text)",
                fontSize: "clamp(18px, 4vw, 20px)",
                marginBottom: "clamp(10px, 2vh, 12px)",
                lineHeight: 1.3,
              }}
            >
              {doc.title}
            </h3>

            <p
              style={{
                color: "var(--color-text-dim)",
                fontSize: "clamp(13px, 3vw, 14px)",
                lineHeight: "clamp(1.6, 1.7, 1.75)",
                marginBottom: "clamp(16px, 3vh, 20px)",
                flex: 1,
              }}
            >
              {doc.description}
            </p>

            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(11px, 2.5vw, 12px)",
                color: "var(--color-accent)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                borderRadius: "4px",
                background: "rgba(224, 122, 95, 0.08)",
                border: "1px solid var(--color-border)",
                transition: "all 0.2s ease",
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(224, 122, 95, 0.15)";
                e.currentTarget.style.transform = "translateX(2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(224, 122, 95, 0.08)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <span>📎</span>
              View Document ↗
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Documents;
