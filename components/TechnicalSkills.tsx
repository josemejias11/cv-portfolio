import React from 'react';
import ScrollReveal from './ScrollReveal';

const skillCategories = [
  { category: "Automation", skills: "Playwright (TypeScript), Postman/Newman" },
  { category: "CI/CD & DevOps", skills: "GitHub Actions, Docker, Docker Compose" },
  { category: "Languages", skills: "TypeScript" },
  { category: "Frameworks", skills: "Express.js, Node.js, Playwright" },
  { category: "Test Management", skills: "TestRails, TestLink, Allure reporting, Jira, Test plans — traceability authoring" },
  { category: "Databases", skills: "PostgreSQL, ClickHouse, Elasticsearch" },
  { category: "QA Disciplines", skills: "Functional, Regression, API, WCAG, Cross-browsing, Issues triage" },
  { category: "Tools", skills: "GitHub, CLI, Sublime Text, WebStorm, Azure DevOps, AEM, Adobe CC" }
];

export default function TechnicalSkills() {
  return (
    <section className="py-8 border-b border-[var(--color-surface-border)]">
      <ScrollReveal>
        <h2 className="text-3xl font-semibold mb-8 text-[var(--color-text-primary)]">Technical Skills</h2>
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <div className="bg-[var(--color-surface)] p-8 rounded-[2rem] border border-[var(--color-surface-border)]">
          <div className="space-y-6">
            {skillCategories.map((group, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 border-b border-[var(--color-surface-border)] pb-4 last:border-0 last:pb-0">
                <span className="min-w-[200px] font-bold text-[var(--color-accent-primary)]">{group.category}</span>
                <span className="text-[var(--color-text-secondary)]">{group.skills}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
