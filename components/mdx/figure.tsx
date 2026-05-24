'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const sizeClasses = {
  small: 'max-w-sm mx-auto',
  medium: 'max-w-2xl mx-auto',
  large: 'max-w-none',
};

interface FigureProps {
  src?: string;
  alt?: string;
  caption?: string;
  children?: ReactNode;
  className?: string;
  size?: keyof typeof sizeClasses;
}

export function Figure({ src, alt, caption, children, className, size = 'large' }: FigureProps) {
  const [open, setOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  const content = children || (
    <img
      src={src}
      alt={alt || ''}
      className="w-full h-auto object-contain max-h-[500px]"
    />
  );

  const expandedContent = children || (
    <img
      src={src}
      alt={alt || ''}
      className="max-w-full h-auto shadow-2xl align-middle"
    />
  );

  return (
    <>
      <figure className={cn('my-6 group', sizeClasses[size], className)}>
        <div
          className="relative overflow-hidden rounded-lg border border-zinc-800 cursor-pointer bg-zinc-950/50 flex items-center justify-center"
          onClick={() => setOpen(true)}
        >
          {content}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center pointer-events-none">
            <ZoomIn className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-white size-8 drop-shadow-lg" />
          </div>
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-xs text-zinc-500 font-mono">
            // {caption}
          </figcaption>
        )}
      </figure>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center overflow-auto min-h-full"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            className="fixed top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/60 hover:text-white hover:bg-black/70 transition-all cursor-pointer"
            aria-label="Close expanded view"
          >
            <X className="size-6" />
          </button>
          <div
            className="p-4 leading-none"
            onClick={(e) => e.stopPropagation()}
          >
            {expandedContent}
          </div>
        </div>
      )}
    </>
  );
}
