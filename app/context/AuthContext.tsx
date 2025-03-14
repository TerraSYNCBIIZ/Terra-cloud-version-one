"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Define user roles
export type UserRole = 'admin' | 'manager' | 'field_technician';

// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  assignedPropertyIds?: string[];
  assignedEquipmentIds?: string[];
  assignedTaskIds?: string[];
}

// Define authentication context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  isManager: () => boolean;
  isFieldTechnician: () => boolean;
  canAccessProperty: (propertyId: string) => boolean;
  canAccessEquipment: (equipmentId: string) => boolean;
  canAccessTask: (taskId: string) => boolean;
  canViewEmployees: () => boolean;
  getUserProperties: () => string[];
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'admin@example.com',
    role: 'admin' as UserRole,
    // Admin has access to all properties
    assignedPropertyIds: ['1', '2', '3', '4', '5'],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'manager@example.com',
    role: 'manager' as UserRole,
    // Manager is responsible for multiple properties
    assignedPropertyIds: ['1', '2'],
    // Managers can see all tasks for their properties
    assignedTaskIds: ['101', '102', '103', '104', '105', '106']
  },
  {
    id: '3',
    name: 'Robert Wilson',
    email: 'tech@example.com',
    role: 'field_technician' as UserRole,
    // Field technician is typically assigned to one property, occasionally two
    assignedPropertyIds: ['1'],
    // Field technicians can only see equipment they're responsible for
    assignedEquipmentIds: ['101', '102', '103'],
    // Field technicians only see their own tasks
    assignedTaskIds: ['101', '102']
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for a saved session
  useEffect(() => {
    // Check if user is stored in localStorage (in a real app)
    // For this demo, we'll auto-login as admin
    const savedUser = MOCK_USERS[0]; // Default to admin for now
    
    if (savedUser) {
      setUser(savedUser);
    }
    
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // In a real app, this would make an API call
      const foundUser = MOCK_USERS.find(user => user.email === email);
      
      if (foundUser) {
        // Simulate successful login
        setUser(foundUser);
        // In a real app, store auth token/user in localStorage or a secure cookie
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  // Mock logout function
  const logout = () => {
    setUser(null);
    // In a real app, remove auth token/user from localStorage or cookie
  };

  // Role check helper functions
  const isAdmin = () => user?.role === 'admin';
  const isManager = () => user?.role === 'manager';
  const isFieldTechnician = () => user?.role === 'field_technician';
  
  // Access control helper functions based on user role
  const canAccessProperty = (propertyId: string) => {
    if (!user) return false;
    
    // Admins can access all properties
    if (user.role === 'admin') return true;
    
    // Managers and technicians can only access their assigned properties
    return user.assignedPropertyIds?.includes(propertyId) || false;
  };
  
  const canAccessEquipment = (equipmentId: string) => {
    if (!user) return false;
    
    // Admins and managers can access all equipment
    if (user.role === 'admin' || user.role === 'manager') return true;
    
    // Field technicians can only access equipment they're responsible for
    return user.assignedEquipmentIds?.includes(equipmentId) || false;
  };
  
  const canAccessTask = (taskId: string) => {
    if (!user) return false;
    
    // Admins can access all tasks
    if (user.role === 'admin') return true;
    
    // Managers and technicians can only access tasks they're assigned to or related to their properties
    return user.assignedTaskIds?.includes(taskId) || false;
  };
  
  // Only admins and managers can view other employees
  const canViewEmployees = () => {
    if (!user) return false;
    return user.role === 'admin' || user.role === 'manager';
  };
  
  // Get properties the user has access to
  const getUserProperties = () => {
    if (!user) return [];
    return user.assignedPropertyIds || [];
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      isAdmin,
      isManager,
      isFieldTechnician,
      canAccessProperty,
      canAccessEquipment,
      canAccessTask,
      canViewEmployees,
      getUserProperties
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
