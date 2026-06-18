'use client';

import React, { useState } from 'react';
import styles from './AutomationLab.module.css';

export default function AutomationLab() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ message: string; durationMs: number } | null>(null);

  const runTest = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/run-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: 'api' })
      });
      const data = await response.json();
      setResult({
        message: data.message,
        durationMs: data.durationMs
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Automation Lab</h2>
      <button className={styles.button} onClick={runTest} disabled={loading}>
        {loading ? 'Running tests...' : 'Run API Test'}
      </button>
      
      {loading && <p>Running tests...</p>}
      
      {result && (
        <div className={styles.results}>
          <p>{result.message}</p>
          <p>{result.durationMs}</p>
        </div>
      )}
    </div>
  );
}
