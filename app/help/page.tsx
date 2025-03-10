"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';

export default function HelpCenterPage() {
  // Mock FAQ categories
  const categories = [
    { id: 'getting-started', name: 'Getting Started', count: 5 },
    { id: 'account', name: 'Account & Billing', count: 8 },
    { id: 'properties', name: 'Properties', count: 6 },
    { id: 'equipment', name: 'Equipment', count: 7 },
    { id: 'tasks', name: 'Tasks & Scheduling', count: 9 },
    { id: 'reports', name: 'Reports & Analytics', count: 4 },
    { id: 'mobile', name: 'Mobile App', count: 3 },
  ];

  // Mock FAQs
  const faqs = [
    {
      id: 1,
      question: 'How do I add a new property to my account?',
      answer: 'To add a new property, navigate to the Properties section from the main dashboard and click on the "Add Property" button. Fill in the required information such as property name, address, and size. You can also add additional details like property type, client information, and upload images.',
      category: 'properties',
    },
    {
      id: 2,
      question: 'Can I track equipment maintenance history?',
      answer: 'Yes, TERRA Cloud allows you to track the complete maintenance history of your equipment. Navigate to the Equipment section, select the specific equipment, and view the "Maintenance History" tab. You can see all past maintenance records, schedule upcoming maintenance, and set up automated reminders.',
      category: 'equipment',
    },
    {
      id: 3,
      question: 'How do I schedule recurring tasks?',
      answer: 'To schedule recurring tasks, go to the Tasks section and click "Create Task". Fill in the task details, then select "Recurring" under the schedule options. You can set the frequency (daily, weekly, monthly), specify days of the week, and set an end date if needed. The system will automatically create new task instances based on your schedule.',
      category: 'tasks',
    },
    {
      id: 4,
      question: 'How do I generate custom reports?',
      answer: 'Custom reports can be created in the Reports & Analytics section. Click on "Create Custom Report", select the data points you want to include, choose visualization options, and set any filters or date ranges. You can save report templates for future use and schedule automated report generation and delivery via email.',
      category: 'reports',
    },
    {
      id: 5,
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address, and we\'ll send you a password reset link. Click the link in the email and follow the instructions to create a new password. For security reasons, password reset links expire after 24 hours.',
      category: 'account',
    },
    {
      id: 6,
      question: 'Is there a mobile app available?',
      answer: 'Yes, TERRA Cloud offers mobile apps for both iOS and Android devices. You can download them from the App Store or Google Play Store. The mobile app allows you to manage properties, track equipment, assign tasks, and view reports on the go. It also supports offline mode for field work in areas with limited connectivity.',
      category: 'mobile',
    },
    {
      id: 7,
      question: 'How do I get started with TERRA Cloud?',
      answer: 'Getting started with TERRA Cloud is easy. After signing up, you\'ll be guided through a setup wizard to configure your account. You\'ll add your company information, create your first property, and invite team members. We also offer onboarding sessions with our customer success team to help you get the most out of the platform.',
      category: 'getting-started',
    },
  ];

  // Mock popular articles
  const popularArticles = [
    { id: 1, title: 'Quick Start Guide', views: 1245, category: 'getting-started' },
    { id: 2, title: 'Setting Up Your First Property', views: 982, category: 'properties' },
    { id: 3, title: 'Managing Equipment Inventory', views: 876, category: 'equipment' },
    { id: 4, title: 'Creating and Assigning Tasks', views: 754, category: 'tasks' },
    { id: 5, title: 'Understanding Analytics Dashboard', views: 689, category: 'reports' },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader 
          title="Help Center" 
          subtitle="Find answers to your questions about TERRA Cloud"
        />

        {/* Search Section */}
        <div className="mt-6 max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <Input
              id="search"
              name="search"
              type="text"
              placeholder="Search for help articles, tutorials, and FAQs..."
              className="pl-10"
              fullWidth
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id}
                href={`/help/category/${category.id}`}
                className="block"
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                      {category.name}
                    </h3>
                    <Badge variant="neutral" size="sm">{category.count}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Browse {category.count} articles
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
            Popular Articles
          </h2>
          <Card>
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {popularArticles.map((article) => (
                <li key={article.id} className="py-4 first:pt-0 last:pb-0">
                  <Link 
                    href={`/help/article/${article.id}`}
                    className="flex items-start hover:bg-neutral-50 dark:hover:bg-neutral-800 p-2 rounded-md -mx-2"
                  >
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-neutral-900 dark:text-white">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        Category: {categories.find(c => c.id === article.category)?.name}
                      </p>
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {article.views.toLocaleString()} views
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* FAQs */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>
          <Card>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {faqs.map((faq) => (
                <div key={faq.id} className="py-6 first:pt-0 last:pb-0">
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <div className="mt-2 text-base text-neutral-600 dark:text-neutral-400">
                    <p>{faq.answer}</p>
                  </div>
                  <div className="mt-4 flex items-center">
                    <Badge variant="neutral" size="sm">
                      {categories.find(c => c.id === faq.category)?.name}
                    </Badge>
                    <Link 
                      href={`/help/faq/${faq.id}`}
                      className="ml-4 text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              Can't find what you're looking for?
            </h2>
            <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Our support team is here to help. Contact us for personalized assistance with any questions or issues you may have.
            </p>
            <div className="mt-6">
              <Link 
                href="/support"
                className="btn-primary"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 