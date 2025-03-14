"use client";

import { useState } from 'react';
import { useAuth, type UserRole } from '../../context/AuthContext';
import { Card } from './Card';

const MOCK_USERS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'admin@example.com',
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'manager@example.com',
    role: 'manager' as UserRole,
  },
  {
    id: '3',
    name: 'Robert Wilson',
    email: 'tech@example.com',
    role: 'field_technician' as UserRole,
    assignedPropertyIds: ['1'], // North Campus property
    assignedEquipmentIds: ['101', '102', '103']
  }
];

export function RoleSwitcher() {
  const { login } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleRoleSwitch = async (email: string) => {
    try {
      // Mock password - in a real app this would be user input
      await login(email, 'password');
      setIsOpen(false);
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <title>User Icon</title>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>Switch Role</span>
      </button>
      
      {isOpen && (
        <Card className="absolute bottom-12 right-0 w-64 p-4 shadow-xl">
          <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-3">
            Select User Role
          </h3>
          <div className="space-y-2">
            {MOCK_USERS.map((user) => (
              <button
                type="button"
                key={user.id}
                onClick={() => handleRoleSwitch(user.email)}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between"
              >
                <span>{user.name}</span>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {user.role}
                </span>
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
