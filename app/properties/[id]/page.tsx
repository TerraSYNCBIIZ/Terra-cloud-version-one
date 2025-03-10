"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { TabNavigation } from '../../components/ui/TabNavigation';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  // Placeholder property data - this would come from an API in a real app
  const property = {
    id: params.id,
    name: 'North Campus',
    address: '1234 College Avenue, Springfield, IL',
    status: 'Active',
    type: 'Academic',
    size: '120 acres',
    manager: 'John Smith',
    description: 'Main campus area with academic buildings, recreation fields, and administrative facilities.',
    createdAt: '2023-01-15',
  };

  // Define tabs for the property detail view
  const tabs = [
    { label: 'Overview', href: `/properties/${params.id}`, isActive: true },
    { label: 'Map', href: `/properties/${params.id}/map` },
    { label: 'Equipment', href: `/properties/${params.id}/equipment` },
    { label: 'Employees', href: `/properties/${params.id}/employees` },
    { label: 'Tasks', href: `/properties/${params.id}/tasks` },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader title={property.name}>
          <Link href="/properties" className="btn-outline mr-3">
            Back to Properties
          </Link>
          <Link href={`/properties/${params.id}/edit`} className="btn-primary">
            Edit Property
          </Link>
        </PageHeader>

        {/* Status and Address */}
        <div className="mb-6 flex items-center space-x-4">
          <Badge variant="success" rounded>{property.status}</Badge>
          <span className="text-neutral-500 dark:text-neutral-400">{property.address}</span>
        </div>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} className="mb-8" />

        {/* Property Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Property Information */}
          <Card className="md:col-span-2">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Property Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Description</h3>
                <p className="mt-1 text-neutral-900 dark:text-white">{property.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Property Type</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{property.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Size</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{property.size}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Property Manager</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{property.manager}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Added On</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{property.createdAt}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Property Stats */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Active Tasks</h3>
                  <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">12</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Equipment</h3>
                  <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">8</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Employees</h3>
                  <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">5</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Zones</h3>
                  <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">3</p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                        <title>Clock icon</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-neutral-900 dark:text-white">Task "Repair Irrigation System" completed</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Property Map */}
        <Card className="mt-6">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Property Map</h2>
          <div className="bg-neutral-100 dark:bg-neutral-800 h-96 rounded-lg flex items-center justify-center">
            <p className="text-neutral-500 dark:text-neutral-400">Map visualization will be displayed here</p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
} 