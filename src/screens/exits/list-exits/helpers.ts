import { createRef, RefObject, useEffect, useRef, useState } from 'react';
import MapView, { MapMarker } from 'react-native-maps';

import { Exit } from '../../../services/exitService';

export const GUADALAJARA_REGION = {
  latitude: 20.67622305129026,
  longitude: -103.34720767164721,
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
};

export const useMapData = (data: Exit[]) => {
  const mapRef = useRef<MapView>(null);
  const [markerRefs, setMarkerRefs] = useState<Map<string, RefObject<MapMarker>>>(new Map());

  const moveMapToExit = (exit: Exit) => {
    mapRef.current?.animateToRegion({
      latitude: exit.latitude,
      longitude: exit.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    });
    markerRefs.get(exit.id)?.current?.showCallout();
  };

  useEffect(() => {
    const refs = data.map((exit): [string, RefObject<MapMarker>] => {
      return [exit.id, createRef<MapMarker>()];
    });
    setMarkerRefs(new Map(refs));
  }, [data]);

  useEffect(() => {
    const lastExit = data[0];
    if (lastExit) {
      moveMapToExit(lastExit);
      markerRefs.get(lastExit.id)?.current?.showCallout();
    }
  }, [markerRefs]);

  return {
    data,
    mapRef,
    markerRefs,
    moveMapToExit,
  };
};
