"use client";

import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';

export default function AssignedEquipmentPage() {
  const { user } = useAuth();

  // Mock equipment data - would come from an API based on user's assigned equipment
  const assignedEquipment = [
    {
      id: "101",
      name: "John Deere X758",
      type: "Robotic Mower",
      status: "Active",
      location: "North Campus - East Zone",
      lastMaintenance: "2 weeks ago",
      nextMaintenance: "In 2 weeks"
    },
    {
      id: "102",
      name: "Husqvarna Automower 450X",
      type: "Robotic Mower",
      status: "Active",
      location: "North Campus - West Zone",
      lastMaintenance: "1 week ago",
      nextMaintenance: "In 3 weeks"
    },
    {
      id: "103",
      name: "Irrigation Control System",
      type: "Irrigation",
      status: "Active",
      location: "North Campus - Full Coverage",
      lastMaintenance: "1 month ago",
      nextMaintenance: "In 2 days"
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="My Assigned Equipment" 
          subtitle={`Equipment assigned to ${user?.name || 'you'}`}
        />
        
        <div className="mt-6 space-y-6">
          {assignedEquipment.map((equipment) => (
            <Card key={equipment.id} className="overflow-hidden">
              <div className="px-6 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                    {equipment.name}
                  </h3>
                  <span className="badge-success">
                    {equipment.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {equipment.type}
                </p>
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-700 px-6 py-4">
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4">
                  <div>
                    <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      Location
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 dark:text-white">
                      {equipment.location}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      Last Maintenance
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 dark:text-white">
                      {equipment.lastMaintenance}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      Next Maintenance
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 dark:text-white">
                      {equipment.nextMaintenance}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-700 px-6 py-4 bg-neutral-50 dark:bg-neutral-800">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="btn-outline-secondary"
                  >
                    Maintenance Log
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
