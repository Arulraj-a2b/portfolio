'use client';

import cn from 'classnames';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type Base = { label: string; error?: string; id: string };
type InputProps = Base & { as?: 'input' } & ComponentPropsWithoutRef<'input'>;
type TextareaProps = Base & { as: 'textarea' } & ComponentPropsWithoutRef<'textarea'>;

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps | TextareaProps>(
  function FormField(props, ref) {
    const { label, error, id, className, ...rest } = props;
    const isArea = props.as === 'textarea';
    const control = cn(
      'peer w-full rounded-[var(--radius)] border bg-[var(--glass-2)] px-4 pt-6 pb-2 text-[16px] text-text placeholder-transparent outline-none transition-colors',
      error ? 'border-error' : 'border-[var(--glass-2-border)] focus:border-accent-2',
      isArea ? 'min-h-[140px] resize-y' : 'h-14',
      className,
    );
    return (
      <div className="relative">
        {isArea ? (
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            placeholder={label}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={control}
            {...(rest as ComponentPropsWithoutRef<'textarea'>)}
          />
        ) : (
          <input
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            placeholder={label}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            className={control}
            {...(rest as ComponentPropsWithoutRef<'input'>)}
          />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 text-[11px] uppercase tracking-[0.14em] text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-accent-2"
        >
          {label}
        </label>
        {error && (
          <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12.5px] text-error">
            {error}
          </p>
        )}
      </div>
    );
  },
);
