/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

export default function App() {
  const [path, setPath] = useState(() => {
    const pathname = window.location.pathname;
    if (pathname !== '/' && pathname !== '/index.html' && pathname !== '') {
      return '404';
    }
    if (window.location.hash === '#404') {
      return '404';
    }
    return 'home';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname !== '/' && pathname !== '/index.html' && pathname !== '') {
        setPath('404');
      } else if (hash === '#404') {
        setPath('404');
      } else {
        setPath('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    
    // Initial check in case of rendering delay
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleBackToHome = () => {
    window.history.pushState({}, '', '/');
    window.location.hash = '';
    setPath('home');
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-bone-light select-text selection:bg-amber-clay selection:text-ink-navy">
      <CustomCursor />
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-deep-teal via-amber-clay to-amber-clay-dark origin-left z-[100] pointer-events-none"
      />
      {path === 'home' ? (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Education />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </>
      ) : (
        <NotFound onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}
