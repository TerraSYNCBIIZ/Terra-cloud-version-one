"use client";

import { useState } from 'react';
import Link from 'next/link';
import { NotificationCenter } from '../ui/NotificationCenter';

// Define a type for our mock notifications
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

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Task Assigned',
      message: 'You have been assigned a new task: "Irrigation System Maintenance"',
      timestamp: '10 minutes ago',
      read: false,
      type: 'task',
      link: '/tasks/123',
    },
    {
      id: '2',
      title: 'Equipment Alert',
      message: 'Maintenance due for "John Deere X758 Tractor"',
      timestamp: '2 hours ago',
      read: false,
      type: 'alert',
      link: '/equipment/456',
    },
    {
      id: '3',
      title: 'Property Update',
      message: 'Updates to "North Campus" property have been approved',
      timestamp: 'Yesterday',
      read: true,
      type: 'system',
      link: '/properties/789',
    },
    {
      id: '4',
      title: 'New Message',
      message: 'Michael Williams: "Please check the water pressure in the east zone"',
      timestamp: '2 days ago',
      read: true,
      type: 'message',
    },
  ]);

  // State for user dropdown
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Notification handlers
  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleViewAll = () => {
    // In a real app, this would navigate to a notifications page
    console.log('View all notifications');
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-primary-600 font-bold text-xl">
                  TERRA Cloud
                </Link>
              </div>
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                <Link href="/dashboard" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/properties" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium">
                  Properties
                </Link>
                <Link href="/employees" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium">
                  Employees
                </Link>
                <Link href="/equipment" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium">
                  Equipment
                </Link>
                <Link href="/tasks" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium">
                  Tasks
                </Link>
                <Link href="/reports" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium">
                  Reports
                </Link>
              </nav>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {/* Search button */}
              <button
                type="button"
                className="p-2 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Search"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Notification Center */}
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onClearAll={handleClearAll}
                onViewAll={handleViewAll}
              />

              {/* User menu */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
                  onClick={toggleUserMenu}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <span className="text-sm font-medium">JS</span>
                  </div>
                  <span className="hidden lg:inline-block text-sm font-medium">John Smith</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User dropdown menu */}
                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-900 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        Your Profile
                      </Link>
                      <Link href="/profile/settings" className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        Settings
                      </Link>
                      <div className="border-t border-neutral-200 dark:border-neutral-700" />
                      <button
                        type="button"
                        className="block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                className="p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                aria-label="Open menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm text-neutral-500">
                &copy; {new Date().getFullYear()} TERRA Cloud. All rights reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex justify-center md:justify-end space-x-6">
                <Link href="/terms" className="text-neutral-400 hover:text-neutral-500">
                  Terms
                </Link>
                <Link href="/privacy" className="text-neutral-400 hover:text-neutral-500">
                  Privacy
                </Link>
                <Link href="/contact" className="text-neutral-400 hover:text-neutral-500">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 