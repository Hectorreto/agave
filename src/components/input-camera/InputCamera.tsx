import {
  getCameraPermissionsAsync,
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import {
  getCurrentPositionAsync,
  getForegroundPermissionsAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location';
import { useEffect, useState } from 'react';
import { Image, Linking, Platform, View } from 'react-native';

import CameraAlt from '../../../assets/svg/camera_alt.svg';
import CustomButton from '../custom-button/CustomButton';

type Props = {
  value: string;
  onChange?: (imageUri: string, latitude: number, longitude: number) => void;
};

const InputCamera = ({ value, onChange }: Props) => {
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);

  useEffect(() => {
    if (value) {
      Image.getSize(value, (width, height) => {
        const scale = 100 / Math.max(width, height);
        setHeight(height * scale);
        setWidth(width * scale);
      });
    } else {
      setHeight(100);
      setWidth(100);
    }
  }, [value]);

  const handleCameraPermissions = async () => {
    let permissions = await getCameraPermissionsAsync();
    if (permissions.status !== 'granted') {
      if (permissions.canAskAgain) {
        permissions = await requestCameraPermissionsAsync();
      } else {
        if (Platform.OS === 'android') {
          await Linking.openSettings();
        }
        if (Platform.OS === 'ios') {
          await Linking.openURL('app-settings:');
        }
      }
    }

    if (permissions.status !== 'granted') {
      throw new Error('Camera permissions not granted');
    }
  };

  const handleLocationPermissions = async () => {
    let permissions = await getForegroundPermissionsAsync();
    if (permissions.status !== 'granted') {
      if (permissions.canAskAgain) {
        permissions = await requestForegroundPermissionsAsync();
      } else {
        if (Platform.OS === 'android') {
          await Linking.openSettings();
        }
        if (Platform.OS === 'ios') {
          await Linking.openURL('app-settings:');
        }
      }
    }

    if (permissions.status !== 'granted') {
      throw new Error('Location permissions not granted');
    }
  };

  const handleOnPress = () => {
    if (!onChange) return undefined;

    return async () => {
      try {
        await handleCameraPermissions();
        await handleLocationPermissions();
        const result = await launchCameraAsync();
        if (!result.canceled) {
          const location = await getCurrentPositionAsync();
          onChange(result.assets[0].uri, location.coords.latitude, location.coords.longitude);
        }
      } catch (error) {
        console.error(error);
      }
    };
  };

  return (
    <View style={{ gap: 10 }}>
      <CustomButton
        color="blue"
        text={value ? 'Cambiar foto' : 'Subir foto'}
        Icon={CameraAlt}
        onPress={handleOnPress()}
      />
      {Boolean(value && height && width) && (
        <Image source={{ uri: value }} height={height} width={width} />
      )}
    </View>
  );
};

export default InputCamera;
