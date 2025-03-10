"use client";

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { TabNavigation } from '../components/ui/TabNavigation';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { FormSection } from '../components/layout/FormSection';

export default function UserProfilePage() {
  // Mock user data - would come from auth system in a real app
  const user = {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@terralandscaping.com',
    position: 'Facilities Manager',
    department: 'Facilities Management',
    profileImage: null,
    createdAt: '2022-05-15',
    lastLogin: '2023-11-15 09:22 AM',
  };

  // Define tabs for user profile page
  const tabs = [
    { label: 'Profile', href: '/profile', isActive: true },
    { label: 'Settings', href: '/profile/settings' },
    { label: 'Security', href: '/profile/security' },
    { label: 'Notifications', href: '/profile/notifications' },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="My Profile" 
          subtitle="Manage your account details and preferences"
        />
        
        <TabNavigation tabs={tabs} className="mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <Card>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-6">
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={`${user.name}'s profile`} 
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400 text-2xl font-medium">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">{user.name}</h2>
                  <p className="text-neutral-500 dark:text-neutral-400 mt-1">{user.position}</p>
                  <p className="text-neutral-500 dark:text-neutral-400">{user.department}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" className="btn-outline text-sm py-1 px-3">
                      Change Photo
                    </button>
                    <button type="button" className="text-sm py-1 px-3 text-error border border-error rounded-md hover:bg-error/5">
                      Remove Photo
                    </button>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Edit Profile Form */}
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-6">Edit Profile</h2>
              
              <form>
                <FormSection title="Personal Information">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      id="firstName"
                      label="First Name" 
                      defaultValue="John"
                      fullWidth
                      required
                    />
                    <Input 
                      id="lastName"
                      label="Last Name" 
                      defaultValue="Smith"
                      fullWidth
                      required
                    />
                    <Input 
                      id="email"
                      label="Email Address" 
                      type="email"
                      defaultValue={user.email}
                      fullWidth
                      required
                    />
                    <Input 
                      id="phoneNumber"
                      label="Phone Number" 
                      type="tel"
                      placeholder="(555) 123-4567"
                      fullWidth
                    />
                  </div>
                </FormSection>
                
                <FormSection title="Job Information" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input 
                      id="position"
                      label="Position/Title" 
                      defaultValue={user.position}
                      fullWidth
                      required
                    />
                    <Input 
                      id="department"
                      label="Department" 
                      defaultValue={user.department}
                      fullWidth
                      required
                    />
                    <Select
                      id="timeZone"
                      label="Time Zone"
                      options={[
                        { value: 'america/new_york', label: 'Eastern Time (ET)' },
                        { value: 'america/chicago', label: 'Central Time (CT)' },
                        { value: 'america/denver', label: 'Mountain Time (MT)' },
                        { value: 'america/los_angeles', label: 'Pacific Time (PT)' },
                      ]}
                      defaultValue="america/new_york"
                      fullWidth
                    />
                    <Select
                      id="language"
                      label="Language"
                      options={[
                        { value: 'en', label: 'English' },
                        { value: 'es', label: 'Spanish' },
                        { value: 'fr', label: 'French' },
                      ]}
                      defaultValue="en"
                      fullWidth
                    />
                  </div>
                </FormSection>
                
                <div className="mt-8 flex justify-end">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </Card>
          </div>
          
          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Account Information */}
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Account Information</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Account Created</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{user.createdAt}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Last Login</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{user.lastLogin}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Account Type</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">Staff</p>
                </div>
              </div>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Quick Actions</h2>
              <nav className="space-y-2">
                <a href="/profile/security" className="block p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-md">
                  <div className="flex items-center">
                    <svg className="mr-3 h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Change Password
                  </div>
                </a>
                <a href="/profile/notifications" className="block p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-md">
                  <div className="flex items-center">
                    <svg className="mr-3 h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Notification Settings
                  </div>
                </a>
                <a href="/profile/sessions" className="block p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-md">
                  <div className="flex items-center">
                    <svg className="mr-3 h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Manage Sessions
                  </div>
                </a>
                <a href="/profile/api-keys" className="block p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-md">
                  <div className="flex items-center">
                    <svg className="mr-3 h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    API Keys
                  </div>
                </a>
                <div className="pt-2 mt-2 border-t border-neutral-200 dark:border-neutral-700">
                  <button type="button" className="w-full p-2 text-left text-error hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-md">
                    <div className="flex items-center">
                      <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </div>
                  </button>
                </div>
              </nav>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 