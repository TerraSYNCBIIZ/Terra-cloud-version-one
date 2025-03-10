"use client";

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { TabNavigation } from '../components/ui/TabNavigation';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { FormSection } from '../components/layout/FormSection';

export default function SettingsPage() {
  // Define tabs for the settings page
  const tabs = [
    { label: 'General', href: '/settings', isActive: true },
    { label: 'Users', href: '/settings/users' },
    { label: 'Notifications', href: '/settings/notifications' },
    { label: 'Integrations', href: '/settings/integrations' },
    { label: 'Billing', href: '/settings/billing' },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="Settings" 
          subtitle="Manage your organization settings and preferences"
        />

        <TabNavigation tabs={tabs} className="mb-8" />

        <div className="space-y-8">
          {/* Organization Settings */}
          <Card>
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-6">Organization Settings</h2>
            
            <form>
              <FormSection>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    id="orgName"
                    label="Organization Name" 
                    defaultValue="TERRA Landscaping"
                    fullWidth
                  />
                  <Input 
                    id="orgEmail"
                    label="Organization Email" 
                    type="email"
                    defaultValue="contact@terralandscaping.com"
                    fullWidth
                  />
                  <Input 
                    id="orgPhone"
                    label="Organization Phone" 
                    type="tel"
                    defaultValue="(555) 123-4567"
                    fullWidth
                  />
                  <Input 
                    id="orgWebsite"
                    label="Website" 
                    type="url"
                    defaultValue="https://terralandscaping.com"
                    fullWidth
                  />
                </div>
              </FormSection>

              <FormSection title="Address" className="mt-8">
                <div className="grid grid-cols-1 gap-6">
                  <Input 
                    id="address"
                    label="Street Address" 
                    defaultValue="1234 Landscape Avenue"
                    fullWidth
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input 
                      id="city"
                      label="City" 
                      defaultValue="Springfield"
                      fullWidth
                    />
                    <Input 
                      id="state"
                      label="State/Province" 
                      defaultValue="IL"
                      fullWidth
                    />
                    <Input 
                      id="zipCode"
                      label="ZIP/Postal Code" 
                      defaultValue="62701"
                      fullWidth
                    />
                  </div>
                  
                  <Select
                    id="country"
                    label="Country"
                    options={[
                      { value: 'us', label: 'United States' },
                      { value: 'ca', label: 'Canada' },
                      { value: 'mx', label: 'Mexico' },
                    ]}
                    defaultValue="us"
                  />
                </div>
              </FormSection>

              <div className="mt-8 flex justify-end">
                <button type="button" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-6">Appearance</h2>
            
            <FormSection>
              <div className="space-y-6">
                <div>
                  <span id="theme-group-label" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Theme</span>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-labelledby="theme-group-label">
                    <div className="relative flex items-center space-x-3 border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-white border border-neutral-300 flex items-center justify-center">
                        <svg className="h-6 w-6 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                          <title>Light mode icon</title>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <label htmlFor="theme-light" className="block text-sm font-medium text-neutral-900 dark:text-white">
                          Light
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Light background with dark text
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <input
                          id="theme-light"
                          name="theme"
                          type="radio"
                          className="h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                          defaultChecked
                        />
                      </div>
                    </div>

                    <div className="relative flex items-center space-x-3 border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                        <svg className="h-6 w-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                          <title>Dark mode icon</title>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <label htmlFor="theme-dark" className="block text-sm font-medium text-neutral-900 dark:text-white">
                          Dark
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Dark background with light text
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <input
                          id="theme-dark"
                          name="theme"
                          type="radio"
                          className="h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div className="relative flex items-center space-x-3 border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-white to-neutral-900 border border-neutral-300 flex items-center justify-center">
                        <svg className="h-6 w-6 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                          <title>System theme icon</title>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <label htmlFor="theme-system" className="block text-sm font-medium text-neutral-900 dark:text-white">
                          System
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Follow system preferences
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <input
                          id="theme-system"
                          name="theme"
                          type="radio"
                          className="h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <span id="density-group-label" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Density</span>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-labelledby="density-group-label">
                    <div className="relative flex items-center space-x-3 border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      <div className="flex-1 min-w-0">
                        <label htmlFor="density-compact" className="block text-sm font-medium text-neutral-900 dark:text-white">
                          Compact
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Reduced spacing between elements
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <input
                          id="density-compact"
                          name="density"
                          type="radio"
                          className="h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                        />
                      </div>
                    </div>

                    <div className="relative flex items-center space-x-3 border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      <div className="flex-1 min-w-0">
                        <label htmlFor="density-comfortable" className="block text-sm font-medium text-neutral-900 dark:text-white">
                          Comfortable
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Default spacing
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <input
                          id="density-comfortable"
                          name="density"
                          type="radio"
                          className="h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                          defaultChecked
                        />
                      </div>
                    </div>

                    <div className="relative flex items-center space-x-3 border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      <div className="flex-1 min-w-0">
                        <label htmlFor="density-spacious" className="block text-sm font-medium text-neutral-900 dark:text-white">
                          Spacious
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Increased spacing between elements
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <input
                          id="density-spacious"
                          name="density"
                          type="radio"
                          className="h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FormSection>

            <div className="mt-8 flex justify-end">
              <button type="button" className="btn-primary">
                Save Preferences
              </button>
            </div>
          </Card>

          {/* System Settings */}
          <Card>
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-6">System Settings</h2>
            
            <FormSection>
              <div className="space-y-6">
                <div>
                  <label htmlFor="dateFormat" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Date Format</label>
                  <div className="mt-2">
                    <Select
                      id="dateFormat"
                      options={[
                        { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                        { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                        { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                      ]}
                      defaultValue="MM/DD/YYYY"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="timeFormat" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Time Format</label>
                  <div className="mt-2">
                    <Select
                      id="timeFormat"
                      options={[
                        { value: '12', label: '12-hour (AM/PM)' },
                        { value: '24', label: '24-hour' },
                      ]}
                      defaultValue="12"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="firstDayOfWeek" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">First Day of Week</label>
                  <div className="mt-2">
                    <Select
                      id="firstDayOfWeek"
                      options={[
                        { value: 'sunday', label: 'Sunday' },
                        { value: 'monday', label: 'Monday' },
                      ]}
                      defaultValue="sunday"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="language" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Language</label>
                  <div className="mt-2">
                    <Select
                      id="language"
                      options={[
                        { value: 'en', label: 'English' },
                        { value: 'es', label: 'Spanish' },
                        { value: 'fr', label: 'French' },
                      ]}
                      defaultValue="en"
                    />
                  </div>
                </div>
              </div>
            </FormSection>

            <div className="mt-8 flex justify-end">
              <button type="button" className="btn-primary">
                Save Settings
              </button>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 