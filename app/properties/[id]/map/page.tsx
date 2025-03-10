"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import { PageHeader } from '../../../components/layout/PageHeader';
import { TabNavigation } from '../../../components/ui/TabNavigation';
import { Card } from '../../../components/ui/Card';
import { GoogleMapComponent } from '../../../components/ui/GoogleMap';

export default function PropertyMapPage({ params }: { params: { id: string } }) {
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
    location: {
      lat: 39.781719,
      lng: -89.650150 // Springfield, IL coordinates
    },
    boundaries: [
      { lat: 39.783719, lng: -89.653150 },
      { lat: 39.783719, lng: -89.647150 },
      { lat: 39.779719, lng: -89.647150 },
      { lat: 39.779719, lng: -89.653150 }
    ]
  };

  // Define tabs for the property detail view
  const tabs = [
    { label: 'Overview', href: `/properties/${params.id}` },
    { label: 'Map', href: `/properties/${params.id}/map`, isActive: true },
    { label: 'Equipment', href: `/properties/${params.id}/equipment` },
    { label: 'Employees', href: `/properties/${params.id}/employees` },
    { label: 'Tasks', href: `/properties/${params.id}/tasks` },
  ];

  // Define a location for the map marker
  const location = {
    id: property.id,
    position: property.location,
    title: property.name,
    description: property.address
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title={property.name}
          subtitle="Property Map View"
        >
          <Link href="/properties" className="btn-outline mr-2">
            <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Properties
          </Link>
          <button
            type="button"
            className="btn-primary"
          >
            <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Property
          </button>
        </PageHeader>
        
        <TabNavigation tabs={tabs} className="mt-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Property Information - Takes 1/3 of width on large screens */}
          <Card className="lg:col-span-1">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Property Information</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Address</h4>
                <p className="mt-1">{property.address}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Type</h4>
                <p className="mt-1">{property.type}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Size</h4>
                <p className="mt-1">{property.size}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Manager</h4>
                <p className="mt-1">{property.manager}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Status</h4>
                <p className="mt-1">
                  <span className="badge-success">Active</span>
                </p>
              </div>
            </div>
          </Card>
          
          {/* Map View - Takes 2/3 of width on large screens */}
          <Card className="lg:col-span-2 h-[500px]">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Map View</h3>
            <div className="h-full">
              <GoogleMapComponent 
                center={property.location}
                zoom={16}
                locations={[location]}
                className="h-[400px] w-full rounded-md border border-neutral-200 dark:border-neutral-700"
              />
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
} 