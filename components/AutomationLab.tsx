'use client';

import React, { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

export interface Step {
  name: string;
  status: string;
  conclusion: string | null;
}

export default function AutomationLab() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [runUrl, setRunUrl] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  
  // We use a ref to track if we should continue polling
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const startPolling = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    
    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch('/api/tests/status');
        const data = await res.json();
        
        if (data.error) {
          setError(data.error);
          stopPolling();
          setLoading(false);
          return;
        }

        if (data.status === 'no_runs') return;

        setRunUrl(data.url);
        setSteps(data.steps || []);

        if (data.status === 'completed') {
          setCompleted(true);
          setLoading(false);
          stopPolling();
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000);
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopPolling();
  }, []);

  const runTest = async () => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    setCompleted(false);
    setSteps([]);
    setRunUrl(null);
    
    try {
      const res = await fetch('/api/tests/trigger', { method: 'POST' });
      const data = await res.json();
      
      if (!res.ok || data.error) {
        setError(data.error || 'Failed to trigger workflow');
        setLoading(false);
        return;
      }
      
      // Give GitHub a second to register the workflow run
      setTimeout(() => {
        startPolling();
      }, 2000);
      
    } catch (err) {
      setError('Network error triggering workflow');
      setLoading(false);
    }
  };

  return (
    <div className="py-4">
      <ScrollReveal>
        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-[var(--color-text-primary)]">
          <span className="w-2 h-6 bg-[var(--color-accent-primary)] rounded-sm inline-block animate-pulse"></span>
          Live Automation Lab
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-6">Trigger a live Playwright UI test suite on GitHub Actions to see a live demo in action.</p>
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <div className="bg-[#1e1e1e] border border-white/10 rounded-lg overflow-hidden font-mono text-sm shadow-xl">
          <div className="bg-[#2d2d2d] px-4 py-3 flex gap-2 border-b border-black/20">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="p-6 text-[#27c93f] leading-relaxed overflow-x-auto min-h-[300px]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <span className="text-[var(--color-accent-primary)] shrink-0">~/cv-portfolio$</span>
              <button 
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-white/10" 
                onClick={runTest} 
                disabled={loading}
              >
                {loading ? 'Executing on GitHub Actions...' : 'Run Remote Playwright Tests'}
              </button>
            </div>
            
            {error && <div className="text-red-400 mt-4">Error: {error}</div>}
            
            {loading && steps.length === 0 && !error && (
              <div className="text-zinc-400 animate-pulse mt-4">[GitHub] Triggering workflow & allocating runner...</div>
            )}
            
            {(steps.length > 0 || completed) && (
              <div className="mt-6 flex flex-col gap-2">
                {steps.filter(s => s.name !== 'Set up job' && s.name !== 'Complete job').map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-zinc-500">[GitHub]</span>
                    <span className="text-zinc-300">Step: {step.name}</span>
                    <span className="flex-1"></span>
                    {step.status === 'completed' ? (
                      <span className={step.conclusion === 'success' ? 'text-green-400' : 'text-red-400'}>
                        {step.conclusion === 'success' ? '✓ Done' : '✗ Failed'}
                      </span>
                    ) : (
                      <span className="text-yellow-400 animate-pulse">In Progress...</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {completed && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 mt-8 border-t border-white/10 pt-4">
                <div className="text-[#27c93f] font-bold mb-2">✓ Test Suite Finished</div>
                {runUrl && (
                  <a 
                    href={runUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    View full execution logs & video artifacts on GitHub →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
