'use client';

import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export interface TestResult {
  message: string;
  durationMs: number;
}

export default function AutomationLab() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const runTest = async () => {
    if (loading) return;
    setLoading(true);
    setResult(null);
    
    // Simulate an API test run
    setTimeout(() => {
      setResult({
        message: 'All endpoints verified successfully',
        durationMs: 1243
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="py-4">
      <ScrollReveal>
        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-[var(--color-text-primary)]">
          <span className="w-2 h-6 bg-[var(--color-accent-primary)] rounded-sm inline-block animate-pulse"></span>
          Live Automation Lab
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-6">Trigger a live Playwright API test suite directly from your browser to see my framework in action.</p>
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <div className="bg-[#1e1e1e] border border-white/10 rounded-lg overflow-hidden font-mono text-sm shadow-xl">
          <div className="bg-[#2d2d2d] px-4 py-3 flex gap-2 border-b border-black/20">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="p-6 text-[#27c93f] leading-relaxed overflow-x-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <span className="text-[var(--color-accent-primary)] shrink-0">~/jdmqademo$</span>
              <button 
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-white/10" 
                onClick={runTest} 
                disabled={loading}
              >
                {loading ? 'Running npx playwright test...' : 'npm run test:api'}
              </button>
            </div>
            
            {loading && <div className="text-zinc-400 animate-pulse">[Playwright] Running test suite...</div>}
            
            {result && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <br/>
                <div className="text-[#27c93f]">✓ 1 test passed</div>
                <br/>
                <div className="text-zinc-300">
                  <span className="text-[var(--color-accent-primary)]">"result"</span>: {'{'} <br/>
                  &nbsp;&nbsp;<span className="text-[var(--color-accent-primary)]">"status"</span>: <span className="text-yellow-300">"success"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-[var(--color-accent-primary)]">"message"</span>: <span className="text-yellow-300">"{result.message}"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-[var(--color-accent-primary)]">"durationMs"</span>: <span className="text-orange-400">{result.durationMs}</span><br/>
                  {'}'}
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
