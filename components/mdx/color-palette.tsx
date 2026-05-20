import { cn } from '@/lib/utils';

interface ColorSwatch {
  name: string;
  hex: string;
}

interface ColorPaletteProps {
  colors: ColorSwatch[];
  className?: string;
}

export function ColorPalette({ colors, className }: ColorPaletteProps) {
  return (
    <div className={cn('font-mono my-6', className)}>
      <div className="flex items-center gap-2 mb-3 text-[10px] text-zinc-500 uppercase tracking-widest">
        <span className="text-emerald-500/60">//</span>
        <span>Color Palette</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {colors.map(({ name, hex }) => (
          <div
            key={name}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 p-2 hover:border-zinc-700 transition-colors"
          >
            <div
              className="w-8 h-8 rounded border border-zinc-700 flex-shrink-0"
              style={{ backgroundColor: hex }}
            />
            <div className="min-w-0">
              <div className="text-[10px] text-zinc-400 truncate">{name}</div>
              <div className="text-[9px] text-zinc-600">{hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
