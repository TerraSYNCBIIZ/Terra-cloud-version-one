"use client";

import React from 'react';
import type {  InputHTMLAttributes  } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const Input = ({
  label,
  helperText,
  error,
  fullWidth = true,
  className = '',
  labelClassName = '',
  inputClassName = '',
  id,
  ...props
}: InputProps) => {
  // Generate a unique ID if none is provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Input border class based on error state
  const borderClass = error 
    ? 'border-error focus:border-error focus:ring-error/25' 
    : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/25';
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className={`form-label block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        className={`form-input block rounded-md shadow-sm ${borderClass} sm:text-sm ${widthClass} ${inputClassName}`}
        {...props}
      />
      
      {(helperText || error) && (
        <p className={`mt-1 text-sm ${error ? 'text-error' : 'text-neutral-500 dark:text-neutral-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}; 