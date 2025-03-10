"use client";

import React from 'react';
import Link from 'next/link';
import { Card } from '../../components/ui/Card';

export default function VerificationPendingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900">
            <svg className="h-6 w-6 text-blue-600 dark:text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="mt-3 text-center text-3xl font-extrabold text-neutral-900 dark:text-white">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            We've sent a verification link to your email address
          </p>
        </div>
        
        <Card className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="space-y-6">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Please check your inbox and click on the verification link to complete your registration. If you don't see the email, check your spam folder.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium">Didn't receive the email?</span>
              </p>
              <button
                type="button"
                className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Resend verification email
              </button>
            </div>
            
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Already verified?
                </p>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  Sign in
                </Link>
              </div>
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