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

type UseExitsProps = {
  date?: Date;
  search: string;
  createdAtSort: 'ASC' | 'DESC';
};

export const useExits = ({ date, search, createdAtSort }: UseExitsProps) => {
  const [data, setData] = useState<Exit[]>([]);
  const [options, setOptions] = useState<FindExitOptions>({});

  useEffect(() => {
    const newOptions = { ...options };
    if (date) {
      newOptions.filter = {
        ...options.filter,
        createdAt: {
          lower: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          upper: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
        },
      };
    } else {
      newOptions.filter = {
        ...options.filter,
        createdAt: undefined,
      };
    }
    setOptions(newOptions);
  }, [date]);

  useEffect(() => {
    const newOptions = { ...options };
    if (search) {
      newOptions.filter = {
        ...options.filter,
        property: `%${search}%`,
        type: `%${search}%`,
        plantCount: `%${search}%`,
      };
    } else {
      newOptions.filter = {
        ...options.filter,
        property: undefined,
        type: undefined,
        plantCount: undefined,
      };
    }
    setOptions(newOptions);
  }, [search]);

  useEffect(() => {
    const newOptions = { ...options };
    newOptions.sorting = {
      ...newOptions.sorting,
      createdAt: createdAtSort,
    };
    setOptions(newOptions);
  }, [createdAtSort]);

  useFocusEffect(
    useCallback(() => {
      findExits(options).then((value) => setData(value));
    }, [options])
  );

  return {
    data,
  };
};
