import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { contact } = portfolioData;

  return (
    <section 
      id="contact" 
      className="py-32 px-6 relative border-t border-neutral-900"
      style={{ backgroundColor: "hsl(0 0% 0%)" }}
    >
      <div className="max-w-5xl mx-auto">
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
            // 05. Get In Touch
          </span>
          <h2 
            className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {contact.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
          {/* Contact Info */}
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
            
            <div className="space-y-8">
              <a 
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-6 p-6 bg-neutral-950 border border-neutral-800 hover:border-[#C3E41D] transition-colors duration-300"
              >
                <div className="text-neutral-500 group-hover:text-[#C3E41D] transition-colors">
                  <Mail size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-sm text-neutral-500 font-bold tracking-widest uppercase mb-1" style={{ fontFamily: "'Fira Code', monospace" }}>Email Me</div>
                  <div className="text-lg text-white font-medium">{contact.email}</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <form className="bg-neutral-950 border border-neutral-800 p-8 md:p-10 flex flex-col gap-6">
              <div>
                <label 
                  className="block text-sm font-bold tracking-widest uppercase text-neutral-500 mb-3"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  Name
                </label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-neutral-800 px-5 py-4 text-white focus:outline-none focus:border-[#C3E41D] transition-colors"
                  placeholder="Enter your name"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                />
              </div>
              <div>
                <label 
                  className="block text-sm font-bold tracking-widest uppercase text-neutral-500 mb-3"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full bg-black border border-neutral-800 px-5 py-4 text-white focus:outline-none focus:border-[#C3E41D] transition-colors"
                  placeholder="Enter your email"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                />
              </div>
              <div>
                <label 
                  className="block text-sm font-bold tracking-widest uppercase text-neutral-500 mb-3"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                >
                  Message
                </label>
                <textarea 
                  rows={5}
                  className="w-full bg-black border border-neutral-800 px-5 py-4 text-white focus:outline-none focus:border-[#C3E41D] transition-colors resize-none"
                  placeholder="How can I help you?"
                  style={{ fontFamily: "'Antic', sans-serif" }}
                ></textarea>
              </div>
              <button 
                type="button"
                className="group w-full py-4 bg-[#C3E41D] text-black font-bold tracking-widest uppercase hover:bg-white transition-colors mt-4 flex items-center justify-center gap-3"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                Send Message
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
