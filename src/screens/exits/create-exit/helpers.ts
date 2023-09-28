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
      property: '',
      type: '',
      plantCount: '',
      notes: '',
      imageUri: '',
    },
  };
};

export const validateForm = (property: string, items: Item[]) => {
  if (!property) return false;
  return items.every(({ exit }) => exit.type && exit.plantCount && exit.notes && exit.imageUri);
};

export const saveItems = async (property: string, items: Item[]) => {
  await createExits(
    items.map((item): Exit => {
      const nowTime = new Date().getTime();
      return {
        id: item.id,
        createdAt: nowTime,
        updatedAt: nowTime,
        createdBy: '[Usuario]',
        updatedBy: '[Usuario]',
        property,
        type: item.exit.type,
        plantCount: item.exit.plantCount,
        notes: item.exit.notes,
        imageUri: item.exit.imageUri,
      };
    })
  );
};
