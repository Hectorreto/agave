import {
  getCameraPermissionsAsync,
  launchCameraAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import { useState } from 'react';
import { Linking, Platform, View } from 'react-native';

import CameraAlt from '../../../assets/svg/camera_alt.svg';
import CustomButton from '../custom-button/CustomButton';

type Props = {
  value: string;
  onChange?: (videoUri: string) => void;
  text: string;
};

const InputCameraVideo = ({ onChange, text }: Props) => {
  const [loadingCamera, setLoadingCamera] = useState(false);

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

  const handleOnPress = () => {
    if (!onChange) return;
    if (loadingCamera) return;

    return async () => {
      try {
        setLoadingCamera(true);
        await handleCameraPermissions();
        const result = await launchCameraAsync({ mediaTypes: MediaTypeOptions.Videos });
        if (!result.canceled) {
          onChange(result.assets[0].uri);
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
      <CustomButton color="blue" text={text} Icon={CameraAlt} onPress={handleOnPress()} />
    </View>
  );
};

export default InputCameraVideo;
