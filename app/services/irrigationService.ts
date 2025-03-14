import { IrrigationHead, IrrigationZone, IrrigationSystem, IrrigationService } from '../models/irrigation';

/**
 * Mock Irrigation Service
 * Provides sample data for irrigation systems, zones, and heads
 */
class MockIrrigationService implements IrrigationService {
  private systems: IrrigationSystem[] = [
    {
      id: 'sys-001',
      name: 'Main Irrigation System',
      propertyId: '1', // North Campus
      manufacturer: 'RainBird',
      model: 'ESP-TM2',
      firmwareVersion: '2.1.0',
      zonesCount: 2,
      zones: ['zone-001', 'zone-002'],
      status: 'online',
      lastCommunication: new Date().toISOString(),
    },
  ];

  private zones: IrrigationZone[] = [
    {
      id: 'zone-001',
      name: 'Front Lawn Zone',
      propertyId: '1',
      systemId: 'sys-001',
      color: '#3388ff',
      boundaries: [
        { lat: 39.782719, lng: -89.651150 },
        { lat: 39.782719, lng: -89.650150 },
        { lat: 39.781719, lng: -89.650150 },
        { lat: 39.781719, lng: -89.651150 },
      ],
      schedule: {
        days: ['monday', 'wednesday', 'friday'],
        startTime: '06:00',
        duration: 20,
      },
      status: 'active',
      heads: ['head-001', 'head-002', 'head-003', 'head-004'],
    },
    {
      id: 'zone-002',
      name: 'Athletic Field Zone',
      propertyId: '1',
      systemId: 'sys-001',
      color: '#33cc33',
      boundaries: [
        { lat: 39.780719, lng: -89.651150 },
        { lat: 39.780719, lng: -89.649150 },
        { lat: 39.779719, lng: -89.649150 },
        { lat: 39.779719, lng: -89.651150 },
      ],
      schedule: {
        days: ['tuesday', 'thursday', 'saturday'],
        startTime: '05:30',
        duration: 30,
      },
      status: 'inactive',
      heads: ['head-005', 'head-006', 'head-007', 'head-008', 'head-009'],
    },
  ];

  private heads: IrrigationHead[] = [
    // Front Lawn Zone
    {
      id: 'head-001',
      type: 'rotor',
      position: { lat: 39.782619, lng: -89.651050 },
      status: 'active',
      coverage: 10,
      flowRate: 3.5,
      lastMaintenance: '2023-05-15T14:30:00Z',
      zoneId: 'zone-001',
      propertyId: '1',
    },
    {
      id: 'head-002',
      type: 'rotor',
      position: { lat: 39.782619, lng: -89.650550 },
      status: 'active',
      coverage: 10,
      flowRate: 3.5,
      zoneId: 'zone-001',
      propertyId: '1',
    },
    {
      id: 'head-003',
      type: 'rotor',
      position: { lat: 39.782119, lng: -89.651050 },
      status: 'warning',
      coverage: 10,
      flowRate: 2.9, // Lower than expected, hence warning
      zoneId: 'zone-001',
      propertyId: '1',
      notes: 'Flow rate lower than expected, check for clogging',
    },
    {
      id: 'head-004',
      type: 'rotor',
      position: { lat: 39.782119, lng: -89.650550 },
      status: 'maintenance',
      coverage: 10,
      flowRate: 0, // Not working
      lastMaintenance: '2023-08-10T09:15:00Z',
      zoneId: 'zone-001',
      propertyId: '1',
      notes: 'Not functioning, scheduled for replacement',
    },
    
    // Athletic Field Zone
    {
      id: 'head-005',
      type: 'spray',
      position: { lat: 39.780619, lng: -89.651050 },
      status: 'inactive',
      coverage: 5,
      flowRate: 2.0,
      zoneId: 'zone-002',
      propertyId: '1',
    },
    {
      id: 'head-006',
      type: 'spray',
      position: { lat: 39.780619, lng: -89.650350 },
      status: 'inactive',
      coverage: 5,
      flowRate: 2.0,
      zoneId: 'zone-002',
      propertyId: '1',
    },
    {
      id: 'head-007',
      type: 'spray',
      position: { lat: 39.780619, lng: -89.649650 },
      status: 'inactive',
      coverage: 5,
      flowRate: 2.0,
      zoneId: 'zone-002',
      propertyId: '1',
    },
    {
      id: 'head-008',
      type: 'spray',
      position: { lat: 39.780119, lng: -89.650700 },
      status: 'inactive',
      coverage: 5,
      flowRate: 2.0,
      zoneId: 'zone-002',
      propertyId: '1',
    },
    {
      id: 'head-009',
      type: 'spray',
      position: { lat: 39.780119, lng: -89.649800 },
      status: 'inactive',
      coverage: 5,
      flowRate: 2.0,
      zoneId: 'zone-002',
      propertyId: '1',
    },
  ];

  async getSystemsByPropertyId(propertyId: string): Promise<IrrigationSystem[]> {
    return this.systems.filter(system => system.propertyId === propertyId);
  }

  async getZonesBySystemId(systemId: string): Promise<IrrigationZone[]> {
    return this.zones.filter(zone => zone.systemId === systemId);
  }

  async getZonesByPropertyId(propertyId: string): Promise<IrrigationZone[]> {
    return this.zones.filter(zone => zone.propertyId === propertyId);
  }

  async getHeadsByZoneId(zoneId: string): Promise<IrrigationHead[]> {
    return this.heads.filter(head => head.zoneId === zoneId);
  }

  async getHeadsByPropertyId(propertyId: string): Promise<IrrigationHead[]> {
    return this.heads.filter(head => head.propertyId === propertyId);
  }

  async updateHeadStatus(headId: string, status: IrrigationHead['status']): Promise<void> {
    const head = this.heads.find(h => h.id === headId);
    if (head) {
      head.status = status;
    }
  }

  async updateZoneStatus(zoneId: string, status: IrrigationZone['status']): Promise<void> {
    const zone = this.zones.find(z => z.id === zoneId);
    if (zone) {
      zone.status = status;
      
      // Update all heads in this zone
      const zoneHeads = this.heads.filter(head => head.zoneId === zoneId);
      for (const head of zoneHeads) {
        // If zone is active, set all maintenance heads to active
        if (status === 'active' && head.status !== 'warning') {
          head.status = 'active';
        } 
        // If zone is inactive/maintenance, set all active heads to inactive/maintenance
        else if (status === 'inactive' || status === 'maintenance') {
          head.status = status === 'inactive' ? 'inactive' : 'maintenance';
        }
      }
    }
  }

  async updateSystemStatus(systemId: string, status: IrrigationSystem['status']): Promise<void> {
    const system = this.systems.find(s => s.id === systemId);
    if (system) {
      system.status = status;
      
      if (status === 'offline') {
        // When system is offline, set all zones to inactive
        const systemZones = this.zones.filter(zone => zone.systemId === systemId);
        for (const zone of systemZones) {
          await this.updateZoneStatus(zone.id, 'inactive');
        }
      }
    }
  }

  async toggleZone(zoneId: string, active: boolean): Promise<void> {
    await this.updateZoneStatus(zoneId, active ? 'active' : 'inactive');
  }
}

// Export singleton instance
export const irrigationService = new MockIrrigationService(); 