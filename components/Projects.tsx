import React from 'react';
import ScrollReveal from './ScrollReveal';

export interface ProjectItem {
  title: string;
  desc: string;
  link: string;
  tags: string[];
}

const projects: ProjectItem[] = [
  {
    title: "JDMQADEMO",
    desc: "Full-stack QA demo: TypeScript, React, Express, PostgreSQL, Playwright, Postman, Allure, Docker, GitHub Actions CI.",
    link: "https://github.com/josemejias11/jdmqademo",
    tags: ["TypeScript", "React", "Playwright", "Docker", "Express.js", "CI/CD"]
  },
  {
    title: "QA AUTOMATION STACK",
    desc: "TypeScript WebdriverIO framework with parallel execution, Allure reporting, API/UI/accessibility coverage.",
    link: "https://github.com/josemejias11/qa-auto-stack",
    tags: ["TypeScript", "WebdriverIO", "Allure", "API"]
  },
  {
    title: "DEMOS",
    desc: "Showcasing demos for job applications.",
    link: "https://github.com/josemejias11/demos",
    tags: ["Demos", "Testing"]
  }
];

export default function Projects() {
  return (
    <section className="py-8 border-b border-[var(--color-surface-border)]">
      <ScrollReveal>
        <h2 className="text-3xl font-semibold mb-10 text-[var(--color-text-primary)]">Portfolio Projects</h2>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ScrollReveal key={project.title} delay={0.1 * index}>
            <div className="group bg-[var(--color-surface)] border border-[var(--color-surface-border)] p-8 rounded-[2rem] hover:border-[var(--color-accent-primary)]/50 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-[0_0_30px_rgba(2,132,199,0.1)]">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">{project.title}</h3>
              <p className="text-[var(--color-text-tertiary)] mb-8 flex-grow leading-relaxed">
                {project.desc}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[var(--color-accent-secondary)]/10 text-[var(--color-accent-secondary)] text-xs font-semibold rounded-full border border-[var(--color-accent-secondary)]/20">
                    {tag}
                  </span>
                ))}
              </div>
              
              <a 
                href={project.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-3 bg-[var(--color-background)] text-[var(--color-text-secondary)] font-medium rounded-xl border border-[var(--color-surface-border)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent-primary)] transition-colors mt-auto"
              >
                View Source on GitHub <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
