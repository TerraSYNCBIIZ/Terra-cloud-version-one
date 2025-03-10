"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

export default function EquipmentPage() {
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
            <Link
              href="/equipment/new"
              className="btn-primary"
            >
              Add Equipment
            </Link>
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
            <p className="text-3xl font-semibold text-neutral-900 dark:text-white">38</p>
          </div>
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Active</h2>
            <p className="text-3xl font-semibold text-success">32</p>
          </div>
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Maintenance</h2>
            <p className="text-3xl font-semibold text-warning">4</p>
          </div>
          <div className="card">
            <h2 className="text-sm font-medium text-neutral-500 mb-1">Inactive</h2>
            <p className="text-3xl font-semibold text-error">2</p>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="card hover:shadow-soft-lg transition-300">
              <div className="bg-neutral-100 dark:bg-neutral-800 h-48 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-neutral-500 dark:text-neutral-400">Equipment Image</p>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                  <Link href={`/equipment/${item}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                    Husqvarna Automower 450X
                  </Link>
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                  Active
                </span>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">ID: AM-450X-{1090 + item}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Battery</p>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 mt-1">
                    <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${60 + item * 5}%` }} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Last Connected</p>
                  <p className="text-sm text-neutral-900 dark:text-white">{item * 5} mins ago</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Assigned to</p>
                  <p className="text-sm text-neutral-900 dark:text-white">
                    <Link href={`/properties/${item}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                      North Campus
                    </Link>
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link 
                    href={`/equipment/${item}`}
                    className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-primary-500"
                    aria-label="View details"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <title>View Details</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Link>
                  <Link 
                    href={`/equipment/${item}/settings`}
                    className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-primary-500"
                    aria-label="Control equipment"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <title>Equipment Settings</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
      </div>
    </MainLayout>
  );
} 