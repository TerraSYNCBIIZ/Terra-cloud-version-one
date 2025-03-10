"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { TabNavigation } from '../../components/ui/TabNavigation';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export default function EquipmentDetailPage({ params }: { params: { id: string } }) {
  // Placeholder equipment data - this would come from an API in a real app
  const equipment = {
    id: params.id,
    name: 'John Deere X758 Tractor',
    model: 'X758',
    manufacturer: 'John Deere',
    status: 'Operational',
    purchaseDate: '2022-03-15',
    serialNumber: 'JD758493021',
    propertyAssigned: 'North Campus',
    propertyId: '123',
    description: 'Diesel-powered garden tractor with 24 HP engine and 60-inch mower deck.',
    lastMaintenance: '2023-10-05',
    nextMaintenanceDue: '2024-01-05',
  };

  // Define tabs for the equipment detail view
  const tabs = [
    { label: 'Overview', href: `/equipment/${params.id}`, isActive: true },
    { label: 'Maintenance History', href: `/equipment/${params.id}/maintenance` },
    { label: 'Documents', href: `/equipment/${params.id}/documents` },
    { label: 'Tasks', href: `/equipment/${params.id}/tasks` },
    { label: 'Settings', href: `/equipment/${params.id}/settings` },
  ];

  // Sample maintenance history
  const maintenanceHistory = [
    {
      id: '1',
      type: 'Regular Service',
      date: '2023-10-05',
      technician: 'Mike Johnson',
      description: 'Oil change, filter replacement, general inspection',
      cost: '$150.00',
    },
    {
      id: '2',
      type: 'Repair',
      date: '2023-07-22',
      technician: 'Sarah Williams',
      description: 'Fixed hydraulic fluid leak, replaced seal',
      cost: '$320.00',
    },
    {
      id: '3',
      type: 'Regular Service',
      date: '2023-04-10',
      technician: 'Mike Johnson',
      description: 'Oil change, filter replacement, blade sharpening',
      cost: '$175.00',
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader title={equipment.name}>
          <Link href="/equipment" className="btn-outline mr-3">
            Back to Equipment
          </Link>
          <Link href={`/equipment/${params.id}/edit`} className="btn-primary">
            Edit Equipment
          </Link>
        </PageHeader>

        {/* Status and Property Assignment */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <Badge variant="success" rounded>{equipment.status}</Badge>
          <span className="text-neutral-500 dark:text-neutral-400">
            Assigned to: 
            <Link href={`/properties/${equipment.propertyId}`} className="ml-1 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              {equipment.propertyAssigned}
            </Link>
          </span>
        </div>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} className="mb-8" />

        {/* Equipment Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Equipment Information */}
          <Card className="md:col-span-2">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Equipment Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Description</h3>
                <p className="mt-1 text-neutral-900 dark:text-white">{equipment.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Manufacturer</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{equipment.manufacturer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Model</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{equipment.model}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Serial Number</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{equipment.serialNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Purchase Date</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{equipment.purchaseDate}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Maintenance Stats */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Maintenance Status</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Last Maintenance</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{equipment.lastMaintenance}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Next Due</h3>
                  <p className="mt-1 text-neutral-900 dark:text-white">{equipment.nextMaintenanceDue}</p>
                </div>
                <div>
                  <button type="button" className="btn-outline w-full">
                    Schedule Maintenance
                  </button>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button type="button" className="btn-outline w-full">
                  Log Issue
                </button>
                <button type="button" className="btn-outline w-full">
                  View Documents
                </button>
                <button type="button" className="btn-outline w-full">
                  Request Transfer
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Maintenance History */}
        <Card className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Recent Maintenance History</h2>
            <Link href={`/equipment/${params.id}/maintenance`} className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              View Full History
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Technician
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {maintenanceHistory.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {record.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {record.technician}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900 dark:text-white">
                      {record.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {record.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Equipment Image/Photos */}
        <Card className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Equipment Photos</h2>
            <button type="button" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              Add Photos
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-neutral-200 dark:bg-neutral-700 aspect-square rounded-lg overflow-hidden flex items-center justify-center">
                <p className="text-neutral-500 dark:text-neutral-400">Equipment Photo {item}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
} 