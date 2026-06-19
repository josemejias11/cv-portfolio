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
    desc: "Delivered creative QA for localized digital and print assets for Lenovo, Vivo, Motorola. Validated Adobe Experience Manager (AEM) content integration and multilingual asset delivery for Microsoft. Brand compliance validation across responsive web environments.",
  },
  {
    role: "Senior QA Specialist",
    company: "dotCMS, USA",
    date: "Aug 2022 – Dec 2024",
    desc: "Hands-on experience automation strategy on an enterprise headless CMS platform. Maintained Playwright test cases using TypeScript, executing in CI via Docker + GitHub Actions. API testing with Postman and custom scripts across multiple environments. Executed manual test cycles, cross-browser compatibility validation (macOS, Windows), and release regression using Docker containerization. Performed PostgreSQL queries for backend data consistency; assisted by engineering. Managed full defect lifecycle in TCMS; authored test plans, traceability matrices, and release documentation. Improved defect triage processes and defined QA strategy for functional and non-functional testing.",
  },
  {
    role: "Senior QA Specialist",
    company: "Lionbridge, Costa Rica",
    date: "Jun 2018 – Sep 2022",
    desc: " Creative QA for enterprise brands including Microsoft, Lenovo, Vivo, and Motorola. Validated AEM integrations, multilingual assets, and SEO - Metadata deliverables. Conducted functional, and accessibility testing for web and mobile applications. Built and maintained a QA structure documentation across global functional teams.",
  },
  {
    role: "QA Specialist",
    company: "The Hangar Interactive, Costa Rica",
    date: "Oct 2017 – Dec 2017",
    desc: "Validated website updates for Nissan and Infiniti brands, ensuring consistency across brand requirements. SEO auditing, and cross-browser/device compatibility validation compatibility validation",
  },
  {
    role: "QA Engineer",
    company: "Gorilla Logic, Costa Rica",
    date: "Oct 2016 – Aug 2017",
    desc: "Performed responsive testing QA for SportsLabs client and validated cross-device functionality for US college athletic team websites. Maintained full test documentation and traceability",
  },
  {
    role: "QA Analyst",
    company: "Prodigious Latin America, Costa Rica",
    date: "Oct 2013 – Oct 2016",
    desc: "Delivered QA for Whirlpool digital properties. Expanded scope to creative testing, ADA compliance, functional validation for Bank of America. Estimated coverage, executed functional test suites, and coached junior QA staff. WCAG standards to ensure websites are fully accessible to people with disabilities",
  },
  {
    role: "Quality Assurance Engineer",
    company: "Avantica, Costa Rica",
    date: "Mar 2011 – Jul 2013",
    desc: "Executed functional and responsive testing for client Web-based applications and defect tracking. Created QA tests scenarios for responsive and mobile native applications. Complete SLTC in Agile scrum workflows",
  }
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
              <ul className="text-[var(--color-text-tertiary)] leading-relaxed list-disc pl-5 space-y-1">
                {exp.desc.split('.').filter(d => d.trim().length > 0).map((sentence, i) => (
                  <li key={i}>{sentence.trim()}.</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

    </section>
  );
}
