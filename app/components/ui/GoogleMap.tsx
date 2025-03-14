"use client";

import { useState, useCallback, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Polygon, Circle, DrawingManager } from "@react-google-maps/api";
import type { Libraries } from "@react-google-maps/api";

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

// Libraries to load with the Google Maps API
const libraries: Libraries = ["places", "drawing", "geometry"];

interface MapLocation {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  description?: string;
  icon?: string;
}

interface PropertyBoundary {
  paths: google.maps.LatLngLiteral[];
  options?: google.maps.PolygonOptions;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface EmployeeZone {
  id: string;
  name: string;
  employeeId: string;
  color: string;
  paths: LatLng[];
}

interface GoogleMapComponentProps {
  apiKey?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  locations?: MapLocation[];
  boundaries?: PropertyBoundary[];
  className?: string;
  enableDrawing?: boolean;
  showCurrentLocation?: boolean;
  showIrrigationLayer?: boolean;
  propertyId?: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onBoundaryComplete?: (path: google.maps.LatLngLiteral[]) => void;
  employeeZones?: EmployeeZone[];
  drawingMode?: boolean;
  onPolygonComplete?: (polygon: google.maps.Polygon) => void;
  selectedZone?: string | null;
  onZoneSelect?: (zoneId: string | null) => void;
  editable?: boolean;
}

// Import IrrigationMapLayer component
import { IrrigationMapLayer } from "./IrrigationMapLayer";

// Define an interface for the ref
interface GoogleMapRef {
  getMap: () => google.maps.Map | null;
}

export const GoogleMapComponent = forwardRef<GoogleMapRef, GoogleMapComponentProps>(({
  apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  center = defaultCenter,
  zoom = 12,
  locations = [],
  boundaries = [],
  className = "",
  enableDrawing = false,
  showCurrentLocation = false,
  showIrrigationLayer = false,
  propertyId,
  onClick,
  onBoundaryComplete,
  employeeZones = [],
  drawingMode = false,
  onPolygonComplete,
  selectedZone = null,
  onZoneSelect,
  editable = false
}, ref) => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  // Always use satellite view as default
  const [mapType] = useState<string>('satellite');
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [isUserLocationLoading, setIsUserLocationLoading] = useState(false);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const mapRef = useRef<google.maps.Map | null>(null);
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ['drawing'],
  });

  // Always try to get user's current location when the map is loaded
  useEffect(() => {
    if (isLoaded && !userLocation) {
      setIsUserLocationLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation(pos);
            
            // If no specific center was provided, use user location
            if (!center || (center.lat === defaultCenter.lat && center.lng === defaultCenter.lng)) {
              if (mapRef.current) {
                mapRef.current.panTo(pos);
              }
            }
            
            setIsUserLocationLoading(false);
          },
          (error) => {
            console.error("Error getting current location:", error);
            setIsUserLocationLoading(false);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setIsUserLocationLoading(false);
      }
    }
  }, [isLoaded, userLocation, center]);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    setSelectedLocation(null);
    if (onClick && e.latLng) {
      onClick(e);
    }
  }, [onClick]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMapInstance(map);
  }, []);

  const onDrawingManagerLoad = useCallback((drawingManager: google.maps.drawing.DrawingManager) => {
    drawingManagerRef.current = drawingManager;
  }, []);

  const handlePolygonComplete = useCallback((polygon: google.maps.Polygon) => {
    if (onBoundaryComplete) {
      const path = polygon.getPath();
      const pathArray: google.maps.LatLngLiteral[] = [];
      
      for (let i = 0; i < path.getLength(); i++) {
        const point = path.getAt(i);
        pathArray.push({ lat: point.lat(), lng: point.lng() });
      }
      
      onBoundaryComplete(pathArray);
      
      // Optionally remove the drawn polygon after capturing the path
      polygon.setMap(null);
    }
  }, [onBoundaryComplete]);

  const centerOnUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.panTo(userLocation);
      mapRef.current.setZoom(16);
    } else if (!userLocation && navigator.geolocation) {
      setIsUserLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(pos);
          if (mapRef.current) {
            mapRef.current.panTo(pos);
            mapRef.current.setZoom(16);
          }
          setIsUserLocationLoading(false);
        },
        (error) => {
          console.error("Error getting current location:", error);
          setIsUserLocationLoading(false);
        }
      );
    }
  };
  
  // Toggle full screen mode for the map
  const toggleFullScreen = () => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) return;
    
    try {
      if (!isFullScreen) {
        // Enter full screen with browser compatibility
        if (mapContainer.requestFullscreen) {
          void mapContainer.requestFullscreen();
        } else {
          // Use specific browser prefixed methods with suppressed TypeScript errors
          /* eslint-disable @typescript-eslint/no-explicit-any */
          const element = mapContainer as { 
            webkitRequestFullscreen?: () => Promise<void>;
            mozRequestFullscreen?: () => Promise<void>;
            msRequestFullscreen?: () => Promise<void>;
          };
          
          if (element.webkitRequestFullscreen) {
            void element.webkitRequestFullscreen();
          } else if (element.mozRequestFullscreen) {
            void element.mozRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            void element.msRequestFullscreen();
          }
          /* eslint-enable @typescript-eslint/no-explicit-any */
        }
      } else {
        // Exit full screen with browser compatibility
        if (document.exitFullscreen) {
          void document.exitFullscreen();
        } else {
          // Use specific browser prefixed methods with suppressed TypeScript errors
          /* eslint-disable @typescript-eslint/no-explicit-any */
          const doc = document as {
            webkitExitFullscreen?: () => Promise<void>;
            mozExitFullscreen?: () => Promise<void>;
            msExitFullscreen?: () => Promise<void>;
          };
          
          if (doc.webkitExitFullscreen) {
            void doc.webkitExitFullscreen();
          } else if (doc.mozExitFullscreen) {
            void doc.mozExitFullscreen();
          } else if (doc.msExitFullscreen) {
            void doc.msExitFullscreen();
          }
          /* eslint-enable @typescript-eslint/no-explicit-any */
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen mode:', error);
    }
  };
  
  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      // Check for fullscreen state with browser compatibility
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const isDocFullscreen = 
        document.fullscreenElement ||
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
        (document as Document & { mozFullscreenElement?: Element }).mozFullscreenElement ||
        (document as Document & { msFullscreenElement?: Element }).msFullscreenElement;
      /* eslint-enable @typescript-eslint/no-explicit-any */
        
      setIsFullScreen(!!isDocFullscreen);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Expose map instance to parent component
  useImperativeHandle(ref, () => ({
    getMap: () => mapRef.current,
  }));

  // Add this function to handle zone hover effects
  const getEmployeeNameById = (employeeId: string): string => {
    // In a real app, this would fetch from your employee data
    const employeeNames: Record<string, string> = {
      'emp-001': 'Sarah Johnson',
      'emp-002': 'Michael Williams',
      'emp-003': 'David Martinez',
      'emp-004': 'Jennifer Brown',
    };
    return employeeNames[employeeId] || 'Unassigned';
  };

  // Initialize drawing manager when drawing mode changes
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    
    if (drawingMode && editable) {
      // Initialize drawing manager if not already done
      if (!drawingManagerRef.current) {
        const drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: false,
          polygonOptions: {
            fillColor: '#4299E1',
            fillOpacity: 0.3,
            strokeWeight: 2,
            strokeColor: '#3182CE',
            editable: false,
            draggable: false,
          },
        });
        
        // Add polygon complete listener
        if (onPolygonComplete) {
          google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon: google.maps.Polygon) => {
            // Call the callback with the completed polygon
            onPolygonComplete(polygon);
            
            // Remove the polygon from the map since we'll create our own
            polygon.setMap(null);
            
            // Reset drawing mode
            drawingManager.setDrawingMode(null);
          });
        }
        
        drawingManagerRef.current = drawingManager;
      }
      
      // Set drawing mode and attach to map
      drawingManagerRef.current.setMap(mapRef.current);
      drawingManagerRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    } else if (drawingManagerRef.current) {
      // Disable drawing mode
      drawingManagerRef.current.setMap(null);
    }
    
    return () => {
      // Cleanup drawing manager on unmount
      if (drawingManagerRef.current) {
        drawingManagerRef.current.setMap(null);
      }
    };
  }, [drawingMode, isLoaded, onPolygonComplete, editable]);

  // Add this helper function inside the GoogleMapComponent
  const calculateZoneCenter = (paths: LatLng[]): LatLng => {
    if (!paths || paths.length === 0) return { lat: 0, lng: 0 };
    
    // Calculate the center point of all polygon coordinates
    const latSum = paths.reduce((sum, point) => sum + point.lat, 0);
    const lngSum = paths.reduce((sum, point) => sum + point.lng, 0);
    
    return {
      lat: latSum / paths.length,
      lng: lngSum / paths.length
    };
  };

  if (loadError) {
    return (
      <div className={`bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center ${className}`} style={containerStyle}>
        <p className="text-red-500">Error loading Google Maps</p>
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
    <div className={`${className} relative`} style={{ height: "100%" }} ref={mapContainerRef}>
      {/* Add custom CSS to hide Google branding and copyright */}
      <style jsx>{`
        /* Hide Google logo */
        :global(.gm-style .gmnoprint),
        :global(.gm-style .gm-style-cc),
        :global(.gm-style-pbc),
        :global(.gm-style a[href^="https://maps.google.com"]),
        :global(.gm-style a[target="_blank"]),
        :global(.gm-style-cc) {
          display: none !important;
        }
        
        /* Hide Google Maps text and attribution */
        :global(.gmnoprint),
        :global(.gm-style-cc) {
          display: none !important;
        }
        
        /* Hide 'Map Data' and other text */
        :global(.gm-style > div:last-child) {
          display: none !important;
        }
        
        /* Additional selector to target the copyright text */
        :global(.gm-style-cc > div) {
          display: none !important;
        }
      `}</style>
      
      {/* Custom Controls Group - Top Right */}
      <div className="absolute top-2 right-2 z-10 flex space-x-2">
        {/* Custom Full Screen Button */}
        <button
          type="button"
          className="p-2 bg-white dark:bg-neutral-800 rounded-md shadow-md text-primary-600 dark:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          onClick={toggleFullScreen}
          aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
        >
          {isFullScreen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <title>Exit full screen</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <title>Enter full screen</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          )}
        </button>
        
        {/* Current Location Button */}
        {showCurrentLocation && (
          <button
            type="button"
            className="p-2 bg-white dark:bg-neutral-800 rounded-md shadow-md text-primary-600 dark:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            onClick={centerOnUserLocation}
            disabled={isUserLocationLoading}
            aria-label="Center on my location"
          >
            {isUserLocationLoading ? (
              <span className="w-5 h-5 block border-2 border-primary-600 dark:border-primary-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <title>My location</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        )}
        
        {/* Custom Zoom Controls */}
        <div className="flex flex-col space-y-1">
          <button
            type="button"
            className="p-2 bg-white dark:bg-neutral-800 rounded-t-md shadow-md text-primary-600 dark:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            onClick={() => mapRef.current?.setZoom((mapRef.current?.getZoom() || 0) + 1)}
            aria-label="Zoom in"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <title>Zoom in</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button
            type="button"
            className="p-2 bg-white dark:bg-neutral-800 rounded-b-md shadow-md text-primary-600 dark:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            onClick={() => mapRef.current?.setZoom((mapRef.current?.getZoom() || 0) - 1)}
            aria-label="Zoom out"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <title>Zoom out</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
          </button>
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onClick={onMapClick}
        onLoad={onMapLoad}
        options={{
          mapTypeId: "satellite",
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false, // Disable default fullscreen control
          zoomControl: false, // Disable default zoom control
          rotateControl: false,
          scaleControl: false, // Disable scale control
          panControl: false, // Disable pan control
          scrollwheel: true, // Allow zoom with mouse wheel
          disableDefaultUI: true, // Disable all default UI
          keyboardShortcuts: false, // Disable keyboard shortcuts
          styles: [
            {
              featureType: "all",
              elementType: "labels",
              stylers: [
                { visibility: "off" } // Hide all labels
              ]
            },
            {
              featureType: "administrative",
              elementType: "labels",
              stylers: [
                { visibility: "off" } // Hide administrative labels
              ]
            },
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [
                { visibility: "off" } // Hide point of interest labels
              ]
            },
            {
              featureType: "water",
              elementType: "labels",
              stylers: [
                { visibility: "off" } // Hide water labels
              ]
            },
            {
              featureType: "road",
              elementType: "labels",
              stylers: [
                { visibility: "off" } // Hide road labels
              ]
            },
            // Additional styling to hide copyright text and attribution
            {
              featureType: "all",
              elementType: "labels.text",
              stylers: [
                { visibility: "off" }
              ]
            }
          ]
        }}
      >
        {/* Property boundaries */}
        {boundaries.map((boundary, index) => (
          <Polygon
            key={`boundary-${boundary.paths[0]?.lat || ''}-${boundary.paths[0]?.lng || ''}-${index}`}
            paths={boundary.paths}
            options={{
              fillColor: "#4CAF50",
              fillOpacity: 0.2,
              strokeColor: "#4CAF50",
              strokeOpacity: 1,
              strokeWeight: 2,
              ...boundary.options,
            }}
          />
        ))}

        {/* Location markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            title={location.title}
            onClick={() => setSelectedLocation(location)}
            icon={location.icon}
          />
        ))}

        {/* User's current location */}
        {userLocation && (
          <Circle
            center={userLocation}
            radius={50}
            options={{
              fillColor: "#4285F4",
              fillOpacity: 0.3,
              strokeColor: "#4285F4",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        )}

        {/* Add Irrigation Layer when enabled and propertyId is provided */}
        {showIrrigationLayer && propertyId && (
          <IrrigationMapLayer 
            propertyId={propertyId} 
            visible={showIrrigationLayer}
          />
        )}

        {/* Drawing manager for property boundaries */}
        {enableDrawing && isLoaded && (
          <DrawingManager
            onLoad={onDrawingManagerLoad}
            onPolygonComplete={handlePolygonComplete}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                position: window.google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                  window.google.maps.drawing.OverlayType.POLYGON,
                ],
              },
              polygonOptions: {
                fillColor: "#4CAF50",
                fillOpacity: 0.2,
                strokeColor: "#4CAF50",
                strokeOpacity: 1,
                strokeWeight: 2,
                clickable: true,
                editable: true,
                draggable: true,
                zIndex: 1,
              },
            }}
          />
        )}

        {/* Info window for selected location */}
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

        {/* Employee Zones */}
        {employeeZones.map((zone) => {
          // Pre-calculate the center of the zone
          const zoneCenter = calculateZoneCenter(zone.paths);
          
          return (
            <Polygon
              key={zone.id}
              paths={zone.paths}
              options={{
                fillColor: zone.color,
                fillOpacity: selectedZone === zone.id ? 0.6 : 0.3,
                strokeColor: zone.color,
                strokeWeight: selectedZone === zone.id ? 3 : 2,
                clickable: true,
                zIndex: selectedZone === zone.id ? 2 : 1,
              }}
              onClick={() => onZoneSelect?.( zone.id)}
              onMouseOver={() => setSelectedLocation({
                id: zone.id,
                position: zoneCenter,
                title: zone.name,
                description: `Assigned to: ${getEmployeeNameById(zone.employeeId)}`
              })}
              onMouseOut={() => setSelectedLocation(null)}
            />
          );
        })}
        
        {/* Info Window for hovered zone */}
        {selectedLocation && (
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div className="p-2">
              <h3 className="font-medium">{selectedLocation.title}</h3>
              {selectedLocation.description && (
                <p className="text-xs mt-1">{selectedLocation.description}</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
});
