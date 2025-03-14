"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';

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
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for session and set up auth state listener
  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      setLoading(true);
      
      // Check if there's an active session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        await fetchUserProfile(session.user);
      }
      
      // Set up auth state change listener
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            await fetchUserProfile(session.user);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );
      
      setLoading(false);
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);
  
  // Fetch user profile data from Supabase
  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      // Get user profile from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();
        
      if (error) {
        throw error;
      }
      
      if (data) {
        // Get user's assigned properties, equipment, and tasks
        const { data: assignedProperties } = await supabase
          .from('property_assignments')
          .select('property_id')
          .eq('user_id', supabaseUser.id);
          
        const { data: assignedEquipment } = await supabase
          .from('equipment_assignments')
          .select('equipment_id')
          .eq('user_id', supabaseUser.id);
          
        const { data: assignedTasks } = await supabase
          .from('task_assignments')
          .select('task_id')
          .eq('user_id', supabaseUser.id);
        
        // Set user with profile data and assignments
        setUser({
          id: supabaseUser.id,
          name: data.name || supabaseUser.email?.split('@')[0] || '',
          email: supabaseUser.email || '',
          role: data.role || 'field_technician',
          assignedPropertyIds: assignedProperties?.map(p => p.property_id) || [],
          assignedEquipmentIds: assignedEquipment?.map(e => e.equipment_id) || [],
          assignedTaskIds: assignedTasks?.map(t => t.task_id) || []
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Login function using Supabase
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Signup function using Supabase
  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setLoading(true);
    
    try {
      // Create the user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        // Create a profile record in the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name,
              role
            }
          ]);
          
        if (profileError) {
          throw profileError;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout function using Supabase
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
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
      signup,
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
