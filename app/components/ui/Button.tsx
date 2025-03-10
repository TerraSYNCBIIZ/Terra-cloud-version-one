"use client";

import React from 'react';
import type {  ButtonHTMLAttributes  } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'dark';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'primary':
        return 'btn-primary';
      case 'secondary':
        return 'btn-secondary';
      case 'outline':
        return 'btn-outline';
      case 'dark':
        return 'btn bg-neutral-800 hover:bg-neutral-900 text-white';
      default:
        return 'btn-primary';
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case 'sm':
        return 'text-xs px-3 py-1.5';
      case 'md':
        return 'text-sm px-4 py-2';
      case 'lg':
        return 'text-base px-5 py-2.5';
      default:
        return 'text-sm px-4 py-2';
    }
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${getVariantClasses()} ${getSizeClasses()} ${widthClass} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}; 