"use client";

import React, { useState, useEffect } from 'react';
import { Circle, InfoWindow, Polygon } from '@react-google-maps/api';
import { IrrigationHead, IrrigationZone } from '../../models/irrigation';

interface IrrigationMapLayerProps {
  propertyId: string;
  visible: boolean;
  onHeadClick?: (head: IrrigationHead) => void;
  onZoneClick?: (zone: IrrigationZone) => void;
}

// Mock import of service - in production, use proper import
import { irrigationService } from '../../services/irrigationService';

export const IrrigationMapLayer: React.FC<IrrigationMapLayerProps> = ({
  propertyId,
  visible = false,
  onHeadClick,
  onZoneClick,
}) => {
  const [zones, setZones] = useState<IrrigationZone[]>([]);
  const [heads, setHeads] = useState<IrrigationHead[]>([]);
  const [selectedHead, setSelectedHead] = useState<IrrigationHead | null>(null);
  const [selectedZone, setSelectedZone] = useState<IrrigationZone | null>(null);
  const [loading, setLoading] = useState(true);

  // Status colors for irrigation heads
  const headStatusColors = {
    active: '#4CAF50', // Green
    inactive: '#9E9E9E', // Gray
    maintenance: '#FFB74D', // Orange
    warning: '#F44336', // Red
  };

  // Get opacity based on head status
  const getHeadOpacity = (status: IrrigationHead['status']) => {
    switch (status) {
      case 'active':
        return 0.8;
      case 'warning':
        return 0.9;
      case 'maintenance':
        return 0.7;
      case 'inactive':
      default:
        return 0.5;
    }
  };

  // Fetch irrigation data when the component mounts or propertyId changes
  useEffect(() => {
    async function loadIrrigationData() {
      if (!visible) return;
      
      setLoading(true);
      try {
        const zoneData = await irrigationService.getZonesByPropertyId(propertyId);
        const headData = await irrigationService.getHeadsByPropertyId(propertyId);
        
        setZones(zoneData);
        setHeads(headData);
      } catch (error) {
        console.error('Error loading irrigation data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadIrrigationData();
  }, [propertyId, visible]);

  // Do not render anything if layer is not visible
  if (!visible) return null;

  // If still loading, do not render anything yet
  if (loading) return null;

  return (
    <>
      {/* Render Zone Polygons */}
      {zones.map((zone) => (
        <Polygon
          key={`zone-${zone.id}`}
          paths={zone.boundaries}
          options={{
            fillColor: zone.color,
            fillOpacity: zone.status === 'active' ? 0.35 : 0.15,
            strokeColor: zone.color,
            strokeOpacity: 1,
            strokeWeight: 2,
            clickable: true,
            zIndex: 1,
          }}
          onClick={() => {
            setSelectedZone(zone);
            if (onZoneClick) onZoneClick(zone);
          }}
        />
      ))}

      {/* Render Irrigation Heads */}
      {heads.map((head) => (
        <Circle
          key={`head-${head.id}`}
          center={head.position}
          radius={head.type === 'rotor' ? 2 : 1} // Larger circle for rotors
          options={{
            fillColor: headStatusColors[head.status],
            fillOpacity: getHeadOpacity(head.status),
            strokeColor: headStatusColors[head.status],
            strokeOpacity: 1,
            strokeWeight: 1,
            clickable: true,
            zIndex: 2,
          }}
          onClick={() => {
            setSelectedHead(head);
            if (onHeadClick) onHeadClick(head);
          }}
        />
      ))}

      {/* Optional: Render coverage circles (can be toggled off for clarity) */}
      {heads.filter(head => head.status === 'active').map((head) => (
        <Circle
          key={`coverage-${head.id}`}
          center={head.position}
          radius={head.coverage}
          options={{
            fillColor: headStatusColors[head.status],
            fillOpacity: 0.05,
            strokeColor: headStatusColors[head.status],
            strokeOpacity: 0.3,
            strokeWeight: 1,
            clickable: false,
            zIndex: 1,
          }}
        />
      ))}

      {/* Info Window for Selected Head */}
      {selectedHead && (
        <InfoWindow
          position={selectedHead.position}
          onCloseClick={() => setSelectedHead(null)}
        >
          <div className="p-2 max-w-xs">
            <h3 className="font-medium text-sm">Irrigation Head</h3>
            <div className="mt-1 space-y-1 text-xs">
              <p><span className="font-medium">Type:</span> {selectedHead.type}</p>
              <p><span className="font-medium">Status:</span> {selectedHead.status}</p>
              {selectedHead.flowRate !== undefined && (
                <p><span className="font-medium">Flow Rate:</span> {selectedHead.flowRate} GPM</p>
              )}
              {selectedHead.lastMaintenance && (
                <p><span className="font-medium">Last Maintained:</span> {new Date(selectedHead.lastMaintenance).toLocaleDateString()}</p>
              )}
              {selectedHead.notes && (
                <p><span className="font-medium">Notes:</span> {selectedHead.notes}</p>
              )}
            </div>
          </div>
        </InfoWindow>
      )}

      {/* Info Window for Selected Zone */}
      {selectedZone && !selectedHead && (
        <InfoWindow
          position={selectedZone.boundaries[0]}
          onCloseClick={() => setSelectedZone(null)}
        >
          <div className="p-2 max-w-xs">
            <h3 className="font-medium text-sm">{selectedZone.name}</h3>
            <div className="mt-1 space-y-1 text-xs">
              <p><span className="font-medium">Status:</span> {selectedZone.status}</p>
              {selectedZone.schedule && (
                <>
                  <p><span className="font-medium">Schedule:</span> {selectedZone.schedule.days.join(', ')}</p>
                  <p><span className="font-medium">Start Time:</span> {selectedZone.schedule.startTime}</p>
                  <p><span className="font-medium">Duration:</span> {selectedZone.schedule.duration} min</p>
                </>
              )}
              <p><span className="font-medium">Heads Count:</span> {selectedZone.heads.length}</p>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}; 