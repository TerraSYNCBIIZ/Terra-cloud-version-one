"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { PageHeader } from '../../components/layout/PageHeader';
import { FormLayout } from '../../components/layout/FormLayout';
import { FormSection } from '../../components/layout/FormSection';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Card } from '../../components/ui/Card';

export default function NewEquipmentPage() {
  // This would be connected to form state management in a real app
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
        <PageHeader title="Add New Equipment">
          <Link href="/equipment" className="btn-outline">
            Cancel
          </Link>
        </PageHeader>

        <FormLayout
          title="Equipment Information"
          description="Enter the details of the new equipment. All fields marked with * are required."
          footer={
            <div className="flex justify-end space-x-4">
              <Link href="/equipment" className="btn-outline">
                Cancel
              </Link>
              <button type="submit" className="btn-primary">
                Add Equipment
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
                  fullWidth
                  required
                />
                <Select
                  id="equipmentType"
                  label="Equipment Type *"
                  options={equipmentTypes}
                  fullWidth
                  required
                />
                <Input 
                  id="manufacturer"
                  label="Manufacturer *" 
                  placeholder="e.g. John Deere, Honda"
                  fullWidth
                  required
                />
                <Input 
                  id="model"
                  label="Model *" 
                  placeholder="Enter model number/name"
                  fullWidth
                  required
                />
                <Input 
                  id="serialNumber"
                  label="Serial Number *" 
                  placeholder="Enter serial number"
                  fullWidth
                  required
                />
                <Select
                  id="status"
                  label="Status *"
                  options={equipmentStatuses}
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
                  fullWidth
                  required
                />
                <Input 
                  id="purchasePrice"
                  label="Purchase Price *" 
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  fullWidth
                  required
                />
                <Input 
                  id="vendor"
                  label="Vendor/Dealer" 
                  placeholder="Enter vendor name"
                  fullWidth
                />
                <Input 
                  id="warrantyExpiration"
                  label="Warranty Expiration" 
                  type="date"
                  fullWidth
                />
                <Input 
                  id="assetId"
                  label="Asset ID/Tag" 
                  placeholder="Enter asset ID or tag number"
                  fullWidth
                />
                <Input 
                  id="department"
                  label="Department" 
                  placeholder="Enter department"
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
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </FormSection>

            <FormSection title="Location and Assignment" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  id="propertyId"
                  label="Assigned Property *"
                  options={propertyOptions}
                  fullWidth
                  required
                />
                <Input 
                  id="location"
                  label="Specific Location" 
                  placeholder="e.g. Storage Shed, Garage Bay 3"
                  fullWidth
                />
              </div>
            </FormSection>

            <FormSection title="Maintenance Information" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  id="maintenanceSchedule"
                  label="Maintenance Schedule"
                  options={maintenanceScheduleOptions}
                  fullWidth
                />
                <Input 
                  id="lastMaintenanceDate"
                  label="Last Maintenance Date" 
                  type="date"
                  fullWidth
                />
                <Input 
                  id="nextMaintenanceDate"
                  label="Next Maintenance Due" 
                  type="date"
                  fullWidth
                />
                <Textarea
                  id="maintenanceNotes"
                  label="Maintenance Notes"
                  placeholder="Enter maintenance requirements or history"
                  rows={3}
                  fullWidth
                />
              </div>
            </FormSection>

            <FormSection title="Additional Information" className="mt-8">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="equipmentPhotos" className="form-label block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Equipment Photos
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-neutral-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true" role="img">
                        <title>Upload icon</title>
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-neutral-600 dark:text-neutral-400">
                        <label htmlFor="equipmentPhotos" className="relative cursor-pointer bg-white dark:bg-neutral-900 rounded-md font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 focus-within:outline-none">
                          <span>Upload files</span>
                          <input id="equipmentPhotos" name="equipmentPhotos" type="file" className="sr-only" multiple accept="image/*" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        PNG, JPG, GIF up to 10MB each
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="documents" className="form-label block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Documents
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-neutral-400" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true" role="img">
                        <title>Document icon</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <div className="flex text-sm text-neutral-600 dark:text-neutral-400">
                        <label htmlFor="documents" className="relative cursor-pointer bg-white dark:bg-neutral-900 rounded-md font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 focus-within:outline-none">
                          <span>Upload manuals or documentation</span>
                          <input id="documents" name="documents" type="file" className="sr-only" multiple accept=".pdf,.doc,.docx" />
                        </label>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        PDF, DOC up to 25MB each
                      </p>
                    </div>
                  </div>
                </div>
                
                <Textarea
                  id="notes"
                  label="Additional Notes"
                  placeholder="Enter any additional notes about this equipment"
                  rows={3}
                  fullWidth
                />
              </div>
            </FormSection>
          </form>
        </FormLayout>
      </div>
    </MainLayout>
  );
} 