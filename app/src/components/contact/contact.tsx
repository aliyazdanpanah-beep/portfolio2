"use client";

import axios from "axios";
import { useState } from "react";

interface IForms {
  name: string;
  email: string;
  project: string;
}

const Contact = () => {
  const [forms, setForms] = useState<IForms>({
    name: "",
    email: "",
    project: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    
    try {
      await axios.post("/api/form", forms);
      setIsSuccess(true);
      setForms({ name: "", email: "", project: "" });
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error sending form:", error);
      alert("Masseg not send please do it later");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForms(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section
      id="contact"
      style={{
        padding: "100px max(24px, 10vw)",
        maxWidth: 680,
      }}
    >
      <p className="section-label" style={{ marginBottom: 12 }}>
        04. Contact
      </p>
      <h2
        className="display-heading"
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "#CCD6F6",
          marginBottom: 16,
        }}
      >
        Let&apos;s work together
      </h2>
      <p
        style={{
          color: "#8892B0",
          fontSize: 15,
          lineHeight: 1.75,
          marginBottom: 44,
        }}
      >
        I&apos;m currently open to remote opportunities. Whether it&apos;s a
        full-time role, a freelance project, or a quick question — reach out.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={forms.name}
            onChange={handleChange}
            className="contact-input"
            type="text"
            placeholder="Your name"
            required
          />
          <input
            name="email"
            value={forms.email}
            onChange={handleChange}
            className="contact-input"
            type="email"
            placeholder="your@email.com"
            required
          />
          <textarea
            name="project"
            value={forms.project}
            onChange={handleChange}
            className="contact-input"
            rows={5}
            placeholder="Tell me about the project..."
            style={{ resize: "vertical" }}
            required
          />
          
          {isSuccess && (
            <p style={{ color: "#64FFDA", fontSize: 14, marginTop: 8 }}>
              ✓ Message sent successfully!
            </p>
          )}
          
          <button
            type="submit"
            className="glow-btn"
            style={{ 
              alignSelf: "flex-start",
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? "not-allowed" : "pointer"
            }}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div
        style={{
          marginTop: 48,
          display: "flex",
          gap: 24,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
        }}
      >
        <a
          href="mailto:ali.yazdanpanahfard@gmail.com"
          style={{ color: "#8892B0", textDecoration: "none" }}
          onMouseOver={(e) =>
            ((e.target as HTMLElement).style.color = "#64FFDA")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLElement).style.color = "#8892B0")
          }
        >
          ✉ Email
        </a>
        <a
          href="https://github.com/aliyazdanpanah-beep"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#8892B0", textDecoration: "none" }}
          onMouseOver={(e) =>
            ((e.target as HTMLElement).style.color = "#64FFDA")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLElement).style.color = "#8892B0")
          }
        >
          ⌥ GitHub
        </a>
        <a
          href="https://linkedin.com/in/ali-yazdanpanah-79787a2a3"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#8892B0", textDecoration: "none" }}
          onMouseOver={(e) =>
            ((e.target as HTMLElement).style.color = "#64FFDA")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLElement).style.color = "#8892B0")
          }
        >
          ⬡ LinkedIn
        </a>
      </div>
    </section>
  );
};

export default Contact;