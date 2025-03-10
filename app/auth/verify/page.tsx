"use client";

import React from 'react';
import Link from 'next/link';
import { Card } from '../../components/ui/Card';

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
            <svg className="h-6 w-6 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-3 text-center text-3xl font-extrabold text-neutral-900 dark:text-white">
            Email Verified!
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Your email has been successfully verified. You can now access all features of TERRA Cloud.
          </p>
        </div>
        
        <Card className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="space-y-6 text-center">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Thank you for verifying your email address. Your account is now fully activated.
              </p>
            </div>
            
            <div>
              <Link
                href="/auth/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Continue to Login
              </Link>
            </div>
            
            <div className="text-sm">
              <p className="text-neutral-600 dark:text-neutral-400">
                You can now sign in to your account with your email and password.
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="mt-8 text-center">
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          Need help? <Link href="/support" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">Contact Support</Link>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
        &copy; {new Date().getFullYear()} TERRA Cloud. All rights reserved.
      </div>
    </div>
  );
} 