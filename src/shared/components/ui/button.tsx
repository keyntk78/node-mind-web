import * as React from 'react';
import { cn } from '@/shared/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:pointer-events-none disabled:opacity-60',
        variant === 'primary' &&
          'bg-sky-600 text-white shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-500/25',
        variant === 'secondary' &&
          'border border-white/80 bg-white/80 text-slate-900 shadow-sm hover:-translate-y-0.5 hover:bg-white hover:shadow-md',
        variant === 'ghost' &&
          'bg-transparent text-slate-700 hover:bg-white/60',
        size === 'sm' && 'h-11 px-4 text-sm',
        size === 'md' && 'h-12 px-5 text-base',
        size === 'lg' && 'h-14 px-6 text-lg',
        className,
      )}
      {...props}
    />
  );
}
