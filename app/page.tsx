import React from 'react';
import styles from './page.module.css';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import AutomationLab from '../components/AutomationLab';

export default function Page() {
  return (
    <main className={styles.main}>
      <Hero />
      <Experience />
      <Projects />
      <AutomationLab />
    </main>
  );
}
