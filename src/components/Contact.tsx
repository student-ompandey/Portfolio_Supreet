import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Terminal, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { contact } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!marqueeRef.current) return;

    // Background Marquee Animation
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
  }, { scope: sectionRef });

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-32 px-6 relative border-t border-neutral-900 overflow-hidden"
      style={{ backgroundColor: "hsl(0 0% 0%)" }}
    >
      {/* Massive GSAP Background Marquee */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-[0.03] z-0"
      >
        <div ref={marqueeRef} className="flex gap-16">
          <h1 className="text-[20rem] font-bold uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>
            LET'S TALK // LET'S TALK // LET'S TALK //
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            // 06. Get In Touch
          </span>
          <h2 
            className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {contact.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p 
              className="text-neutral-400 text-xl leading-relaxed mb-12"
              style={{ fontFamily: "'Antic', sans-serif" }}
            >
              {contact.description}
            </p>
            
            <div className="space-y-6">
              <a 
                href={`mailto:${contact.email}`}
                className="group relative flex items-center gap-6 p-8 bg-neutral-950 border border-neutral-800 hover:border-[#C3E41D] transition-colors duration-300 overflow-hidden"
              >
                {/* Terminal Scanline Hover */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(195,228,29,0)_50%,rgba(195,228,29,0.02)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="text-neutral-500 group-hover:text-black group-hover:bg-[#C3E41D] p-4 bg-black border border-neutral-800 group-hover:border-[#C3E41D] transition-all duration-300 relative z-10">
                  <Mail size={32} strokeWidth={1.5} />
                </div>
                <div className="relative z-10">
                  <div className="text-sm text-[#C3E41D] font-bold tracking-widest uppercase mb-2" style={{ fontFamily: "'Fira Code', monospace" }}>
                    &gt; Execute_Email
                  </div>
                  <div className="text-xl text-white font-medium" style={{ fontFamily: "'Fira Code', monospace" }}>{contact.email}</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Side: Terminal Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="bg-black border border-neutral-800 relative overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
              <div className="flex items-center gap-3">
                <Terminal size={16} className="text-neutral-500" />
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest" style={{ fontFamily: "'Fira Code', monospace" }}>
                  system@portfolio:~
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-neutral-800"></div>
                <div className="w-3 h-3 rounded-full bg-neutral-800"></div>
                <div className="w-3 h-3 rounded-full bg-[#C3E41D]"></div>
              </div>
            </div>

            <form 
              action={`https://formsubmit.co/${contact.email}`} 
              method="POST" 
              className="p-8 md:p-10 flex flex-col gap-8"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_subject" value="New Message from Portfolio Website!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="box" />
              {/* Terminal Input: Name */}
              <div className="group">
                <label 
                  className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#C3E41D] mb-4"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  <span className="text-white">~ %</span> ENTER_NAME
                </label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full bg-transparent border-b-2 border-neutral-800 px-0 py-3 text-white text-lg focus:outline-none focus:border-[#C3E41D] transition-colors placeholder:text-neutral-700"
                  placeholder="_"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                />
              </div>

              {/* Terminal Input: Email */}
              <div className="group">
                <label 
                  className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#C3E41D] mb-4"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  <span className="text-white">~ %</span> ENTER_EMAIL
                </label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-transparent border-b-2 border-neutral-800 px-0 py-3 text-white text-lg focus:outline-none focus:border-[#C3E41D] transition-colors placeholder:text-neutral-700"
                  placeholder="_"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                />
              </div>

              {/* Terminal Input: Message */}
              <div className="group">
                <label 
                  className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#C3E41D] mb-4"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  <span className="text-white">~ %</span> TRANSMIT_MESSAGE
                </label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-transparent border-2 border-neutral-800 p-4 text-white text-lg focus:outline-none focus:border-[#C3E41D] transition-colors resize-none placeholder:text-neutral-700"
                  placeholder="Type your message here..."
                  style={{ fontFamily: "'Fira Code', monospace" }}
                ></textarea>
              </div>

              {/* Brutalist Submit Button */}
              <button 
                type="submit"
                className="group relative w-full py-6 bg-[#C3E41D] text-black font-bold tracking-[0.2em] text-lg uppercase transition-all duration-300 hover:bg-white active:scale-[0.98] mt-4 flex items-center justify-center gap-4 overflow-hidden"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                <span className="relative z-10 flex items-center gap-4">
                  Initialize Transmission
                  <Send size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                {/* Button Scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
