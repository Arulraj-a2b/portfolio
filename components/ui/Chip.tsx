import cn from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

type Props = { active?: boolean; tone?: 'default' | 'tech' } & ComponentPropsWithoutRef<'span'>;

export function Chip({ active, tone = 'default', className, ...rest }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[12px] leading-5 whitespace-nowrap transition-colors duration-300',
        active
          ? 'bg-accent text-on-accent border-transparent'
          : tone === 'tech'
            ? 'bg-[var(--glass-2)] border-[var(--glass-2-border)] text-text'
            : 'border-[var(--glass-border)] text-muted',
        className,
      )}
      {...rest}
    />
  );
}

export function ChipButton({ active, className, ...rest }: { active?: boolean } & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'inline-flex h-9 items-center rounded-full border px-4 text-[13px] whitespace-nowrap transition-colors duration-300',
        active ? 'bg-accent text-on-accent border-transparent' : 'border-[var(--glass-border)] text-muted hover:text-text',
        className,
      )}
      {...rest}
    />
  );
}
