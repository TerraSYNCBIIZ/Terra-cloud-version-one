"use client";

import React from 'react';
import Link from 'next/link';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-center text-3xl font-extrabold text-neutral-900 dark:text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Create a new password for your TERRA Cloud account
          </p>
        </div>
        
        <Card className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                label="New Password"
                autoComplete="new-password"
                required
                helperText="Password must be at least 8 characters and include a number and special character"
                fullWidth
              />
            </div>

            <div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm New Password"
                autoComplete="new-password"
                required
                fullWidth
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Reset Password
              </button>
            </div>
          </form>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <div className="text-sm">
          <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
            Return to login
          </Link>
        </div>
        <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          Need help? <Link href="/support" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">Contact Support</Link>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
        &copy; {new Date().getFullYear()} TERRA Cloud. All rights reserved.
      </div>
    </div>
  );
} 