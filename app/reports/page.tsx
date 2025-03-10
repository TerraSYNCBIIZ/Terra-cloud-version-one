"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { SimpleChart } from '../components/ui/SimpleChart';
import { Select } from '../components/ui/Select';

export default function ReportsPage() {
  // Fake data for visualizations - would come from API in a real app
  const taskCompletionData = {
    title: "Task Completion by Month",
    data: [
      { label: "Jan", value: 78 },
      { label: "Feb", value: 63 },
      { label: "Mar", value: 82 },
      { label: "Apr", value: 91 },
      { label: "May", value: 105 },
      { label: "Jun", value: 120 },
      { label: "Jul", value: 95 },
      { label: "Aug", value: 89 },
      { label: "Sep", value: 102 },
      { label: "Oct", value: 112 },
      { label: "Nov", value: 98 },
      { label: "Dec", value: 74 },
    ]
  };

  const taskDistributionData = {
    title: "Tasks by Property",
    data: [
      { label: "North Campus", value: 35, color: "bg-primary-500" },
      { label: "South Campus", value: 28, color: "bg-secondary-500" },
      { label: "Main Office", value: 15, color: "bg-success-500" },
      { label: "Athletic Fields", value: 18, color: "bg-warning-500" },
      { label: "Research Park", value: 9, color: "bg-error-500" },
    ]
  };

  const taskStatusData = {
    title: "Tasks by Status",
    data: [
      { label: "Completed", value: 145, color: "bg-success-500" },
      { label: "In Progress", value: 42, color: "bg-warning-500" },
      { label: "Pending", value: 36, color: "bg-info-500" },
      { label: "Overdue", value: 12, color: "bg-error-500" },
    ]
  };

  const equipmentUtilizationData = {
    title: "Equipment Utilization (hours)",
    data: [
      { label: "Tractors", value: 245 },
      { label: "Mowers", value: 320 },
      { label: "Irrigation", value: 180 },
      { label: "Vehicles", value: 410 },
      { label: "Hand Tools", value: 290 },
    ]
  };

  const maintenanceCostData = {
    title: "Maintenance Costs by Month ($)",
    data: [
      { label: "Jan", value: 3200 },
      { label: "Feb", value: 2800 },
      { label: "Mar", value: 4100 },
      { label: "Apr", value: 3700 },
      { label: "May", value: 4300 },
      { label: "Jun", value: 5200 },
      { label: "Jul", value: 4800 },
      { label: "Aug", value: 4500 },
      { label: "Sep", value: 5100 },
      { label: "Oct", value: 4900 },
      { label: "Nov", value: 4200 },
      { label: "Dec", value: 3600 },
    ]
  };

  // Report templates
  const reportTemplates = [
    { id: 'task-completion', name: 'Task Completion Report' },
    { id: 'equipment-utilization', name: 'Equipment Utilization Report' },
    { id: 'maintenance-cost', name: 'Maintenance Cost Analysis' },
    { id: 'employee-performance', name: 'Employee Performance Report' },
    { id: 'property-summary', name: 'Property Management Summary' },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="Reports & Analytics" 
          subtitle="View key metrics and generate reports"
        >
          <div className="flex">
            <Link href="/reports/create" className="btn-primary">
              Generate Report
            </Link>
          </div>
        </PageHeader>
        
        {/* Report Filters */}
        <Card className="mb-8">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Filters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              id="timeRange"
              label="Time Range"
              options={[
                { value: 'last30days', label: 'Last 30 Days' },
                { value: 'last3months', label: 'Last 3 Months' },
                { value: 'last6months', label: 'Last 6 Months' },
                { value: 'lastyear', label: 'Last Year' },
                { value: 'custom', label: 'Custom Range' },
              ]}
              defaultValue="lastyear"
            />
            <Select
              id="propertyFilter"
              label="Property"
              options={[
                { value: 'all', label: 'All Properties' },
                { value: '1', label: 'North Campus' },
                { value: '2', label: 'South Campus' },
                { value: '3', label: 'Main Office' },
                { value: '4', label: 'Athletic Fields' },
                { value: '5', label: 'Research Park' },
              ]}
              defaultValue="all"
            />
            <Select
              id="equipmentFilter"
              label="Equipment Type"
              options={[
                { value: 'all', label: 'All Equipment' },
                { value: 'tractor', label: 'Tractors' },
                { value: 'mower', label: 'Mowers' },
                { value: 'irrigation', label: 'Irrigation' },
                { value: 'vehicle', label: 'Vehicles' },
                { value: 'tools', label: 'Hand Tools' },
              ]}
              defaultValue="all"
            />
            <div className="flex items-end">
              <button type="button" className="btn-primary h-10 w-full">
                Apply Filters
              </button>
            </div>
          </div>
        </Card>
        
        {/* Key Metrics */}
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tasks"
            value="1,245"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            }
            trend={{
              direction: 'up',
              value: '+8.2%',
              label: 'vs. last year'
            }}
          />
          <StatCard
            title="Completion Rate"
            value="92.4%"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            }
            trend={{
              direction: 'up',
              value: '+3.1%',
              label: 'vs. last year'
            }}
          />
          <StatCard
            title="Maintenance Costs"
            value="$46,350"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            trend={{
              direction: 'down',
              value: '-2.4%',
              label: 'vs. last year'
            }}
          />
          <StatCard
            title="Equipment Utilization"
            value="86.3%"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            trend={{
              direction: 'up',
              value: '+1.8%',
              label: 'vs. last year'
            }}
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SimpleChart
            title={taskCompletionData.title}
            data={taskCompletionData.data}
            type="bar"
            height={250}
          />
          <SimpleChart
            title={maintenanceCostData.title}
            data={maintenanceCostData.data}
            type="bar"
            height={250}
          />
          <SimpleChart
            title={taskDistributionData.title}
            data={taskDistributionData.data}
            type="horizontal-bar"
            height={250}
          />
          <SimpleChart
            title={equipmentUtilizationData.title}
            data={equipmentUtilizationData.data}
            type="horizontal-bar"
            height={250}
          />
        </div>
        
        {/* Task Status Distribution */}
        <div className="mb-8">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Task Status Distribution</h2>
              <Select
                id="taskPeriod"
                options={[
                  { value: 'last30days', label: 'Last 30 Days' },
                  { value: 'last3months', label: 'Last 3 Months' },
                  { value: 'last6months', label: 'Last 6 Months' },
                  { value: 'lastyear', label: 'Last Year' },
                ]}
                defaultValue="last30days"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <SimpleChart
                  title=""
                  data={taskStatusData.data}
                  type="bar"
                  height={220}
                  showLegend={false}
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="space-y-4">
                  {taskStatusData.data.map((item) => (
                    <div key={item.label} className="flex items-center">
                      <div className={`w-4 h-4 rounded-sm ${item.color} mr-2`} />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-neutral-900 dark:text-white">{item.label}</span>
                          <span className="text-sm text-neutral-700 dark:text-neutral-300">{item.value} tasks</span>
                        </div>
                        <div className="mt-1 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5">
                          <div 
                            className={`${item.color} h-1.5 rounded-full`} 
                            style={{ width: `${(item.value / taskStatusData.data.reduce((sum, i) => sum + i.value, 0)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-neutral-900 dark:text-white">Total Tasks</span>
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {taskStatusData.data.reduce((sum, item) => sum + item.value, 0)} tasks
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Report Templates */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Report Templates</h2>
            <Link href="/reports/templates" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              Manage Templates
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 rounded-md bg-primary-50 dark:bg-primary-900/20 mr-4">
                    <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-neutral-900 dark:text-white">{template.name}</h3>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      Last generated: 2 weeks ago
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button type="button" className="btn-outline text-sm py-1 px-2">
                    Preview
                  </button>
                  <button type="button" className="btn-primary text-sm py-1 px-2">
                    Generate
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Export Options */}
        <Card className="mb-8">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Export Data</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <svg className="h-8 w-8 text-neutral-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-neutral-900 dark:text-white mb-2">PDF Report</span>
              <button type="button" className="btn-outline text-sm py-1 px-2 w-full">
                Export as PDF
              </button>
            </div>
            <div className="flex flex-col items-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <svg className="h-8 w-8 text-neutral-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-neutral-900 dark:text-white mb-2">Excel Spreadsheet</span>
              <button type="button" className="btn-outline text-sm py-1 px-2 w-full">
                Export as Excel
              </button>
            </div>
            <div className="flex flex-col items-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <svg className="h-8 w-8 text-neutral-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              <span className="text-sm font-medium text-neutral-900 dark:text-white mb-2">CSV Data</span>
              <button type="button" className="btn-outline text-sm py-1 px-2 w-full">
                Export as CSV
              </button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
} 