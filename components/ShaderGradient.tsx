'use client';

import React, { useRef, useEffect } from 'react';

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  vec2 c1 = vec2(0.3 + 0.18 * sin(u_time * 0.15 + 1.0), 0.5 + 0.18 * cos(u_time * 0.2 + 0.5));
  vec2 c2 = vec2(0.7 + 0.15 * cos(u_time * 0.18 + 2.0), 0.4 + 0.15 * sin(u_time * 0.22 + 1.5));
  vec2 c3 = vec2(0.5 + 0.12 * sin(u_time * 0.12 + 3.0), 0.65 + 0.12 * cos(u_time * 0.17 + 2.5));

  float r1 = 0.38, r2 = 0.32, r3 = 0.28;
  float b1 = exp(-dot(uv - c1, uv - c1) / (2.0 * r1 * r1));
  float b2 = exp(-dot(uv - c2, uv - c2) / (2.0 * r2 * r2));
  float b3 = exp(-dot(uv - c3, uv - c3) / (2.0 * r3 * r3));

  vec3 sky = vec3(0.22, 0.74, 0.97);
  vec3 violet = vec3(0.65, 0.54, 0.98);
  float total = b1 + b2 + b3 + 0.001;
  vec3 color = (b1 * sky + b2 * violet + b3 * mix(sky, violet, 0.5)) / total;
  float alpha = smoothstep(0.08, 0.6, b1 + b2 + b3) * 0.35;

  gl_FragColor = vec4(color, alpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function ShaderGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const t0 = performance.now();
    const draw = () => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
