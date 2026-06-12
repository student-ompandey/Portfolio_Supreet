import { motion } from 'framer-motion';
import { Server, Layout, Database, Wrench, Code, Terminal, Smartphone } from 'lucide-react';
import RadialOrbitalTimeline, { TimelineItem } from './ui/radial-orbital-timeline';
import { portfolioData } from '../data/portfolioData';

// Generate timeline data from portfolioData.skills
// Manually mapping these into an interconnected web for the orbital visualization
const generateTimelineData = (): TimelineItem[] => {
  return [
    {
      id: 1,
      title: "React.js",
      date: "CORE",
      content: "Component-based UI development with hooks, state management, and modern best practices.",
      category: "Frontend",
      icon: Layout,
      relatedIds: [2, 3, 4], // Links to Next.js, Tailwind, TypeScript
      status: "completed",
      energy: 95,
    },
    {
      id: 2,
      title: "Next.js",
      date: "ADVANCED",
      content: "Server-side rendering, static site generation, and full-stack React framework integration.",
      category: "Frontend",
      icon: Server,
      relatedIds: [1, 5, 8], // Links to React, Node.js, Vercel
      status: "completed",
      energy: 90,
    },
    {
      id: 3,
      title: "Tailwind CSS",
      date: "EXPERT",
      content: "Utility-first CSS framework for rapid, highly-customizable UI development and dark mode.",
      category: "Frontend",
      icon: Code,
      relatedIds: [1, 4], // Links to React, TypeScript
      status: "completed",
      energy: 100,
    },
    {
      id: 4,
      title: "TypeScript",
      date: "ADVANCED",
      content: "Strongly typed JavaScript for scalable, reliable, and error-free application architectures.",
      category: "Frontend",
      icon: Terminal,
      relatedIds: [1, 2, 5], // Links to React, Next, Node
      status: "completed",
      energy: 85,
    },
    {
      id: 5,
      title: "Node.js",
      date: "CORE",
      content: "Asynchronous, event-driven JavaScript runtime for scalable backend services and APIs.",
      category: "Backend",
      icon: Server,
      relatedIds: [6, 7], // Links to Express, MongoDB
      status: "completed",
      energy: 90,
    },
    {
      id: 6,
      title: "Express",
      date: "CORE",
      content: "Fast, unopinionated, minimalist web framework for Node.js API development.",
      category: "Backend",
      icon: Code,
      relatedIds: [5, 7], // Links to Node, MongoDB
      status: "completed",
      energy: 90,
    },
    {
      id: 7,
      title: "MongoDB",
      date: "CORE",
      content: "NoSQL document database for flexible schema design and scalable data storage.",
      category: "Backend",
      icon: Database,
      relatedIds: [5, 6], // Links to Node, Express
      status: "completed",
      energy: 85,
    },
    {
      id: 8,
      title: "Git & Vercel",
      date: "TOOLS",
      content: "Version control and seamless CI/CD platform deployments for modern web apps.",
      category: "Tools",
      icon: Wrench,
      relatedIds: [2, 1], // Links to Next, React
      status: "completed",
      energy: 80,
    }
  ];
};

export default function Skills() {
  const { skills } = portfolioData;
  const timelineData = generateTimelineData();

  return (
    <section 
      id="skills" 
      className="py-32 px-6 relative border-t border-neutral-900"
      style={{ backgroundColor: "hsl(0 0% 0%)" }}
    >
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col items-center md:items-start"
        >
          <span 
            className="text-sm font-bold uppercase tracking-[0.3em] mb-4"
            style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
          >
            // 02. Capabilities
          </span>
          <h2 
            className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {skills.title}
          </h2>
        </motion.div>

        {/* 3D Interactive Orbital Timeline Component */}
        <div className="relative w-full overflow-hidden border border-neutral-900 bg-neutral-950">
          {/* Decorative scanner line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C3E41D] opacity-20 shadow-[0_0_10px_#C3E41D] z-50 animate-[scan_3s_linear_infinite]" />
          
          <RadialOrbitalTimeline timelineData={timelineData} />
          
          <div className="absolute bottom-6 left-6 z-40 bg-black border border-neutral-800 p-4">
             <div className="text-xs font-bold tracking-widest text-neutral-500 uppercase mb-2" style={{ fontFamily: "'Fira Code', monospace" }}>Controls</div>
             <ul className="text-xs text-neutral-400 space-y-2">
               <li><span className="text-[#C3E41D]">{'>'}</span> Click nodes to inspect</li>
               <li><span className="text-[#C3E41D]">{'>'}</span> Observe energy states</li>
               <li><span className="text-[#C3E41D]">{'>'}</span> Follow connections</li>
             </ul>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}} />
    </section>
  );
}
