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

export default function NewEmployeePage() {
  // This would be connected to form state management in a real app
  const employeeStatuses = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'on-leave', label: 'On Leave' },
  ];

  const departmentOptions = [
    { value: 'facilities', label: 'Facilities Management' },
    { value: 'landscaping', label: 'Landscaping' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'administration', label: 'Administration' },
    { value: 'security', label: 'Security' },
  ];

  const positionOptions = [
    { value: 'manager', label: 'Manager' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'technician', label: 'Technician' },
    { value: 'specialist', label: 'Specialist' },
    { value: 'administrator', label: 'Administrator' },
  ];

  // Mock property options - would come from API
  const propertyOptions = [
    { value: '1', label: 'North Campus' },
    { value: '2', label: 'South Campus' },
    { value: '3', label: 'Main Office' },
    { value: '4', label: 'Athletic Fields' },
    { value: '5', label: 'Research Park' },
  ];

  // Mock supervisor options - would come from API
  const supervisorOptions = [
    { value: '1', label: 'Michael Williams' },
    { value: '2', label: 'Jennifer Davis' },
    { value: '3', label: 'James Johnson' },
  ];

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title="Add New Employee">
          <Link href="/employees" className="btn-outline">
            Cancel
          </Link>
        </PageHeader>

        <FormLayout
          title="Employee Information"
          description="Enter the details of the new employee. All fields marked with * are required."
          footer={
            <div className="flex justify-end space-x-4">
              <Link href="/employees" className="btn-outline">
                Cancel
              </Link>
              <button type="submit" className="btn-primary">
                Add Employee
              </button>
            </div>
          }
        >
          <form>
            <FormSection title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input 
                  id="firstName"
                  label="First Name *" 
                  placeholder="Enter first name"
                  fullWidth
                  required
                />
                <Input 
                  id="middleName"
                  label="Middle Name" 
                  placeholder="Enter middle name"
                  fullWidth
                />
                <Input 
                  id="lastName"
                  label="Last Name *" 
                  placeholder="Enter last name"
                  fullWidth
                  required
                />
              </div>
              
              <div className="mt-6">
                <label htmlFor="profilePhoto" className="form-label block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Profile Photo
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                      <title>User avatar placeholder</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <label htmlFor="profilePhoto" className="cursor-pointer bg-white dark:bg-neutral-900 px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">
                      Upload Photo
                      <input id="profilePhoto" name="profilePhoto" type="file" className="sr-only" accept="image/*" />
                    </label>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      JPG, PNG or GIF up to 2MB
                    </p>
                  </div>
                </div>
              </div>
            </FormSection>

            <FormSection title="Contact Information" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  id="email"
                  label="Email Address *" 
                  type="email"
                  placeholder="name@example.com"
                  fullWidth
                  required
                />
                <Input 
                  id="phone"
                  label="Phone Number *" 
                  type="tel"
                  placeholder="(555) 123-4567"
                  fullWidth
                  required
                />
                <Input 
                  id="emergencyContactName"
                  label="Emergency Contact Name" 
                  placeholder="Enter name"
                  fullWidth
                />
                <Input 
                  id="emergencyContactPhone"
                  label="Emergency Contact Phone" 
                  type="tel"
                  placeholder="(555) 123-4567"
                  fullWidth
                />
              </div>
            </FormSection>

            <FormSection title="Employment Information" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  id="department"
                  label="Department *"
                  options={departmentOptions}
                  fullWidth
                  required
                />
                <Select
                  id="position"
                  label="Position *"
                  options={positionOptions}
                  fullWidth
                  required
                />
                <Input 
                  id="employeeId"
                  label="Employee ID *" 
                  placeholder="e.g. EMP-1234"
                  fullWidth
                  required
                />
                <Select
                  id="status"
                  label="Status *"
                  options={employeeStatuses}
                  fullWidth
                  required
                />
                <Input 
                  id="hireDate"
                  label="Hire Date *" 
                  type="date"
                  fullWidth
                  required
                />
                <Select
                  id="supervisorId"
                  label="Supervisor"
                  options={supervisorOptions}
                  fullWidth
                />
              </div>
            </FormSection>

            <FormSection title="Property Assignments" className="mt-8">
              <div className="grid grid-cols-1 gap-6">
                <Card className="p-4">
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">Assign to Properties</h3>
                  <div className="space-y-3">
                    {propertyOptions.map(option => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`property-${option.value}`}
                          name="propertyIds"
                          type="checkbox"
                          value={option.value}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label htmlFor={`property-${option.value}`} className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                          {option.label}
                        </label>
                        <div className="ml-auto">
                          <select
                            aria-label={`Role at ${option.label}`}
                            className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            defaultValue="staff"
                          >
                            <option value="primary">Primary Manager</option>
                            <option value="secondary">Secondary Manager</option>
                            <option value="staff">Staff</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </FormSection>

            <FormSection title="Additional Information" className="mt-8">
              <div className="grid grid-cols-1 gap-6">
                <Textarea
                  id="bio"
                  label="Bio / Background"
                  placeholder="Enter employee's experience, skills, specializations, etc."
                  rows={4}
                  fullWidth
                />
                <Textarea
                  id="notes"
                  label="Administrative Notes"
                  placeholder="Enter any additional internal notes about this employee"
                  rows={3}
                  fullWidth
                />
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sendCredentials"
                      name="sendCredentials"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sendCredentials" className="font-medium text-neutral-700 dark:text-neutral-300">Send login credentials</label>
                    <p className="text-neutral-500 dark:text-neutral-400">Email login information to this employee.</p>
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