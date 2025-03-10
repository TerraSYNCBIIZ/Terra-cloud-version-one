"use client";

import React from 'react';
import type {  TextareaHTMLAttributes  } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  labelClassName?: string;
  textareaClassName?: string;
  rows?: number;
}

export const Textarea = ({
  label,
  helperText,
  error,
  fullWidth = true,
  className = '',
  labelClassName = '',
  textareaClassName = '',
  rows = 4,
  id,
  ...props
}: TextareaProps) => {
  // Generate a unique ID if none is provided
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Textarea border class based on error state
  const borderClass = error 
    ? 'border-error focus:border-error focus:ring-error/25' 
    : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/25';
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label 
          htmlFor={textareaId} 
          className={`form-label block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        rows={rows}
        className={`form-input block rounded-md shadow-sm ${borderClass} sm:text-sm ${widthClass} ${textareaClassName}`}
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