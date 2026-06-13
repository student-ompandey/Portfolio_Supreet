import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { about } = portfolioData;

  return (
    <section 
      id="about" 
      className="py-32 px-6 relative border-t border-neutral-900"
      style={{ backgroundColor: "hsl(0 0% 0%)" }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
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
            // 01. Introduction
          </span>
          <h2 
            className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {about.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-start">
          {/* Left Column: Text & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <p 
              className="text-neutral-400 text-xl md:text-2xl leading-relaxed mb-12"
              style={{ fontFamily: "'Antic', sans-serif" }}
            >
              {about.description}
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-neutral-900">
              {about.stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <div 
                    className="text-5xl md:text-6xl font-bold mb-3"
                    style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="text-sm text-neutral-500 uppercase tracking-widest font-bold"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-sm mx-auto lg:mx-0 group"
          >
            {/* Decorative Offset Border */}
            <div 
              className="absolute inset-0 translate-x-4 translate-y-4 border-2 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"
              style={{ borderColor: "#C3E41D" }}
            />
            
            {/* Image Container */}
            <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden z-10 grayscale hover:grayscale-0 transition-all duration-500">
              <img 
                src="/Supreet.jpeg" 
                alt="Profile Portrait" 
                className="w-full h-full object-cover"
              />
              {/* Scanline overlay for that terminal aesthetic */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
            </div>
            
            {/* Image Label */}
            <div 
              className="absolute -bottom-6 -right-6 z-20 px-4 py-2 bg-black border border-neutral-800 text-xs font-bold tracking-widest text-white"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              SYS.ADMIN // ONLINE
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
