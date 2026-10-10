import cn from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';

export function GlassCard({
  inner,
  className,
  ...rest
}: { inner?: boolean } & ComponentPropsWithoutRef<'div'>) {
  return <div className={cn(inner ? 'glass-2' : 'glass', className)} {...rest} />;
}
