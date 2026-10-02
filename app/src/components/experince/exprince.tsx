import Link from "next/link";
import "./exprienc.css";

const experiences = [
  {
    id: "javdan",
    date: "2026 - Present",
    position: "Backend Developer",
    company: "JAAVDAN",
    companyUrl: "https://jaavdan.ir/",
    description: [
      "Orchestrated AI coding agents as a scoped execution layer, retaining sole ownership of architecture, diagnosis, test strategy, and output validation across the full development lifecycle.",
      "Served as sole technical lead, architecting and delivering an end-to-end RAG pipeline that transforms unstructured Persian/English documents into a searchable knowledge base — spanning ingestion, OCR, preprocessing, intelligent chunking, and embedding generation.",
      "Designed automated quality-assurance mechanisms, including OCR accuracy evaluation and validation checks, to improve reliability of downstream retrieval and generation.",
      "Architected and delivered a fault-tolerant, production-grade price enrichment engine — spanning resilient multi-source ingestion, fallback strategies, data validation, stale-value protection, and scheduled processing — powering reliable, normalized market and commodity pricing across the Iranoban platform.",
      "Architected and delivered a security-critical, multi-tenant organizational calendar platform — enforcing strict data isolation, role-based access control, scoped rate limiting, persistent IP blocking, and comprehensive security validation — ensuring secure separation of data and operations across organizations at scale."
    ],
  },{
    id: "Freelancing Programmer",
    date: "2025 - Present",
    position: "Full-stack Developer",
    company: "Freelancer",
    companyUrl: "#",
    description: [
      "Delivered responsive websites for 10+ small businesses with FastAPI, PostgerSQL, Next.js",
      "redesigned 13+ pages of a freelance marketplace platform with its productmanager, working directly with clients from requirements gathering to delivery."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title">
      <p className="section-label" style={{ marginBottom: 12 }}>
        04. Experience
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
