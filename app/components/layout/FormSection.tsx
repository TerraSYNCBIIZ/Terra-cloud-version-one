"use client";

import React from 'react';
import type {  ReactNode  } from 'react';

interface FormSectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const FormSection = ({
  children,
  title,
  description,
  className = '',
}: FormSectionProps) => {
  return (
    <div className={`mb-8 ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{title}</h3>}
          {description && (
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}; 