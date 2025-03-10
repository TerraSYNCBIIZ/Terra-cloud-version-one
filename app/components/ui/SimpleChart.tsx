"use client";

import React from 'react';
import { Card } from './Card';

interface ChartDataItem {
  label: string;
  value: number;
  color?: string;
}

interface SimpleChartProps {
  title: string;
  data: ChartDataItem[];
  type?: 'bar' | 'horizontal-bar';
  className?: string;
  height?: number;
  showLegend?: boolean;
  maxValue?: number;
}

export const SimpleChart = ({
  title,
  data,
  type = 'bar',
  className = '',
  height = 200,
  showLegend = true,
  maxValue,
}: SimpleChartProps) => {
  // Calculate the maximum value for scaling
  const calculatedMax = maxValue || Math.max(...data.map(item => item.value)) * 1.1;
  
  // Add console logging for debugging
  console.log(`Chart: ${title}`, {
    type,
    data,
    calculatedMax,
    height
  });
  
  const getDefaultColor = (index: number) => {
    const colors = [
      'bg-primary-500',
      'bg-secondary-500',
      'bg-success-500',
      'bg-warning-500',
      'bg-error-500',
      'bg-info-500',
      'bg-primary-600',
      'bg-secondary-600',
      'bg-primary-700',
      'bg-secondary-700',
    ];
    return colors[index % colors.length];
  };

  // Convert old color format to new format if needed
  const getCompatibleColor = (color?: string) => {
    if (!color) return undefined;
    
    // Map old color names to new names
    const colorMap: Record<string, string> = {
      'bg-success': 'bg-success-500',
      'bg-warning': 'bg-warning-500',
      'bg-error': 'bg-error-500',
      'bg-info': 'bg-info-500',
    };
    
    return colorMap[color] || color;
  };

  const renderBarChart = () => (
    <div className="mt-4" style={{ height: `${height}px`, minHeight: '200px' }}>
      <div className="flex h-full items-end space-x-2">
        {data.map((item, index) => {
          const percentage = (item.value / calculatedMax) * 100;
          const color = getCompatibleColor(item.color) || getDefaultColor(index);
          
          // Ensure a minimum height for visibility
          const displayHeight = Math.max(percentage, 1);
          
          return (
            <div key={item.label} className="flex-1 flex flex-col items-center h-full">
              <div className="flex-1 w-full flex items-end">
                <div 
                  className={`w-full ${color} rounded-t`}
                  style={{ height: `${displayHeight}%` }}
                  aria-label={`${item.label}: ${item.value}`}
                  role="graphics-symbol"
                  data-value={item.value}
                  data-percentage={percentage}
                />
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 w-full text-center truncate" title={item.label}>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderHorizontalBarChart = () => (
    <div className="mt-4" style={{ height: `${height}px` }}>
      <div className="flex flex-col h-full justify-between space-y-2">
        {data.map((item, index) => {
          const percentage = (item.value / calculatedMax) * 100;
          const color = getCompatibleColor(item.color) || getDefaultColor(index);
          
          return (
            <div key={item.label} className="flex items-center space-x-2 w-full">
              <div className="w-24 text-xs text-neutral-600 dark:text-neutral-400 truncate" title={item.label}>
                {item.label}
              </div>
              <div className="flex-1 h-6 bg-neutral-100 dark:bg-neutral-800 rounded">
                <div 
                  className={`h-full ${color} rounded`}
                  style={{ width: `${percentage}%` }}
                  aria-label={`${item.label}: ${item.value}`}
                  role="graphics-symbol"
                />
              </div>
              <div className="w-10 text-xs text-neutral-600 dark:text-neutral-400 text-right">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderLegend = () => (
    <div className="flex flex-wrap mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
      {data.map((item, index) => {
        const color = getCompatibleColor(item.color) || getDefaultColor(index);
        
        return (
          <div key={item.label} className="flex items-center mr-4 mb-2">
            <div className={`w-3 h-3 rounded-sm ${color}`} />
            <span className="text-xs text-neutral-600 dark:text-neutral-400 ml-1">
              {item.label}: {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <Card className={className}>
      <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{title}</h3>
      
      {type === 'bar' ? renderBarChart() : renderHorizontalBarChart()}
      
      {showLegend && renderLegend()}
    </Card>
  );
}; 