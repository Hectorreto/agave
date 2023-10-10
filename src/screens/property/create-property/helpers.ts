import uuid from 'react-native-uuid';

import { Property } from '../../../services/propertyService';

export const newProperty = (): Property => {
  return {
    id: uuid.v4() as string,
    createdAt: 0,
    updatedAt: 0,
    createdBy: '[Usuario]',
    updatedBy: '[Usuario]',
    name: '',
    plantingYear: 0,
    cropType: '',
    location: '',
    hectareNumber: '',
    plantsPlantedNumber: '',
    invoice: '',
    registry: '',
    internalIdentifier: '',
    boardsPerProperty: '',
    active: 0,
  };
};

export const validateForm = (property: Property, plantingYear?: Date) => {
  return (
    property.name &&
    plantingYear &&
    property.cropType &&
    property.location &&
    property.hectareNumber &&
    property.plantsPlantedNumber &&
    property.invoice &&
    property.registry &&
    property.internalIdentifier &&
    property.boardsPerProperty
  );
};
