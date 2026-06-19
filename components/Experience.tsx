import React from 'react';
import ScrollReveal from './ScrollReveal';

export interface ExperienceItem {
  role: string;
  company: string;
  date: string;
  desc: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "Senior Creative QA",
    company: "Lionbridge (Freelance)",
    date: "Dec 2024 – Present",
    desc: "Delivered QA for localized digital and print creative assets for Lenovo, Vivo, Motorola, and Microsoft. Validated Adobe Experience Manager (AEM) content integration and multilingual website asset delivery. Applied visual regression and brand compliance validation across responsive web environments.",
  },
  {
    role: "Senior QA Specialist",
    company: "dotCMS, USA",
    date: "Aug 2022 – Dec 2024",
    desc: "Implemented Playwright framework from scratch with Docker/GitHub Actions. Identified critical API contract gaps; established data validation strategy using PostgreSQL.",
  },
  {
    role: "Senior QA Specialist",
    company: "Lionbridge, Costa Rica",
    date: "Jun 2018 – Sep 2022",
    desc: "Established QA strategy and process documentation. Owned full QA lifecycle for VEINSA Costa Rica. Managed metadata updates for Adobe AEM platforms.",
  },
  {
    role: "QA Specialist",
    company: "The Hangar Interactive, Costa Rica",
    date: "Oct 2017 – Dec 2017",
    desc: "Validated website updates for Nissan and Infiniti brands, ensuring consistency across brand requirements.",
  },
  {
    role: "QA Engineer",
    company: "Gorilla Logic, Costa Rica",
    date: "Oct 2016 – Aug 2017",
    desc: "Performed responsive QA for SportsLabs client—validated cross-device functionality for US college athletic team websites.",
  },
  {
    role: "QA Analyst",
    company: "Prodigious Latin America, Costa Rica",
    date: "Oct 2013 – Oct 2016",
    desc: "Delivered QA for Whirlpool digital properties. Expanded scope to creative testing, ADA compliance, functional validation for Bank of America.",
  },
  {
    role: "Quality Assurance Engineer",
    company: "Avantica, Costa Rica",
    date: "Mar 2011 – Jul 2013",
    desc: "Executed functional and responsive testing for client Web-based applications; established defect tracking practices.",
  }
];

const skills = [
  'Playwright', 'TypeScript', 'JavaScript', 'Node.js', 'Postman', 'REST/JSON', 
  'PostgreSQL', 'Elasticsearch', 'GitHub Actions', 'Docker', 'CI/CD', 'ADA accessibility'
];

export default function Experience() {
  return (
    <section className="py-8 border-b border-[var(--color-surface-border)]">
      <ScrollReveal>
        <h2 className="text-3xl font-semibold mb-8 text-[var(--color-text-primary)]">Experience</h2>
      </ScrollReveal>
      
      <div className="relative border-l-2 border-[var(--color-surface-border)] ml-3 pl-8 space-y-12 mb-16">
        {experiences.map((exp, index) => (
          <ScrollReveal key={index} delay={0.1 * index}>
            <div className="relative">
              <span className="absolute -left-[41px] top-1.5 w-4 h-4 bg-[var(--color-accent-primary)] rounded-full border-4 border-[var(--color-surface)] shadow-[0_0_15px_var(--color-accent-primary)]"></span>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{exp.role}</h3>
                <span className="text-sm font-medium text-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 px-3 py-1 rounded-full border border-[var(--color-accent-primary)]/20 w-fit">
                  {exp.date}
                </span>
              </div>
              <p className="text-lg font-medium text-[var(--color-text-secondary)] mb-3">{exp.company}</p>
              <p className="text-[var(--color-text-tertiary)] leading-relaxed">{exp.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3}>
        <div className="mt-12 bg-[var(--color-surface)] p-8 rounded-[2rem] border border-[var(--color-surface-border)]">
          <h3 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">Core Competencies</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="px-4 py-2 bg-[var(--color-background)] border border-[var(--color-surface-border)] rounded-full text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)]/50 transition-colors shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
