import cn from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none transition-[transform,background-color,border-color,color] duration-300 ease-out active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none';
const variants: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent hover:brightness-110',
  outline: 'border border-[var(--glass-border)] text-text hover:bg-[var(--glass-2)]',
  ghost: 'text-text hover:bg-[var(--glass-2)]',
};
const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[14px]',
  lg: 'h-[52px] px-7 text-[15px]',
};

type ButtonProps = { variant?: Variant; size?: Size } & ComponentPropsWithoutRef<'button'>;
type LinkProps = { variant?: Variant; size?: Size; href: string } & ComponentPropsWithoutRef<'a'>;

export function Button({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...rest} />;
}

export function ButtonLink({ variant = 'primary', size = 'md', className, ...rest }: LinkProps) {
  return <a className={cn(base, variants[variant], sizes[size], className)} {...rest} />;
}
