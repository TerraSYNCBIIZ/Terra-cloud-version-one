"use client";

import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="max-w-5xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-primary-600">TERRA Cloud</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300">
            Grounds Maintenance Automation Platform
          </p>
        </div>

        {/* Introduction */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Welcome to TERRA Cloud</h2>
          <p className="mb-4">
            A comprehensive platform for in-house grounds maintenance companies to manage their 
            employees, technology, and properties in one unified interface.
          </p>
          <p className="mb-6">
            The platform is currently in development. This page showcases some of the 
            design system elements we will be using.
          </p>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary">
              Dashboard
            </Link>
            <Link href="/properties" className="btn-primary">
              Properties
            </Link>
            <Link href="/employees" className="btn-primary">
              Employees
            </Link>
            <Link href="/equipment" className="btn-primary">
              Equipment
            </Link>
            <Link href="/tasks" className="btn-primary">
              Tasks
            </Link>
          </div>
        </div>

        {/* Design System Preview */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Design System Preview</h2>
          
          {/* Colors */}
          <div className="card">
            <h3 className="text-xl font-medium mb-4">Color Palette</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-neutral-500 mb-2">Primary</h4>
                <div className="grid grid-cols-5 gap-2">
                  {[900, 700, 500, 300, 100].map((weight) => (
                    <div key={weight} className="flex flex-col items-center">
                      <div 
                        className={`w-16 h-16 rounded-md bg-primary-${weight}`} 
                        aria-label={`Primary ${weight}`}
                      />
                      <span className="text-xs mt-1">{weight}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-neutral-500 mb-2">Secondary</h4>
                <div className="grid grid-cols-5 gap-2">
                  {[900, 700, 500, 300, 100].map((weight) => (
                    <div key={weight} className="flex flex-col items-center">
                      <div 
                        className={`w-16 h-16 rounded-md bg-secondary-${weight}`} 
                        aria-label={`Secondary ${weight}`}
                      />
                      <span className="text-xs mt-1">{weight}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-neutral-500 mb-2">Neutral</h4>
                <div className="grid grid-cols-5 gap-2">
                  {[900, 700, 500, 300, 100].map((weight) => (
                    <div key={weight} className="flex flex-col items-center">
                      <div 
                        className={`w-16 h-16 rounded-md bg-neutral-${weight}`} 
                        aria-label={`Neutral ${weight}`}
                      />
                      <span className="text-xs mt-1">{weight}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-neutral-500 mb-2">Functional</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: 'Success', color: 'bg-success' },
                    { name: 'Warning', color: 'bg-warning' },
                    { name: 'Error', color: 'bg-error' },
                    { name: 'Info', color: 'bg-info' },
                  ].map((item) => (
                    <div key={item.name} className="flex flex-col items-center">
                      <div 
                        className={`w-16 h-16 rounded-md ${item.color}`} 
                        aria-label={item.name}
                      />
                      <span className="text-xs mt-1">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Typography */}
          <div className="card">
            <h3 className="text-xl font-medium mb-4">Typography</h3>
            <div className="space-y-4">
              <div>
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
              </div>
              <p className="text-base">
                This is regular body text. TERRA Cloud uses a clean, modern type system with careful
                attention to readability and hierarchy.
              </p>
              <p className="text-sm">
                This is smaller text, used for secondary information or interfaces that require
                more density.
              </p>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="card">
            <h3 className="text-xl font-medium mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button type="button" className="btn-primary">Primary Button</button>
              <button type="button" className="btn-secondary">Secondary Button</button>
              <button type="button" className="btn-outline">Outline Button</button>
              <button type="button" className="btn bg-neutral-800 hover:bg-neutral-900 text-white">Dark Button</button>
              <button type="button" disabled className="btn-primary opacity-50 cursor-not-allowed">Disabled</button>
            </div>
          </div>
          
          {/* Cards */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h4 className="font-medium mb-2">Standard Card</h4>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Cards are used to group related information and actions.
                </p>
              </div>
              <div className="card bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                <h4 className="font-medium mb-2 text-primary-700 dark:text-primary-300">Highlighted Card</h4>
                <p className="text-primary-700 dark:text-primary-300">
                  Use colored backgrounds for emphasis or categorization.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-neutral-500 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p>TERRA Cloud - Development Preview</p>
        </div>
      </div>
    </main>
  )
} 