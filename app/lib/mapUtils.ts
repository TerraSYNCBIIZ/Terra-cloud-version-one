"use client";

import { useEffect, useState, useCallback } from 'react';

/**
 * Interface for geocoding results
 */
export interface GeocodingResult {
  location: {
    lat: number;
    lng: number;
  };
  formatted_address: string;
  place_id: string;
}

/**
 * Interface for place search results
 */
export interface PlaceSearchResult {
  name: string;
  vicinity: string;
  place_id: string;
  location: {
    lat: number;
    lng: number;
  };
  types: string[];
  rating?: number;
}

/**
 * Interface for distance matrix results
 */
export interface DistanceMatrixResult {
  origins: string[];
  destinations: string[];
  distances: {
    text: string;
    value: number;
  }[][];
  durations: {
    text: string;
    value: number;
  }[][];
}

/**
 * Interface for place details
 */
export interface PlaceDetails {
  name: string;
  formatted_address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone_number?: string;
  website?: string;
  rating?: number;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time: number;
  }>;
  opening_hours?: {
    open_now: boolean;
    periods: Array<{
      open: { day: number; time: string };
      close: { day: number; time: string };
    }>;
    weekday_text: string[];
  };
}

/**
 * Geocode an address to get coordinates
 * Uses the MCP server when available, falls back to Google Maps API
 */
export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  try {
    // Check if we're in a browser environment with window access
    if (typeof window !== 'undefined') {
      // Attempt to use Claude MCP (when this is called from Claude)
      try {
        const response = await fetch('/api/mcp/maps_geocode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address }),
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.log('MCP not available, falling back to Google Maps API');
      }

      // Fallback to Google Maps API if MCP is not available
      if (window.google?.maps?.Geocoder) {
        const geocoder = new window.google.maps.Geocoder();
        return new Promise((resolve) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
              const result = results[0];
              resolve({
                location: {
                  lat: result.geometry.location.lat(),
                  lng: result.geometry.location.lng(),
                },
                formatted_address: result.formatted_address,
                place_id: result.place_id,
              });
            } else {
              resolve(null);
            }
          });
        });
      }
    }
    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}

/**
 * Search for places near a location
 */
export async function searchNearbyPlaces(
  query: string,
  location: { lat: number; lng: number },
  radius: number = 5000
) {
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Attempt to use Claude MCP
      try {
        const response = await fetch('/api/mcp/maps_search_places', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, location, radius }),
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.log('MCP not available, falling back to Google Maps API');
      }

      // Fallback to Google Maps Places API
      if (window.google?.maps?.places) {
        // Implementation would depend on how Places API is set up
        // This is a placeholder
        console.log('Using Google Maps Places API directly');
      }
    }
    return [];
  } catch (error) {
    console.error('Error searching places:', error);
    return [];
  }
}

/**
 * Get detailed information about a place by its place_id
 */
export async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  try {
    // Attempt to use Claude MCP
    try {
      const response = await fetch('/api/mcp/maps_place_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ place_id: placeId }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('MCP not available, falling back to Google Maps API');
    }

    // Fallback to Google Maps Places API
    if (typeof window !== 'undefined' && window.google?.maps?.places) {
      // Implementation would depend on how Places API is set up
    }
    return null;
  } catch (error) {
    console.error('Error getting place details:', error);
    return null;
  }
}

/**
 * Calculate distance and duration between origins and destinations
 */
export async function calculateDistanceMatrix(
  origins: string[],
  destinations: string[],
  mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving'
): Promise<DistanceMatrixResult | null> {
  try {
    // Attempt to use Claude MCP
    try {
      const response = await fetch('/api/mcp/maps_distance_matrix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ origins, destinations, mode }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('MCP not available, falling back to Google Maps API');
    }

    return null;
  } catch (error) {
    console.error('Error calculating distance matrix:', error);
    return null;
  }
}

/**
 * Hook for getting the current user location
 */
export function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
        setIsLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return { currentLocation, isLoading, error, refreshLocation: getCurrentLocation };
}
