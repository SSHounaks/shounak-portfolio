'use client';

import { useEffect, useRef } from 'react';

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = -999;
    let mouseY = -999;
    let animId: number;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dotSpacing = 40;
      const dotRadius = 1.5;
      const cols = Math.ceil(canvas.width / dotSpacing);
      const rows = Math.ceil(canvas.height / dotSpacing);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * dotSpacing;
          const y = j * dotSpacing;

          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 400;

          let opacity = 0.08;
          if (distance < maxDist) {
            opacity = 0.08 + (1 - distance / maxDist) * 0.4;
          }

          ctx.fillStyle = `rgba(208, 188, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    }

    function restart() {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('pageshow', restart);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pageshow', restart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="background-canvas"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#0a0a0a' }}
    />
  );
}
