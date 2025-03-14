"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import { PageHeader } from '../../../components/layout/PageHeader';
import { TabNavigation } from '../../../components/ui/TabNavigation';
import { Card } from '../../../components/ui/Card';
import { useAuth } from '../../../context/AuthContext';
import { GoogleMapComponent } from '../../../components/ui/GoogleMap';
import { irrigationService } from '../../../services/irrigationService';
import { Dialog } from '../../../components/ui/Dialog';
import { EmployeeZoneTools, DrawingControls } from '../../../components/maps/EmployeeZoneTools';

// Mock employee data - would come from API in real implementation
const employees = [
  { id: 'emp-001', name: 'Sarah Johnson', role: 'Field Technician', avatar: '/avatars/sarah.jpg' },
  { id: 'emp-002', name: 'Michael Williams', role: 'Field Technician', avatar: '/avatars/michael.jpg' },
  { id: 'emp-003', name: 'David Martinez', role: 'Field Technician', avatar: '/avatars/david.jpg' },
  { id: 'emp-004', name: 'Jennifer Brown', role: 'Field Technician', avatar: '/avatars/jennifer.jpg' },
];

// Mock zones data - would come from API in real implementation
const initialZones = [
  { 
    id: 'zone-101', 
    name: 'North Lawn', 
    employeeId: 'emp-001',
    color: '#3B82F6',
    paths: [
      { lat: 39.782719, lng: -89.651150 },
      { lat: 39.782719, lng: -89.649150 },
      { lat: 39.781719, lng: -89.649150 },
      { lat: 39.781719, lng: -89.651150 }
    ]
  },
  { 
    id: 'zone-102', 
    name: 'South Fields', 
    employeeId: 'emp-002',
    color: '#10B981',
    paths: [
      { lat: 39.780719, lng: -89.651150 },
      { lat: 39.780719, lng: -89.649150 },
      { lat: 39.779719, lng: -89.649150 },
      { lat: 39.779719, lng: -89.651150 }
    ]
  }
];

