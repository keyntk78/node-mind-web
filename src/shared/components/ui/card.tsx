import * as React from 'react';
import { cn } from '@/shared/lib/utils';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'w-full rounded-[2rem] border border-white/50 bg-white/60 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.10)] backdrop-blur-3xl',
        className,
      )}
      {...props}
    />
  );
}
