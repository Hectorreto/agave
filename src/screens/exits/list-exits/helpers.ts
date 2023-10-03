import { useFocusEffect } from '@react-navigation/native';
import { createRef, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import MapView, { MapMarker } from 'react-native-maps';

import { Exit, FindExitOptions, findExits } from '../../../services/exitService';

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

export const useExits = (date?: Date) => {
  const [data, setData] = useState<Exit[]>([]);
  const [options, setOptions] = useState<FindExitOptions>({});

  useEffect(() => {
    if (!date && options.filter?.createdAt) {
      const newOptions = { ...options };
      newOptions.filter = { ...options.filter };
      newOptions.filter.createdAt = undefined;
      setOptions(newOptions);
    }
    if (date) {
      const newOptions = { ...options };
      if (!newOptions.filter) newOptions.filter = {};
      newOptions.filter.createdAt = {
        lower: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        upper: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      };
      setOptions(newOptions);
    }
  }, [date]);

  useFocusEffect(
    useCallback(() => {
      findExits(options).then((value) => setData(value));
    }, [options])
  );

  return {
    data,
  };
};
