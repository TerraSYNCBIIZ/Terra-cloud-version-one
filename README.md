# TERRA Cloud Platform

## Overview
TERRA Cloud is a comprehensive platform designed for in-house grounds maintenance companies to manage their employees, technology, and properties in one unified interface. The platform synchronizes all aspects of grounds maintenance operations into a seamless management solution.

## Design Philosophy
TERRA Cloud prioritizes exceptional user experience and cutting-edge visual design. The platform balances sophisticated aesthetics with intuitive usability, creating an experience that is both powerful and approachable. Key design priorities include:

- **Sophisticated Simplicity**: Clean, uncluttered interfaces with purposeful organization
- **Visual Hierarchy**: Clear focus on important elements through strategic design
- **Contextual Intelligence**: Adaptive interfaces that respond to user behavior
- **Seamless Transitions**: Smooth, meaningful animations and logical screen flows
- **Accessibility**: Inclusive design that works for all users

For comprehensive design specifications and UX guidelines, see [DESIGN-GUIDELINES.md](./DESIGN-GUIDELINES.md).

## Project Structure

```
TERRA Cloud/
├── app/                    # Next.js App Router directory
│   ├── components/         # UI and layout components
│   │   ├── ui/             # Reusable UI components
│   │   └── layout/         # Layout components
│   ├── lib/                # Utility libraries and helpers
│   ├── api/                # API routes
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript type definitions
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context providers
│   ├── utils/              # Utility functions
│   ├── globals.css         # Global CSS styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page component
├── public/                 # Static assets
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── next.config.js          # Next.js configuration
├── DESIGN-GUIDELINES.md    # Design system documentation
└── README.md               # Project documentation
```

## Core Features
- Employee management and tracking
- Technology/equipment inventory and monitoring
  - Robotic mowers
  - Range pickers
  - Line painters
  - Other autonomous equipment
- Property management
- Unified dashboard for operations overview
- Map-based interface for zone and resource management
- Centralized scheduling system for all resources
- Weather data integration
- API integrations with equipment manufacturers

## User Roles
- **Super Administrator** (optional) - Highest-level access to all company accounts
- **Administrators** - Company-level access, responsible for initial signup and overall management
- **Managers** - Can manage teams/groups of employees and technology
- **Field Technicians** - Assigned to specific areas or equipment, responsible for on-site operations

## Technical Stack
- Frontend: React with Next.js
- Backend: Supabase
- Deployment: Vercel (future)
- UI Framework: Custom component library built on Tailwind CSS
- Animation: Framer Motion for sophisticated interactions
- Maps: Mapbox GL JS for advanced map functionality
- Data Visualization: D3.js/Recharts for analytics and dashboards

## Development Setup

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/terra-cloud.git
   cd terra-cloud
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:3000

## Development Approach
The development follows a skeleton/wireframe approach, where we first build out the architecture and basic UI components before filling in detailed functionality. This allows for rapid iteration and architecture validation before investing in complete feature implementation.

## Key Concepts
- **Map-based Interface** - Core navigation uses map views with polygon-defined zones for assigning employees and equipment
- **Hierarchical Management** - Resources roll up from field technicians to managers to administrators

## Security and Data Protection
- **Authentication**:
  - Standard email/password authentication
  - Multi-factor authentication option for sensitive roles
  - Secure password requirements (minimum length, complexity)
  - Session timeout for inactive users

- **Role-Based Access Controls**:
  - Permissions tied directly to user roles:
    - Super Administrators: Full system access
    - Administrators: Company-wide access with user management capabilities
    - Managers: Access to assigned teams and properties
    - Field Technicians: Access to assigned zones and tasks only
  - Feature-level access controls (view, edit, delete permissions)
  - Restricted data visibility based on role

- **Data Protection**:
  - Encrypted data storage for sensitive information
  - Secure API connections for equipment integrations
  - Regular automated backups
  - Audit logs for critical actions (user management, permission changes)

- **Mobile Security**:
  - Secure login persistence on mobile devices
  - Option to require authentication for sensitive actions
  - Remote session termination capabilities

## Mobile Functionality and Responsive Design
- **Cross-Device Compatibility**:
  - Responsive web design approach supporting mobile, tablet, and desktop
  - Optimized layouts for different screen sizes
  - Touch-friendly interface elements for mobile/tablet users

