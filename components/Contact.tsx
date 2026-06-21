import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  return (
    <section id="contact" className="py-16 text-center">
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 pl-2 text-[var(--color-text-primary)]">{"Let's Build Reliable Software"}</h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed">
          Whether you need to establish a QA department from scratch, migrate legacy test suites, 
          or implement cutting-edge Playwright automation—I can help.
        </p>
        <a href="mailto:jdavid07@gmail.com" className="inline-flex items-center justify-center px-10 py-5 bg-[var(--color-text-primary)] text-[var(--color-surface)] font-bold rounded-full text-lg transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl">
          Get in Touch
        </a>
      </ScrollReveal>
    </section>
  );
}
