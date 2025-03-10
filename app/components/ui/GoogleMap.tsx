"use client";

import { useState, useCallback } from "react";
import type { FC } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "400px",
  borderRadius: "0.5rem"
};

// Default center - can be overridden by props
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194 // San Francisco
};

interface MapLocation {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  description?: string;
}

interface GoogleMapComponentProps {
  apiKey?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  locations?: MapLocation[];
  className?: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
}

export const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  center = defaultCenter,
  zoom = 12,
  locations = [],
  className = "",
  onClick
}) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey
  });

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    setSelectedLocation(null);
    if (onClick && e.latLng) {
      onClick(e);
    }
  }, [onClick]);

  if (loadError) {
    return (
      <div className={`bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center ${className}`} style={containerStyle}>
        <p className="text-error">Error loading Google Maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center ${className}`} style={containerStyle}>
        <p className="text-neutral-500 dark:text-neutral-400">Loading map...</p>
      </div>
    );
  }

  return (
    <div className={className} style={{ height: "100%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onClick={onMapClick}
        options={{
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            title={location.title}
            onClick={() => setSelectedLocation(location)}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="p-2">
              <h3 className="font-medium text-sm">{selectedLocation.title}</h3>
              {selectedLocation.description && (
                <p className="text-xs mt-1">{selectedLocation.description}</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}; 