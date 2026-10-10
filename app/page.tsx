import { TopBar } from '@/components/layout/TopBar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Work } from '@/components/sections/Work';
import { Experience } from '@/components/sections/Experience';
import { Services } from '@/components/sections/Services';
import { Contact } from '@/components/sections/Contact';

export default function Page() {
  return (
    <>
      <TopBar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
