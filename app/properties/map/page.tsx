"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { GoogleMapComponent } from '../../components/ui/GoogleMap';

export default function PropertiesMapPage() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  
  // Placeholder properties data - this would come from an API in a real app
  const properties = [
    {
      id: "1",
      name: 'North Campus',
      address: '1234 College Avenue, Springfield, IL',
      status: 'Active',
      type: 'Academic',
      location: { lat: 39.781719, lng: -89.650150 }
    },
    {
      id: "2",
      name: 'South Campus',
      address: '5678 University Drive, Springfield, IL',
      status: 'Active',
      type: 'Residential',
      location: { lat: 39.771719, lng: -89.645150 }
    },
    {
      id: "3",
      name: 'Research Park',
      address: '910 Innovation Way, Springfield, IL',
      status: 'Active',
      type: 'Research',
      location: { lat: 39.776719, lng: -89.655150 }
    },
    {
      id: "4",
      name: 'Athletic Fields',
      address: '2468 Sports Boulevard, Springfield, IL',
      status: 'Active',
      type: 'Athletic',
      location: { lat: 39.786719, lng: -89.653150 }
    },
    {
      id: "5",
      name: 'Main Office',
      address: '135 Administration Road, Springfield, IL',
      status: 'Active',
      type: 'Administrative',
      location: { lat: 39.779719, lng: -89.648150 }
    }
  ];

  // Mock property boundaries - in a real app, these would come from the API
  const propertyBoundaries = [
    {
      // North Campus boundary
      paths: [
        { lat: 39.784719, lng: -89.653150 },
        { lat: 39.784719, lng: -89.648150 },
        { lat: 39.779719, lng: -89.648150 },
        { lat: 39.779719, lng: -89.653150 }
      ]
    },
    {
      // South Campus boundary
      paths: [
        { lat: 39.774719, lng: -89.647150 },
        { lat: 39.774719, lng: -89.643150 },
        { lat: 39.769719, lng: -89.643150 },
        { lat: 39.769719, lng: -89.647150 }
      ]
    }
  ];

  // Convert properties to map locations
  const mapLocations = properties.map(property => ({
    id: property.id,
    position: property.location,
    title: property.name,
    description: property.address
  }));

  // Calculate map center (average of all property locations)
  const center = {
    lat: properties.reduce((sum, property) => sum + property.location.lat, 0) / properties.length,
    lng: properties.reduce((sum, property) => sum + property.location.lng, 0) / properties.length
  };

  // Handle map clicks
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      console.log("Map clicked at:", e.latLng.lat(), e.latLng.lng());
      // Could be used to add new property locations
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="Properties Map"
          subtitle="View and manage all properties"
        >
          <div className="flex space-x-2">
            <Link href="/properties" className="btn-outline">
              <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              List View
            </Link>
            <button
              type="button"
              className="btn-primary"
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Property
            </button>
          </div>
        </PageHeader>
        
        <Card className="mt-6 p-0 overflow-hidden">
          <div className="p-4 bg-primary-50 dark:bg-primary-950 border-b border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Property Locations</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Showing {properties.length} properties in Springfield, IL
            </p>
          </div>
          <div className="h-[600px]">
            <GoogleMapComponent 
              center={center}
              zoom={13}
              locations={mapLocations}
              boundaries={propertyBoundaries}
              className="h-full w-full"
              showCurrentLocation={true}
              onClick={handleMapClick}
            />
          </div>
        </Card>
        
        {/* List of properties shown below the map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {properties.map(property => (
            <Link key={property.id} href={`/properties/${property.id}`} className="block">
              <Card className="h-full hover:shadow-lg transition-300">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{property.name}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{property.address}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="badge-success">
                    {property.status}
                  </span>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {property.type}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
