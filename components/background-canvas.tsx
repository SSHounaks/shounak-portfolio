'use client';

import { useEffect, useRef } from 'react';

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = 0;
    let mouseY = 0;
    let animId: number;
    let started = false;

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

    function start() {
      if (started) return;
      started = true;
      window.addEventListener('resize', resize);
      document.addEventListener('mousemove', onMouseMove);
      resize();
      animId = requestAnimationFrame(draw);
    }

    function stop() {
      started = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
    }

    start();

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) start();
    };
    window.addEventListener('pageshow', onPageShow);

    const onVisibilityChange = () => {
      if (document.hidden) stop(); else start();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stop();
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
