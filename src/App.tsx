import { FormEvent, useMemo, useState } from "react";
import portfolio from "./data/portfolio.json";
import type { Skill } from "./types";

const config = portfolio as { personal: { fullName: string; title: string; tagline?: string; about: string; location: string; email: string }; socialLinks: { platform: string; url: string; icon: string }[]; skills: Skill[]; projects: { name: string; description: string; technologies: string[]; repoUrl?: string; liveUrl?: string }[]; contact: { formEndpoint: string; successMessage: string } };

function groupSkills(skills: Skill[]) {
  return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
}

export default function App() {
  const [status, setStatus] = useState<string>("");
  const groupedSkills = useMemo(() => groupSkills(config.skills), []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? "")
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("Please complete all form fields.");
      return;
    }

    if (!config.contact.formEndpoint) {
      setStatus("Set contact.formEndpoint in src/data/portfolio.json to enable backend submission.");
      return;
    }

    try {
      const response = await fetch(config.contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      setStatus(config.contact.successMessage);
    } catch {
      setStatus("Unable to submit right now. Please try again.");
    }
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">{config.personal.fullName}</div>
        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">{config.personal.title}</p>
          <h1>{config.personal.tagline}</h1>
          <p className="lead">{config.personal.about}</p>
          <div className="social-grid" aria-label="Social links">
            {config.socialLinks.map((item) => (
              <a key={item.platform} href={item.url} target="_blank" rel="noreferrer" className="social-pill">
                <span>{item.icon}</span>
                {item.platform}
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <h2>Profile</h2>
          <p>
            {config.personal.fullName} is based in {config.personal.location}. Reach directly at{" "}
            <a href={`mailto:${config.personal.email}`}>{config.personal.email}</a>.
          </p>
        </section>

        <section id="skills" className="section">
          <h2>Skills</h2>
          <div className="skill-groups">
            {Object.entries(groupedSkills).map(([category, list]) => (
              <article key={category} className="card">
                <h3>{category}</h3>
                {list.map((skill) => (
                  <div key={skill.name} className="skill-row">
                    <div className="skill-head">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="meter">
                      <div className="meter-fill" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h2>Projects</h2>
          <div className="project-grid">
            {config.projects.map((project) => (
              <article key={project.name} className="card project-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tech-list">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="actions">
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  ) : null}
                  {project.repoUrl ? (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      Code
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2>Contact Us</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@example.com" />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} placeholder="What are you building?" />
            </label>
            <button type="submit">Send Message</button>
            {status ? <p className="form-status">{status}</p> : null}
          </form>
        </section>
      </main>
    </div>
  );
}
