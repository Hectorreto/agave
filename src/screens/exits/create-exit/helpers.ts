import uuid from 'react-native-uuid';

import { createExits, Exit } from '../../../services/exitService';

export type Item = {
  id: string;
  cnt: number;
  exit: Exit;
};

export const newItem = (cnt: number): Item => {
  return {
    id: uuid.v4() as string,
    cnt,
    exit: {
      id: '',
      createdAt: 0,
      updatedAt: 0,
      createdBy: '',
      updatedBy: '',
      type: '',
      plantCount: '',
      notes: '',
      imageUri: '',
      latitude: 0,
      longitude: 0,
      propertyId: '',
    },
  };
};

export const validateForm = (propertyId: string, items: Item[]) => {
  if (!propertyId) return false;
  return items.every(({ exit }) => exit.type && exit.plantCount && exit.notes && exit.imageUri);
};

export const saveItems = async (propertyId: string, items: Item[]) => {
  await createExits(
    items.map((item): Exit => {
      const nowTime = new Date().getTime();
      return {
        id: item.id,
        createdAt: nowTime,
        updatedAt: nowTime,
        createdBy: '[Usuario]',
        updatedBy: '[Usuario]',
        type: item.exit.type,
        plantCount: item.exit.plantCount,
        notes: item.exit.notes,
        imageUri: item.exit.imageUri,
        latitude: item.exit.latitude,
        longitude: item.exit.longitude,
        propertyId,
      };
    })
  );
};
