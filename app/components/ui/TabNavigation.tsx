"use client";

import React from 'react';
import Link from 'next/link';

interface TabItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface TabNavigationProps {
  tabs: TabItem[];
  className?: string;
}

export const TabNavigation = ({ tabs, className = '' }: TabNavigationProps) => {
  return (
    <div className={`border-b border-neutral-200 dark:border-neutral-700 ${className}`}>
      <nav className="flex -mb-px space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`
              whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm
              ${
                tab.isActive
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:border-neutral-600'
              }
            `}
            aria-current={tab.isActive ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}; 