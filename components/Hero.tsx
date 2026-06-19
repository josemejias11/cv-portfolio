import React from 'react';
import ScrollReveal from './ScrollReveal';
import AnimatedGrid from './AnimatedGrid';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center py-24 text-left border-b border-[var(--color-surface-border)] overflow-hidden">
      <AnimatedGrid />
      
      <div className="relative z-10 w-full">
        <ScrollReveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-surface-border)] mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-pulse"></span>
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">Open to Work</span>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-6 pl-2 text-[var(--color-text-primary)]">
            Jose David <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]">
              Mejias Araya
            </span>
          </h1>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <h2 className="text-2xl md:text-3xl text-[var(--color-text-secondary)] max-w-2xl font-medium tracking-tight mb-8">
            Senior Quality Assurance Enginner
          </h2>
          <p className="text-lg text-[var(--color-text-tertiary)] max-w-2xl mb-12 leading-relaxed">
            Senior QA with a strong bias toward automation engineering. Built end-to-end Playwright + TypeScript test frameworks, integrated into CI/CD pipelines via GitHub Actions and Docker. Delivered automation coverage across UI, API, accessibility, and data layers for enterprise SaaS products. Experienced working with US-based distributed teams in Agile environments.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.4}>
          <div className="flex gap-4">
            <a href="#contact" className="px-8 py-4 bg-[var(--color-text-primary)] text-[var(--color-surface)] font-semibold rounded-full hover:opacity-80 transition-colors">
              Let's work together
            </a>
            <a href="https://github.com/josemejias11" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[var(--color-surface)] text-[var(--color-text-primary)] font-semibold rounded-full hover:bg-white/5 transition-colors border border-[var(--color-surface-border)]">
              View GitHub
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
