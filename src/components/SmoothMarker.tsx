import React, { useEffect, useRef } from 'react';
import { Marker, MarkerProps } from 'react-leaflet';
import L from 'leaflet';
import * as turf from '@turf/turf';
import 'leaflet-rotatedmarker';

const SmoothMarker: React.FC<MarkerProps> = (props) => {
  const markerRef = useRef<L.Marker>(null);
  const { position } = props;

  useEffect(() => {
    const marker = markerRef.current;
    if (marker && position) {
      const newLatLng = L.latLng(position);
      const currentLatLng = marker.getLatLng();
      
      if (!currentLatLng.equals(newLatLng)) {
        // Calculate bearing for rotation
        const fromPoint = turf.point([currentLatLng.lng, currentLatLng.lat]);
        const toPoint = turf.point([newLatLng.lng, newLatLng.lat]);
        const bearing = turf.bearing(fromPoint, toPoint);
        
        // Set rotation on the marker instance
        if (typeof (marker as any).setRotationAngle === 'function') {
            (marker as any).setRotationAngle(bearing);
        }

        // Animate position
        const duration = 1000; // 1-second animation
        const startTime = performance.now();
        const startLatLng = marker.getLatLng();

        const animateMarker = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const interpolatedLatLng = L.latLng(
            startLatLng.lat + (newLatLng.lat - startLatLng.lat) * progress,
            startLatLng.lng + (newLatLng.lng - startLatLng.lng) * progress
          );

          marker.setLatLng(interpolatedLatLng);

          if (progress < 1) {
            requestAnimationFrame(animateMarker);
          }
        };
        requestAnimationFrame(animateMarker);
      }
    }
  }, [position]);

  return <Marker ref={markerRef} {...props} />;
};

export default SmoothMarker;