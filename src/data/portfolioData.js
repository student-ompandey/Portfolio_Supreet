import { Code2, Briefcase, User, Mail, Star, Layout, Database, Terminal, GraduationCap } from 'lucide-react';

export const portfolioData = {
  hero: {
    name: "Supreet Sinha",
    role: "Frontend Developer | CS Engineer",
    tagline: "Results-driven Computer Science student with a strong foundation in programming, data structures, cloud technologies, and full-stack development. Passionate about building scalable applications and impactful tech solutions.",
    resumeLink: "/resume.pdf"
  },
  about: {
    title: "About Me",
    description: "I am a passionate 3rd-year Computer Science Engineering student and a highly motivated full-stack developer. I recently won 1st Place at the National Ideathon 2K26 and achieved the Institute Topper position in my 5th Semester. I thrive on creating production-ready applications, utilizing modern web frameworks, and solving complex algorithmic challenges.",
    stats: [
      { label: "DSA Problems Solved", value: "300+" },
      { label: "CGPA", value: "8.1" },
      { label: "Hackathon Finalist", value: "2x" }
    ]
  },
  skills: {
    title: "Technical Expertise",
    categories: [
      {
        name: "Languages",
        icon: Code2,
        skills: ["C++", "Python (Basic)", "HTML5", "CSS3"]
      },
      {
        name: "Web & Frameworks",
        icon: Layout,
        skills: ["React.js", "Node.js", "REST APIs", "Tailwind CSS", "Responsive Design"]
      },
      {
        name: "Cloud & Tools",
        icon: Terminal,
        skills: ["Microsoft Azure", "Git", "GitHub", "VS Code", "Postman"]
      },
      {
        name: "CS Fundamentals",
        icon: Database,
        skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems"]
      }
    ]
  },
  education: {
    title: "Education",
    items: [
      {
        degree: "B.Tech – Computer Science",
        institution: "Technocrats Institute of Technology & Science (RGPV)",
        duration: "2023 - 2027",
        location: "Bhopal, India",
        description: "CGPA: 8.1. Institute Topper – 5th Semester (RGPV) | Organizer & Coordinator – Technocrats Innovation Challenge 2K26 (National Level)."
      },
      {
        degree: "Higher Secondary (Class 12)",
        institution: "Carmel School (CBSE)",
        duration: "Completed",
        location: "Ambikapur, India",
        description: "Achieved 82.5% in 12th Grade Board Examinations."
      },
      {
        degree: "High School (Class 10)",
        institution: "Carmel School (CBSE)",
        duration: "Completed",
        location: "Ambikapur, India",
        description: "Achieved 84.83% in 10th Grade Board Examinations."
      }
    ]
  },
  projects: {
    title: "Featured Work",
    items: [
      {
        title: "ScamShield",
        description: "Built a production-ready full-stack cybersecurity platform for real-time detection of phishing URLs, scam messages, malicious QR codes, and fraudulent images. Integrated OpenAI Vision API for AI-based image scam detection with heuristic engine for intent detection and risk scoring.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        tech: ["React.js", "Node.js", "OpenAI API"],
        github: "https://github.com/supreetsinha4321-glitch",
        live: "https://gdg-solution.vercel.app/"
      },
      {
        title: "Personal Portfolio Website",
        description: "Designed and developed a fully responsive personal portfolio using React.js with modern UI components, smooth animations, and cross-device compatibility. Showcases projects, certifications, and achievements with clean navigation.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
        tech: ["React.js", "Tailwind CSS", "JavaScript"],
        github: "https://github.com/supreetsinha4321-glitch",
        live: "https://portfolio-supreet.vercel.app/"
      }
    ]
  },
  achievements: {
    title: "Achievements & Leadership",
    items: [
      {
        title: "National Ideathon 2K26 – 1st Place",
        date: "2026",
        description: "Secured first place in national-level ideation and innovation competition.",
        icon: "Trophy"
      },
      {
        title: "President, Rotaract Club of TIT & Science",
        date: "RY 2026–27",
        description: "Leading the Rotaract Club (RID 3040). Previously served as International Service Director (ISD) in RY 2025–26, building cross-club global initiatives.",
        icon: "Star"
      },
      {
        title: "Microsoft Azure Fundamentals",
        date: "Certified",
        description: "Microsoft Certified along with IBM Artificial Intelligence and Google Machine Learning certifications.",
        icon: "Medal"
      }
    ]
  },
  contact: {
    title: "Get in Touch",
    description: "Interested in working together or have a question? Let's build something amazing.",
    email: "supreet.sinha4321@gmail.com",
    socials: [
      { name: "GitHub", url: "https://github.com/supreetsinha4321-glitch" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/supreet-sinha-1295891a7/" }
    ]
  }
};
