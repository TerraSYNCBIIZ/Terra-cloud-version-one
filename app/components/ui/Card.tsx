"use client";

import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}: CardProps) => {
  // Set up variant classes
  const variantClasses = {
    default: 'bg-white dark:bg-neutral-800',
    primary: 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800',
    secondary: 'bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-200 dark:border-secondary-800',
  };

  // Set up padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  // Combine classes
  const baseClasses = 'rounded-lg shadow-soft-md';
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;

  return <div className={combinedClasses}>{children}</div>;
}; 