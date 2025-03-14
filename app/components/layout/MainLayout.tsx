"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NotificationCenter } from '../ui/NotificationCenter';
import { useAuth } from '../../context/AuthContext';
import { RoleSwitcher } from '../ui/RoleSwitcher';

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

interface TabPosition {
  left: number;
  width: number;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, logout, isAdmin, isManager, isFieldTechnician } = useAuth();
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lastPositionRef = useRef<TabPosition | null>(null);
  
  // Navigation links based on user role
  const getNavLinks = () => {
    // Common links for all roles
    const links = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: isFieldTechnician() ? "/technician-dashboard" : "/dashboard", 
      }
    ];

    if (isFieldTechnician()) {
      // Field technician specific links
      links.push(
        {
          id: 'properties',
          label: 'Property',
          href: `/properties/${user?.assignedPropertyIds?.[0]}`,
        },
        {
          id: 'equipment',
          label: 'Equipment',
          href: "/equipment/assigned",
        },
        {
          id: 'tasks',
          label: 'Tasks',
          href: "/tasks/assigned",
        }
      );
    } else {
      // Admin and Manager links
      links.push(
        {
          id: 'properties',
          label: 'Properties',
          href: "/properties",
        },
        {
          id: 'employees',
          label: 'Employees',
          href: "/employees",
        },
        {
          id: 'equipment',
          label: 'Equipment',
          href: "/equipment",
        },
        {
          id: 'tasks',
          label: 'Tasks',
          href: "/tasks",
        }
      );

      // Reports only for admin and manager
      if (isAdmin() || isManager()) {
        links.push({
          id: 'reports',
          label: 'Reports',
          href: "/reports",
        });
      }
    }

    return links;
  };
  
  // Determine active tab from current path - wrapped in useCallback to prevent recreation on every render
  const determineActiveTab = useCallback(() => {
    if (!pathname) return 'dashboard';
    
    if (pathname.includes('dashboard')) return 'dashboard';
    if (pathname.includes('properties')) return 'properties';
    if (pathname.includes('employees')) return 'employees';
    if (pathname.includes('equipment')) return 'equipment';
    if (pathname.includes('tasks')) return 'tasks';
    if (pathname.includes('reports')) return 'reports';
    
    return 'dashboard';
  }, [pathname]);
  
  // State for active tab - updated whenever pathname changes
  const [activeTab, setActiveTab] = useState(determineActiveTab);
  
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
  
  // Initialize the indicator position on first render and handle resize
  useEffect(() => {
    // On first render, position the indicator without animation
    if (indicatorRef.current) {
      indicatorRef.current.style.transition = 'none';
      updateIndicatorPosition(true);
      // Force reflow to ensure the transition style is applied
      void indicatorRef.current.offsetWidth;
      indicatorRef.current.style.transition = '';
    }
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle resize events - update indicator without animation
  const handleResize = () => {
    if (indicatorRef.current) {
      indicatorRef.current.style.transition = 'none';
      updateIndicatorPosition(true);
      // Force reflow to ensure the transition style is applied
      void indicatorRef.current.offsetWidth;
      indicatorRef.current.style.transition = '';
    }
  };
  
  // Update active tab whenever the pathname changes
  useEffect(() => {
    const newActiveTab = determineActiveTab();
    if (newActiveTab !== activeTab) {
      setActiveTab(newActiveTab);
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        updateIndicatorPosition();
      });
    }
  }, [determineActiveTab, activeTab]);
  
  // Function to update the indicator position based on the active tab
  const updateIndicatorPosition = (skipTransition = false) => {
    if (!navRef.current || !indicatorRef.current) return;
    
    const navElement = navRef.current;
    const activeElement = navElement.querySelector('.modern-tab.active') as HTMLElement;
    
    if (activeElement) {
      const { left: navLeft } = navElement.getBoundingClientRect();
      const { left: activeLeft, width: activeWidth } = activeElement.getBoundingClientRect();
      
      // Calculate the left position relative to the nav container
      const leftPosition = activeLeft - navLeft;
      const newPosition = { left: leftPosition, width: activeWidth };
      
      // If we have a stored previous position and not skipping transition,
      // use that for a smooth animation
      if (lastPositionRef.current && !skipTransition) {
        const { left: prevLeft, width: prevWidth } = lastPositionRef.current;
        
        // Apply the transition
        indicatorRef.current.style.transform = `translateX(${leftPosition}px)`;
        indicatorRef.current.style.width = `${activeWidth}px`;
      } else {
        // No previous position or skipping transition, just set the new position directly
        indicatorRef.current.style.transform = `translateX(${leftPosition}px)`;
        indicatorRef.current.style.width = `${activeWidth}px`;
      }
      
      // Store the new position for next time
      lastPositionRef.current = newPosition;
    }
  };

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

  // Handle direct tab click - store start position for smooth animation
  const handleTabClick = (tabId: string) => {
    if (tabId === activeTab) return;
    
    // Store current indicator position before changing tabs
    if (indicatorRef.current && navRef.current) {
      const currentTab = navRef.current.querySelector('.modern-tab.active') as HTMLElement;
      if (currentTab) {
        const { left: navLeft } = navRef.current.getBoundingClientRect();
        const { left: currentLeft, width: currentWidth } = currentTab.getBoundingClientRect();
        lastPositionRef.current = {
          left: currentLeft - navLeft,
          width: currentWidth
        };
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Add custom styles for modern curved tabs */}
      <style jsx global>{`
        .modern-tab {
          position: relative;
          padding: 1.25rem 1.5rem;
          transition: all 0.3s ease;
          border: none;
          background-color: transparent;
          font-weight: 500;
          z-index: 1;
          color: #4b5563;
        }
        
        .modern-tab::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 5px;
          right: 5px;
          height: 0;
          background-color: var(--tab-bg, #3e9d47);
          border-radius: 6px 6px 0 0;
          transition: height 0.3s ease, opacity 0.3s ease;
          opacity: 0;
          z-index: -1;
        }
        
        .modern-tab:hover:not(.active)::before {
          height: 4px;
          opacity: 0.5;
        }
        
        .modern-tab.active {
          color: var(--tab-color, #3e9d47);
          font-weight: 600;
        }
        
        .modern-tab.active::before {
          height: 4px;
          opacity: 1;
        }
        
        .tab-indicator {
          position: absolute;
          height: 4px;
          bottom: 0;
          left: 0;
          background-color: var(--tab-bg, #3e9d47);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 4px 4px 0 0;
          z-index: 1;
        }
      `}</style>

      <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation in one row */}
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 mr-8">
                <Link href="/" className="text-primary-600 font-bold text-xl">
                  TERRA Cloud
                </Link>
              </div>
              
              {/* Navigation tabs */}
              <div className="relative hidden md:block" ref={navRef}>
                <nav className="flex" aria-label="Main Navigation">
                  {getNavLinks().map((link) => {
                    const isActive = activeTab === link.id;
                    return (
                      <Link
                        key={link.id}
                        href={link.href}
                        className={`modern-tab ${isActive ? 'active' : ''}`}
                        style={{ 
                          "--tab-bg": "#3e9d47",
                          "--tab-color": "#3e9d47"
                        } as React.CSSProperties}
                        onClick={() => handleTabClick(link.id)}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  {/* Animated tab indicator */}
                  <div className="tab-indicator" ref={indicatorRef} />
                </nav>
              </div>
            </div>
            
            {/* Right side controls */}
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
                    <span className="text-sm font-medium">
                      {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
                    </span>
                  </div>
                  <span className="hidden lg:inline-block text-sm font-medium">{user?.name || 'User'}</span>
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
                        onClick={logout}
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
              <p className="text-sm text-neutral-500">
                Version 1.0.0
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Role Switcher - for demo purposes */}
      <RoleSwitcher />
    </div>
  );
}
