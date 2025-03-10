"use client";

import type { ReactNode } from 'react';
import { Card } from './Card';

type TrendDirection = 'up' | 'down' | 'neutral';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    direction: TrendDirection;
    value: string;
    label?: string;
  };
  footer?: ReactNode;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  footer,
  className = '',
}: StatCardProps) => {
  const getTrendColor = (direction: TrendDirection) => {
    switch (direction) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-neutral-500 dark:text-neutral-400';
    }
  };

  const getTrendIcon = (direction: TrendDirection) => {
    switch (direction) {
      case 'up':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>Upward trend</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>Downward trend</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>Neutral trend</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
          </svg>
        );
    }
  };

  return (
    <Card className={`${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">{title}</p>
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`${getTrendColor(trend.direction)} flex items-center text-sm`}>
                {getTrendIcon(trend.direction)}
                <span className="ml-1">{trend.value}</span>
              </span>
              {trend.label && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-1">
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className="flex-shrink-0 p-3 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
            {icon}
          </div>
        )}
      </div>
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          {footer}
        </div>
      )}
    </Card>
  );
}; 