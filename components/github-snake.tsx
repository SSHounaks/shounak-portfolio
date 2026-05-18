'use client';

import { useEffect, useRef } from 'react';

const GRID = 20;
const CELL = 10;
const TICK = 120;

type Pos = { x: number; y: number };

export function GithubSnake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let snake: Pos[] = [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }];
    let food: Pos = { x: 15, y: 10 };
    let dir: Pos = { x: 1, y: 0 };
    let gameOver = false;
    let frame: number;

    function placeFood() {
      const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
      const free: Pos[] = [];
      for (let x = 0; x < GRID; x++)
        for (let y = 0; y < GRID; y++)
          if (!occupied.has(`${x},${y}`)) free.push({ x, y });
      if (free.length === 0) return;
      food = free[Math.floor(Math.random() * free.length)];
    }

    function aiMove() {
      const head = snake[0];
      const candidates: Pos[] = [
        { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 },
      ];
      const valid = candidates.filter((d) => {
        const nx = head.x + d.x;
        const ny = head.y + d.y;
        if (nx < 0 || nx >= GRID || ny < 0 || ny >= GRID) return false;
        return !snake.some((s) => s.x === nx && s.y === ny);
      });
      if (valid.length === 0) { gameOver = true; return; }
      valid.sort((a, b) => {
        const da = Math.abs(head.x + a.x - food.x) + Math.abs(head.y + a.y - food.y);
        const db = Math.abs(head.x + b.x - food.x) + Math.abs(head.y + b.y - food.y);
        return da - db;
      });
      dir = valid[0];
    }

    function tick() {
      if (gameOver) { frame = requestAnimationFrame(tick); return; }

      aiMove();

      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
          snake.some((s) => s.x === head.x && s.y === head.y)) {
        gameOver = true;
      } else {
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          placeFood();
        } else {
          snake.pop();
        }
      }

      draw();
      frame = setTimeout(tick, TICK) as unknown as number;
    }

    const greens = ['#0d4429', '#0f6b31', '#189e4a', '#27d545'];

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, GRID * CELL, GRID * CELL);

      const isHead = (p: Pos) => p.x === snake[0].x && p.y === snake[0].y;

      for (let x = 0; x < GRID; x++) {
        for (let y = 0; y < GRID; y++) {
          const seg = snake.find((s) => s.x === x && s.y === y);
          if (seg) {
            const idx = snake.indexOf(seg);
            const shade = Math.min(Math.floor(idx / snake.length * greens.length), greens.length - 1);
            ctx.fillStyle = isHead(seg) ? '#3bff7f' : greens[shade];
            ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
          } else if (food.x === x && food.y === y) {
            ctx.fillStyle = '#ff4060';
            ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
          } else {
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
          }
        }
      }

      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, GRID * CELL, GRID * CELL);
        ctx.fillStyle = '#27d545';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('// RESTARTING', GRID * CELL / 2, GRID * CELL / 2);
      }
    }

    draw();
    tick();

    return () => clearTimeout(frame);
  }, []);

  return (
    <div className="rounded-lg border border-white/5 overflow-hidden bg-black/20">
      <canvas
        ref={canvasRef}
        width={GRID * CELL}
        height={GRID * CELL}
        className="w-full"
        style={{ aspectRatio: '1/1', imageRendering: 'pixelated' }}
      />
    </div>
  );
}
