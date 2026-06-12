import React from 'react';
import { Code, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import FlowArt, { FlowSection } from './ui/story-scroll';

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="bg-black relative border-t border-neutral-900 w-full overflow-hidden">
      {/* Brutalist Section Header */}
      <div className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-neutral-900">
        <span 
          className="text-sm font-bold uppercase tracking-[0.3em] mb-4 block"
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
      </div>

      <FlowArt aria-label="Portfolio Projects Flow">
        {projects.items.map((project, index) => {
          // Alternate between solid black and very dark gray for contrast
          const isEven = index % 2 === 0;
          const bgColor = isEven ? '#000000' : '#050505';

          return (
            <FlowSection 
              key={index} 
              aria-label={project.title} 
              style={{ backgroundColor: bgColor, color: '#fff' }}
              className="border-b border-neutral-900"
            >
              <p 
                className="text-xs font-bold uppercase tracking-[0.2em] opacity-50"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                PROJECT — 0{index + 1}
              </p>
              
              <hr className="my-[2vw] border-none border-t border-neutral-800" />
              
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 h-full items-center lg:items-stretch">
                
                {/* Left Side: Title and Info */}
                <div className="flex-1 flex flex-col justify-between w-full">
                  <div>
                    <h1
                      className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.85] uppercase tracking-tight mb-8"
                      style={{ fontFamily: "'Fira Code', monospace", color: isEven ? '#fff' : '#C3E41D' }}
                    >
                      {project.title.split(' ').map((word, i) => (
                        <React.Fragment key={i}>
                          {word}
                          <br />
                        </React.Fragment>
                      ))}
                    </h1>
                  </div>

                  <div className="mt-8 lg:mt-auto">
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

                    <p 
                      className="max-w-[40ch] text-[clamp(1rem,1.5vw,1.5rem)] font-normal leading-relaxed text-neutral-400 mb-8"
                      style={{ fontFamily: "'Antic', sans-serif" }}
                    >
                      {project.description}
                    </p>

                    <div className="flex items-center gap-8">
                      <a 
                        href={project.github} 
                        className="group flex items-center gap-3 text-neutral-500 hover:text-[#C3E41D] transition-colors"
                        title="View Source"
                      >
                        <div className="w-10 h-10 border border-neutral-800 flex items-center justify-center group-hover:border-[#C3E41D] transition-colors">
                          <Code size={18} />
                        </div>
                        <span className="text-sm font-bold tracking-widest uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>Source Code</span>
                      </a>
                      <a 
                        href={project.live} 
                        className="group flex items-center gap-3 text-neutral-500 hover:text-[#C3E41D] transition-colors"
                        title="Live Preview"
                      >
                        <div className="w-10 h-10 border border-neutral-800 flex items-center justify-center group-hover:border-[#C3E41D] transition-colors">
                          <ExternalLink size={18} />
                        </div>
                        <span className="text-sm font-bold tracking-widest uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>Live Deploy</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Side: Image */}
                <div className="flex-1 w-full relative min-h-[300px] lg:min-h-full flex items-center justify-center lg:justify-end">
                  <div className="relative w-full h-[300px] lg:h-[80%] max-w-2xl border border-neutral-800 p-2 group transition-colors duration-500 hover:border-[#C3E41D]">
                    <div className="w-full h-full relative overflow-hidden bg-neutral-950">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      />
                      {/* Terminal scanline overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(195,228,29,0)_50%,rgba(195,228,29,0.05)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    
                    {/* Brutalist image label */}
                    <div 
                      className="absolute -bottom-4 -left-4 bg-black border border-neutral-800 px-4 py-2 text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-[#C3E41D] group-hover:border-[#C3E41D] transition-colors duration-500"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      RENDER // 0{index + 1}
                    </div>
                  </div>
                </div>

              </div>
              <hr className="my-[2vw] border-none border-t border-neutral-800 mt-auto" />
            </FlowSection>
          );
        })}
      </FlowArt>
    </section>
  );
}
