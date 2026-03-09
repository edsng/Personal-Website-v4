import { useState, useEffect, useRef, type RefObject } from "react";
import "./portfolio.css";

const logo = "/favi.svg";

// ─── Types ───
interface LinkMap {
  github: string;
  linkedin: string;
  x: string;
  instagram: string;
  email: string;
  resume: string;
  newsAlpha: string;
  mlAnalysis: string;
  stargazer: string;
  gpuPipeline: string;
}

interface Experience {
  role: string;
  company: string;
  year: string;
  location: string;
  description: string | null;
}

interface Project {
  title: string;
  description: string;
  url: string;
  tags: string[];
  featured: boolean;
}

// ─── Data ───
const LINKS: LinkMap = {
  github: "https://github.com/edsng",
  linkedin: "https://linkedin.com/in/edwsng",
  x: "https://x.com/rxdlne",
  instagram: "https://www.instagram.com/rxdlne/",
  email: "mailto:ed.sng892@gmail.com",
  resume:
    "https://docs.google.com/document/d/1IXSPeeWzdQOGPxRNA1LVZF2PR7a-5xvlymQfJBaZaFc/edit?tab=t.0",
  newsAlpha: "https://github.com/edsng/NewsAlpha",
  mlAnalysis:
    "https://github.com/edsng/Bitcoin-Price-Forecasting-using-Machine-Learning-Models",
  stargazer: "https://github.com/edsng/StarGazerAI",
  gpuPipeline: "https://github.com/edsng/Simplified-GPU-Pipeline",
};

const experiences: Experience[] = [
  {
    role: "Revenue Recovery Supervisor",
    company: "United Parcel Service (UPS)",
    year: "2025",
    location: "Ontario, CA",
    description:
      "Lead nightly revenue recovery operations for a 22-person team, coordinating cross-functional teams and automating KPI reporting with Excel VBA. Supported $130K–$180K in average weekly recovered revenue.",
  },
  {
    role: "Full-Stack Front End Engineer",
    company: "Driver's Club",
    year: "2024",
    location: "Los Angeles, CA",
    description:
      "Designed and developed high-fidelity mockups and interactive prototypes using React and Tailwind CSS. Produced over 20 UI/UX designs in Figma and Adobe XD.",
  },
  {
    role: "Front-End Engineering Intern",
    company: "Rapid Networks",
    year: "2024",
    location: "Los Angeles, CA",
    description:
      "Improved UI/UX with responsive layouts in React, leading to a 10% increase in customer inquiries. Optimized page load times by 25% through code splitting and lazy loading.",
  },
  {
    role: "Technical Support Engineer",
    company: "Network Expert Group",
    year: "2020",
    location: "Los Angeles, CA",
    description: null,
  },
];

const projects: Project[] = [
  {
    title: "NewsAlpha",
    description:
      "Senior design project — distributed sentiment analysis of 233K+ financial news articles with Apache Spark to predict S&P 500 sector ETF market direction. Achieved 51.7% same-day prediction accuracy across 12 sectors.",
    url: LINKS.newsAlpha,
    tags: ["PySpark", "NLP", "Python", "SQLite"],
    featured: true,
  },
  {
    title: "Simplified GPU Pipeline",
    description:
      "A simplified graphics pipeline implemented from scratch, handling vertex transformation, rasterization, and fragment shading on the GPU.",
    url: LINKS.gpuPipeline,
    tags: ["C++", "OpenGL", "Graphics"],
    featured: false,
  },
  {
    title: "Time-Series Price Forecasting",
    description:
      "LSTM and k-NN regression models forecasting Bitcoin closing prices over 2 years. Achieved 0.0503 MSE after iterative feature engineering with technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands).",
    url: LINKS.mlAnalysis,
    tags: ["Python", "TensorFlow", "Scikit-Learn"],
    featured: false,
  },
  {
    title: "StarGazerAI",
    description:
      "CutieHack 2024 hackathon project — full-stack AI web app using MERN stack that integrates Flickr API for night sky images and a CNN model for constellation identification. 38% accuracy improvement through data augmentation.",
    url: LINKS.stargazer,
    tags: ["React", "Node.js", "TensorFlow", "MongoDB"],
    featured: false,
  },
];

