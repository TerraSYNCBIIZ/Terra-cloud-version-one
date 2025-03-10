"use client";

import type { ReactNode } from 'react';
import { Card } from './Card';

interface ActivityItem {
  id: string;
  content: ReactNode;
  timestamp: string;
  icon?: ReactNode;
  iconColor?: string;
  user?: {
    name: string;
    avatar?: string;
    role?: string;
  };
}

interface ActivityFeedProps {
  title: string;
  activities: ActivityItem[];
  className?: string;
  maxItems?: number;
  showViewAll?: boolean;
  viewAllHref?: string;
  onViewAllClick?: () => void;
}

export const ActivityFeed = ({
  title,
  activities,
  className = '',
  maxItems,
  showViewAll = false,
  viewAllHref,
  onViewAllClick,
}: ActivityFeedProps) => {
  const displayedActivities = maxItems ? activities.slice(0, maxItems) : activities;
  
  return (
    <Card className={className}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{title}</h3>
        
        {showViewAll && (
          viewAllHref ? (
            <a 
              href={viewAllHref} 
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View all
            </a>
          ) : (
            <button 
              type="button"
              onClick={onViewAllClick} 
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View all
            </button>
          )
        )}
      </div>
      
      <div className="space-y-4">
        {displayedActivities.length > 0 ? (
          displayedActivities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              {activity.icon ? (
                <div className={`flex-shrink-0 h-8 w-8 rounded-full ${activity.iconColor || 'bg-primary-100 dark:bg-primary-900'} flex items-center justify-center ${activity.iconColor ? '' : 'text-primary-600 dark:text-primary-400'}`}>
                  {activity.icon}
                </div>
              ) : activity.user?.avatar ? (
                <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
                  <img 
                    src={activity.user.avatar} 
                    alt={`${activity.user.name}'s avatar`} 
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : activity.user?.name ? (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                  {activity.user.name.charAt(0)}
                </div>
              ) : null}
              
              <div className="ml-3 flex-1">
                <div className="text-sm text-neutral-900 dark:text-white">
                  {activity.content}
                </div>
                <div className="mt-1 flex items-center">
                  {activity.user?.name && (
                    <>
                      <span className="text-xs font-medium text-neutral-900 dark:text-white">
                        {activity.user.name}
                      </span>
                      {activity.user.role && (
                        <span className="mx-1 text-xs text-neutral-500 dark:text-neutral-400">
                          • {activity.user.role}
                        </span>
                      )}
                    </>
                  )}
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {activity.user?.name ? '• ' : ''}{activity.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 py-4 text-center">
            No recent activity found.
          </p>
        )}
      </div>
    </Card>
  );
}; 