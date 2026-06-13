import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

// The Tile logic adapted for Brutalist HTML Cards - Tuned for text readability
function EducationCard({ item, side, isLast }: { item: any, side: "L" | "R", isLast: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const reduce = useReducedMotion();
  const sign = side === "L" ? -1 : 1;
  const perspective = 800; // Deep perspective for dramatic 3D effect
  const maxTilt = 65; // Massive tilt so it looks like it's laying flat at the edges
  const maxBlur = 10; // High blur for depth of field

  // Narrow focus zone (0.4 to 0.6) so it spends most of its time tilted and only flattens exactly in the center
  const blur = useTransform(p, [0, 0.4, 0.6, 1], [maxBlur, 0, 0, maxBlur]);
  const bright = useTransform(p, [0, 0.4, 0.6, 1], [0.2, 1, 1, 0.2]); // gets very dark at edges
  
  // Dramatic flight paths
  const ty = useTransform(p, [0, 0.4, 0.6, 1], ["100%", "0%", "0%", "-100%"]);
  const tz = useTransform(p, [0, 0.4, 0.6, 1], [500, 0, 0, -500]); // Huge Z-depth
  const rx = useTransform(p, [0, 0.4, 0.6, 1], [maxTilt, 0, 0, -maxTilt]);

  // Sway side to side as they come in
  const tx = useTransform(p, [0, 0.4, 0.6, 1], [`${sign * 30}%`, "0%", "0%", `${sign * 30}%`]);
  const rot = useTransform(p, [0, 0.4, 0.6, 1], [-sign * 15, 0, 0, sign * 15]);

  const filter = useMotionTemplate`blur(${blur}px) brightness(${bright})`;

  if (reduce) {
    return (
      <figure ref={ref} className={`relative z-10 w-full max-w-2xl mx-auto ${isLast ? 'mb-0' : 'mb-16'}`}>
        <div className="w-full bg-neutral-950 border border-neutral-800 p-8 hover:border-[#C3E41D] group">
          <span 
            className="inline-block px-3 py-1 bg-black border text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: "#C3E41D", borderColor: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
          >
            {item.duration}
          </span>
          <h3 
            className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {item.degree}
          </h3>
          <div 
            className="text-[#C3E41D] font-bold tracking-widest uppercase mb-2"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            @{item.institution}
          </div>
          <div 
            className="text-neutral-500 text-sm font-bold tracking-widest uppercase mb-6"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {item.location}
          </div>
          <p 
            className="text-neutral-400 leading-relaxed text-lg group-hover:text-neutral-300 transition-colors"
            style={{ fontFamily: "'Antic', sans-serif" }}
          >
            {item.description}
          </p>
        </div>
      </figure>
    );
  }

  return (
    <motion.figure
      ref={ref}
      // Reduced margin so cards overlap more during the scroll, enhancing the 3D depth effect
      className={`relative z-10 w-full max-w-2xl mx-auto ${isLast ? 'mb-0' : 'mb-12 md:mb-16'}`}
      style={{ perspective, willChange: "transform" }}
    >
      <motion.div
        className="w-full bg-neutral-950 border border-neutral-800 p-8 shadow-[0_50px_100px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-[#C3E41D] group will-change-[filter,transform]"
        style={{
          filter,
          x: tx,
          y: ty,
          z: tz,
          rotate: rot,
          rotateX: rx,
        }}
      >
        <span 
          className="inline-block px-3 py-1 bg-black border text-xs font-bold uppercase tracking-widest mb-6"
          style={{ color: "#C3E41D", borderColor: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
        >
          {item.duration}
        </span>
        <h3 
          className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-tight"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {item.degree}
        </h3>
        <div 
          className="text-[#C3E41D] font-bold tracking-widest uppercase mb-2"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          @{item.institution}
        </div>
        <div 
          className="text-neutral-500 text-sm font-bold tracking-widest uppercase mb-6"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {item.location}
        </div>
        <p 
          className="text-neutral-400 leading-relaxed text-lg md:text-xl group-hover:text-neutral-200 transition-colors"
          style={{ fontFamily: "'Antic', sans-serif" }}
        >
          {item.description}
        </p>
      </motion.div>
    </motion.figure>
  );
}

export default function Education() {
  const { education } = portfolioData;

  return (
    <section 
      id="education" 
      // Increased vertical padding to act as a buffer so 3D elements don't bleed out
      className="py-40 px-6 relative border-t border-b border-neutral-900 overflow-hidden"
      style={{ backgroundColor: "hsl(0 0% 0%)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 relative">
        
        {/* Left Side: Sticky Title */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-40 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            <span 
              className="text-sm font-bold uppercase tracking-[0.3em] mb-4"
              style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
            >
              // 03. Timeline
            </span>
            <h2 
              className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-white"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {education.title}
            </h2>
            <p 
              className="mt-6 text-neutral-400 text-lg md:text-xl max-w-sm"
              style={{ fontFamily: "'Antic', sans-serif" }}
            >
              Scroll through my academic background to see my educational journey and foundational achievements.
            </p>
          </div>
        </div>

        {/* Right Side: Scroll Tilted Grid (1 Column for text cards) */}
        <div className="w-full lg:w-2/3 pt-12 lg:pt-0 pb-12 relative z-10">
          {education.items.map((item, index) => (
            <EducationCard 
              key={index} 
              item={item} 
              side={index % 2 === 0 ? "L" : "R"} 
              isLast={index === education.items.length - 1}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
