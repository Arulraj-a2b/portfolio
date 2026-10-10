import cn from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

export function IconLink({ className, label, ...rest }: { label: string } & ComponentPropsWithoutRef<'a'>) {
  return (
    <a
      aria-label={label}
      title={label}
      target={rest.href?.startsWith('http') ? '_blank' : undefined}
      rel={rest.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] text-muted transition-[color,background-color,transform] duration-300 hover:text-text hover:bg-[var(--glass-2)] hover:-translate-y-0.5',
        className,
      )}
      {...rest}
    />
  );
}
