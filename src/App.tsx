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
    try {
      // Update page title
      document.title = "Luka | AI & Code Developer";
      
      // Add smooth scrolling to all anchor links
      const anchors = document.querySelectorAll('a');
      anchors.forEach(anchor => {
        const handleClick = function (e: Event) {
          const target = e.currentTarget as HTMLAnchorElement;
          const href = target.getAttribute('href');
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
        };
        
        anchor.addEventListener('click', handleClick);
        
        // Cleanup function
        return () => {
          anchor.removeEventListener('click', handleClick);
        };
      });
    } catch (error) {
      console.error('Error in App useEffect:', error);
    }
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