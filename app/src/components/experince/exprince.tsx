import Link from "next/link";
import "./exprienc.css";

const experiences = [
  {
    id: "javdan",
    date: "2026 - Present",
    position: "Backend Developer",
    company: "JAAVDAN",
    companyUrl: "#",
    description: [
      "Technical Lead in RAG System: Led the technical design and development of an end-to-end RAG pipeline for transforming complex and unstructured documents into reliable, searchable knowledge. The system includes document ingestion, PDF processing, Persian/English OCR, preprocessing, validation, intelligent chunking, and embedding generation, with automated quality checks and OCR accuracy evaluation to improve the reliability of downstream retrieval and generation.",
      "Pricing Engine: A modular price aggregation and synchronization engine designed to collect, normalize, validate, and serve real-time market prices from multiple external sources. It supports different data sources and update frequencies, with a clean architecture, automated testing, fault-tolerant synchronization, and Docker-based deployment for reliable integration with downstream services.",
      "Working with Python, FastAPI, Javascript, Typescript, Docker, Pytest PostgreSQL, SQLAlchemy, REST APIs, and automated testing.",
      "Back-end development of Javadan website and cooperation in the deployment of websites",
      "Working with Git, GitHub, Pull Requests, and collaborative code reviews.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title">
      <p className="section-label" style={{ marginBottom: 12 }}>
        03. Experience
      </p>
      <h2 id="experience-title" className="display-heading">
        Where I&apos;ve worked
      </h2>

      <ol className="experience-timeline">
        {experiences.map((experience) => (
          <li key={experience.id} className="experience-item">
            <span className="experience-dot" aria-hidden="true" />

            <span className="experience-date">{experience.date}</span>

            <h3>
              {experience.position} at{" "}
              {experience.companyUrl ? (
                <Link
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {experience.company},
                </Link>
              ) : (
                <span>{experience.company},</span>
              )}
            </h3>

            <ul>
              {experience.description.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
