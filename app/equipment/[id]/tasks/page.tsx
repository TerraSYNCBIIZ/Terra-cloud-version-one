"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import { PageHeader } from '../../../components/layout/PageHeader';
import { TabNavigation } from '../../../components/ui/TabNavigation';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export default function EquipmentTasksPage({ params }: { params: { id: string } }) {
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
    { label: 'Tasks', href: `/equipment/${params.id}/tasks`, isActive: true },
    { label: 'Settings', href: `/equipment/${params.id}/settings` },
  ];

  // Mock task data
  const tasks = [
    {
      id: 'task1',
      title: 'Weekly Equipment Inspection',
      status: 'completed',
      priority: 'medium',
      assignedTo: 'John Smith',
      dueDate: '2023-10-12',
      completedDate: '2023-10-12',
    },
    {
      id: 'task2',
      title: 'Battery Replacement',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'Sarah Johnson',
      dueDate: '2023-11-05',
      completedDate: null,
    },
    {
      id: 'task3',
      title: 'Software Update Installation',
      status: 'pending',
      priority: 'low',
      assignedTo: 'Mike Williams',
      dueDate: '2023-11-15',
      completedDate: null,
    },
    {
      id: 'task4',
      title: 'Blade Replacement',
      status: 'completed',
      priority: 'medium',
      assignedTo: 'John Smith',
      dueDate: '2023-09-25',
      completedDate: '2023-09-24',
    },
    {
      id: 'task5',
      title: 'Seasonal Maintenance Check',
      status: 'pending',
      priority: 'high',
      assignedTo: 'Unassigned',
      dueDate: '2023-11-30',
      completedDate: null,
    },
    {
      id: 'task6',
      title: 'Performance Optimization',
      status: 'pending',
      priority: 'low',
      assignedTo: 'Unassigned',
      dueDate: '2023-12-15',
      completedDate: null,
    },
  ];

  // Function to return appropriate badge for status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="info" size="sm">In Progress</Badge>;
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  // Function to return appropriate badge for priority
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="error" size="sm">High</Badge>;
      case 'medium':
        return <Badge variant="warning" size="sm">Medium</Badge>;
      case 'low':
        return <Badge variant="info" size="sm">Low</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{priority}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader title={`${equipment.name} - Tasks`}>
          <Link href="/equipment" className="btn-outline mr-3">
            Back to Equipment
          </Link>
          <Link href="/tasks/new" className="btn-primary">
            Create Task
          </Link>
        </PageHeader>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} className="mb-8" />
        
        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Total Tasks</h2>
            <p className="text-xl font-semibold text-neutral-900 dark:text-white">{tasks.length}</p>
          </Card>
          
          <Card>
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Completed</h2>
            <p className="text-xl font-semibold text-success">{tasks.filter(t => t.status === 'completed').length}</p>
          </Card>
          
          <Card>
            <h2 className="text-sm font-medium text-neutral-500 mb-1">In Progress</h2>
            <p className="text-xl font-semibold text-info">{tasks.filter(t => t.status === 'in-progress').length}</p>
          </Card>
          
          <Card>
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Pending</h2>
            <p className="text-xl font-semibold text-warning">{tasks.filter(t => t.status === 'pending').length}</p>
          </Card>
        </div>
        
        {/* Filter Controls */}
        <Card className="mb-8">
          <div className="md:flex md:items-center md:justify-between gap-4">
            <div className="flex-1 min-w-0 mb-4 md:mb-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="block w-full rounded-md border-neutral-300 dark:border-neutral-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-neutral-800"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <title>Search</title>
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <select className="rounded-md border-neutral-300 dark:border-neutral-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-neutral-800">
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
              <select className="rounded-md border-neutral-300 dark:border-neutral-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-neutral-800">
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button
                type="button"
                className="btn-outline"
                onClick={() => alert('This would reset all filters')}
              >
                Reset
              </button>
            </div>
          </div>
        </Card>
        
        {/* Task List */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Task
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900 dark:text-white">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(task.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getPriorityBadge(task.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {task.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {task.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <Link
                        href={`/tasks/${task.id}`}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3"
                      >
                        View
                      </Link>
                      {task.status !== 'completed' && (
                        <button
                          type="button"
                          className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                          onClick={() => alert(`This would mark task as complete: ${task.title}`)}
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-neutral-700 dark:text-neutral-400">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{tasks.length}</span> of <span className="font-medium">{tasks.length}</span> tasks
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                type="button" 
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
                disabled
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <title>Previous Page</title>
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                type="button" 
                aria-current="page" 
                className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                1
              </button>
              <button 
                type="button" 
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
                disabled
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <title>Next Page</title>
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
} 