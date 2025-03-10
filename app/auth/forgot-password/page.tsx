"use client";

import React from 'react';
import Link from 'next/link';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h2 className="text-center text-3xl font-bold text-primary-600">TERRA Cloud</h2>
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold text-neutral-900 dark:text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <Card className="p-6 sm:p-8">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                autoComplete="email"
                required
                fullWidth
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Send Reset Link
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
              Back to login
            </Link>
          </div>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} TERRA Cloud. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/contact" className="text-xs text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300">
              Contact Support
            </Link>
            <span className="text-neutral-400 dark:text-neutral-600">|</span>
            <Link href="/help" className="text-xs text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 