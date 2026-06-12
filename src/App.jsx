import PortfolioHero from './components/ui/portfolio-hero';
import About from './components/About';
import Skills from './components/Skills.tsx';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer.tsx';

function App() {
  return (
    <div className="bg-black selection:bg-[#C3E41D]/20 selection:text-[#C3E41D]">
      <PortfolioHero />
      <main>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
