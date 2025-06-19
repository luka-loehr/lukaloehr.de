import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tools from './components/Tools';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/animations.css';

function App() {
  useEffect(() => {
    // Update page title
    document.title = "Luka | AI & Code Developer";
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href) return;

        // Only handle internal anchor links (those starting with #)
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1); // Remove the '#' character
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
        // External links will work normally without preventDefault()
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <About />
      <Tools />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;