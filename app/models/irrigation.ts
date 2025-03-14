/**
 * Irrigation System Data Models
 * Defines the structure for irrigation systems, zones, and individual heads
 */

// Represents an individual irrigation head/sprinkler
export interface IrrigationHead {
  id: string;
  type: 'rotor' | 'spray' | 'drip' | 'bubbler';
  position: {
    lat: number;
    lng: number;
  };
  status: 'active' | 'inactive' | 'maintenance' | 'warning';
  coverage: number; // Radius in meters
  flowRate?: number; // Gallons per minute
  lastMaintenance?: string; // ISO date string
  zoneId: string;
  propertyId: string;
  notes?: string;
}

// Represents an irrigation zone (group of heads controlled together)
export interface IrrigationZone {
  id: string;
  name: string;
  propertyId: string;
  systemId: string;
  color: string; // Color for map visualization
  boundaries: Array<{
    lat: number;
    lng: number;
  }>;
  schedule?: {
    days: Array<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'>;
    startTime: string; // 24hr format - "HH:MM"
    duration: number; // Minutes
  };
  status: 'active' | 'inactive' | 'scheduled' | 'running' | 'maintenance';
  heads: string[]; // Array of IrrigationHead IDs
}

// Represents an irrigation control system
export interface IrrigationSystem {
  id: string;
  name: string;
  propertyId: string;
  manufacturer?: string;
  model?: string;
  firmwareVersion?: string;
  apiEndpoint?: string; // For systems with API control
  zonesCount: number;
  zones: string[]; // Array of IrrigationZone IDs
  status: 'online' | 'offline' | 'maintenance';
  lastCommunication?: string; // ISO date string
}

// A service interface for working with irrigation data
export interface IrrigationService {
  getSystemsByPropertyId(propertyId: string): Promise<IrrigationSystem[]>;
  getZonesBySystemId(systemId: string): Promise<IrrigationZone[]>;
  getZonesByPropertyId(propertyId: string): Promise<IrrigationZone[]>;
  getHeadsByZoneId(zoneId: string): Promise<IrrigationHead[]>;
  getHeadsByPropertyId(propertyId: string): Promise<IrrigationHead[]>;
  updateHeadStatus(headId: string, status: IrrigationHead['status']): Promise<void>;
  updateZoneStatus(zoneId: string, status: IrrigationZone['status']): Promise<void>;
  updateSystemStatus(systemId: string, status: IrrigationSystem['status']): Promise<void>;
  toggleZone(zoneId: string, active: boolean): Promise<void>;
} 