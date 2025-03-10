"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import { PageHeader } from '../../../components/layout/PageHeader';
import { TabNavigation } from '../../../components/ui/TabNavigation';
import { Card } from '../../../components/ui/Card';
import { FormLayout } from '../../../components/layout/FormLayout';
import { FormSection } from '../../../components/layout/FormSection';
import { Switch } from '../../../components/ui/Switch';

export default function EquipmentSettingsPage({ params }: { params: { id: string } }) {
  // Placeholder equipment data - this would come from an API in a real app
  const equipment = {
    id: params.id,
    name: 'Husqvarna Automower 450X',
    model: 'Automower 450X',
    manufacturer: 'Husqvarna',
    status: 'Operational',
  };

  // Define tabs for the equipment detail view
  const tabs = [
    { label: 'Overview', href: `/equipment/${params.id}` },
    { label: 'Maintenance History', href: `/equipment/${params.id}/maintenance` },
    { label: 'Documents', href: `/equipment/${params.id}/documents` },
    { label: 'Tasks', href: `/equipment/${params.id}/tasks` },
    { label: 'Settings', href: `/equipment/${params.id}/settings`, isActive: true },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader title={`${equipment.name} - Settings`}>
          <Link href="/equipment" className="btn-outline mr-3">
            Back to Equipment
          </Link>
          <Link href={`/equipment/${params.id}`} className="btn-primary">
            View Overview
          </Link>
        </PageHeader>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} className="mb-8" />
        
        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Notifications Settings */}
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Notification Settings</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                Configure which notifications you receive for this equipment.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Maintenance Due</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Get notified when maintenance is due for this equipment
                    </p>
                  </div>
                  <Switch
                    id="maintenance-notifications"
                    defaultChecked={true}
                    onChange={(checked: boolean) => console.log('Maintenance notifications:', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Status Changes</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Get notified when the status of this equipment changes
                    </p>
                  </div>
                  <Switch
                    id="status-notifications"
                    defaultChecked={true}
                    onChange={(checked: boolean) => console.log('Status notifications:', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Assignment Changes</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Get notified when this equipment is assigned to a different property
                    </p>
                  </div>
                  <Switch
                    id="assignment-notifications"
                    defaultChecked={false}
                    onChange={(checked: boolean) => console.log('Assignment notifications:', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Task Assignments</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Get notified when tasks are created involving this equipment
                    </p>
                  </div>
                  <Switch
                    id="task-notifications"
                    defaultChecked={true}
                    onChange={(checked: boolean) => console.log('Task notifications:', checked)}
                  />
                </div>
              </div>
            </Card>
            
            {/* Monitoring Settings */}
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Monitoring Settings</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                Configure monitoring parameters for this equipment.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">GPS Tracking</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Enable real-time GPS tracking for this equipment
                    </p>
                  </div>
                  <Switch
                    id="gps-tracking"
                    defaultChecked={true}
                    onChange={(checked: boolean) => console.log('GPS tracking:', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Usage Logging</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Record detailed usage logs for this equipment
                    </p>
                  </div>
                  <Switch
                    id="usage-logging"
                    defaultChecked={true}
                    onChange={(checked: boolean) => console.log('Usage logging:', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Battery Alerts</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Get alerts when battery level drops below 20%
                    </p>
                  </div>
                  <Switch
                    id="battery-alerts"
                    defaultChecked={true}
                    onChange={(checked: boolean) => console.log('Battery alerts:', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Performance Monitoring</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Monitor and report on equipment performance metrics
                    </p>
                  </div>
                  <Switch
                    id="performance-monitoring"
                    defaultChecked={false}
                    onChange={(checked: boolean) => console.log('Performance monitoring:', checked)}
                  />
                </div>
              </div>
            </Card>
            
            {/* Access Control */}
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Access Control</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                Configure who has access to this equipment.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Restricted Access</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Limit access to authorized personnel only
                    </p>
                  </div>
                  <Switch
                    id="restricted-access"
                    defaultChecked={false}
                    onChange={(checked: boolean) => console.log('Restricted access:', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">Require Training</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Only allow access to personnel with verified training
                    </p>
                  </div>
                  <Switch
                    id="require-training"
                    defaultChecked={true}
                    onChange={(checked: boolean) => console.log('Require training:', checked)}
                  />
                </div>
                
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <button type="button" className="btn-outline">
                    Manage User Access
                  </button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Remote Control</h2>
              <div className="space-y-3">
                <button 
                  type="button" 
                  className="btn-primary w-full"
                  onClick={() => alert('Starting equipment remotely...')}
                >
                  Start Equipment
                </button>
                <button 
                  type="button" 
                  className="btn-outline w-full text-error border-error"
                  onClick={() => alert('Stopping equipment remotely...')}
                >
                  Stop Equipment
                </button>
                <button 
                  type="button" 
                  className="btn-outline w-full"
                  onClick={() => alert('Restarting equipment remotely...')}
                >
                  Restart Equipment
                </button>
              </div>
              <div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                <p>Last controlled: Today at 10:45 AM</p>
                <p>Remote control available: Yes</p>
              </div>
            </Card>
            
            {/* Advanced Settings */}
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Advanced Settings</h2>
              <div className="space-y-4">
                <button 
                  type="button" 
                  className="btn-outline w-full"
                  onClick={() => alert('Equipment diagnostics would run here...')}
                >
                  Run Diagnostics
                </button>
                <button 
                  type="button" 
                  className="btn-outline w-full"
                  onClick={() => alert('Equipment would be recalibrated...')}
                >
                  Recalibrate Equipment
                </button>
                <button 
                  type="button" 
                  className="btn-outline w-full"
                  onClick={() => alert('Manual would be downloaded...')}
                >
                  Download Manual
                </button>
              </div>
            </Card>

            {/* Data Export */}
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Data Export</h2>
              <div className="space-y-3">
                <button 
                  type="button" 
                  className="btn-outline w-full"
                  onClick={() => alert('Usage history would be exported...')}
                >
                  Export Usage History
                </button>
                <button 
                  type="button" 
                  className="btn-outline w-full"
                  onClick={() => alert('Maintenance history would be exported...')}
                >
                  Export Maintenance Records
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 