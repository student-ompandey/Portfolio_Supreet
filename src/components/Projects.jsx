import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section 
      id="projects" 
      className="py-32 px-6 relative border-t border-neutral-900"
      style={{ backgroundColor: "hsl(0 0% 0%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-20 flex flex-col items-center md:items-start"
        >
          <span 
            className="text-sm font-bold uppercase tracking-[0.3em] mb-4"
            style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
          >
            // 04. Featured Work
          </span>
          <h2 
            className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {projects.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.items.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-neutral-950 border border-neutral-800 transition-all duration-300 hover:border-[#C3E41D] flex flex-col"
            >
              <div className="relative h-56 overflow-hidden border-b border-neutral-800 group-hover:border-[#C3E41D] transition-colors">
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/10 transition-colors z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <h3 
                  className="text-2xl font-bold text-white mb-4 uppercase tracking-tight"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  {project.title}
                </h3>
                <p 
                  className="text-neutral-400 mb-8 flex-grow text-lg"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-[#C3E41D]"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-6 border-t border-neutral-900 group-hover:border-neutral-800 transition-colors">
                  <a href={project.github} className="text-neutral-500 hover:text-[#C3E41D] transition-colors flex items-center gap-2" title="View Source">
                    <Code size={20} />
                    <span className="text-sm font-bold tracking-widest uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>Code</span>
                  </a>
                  <a href={project.live} className="text-neutral-500 hover:text-[#C3E41D] transition-colors flex items-center gap-2" title="Live Preview">
                    <ExternalLink size={20} />
                    <span className="text-sm font-bold tracking-widest uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>Live</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
