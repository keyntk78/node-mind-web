import * as React from 'react';
import { cn } from '@/shared/lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = 'text', ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-2xl border border-white/70 bg-white/70 px-4 text-sm text-slate-950 shadow-sm shadow-slate-900/5 outline-none backdrop-blur-md transition placeholder:text-slate-400 focus:border-sky-300 focus:ring-2 focus:ring-sky-200/70',
        className,
      )}
      {...props}
    />
  );
}
