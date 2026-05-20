'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MatrixRainProps {
  className?: string;
  speed?: number;
  fadeOpacity?: number;
}

export function MatrixRain({
  className,
  speed = 1,
  fadeOpacity = 0.05,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (!w || !h) return;
    canvas.width = w * 2;
    canvas.height = h * 2;
    ctx.scale(2, 2);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const fontSize = 10;
    const cols = Math.floor(w / fontSize);
    const drops: number[] = Array.from({ length: cols }, () => Math.floor(Math.random() * -20));

    let frame = requestAnimationFrame(function draw() {
      ctx.fillStyle = `rgba(10,10,10,${fadeOpacity})`;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle =
          drops[i] * 10 > h - 10
            ? 'rgba(52,211,153,0.8)'
            : 'rgba(52,211,153,0.2)';
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speed;
      }
      frame = requestAnimationFrame(draw);
    });

    return () => cancelAnimationFrame(frame);
  }, [speed, fadeOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('w-full h-24 rounded', className)}
    />
  );
}
