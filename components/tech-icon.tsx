import type { CSSProperties } from 'react';
import { techIcon } from '@/lib/tech-icons';
import { cn } from '@/lib/utils';

export function TechIcon({
  tech,
  className,
  label = false,
  color,
  hoverBrand = false,
}: {
  tech: string;
  className?: string;
  label?: boolean;
  color?: string | null;
  hoverBrand?: boolean;
}) {
  const icon = techIcon(tech);
  if (!icon) return null;
  // Firefox rejects a bare hex (color:D4D4D8) on an SVG element and falls back to
  // the inherited colour, so always normalise to #rrggbb here.
  const normalized =
    color && /^[0-9a-f]{3,8}$/i.test(color.trim()) ? `#${color.trim()}` : color;
  const style: CSSProperties | undefined = normalized ? { color: normalized } : undefined;
  return (
    <svg
      viewBox={icon.vb}
      fill="currentColor"
      role={label ? 'img' : undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
      style={style}
      className={cn('shrink-0', className)}
    >
      {label ? <title>{tech}</title> : null}
      <path d={icon.d} />
    </svg>
  );
}
