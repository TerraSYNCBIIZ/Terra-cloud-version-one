"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';

export default function EquipmentPage() {
  // Get user role and access control methods
  const { isAdmin, isManager, isFieldTechnician, canAccessEquipment, getUserProperties } = useAuth();
  
  // Get user's assigned properties
  const userProperties = getUserProperties();
  
  // Mock equipment data - in a real app, this would be filtered by API based on user permissions
  const equipment = [
    {
      id: '101',
      name: 'Husqvarna Automower 450X',
      type: 'Robotic Mower', 
      status: 'Active',
      battery: 85,
      lastConnected: '5 mins ago',
      propertyId: '1',
      propertyName: 'North Campus'
    },
    {
      id: '102',
      name: 'Rain Bird ESP-TM2',
      type: 'Irrigation System',
      status: 'Active',
      battery: 100,
      lastConnected: '10 mins ago',
      propertyId: '1',
      propertyName: 'North Campus'
    },
    {
      id: '103',
      name: 'Toro 3500D',
      type: 'Line Painter',
      status: 'Maintenance',
      battery: 50,
      lastConnected: '15 mins ago',
      propertyId: '1',
      propertyName: 'North Campus'
    },
    {
      id: '104',
      name: 'John Deere X590',
      type: 'Robotic Mower',
      status: 'Active',
      battery: 90,
      lastConnected: '20 mins ago',
      propertyId: '2',
      propertyName: 'South Campus'
    },
    {
      id: '105',
      name: 'Hunter ICC2',
      type: 'Irrigation System',
      status: 'Inactive',
      battery: 0,
      lastConnected: '1 day ago',
      propertyId: '2',
      propertyName: 'South Campus'
    },
    {
      id: '106',
      name: 'TruBot Range Picker',
      type: 'Range Picker',
      status: 'Active',
      battery: 75,
      lastConnected: '25 mins ago',
      propertyId: '3',
      propertyName: 'Research Park'
    },
  ];
  
  // Filter equipment based on user role and permissions
  const filteredEquipment = equipment.filter(item => {
    // Admins can see all equipment
    if (isAdmin()) return true;
    
    // Managers can see equipment for their assigned properties
    if (isManager()) {
      return userProperties.includes(item.propertyId);
    }
    
    // Field technicians can only see equipment they're responsible for
    if (isFieldTechnician()) {
      return canAccessEquipment(item.id);
    }
    
    return false;
  });
  
  // Calculate equipment stats
  const stats = {
    total: filteredEquipment.length,
    active: filteredEquipment.filter(item => item.status === 'Active').length,
    maintenance: filteredEquipment.filter(item => item.status === 'Maintenance').length,
    inactive: filteredEquipment.filter(item => item.status === 'Inactive').length
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-neutral-900 dark:text-white sm:text-3xl sm:truncate">
              Equipment
            </h1>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="btn-outline mr-4"
              aria-label="Filter equipment"
              onClick={() => {
                // In a real application, this would open a filter modal or panel
                alert('Filter functionality would open here');
              }}
            >
              Filter
            </button>
            {/* Only allow admins and managers to add equipment */}
            {(isAdmin() || isManager()) && (
              <Link
                href="/equipment/new"
                className="btn-primary"
              >
                Add Equipment
              </Link>
            )}
          </div>
        </div>

        {/* Equipment Categories */}
        <div className="mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button 
              type="button"
              className="btn-primary whitespace-nowrap"
              aria-pressed="true"
              onClick={() => {
                // Filter to show all equipment
                // This would connect to state management in a real app
              }}
            >
              All Equipment
            </button>
            <button 
              type="button"
              className="btn-outline whitespace-nowrap"
              onClick={() => {
                // Filter to show only Robotic Mowers
                // This would connect to state management in a real app
              }}
            >
              Robotic Mowers
            </button>
            <button 
              type="button"
              className="btn-outline whitespace-nowrap"
              onClick={() => {
                // Filter to show only Range Pickers
                // This would connect to state management in a real app
              }}
            >
              Range Pickers
            </button>
            <button 
              type="button"
              className="btn-outline whitespace-nowrap"
              onClick={() => {
                // Filter to show only Line Painters
                // This would connect to state management in a real app
              }}
            >
              Line Painters
            </button>
            <button 
              type="button"
              className="btn-outline whitespace-nowrap"
              onClick={() => {
                // Filter to show only Irrigation Systems
                // This would connect to state management in a real app
              }}
            >
              Irrigation Systems
            </button>
          </div>
        </div>

        {/* Equipment Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Total Equipment</h2>
            <p className="text-3xl font-semibold text-neutral-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Active</h2>
            <p className="text-3xl font-semibold text-success">{stats.active}</p>
          </div>
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Maintenance</h2>
            <p className="text-3xl font-semibold text-warning">{stats.maintenance}</p>
          </div>
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Inactive</h2>
            <p className="text-3xl font-semibold text-error">{stats.inactive}</p>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEquipment.map((item) => (
            <div key={item.id} className="card hover:shadow-soft-lg transition-300">
              <div className="bg-neutral-100 dark:bg-neutral-800 h-48 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-neutral-500 dark:text-neutral-400">{item.type} Image</p>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                  <Link href={`/equipment/${item.id}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                    {item.name}
                  </Link>
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'Active' ? 'bg-success/10 text-success' :
                  item.status === 'Maintenance' ? 'bg-warning/10 text-warning' :
                  'bg-error/10 text-error'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">ID: {item.id}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Battery</p>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 mt-1">
                    <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${item.battery}%` }} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Last Connected</p>
                  <p className="text-sm text-neutral-900 dark:text-white">{item.lastConnected}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Assigned to</p>
                  <p className="text-sm text-neutral-900 dark:text-white">
                    <Link href={`/properties/${item.propertyId}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                      {item.propertyName}
                    </Link>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    href={`/equipment/${item.id}`}
                    className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-primary-500"
                    aria-label="View details"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <title>View Details</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Link>
                  {/* Only show settings/control button for equipment the user can fully access */}
                  {(isAdmin() || isManager() || canAccessEquipment(item.id)) && (
                    <Link 
                      href={`/equipment/${item.id}/settings`}
                      className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-primary-500"
                      aria-label="Control equipment"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title>Equipment Settings</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if no equipment is available to the user */}
        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <title>No equipment icon</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-white">No Equipment</h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              You don't have any equipment assigned to you.
            </p>
          </div>
        )}

        {/* Pagination - only show if there are items */}
        {filteredEquipment.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                type="button" 
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
                onClick={() => {
                  // Previous page logic
                }}
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
                onClick={() => {
                  // Page 1 logic
                }}
              >
                1
              </button>
              <button 
                type="button" 
                className="bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                onClick={() => {
                  // Page 2 logic
                }}
              >
                2
              </button>
              <button 
                type="button" 
                className="bg-white border-neutral-300 text-neutral-500 hover:bg-neutral-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                onClick={() => {
                  // Page 3 logic
                }}
              >
                3
              </button>
              <button 
                type="button" 
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
                onClick={() => {
                  // Next page logic
                }}
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <title>Next Page</title>
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 