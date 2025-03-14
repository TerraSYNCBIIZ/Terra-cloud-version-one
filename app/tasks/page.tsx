"use client";

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function TasksPage() {
  // Get user role and access control methods
  const { 
    isAdmin, 
    isManager, 
    isFieldTechnician, 
    canAccessTask, 
    canAccessProperty, 
    getUserProperties 
  } = useAuth();
  
  // Get user's assigned properties
  const userProperties = getUserProperties();
  
  // Mock tasks data - in a real app, this would come from API filtered by user permissions
  const tasks = [
    {
      id: '101',
      name: 'Repair Irrigation System',
      assignee: 'John Smith',
      assigneeId: '1',
      propertyId: '1',
      property: 'North Campus',
      priority: '1',
      status: 'In Progress',
      dueDate: 'May 12, 2023',
      statusColor: 'info'
    },
    {
      id: '102',
      name: 'Replace Mower Blades',
      assignee: 'Sarah Johnson',
      assigneeId: '2',
      propertyId: '3',
      property: 'East Campus',
      priority: '2',
      status: 'To Do',
      dueDate: 'May 18, 2023',
      statusColor: 'primary'
    },
    {
      id: '103',
      name: 'Line Field for Game',
      assignee: 'Mike Peters',
      assigneeId: '4',
      propertyId: '2',
      property: 'South Campus',
      priority: '1',
      status: 'Completed',
      dueDate: 'May 10, 2023',
      statusColor: 'success'
    },
    {
      id: '104',
      name: 'Fix Range Picker Sensor',
      assignee: 'John Smith',
      assigneeId: '1',
      propertyId: '1',
      property: 'North Campus',
      priority: '2',
      status: 'Overdue',
      dueDate: 'May 5, 2023',
      statusColor: 'error'
    },
    {
      id: '105',
      name: 'Calibrate Line Painter',
      assignee: 'Tom Wilson',
      assigneeId: '5',
      propertyId: '4',
      property: 'West Campus',
      priority: '3',
      status: 'To Do',
      dueDate: 'May 25, 2023',
      statusColor: 'primary'
    },
  ];
  
  // Filter tasks based on user role and permissions
  const filteredTasks = tasks.filter(task => {
    // Admins can see all tasks
    if (isAdmin()) return true;
    
    // Managers can see tasks for their assigned properties
    if (isManager()) {
      return userProperties.includes(task.propertyId);
    }
    
    // Field technicians can only see tasks assigned to them
    if (isFieldTechnician()) {
      return canAccessTask(task.id);
    }
    
    return false;
  });
  
  // Calculate task stats
  const stats = {
    total: filteredTasks.length,
    toDo: filteredTasks.filter(task => task.status === 'To Do').length,
    inProgress: filteredTasks.filter(task => task.status === 'In Progress').length,
    completed: filteredTasks.filter(task => task.status === 'Completed').length,
    overdue: filteredTasks.filter(task => task.status === 'Overdue').length,
  };
  
  // Get unique property options for the filter dropdown
  const propertyOptions = Array.from(new Set(filteredTasks.map(task => task.propertyId))).map(
    propertyId => {
      const task = filteredTasks.find(t => t.propertyId === propertyId);
      return { id: propertyId, name: task?.property || 'Unknown Property' };
    }
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-neutral-900 dark:text-white sm:text-3xl sm:truncate">
              Tasks
            </h1>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="btn-outline mr-4"
            >
              Filter
            </button>
            {/* Only admins and managers can create tasks */}
            {(isAdmin() || isManager()) && (
              <button
                type="button"
                className="btn-primary"
              >
                Create Task
              </button>
            )}
          </div>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">All Tasks</h2>
            <p className="text-3xl font-semibold text-neutral-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">To Do</h2>
            <p className="text-3xl font-semibold text-primary-500">{stats.toDo}</p>
          </div>
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">In Progress</h2>
            <p className="text-3xl font-semibold text-info">{stats.inProgress}</p>
          </div>
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Completed</h2>
            <p className="text-3xl font-semibold text-success">{stats.completed}</p>
          </div>
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Overdue</h2>
            <p className="text-3xl font-semibold text-error">{stats.overdue}</p>
          </div>
        </div>

        {/* Task Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          {/* Task type filter - different options based on role */}
          <div className="relative">
            <select className="form-input pr-10 py-2">
              {isFieldTechnician() ? (
                <option>My Tasks</option>
              ) : (
                <>
                  <option>All Tasks</option>
                  <option>My Tasks</option>
                  {(isAdmin() || isManager()) && <option>Team Tasks</option>}
                </>
              )}
            </select>
          </div>
          
          {/* Property filter - only show properties the user has access to */}
          <div className="relative">
            <select className="form-input pr-10 py-2">
              <option>All Properties</option>
              {propertyOptions.map(property => (
                <option key={property.id} value={property.id}>{property.name}</option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <select className="form-input pr-10 py-2">
              <option>All Priorities</option>
              <option>Priority 1</option>
              <option>Priority 2</option>
              <option>Priority 3</option>
            </select>
          </div>
          <div className="relative flex-grow md:max-w-xs">
            <input
              type="text"
              className="form-input pl-10 w-full"
              placeholder="Search tasks..."
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <title>Search icon</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Show message if no tasks are available */}
        {filteredTasks.length === 0 && (
          <div className="card p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <title>Empty tasks icon</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-white">No Tasks</h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {isFieldTechnician() 
                ? "You don't have any tasks assigned to you." 
                : "No tasks found for your properties."}
            </p>
          </div>
        )}

        {/* Task List - only show if there are tasks */}
        {filteredTasks.length > 0 && (
          <div className="card overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800 text-right text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-white">
                      {task.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      {task.assignee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      {task.property}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.priority === '1' ? 'bg-error/10 text-error' : 
                        task.priority === '2' ? 'bg-warning/10 text-warning' : 
                        'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300'
                      }`}>
                        Priority {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${task.statusColor}/10 text-${task.statusColor}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      {task.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/tasks/${task.id}`} className="text-primary-600 hover:text-primary-800 mr-3">
                        View
                      </Link>
                      {/* Edit button only visible to admins, managers, or task assignee */}
                      {(isAdmin() || isManager() || (isFieldTechnician() && canAccessTask(task.id))) && (
                        <Link href={`/tasks/${task.id}/edit`} className="text-primary-600 hover:text-primary-800">
                          Edit
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          
            {/* Pagination */}
            <div className="py-3 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex-1 flex justify-between sm:hidden">
                <button type="button" className="btn-outline text-sm">
                  Previous
                </button>
                <button type="button" className="btn-outline text-sm">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTasks.length}</span> of <span className="font-medium">{filteredTasks.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button type="button" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <title>Previous page</title>
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button type="button" aria-current="page" className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      1
                    </button>
                    <button type="button" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <title>Next page</title>
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 