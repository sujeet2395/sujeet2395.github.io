import { FormEvent, useEffect, useState } from "react";
import portfolio from "./data/portfolio-v2.json";
import type { ArchitectureNode, PortfolioConfig, Project, SkillCategory } from "./types";

const config = portfolio as PortfolioConfig;
const navItems = ["About", "Skills", "Experience", "Projects", "Architecture", "Contact"];

const principles = [
  ["Scalability", "Design services that can evolve independently."],
  ["Performance", "Optimize queries, caching and API response times."],
  ["Security", "Use authentication, authorization and secure service communication."],
  ["Maintainability", "Prefer clear boundaries, reusable components and clean architecture."],
  ["Reliability", "Design for graceful failure, observability and predictable behavior."]
];

const services = [
  ["Backend Engineering", "Spring Boot microservices, REST APIs and distributed services."],
  ["Frontend Engineering", "Responsive Angular/React applications and reusable UI components."],
  ["Cloud & DevOps", "AWS, Docker, Nginx, deployments and infrastructure."],
  ["System Design", "Database architecture, service boundaries, caching and scalability."]
];

function Tags({ items }: { items: string[] }) {
  return <div className="tags">{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

export default function PortfolioApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeArchitecture, setActiveArchitecture] = useState<ArchitectureNode>(config.architecture?.[0] as ArchitectureNode);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!config.contact.formEndpoint) {
      setStatus(`Email ${config.personal.email} to start the conversation.`);
      return;
    }
    setStatus(config.contact.successMessage);
    form.reset();
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Sujit Kumar home"><span>SK</span> Sujit Kumar</a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="sr-only">Toggle navigation</span><i /><i /><i />
        </button>
        <nav id="site-nav" className={menuOpen ? "open" : ""} aria-label="Primary navigation">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let's Connect <b>↗</b></a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span /> Available for thoughtful engineering work</p>
            <p className="role">{config.personal.title}</p>
            <h1>Build systems that <em>last.</em></h1>
            <p className="hero-statement">{config.personal.statement}</p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">View My Work <b>↘</b></a>
              <a className="button secondary" href="#contact">Let's Connect <b>↗</b></a>
            </div>
            <div className="hero-stack" aria-label="Primary technologies"><span>Java</span><span>Spring Boot</span><span>Microservices</span><span>React</span><span>AWS</span><span>Kafka</span></div>
          </div>
          <div className="system-canvas reveal" aria-label="System architecture overview">
            <div className="canvas-label">Production system / 01</div>
            <div className="system-flow"><div className="flow-node web">WEB APP <small>Angular / React</small></div><i>→</i><div className="flow-node api">API GATEWAY <small>routing + policy</small></div><i>→</i><div className="flow-node services">SERVICES <small>Spring Boot</small></div></div>
            <div className="service-grid"><div><span className="node-dot" /> identity <small>JWT / security</small></div><div><span className="node-dot" /> projects <small>business logic</small></div><div><span className="node-dot" /> workforce <small>workflows</small></div></div>
            <div className="data-rail"><span>PostgreSQL</span><span>Redis</span><span>Kafka</span><span>AWS</span></div>
            <div className="canvas-code"><span>01</span><code>service.boundary = explicit</code><span>02</span><code>deployment.mode = production</code></div>
          </div>
        </section>

        <section id="about" className="section-wrap split-section reveal">
          <div><p className="section-kicker">01 / Engineering profile</p><h2>Engineering with a <em>product mindset.</em></h2></div>
          <div className="about-copy"><p>{config.personal.about}</p><p>I bring backend architecture, frontend delivery, data design, cloud infrastructure and performance work together into complete engineering systems, not isolated features.</p></div>
          <div className="metric-row" aria-label="Professional focus"><span>Enterprise applications</span><span>Microservices</span><span>Cloud deployments</span><span>End-to-end ownership</span></div>
        </section>

        <section id="skills" className="section-wrap reveal">
          <div className="section-heading"><div><p className="section-kicker">02 / Technology stack</p><h2>Tools chosen for <em>real systems.</em></h2></div><p>Hover or focus a discipline to see where it fits in the work.</p></div>
          <div className="skill-grid">{(config.skills as SkillCategory[]).map((skill, index) => <article className="skill-card" key={skill.name} tabIndex={0}><span className="card-number">0{index + 1}</span><h3>{skill.name}</h3><p>{skill.description}</p><Tags items={skill.technologies} /></article>)}</div>
        </section>

        <section id="experience" className="section-wrap reveal">
          <div className="section-heading"><div><p className="section-kicker">03 / Experience</p><h2>Building where complexity <em>meets delivery.</em></h2></div></div>
          <div className="timeline">{config.experience?.map((role) => <article className="timeline-item" key={role.company}><div className="timeline-date">{role.period}{role.current && <span>Current</span>}</div><div className="timeline-content"><p className="company">{role.company}</p><h3>{role.role}</h3><p>{role.summary}</p><ul>{role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><Tags items={role.technologies} /></div></article>)}</div>
        </section>

        <section id="projects" className="section-wrap reveal">
          <div className="section-heading"><div><p className="section-kicker">04 / Selected work</p><h2>Software that moves <em>work forward.</em></h2></div><p>Case studies focus on the problem, the system and the engineering decisions behind it.</p></div>
          <div className="project-grid">{config.projects.map((project, index) => <article className={`project-card project-${index + 1}`} key={project.name}><div><p className="project-eyebrow">{project.eyebrow}</p><h3>{project.name}</h3><p>{project.description}</p></div><Tags items={project.technologies.slice(0, 5)} /><button type="button" className="text-button" onClick={() => setActiveProject(project)}>View case study <b>↗</b></button></article>)}</div>
        </section>

        <section id="architecture" className="section-wrap architecture-section reveal">
          <div className="section-heading"><div><p className="section-kicker">05 / System design</p><h2>How I build <em>systems.</em></h2></div><p>Explore each layer of a production-minded application architecture.</p></div>
          <div className="architecture-layout"><div className="architecture-map">{config.architecture?.map((node, index) => <button type="button" key={node.name} onClick={() => setActiveArchitecture(node)} onFocus={() => setActiveArchitecture(node)} className={`architecture-node ${node.tone} ${activeArchitecture?.name === node.name ? "selected" : ""}`}><span>0{index + 1}</span><strong>{node.name}</strong><small>{node.label}</small></button>)}</div><aside className="architecture-detail" aria-live="polite"><p className="section-kicker">Selected layer</p><h3>{activeArchitecture?.name}</h3><p>{activeArchitecture?.description}</p><span>{activeArchitecture?.label}</span></aside></div>
        </section>

        <section className="section-wrap reveal"><div className="section-heading"><div><p className="section-kicker">06 / Engineering principles</p><h2>Good systems are <em>deliberate.</em></h2></div></div><div className="principle-grid">{principles.map(([name, description], index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{description}</p></article>)}</div></section>

        <section className="section-wrap services-section reveal"><div className="section-heading"><div><p className="section-kicker">07 / What I do</p><h2>From first endpoint to <em>production.</em></h2></div></div><div className="service-grid">{services.map(([name, description]) => <article key={name}><span>↗</span><h3>{name}</h3><p>{description}</p></article>)}</div></section>

        <section className="section-wrap education-section reveal"><p className="section-kicker">08 / Education</p><div><h2>B.Tech - Computer Science Engineering</h2><p>Guru Gobind Singh Indraprastha University, Delhi</p></div></section>

        <section id="contact" className="contact-section reveal"><div><p className="section-kicker">09 / Contact</p><h2>Have a problem worth <em>solving?</em></h2><p>Let's discuss your product, architecture, or engineering challenge.</p><div className="contact-links">{config.socialLinks.map((link) => <a key={link.platform} href={link.url} target="_blank" rel="noreferrer">{link.platform} <b>↗</b></a>)}</div></div><form onSubmit={submitForm}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@company.com" /></label><label>Message<textarea name="message" required rows={4} placeholder="Tell me a little about the challenge." /></label><button className="button primary" type="submit">Send Message <b>↗</b></button>{status && <p className="form-status" role="status">{status}</p>}</form></section>
      </main>

      <footer><a className="wordmark" href="#home"><span>SK</span> Sujit Kumar</a><p>Senior Full Stack Engineer</p><p>Java <i>•</i> Spring Boot <i>•</i> Angular <i>•</i> React <i>•</i> AWS</p><small>© 2026 Sujit Kumar</small></footer>

      {activeProject && <div className="modal-backdrop" role="presentation" onMouseDown={() => setActiveProject(null)}><article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="close-button" type="button" onClick={() => setActiveProject(null)} aria-label="Close case study">×</button><p className="section-kicker">{activeProject.eyebrow}</p><h2 id="modal-title">{activeProject.name}</h2><div className="case-grid"><div><h3>Problem</h3><p>{activeProject.problem}</p></div><div><h3>Solution</h3><p>{activeProject.solution}</p></div></div><h3>Architecture highlights</h3><Tags items={activeProject.architecture ?? []} /><h3>Technology</h3><Tags items={activeProject.technologies} />{activeProject.liveUrl && <a className="button secondary case-study-link" href={activeProject.liveUrl} target="_blank" rel="noreferrer">View live project <b>↗</b></a>}</article></div>}
      <a className="back-to-top" href="#home" aria-label="Back to top">↑</a>
    </div>
  );
}
