"use client";

import React from 'react';
import type {  ReactNode  } from 'react';
import { Card } from '../ui/Card';

interface FormLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
}

export const FormLayout = ({
  children,
  title,
  description,
  footer,
  className = '',
}: FormLayoutProps) => {
  return (
    <Card className={`max-w-3xl mx-auto ${className}`}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-xl font-medium text-neutral-900 dark:text-white">{title}</h2>}
          {description && (
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div>
        {children}
      </div>
      
      {footer && (
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700">
          {footer}
        </div>
      )}
    </Card>
  );
}; 