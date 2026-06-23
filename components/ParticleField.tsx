'use client';

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  phase: number;
}

const COLORS = ['#38bdf8', '#a78bfa', '#7dd3fc', '#c4b5fd'];
const REPULSE_RADIUS = 120;
const REPULSE_FORCE = 8;
const FRICTION = 0.97;
const DRIFT_SPEED = 0.3;
const PARTICLE_COUNT = 50;

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: 1.5 + Math.random() * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.15 + Math.random() * 0.35,
    phase: Math.random() * Math.PI * 2,
  };
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.clientWidth, canvas.clientHeight)
      );
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener('mousemove', onMove);

    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('mouseleave', onLeave);

    const w = () => canvas.clientWidth;
    const h = () => canvas.clientHeight;

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w(), h());

      for (const p of particles) {
        // Sine drift
        p.vx += Math.sin(t * DRIFT_SPEED + p.phase) * 0.005;
        p.vy += Math.cos(t * DRIFT_SPEED + p.phase * 0.7) * 0.005;

        // Mouse repulsion
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSE_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSE_RADIUS) * REPULSE_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = w() + 10;
        if (p.x > w() + 10) p.x = -10;
        if (p.y < -10) p.y = h() + 10;
        if (p.y > h() + 10) p.y = -10;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none"
      style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '100vw', top: '-15vh', height: 'calc(100% + 30vh)' }}
    />
  );
}