- **Device-Specific Features**:
  - **Mobile**: Direct camera capture for photo documentation, simplified task views
  - **Tablet**: Hybrid functionality with camera capture and detailed map views
  - **Desktop**: Full-featured interface with advanced management capabilities

- **Role-Specific Mobile Features**:
  - **Field Technicians**:
    - Simplified task list and management
    - Quick time tracking and clock in/out
    - Photo documentation of completed work
    - Equipment status updates
    - GPS-assisted navigation to task locations
    - Offline task caching for areas with poor connectivity

  - **Managers**:
    - Employee location tracking
    - Mobile task assignment and scheduling
    - Quick status overview dashboards
    - Approval workflows for completed tasks
    - Basic reporting and analytics views

  - **Administrators**:
    - Emergency alerts and notifications
    - Key performance metrics on-the-go
    - Basic user management functions

- **Mobile-Optimized Views**:
  - Streamlined navigation for smaller screens
  - Priority-based information hierarchy for mobile users
  - Critical functions accessible with minimal taps
  - Map interface optimized for touch interactions

## Onboarding and Setup
- **Setup Wizard**:
  - Guided step-by-step process for initial company setup
  - Simplified flow focused on core functionality
  - "Coming Soon" placeholders for advanced features still in development

- **Setup Process**:
  1. Company information entry
  2. Organization structure creation (admin and manager accounts)
  3. Equipment inventory setup (basic information)
  4. Property/site configuration
  5. Zone mapping for employee assignments
  6. Integration connection points (placeholders for future implementation)

- **Equipment Connection**:
  - Basic inventory management for initial phase
  - Placeholder framework for future API integrations with:
    - Robotic mowers (Husqvarna, etc.)
    - Range pickers
    - Line painters
    - Irrigation systems
    - Drone systems

- **Documentation**:
  - Quick start guides for each major feature
  - Video tutorials for common workflows
  - In-app contextual help
  - Knowledge base for advanced topics

## Property Management
- **Multi-Property Structure**:
  - Companies can manage multiple properties/sites through a single account
  - Property selection interface only displays if more than one property exists
  - Each property acts as a distinct operational entity

- **Property Information**:
  - Key personnel (site manager, main contact)
  - Map preview of the property
  - Basic property details (address, size, type)
  - Equipment inventory assigned to the property
  - Team members assigned to the property

- **Property Access Control**:
  - Field Technicians: Access only to properties they're assigned to
  - Managers: Access only to properties they manage
  - Administrators: Access to all company properties
  - Cross-property visibility restricted based on user role and assignments

- **Property-Level Analytics**:
  - Resource allocation across properties
  - Property-specific equipment utilization
  - Task completion rates by property
  - Maintenance efficiency comparison between properties
  - Labor distribution and cost analysis

## Reporting and Analytics
- **Equipment KPIs**:
  - Robotic mower productivity (acreage mowed, operation time)
  - Equipment efficiency ratings
  - Equipment failure rates and downtime
  - Maintenance frequency and costs
  - Battery usage and charging efficiency (for electric equipment)

- **Task KPIs**:
  - Task delay rates
  - Average completion times by task type
  - Task efficiency (actual vs. estimated time)
  - Overdue task tracking
  - Task distribution across teams/zones

- **Employee KPIs**:
  - Productivity scores
  - Task completion rates
  - Time tracking analysis
  - Work distribution
  - Efficiency trends over time

- **Chemical Application Tracking**:
  - Application rates and coverage
  - Chemical usage metrics
  - Treatment effectiveness
  - Compliance with regulations

- **Irrigation KPIs**:
  - Water usage metrics
  - System efficiency
  - Maintenance needs
  - Weather-adjusted performance

- **Visualization Tools**:
  - Interactive charts and graphs for all KPI categories
  - Trend analysis over time
  - Comparative performance views
  - Role-appropriate dashboards with relevant metrics

- **Reporting Features**:
  - Customizable report generation
  - Scheduled report delivery
  - Export capabilities (PDF, CSV, Excel)
  - Data filtering and drill-down capabilities

- **Dashboard System**:
  - Role-specific KPI dashboards
  - Customizable views
  - Real-time updates
  - Alert notifications for metrics outside acceptable ranges

## Employee Management System
- **Employee Profile Information**:
  - Basic details (name, contact information, etc.)
  - Assigned zones and equipment
  - Task history and current assignments
  - Productivity metrics (manager-view only)

