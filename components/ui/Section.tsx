import cn from 'classnames';
import type { ReactNode } from 'react';

export function Section({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn('section-pad relative', className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}
