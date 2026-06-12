import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section 
      id="experience" 
      className="py-32 px-6 relative border-t border-neutral-900"
      style={{ backgroundColor: "hsl(0 0% 0%)" }}
    >
      <div className="max-w-4xl mx-auto">
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
            // 03. Timeline
          </span>
          <h2 
            className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {experience.title}
          </h2>
        </motion.div>

        <div className="space-y-0 relative border-l-2 ml-4 md:ml-0 md:border-l-0" style={{ borderColor: "#C3E41D" }}>
          {/* Vertical Timeline Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2" style={{ backgroundColor: "#C3E41D" }} />

          {experience.jobs.map((job, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 py-12 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div 
                  className="absolute left-[-9px] md:left-1/2 top-14 w-4 h-4 bg-black border-2 rounded-none transform md:-translate-x-1/2 z-10 transition-transform duration-300 hover:scale-150 hover:bg-[#C3E41D]" 
                  style={{ borderColor: "#C3E41D" }} 
                />

                {/* Content */}
                <div className="pl-8 md:pl-0 md:w-1/2 flex flex-col justify-start">
                  <div className={`bg-neutral-950 border border-neutral-800 p-8 hover:border-[#C3E41D] transition-colors duration-300 group ${isEven ? 'md:mr-12' : 'md:ml-12'}`}>
                    <span 
                      className="inline-block px-3 py-1 bg-black border text-xs font-bold uppercase tracking-widest mb-6"
                      style={{ color: "#C3E41D", borderColor: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
                    >
                      {job.duration}
                    </span>
                    <h3 
                      className="text-2xl font-bold text-white mb-2 uppercase"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      {job.role}
                    </h3>
                    <div 
                      className="text-[#C3E41D] font-bold tracking-widest uppercase mb-6"
                      style={{ fontFamily: "'Fira Code', monospace" }}
                    >
                      @{job.company}
                    </div>
                    <p 
                      className="text-neutral-400 leading-relaxed text-lg group-hover:text-neutral-300 transition-colors"
                      style={{ fontFamily: "'Antic', sans-serif" }}
                    >
                      {job.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
