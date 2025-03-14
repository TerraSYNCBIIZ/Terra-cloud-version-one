import { supabase } from '../lib/supabase';
import type { UserRole } from '../context/AuthContext';
import type { PostgrestError } from '@supabase/supabase-js';

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number | null;
  longitude: number | null;
  size_acres: number | null;
  created_at: string;
  updated_at: string;
}

export interface CreatePropertyData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude?: number;
  longitude?: number;
  size_acres?: number;
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> {
  id: string;
}

// Define user profile interface
export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
}

// Define property assignment interface with joined profile
interface PropertyAssignment {
  user_id: string;
  property_id: string;
  profiles: UserProfile;
}

export const propertyService = {
  // Get all properties the user has access to
  async getProperties(): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Get a single property by ID
  async getPropertyById(id: string): Promise<Property | null> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error(`Error fetching property with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Create a new property
  async createProperty(propertyData: CreatePropertyData): Promise<Property> {
    const { data, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select()
      .single();
      
    if (error) {
      console.error('Error creating property:', error);
      throw error;
    }
    
    return data;
  },
  
  // Update an existing property
  async updateProperty(propertyData: UpdatePropertyData): Promise<Property> {
    const { id, ...updateData } = propertyData;
    
    const { data, error } = await supabase
      .from('properties')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error(`Error updating property with ID ${id}:`, error);
      throw error;
    }
    
    return data;
  },
  
  // Delete a property
  async deleteProperty(id: string): Promise<void> {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error(`Error deleting property with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Assign a user to a property
  async assignUserToProperty(userId: string, propertyId: string): Promise<void> {
    const { error } = await supabase
      .from('property_assignments')
      .insert([
        { user_id: userId, property_id: propertyId }
      ]);
      
    if (error) {
      console.error(`Error assigning user ${userId} to property ${propertyId}:`, error);
      throw error;
    }
  },
  
  // Remove a user from a property
  async removeUserFromProperty(userId: string, propertyId: string): Promise<void> {
    const { error } = await supabase
      .from('property_assignments')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId);
      
    if (error) {
      console.error(`Error removing user ${userId} from property ${propertyId}:`, error);
      throw error;
    }
  },
  
  // Get all users assigned to a property
  async getPropertyUsers(propertyId: string): Promise<UserProfile[]> {
    const { data, error } = await supabase
      .from('property_assignments')
      .select(`
        user_id,
        property_id,
        profiles:user_id (
          id,
          name,
          role
        )
      `)
      .eq('property_id', propertyId) as { data: PropertyAssignment[] | null, error: any };
      
    if (error) {
      console.error(`Error fetching users for property ${propertyId}:`, error);
      throw error;
    }
    
    // Extract the profiles from the response
    return (data || []).map(item => item.profiles);
  }
}; 