/**
 * ============================================================
 *  PORTFOLIO CONTENT CONFIG — EDIT THIS FILE ONLY
 * ============================================================
 * All personal information, project details, social links, and
 * SEO metadata live here. Components read from this file — you
 * never need to touch component code to update your content.
 * ============================================================
 */

/** Navigation link shown in the Navbar */
export interface NavLink {
  /** Display label, e.g. "About" */
  label: string;
  /** Route path, e.g. "/about" */
  href: string;
}

/** A single skill or technology you want to highlight */
export interface Skill {
  /** Skill name, e.g. "TypeScript" */
  name: string;
  /** Optional category for grouping, e.g. "Frontend", "Backend", "Tools" */
  category: string;
}

/** Social media or professional profile link */
export interface SocialLink {
  /** Platform name, e.g. "GitHub" */
  platform: string;
  /** Full URL to your profile */
  url: string;
  /** Optional icon identifier (used by Footer) */
  icon: "github" | "linkedin" | "twitter" | "email";
}

/** A portfolio project entry */
export interface Project {
  /** Unique identifier, e.g. "task-manager" */
  id: string;
  /** Project title shown on the card and modal */
  title: string;
  /** One-line summary shown on the project card */
  shortDescription: string;
  /** Full description shown inside the project modal */
  fullDescription: string;
  /** Array of technology tags, e.g. ["React", "Node.js"] */
  techStack: string[];
  /** GitHub repository URL (optional) */
  githubUrl?: string;
  /** Live demo URL (optional) */
  liveUrl?: string;
}

/** Your personal info displayed on Home and About pages */
export interface PersonalInfo {
  /** Your full name as it appears on your resume */
  name: string;
  /** Short professional title, e.g. "CS Student & Product Builder Intern" */
  title: string;
  /** One-line tagline under your name on the Home hero */
  tagline: string;
  /** Short intro paragraph for the Home page hero section */
  intro: string;
  /** Longer bio for the About page — 2-3 paragraphs about you */
  bio: string;
  /** Education line, e.g. "B.S. Computer Science — University Name (Expected 2027)" */
  education: string;
  /** Background paragraph — your journey, interests, what drives you */
  background: string;
  /** URL to your resume PDF — place the file in /public/resume.pdf or use an external link */
  resumeUrl: string;
}

/** Contact page copy and info */
export interface ContactInfo {
  /** Page subtitle shown under "Contact" heading */
  subtitle: string;
  /** Your email address displayed on the contact page (optional) */
  email: string;
  /** Success message shown after form submission (UI-only for now) */
  successMessage: string;
}

/** SEO and metadata configuration for layout.tsx */
export interface SeoConfig {
  /** Site title — appears in browser tab and search results */
  siteTitle: string;
  /** Meta description — 1-2 sentences summarizing your portfolio */
  siteDescription: string;
  /** Your site URL after deployment, e.g. "https://yourname.vercel.app" */
  siteUrl: string;
  /** Open Graph image path — place image in /public/og-image.png */
  ogImage: string;
  /** Twitter/X handle without @, e.g. "yourhandle" */
  twitterHandle: string;
}

/** Root content object — all site data in one place */
export interface SiteContent {
  personal: PersonalInfo;
  navLinks: NavLink[];
  projects: Project[];
  skills: Skill[];
  socialLinks: SocialLink[];
  contact: ContactInfo;
  seo: SeoConfig;
}

export const content: SiteContent = {
  personal: {
    name: "Noor Fatima",
    title: "Software Engineering Student & Multi-Intern",
    tagline: "Building robust software and intelligent solutions, one project at a time.",
    intro:
      "I am a Software Engineering student at The University of Faisalabad and a multi-intern passionate about full-stack development and community-driven technology.",
    bio: "I am a Software Engineering student with a strong academic background and a passion for crafting efficient web architectures. I balance my academic pursuits with real-world industry experience, actively interning across multiple roles to master modern development methodologies.\n\nMy journey is defined by continuous learning, whether exploring advanced programming paradigms or collaborating on impactful community initiatives. I aim to leverage engineering to solve real-world problems, combining technical quality with thoughtful execution.",
    education: "B.S. Software Engineering (Final Year, CGPA: 3.93) — The University of Faisalabad",
    background:
      "My engineering journey began with foundational systems programming and object-oriented design, which naturally transitioned into modern full-stack web development. Through multiple internship programs and hands-on projects, I have developed a solid understanding of software lifecycles and modern technical stacks.",
    resumeUrl: "/resume.pdf",
  },

  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],

  projects: [
    {
      id: "blood-bank-system",
      title: "Blood Bank Management System",
      shortDescription: "A robust desktop console application implementing object-oriented design principles in C++.",
      fullDescription:
        "Developed an Object-Oriented Programming (OOP) console application in C++ featuring automated record validation, system file handling, search structures, and donor-patient management utilities.",
      techStack: ["C++", "OOP", "File Handling", "Data Structures"],
    },
    
    {
      id: "nurnet",
      title: "NURNET",
      shortDescription: "A responsive web application built with clean semantic markup and modern frontend styling.",
      fullDescription:
        "Designed and implemented NURNET, a fully responsive web portal focusing on clean user interface design and intuitive navigation using HTML, CSS, and JavaScript fundamentals.",
      techStack: ["HTML5", "CSS3", "JavaScript"],
    },
 
    {
      id: "contact-management-cli",
      title: "Contact Management System",
      shortDescription: "A specialized console-based application tracking custom records and structural database modeling.",
      fullDescription:
        "Engineered a command-line utility optimized for structured data storage, input validation, and secure record manipulation using native logic structures.",
      techStack: ["C++", "OOP", "Console UI"],
    },
  ],

  skills: [
  
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "HTML5", category: "Frontend" },
    { name: "CSS3", category: "Frontend" },

    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "Prisma", category: "Backend" },
    { name: "Supabase", category: "Backend" },

    { name: "Git", category: "Tools & Methodologies" },
    { name: "GitHub", category: "Tools & Methodologies" },
    { name: "VS Code", category: "Tools & Methodologies" },
    { name: "Agile/Scrum", category: "Tools & Methodologies" },

    { name: "JavaScript", category: "Programming Languages" },
    { name: "TypeScript", category: "Programming Languages" },
    { name: "C++", category: "Programming Languages" },

    { name: "Urdu", category: "Languages" },
    { name: "English", category: "Languages" },
    { name: "Punjabi", category: "Languages" },
  ],

  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/noor-fatima-a028b12a5/",
      icon: "linkedin",
    },
    {
      platform: "GitHub",
      url: "https://github.com/zar-e-noor",
      icon: "github",
    },
    {
      platform: "Email",
      url: "mailto:noorfatimasohail55@gmail.com",
      icon: "email",
    },
  ],

  contact: {
    subtitle:
      "Let's connect! Reach out to discuss collaboration, development opportunities, or software engineering.",
    email: "noorfatimasohail55@gmail.com",
    successMessage:
      "Thanks for reaching out! Your message has been received. I'll get back to you shortly.",
  },

  seo: {
    siteTitle: "Noor Fatima — Portfolio",
    siteDescription:
      "Portfolio of Noor Fatima — Software Engineering Student, Product Builder Intern, and MERN Developer showcasing academic projects and professional experience.",
    siteUrl: "https://yourname.vercel.app",
    ogImage: "/og-image.png",
    twitterHandle: "",
  },
};
