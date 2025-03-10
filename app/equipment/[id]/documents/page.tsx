"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import { PageHeader } from '../../../components/layout/PageHeader';
import { TabNavigation } from '../../../components/ui/TabNavigation';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export default function EquipmentDocumentsPage({ params }: { params: { id: string } }) {
  // Placeholder equipment data - this would come from an API in a real app
  const equipment = {
    id: params.id,
    name: 'Husqvarna Automower 450X',
    model: 'Automower 450X',
    manufacturer: 'Husqvarna',
    status: 'Operational',
  };

  // Define tabs for the equipment detail view
  const tabs = [
    { label: 'Overview', href: `/equipment/${params.id}` },
    { label: 'Maintenance History', href: `/equipment/${params.id}/maintenance` },
    { label: 'Documents', href: `/equipment/${params.id}/documents`, isActive: true },
    { label: 'Tasks', href: `/equipment/${params.id}/tasks` },
    { label: 'Settings', href: `/equipment/${params.id}/settings` },
  ];

  // Mock document data
  const documents = [
    {
      id: 'doc1',
      name: 'User Manual',
      type: 'PDF',
      size: '4.2 MB',
      uploadedBy: 'System Admin',
      uploadDate: '2022-06-15',
      category: 'manual',
    },
    {
      id: 'doc2',
      name: 'Warranty Certificate',
      type: 'PDF',
      size: '1.1 MB',
      uploadedBy: 'System Admin',
      uploadDate: '2022-06-15',
      category: 'warranty',
    },
    {
      id: 'doc3',
      name: 'Purchase Invoice',
      type: 'PDF',
      size: '0.8 MB',
      uploadedBy: 'Finance Department',
      uploadDate: '2022-06-15',
      category: 'invoice',
    },
    {
      id: 'doc4',
      name: 'Installation Guide',
      type: 'PDF',
      size: '2.5 MB',
      uploadedBy: 'System Admin',
      uploadDate: '2022-06-16',
      category: 'manual',
    },
    {
      id: 'doc5',
      name: 'Quick Start Guide',
      type: 'PDF',
      size: '1.3 MB',
      uploadedBy: 'System Admin',
      uploadDate: '2022-06-16',
      category: 'manual',
    },
    {
      id: 'doc6',
      name: 'Maintenance Checklist',
      type: 'XLSX',
      size: '0.5 MB',
      uploadedBy: 'Maintenance Manager',
      uploadDate: '2022-07-10',
      category: 'maintenance',
    },
    {
      id: 'doc7',
      name: 'Troubleshooting Guide',
      type: 'PDF',
      size: '1.8 MB',
      uploadedBy: 'Tech Support',
      uploadDate: '2022-08-22',
      category: 'manual',
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <PageHeader title={`${equipment.name} - Documents`}>
          <Link href="/equipment" className="btn-outline mr-3">
            Back to Equipment
          </Link>
          <button 
            type="button" 
            className="btn-primary"
            onClick={() => alert('This would open a file upload modal')}
          >
            Upload Document
          </button>
        </PageHeader>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} className="mb-8" />
        
        {/* Document Categories */}
        <div className="mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button 
              type="button"
              className="btn-primary whitespace-nowrap"
              onClick={() => {
                // Filter to show all documents
              }}
            >
              All Documents
            </button>
            <button 
              type="button"
              className="btn-outline whitespace-nowrap"
              onClick={() => {
                // Filter to show only manuals
              }}
            >
              Manuals
            </button>
            <button 
              type="button"
              className="btn-outline whitespace-nowrap"
              onClick={() => {
                // Filter to show only warranties
              }}
            >
              Warranty
            </button>
            <button 
              type="button"
              className="btn-outline whitespace-nowrap"
              onClick={() => {
                // Filter to show only invoices
              }}
            >
              Invoices
            </button>
            <button 
              type="button"
              className="btn-outline whitespace-nowrap"
              onClick={() => {
                // Filter to show only maintenance docs
              }}
            >
              Maintenance
            </button>
          </div>
        </div>
        
        {/* Document List */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-neutral-900 dark:text-white">
              Documents ({documents.length})
            </h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="block w-full rounded-md border-neutral-300 dark:border-neutral-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-neutral-800"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <title>Search</title>
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <button 
                type="button" 
                className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                onClick={() => alert('This would export a list of documents')}
              >
                Export List
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Uploaded By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-white">
                      {doc.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {doc.type === 'PDF' ? (
                        <Badge variant="error" size="sm">PDF</Badge>
                      ) : doc.type === 'XLSX' ? (
                        <Badge variant="success" size="sm">XLSX</Badge>
                      ) : (
                        <Badge variant="neutral" size="sm">{doc.type}</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {doc.uploadedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-white">
                      {doc.uploadDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <button
                        type="button"
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3"
                        onClick={() => alert(`This would download the document: ${doc.name}`)}
                      >
                        Download
                      </button>
                      <button
                        type="button"
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                        onClick={() => alert(`This would show document details: ${doc.name}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-neutral-700 dark:text-neutral-400">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{documents.length}</span> of <span className="font-medium">{documents.length}</span> documents
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button 
                type="button" 
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
                disabled
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
              >
                1
              </button>
              <button 
                type="button" 
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50"
                disabled
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <title>Next Page</title>
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
} 