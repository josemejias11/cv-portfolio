import React from 'react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import TechnicalSkills from '../components/TechnicalSkills';
import Projects from '../components/Projects';
import AutomationLab from '../components/AutomationLab';
import Contact from '../components/Contact';
import SectionWrapper from '../components/SectionWrapper';

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-16 flex flex-col relative pb-32">
      <div className="mb-24">
        <Hero />
      </div>
      
      <SectionWrapper top="2rem" zIndex={10} marginBottom="50vh">
        <TechnicalSkills />
      </SectionWrapper>

      <SectionWrapper top="3rem" zIndex={20} marginBottom="50vh">
        <Experience />
      </SectionWrapper>

      <SectionWrapper top="4rem" zIndex={30} marginBottom="50vh">
        <Projects />
      </SectionWrapper>

      <SectionWrapper top="5rem" zIndex={40} marginBottom="30vh">
        <AutomationLab />
      </SectionWrapper>

      <SectionWrapper top="6rem" zIndex={50}>
        <Contact />
      </SectionWrapper>
    </main>
  );
}