export default function PropertyMapPage({ params }: { params: { id: string } }) {
  // Placeholder property data - this would come from an API in a real app
  const property = {
    id: params.id,
    name: 'North Campus',
    address: '1234 College Avenue, Springfield, IL',
    status: 'Active',
  };

  // Get current user role
  const { isFieldTechnician, isManager, isAdmin } = useAuth();
  
  // State to track which map layers are visible
  const [visibleLayers, setVisibleLayers] = useState({
    zones: true,
    irrigation: true,  // Default to showing irrigation on this page
    mowers: false,
    staff: false,
    droneData: false,
    employeeZones: true // New layer for employee zones
  });

  // State to track active irrigation controls
  const [irrigationControls, setIrrigationControls] = useState({
    showCoverage: true,
    showInactive: true,
    showWarnings: true,
    showScheduled: true
  });

  // State for employee zones
  const [employeeZones, setEmployeeZones] = useState(initialZones);
  const [drawingMode, setDrawingMode] = useState(false);
  const [showZoneDialog, setShowZoneDialog] = useState(false);
  const [newZone, setNewZone] = useState<{
    id: string;
    name: string;
    employeeId: string;
    color: string;
    paths: Array<{lat: number; lng: number}>;
  } | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const mapRef = useRef(null);

  // Toggle a specific layer
  const toggleLayer = (layer: keyof typeof visibleLayers) => {
    setVisibleLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  // Toggle an irrigation control option
  const toggleIrrigationControl = (control: keyof typeof irrigationControls) => {
    setIrrigationControls(prev => ({
      ...prev,
      [control]: !prev[control]
    }));
  };
  
  // Define tabs for the property detail view - simplified for technicians
  const tabs = isFieldTechnician() 
    ? [
        { label: 'Overview', href: `/properties/${params.id}` },
        { label: 'Map', href: `/properties/${params.id}/map`, isActive: true },
      ]
    : [
        { label: 'Overview', href: `/properties/${params.id}` },
        { label: 'Map', href: `/properties/${params.id}/map`, isActive: true },
        { label: 'Equipment', href: `/properties/${params.id}/equipment` },
        { label: 'Employees', href: `/properties/${params.id}/employees` },
      ];

  // Handle mock zone toggle - in production this would call a real API
  const handleZoneToggle = async (zoneId: string, active: boolean) => {
    try {
      await irrigationService.toggleZone(zoneId, active);
      // Refresh data would happen here in a real implementation
      alert(`Zone ${zoneId} ${active ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Error toggling zone:', error);
    }
  };

  // Start drawing mode for employee zones
  const startDrawingZone = () => {
    setDrawingMode(true);
    // The actual drawing implementation would be handled in the GoogleMapComponent
  };

  // Handle when a polygon is completed (called from GoogleMapComponent)
  const handlePolygonComplete = (polygon: google.maps.Polygon) => {
    // Extract path coordinates
    const path = polygon.getPath();
    const paths = Array.from({length: path.getLength()}, (_, i) => {
      const point = path.getAt(i);
      return {
        lat: point.lat(),
        lng: point.lng()
      };
    });
    
    // Set new zone data and open the dialog
    setNewZone({
      id: `zone-${Date.now()}`,
      name: '',
      employeeId: '',
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color with template literal
      paths
    });
    setShowZoneDialog(true);
    setDrawingMode(false);
  };

  // Save a new employee zone
  const saveEmployeeZone = () => {
    if (newZone?.name && newZone?.employeeId) {
      setEmployeeZones(prev => [...prev, newZone]);
      setShowZoneDialog(false);
      setNewZone(null);
    }
  };

  // Update the new zone properties
  const updateNewZone = (field: string, value: string) => {
    setNewZone(prev => prev ? { ...prev, [field]: value } : null);
  };

  // Delete an employee zone
  const deleteEmployeeZone = (zoneId: string) => {
    setEmployeeZones(prev => prev.filter(zone => zone.id !== zoneId));
    setSelectedZone(null);
  };

  // Helper to get employee name by ID
  const getEmployeeName = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : 'Unassigned';
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader title={`${property.name} - Map View`}>
          <Link href={`/properties/${params.id}`} className="btn-outline mr-3">
            Back to Overview
          </Link>
        </PageHeader>
        
        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} className="mb-6" />

        {/* Map Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* Layer Controls */}
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-3">Map Layers</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Property Zones</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Property Zones
                </span>
                <button 
                  type="button"
                  onClick={() => toggleLayer('zones')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${visibleLayers.zones ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${visibleLayers.zones ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              {/* New Employee Zones toggle */}
              {(isManager() || isAdmin()) && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <title>Employee Zones</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Employee Zones
                  </span>
                  <button 
                    type="button"
                    onClick={() => toggleLayer('employeeZones')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${visibleLayers.employeeZones ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${visibleLayers.employeeZones ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Irrigation System</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Irrigation System
                </span>
                <button 
                  type="button"
                  onClick={() => toggleLayer('irrigation')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${visibleLayers.irrigation ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${visibleLayers.irrigation ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Equipment Locations</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Equipment Locations
                </span>
                <button 
                  type="button"
                  onClick={() => toggleLayer('mowers')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${visibleLayers.mowers ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${visibleLayers.mowers ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <title>Staff Locations</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Staff Locations
                </span>
                <button 
                  type="button"
                  onClick={() => toggleLayer('staff')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${visibleLayers.staff ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${visibleLayers.staff ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </Card>

          {/* Irrigation Controls - Only visible when irrigation layer is enabled */}
          {visibleLayers.irrigation && (
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-3">Irrigation Details</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Show Coverage Areas</span>
                  <button 
                    type="button"
                    onClick={() => toggleIrrigationControl('showCoverage')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${irrigationControls.showCoverage ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${irrigationControls.showCoverage ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Show Inactive Heads</span>
                  <button 
                    type="button"
                    onClick={() => toggleIrrigationControl('showInactive')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${irrigationControls.showInactive ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${irrigationControls.showInactive ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
              </div>

                <div className="flex items-center justify-between">
                  <span>Highlight Warnings</span>
                  <button 
                    type="button"
                    onClick={() => toggleIrrigationControl('showWarnings')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${irrigationControls.showWarnings ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${irrigationControls.showWarnings ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
              </div>
              
                <div className="flex items-center justify-between">
                  <span>Show Schedules</span>
                  <button
                    type="button"
                    onClick={() => toggleIrrigationControl('showScheduled')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${irrigationControls.showScheduled ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${irrigationControls.showScheduled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Main Map with Side Panel */}
        <div className="h-[70vh] rounded-lg border overflow-hidden relative">
          <GoogleMapComponent 
            ref={mapRef}
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
            className="h-full w-full"
            showCurrentLocation={true}
            showIrrigationLayer={visibleLayers.irrigation}
            propertyId={property.id}
            employeeZones={visibleLayers.employeeZones ? employeeZones : []}
            drawingMode={drawingMode}
            onPolygonComplete={handlePolygonComplete}
            selectedZone={selectedZone}
            onZoneSelect={setSelectedZone}
            editable={isManager() || isAdmin()}
          />

          {/* Use the new EmployeeZoneTools component */}
          {(isManager() || isAdmin()) && visibleLayers.employeeZones && (
            <EmployeeZoneTools
              employeeZones={employeeZones}
              employees={employees}
              selectedZone={selectedZone}
              drawingMode={drawingMode}
              onDrawZone={startDrawingZone}
              onSelectZone={setSelectedZone}
              onDeleteZone={deleteEmployeeZone}
              onCancelDrawing={() => setDrawingMode(false)}
            />
          )}

          {/* Use the new DrawingControls component */}
          <DrawingControls
            drawingMode={drawingMode}
            onCancelDrawing={() => setDrawingMode(false)}
          />
        </div>

        {/* Legend for map symbols - only shown when irrigation is active */}
        {visibleLayers.irrigation && (
          <div className="mt-4 bg-white dark:bg-neutral-800 p-4 rounded-lg border">
            <h3 className="text-sm font-medium mb-2">Map Legend</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2" />
                <span className="text-sm">Active Head</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-red-500 mr-2" />
                <span className="text-sm">Warning</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-orange-400 mr-2" />
                <span className="text-sm">Maintenance</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-4 h-4 rounded-full bg-gray-400 mr-2" />
                <span className="text-sm">Inactive</span>
              </div>
            </div>
          </div>
        )}

        {/* Dialog for creating new employee zone */}
        {showZoneDialog && (
          <Dialog
            open={showZoneDialog}
            onClose={() => setShowZoneDialog(false)}
            title="Assign Zone to Employee"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="zone-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Zone Name
                </label>
                <input
                  type="text"
                  id="zone-name"
                  value={newZone?.name || ''}
                  onChange={(e) => updateNewZone('name', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="e.g., North Lawn Area"
                />
              </div>

              <div>
                <label htmlFor="employee-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Assign to Employee
                </label>
                <select
                  id="employee-select"
                  value={newZone?.employeeId || ''}
                  onChange={(e) => updateNewZone('employeeId', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">Select an employee...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} - {emp.role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="zone-color" className="block text-sm font-medium text-gray-700 mb-1">
                  Zone Color
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    id="zone-color"
                    value={newZone?.color || '#3B82F6'}
                    onChange={(e) => updateNewZone('color', e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-500">
                    Choose a color for this zone
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowZoneDialog(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEmployeeZone}
                disabled={!newZone?.name || !newZone?.employeeId}
                className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${!newZone?.name || !newZone?.employeeId ? 'bg-gray-300' : 'bg-primary-600 hover:bg-primary-700'}`}
              >
                Save Zone
              </button>
            </div>
          </Dialog>
        )}
      </div>
    </MainLayout>
  );
}