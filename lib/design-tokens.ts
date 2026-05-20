export const colors = {
  background: '#0a0a0a',
  surface: '#131313',
  surfaceDim: '#131313',
  surfaceBright: '#393939',
  surfaceContainerLowest: '#0e0e0e',
  surfaceContainerLow: '#1b1b1b',
  surfaceContainer: '#1f1f1f',
  surfaceContainerHigh: '#2a2a2a',
  surfaceContainerHighest: '#353535',
  onSurface: '#e2e2e2',
  onSurfaceVariant: '#cbc3d7',
  inverseSurface: '#e2e2e2',
  inverseOnSurface: '#303030',
  outline: '#958ea0',
  outlineVariant: '#494454',
  surfaceTint: '#d0bcff',
  primary: '#d0bcff',
  onPrimary: '#3c0091',
  primaryContainer: '#a078ff',
  onPrimaryContainer: '#340080',
  inversePrimary: '#6d3bd7',
  primaryFixed: '#e9ddff',
  primaryFixedDim: '#d0bcff',
  onPrimaryFixed: '#23005c',
  onPrimaryFixedVariant: '#5516be',
  secondary: '#e9c349',
  onSecondary: '#3c2f00',
  secondaryContainer: '#af8d11',
  onSecondaryContainer: '#342800',
  secondaryFixed: '#ffe088',
  secondaryFixedDim: '#e9c349',
  onSecondaryFixed: '#241a00',
  onSecondaryFixedVariant: '#574500',
  tertiary: '#d3bbff',
  onTertiary: '#3f0689',
  tertiaryContainer: '#a37af1',
  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',
  onErrorContainer: '#ffdad6',
  foreground: '#e2e2e2',
  emerald: {
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
  },
} as const;

export const categoryColors = {
  frontend: { text: 'text-amber-400', border: 'border-amber-500/30', bar: 'from-amber-500/60 to-amber-400/80' },
  backend: { text: 'text-cyan-400', border: 'border-cyan-500/30', bar: 'from-cyan-500/60 to-cyan-400/80' },
  devops: { text: 'text-purple-400', border: 'border-purple-500/30', bar: 'from-purple-500/60 to-purple-400/80' },
  security: { text: 'text-rose-400', border: 'border-rose-500/30', bar: 'from-rose-500/60 to-rose-400/80' },
  ai: { text: 'text-emerald-400', border: 'border-emerald-500/30', bar: 'from-emerald-500/60 to-emerald-400/80' },
} as const;

export const spacing = {
  bentoGap: '1.5rem',
  marginMobile: '1rem',
  marginDesktop: '2rem',
  cardPadding: '1.25rem',
  cardPaddingSm: '1rem',
  cardPaddingLg: '1.5rem',
  headerHeight: '2.25rem',
  headerPadding: '0 1rem',
  sidebarWidth: '220px',
} as const;

export const typography = {
  fonts: {
    inter: 'var(--font-inter)',
    sora: 'var(--font-sora)',
    mono: 'font-mono',
  },
  sizes: {
    displayXl: 'text-[42px] md:text-[42px] text-[28px]',
    displayLg: 'text-[32px]',
    heading1: 'text-4xl sm:text-5xl',
    heading2: 'text-2xl',
    heading3: 'text-lg',
    bodyMd: 'text-[16px]',
    bodySm: 'text-[13px]',
    terminalMd: 'text-[12px]',
    terminalSm: 'text-[10px]',
    terminalXs: 'text-[8px]',
  },
} as const;

export const shadows = {
  card: '0 4px 24px -1px rgba(0, 0, 0, 0.5)',
  glow: '0 0 6px rgba(52, 211, 153, 0.6)',
} as const;

export const animations = {
  blink: 'blink 1s step-end infinite',
  jumpOnce: 'jump-once 0.4s ease-out',
  verticalProgress: 'vertical-progress 5s linear infinite',
} as const;

export const glassmorphism = {
  card: {
    background: 'rgba(20, 20, 20, 0.6)',
    backdropFilter: 'blur(12px)',
    borderPrimary: '1px solid rgba(208, 188, 255, 0.2)',
    borderSecondary: '1px solid rgba(233, 195, 73, 0.2)',
    borderRadius: '0.5rem',
  },
} as const;

export const variants = {
  terminalCard: ['primary', 'secondary'] as const,
  callout: ['note', 'info', 'warn', 'error'] as const,
  banner: ['info', 'success', 'warning', 'danger'] as const,
} as const;
