"use client";

import { useState } from 'react';
import { Badge } from './Badge';

type NotificationType = 'task' | 'system' | 'alert' | 'message';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: NotificationType;
  link?: string;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onViewAll: () => void;
  className?: string;
}

export const NotificationCenter = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onViewAll,
  className = '',
}: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    
    if (notification.link) {
      // In a real app, this might use a router for navigation
      window.location.href = notification.link;
    }
  };

  const handleNotificationKeyDown = (e: React.KeyboardEvent, notification: Notification) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNotificationClick(notification);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'task':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>Task notification</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>Alert notification</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'message':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>Message notification</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
            <title>System notification</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'task':
        return 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400';
      case 'alert':
        return 'bg-error/10 text-error';
      case 'message':
        return 'bg-info/10 text-info';
      default:
        return 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell Icon */}
      <button
        type="button"
        onClick={toggleOpen}
        className="relative p-2 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-expanded={isOpen}
      >
        <span className="sr-only">View notifications</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-error text-white text-xs font-medium flex items-center justify-center transform -translate-y-1/4 translate-x-1/4">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-neutral-900 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-2 px-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Notifications</h3>
            <div className="flex space-x-2">
              <button
                type="button"
                className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                onClick={onMarkAllAsRead}
              >
                Mark all as read
              </button>
              <span className="text-neutral-300 dark:text-neutral-600">|</span>
              <button
                type="button"
                className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                onClick={onClearAll}
              >
                Clear all
              </button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="py-2">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    className={`px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer ${notification.read ? '' : 'bg-neutral-50 dark:bg-neutral-800/50'}`}
                    onClick={() => handleNotificationClick(notification)}
                    onKeyDown={(e) => handleNotificationKeyDown(e, notification)}
                    aria-label={`Notification: ${notification.title}`}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full ${getNotificationColor(notification.type)} flex items-center justify-center`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <Badge variant="primary" size="sm" rounded>New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 text-center text-neutral-500 dark:text-neutral-400">
                <svg className="mx-auto h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <p>No notifications</p>
              </div>
            )}
          </div>
          
          <div className="py-2 px-4 border-t border-neutral-200 dark:border-neutral-700 text-center">
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              onClick={onViewAll}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 