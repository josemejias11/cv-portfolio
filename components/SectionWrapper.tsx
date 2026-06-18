import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  top: string;
  zIndex: number;
  marginBottom?: string;
}

export default function SectionWrapper({ children, top, zIndex, marginBottom }: SectionWrapperProps) {
  return (
    <div 
      className={`sticky w-full rounded-[2rem] bg-[var(--color-surface)] border border-[var(--color-surface-border)] shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.05)] p-8 md:p-12`}
      style={{ top, zIndex, marginBottom }}
    >
      {children}
    </div>
  );
}