const languages: string[] = ["C++", "Python", "JavaScript", "Java", "Go"];
const techStack: string[] = [
  "React",
  "Node.js",
  "TensorFlow",
  "Tailwind CSS",
  "PostgreSQL",
  "Git",
  "Figma",
];

// ─── Hooks ───
function useReveal(threshold = 0.15): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ─── Components ───

interface ArrowProps {
  size?: number;
}

const Arrow: React.FC<ArrowProps> = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 13L13 3M13 3H5M13 3v8" />
  </svg>
);

// ─── Nav ───

interface NavProps {
  activeSection: string;
}

const Nav: React.FC<NavProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string): void => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["about", "projects", "experience", "contact"] as const;

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav_inner">
        <button className="nav_logo" onClick={() => scrollTo("hero")}>
          <img src={logo} alt="Edward Song" className="nav_logo-img" />
        </button>

        <div className="nav_links">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`nav_link ${activeSection === item ? "nav_link--active" : ""}`}
            >
              {item}
              {activeSection === item && <span className="nav_link-indicator" />}
            </button>
          ))}
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="nav_resume"
          >
            résumé
          </a>
        </div>

        <button
          className="nav_hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div
            className={`nav_hamburger-line ${
              mobileOpen ? "nav_hamburger-line--top-open" : "nav_hamburger-line--top"
            }`}
          />
          {!mobileOpen && <div className="nav_hamburger-line" />}
          <div
            className={`nav_hamburger-line ${
              mobileOpen ? "nav_hamburger-line--bottom-open" : "nav_hamburger-line--bottom"
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="nav_mobile-menu">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="nav_mobile-link"
            >
              {item}
            </button>
          ))}
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="nav_mobile-resume"
          >
            résumé
          </a>
        </div>
      )}
    </nav>
  );
};

// ─── Hero ───

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const v = loaded ? "hero-reveal--visible" : "";

  const socials = [
    { label: "GitHub", url: LINKS.github },
    { label: "LinkedIn", url: LINKS.linkedin },
    { label: "X", url: LINKS.x },
    { label: "Email", url: LINKS.email },
  ];

  return (
    <section id="hero" className="hero">
      <div className="hero_glow" />
      <div className="hero_content">
        <div className={`hero-reveal hero-reveal--1 ${v}`}>
          <div className="hero_monogram-wrapper">
            <img src={logo} alt="Edward Song" className="hero_logo" />
          </div>
        </div>

        <p className={`hero_subtitle hero-reveal hero-reveal--2 ${v}`}>
          Full Stack Software Engineer
        </p>

        <h1 className={`hero_title hero-reveal hero-reveal--3 ${v}`}>
          Hi, I'm <span className="hero_title-name">Edward</span>
        </h1>

        <p className={`hero_description hero-reveal hero-reveal--4 ${v}`}>
          Korean American developer based in Los Angeles.
          <br />
          Computer Science @ UC Riverside.
        </p>

        <div className={`hero_socials hero-reveal hero-reveal--5 ${v}`}>
          {socials.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              {label}
              <Arrow size={10} />
            </a>
          ))}
        </div>

        <div
          className={`hero_scroll-indicator ${loaded ? "hero_scroll-indicator--visible" : ""}`}
        >
          <div className="hero_scroll-line" />
        </div>
      </div>
    </section>
  );
};

// ─── About ───

const About: React.FC = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "reveal--visible" : "";

  const infoItems = [
    { label: "Name", value: "Edward Song" },
    { label: "Education", value: "B.S. Computer Science" },
    { label: "University", value: "UC Riverside" },
    { label: "Location", value: "Los Angeles, CA" },
  ];

  return (
    <section id="about" ref={ref as RefObject<HTMLElement>} className="about">
      <div className="about_grid">
        <div className={`reveal ${cls}`}>
          <p className="about_label">About</p>
          <h2 className="about_quote">
            The people who are crazy enough to think they can change the world
            are the ones who do.
          </h2>
          <p className="about_attribution">— Steve Jobs</p>
        </div>

        <div className={`reveal ${cls} reveal--delay-2`}>
          <div className="about_info-grid">
            {infoItems.map(({ label, value }) => (
              <div key={label}>
                <p className="about_info-label">{label}</p>
                <p className="about_info-value">{value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="about_skills-label">Languages</p>
            <div className="about_pills">
              {languages.map((lang) => (
                <span key={lang} className="about_pill">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="about_skills-group">
            <p className="about_skills-label">Frameworks & Tools</p>
            <div className="about_pills">
              {techStack.map((t) => (
                <span key={t} className="about_pill">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Projects ───

const Projects: React.FC = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "reveal--visible" : "";

  const featured = projects.filter((p) => p.featured);
  const standard = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={ref as RefObject<HTMLElement>} className="projects">
      <p className={`projects_label reveal ${cls}`}>Selected Work</p>

      {featured.map((p) => (
        <a
          key={p.title}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`project-card--featured reveal ${cls}`}
        >
          <div>
            <div className="project-card_featured-header">
              <p className="project-card_featured-label">
                Featured · Senior Design Project
              </p>
              <span className="card-arrow card-arrow--featured">
                <Arrow size={18} />
              </span>
            </div>
            <h3 className="project-card_featured-title">{p.title}</h3>
            <p className="project-card_featured-desc">{p.description}</p>
          </div>
          <div className="project-card_tags project-card_tags--featured">
            {p.tags.map((tag) => (
              <span key={tag} className="project-card_tag project-card_tag--featured">
                {tag}
              </span>
            ))}
          </div>
        </a>
      ))}

      <div className="projects_grid">
        {standard.map((p, i) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`project-card reveal ${cls}`}
            style={{ transitionDelay: `${0.1 * (i + 1)}s` }}
          >
            <div>
              <div className="project-card_header">
                <h3 className="project-card_title">{p.title}</h3>
                <span className="card-arrow card-arrow--standard">
                  <Arrow size={14} />
                </span>
              </div>
              <p className="project-card_desc">{p.description}</p>
            </div>
            <div className="project-card_tags project-card_tags--standard">
              {p.tags.map((tag) => (
                <span key={tag} className="project-card_tag">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

// ─── Experience ───

const ExperienceSection: React.FC = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "reveal--visible" : "";

  return (
    <section id="experience" ref={ref as RefObject<HTMLElement>} className="experience">
      <p className={`experience_label reveal ${cls}`}>Experience</p>

      <div className="experience_list">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className={`experience_row reveal ${cls}`}
            style={{ transitionDelay: `${0.1 * i}s` }}
          >
            <span className="experience_year">{exp.year}</span>
            <div>
              <h3 className="experience_role">{exp.role}</h3>
              <p className="experience_company">{exp.company}</p>
              {exp.description && (
                <p className="experience_desc">{exp.description}</p>
              )}
            </div>
            <span className="experience_location">{exp.location}</span>
          </div>
        ))}
      </div>

      <div
        className={`experience_resume-wrapper reveal ${cls}`}
        style={{ transitionDelay: "0.4s" }}
      >
        <a
          href={LINKS.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="resume-link"
        >
          View full résumé <Arrow size={12} />
        </a>
      </div>
    </section>
  );
};

// ─── Contact ───

const Contact: React.FC = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "reveal--visible" : "";

  const contactLinks = [
    { label: "Email", url: LINKS.email },
    { label: "LinkedIn", url: LINKS.linkedin },
    { label: "GitHub", url: LINKS.github },
    { label: "X", url: LINKS.x },
    { label: "Instagram", url: LINKS.instagram },
  ];

  return (
    <section id="contact" ref={ref as RefObject<HTMLElement>} className="contact">
      <div className={`reveal ${cls}`}>
        <p className="contact_label">Get in Touch</p>
        <h2 className="contact_heading">Let's build something together</h2>
        <p className="contact_subtext">
          Currently open to new opportunities and collaborations.
        </p>

        <div className="contact_links">
          {contactLinks.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              {label} <Arrow size={11} />
            </a>
          ))}
        </div>
      </div>

      <div className={`footer reveal ${cls}`} style={{ transitionDelay: "0.3s" }}>
        <p className="footer_text">© {new Date().getFullYear()} Edward Song</p>
      </div>
    </section>
  );
};

// ─── Main App ───

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "projects", "experience", "contact"];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav activeSection={activeSection} />
      <Hero />
      <About />
      <Projects />
      <ExperienceSection />
      <Contact />
    </>
  );
};

export default Portfolio;