import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, Linking, Platform, TouchableHighlight, View } from 'react-native';

import CameraAlt from '../../../assets/svg/camera_alt.svg';
import { shadowStyle } from '../../themes/theme';
import CustomButton from '../custom-button/CustomButton';

type Props = {
  value: string;
  onChange?: (imageUri: string) => void;
};

const InputImage = ({ value, onChange }: Props) => {
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

  const handleOnPress = (type: 'camera' | 'library') => {
    if (!onChange) return undefined;

    const launchImagePicker =
      type === 'camera' ? ImagePicker.launchCameraAsync : ImagePicker.launchImageLibraryAsync;
    const getPermissions =
      type === 'camera'
        ? ImagePicker.getCameraPermissionsAsync
        : ImagePicker.getMediaLibraryPermissionsAsync;
    const requestPermissions =
      type === 'camera'
        ? ImagePicker.requestCameraPermissionsAsync
        : ImagePicker.requestMediaLibraryPermissionsAsync;

    return async () => {
      let permissions = await getPermissions();
      if (permissions.status !== 'granted') {
        if (permissions.canAskAgain) {
          permissions = await requestPermissions();
        } else {
          if (Platform.OS === 'android') {
            await Linking.openSettings();
          }
          if (Platform.OS === 'ios') {
            await Linking.openURL('app-settings:');
          }
        }
      }

      if (permissions.status === 'granted') {
        const result = await launchImagePicker();
        if (!result.canceled) {
          onChange(result.assets[0].uri);
        }
      }
    };
  };

  return (
    <View style={{ gap: 10 }}>
      <CustomButton
        color="blue"
        text={value ? 'Cambiar foto' : 'Subir foto'}
        Icon={CameraAlt}
        onPress={handleOnPress('camera')}
        onLongPress={handleOnPress('library')}
      />
      {Boolean(value && height && width) && (
        <TouchableHighlight
          onPress={handleOnPress('library')}
          style={{
            ...shadowStyle,
            height,
            width,
          }}>
          <Image source={{ uri: value }} height={height} width={width} />
        </TouchableHighlight>
      )}
    </View>
  );
};

export default InputImage;
