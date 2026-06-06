'use client';

import { Sparkline } from './sparkline';

// Hardcoded latency pattern charts for the observability blog post.
// Prop-free client components avoid RSC serialization issues with array literals.

export function SparklineSpike() {
  return <Sparkline data={[40, 38, 42, 39, 41, 40, 38, 96, 92, 40, 39, 41, 40]} color="#f59e0b" />;
}

export function SparklineStep() {
  return <Sparkline data={[35, 37, 36, 38, 36, 37, 78, 81, 79, 82, 80, 81, 79]} color="#ef4444" />;
}

export function SparklineCreep() {
  return <Sparkline data={[28, 31, 35, 40, 46, 53, 62, 72, 84, 97, 112, 128, 145]} color="#8b5cf6" />;
}
