import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Timeline';
import Projects from './components/Projects/Projects';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  useEffect(() => {
    // Initialize theme — dark is default
    const theme = window.localStorage.getItem('theme');
    if (theme === 'light') {
      document.body.setAttribute('theme', 'light');
    } else {
      window.localStorage.setItem('theme', 'dark');
      document.body.removeAttribute('theme');
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
