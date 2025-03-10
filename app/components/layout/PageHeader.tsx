"use client";

import React from 'react';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  subtitle,
  children,
  className = '',
}: PageHeaderProps) => {
  return (
    <div className={`md:flex md:items-center md:justify-between mb-8 ${className}`}>
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold leading-7 text-neutral-900 dark:text-white sm:text-3xl sm:truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </p>
        )}
      </div>
      
      {children && (
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {children}
        </div>
      )}
    </div>
  );
}; 