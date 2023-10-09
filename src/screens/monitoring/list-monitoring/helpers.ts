import { createRef, RefObject, useEffect, useRef, useState } from 'react';
import MapView, { MapMarker } from 'react-native-maps';

import { Monitoring } from '../../../services/monitoringService';

export const useMapData = (data: Monitoring[]) => {
  const mapRef = useRef<MapView>(null);
  const [markerRefs, setMarkerRefs] = useState<Map<string, RefObject<MapMarker>>>(new Map());

  const moveMapToMonitoring = (monitoring: Monitoring) => {
    mapRef.current?.animateToRegion({
      latitude: monitoring.latitude,
      longitude: monitoring.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
    markerRefs.get(monitoring.id)?.current?.showCallout();
  };

  useEffect(() => {
    const refs = data.map((monitoring): [string, RefObject<MapMarker>] => {
      return [monitoring.id, createRef<MapMarker>()];
    });
    setMarkerRefs(new Map(refs));
  }, [data]);

  useEffect(() => {
    const lastMonitoring = data[0];
    if (lastMonitoring) {
      moveMapToMonitoring(lastMonitoring);
    }
  }, [markerRefs]);

  return {
    mapRef,
    markerRefs,
    moveMapToMonitoring,
  };
};
