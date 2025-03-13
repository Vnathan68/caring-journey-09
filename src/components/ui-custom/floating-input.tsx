
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  className?: string;
  containerClassName?: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  id,
  error,
  className,
  containerClassName,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value !== undefined && props.value !== '';

  return (
    <div className={cn('relative mb-6', containerClassName)}>
      <input
        id={id}
        className={cn(
          'peer h-14 w-full rounded-lg border bg-transparent px-4 pt-6 pb-2 text-foreground transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-clinic-500/30 focus:border-clinic-500',
          error ? 'border-destructive focus:border-destructive focus:ring-destructive/30' : 'border-border',
          'placeholder:opacity-0',
          className
        )}
        placeholder={label}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          'absolute left-4 top-1/2 flex h-full origin-[0] -translate-y-1/2 transform cursor-text text-muted-foreground transition-all duration-200',
          (isFocused || hasValue) && 'top-4 -translate-y-3/4 scale-75 text-sm font-medium',
          isFocused && !error && 'text-clinic-600',
          error && 'text-destructive'
        )}
      >
        {label}
      </label>
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default FloatingInput;
