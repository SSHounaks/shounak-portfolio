'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface IconButtonProps {
  icon: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function IconButton({
  icon,
  variant = 'default',
  size = 'default',
  children,
  className,
  onClick,
  href,
}: IconButtonProps) {
  const content = (
    <>
      <span className="material-symbols-outlined text-[16px]">{icon}</span>
      {children && <span>{children}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn('inline-block', className)}>
        <Button variant={variant} size={size} asChild>
          <span>{content}</span>
        </Button>
      </a>
    );
  }

  return (
    <Button variant={variant} size={size} onClick={onClick} className={cn('font-mono', className)}>
      {content}
    </Button>
  );
}
