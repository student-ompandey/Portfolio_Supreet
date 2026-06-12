import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { ArrowRight, Download, Terminal, Code2, Sparkles } from 'lucide-react';

export default function Hero() {
  const { hero } = portfolioData;

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-20 pb-12 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] -z-10 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px] -z-10 mix-blend-screen" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Column: Content */}
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass border border-primary/30 text-primary text-sm font-semibold tracking-wide"
          >
            <Sparkles size={16} />
            <span>Welcome to my portfolio</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{hero.name}</span> <br />
            <span className="text-gradient drop-shadow-lg">{hero.role}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg lg:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed"
          >
            {hero.tagline}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-5"
          >
            <a 
              href="#projects" 
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            >
              View Projects <ArrowRight size={18} />
            </a>
            <a 
              href={hero.resumeLink} 
              className="w-full sm:w-auto px-8 py-4 glass-card text-white font-semibold rounded-xl hover:bg-surface/60 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Download Resume <Download size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Visual Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="hidden lg:block relative"
        >
          {/* Central Floating Card */}
          <motion.div 
            variants={floatingVariants}
            animate="animate"
            className="relative z-20 w-full max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-600 rounded-3xl blur-2xl opacity-20" />
            <div className="glass-card rounded-3xl p-6 relative border border-white/10 overflow-hidden shadow-2xl bg-surface/80 backdrop-blur-2xl">
              
              {/* Fake Window Controls */}
              <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              {/* Code Snippet Simulation */}
              <div className="font-mono text-sm space-y-4">
                <div className="flex items-center text-gray-400">
                  <span className="text-primary mr-2">❯</span> npm run dev
                </div>
                <div className="text-green-400">
                  ✔ Server starting...
                </div>
                <div className="text-purple-300">
                  <span className="text-blue-400">const</span> developer = {'{'}
                </div>
                <div className="pl-4 text-gray-300">
                  name: <span className="text-amber-300">"{hero.name}"</span>,
                </div>
                <div className="pl-4 text-gray-300">
                  role: <span className="text-amber-300">"{hero.role}"</span>,
                </div>
                <div className="pl-4 text-gray-300">
                  skills: [<span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Node.js"</span>, <span className="text-amber-300">"Tailwind"</span>]
                </div>
                <div className="text-purple-300">
                  {'}'};
                </div>
                <div className="text-gray-400 mt-4 animate-pulse">
                  <span className="text-primary mr-2">❯</span> _
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-10 -right-10 glass-card p-4 rounded-2xl z-30 text-amber-400 border border-amber-400/20"
          >
            <Code2 size={32} />
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-10 -left-10 glass-card p-4 rounded-2xl z-30 text-purple-400 border border-purple-400/20"
          >
            <Terminal size={32} />
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
