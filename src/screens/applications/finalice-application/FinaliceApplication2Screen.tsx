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
import { finalizeApplication } from '../../../services/applicationService';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'FinaliceApplication2'>;

const FinaliceApplication2Screen = ({ navigation, route }: Props) => {
  const { applicationId } = route.params;
  const { showNotification } = useContext(NotificationContext);
  const [videoUri, setVideoUri] = useState('');

  const handleCreate = async () => {
    try {
      if (!videoUri) return;
      await finalizeApplication(applicationId, videoUri);
      console.log('await finalizeProducts(products)'); // TODO
      showNotification('La aplicación ha sido finalizada con éxito');
      navigation.navigate('ListApplications');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['Ticket', 'Finalizar aplicación']} current={2} />

      {!videoUri && <Text style={styles.helper}>¿Deseas finalizar esta aplicación?</Text>}

      <View style={styles.helperButton}>
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
          text={videoUri ? 'Volver a grabar aplicación' : 'Finalizar aplicación'}
          onChange={setVideoUri}
        />
      </View>

      <View style={styles.saveCancelButtons}>
        <CustomButton color="lightBlue" text="Anterior" onPress={() => navigation.goBack()} />
        <CustomButton color="blue" text="Crear" onPress={handleCreate} />
      </View>
    </ScrollView>
  );
};

export default FinaliceApplication2Screen;
