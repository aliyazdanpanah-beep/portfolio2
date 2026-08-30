import Link from "next/link";
import './exprienc.css'

const experiences = [
  {
    id: "javdan",
    date: "2026 - Present",
    position: "Backend Developer Intern",
    company: "JAVDAN",
    companyUrl: "#",
    description: [
      "Developing backend services using Python and FastAPI.",
      "Designing modular backend architectures with a focus on scalability and maintainability.",
      "Working with PostgreSQL, SQLAlchemy, REST APIs, and automated testing.",
      "Developing data processing and pricing engine systems.",
      "Working with Git, GitHub, Pull Requests, and collaborative code reviews.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">Experience</h2>

      <ol>
        {experiences.map((experience, index) => (
          <li key={experience.id}>
            {index !== experiences.length - 1 && <span />}

            <time>{experience.date}</time>

            <h3>
              {experience.position} at{" "}
              {experience.companyUrl ? (
                <Link href={experience.companyUrl} target="_blank" rel="noopener noreferrer">
                  {experience.company}
                </Link>
              ) : (
                <span>{experience.company}</span>
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