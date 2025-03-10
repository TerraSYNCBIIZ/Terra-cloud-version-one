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

export default function NewPropertyPage() {
  // This would be connected to form state management in a real app
  const propertyTypes = [
    { value: 'academic', label: 'Academic' },
    { value: 'residential', label: 'Residential' },
    { value: 'administrative', label: 'Administrative' },
    { value: 'athletic', label: 'Athletic' },
    { value: 'recreational', label: 'Recreational' },
    { value: 'mixed', label: 'Mixed Use' },
  ];

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title="Add New Property">
          <Link href="/properties" className="btn-outline">
            Cancel
          </Link>
        </PageHeader>

        <FormLayout
          title="Property Information"
          description="Enter the details of the new property. All fields marked with * are required."
          footer={
            <div className="flex justify-end space-x-4">
              <Link href="/properties" className="btn-outline">
                Cancel
              </Link>
              <button type="submit" className="btn-primary">
                Create Property
              </button>
            </div>
          }
        >
          <form>
            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  id="propertyName"
                  label="Property Name *" 
                  placeholder="Enter property name"
                  fullWidth
                  required
                />
                <Select
                  id="propertyType"
                  label="Property Type *"
                  options={propertyTypes}
                  placeholder="Select property type"
                  fullWidth
                  required
                />
                <Input 
                  id="propertySize"
                  label="Size" 
                  placeholder="e.g. 120 acres"
                  fullWidth
                />
                <Input 
                  id="manager"
                  label="Property Manager" 
                  placeholder="Select or enter name"
                  fullWidth
                />
              </div>
            </FormSection>

            <FormSection title="Location" className="mt-8">
              <div className="grid grid-cols-1 gap-6">
                <Input 
                  id="address"
                  label="Address *" 
                  placeholder="Street address"
                  fullWidth
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input 
                    id="city"
                    label="City *" 
                    placeholder="City"
                    fullWidth
                    required
                  />
                  <Input 
                    id="state"
                    label="State/Province *" 
                    placeholder="State/Province"
                    fullWidth
                    required
                  />
                  <Input 
                    id="zipCode"
                    label="ZIP/Postal Code *" 
                    placeholder="ZIP/Postal Code"
                    fullWidth
                    required
                  />
                </div>
                
                <div className="bg-neutral-100 dark:bg-neutral-800 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-neutral-500 dark:text-neutral-400">Map location selector will be displayed here</p>
                </div>
              </div>
            </FormSection>

            <FormSection title="Additional Information" className="mt-8">
              <div className="grid grid-cols-1 gap-6">
                <Textarea
                  id="description"
                  label="Property Description"
                  placeholder="Enter a detailed description of the property"
                  rows={4}
                  fullWidth
                />
                
                <Select
                  id="status"
                  label="Status *"
                  options={[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                    { value: 'maintenance', label: 'Under Maintenance' },
                    { value: 'construction', label: 'Under Construction' },
                  ]}
                  placeholder="Select status"
                  fullWidth
                  required
                />
              </div>
            </FormSection>
          </form>
        </FormLayout>
      </div>
    </MainLayout>
  );
} 