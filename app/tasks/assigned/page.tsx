"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge, type BadgeVariant } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';

export default function AssignedTasksPage() {
  const { user } = useAuth();

  // Mock tasks data - would come from an API based on user's assigned tasks
  const assignedTasks = [
    {
      id: "101",
      title: "Irrigation System Maintenance",
      description: "Check and repair sprinklers in the east zone of North Campus",
      status: "In Progress",
      priority: "High",
      dueDate: "Today",
      location: "North Campus - East Zone",
      equipment: ["Irrigation Control System"]
    },
    {
      id: "102",
      title: "Mower Deployment",
      description: "Deploy and monitor robotic mowers for the scheduled weekly mowing",
      status: "Pending",
      priority: "Medium",
      dueDate: "Tomorrow",
      location: "North Campus - West Zone",
      equipment: ["John Deere X758", "Husqvarna Automower 450X"]
    },
    {
      id: "103",
      title: "Equipment Inspection",
      description: "Perform weekly inspection of assigned mowers and report any issues",
      status: "Pending",
      priority: "Low",
      dueDate: "This Week",
      location: "North Campus - Maintenance Shed",
      equipment: ["John Deere X758", "Husqvarna Automower 450X"]
    }
  ];

  // Function to get priority badge color
  const getPriorityBadgeVariant = (priority: string): BadgeVariant => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'neutral';
    }
  };

  // Function to get status badge color
  const getStatusBadgeVariant = (status: string): BadgeVariant => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'primary';
      case 'Pending': return 'neutral';
      case 'Overdue': return 'error';
      default: return 'neutral';
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="My Tasks" 
          subtitle={`Tasks assigned to ${user?.name || 'you'}`}
        >
          <div className="flex space-x-2">
            <button
              type="button"
              className="btn-primary flex items-center"
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mark Complete
            </button>
          </div>
        </PageHeader>
        
        <div className="mt-6 space-y-6">
          {assignedTasks.map((task) => (
            <Card key={task.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="px-6 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                    {task.title}
                  </h3>
                  <div className="flex space-x-2">
                    <Badge variant={getPriorityBadgeVariant(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                </div>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Due: {task.dueDate}
                </p>
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-700 px-6 py-4">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {task.description}
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      Location
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 dark:text-white">
                      {task.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      Required Equipment
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 dark:text-white">
                      {task.equipment.join(", ")}
                    </dd>
                  </div>
                </div>
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-700 px-6 py-4 bg-neutral-50 dark:bg-neutral-800">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="btn-outline-secondary"
                  >
                    Log Activity
                  </button>
                  <Link
                    href={`/tasks/${task.id}`}
                    className="btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
