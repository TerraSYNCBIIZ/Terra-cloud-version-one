"use client";

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import Link from 'next/link';
import { GoogleMapComponent } from '../components/ui/GoogleMap';

export default function PropertiesPage() {
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
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-neutral-900 dark:text-white sm:text-3xl sm:truncate">
              Properties
            </h1>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="btn-outline mr-4"
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
            <Link 
              href="/properties/map" 
              className="btn-outline mr-4"
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Map View
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
        </div>

        {/* Properties Map View */}
        <div className="card mb-8">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Property Locations</h2>
          <div className="h-80 rounded-lg overflow-hidden">
            <GoogleMapComponent 
              center={center}
              zoom={13}
              locations={mapLocations}
              className="h-full w-full"
              showCurrentLocation={false}
            />
          </div>
        </div>

        {/* Properties List */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div key={property.id} className="card hover:shadow-lg transition-300">
              <div className="h-48 rounded-lg mb-4 overflow-hidden">
                <GoogleMapComponent 
                  center={property.location}
                  zoom={15}
                  locations={[{
                    id: property.id,
                    position: property.location,
                    title: property.name,
                    description: property.address
                  }]}
                  className="h-full w-full"
                  showCurrentLocation={false}
                />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-1">{property.name}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{property.address}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="badge-success">{property.status}</span>
                </div>
                <div className="flex space-x-2">
                  <button type="button" className="p-1 text-neutral-400 hover:text-primary-500">
                    <span className="sr-only">Edit</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <Link href={`/properties/${property.id}`} className="p-1 text-neutral-400 hover:text-primary-500">
                    <span className="sr-only">View details</span>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button type="button" aria-current="page" className="z-10 bg-primary-50 border-primary-500 text-primary-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              1
            </button>
            <button type="button" className="bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              2
            </button>
            <button type="button" className="bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              3
            </button>
            <button type="button" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </MainLayout>
  );
}
