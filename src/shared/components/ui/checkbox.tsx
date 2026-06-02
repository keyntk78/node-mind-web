import * as React from 'react';
import { cn } from '@/shared/lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="inline-flex items-center gap-3 text-sm text-slate-700">
      <input
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border border-slate-300 bg-white text-sky-600 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200',
          className,
        )}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
