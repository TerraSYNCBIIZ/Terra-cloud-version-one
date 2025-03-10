"use client";

import React from 'react';
import Link from 'next/link';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h2 className="text-center text-3xl font-bold text-primary-600">TERRA Cloud</h2>
          </Link>
          <h2 className="mt-6 text-center text-2xl font-bold text-neutral-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
              Sign in
            </Link>
          </p>
        </div>
        
        <Card className="p-6 sm:p-8">
          <form className="space-y-6" action="#" method="POST">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  label="First Name"
                  autoComplete="given-name"
                  required
                  fullWidth
                />
              </div>
              <div>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  label="Last Name"
                  autoComplete="family-name"
                  required
                  fullWidth
                />
              </div>
            </div>

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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  Min. 8 characters
                </span>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:text-white text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:text-white text-sm"
                />
              </div>
            </div>

            <div>
              <Input
                id="company"
                name="company"
                type="text"
                label="Company / Organization"
                autoComplete="organization"
                fullWidth
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  Terms and Conditions
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300 dark:border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm bg-white dark:bg-neutral-800 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                <span className="sr-only">Sign up with Google</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm bg-white dark:bg-neutral-800 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                <span className="sr-only">Sign up with Microsoft</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                </svg>
              </button>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} TERRA Cloud. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
} 