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
const IMAGE_MAX_SIZE = 300;

type Props = {
  value: string;
  onChange?: (imageUri: string, latitude: number, longitude: number) => void;
};

const InputCamera = ({ value, onChange }: Props) => {
  const [height, setHeight] = useState(IMAGE_MAX_SIZE);
  const [width, setWidth] = useState(IMAGE_MAX_SIZE);
  const [loadingCamera, setLoadingCamera] = useState(false);

  useEffect(() => {
    if (value) {
      Image.getSize(value, (width, height) => {
        const scale = IMAGE_MAX_SIZE / Math.max(width, height);
        setHeight(height * scale);
        setWidth(width * scale);
      });
    } else {
      setHeight(IMAGE_MAX_SIZE);
      setWidth(IMAGE_MAX_SIZE);
    }
  }, [value]);

  const handleCameraPermissions = async () => {
    let permissions = await getCameraPermissionsAsync();
    if (permissions.status !== 'granted') {
      try {
        permissions = await requestCameraPermissionsAsync();
      } catch (error) {
        console.error(error);
        if (!permissions.canAskAgain) {
          if (Platform.OS === 'android') {
            await Linking.openSettings();
          }
          if (Platform.OS === 'ios') {
            await Linking.openURL('app-settings:');
          }
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
      try {
        permissions = await requestForegroundPermissionsAsync();
      } catch (error) {
        console.error(error);
        if (!permissions.canAskAgain) {
          if (Platform.OS === 'android') {
            await Linking.openSettings();
          }
          if (Platform.OS === 'ios') {
            await Linking.openURL('app-settings:');
          }
        }
      }
    }

    if (permissions.status !== 'granted') {
      throw new Error('Location permissions not granted');
    }
  };

  const handleOnPress = () => {
    if (!onChange) return;
    if (loadingCamera) return;

    return async () => {
      try {
        setLoadingCamera(true);
        await handleCameraPermissions();
        await handleLocationPermissions();
        const location = await getCurrentPositionAsync();
        const result = await launchCameraAsync();
        if (!result.canceled) {
          onChange(result.assets[0].uri, location.coords.latitude, location.coords.longitude);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCamera(false);
      }
    };
  };

  return (
    <View style={{ gap: 10 }}>
      <View style={{ alignItems: 'flex-start' }}>
        <CustomButton
          color="blue"
          text={value ? 'Cambiar foto' : 'Subir foto'}
          Icon={CameraAlt}
          onPress={handleOnPress()}
        />
      </View>
      {Boolean(value && height && width) && (
        <Image source={{ uri: value }} height={height} width={width} />
      )}
    </View>
  );
};

export default InputCamera;
