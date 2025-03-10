"use client";

import React from 'react';
import type {  SelectHTMLAttributes  } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
}

export const Select = ({
  label,
  options,
  placeholder,
  helperText,
  error,
  fullWidth = true,
  className = '',
  labelClassName = '',
  selectClassName = '',
  id,
  ...props
}: SelectProps) => {
  // Generate a unique ID if none is provided
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
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
          htmlFor={selectId} 
          className={`form-label block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      
      <select
        id={selectId}
        className={`form-input block rounded-md shadow-sm ${borderClass} sm:text-sm ${widthClass} ${selectClassName}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled selected={!props.value}>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {(helperText || error) && (
        <p className={`mt-1 text-sm ${error ? 'text-error' : 'text-neutral-500 dark:text-neutral-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}; 