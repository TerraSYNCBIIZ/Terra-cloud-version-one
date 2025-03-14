"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

export default function TechnicianDashboardPage() {
  const { user } = useAuth();
  
  // Mock data for the field technician
  const propertyData = {
    id: "1",
    name: "North Campus",
    address: "1234 College Avenue, Springfield, IL",
    status: "Active",
    zones: ["East Zone", "West Zone", "Central Area"],
    todayWeather: "Sunny, 72°F"
  };
  
  const equipmentData = {
    total: 3,
    active: 3,
    maintenance: 0,
    nextMaintenance: "In 2 days (Irrigation System)"
  };
  
  const tasksData = {
    total: 3,
    today: 1,
    upcoming: 2,
    overdue: 0,
    nextTask: "Irrigation System Maintenance (Due Today)"
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title={`Welcome, ${user?.name || 'Technician'}`}
          subtitle="Your daily overview"
        >
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </PageHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Property Summary */}
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="px-6 py-5 bg-primary-50 dark:bg-primary-900/20 border-b border-primary-100 dark:border-primary-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-primary-700 dark:text-primary-300">
                  Your Property
                </h3>
                <svg className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <title>Building Icon</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-medium text-neutral-900 dark:text-white">{propertyData.name}</h4>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{propertyData.address}</p>
              
              <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300 mr-2">Assigned Zones:</span> 
                  {propertyData.zones.join(", ")}
                </div>
                <div className="flex items-center mt-2">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300 mr-2">Today:</span> 
                  {propertyData.todayWeather}
                </div>
              </div>
              
              <div className="mt-6 text-right">
                <Link 
                  href={`/properties/${user?.assignedPropertyIds?.[0]}`}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm"
                >
                  View Property →
                </Link>
              </div>
            </div>
          </Card>
          
          {/* Equipment Summary */}
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="px-6 py-5 bg-success-50 dark:bg-success-900/20 border-b border-success-100 dark:border-success-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-success-700 dark:text-success-300">
                  Your Equipment
                </h3>
                <svg className="h-5 w-5 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <title>Equipment Icon</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="text-2xl font-bold text-neutral-800 dark:text-white">{equipmentData.total}</div>
                  <div className="text-xs uppercase text-neutral-500 dark:text-neutral-400 mt-1">Total</div>
                </div>
                
                <div className="text-center p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-success-600 dark:text-success-400">{equipmentData.active}</div>
                  <div className="text-xs uppercase text-success-600 dark:text-success-400 mt-1">Active</div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center mt-2">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300 mr-2">Maintenance:</span> 
                  {equipmentData.nextMaintenance}
                </div>
              </div>
              
              <div className="mt-6 text-right">
                <Link 
                  href="/equipment/assigned"
                  className="text-success-600 hover:text-success-700 dark:text-success-400 dark:hover:text-success-300 font-medium text-sm"
                >
                  View Equipment →
                </Link>
              </div>
            </div>
          </Card>
          
          {/* Tasks Summary */}
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="px-6 py-5 bg-info-50 dark:bg-info-900/20 border-b border-info-100 dark:border-info-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-info-700 dark:text-info-300">
                  Your Tasks
                </h3>
                <svg className="h-5 w-5 text-info-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <title>Tasks Icon</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                  <div className="text-xl font-bold text-neutral-800 dark:text-white">{tasksData.total}</div>
                  <div className="text-xs uppercase text-neutral-500 dark:text-neutral-400 mt-1">Total</div>
                </div>
                
                <div className="text-center p-2 bg-info-50 dark:bg-info-900/20 rounded-lg">
                  <div className="text-xl font-bold text-info-600 dark:text-info-400">{tasksData.today}</div>
                  <div className="text-xs uppercase text-info-600 dark:text-info-400 mt-1">Today</div>
                </div>
                
                <div className="text-center p-2 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                  <div className="text-xl font-bold text-warning-600 dark:text-warning-400">{tasksData.upcoming}</div>
                  <div className="text-xs uppercase text-warning-600 dark:text-warning-400 mt-1">Upcoming</div>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center mt-2">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300 mr-2">Next:</span> 
                  {tasksData.nextTask}
                </div>
              </div>
              
              <div className="mt-6 text-right">
                <Link 
                  href="/tasks/assigned"
                  className="text-info-600 hover:text-info-700 dark:text-info-400 dark:hover:text-info-300 font-medium text-sm"
                >
                  View Tasks →
                </Link>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Live Status & Quick Actions */}
        <div className="mt-6">
          <Card className="bg-neutral-50 dark:bg-neutral-800">
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="p-6">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="btn-primary inline-flex items-center text-sm">
                    <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <title>Checkmark Icon</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Log Task Completion
                  </button>
                  <button type="button" className="btn-outline-secondary inline-flex items-center text-sm">
                    <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <title>Camera Icon</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Report Issue
                  </button>
                </div>
              </div>
              
              <div className="p-6 border-t sm:border-t-0 sm:border-l border-neutral-200 dark:border-neutral-700">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Equipment Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-success-500 mr-2" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">John Deere X758 - Active</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-success-500 mr-2" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Husqvarna Automower - Active</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-success-500 mr-2" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Irrigation System - Active</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
