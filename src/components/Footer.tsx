"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
import { cn } from "../lib/utils";
import { portfolioData } from "../data/portfolioData";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#C3E41D" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#333333" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-800 font-bold"
        style={{ opacity: hovered ? 0.7 : 0, fontFamily: "'Fira Code', monospace", fontSize: "40px" }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#C3E41D] font-bold"
        style={{ fontFamily: "'Fira Code', monospace", fontSize: "40px" }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-bold"
        style={{ fontFamily: "'Fira Code', monospace", fontSize: "40px" }}
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background: "radial-gradient(125% 125% at 50% 10%, rgba(0,0,0,0) 50%, rgba(195,228,29,0.08) 100%)",
      }}
    />
  );
};

export default function Footer() {
  const { contact } = portfolioData;
  const firstName = portfolioData.hero.name.split(" ")[0] || "PORTFOLIO";

  return (
    <footer className="bg-black relative h-fit overflow-hidden border-t border-neutral-900 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          {/* Brand section */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-[#C3E41D] text-3xl font-extrabold" style={{ fontFamily: "'Fira Code', monospace" }}>
                {'//'}
              </span>
              <span className="text-white text-3xl font-bold uppercase tracking-widest" style={{ fontFamily: "'Fira Code', monospace" }}>
                {firstName}
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-lg" style={{ fontFamily: "'Antic', sans-serif" }}>
              Building modern, high-performance web applications with a focus on premium aesthetics.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6" style={{ fontFamily: "'Fira Code', monospace" }}>
              Navigation
            </h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Skills', 'Experience', 'Projects'].map((link) => (
                <li key={link} className="relative">
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-neutral-500 hover:text-[#C3E41D] transition-colors font-bold uppercase tracking-widest text-sm"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6" style={{ fontFamily: "'Fira Code', monospace" }}>
              Socials
            </h4>
            <ul className="space-y-4">
              {contact.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    className="text-neutral-500 hover:text-[#C3E41D] transition-colors font-bold uppercase tracking-widest text-sm flex items-center gap-2 group"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6" style={{ fontFamily: "'Fira Code', monospace" }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex flex-col space-y-2">
                <span className="text-neutral-600 text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "'Fira Code', monospace" }}>Email</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-neutral-400 hover:text-[#C3E41D] transition-colors text-lg"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-t border-neutral-900 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-center md:text-left text-neutral-600 font-bold tracking-widest uppercase text-xs" style={{ fontFamily: "'Fira Code', monospace" }}>
            &copy; {new Date().getFullYear()} {portfolioData.hero.name}. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect - Using extremely large negative margins to pull it up behind content or at the bottom */}
      <div className="hidden lg:flex justify-center items-center h-[24rem] -mt-32 -mb-24 w-full relative z-10 pointer-events-auto">
        <TextHoverEffect text={firstName} className="z-50 w-full" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
