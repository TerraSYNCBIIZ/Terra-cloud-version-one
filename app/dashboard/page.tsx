"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { SimpleChart } from '../components/ui/SimpleChart';
import { ActivityFeed } from '../components/ui/ActivityFeed';
import { Badge } from '../components/ui/Badge';
import type { BadgeVariant } from '../components/ui/Badge';

export default function DashboardPage() {
  // Stats data
  const stats = [
    {
      id: "properties",
      title: "Total Properties",
      value: 12,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      trend: {
        direction: 'up' as const,
        value: '+2',
        label: 'from last month'
      }
    },
    {
      id: "equipment",
      title: "Active Equipment",
      value: 48,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      trend: {
        direction: 'up' as const,
        value: '+5',
        label: 'from last month'
      }
    },
    {
      id: "employees",
      title: "Total Employees",
      value: 24,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      trend: {
        direction: 'neutral' as const,
        value: '0',
        label: 'from last month'
      }
    },
    {
      id: "tasks",
      title: "Active Tasks",
      value: 36,
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      trend: {
        direction: 'down' as const,
        value: '-4',
        label: 'from last month'
      }
    }
  ];

  // Chart data
  const tasksByStatus = {
    title: "Tasks by Status",
    data: [
      { label: "Completed", value: 28, color: "bg-success-500" },
      { label: "In Progress", value: 16, color: "bg-warning-500" },
      { label: "Pending", value: 12, color: "bg-info-500" },
      { label: "Overdue", value: 8, color: "bg-error-500" }
    ]
  };

  const tasksByProperty = {
    title: "Top Properties by Tasks",
    data: [
      { label: "North Campus", value: 18, color: "bg-primary-500" },
      { label: "South Campus", value: 14, color: "bg-primary-600" },
      { label: "Main Office", value: 12, color: "bg-primary-700" },
      { label: "Research Park", value: 8, color: "bg-primary-800" },
      { label: "Athletic Fields", value: 6, color: "bg-primary-900" }
    ]
  };

  const equipmentByType = {
    title: "Equipment Distribution",
    data: [
      { label: "Mowers", value: 12, color: "bg-primary-500" },
      { label: "Tractors", value: 8, color: "bg-secondary-500" },
      { label: "Irrigation", value: 10, color: "bg-success-500" },
      { label: "Hand Tools", value: 14, color: "bg-info-500" },
      { label: "Vehicles", value: 4, color: "bg-warning-500" }
    ]
  };

  // Recent activities
  const recentActivities = [
    {
      id: "1",
      content: (
        <span>
          Task <Link href="/tasks/123" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">Irrigation System Maintenance</Link> was completed
        </span>
      ),
      timestamp: "2 hours ago",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      iconColor: "bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400",
      user: {
        name: "Sarah Johnson",
        role: "Grounds Supervisor"
      }
    },
    {
      id: "2",
      content: (
        <span>
          New equipment <Link href="/equipment/456" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">John Deere X758</Link> was added to inventory
        </span>
      ),
      timestamp: "4 hours ago",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      iconColor: "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400",
      user: {
        name: "Michael Williams",
        role: "Equipment Manager"
      }
    },
    {
      id: "3",
      content: (
        <span>
          New task <Link href="/tasks/789" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">Tree Trimming</Link> was assigned to <Link href="/employees/101" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">Robert Smith</Link>
        </span>
      ),
      timestamp: "Yesterday at 4:30 PM",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      user: {
        name: "Jennifer Davis",
        role: "Operations Manager"
      }
    },
    {
      id: "4",
      content: (
        <span>
          <Link href="/properties/222" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">Research Park</Link> maintenance schedule was updated
        </span>
      ),
      timestamp: "Yesterday at 2:15 PM",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      iconColor: "bg-info-100 text-info-600 dark:bg-info-900/30 dark:text-info-400",
      user: {
        name: "Sarah Johnson",
        role: "Grounds Supervisor"
      }
    },
    {
      id: "5",
      content: (
        <span>
          Maintenance alert: <Link href="/equipment/333" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">Irrigation Control System</Link> requires immediate attention
        </span>
      ),
      timestamp: "2 days ago",
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      iconColor: "bg-error-100 text-error-600 dark:bg-error-900/30 dark:text-error-400",
      user: {
        name: "Robert Smith",
        role: "Maintenance Technician"
      }
    }
  ];

  // Upcoming tasks
  const upcomingTasks = [
    {
      id: "1",
      title: "Fertilize North Lawn",
      dueDate: "Tomorrow",
      property: "North Campus",
      assignee: "Robert Smith",
      priority: "High"
    },
    {
      id: "2",
      title: "Replace Sprinkler Heads",
      dueDate: "In 2 days",
      property: "Athletic Fields",
      assignee: "Sarah Johnson",
      priority: "Medium"
    },
    {
      id: "3",
      title: "Trim Hedges",
      dueDate: "Next Week",
      property: "Main Office",
      assignee: "David Wilson",
      priority: "Low"
    }
  ];

  // Get priority color
  const getPriorityColor = (priority: string): BadgeVariant => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'neutral';
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="Dashboard" 
          subtitle="Overview of your properties, equipment, and tasks"
        />
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <SimpleChart
            title={tasksByStatus.title}
            data={tasksByStatus.data}
            type="bar"
            height={250}
          />
          
          <SimpleChart
            title={tasksByProperty.title}
            data={tasksByProperty.data}
            type="horizontal-bar"
          />
        </div>
        
        {/* Activity Feed and Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Activity Feed - Takes 2/3 of width on large screens */}
          <div className="lg:col-span-2">
            <ActivityFeed
              title="Recent Activity"
              activities={recentActivities}
              showViewAll={true}
              viewAllHref="/activities"
            />
          </div>
          
          {/* Upcoming Tasks - Takes 1/3 of width on large screens */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Upcoming Tasks</h3>
              <Link href="/tasks" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="border-b border-neutral-200 dark:border-neutral-700 pb-4 last:border-b-0 last:pb-0">
                  <Link href={`/tasks/${task.id}`} className="block hover:bg-neutral-50 dark:hover:bg-neutral-800 -mx-4 px-4 py-2 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-white">
                          {task.title}
                        </h4>
                        <div className="mt-1 flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                          <span className="mr-2">Due: {task.dueDate}</span>
                          <span>at {task.property}</span>
                        </div>
                        <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                          Assigned to: {task.assignee}
                        </div>
                      </div>
                      <Badge variant={getPriorityColor(task.priority)} size="sm">{task.priority}</Badge>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Equipment Distribution */}
        <div className="mt-6">
          <SimpleChart
            title={equipmentByType.title}
            data={equipmentByType.data}
            type="bar"
          />
        </div>
        
        {/* Quick Links */}
        <Card className="mt-6">
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link href="/properties/new" className="flex flex-col items-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800">
              <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-sm font-medium text-neutral-900 dark:text-white">Add Property</span>
            </Link>
            
            <Link href="/equipment/new" className="flex flex-col items-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800">
              <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-neutral-900 dark:text-white">Add Equipment</span>
            </Link>
            
            <Link href="/employees/new" className="flex flex-col items-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800">
              <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-neutral-900 dark:text-white">Add Employee</span>
            </Link>
            
            <Link href="/tasks/new" className="flex flex-col items-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800">
              <div className="p-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-neutral-900 dark:text-white">Create Task</span>
            </Link>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
} 