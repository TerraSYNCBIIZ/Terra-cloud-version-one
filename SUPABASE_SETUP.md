# Supabase Backend Setup for Terra Cloud Platform

This document provides instructions on how to set up the Supabase backend for the Terra Cloud Platform.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new Supabase project

## Setup Steps

### 1. Get Your Supabase Credentials

After creating your project, navigate to the project settings and find the following credentials:

- **Project URL**: Found under "Project Settings" > "API" > "Project URL"
- **Project API Key**: Found under "Project Settings" > "API" > "Project API keys" > "anon public"

### 2. Update Environment Variables

Add these credentials to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Set Up Database Schema

1. Navigate to the "SQL Editor" in your Supabase dashboard
2. Create a new query
3. Copy and paste the contents of the `supabase-schema.sql` file from this project
4. Run the query to create all necessary tables and security policies

### 4. Enable Authentication

1. Go to "Authentication" > "Providers"
2. Ensure "Email" provider is enabled
3. Under "Email Templates", you can customize the email templates for password recovery, etc.

### 5. Set Up Storage (Optional)

If you plan to use file storage for property images or documents:

1. Go to "Storage" > "Buckets"
2. Create the following buckets:
   - `property-images`
   - `equipment-images`
   - `task-attachments`
3. Set appropriate bucket policies (public or private)

## Database Structure

The Terra Cloud Platform uses the following tables:

- `profiles`: User profiles with roles (admin, manager, field_technician)
- `properties`: Property information including location data
- `equipment`: Equipment inventory linked to properties
- `tasks`: Tasks assigned to technicians
- `property_assignments`: Links users to properties they can access
- `equipment_assignments`: Links users to equipment they're responsible for
- `task_assignments`: Links users to tasks they're assigned to
- `irrigation_zones`: Irrigation zone information with geospatial data
- `irrigation_schedules`: Scheduling information for irrigation zones

## Row Level Security (RLS)

The database uses Row Level Security to ensure users can only access data they're authorized to see:

- Admins have full access to all data
- Managers can access properties they manage and view technician profiles
- Field technicians can only access properties, equipment, and tasks assigned to them

## Next Steps

After setting up the Supabase backend:

1. Create an admin user through the signup page
2. Use the admin account to create properties and assign users
3. Create manager and technician accounts as needed 