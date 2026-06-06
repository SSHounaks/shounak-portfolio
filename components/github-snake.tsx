'use client';

import { useEffect, useRef } from 'react';

const COLS = 30;
const ROWS = 5;
const CELL = 10;
const TICK = 120;

type Pos = { x: number; y: number };

export function GithubSnake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colsRef = useRef(COLS);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (parent) {
      const w = parent.clientWidth;
      const c = Math.floor(w / CELL);
      colsRef.current = c;
      canvas.width = c * CELL;
      canvas.height = ROWS * CELL;
    }

    let snake: Pos[] = [{ x: 8, y: 2 }, { x: 7, y: 2 }, { x: 6, y: 2 }];
    let food: Pos = { x: 20, y: 2 };
    let dir: Pos = { x: 1, y: 0 };
    let gameOver = false;
    let frame: number;
    let restartTimer: number | undefined;

    function placeFood() {
      const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
      const free: Pos[] = [];
      for (let x = 0; x < colsRef.current; x++)
        for (let y = 0; y < ROWS; y++)
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
        if (nx < 0 || nx >= colsRef.current || ny < 0 || ny >= ROWS) return false;
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

    function resetGame() {
      clearTimeout(frame);
      clearTimeout(restartTimer);
      restartTimer = undefined;
      snake = [{ x: 8, y: 2 }, { x: 7, y: 2 }, { x: 6, y: 2 }];
      food = { x: 20, y: 2 };
      dir = { x: 1, y: 0 };
      gameOver = false;
    }

    function scheduleRestart() {
      clearTimeout(restartTimer);
      restartTimer = window.setTimeout(() => {
        resetGame();
        draw();
        tick();
      }, 5000);
    }

    function tick() {
      if (gameOver) {
        draw();
        if (restartTimer === undefined) scheduleRestart();
        return;
      }

      aiMove();

      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (head.x < 0 || head.x >= colsRef.current || head.y < 0 || head.y >= ROWS ||
          snake.some((s) => s.x === head.x && s.y === head.y)) {
        gameOver = true;
        draw();
        scheduleRestart();
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        placeFood();
      } else {
        snake.pop();
      }

      draw();
      frame = window.setTimeout(tick, TICK);
    }

    const greens = ['#0d4429', '#0f6b31', '#189e4a', '#27d545'];

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, colsRef.current * CELL, ROWS * CELL);

      const isHead = (p: Pos) => p.x === snake[0].x && p.y === snake[0].y;

      for (let x = 0; x < colsRef.current; x++) {
        for (let y = 0; y < ROWS; y++) {
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
        ctx.fillRect(0, 0, colsRef.current * CELL, ROWS * CELL);
        ctx.fillStyle = '#27d545';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('// RESTARTING', colsRef.current * CELL / 2, ROWS * CELL / 2);
      }
    }

    function restart() {
      resetGame();
      draw();
      tick();
    }

    window.addEventListener('pageshow', restart);
    draw();
    tick();

    return () => {
      clearTimeout(frame);
      clearTimeout(restartTimer);
      window.removeEventListener('pageshow', restart);
    };
  }, []);

  return (
    <div className="rounded-lg border border-white/5 hover:border-red-500/40 bg-black/20 overflow-hidden transition-colors duration-300">
      <div className="p-3">
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          className="w-full"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
}
