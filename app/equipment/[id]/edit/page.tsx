"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import { PageHeader } from '../../../components/layout/PageHeader';
import { FormLayout } from '../../../components/layout/FormLayout';
import { FormSection } from '../../../components/layout/FormSection';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea';
import { Card } from '../../../components/ui/Card';

export default function EditEquipmentPage({ params }: { params: { id: string } }) {
  // This would fetch the equipment data from an API in a real application
  const equipment = {
    id: params.id,
    name: 'Husqvarna Automower 450X',
    type: 'mower',
    manufacturer: 'Husqvarna',
    model: 'Automower 450X',
    serialNumber: 'AM-450X-1092',
    status: 'operational',
    purchaseDate: '2022-06-15',
    purchasePrice: '3499.99',
    vendor: 'Husqvarna Authorized Dealer',
    warrantyExpiration: '2025-06-15',
    assetId: 'EQ-2022-0042',
    department: 'Grounds Maintenance',
    propertyAssigned: '1', // North Campus
    maintenanceSchedule: 'monthly',
    specifications: 'Robotic lawn mower with GPS navigation, weather timer, and obstacle detection. Suitable for areas up to 1.25 acres.',
    powerSource: 'Battery (Li-ion)',
    weight: '30.6',
    dimensions: '29×21×12 in',
    horsepower: 'N/A',
    yearManufactured: '2022',
    fuelType: 'N/A',
  };

  // Equipment statuses, types, and other options - same as new equipment page
  const equipmentStatuses = [
    { value: 'operational', label: 'Operational' },
    { value: 'maintenance', label: 'Under Maintenance' },
    { value: 'repair', label: 'Needs Repair' },
    { value: 'out-of-service', label: 'Out of Service' },
    { value: 'retired', label: 'Retired/Disposed' },
  ];

  const equipmentTypes = [
    { value: 'tractor', label: 'Tractor' },
    { value: 'mower', label: 'Mower' },
    { value: 'irrigation', label: 'Irrigation System' },
    { value: 'tools', label: 'Hand Tools' },
    { value: 'vehicle', label: 'Vehicle' },
    { value: 'construction', label: 'Construction Equipment' },
    { value: 'utility', label: 'Utility Equipment' },
    { value: 'other', label: 'Other' },
  ];

  // Mock property options - would come from API
  const propertyOptions = [
    { value: '1', label: 'North Campus' },
    { value: '2', label: 'South Campus' },
    { value: '3', label: 'Main Office' },
    { value: '4', label: 'Athletic Fields' },
    { value: '5', label: 'Research Park' },
  ];

  // Mock maintenance schedule options
  const maintenanceScheduleOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'biannual', label: 'Bi-annual' },
    { value: 'annual', label: 'Annual' },
    { value: 'custom', label: 'Custom Schedule' },
  ];

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title={`Edit Equipment: ${equipment.name}`}>
          <Link href={`/equipment/${params.id}`} className="btn-outline">
            Cancel
          </Link>
        </PageHeader>

        <FormLayout
          title="Equipment Information"
          description="Update the details of this equipment. All fields marked with * are required."
          footer={
            <div className="flex justify-end space-x-4">
              <Link href={`/equipment/${params.id}`} className="btn-outline">
                Cancel
              </Link>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          }
        >
          <form>
            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  id="equipmentName"
                  label="Equipment Name *" 
                  placeholder="Enter equipment name"
                  defaultValue={equipment.name}
                  fullWidth
                  required
                />
                <Select
                  id="equipmentType"
                  label="Equipment Type *"
                  options={equipmentTypes}
                  defaultValue={equipment.type}
                  fullWidth
                  required
                />
                <Input 
                  id="manufacturer"
                  label="Manufacturer *" 
                  placeholder="e.g. John Deere, Honda"
                  defaultValue={equipment.manufacturer}
                  fullWidth
                  required
                />
                <Input 
                  id="model"
                  label="Model *" 
                  placeholder="Enter model number/name"
                  defaultValue={equipment.model}
                  fullWidth
                  required
                />
                <Input 
                  id="serialNumber"
                  label="Serial Number *" 
                  placeholder="Enter serial number"
                  defaultValue={equipment.serialNumber}
                  fullWidth
                  required
                />
                <Select
                  id="status"
                  label="Status *"
                  options={equipmentStatuses}
                  defaultValue={equipment.status}
                  fullWidth
                  required
                />
              </div>
            </FormSection>

            <FormSection title="Acquisition Information" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  id="purchaseDate"
                  label="Purchase Date *" 
                  type="date"
                  defaultValue={equipment.purchaseDate}
                  fullWidth
                  required
                />
                <Input 
                  id="purchasePrice"
                  label="Purchase Price *" 
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={equipment.purchasePrice}
                  fullWidth
                  required
                />
                <Input 
                  id="vendor"
                  label="Vendor/Dealer" 
                  placeholder="Enter vendor name"
                  defaultValue={equipment.vendor}
                  fullWidth
                />
                <Input 
                  id="warrantyExpiration"
                  label="Warranty Expiration" 
                  type="date"
                  defaultValue={equipment.warrantyExpiration}
                  fullWidth
                />
                <Input 
                  id="assetId"
                  label="Asset ID/Tag" 
                  placeholder="Enter asset ID or tag number"
                  defaultValue={equipment.assetId}
                  fullWidth
                />
                <Input 
                  id="department"
                  label="Department" 
                  placeholder="Enter department"
                  defaultValue={equipment.department}
                  fullWidth
                />
              </div>
            </FormSection>

            <FormSection title="Assignment & Maintenance" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  id="propertyAssigned"
                  label="Assigned to Property *"
                  options={propertyOptions}
                  defaultValue={equipment.propertyAssigned}
                  fullWidth
                  required
                />
                <Select
                  id="maintenanceSchedule"
                  label="Maintenance Schedule"
                  options={maintenanceScheduleOptions}
                  defaultValue={equipment.maintenanceSchedule}
                  fullWidth
                />
              </div>
            </FormSection>

            <FormSection title="Specifications" className="mt-8">
              <div className="grid grid-cols-1 gap-6">
                <Textarea
                  id="specifications"
                  label="Technical Specifications"
                  placeholder="Enter technical details, dimensions, capacity, etc."
                  defaultValue={equipment.specifications}
                  rows={4}
                  fullWidth
                />
                
                <Card className="p-4">
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">Additional Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="power" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Power Source
                      </label>
                      <input
                        type="text"
                        id="power"
                        className="block w-full rounded-md border border-neutral-300 dark:border-neutral-700 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/25 sm:text-sm"
                        placeholder="e.g. Diesel, Gas, Electric"
                        defaultValue={equipment.powerSource}
                      />
                    </div>
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Weight (lbs)
                      </label>
                      <input
                        type="number"
                        id="weight"
                        className="block w-full rounded-md border border-neutral-300 dark:border-neutral-700 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/25 sm:text-sm"
                        placeholder="Weight in pounds"
                        defaultValue={equipment.weight}
                      />
                    </div>
                    <div>
                      <label htmlFor="dimensions" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Dimensions (L×W×H)
                      </label>
                      <input
                        type="text"
                        id="dimensions"
                        className="block w-full rounded-md border border-neutral-300 dark:border-neutral-700 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/25 sm:text-sm"
                        placeholder="e.g. 72×36×48 in"
                        defaultValue={equipment.dimensions}
                      />
                    </div>
                    <div>
                      <label htmlFor="horsepower" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Horsepower/Output
                      </label>
                      <input
                        type="text"
                        id="horsepower"
                        className="block w-full rounded-md border border-neutral-300 dark:border-neutral-700 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/25 sm:text-sm"
                        placeholder="e.g. 24 HP"
                        defaultValue={equipment.horsepower}
                      />
                    </div>
                    <div>
                      <label htmlFor="yearManufactured" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Year Manufactured
                      </label>
                      <input
                        type="number"
                        id="yearManufactured"
                        className="block w-full rounded-md border border-neutral-300 dark:border-neutral-700 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/25 sm:text-sm"
                        placeholder="e.g. 2023"
                        min="1900"
                        max="2100"
                        defaultValue={equipment.yearManufactured}
                      />
                    </div>
                    <div>
                      <label htmlFor="fuelType" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Fuel Type
                      </label>
                      <input
                        type="text"
                        id="fuelType"
                        className="block w-full rounded-md border border-neutral-300 dark:border-neutral-700 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500/25 sm:text-sm"
                        placeholder="e.g. Diesel, Gasoline, N/A"
                        defaultValue={equipment.fuelType}
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </FormSection>

            <FormSection title="Danger Zone" className="mt-8">
              <div className="bg-error/5 border border-error/20 rounded-lg p-4">
                <h3 className="text-base font-medium text-error">Decommission Equipment</h3>
                <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                  Permanently mark this equipment as retired or disposed. This action cannot be undone.
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    className="bg-white dark:bg-neutral-800 border border-error text-error hover:bg-error/5 px-4 py-2 rounded-md text-sm font-medium"
                    onClick={() => {
                      // This would show a confirmation dialog in a real app
                      if (confirm('Are you sure you want to decommission this equipment? This action cannot be undone.')) {
                        alert('Equipment would be decommissioned in a real application');
                      }
                    }}
                  >
                    Decommission Equipment
                  </button>
                </div>
              </div>
            </FormSection>
          </form>
        </FormLayout>
      </div>
    </MainLayout>
  );
} 