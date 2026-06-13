import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Medal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import DisplayCards from './ui/display-cards';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Map string icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Trophy: Trophy,
  Star: Star,
  Medal: Medal,
};

export default function Achievements() {
  const { achievements } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>('.display-card-element');
    
    // Set initial stacked state
    gsap.set(cards, {
      y: (i) => i * 15, // Slight vertical offset to show there's a stack
      x: (i) => i * 15, // Slight horizontal offset
      rotation: (i) => i * 2, // Slight tilt
      zIndex: (i) => cards.length - i, // Top card is index 0
      opacity: (i) => i === 0 ? 1 : 0.4,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%', // Scroll distance to complete animation
        pin: true,
        scrub: 1,
      }
    });

    // Vertical Column Unstack Animation (ensures perfect readability)
    cards.forEach((card, i) => {
      // Assuming 3 cards: indices 0, 1, 2. 
      // Card 0 moves UP, Card 1 stays CENTER, Card 2 moves DOWN.
      const yOffset = (i - 1) * 320; 

      tl.to(card, {
        x: 0, // Align them to center horizontally
        y: yOffset, // Spread them vertically
        opacity: 1,
        rotation: 0, // Remove tilt so text is perfectly readable
        ease: 'power2.inOut',
      }, 0); // All animate concurrently
    });

  }, { scope: sectionRef });

  // Fallback in case achievements isn't loaded properly
  if (!achievements || !achievements.items) return null;

  // Map the data to the format expected by DisplayCards without CSS hover classes
  const cardsData = achievements.items.map((item) => {
    const IconComponent = iconMap[item.icon] || Trophy;

    return {
      icon: <IconComponent className="size-6" />,
      title: item.title,
      description: item.description,
      date: item.date,
      className: "[grid-area:stack] absolute", // absolute positioning for stack
      iconClassName: "text-neutral-500 group-hover:text-black",
      titleClassName: "text-white"
    };
  });

  return (
    <section 
      id="achievements" 
      ref={sectionRef}
      className="h-screen w-full relative border-t border-neutral-900 overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: "hsl(0 0% 0%)" }}
    >
      {/* Left Side: Brutalist Title */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center z-50 pointer-events-none mb-12 lg:mb-0">
        <span 
          className="text-sm font-bold uppercase tracking-[0.3em] mb-4 block"
          style={{ color: "#C3E41D", fontFamily: "'Fira Code', monospace" }}
        >
          // 05. Milestones
        </span>
        <h2 
          className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-white"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {achievements.title}
        </h2>
      </div>

      {/* Right Side: Display Cards Stack */}
      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end relative z-10">
        <DisplayCards cards={cardsData} />
      </div>
    </section>
  );
}
