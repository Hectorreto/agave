import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ResizeMode, Video } from 'expo-av';
import { useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputCameraVideo from '../../../components/input-camera-video/InputCameraVideo';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { NotificationContext } from '../../../contexts/notification-context/NotificationContext';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';
import { createApplication } from '../../../services/applicationService';
import { createProducts } from '../../../services/productService';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication4'>;

const CreateApplication4Screen = ({ navigation, route }: Props) => {
  const { application, products } = route.params;
  const { showNotification } = useContext(NotificationContext);
  const [videoUri, setVideoUri] = useState('');

  const handleOnSave = async () => {
    try {
      if (!videoUri) return;
      await createApplication({ ...application, videoUri });
      await createProducts(products);
      showNotification('La aplicación ha sido creada con éxito');
      navigation.navigate('ListApplications');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['', '', '', 'Iniciar aplicación']} current={4} />

      {!videoUri && <Text style={styles.helper}>¿Deseas iniciar esta aplicación?</Text>}

      <View style={[styles.helperButton, { flex: 1 }]}>
        {Boolean(videoUri) && (
          <Video
            style={{ height: 360, width: 300 }}
            source={{ uri: videoUri }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        )}

        <InputCameraVideo
          value={videoUri}
          text={videoUri ? 'Volver a grabar aplicación' : 'Iniciar aplicación'}
          onChange={setVideoUri}
        />
      </View>

      <View style={styles.saveCancelButtons}>
        <CustomButton color="lightBlue" text="Cancelar" onPress={() => navigation.goBack()} />
        <CustomButton color="blue" text="Crear" onPress={handleOnSave} />
      </View>
    </ScrollView>
  );
};

export default CreateApplication4Screen;
