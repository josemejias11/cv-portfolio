import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.name}>Jose David Mejias Araya</h1>
      <h2 className={styles.title}>Senior Quality Assurance Engineer</h2>
      <p className={styles.summary}>
        Senior QA with 14 years of experience and a strong bias toward automation engineering.
      </p>
    </section>
  );
}
