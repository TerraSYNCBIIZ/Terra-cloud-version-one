"use client";

import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { FormSection } from '../components/layout/FormSection';
import Link from 'next/link';

export default function SupportPage() {
  // Mock support categories
  const supportCategories = [
    { value: '', label: 'Select a category' },
    { value: 'account', label: 'Account Issues' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'other', label: 'Other' },
  ];

  // Mock priority options
  const priorityOptions = [
    { value: '', label: 'Select priority' },
    { value: 'low', label: 'Low - General question or feedback' },
    { value: 'medium', label: 'Medium - Issue affecting workflow' },
    { value: 'high', label: 'High - Critical issue affecting operations' },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="Support Center" 
          subtitle="Get help with TERRA Cloud platform"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Support Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                Submit a Support Request
              </h2>
              
              <form className="space-y-6">
                <FormSection>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        id="name"
                        name="name"
                        label="Your Name"
                        type="text"
                        required
                        fullWidth
                      />
                    </div>
                    <div>
                      <Input
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        required
                        fullWidth
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Select
                        id="category"
                        name="category"
                        label="Support Category"
                        options={supportCategories}
                        required
                        fullWidth
                      />
                    </div>
                    <div>
                      <Select
                        id="priority"
                        name="priority"
                        label="Priority"
                        options={priorityOptions}
                        required
                        fullWidth
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Input
                      id="subject"
                      name="subject"
                      label="Subject"
                      type="text"
                      required
                      fullWidth
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Textarea
                      id="description"
                      name="description"
                      label="Description"
                      rows={6}
                      required
                      fullWidth
                      helperText="Please provide as much detail as possible about your issue"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Attachments (Optional)
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-neutral-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-neutral-600 dark:text-neutral-400">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white dark:bg-neutral-800 rounded-md font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          PNG, JPG, GIF, PDF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </FormSection>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </Card>
          </div>
          
          {/* Support Info */}
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Contact Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Customer Support
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    Monday - Friday, 9AM - 5PM EST
                  </p>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <a href="mailto:support@terracloud.com" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                      support@terracloud.com
                    </a>
                  </p>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <a href="tel:+18005551234" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                      +1 (800) 555-1234
                    </a>
                  </p>
                </div>
                
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Emergency Support
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    24/7 for critical issues
                  </p>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <a href="tel:+18005555678" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                      +1 (800) 555-5678
                    </a>
                  </p>
                </div>
                
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Headquarters
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    TERRA Cloud, Inc.<br />
                    123 Green Street<br />
                    Boston, MA 02108<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">
                  Resources
                </h2>
                
                <ul className="space-y-3">
                  <li>
                    <Link href="/documentation" className="flex items-center text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title>Documentation</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/tutorials" className="flex items-center text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title>Video Tutorials</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Video Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs" className="flex items-center text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title>FAQs</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/forum" className="flex items-center text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title>Community Forum</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      Community Forum
                    </Link>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 