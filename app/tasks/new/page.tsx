"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormLayout } from '../../components/layout/FormLayout';
import { FormSection } from '../../components/layout/FormSection';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Card } from '../../components/ui/Card';

export default function NewTaskPage() {
  // This would be connected to form state management in a real app
  const taskPriorities = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const taskStatuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
  ];

  // Mock property options - would come from API
  const propertyOptions = [
    { value: '1', label: 'North Campus' },
    { value: '2', label: 'South Campus' },
    { value: '3', label: 'Main Office' },
    { value: '4', label: 'Athletic Fields' },
    { value: '5', label: 'Research Park' },
  ];

  // Mock employee options - would come from API
  const employeeOptions = [
    { value: '1', label: 'Sarah Johnson' },
    { value: '2', label: 'Robert Smith' },
    { value: '3', label: 'Michael Williams' },
    { value: '4', label: 'Jennifer Davis' },
    { value: '5', label: 'David Wilson' },
  ];

  // Mock equipment options - would come from API
  const equipmentOptions = [
    { value: '1', label: 'John Deere X758 Tractor' },
    { value: '2', label: 'Irrigation Control System' },
    { value: '3', label: 'Husqvarna Chainsaw' },
    { value: '4', label: 'Honda Leaf Blower' },
    { value: '5', label: 'Pressure Washer' },
  ];

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title="Create New Task">
          <Link href="/tasks" className="btn-outline">
            Cancel
          </Link>
        </PageHeader>

        <FormLayout
          title="Task Information"
          description="Enter the details of the new task. All fields marked with * are required."
          footer={
            <div className="flex justify-end space-x-4">
              <Link href="/tasks" className="btn-outline">
                Cancel
              </Link>
              <button type="submit" className="btn-primary">
                Create Task
              </button>
            </div>
          }
        >
          <form>
            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  id="taskTitle"
                  label="Task Title *" 
                  placeholder="Enter task title"
                  fullWidth
                  required
                />
                <Select
                  id="propertyId"
                  label="Property *"
                  options={propertyOptions}
                  fullWidth
                  required
                />
                <Select
                  id="status"
                  label="Status *"
                  options={taskStatuses}
                  fullWidth
                  required
                />
                <Select
                  id="priority"
                  label="Priority *"
                  options={taskPriorities}
                  fullWidth
                  required
                />
              </div>
            </FormSection>

            <FormSection title="Schedule" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  id="startDate"
                  label="Start Date *" 
                  type="date"
                  fullWidth
                  required
                />
                <Input 
                  id="dueDate"
                  label="Due Date *" 
                  type="date"
                  fullWidth
                  required
                />
                <Input 
                  id="estimatedHours"
                  label="Estimated Hours" 
                  type="number"
                  min="0.5"
                  step="0.5"
                  placeholder="e.g. 4"
                  fullWidth
                />
                <Select
                  id="assignedTo"
                  label="Assigned To *"
                  options={employeeOptions}
                  fullWidth
                  required
                />
              </div>
            </FormSection>

            <FormSection title="Task Details" className="mt-8">
              <div className="grid grid-cols-1 gap-6">
                <Textarea
                  id="description"
                  label="Task Description *"
                  placeholder="Enter detailed description of the task"
                  rows={4}
                  fullWidth
                  required
                />
                <div>
                  <label htmlFor="equipmentIds" className="form-label block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Related Equipment
                  </label>
                  <Card className="p-4">
                    <div className="space-y-2">
                      {equipmentOptions.map(option => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`equipment-${option.value}`}
                            name="equipmentIds"
                            type="checkbox"
                            value={option.value}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          />
                          <label htmlFor={`equipment-${option.value}`} className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
                <Input 
                  id="location"
                  label="Specific Location" 
                  placeholder="e.g. North Lawn, Building A Entrance"
                  fullWidth
                />
              </div>
            </FormSection>

            <FormSection title="Additional Information" className="mt-8">
              <div className="grid grid-cols-1 gap-6">
                <Textarea
                  id="notes"
                  label="Additional Notes"
                  placeholder="Enter any additional information that might be helpful"
                  rows={3}
                  fullWidth
                />
                <div>
                  <label className="form-label block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Attachments
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-neutral-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-neutral-600 dark:text-neutral-400">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-neutral-900 rounded-md font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 focus-within:outline-none">
                          <span>Upload files</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        PNG, JPG, PDF up to 10MB each
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="notifications"
                      name="notifications"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="notifications" className="font-medium text-neutral-700 dark:text-neutral-300">Send notifications</label>
                    <p className="text-neutral-500 dark:text-neutral-400">Notify assigned employee and property manager when this task is created.</p>
                  </div>
                </div>
              </div>
            </FormSection>
          </form>
        </FormLayout>
      </div>
    </MainLayout>
  );
} 