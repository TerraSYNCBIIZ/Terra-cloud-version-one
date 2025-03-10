"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { BadgeVariant } from '../../components/ui/Badge';

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  // Placeholder task data - this would come from an API in a real app
  const task = {
    id: params.id,
    title: 'Irrigation System Maintenance',
    description: 'Perform routine maintenance on the irrigation system including checking for leaks, cleaning filters, and adjusting sprinkler heads.',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2023-11-20',
    createdAt: '2023-11-01',
    assignedTo: {
      id: '123',
      name: 'Sarah Johnson',
      position: 'Grounds Maintenance Supervisor',
    },
    property: {
      id: '456',
      name: 'North Campus',
      address: '1234 College Avenue, Springfield, IL',
    },
    equipment: [
      {
        id: '789',
        name: 'Irrigation Control System',
      },
      {
        id: '790',
        name: 'Pressure Tester',
      },
    ],
    estimatedHours: 4,
    completedHours: 2,
  };

  // Sample task comments
  const comments = [
    {
      id: '1',
      author: 'Sarah Johnson',
      authorRole: 'Grounds Maintenance Supervisor',
      content: 'Started work on the north zone. Found a few leaking sprinkler heads that need replacement.',
      timestamp: '2023-11-15 09:30 AM',
    },
    {
      id: '2',
      author: 'Michael Williams',
      authorRole: 'Facilities Director',
      content: "Please check the water pressure in the east zone as well. We've had reports of low pressure there.",
      timestamp: '2023-11-15 11:45 AM',
    },
    {
      id: '3',
      author: 'Sarah Johnson',
      authorRole: 'Grounds Maintenance Supervisor',
      content: 'Confirmed low pressure in east zone. Will need to order replacement parts for the pressure regulator.',
      timestamp: '2023-11-15 02:15 PM',
    },
  ];

  // Get status color
  const getStatusColor = (status: string): BadgeVariant => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Pending':
        return 'info';
      case 'Overdue':
        return 'error';
      default:
        return 'neutral';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string): BadgeVariant => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'info';
      default:
        return 'neutral';
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader title={task.title}>
          <Link href="/tasks" className="btn-outline mr-3">
            Back to Tasks
          </Link>
          <Link href={`/tasks/${params.id}/edit`} className="btn-primary">
            Edit Task
          </Link>
        </PageHeader>

        {/* Status and Priority */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Badge variant={getStatusColor(task.status)} rounded>{task.status}</Badge>
          <Badge variant={getPriorityColor(task.priority)} rounded>{task.priority}</Badge>
          <span className="text-neutral-500 dark:text-neutral-400">Due: {task.dueDate}</span>
        </div>

        {/* Task Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Task Information */}
          <Card className="md:col-span-2">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Task Description</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">{task.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Assigned To</h3>
                <p className="mt-1 text-neutral-900 dark:text-white">
                  <Link href={`/employees/${task.assignedTo.id}`} className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                    {task.assignedTo.name}
                  </Link>
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{task.assignedTo.position}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Property</h3>
                <p className="mt-1 text-neutral-900 dark:text-white">
                  <Link href={`/properties/${task.property.id}`} className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                    {task.property.name}
                  </Link>
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{task.property.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Created On</h3>
                <p className="mt-1 text-neutral-900 dark:text-white">{task.createdAt}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Equipment</h3>
                <div className="mt-1">
                  {task.equipment.map((item) => (
                    <Link 
                      key={item.id}
                      href={`/equipment/${item.id}`} 
                      className="inline-block mr-2 mb-2 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Task Progress</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Estimated Hours</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{task.estimatedHours} hours</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Hours Completed</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{task.completedHours} hours</p>
                </div>
                <div className="sm:col-span-2">
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Progress</h3>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full" 
                      style={{ width: `${(task.completedHours / task.estimatedHours) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 text-right">
                    {Math.round((task.completedHours / task.estimatedHours) * 100)}% Complete
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Task Actions */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Task Actions</h2>
              <div className="space-y-3">
                <button type="button" className="btn-primary w-full">
                  Mark as Complete
                </button>
                <button type="button" className="btn-outline w-full">
                  Reassign Task
                </button>
                <button type="button" className="btn-outline w-full">
                  Log Hours
                </button>
                <button type="button" className="btn-outline w-full">
                  Add Comment
                </button>
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Timeline</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-success" />
                  <div className="ml-3">
                    <p className="text-sm text-neutral-900 dark:text-white">Created</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{task.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-warning" />
                  <div className="ml-3">
                    <p className="text-sm text-neutral-900 dark:text-white">Started</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">2023-11-15</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-4 w-4 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                  <div className="ml-3">
                    <p className="text-sm text-neutral-900 dark:text-white">Due</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{task.dueDate}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Task Comments */}
        <Card className="mt-6">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Comments</h2>
          
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                    <span className="text-neutral-500 dark:text-neutral-400">{comment.author.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-neutral-900 dark:text-white">{comment.author}</h3>
                    <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">{comment.authorRole}</span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">{comment.content}</p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{comment.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-2">Add a comment</h3>
            <div className="flex">
              <div className="flex-1 mr-4">
                <textarea 
                  className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/25 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                  rows={3}
                  placeholder="Type your comment here..."
                />
              </div>
              <div className="flex-shrink-0 self-end">
                <button type="button" className="btn-primary">
                  Post
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
} 