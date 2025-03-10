"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import { PageHeader } from '../../../components/layout/PageHeader';
import { TabNavigation } from '../../../components/ui/TabNavigation';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export default function EquipmentMaintenancePage({ params }: { params: { id: string } }) {
  // Placeholder equipment data - this would come from an API in a real app
  const equipment = {
    id: params.id,
    name: 'Husqvarna Automower 450X',
    model: 'Automower 450X',
    manufacturer: 'Husqvarna',
    status: 'Operational',
    lastMaintenance: '2023-10-05',
    nextMaintenanceDue: '2024-01-05',
  };

  // Define tabs for the equipment detail view
  const tabs = [
    { label: 'Overview', href: `/equipment/${params.id}` },
    { label: 'Maintenance History', href: `/equipment/${params.id}/maintenance`, isActive: true },
    { label: 'Documents', href: `/equipment/${params.id}/documents` },
    { label: 'Tasks', href: `/equipment/${params.id}/tasks` },
    { label: 'Settings', href: `/equipment/${params.id}/settings` },
  ];

  // Comprehensive maintenance history
  const maintenanceHistory = [
    {
      id: '1',
      type: 'Regular Service',
      date: '2023-10-05',
      technician: 'Mike Johnson',
      description: 'Oil change, filter replacement, general inspection',
      cost: '$150.00',
      status: 'completed',
      notes: 'Equipment in good condition. Recommended to check battery in next service.',
      workOrderId: 'WO-2023-1005',
    },
    {
      id: '2',
      type: 'Repair',
      date: '2023-07-22',
      technician: 'Sarah Williams',
      description: 'Fixed hydraulic fluid leak, replaced seal',
      cost: '$320.00',
      status: 'completed',
      notes: 'Leak identified in the main hydraulic line. Replaced both seal and a section of the line as preventive measure.',
      workOrderId: 'WO-2023-0722',
    },
    {
      id: '3',
      type: 'Regular Service',
      date: '2023-04-10',
      technician: 'Mike Johnson',
      description: 'Oil change, filter replacement, blade sharpening',
      cost: '$175.00',
      status: 'completed',
      notes: 'Blades showed significant wear, sharpened and adjusted for optimal cutting.',
      workOrderId: 'WO-2023-0410',
    },
    {
      id: '4',
      type: 'Emergency Repair',
      date: '2023-01-15',
      technician: 'Alex Chen',
      description: 'Repaired damaged wire sensor and chassis damage',
      cost: '$480.00',
      status: 'completed',
      notes: 'Equipment was damaged by impact with landscaping rocks. Replaced sensors and repaired chassis.',
      workOrderId: 'WO-2023-0115',
    },
    {
      id: '5',
      type: 'Regular Service',
      date: '2022-12-05',
      technician: 'Mike Johnson',
      description: 'Seasonal maintenance and winter storage preparation',
      cost: '$200.00',
      status: 'completed',
      notes: 'Equipment prepared for winter storage. Battery maintained at partial charge and fluids checked.',
      workOrderId: 'WO-2022-1205',
    },
    {
      id: '6',
      type: 'Software Update',
      date: '2022-09-18',
      technician: 'Remote Support',
      description: 'Firmware update to version 4.2.3',
      cost: '$0.00',
      status: 'completed',
      notes: 'Update applied remotely. New features include improved navigation algorithm and battery optimization.',
      workOrderId: 'WO-2022-0918',
    },
    {
      id: '7',
      type: 'Regular Service',
      date: '2022-08-30',
      technician: 'Sarah Williams',
      description: 'Oil change, filter replacement, general inspection',
      cost: '$150.00',
      status: 'completed',
      notes: 'All systems functioning normally.',
      workOrderId: 'WO-2022-0830',
    },
  ];

  // Upcoming maintenance
  const upcomingMaintenance = [
    {
      id: '101',
      type: 'Regular Service',
      date: '2024-01-05',
      technician: 'To be assigned',
      description: 'Oil change, filter replacement, general inspection',
      status: 'scheduled',
      workOrderId: 'WO-2024-0105',
    },
    {
      id: '102',
      type: 'Component Replacement',
      date: '2024-03-15',
      technician: 'To be assigned',
      description: 'Battery replacement (per manufacturer recommendation)',
      status: 'planned',
      workOrderId: 'WO-2024-0315-P',
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader title={`${equipment.name} - Maintenance History`}>
          <Link href="/equipment" className="btn-outline mr-3">
            Back to Equipment
          </Link>
          <Link href={`/equipment/${params.id}/maintenance/new`} className="btn-primary">
            Schedule Maintenance
          </Link>
        </PageHeader>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} className="mb-8" />
        
        {/* Maintenance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Last Maintenance</h2>
            <p className="text-xl font-semibold text-neutral-900 dark:text-white">{equipment.lastMaintenance}</p>
          </Card>
          
          <Card>
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Next Due</h2>
            <p className="text-xl font-semibold text-primary-600 dark:text-primary-400">{equipment.nextMaintenanceDue}</p>
          </Card>
          
          <Card>
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Total Records</h2>
            <p className="text-xl font-semibold text-neutral-900 dark:text-white">{maintenanceHistory.length}</p>
          </Card>
          
          <Card>
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Total Cost (YTD)</h2>
            <p className="text-xl font-semibold text-neutral-900 dark:text-white">$1,475.00</p>
          </Card>
        </div>
        
        {/* Upcoming Maintenance */}
        <Card className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Upcoming Maintenance</h2>
            <button type="button" className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
              View Calendar
            </button>
          </div>
          
          {upcomingMaintenance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Work Order
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {upcomingMaintenance.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                        {record.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-900 dark:text-white">
                        {record.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {record.status === 'scheduled' ? (
                          <Badge variant="info" size="sm">Scheduled</Badge>
                        ) : (
                          <Badge variant="neutral" size="sm">Planned</Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                        {record.workOrderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <Link 
                          href={`/equipment/${params.id}/maintenance/${record.id}`}
                          className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          View
                        </Link>
                        <span className="mx-2 text-neutral-300 dark:text-neutral-600">|</span>
                        <button
                          type="button"
                          className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                          onClick={() => alert('This would open the edit maintenance record modal')}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 text-neutral-500 dark:text-neutral-400">
              No upcoming maintenance scheduled
            </div>
          )}
        </Card>
        
        {/* Maintenance History */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Maintenance History</h2>
            <div className="flex items-center space-x-2">
              <button 
                type="button" 
                className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                onClick={() => alert('This would export a CSV file with maintenance records')}
              >
                Export CSV
              </button>
              <button 
                type="button" 
                className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                onClick={() => alert('This would print the maintenance records')}
              >
                Print
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Technician
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Cost
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Work Order
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {maintenanceHistory.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {record.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900 dark:text-white">
                      {record.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {record.technician}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {record.cost}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {record.workOrderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <Link 
                        href={`/equipment/${params.id}/maintenance/${record.id}`}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        View
                      </Link>
                      <span className="mx-2 text-neutral-300 dark:text-neutral-600">|</span>
                      <button
                        type="button"
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                        onClick={() => alert('This would open the edit maintenance record modal')}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-neutral-700 dark:text-neutral-400">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{maintenanceHistory.length}</span> of <span className="font-medium">{maintenanceHistory.length}</span> records
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