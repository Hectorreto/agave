import { useFocusEffect } from '@react-navigation/native';
import { createRef, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import MapView, { MapMarker } from 'react-native-maps';

import { Exit, findExits } from '../../../services/exitService';

export const GUADALAJARA_REGION = {
  latitude: 20.67622305129026,
  longitude: -103.34720767164721,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const useMapData = () => {
  const mapRef = useRef<MapView>(null);
  const [markerRefs, setMarkerRefs] = useState<Map<string, RefObject<MapMarker>>>(new Map());
  const [data, setData] = useState<Exit[]>([]);

  useFocusEffect(
    useCallback(() => {
      findExits().then(setData);
    }, [])
  );

  const moveMapToExit = (exit: Exit) => {
    mapRef.current?.animateToRegion({
      latitude: exit.latitude,
      longitude: exit.longitude,
      latitudeDelta: 0.05,
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

export const useTableData = (data: Exit[], search: string) => {
  const [filteredData, setFilteredData] = useState<Exit[]>([]);

  useEffect(() => {
    setFilteredData(
      data.filter((value) => {
        if (search) {
          const searchL = search.toLowerCase();
          return (
            value.property.toLowerCase().includes(searchL) ||
            value.type.toLowerCase().includes(searchL) ||
            value.plantCount.toLowerCase().includes(searchL)
          );
        }
        return true;
      })
    );
  }, [data, search]);

  return {
    filteredData,
  };
};
