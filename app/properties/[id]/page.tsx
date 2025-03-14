"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { TabNavigation } from '../../components/ui/TabNavigation';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { GoogleMapComponent } from '../../components/ui/GoogleMap';

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

  // Get current user role and access control methods
  const { 
    isAdmin, 
    isManager, 
    isFieldTechnician, 
    canAccessProperty, 
    canViewEmployees 
  } = useAuth();
  
  // Check if user has access to this property
  const hasAccess = canAccessProperty(params.id);
  
  // State to track which map layers are visible
  const [visibleLayers, setVisibleLayers] = useState({
    zones: true,
    irrigation: false,
    mowers: false,
    staff: canViewEmployees(), // Only show staff layer if user can view employees
    droneData: false
  });

  // Toggle a specific layer
  const toggleLayer = (layer: keyof typeof visibleLayers) => {
    // If trying to toggle staff layer but user can't view employees, return
    if (layer === 'staff' && !canViewEmployees()) return;
    
    setVisibleLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };
  
  // Define tabs for the property detail view - simplified for technicians
  const tabs = isFieldTechnician() 
    ? [
        { label: 'Overview', href: `/properties/${params.id}`, isActive: true },
        { label: 'Map', href: `/properties/${params.id}/map` },
      ]
    : [
        { label: 'Overview', href: `/properties/${params.id}`, isActive: true },
        { label: 'Map', href: `/properties/${params.id}/map` },
        { label: 'Equipment', href: `/properties/${params.id}/equipment` },
        { label: 'Employees', href: `/properties/${params.id}/employees` },
        { label: 'Tasks', href: `/properties/${params.id}/tasks` },
      ];

  // If user doesn't have access to this property, show access denied
  if (!hasAccess) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Access Denied
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              You do not have permission to view this property.
            </p>
            <Link href="/properties" className="btn-primary">
              Return to Properties
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader title={property.name}>
          <Link href="/properties" className="btn-outline mr-3">
            Back to Properties
          </Link>
          {/* Only show Edit button for admin and managers */}
          {(isAdmin() || isManager()) && (
            <Link href={`/properties/${params.id}/edit`} className="btn-primary">
              Edit Property
            </Link>
          )}
        </PageHeader>

        {/* Status and Address */}
        <div className="mb-6 flex items-center space-x-4">
          <Badge variant="success" rounded>{property.status}</Badge>
          <span className="text-neutral-500 dark:text-neutral-400">{property.address}</span>
        </div>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} className="mb-8" />
        
        {/* Property Map with Layer Controls - Moved to top */}
        <Card className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Property Map</h2>
            
            {/* Map Layer Controls */}
            <div className="flex flex-wrap gap-2">
              <button 
                type="button" 
                className={`px-3 py-1.5 text-sm rounded-full ${visibleLayers.zones ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} hover:bg-green-200`}
                onClick={() => toggleLayer('zones')}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Zones icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Zones
                </span>
              </button>
              <button 
                type="button" 
                className={`px-3 py-1.5 text-sm rounded-full ${visibleLayers.irrigation ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} hover:bg-blue-200`}
                onClick={() => toggleLayer('irrigation')}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Irrigation icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Irrigation
                </span>
              </button>
              <button 
                type="button" 
                className={`px-3 py-1.5 text-sm rounded-full ${visibleLayers.mowers ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'} hover:bg-yellow-200`}
                onClick={() => toggleLayer('mowers')}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Mowers icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Mowers
                </span>
              </button>
              {/* Only show staff layer control if user can view employees */}
              {canViewEmployees() && (
                <button 
                  type="button" 
                  className={`px-3 py-1.5 text-sm rounded-full ${visibleLayers.staff ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'} hover:bg-purple-200`}
                  onClick={() => toggleLayer('staff')}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <title>Staff location icon</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Staff
                  </span>
                </button>
              )}
              <button 
                type="button" 
                className={`px-3 py-1.5 text-sm rounded-full ${visibleLayers.droneData ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'} hover:bg-indigo-200`}
                onClick={() => toggleLayer('droneData')}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Drone data icon</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  Drone Data
                </span>
              </button>
            </div>
          </div>
          
          <div className="h-96 rounded-lg">
            <GoogleMapComponent 
              center={{ lat: 39.781719, lng: -89.650150 }}
              zoom={17}
              locations={[{
                id: property.id,
                position: { lat: 39.781719, lng: -89.650150 },
                title: property.name,
                description: property.address
              }]}
              boundaries={[{
                paths: [
                  { lat: 39.784719, lng: -89.653150 },
                  { lat: 39.784719, lng: -89.648150 },
                  { lat: 39.779719, lng: -89.648150 },
                  { lat: 39.779719, lng: -89.653150 }
                ]
              }]}
              className="h-full w-full rounded-md"
              showCurrentLocation={true}
              showIrrigationLayer={visibleLayers.irrigation}
              propertyId={property.id}
            />
          </div>
        </Card>

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
                {/* Only show employees stat if user can view employees */}
                {canViewEmployees() && (
                  <div>
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Employees</h3>
                    <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-white">5</p>
                  </div>
                )}
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
      </div>
    </MainLayout>
  );
}
