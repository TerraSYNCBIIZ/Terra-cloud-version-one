"use client";

import type { ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  className?: string;
}

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  rounded = false,
  className = '',
}: BadgeProps) => {
  // Define variant styles
  const variantClasses = {
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
    secondary: 'bg-secondary-50 text-secondary-600 dark:bg-secondary-900/20 dark:text-secondary-400',
    success: 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400',
    error: 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400',
    info: 'bg-info-100 text-info-800 dark:bg-info-900/20 dark:text-info-400',
    neutral: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300',
  };

  // Define size styles
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1',
  };

  // Determine rounded style
  const roundedClass = rounded ? 'rounded-full' : 'rounded-md';

  // Combine all classes
  const combinedClasses = `inline-flex items-center font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClass} ${className}`;

  return <span className={combinedClasses}>{children}</span>;
}; 