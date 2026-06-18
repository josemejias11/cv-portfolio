import React from 'react';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section className={styles.experience}>
      <h2>Experience</h2>
      <ul className={styles.timeline}>
        <li>Lionbridge - Senior Creative QA Engineer</li>
        <li>dotCMS - Senior QA Specialist</li>
      </ul>
      <div>
        <h3>Skills</h3>
        <p>Playwright, TypeScript, React</p>
      </div>
    </section>
  );
}
