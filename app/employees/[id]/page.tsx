"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { TabNavigation } from '../../components/ui/TabNavigation';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  // Placeholder employee data - this would come from an API in a real app
  const employee = {
    id: params.id,
    name: 'Sarah Johnson',
    position: 'Grounds Maintenance Supervisor',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567',
    department: 'Facilities Management',
    status: 'Active',
    hireDate: '2020-06-15',
    supervisor: 'Michael Williams',
    bio: 'Sarah has over 10 years of experience in grounds maintenance and landscaping. She specializes in sustainable landscaping practices and irrigation systems.',
    profileImage: '/placeholder-profile.jpg',
  };

  // Define tabs for the employee detail view
  const tabs = [
    { label: 'Overview', href: `/employees/${params.id}`, isActive: true },
    { label: 'Properties', href: `/employees/${params.id}/properties` },
    { label: 'Tasks', href: `/employees/${params.id}/tasks` },
    { label: 'Equipment', href: `/employees/${params.id}/equipment` },
    { label: 'Documents', href: `/employees/${params.id}/documents` },
    { label: 'Settings', href: `/employees/${params.id}/settings` },
  ];

  // Sample assigned properties
  const assignedProperties = [
    {
      id: '1',
      name: 'North Campus',
      role: 'Primary Supervisor',
      address: '1234 College Avenue, Springfield, IL',
    },
    {
      id: '2',
      name: 'South Campus',
      role: 'Secondary Supervisor',
      address: '5678 University Drive, Springfield, IL',
    },
  ];

  // Sample recent tasks
  const recentTasks = [
    {
      id: '1',
      title: 'Irrigation System Maintenance',
      status: 'Completed',
      dueDate: '2023-11-10',
      property: 'North Campus',
    },
    {
      id: '2',
      title: 'Tree Trimming',
      status: 'In Progress',
      dueDate: '2023-11-20',
      property: 'South Campus',
    },
    {
      id: '3',
      title: 'Lawn Fertilization',
      status: 'Pending',
      dueDate: '2023-11-25',
      property: 'North Campus',
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader title={employee.name}>
          <Link href="/employees" className="btn-outline mr-3">
            Back to Employees
          </Link>
          <Link href={`/employees/${params.id}/edit`} className="btn-primary">
            Edit Employee
          </Link>
        </PageHeader>

        {/* Status and Position */}
        <div className="mb-6 flex items-center space-x-4">
          <Badge variant="success" rounded>{employee.status}</Badge>
          <span className="text-neutral-500 dark:text-neutral-400">{employee.position}</span>
        </div>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} className="mb-8" />

        {/* Employee Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Employee Information */}
          <Card className="md:col-span-2">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-6">
                <div className="h-24 w-24 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden flex items-center justify-center">
                  <span className="text-neutral-500 dark:text-neutral-400">Photo</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Employee Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Email</h3>
                    <p className="mt-1 text-neutral-900 dark:text-white">{employee.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Phone</h3>
                    <p className="mt-1 text-neutral-900 dark:text-white">{employee.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Department</h3>
                    <p className="mt-1 text-neutral-900 dark:text-white">{employee.department}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Hire Date</h3>
                    <p className="mt-1 text-neutral-900 dark:text-white">{employee.hireDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Supervisor</h3>
                    <p className="mt-1 text-neutral-900 dark:text-white">{employee.supervisor}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Bio</h3>
              <p className="mt-1 text-neutral-900 dark:text-white">{employee.bio}</p>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Active Tasks</h3>
                  <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">5</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Properties Assigned</h3>
                  <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">2</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Equipment Assigned</h3>
                  <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">3</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Tasks Completed (Month)</h3>
                  <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">12</p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button type="button" className="btn-outline w-full">
                  Assign Task
                </button>
                <button type="button" className="btn-outline w-full">
                  Assign Property
                </button>
                <button type="button" className="btn-outline w-full">
                  Send Message
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Assigned Properties */}
        <Card className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Assigned Properties</h2>
            <Link href={`/employees/${params.id}/properties`} className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              View All Properties
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {assignedProperties.map((property) => (
                  <tr key={property.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      <Link href={`/properties/${property.id}`} className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        {property.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {property.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900 dark:text-white">
                      {property.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      <button type="button" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mr-3">
                        View
                      </button>
                      <button type="button" className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Tasks */}
        <Card className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Recent Tasks</h2>
            <Link href={`/employees/${params.id}/tasks`} className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              View All Tasks
            </Link>
          </div>
          
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
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {recentTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      <Link href={`/tasks/${task.id}`} className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        {task.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Badge 
                        variant={
                          task.status === 'Completed' ? 'success' : 
                          task.status === 'In Progress' ? 'warning' : 
                          'info'
                        }
                        size="sm"
                      >
                        {task.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {task.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {task.property}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      <button type="button" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mr-3">
                        View
                      </button>
                      <button type="button" className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
} 