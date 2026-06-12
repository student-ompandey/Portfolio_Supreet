import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, TerminalSquare } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 200) {
        setActiveSection('');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
  ];

  // Mobile menu variants
  const mobileMenuVariants = {
    closed: { opacity: 0, y: -20, scale: 0.95 },
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const mobileLinkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6 px-4 pointer-events-none">
      <nav 
        className={`pointer-events-auto transition-all duration-500 w-full max-w-5xl rounded-full border border-white/5 
        ${scrolled ? 'bg-surface/60 backdrop-blur-xl shadow-2xl py-2 px-4' : 'bg-transparent py-2 px-4'}`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group relative z-10 pl-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <TerminalSquare size={18} className="text-primary" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              {portfolioData.hero.name}<span className="text-primary">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a 
                  key={link.name} 
                  href={`#${link.id}`}
                  onClick={() => setActiveSection(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors z-10
                    ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-10">
            <a 
              href="#contact" 
              className="hidden md:flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-full transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]"
            >
              Let's Talk
            </a>

            <button 
              className="md:hidden w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden absolute top-[calc(100%+16px)] left-0 w-full bg-surface/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-2 shadow-2xl origin-top"
            >
              {navLinks.map((link) => (
                <motion.a 
                  variants={mobileLinkVariants}
                  key={link.name} 
                  href={`#${link.id}`} 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveSection(link.id);
                  }}
                  className={`text-lg font-semibold py-3 px-4 rounded-xl transition-colors
                    ${activeSection === link.id ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                variants={mobileLinkVariants}
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 w-full py-4 bg-primary text-white text-center font-semibold rounded-xl hover:bg-primary/90 transition-colors"
              >
                Let's Talk
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
