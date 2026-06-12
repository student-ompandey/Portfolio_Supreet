import { Code2, Briefcase, User, Mail, Star, Layout, Database, Terminal } from 'lucide-react';

export const portfolioData = {
  hero: {
    name: "Supreet",
    role: "Full Stack Developer",
    tagline: "Building modern, high-performance web applications with a focus on premium aesthetics and seamless user experiences.",
    resumeLink: "#"
  },
  about: {
    title: "About Me",
    description: "I am a passionate software developer specializing in React ecosystem. With a keen eye for design and a strong foundation in modern web technologies, I transform complex problems into elegant, user-centric solutions.",
    stats: [
      { label: "Years Experience", value: "3+" },
      { label: "Projects Completed", value: "20+" },
      { label: "Happy Clients", value: "10+" }
    ]
  },
  skills: {
    title: "Technical Expertise",
    categories: [
      {
        name: "Frontend",
        icon: Layout,
        skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
      },
      {
        name: "Backend",
        icon: Database,
        skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"]
      },
      {
        name: "Tools",
        icon: Terminal,
        skills: ["Git", "Docker", "AWS", "Vite", "Jest"]
      }
    ]
  },
  experience: {
    title: "Experience",
    jobs: [
      {
        role: "Senior Frontend Engineer",
        company: "Tech Innovators",
        duration: "2023 - Present",
        description: "Leading frontend development for enterprise applications. Implemented micro-frontend architecture resulting in 40% faster load times."
      },
      {
        role: "Full Stack Developer",
        company: "Digital Solutions Inc",
        duration: "2021 - 2023",
        description: "Developed and maintained multiple client projects. Mentored junior developers and established CI/CD pipelines."
      }
    ]
  },
  projects: {
    title: "Featured Work",
    items: [
      {
        title: "E-Commerce Platform",
        description: "A modern e-commerce solution with real-time inventory, secure payments, and a sleek admin dashboard.",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
        tech: ["Next.js", "Tailwind", "Stripe"],
        github: "#",
        live: "#"
      },
      {
        title: "Task Management App",
        description: "Collaborative task tracking with real-time updates and interactive Kanban boards.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
        tech: ["React", "Firebase", "Framer Motion"],
        github: "#",
        live: "#"
      },
      {
        title: "AI Dashboard",
        description: "Analytics dashboard with AI-powered insights and dark mode data visualizations.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tech: ["Vue", "D3.js", "Tailwind"],
        github: "#",
        live: "#"
      }
    ]
  },
  achievements: {
    title: "Achievements",
    items: [
      {
        title: "Hackathon Winner",
        date: "2023",
        description: "First place in the Global Tech Innovators Hackathon for building an AI-powered accessibility tool.",
        icon: "Trophy"
      },
      {
        title: "Open Source Contributor",
        date: "2022 - Present",
        description: "Core contributor to several popular open-source React libraries with over 10k stars on GitHub.",
        icon: "Star"
      },
      {
        title: "AWS Certified Solutions Architect",
        date: "2021",
        description: "Achieved the associate level certification demonstrating expertise in designing distributed systems.",
        icon: "Medal"
      }
    ]
  },
  contact: {
    title: "Get in Touch",
    description: "Interested in working together? Let's build something amazing.",
    email: "hello@example.com",
    socials: [
      { name: "GitHub", url: "#" },
      { name: "LinkedIn", url: "#" },
      { name: "Twitter", url: "#" }
    ]
  }
};