- **Time Tracking**:
  - General clock in/out functionality for non-task work
  - Task-specific time tracking
  - Mutual exclusivity (can't track time for general work and tasks simultaneously)
  - Time reports by employee, task type, project, or date range

- **Productivity Measurement**:
  - Task estimated completion times set by managers
  - Actual vs. estimated time comparison
  - Productivity score calculation
  - Efficiency ratings (visible to managers only)

- **Assignment Management**:
  - Zone-based responsibility assignment
  - Equipment assignment through zone association
  - Manager oversight of all assigned employees and equipment
  - Toggleable views for different assignment types

- **Notification System**:
  - Task assignments and updates
  - Deadline reminders
  - Priority changes
  - Schedule adjustments

## Map Interface
- **Base Layer**: Google Maps view of the property
- **Multiple Overlay System** with toggle functionality:
  - **Employee Zones**: Polygon-defined areas assigned to specific employees
  - **Master Zones**: Clusters of zones managed by teams (higher-level grouping)
  - **Mower Zones**: Equipment-specific operational areas (received from mower APIs)
  - **Irrigation System**: Displaying irrigation head locations and zones
  - **Drone Imagery**: Overlay of aerial imagery with geo-tagged data (future feature)
- **Interactive Functionality**:
  - Pin tasks to specific geographic locations
  - Assign tasks to entire zones
  - View employee assignments and responsibilities
  - Monitor equipment status within zones
  - Manage relationships between employees and equipment
  - Zone creation and editing using polygon drawing tools

## Task Management System
- **Task Properties**:
  - Assignment: to individuals or teams/groups
  - Timestamps: creation, assignment, and due dates
  - Location: optional geographic pinpointing on map
  - Description: detailed information about the task
  - Project association: tasks can be nested within projects
  - Status tracking: pending, in progress, completed, etc.

- **Priority System**:
  - Priority 1: Must be completed within 24 hours
  - Priority 2: Must be completed within 3 days
  - Priority 3: Must be completed within the week

- **Recurring Tasks**:
  - Configurable frequency (daily, weekly, monthly, etc.)
  - Custom recurrence patterns

- **Project Management**:
  - Group related tasks into projects
  - Sequential task dependencies (task A must be completed before task B can begin)
  - Project templates for common workflows
  - Project status tracking

## Scheduling System
- **Centralized Calendar Interface**:
  - Multiple filterable views:
    - By equipment type (mowers, line painters, range pickers, irrigation)
    - By employee/team assignments
    - By zone/location
    - By project
  - Toggle different schedule components on/off
  - Daily, weekly, monthly, and list views

- **Resource Scheduling**:
  - Equipment operation schedules
  - Maintenance appointments
  - Employee work schedules
  - Task deadlines

- **Conflict Management**:
  - Overlap detection for resources and personnel
  - Notification system for scheduling conflicts
  - Suggested resolution options

- **Weather Integration**:
  - Automated schedule adjustments based on weather forecasts
  - Rescheduling options for weather-affected tasks

## Equipment Management Functionality
### Robotic Mowers
- API integration with manufacturer systems (e.g., Husqvarna Automower® Connect API)
- Real-time status monitoring (operational status, battery level, location)
- Remote command capabilities:
  - Start/stop operation
  - Pause operation
  - Park until next schedule/further notice
  - Schedule management
  - Setting adjustments (cutting height, etc.)
- Maintenance tracking and scheduling

### Range Pickers
- API integration with manufacturer systems
- Mission control (send out, recall)
- Analytics tracking (productivity, balls collected)
- Schedule management
- Maintenance tracking

### Line Painters
- API integration with manufacturer systems
- Mission control and status monitoring
- Schedule management
- Maintenance tracking

### Irrigation Systems
- API connections to irrigation control systems
- Single nozzle control capabilities (where available)
- Weather-based automation (e.g., pause during rain)
- Schedule management

### Future Integration (Drone Mapping)
- Virtual maps from drone imagery
- Geo-tagged data for irrigation and maintenance needs

## Weather Integration
- API connections to weather data services
- Automated schedule adjustments based on weather conditions
- Impact on irrigation systems and equipment operations

## Requirements Gathering
*This section will be updated as we collect more detailed requirements through consultation.* 