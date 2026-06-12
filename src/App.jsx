import { useState, useEffect } from 'react';
import { Home, User, Code, Briefcase, LayoutGrid, Trophy, Mail } from 'lucide-react';
import PortfolioHero from './components/ui/portfolio-hero';
import About from './components/About';
import Skills from './components/Skills.tsx';
import Experience from './components/Experience';
import Projects from './components/Projects.tsx';
import Achievements from './components/Achievements.tsx';
import Contact from './components/Contact';
import Footer from './components/Footer.tsx';
import MacOSDock from './components/ui/mac-os-dock.tsx';

const navApps = [
  { id: 'home', name: 'Home', icon: Home },
  { id: 'about', name: 'About', icon: User },
  { id: 'skills', name: 'Skills', icon: Code },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'projects', name: 'Projects', icon: LayoutGrid },
  { id: 'achievements', name: 'Achievements', icon: Trophy },
  { id: 'contact', name: 'Contact', icon: Mail },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDockOpen, setIsDockOpen] = useState(false);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setIsDockOpen(false); // Close the dock and remove blur after clicking
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDock = () => setIsDockOpen(!isDockOpen);

  // Optional: IntersectionObserver to update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black selection:bg-[#C3E41D]/20 selection:text-[#C3E41D] relative pb-24">
      <section id="home">
        <PortfolioHero isDockOpen={isDockOpen} toggleDock={toggleDock} />
      </section>
      <main>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />

      {/* Full Screen Blur Overlay */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/70 backdrop-blur-md transition-all duration-500 ease-out cursor-pointer ${isDockOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsDockOpen(false)}
        aria-hidden="true"
      />

      {/* Floating Brutalist Dock */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] hidden sm:block transition-all duration-500 ease-out ${isDockOpen ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
        <MacOSDock
          apps={navApps}
          onAppClick={scrollToSection}
          activeAppId={activeSection}
        />
      </div>
      
      {/* Mobile fallback (optional) */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-black border-t border-neutral-900 z-[100] sm:hidden flex justify-around">
        {navApps.map(app => {
          const Icon = app.icon;
          const isActive = activeSection === app.id;
          return (
            <button 
              key={app.id} 
              onClick={() => scrollToSection(app.id)}
              className={`p-2 transition-colors ${isActive ? 'text-[#C3E41D]' : 'text-neutral-500 hover:text-white'}`}
            >
              <Icon size={24} />
            </button>
          )
        })}
      </div>
    </div>
  );
}

export default App;
