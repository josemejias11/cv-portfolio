import React from 'react';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Portfolio Projects</h2>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>JDMQADEMO</h3>
        <p className={styles.cardDesc}>
          Full-Stack QA Demo Application demonstrating end-to-end ownership.
        </p>
        <a 
          href="https://github.com/josemejias11/jdmqademo" 
          className={styles.link}
        >
          GitHub Repo
        </a>
      </div>
    </section>
  );
}
