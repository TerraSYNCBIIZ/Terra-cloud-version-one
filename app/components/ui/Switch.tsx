"use client";

import React from 'react';
import type {  useState  } from 'react';

interface SwitchProps {
  id: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  id,
  defaultChecked = false,
  onChange,
  disabled = false,
  className = '',
}: SwitchProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = () => {
    if (disabled) return;
    
    const newChecked = !checked;
    setChecked(newChecked);
    
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
        checked ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={handleChange}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
} 