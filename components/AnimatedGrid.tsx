'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.08, 0.15, 0.08],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--color-accent-primary)] rounded-full blur-[160px]"
      />
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          opacity: [0.05, 0.12, 0.05],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-[var(--color-accent-secondary)] rounded-full blur-[180px]"
      />
    </div>
  );
}
