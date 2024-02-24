import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ResizeMode, Video } from 'expo-av';
import { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { newApplication } from './helpers';
import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputCameraVideo from '../../../components/input-camera-video/InputCameraVideo';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { FormContext } from '../../../contexts/notification-context/FormContext';
import { NotificationContext } from '../../../contexts/notification-context/NotificationContext';
import { ApplicationFormStackParamList } from '../../../navigation/ApplicationFormStack';
import {
  Application,
  createApplication,
  syncApplications,
  updateApplication,
} from '../../../services/applicationService';

type Props = NativeStackScreenProps<ApplicationFormStackParamList, 'FormApplication4'>;

const FormApplication4Screen = ({ navigation }: Props) => {
  const { showNotification } = useContext(NotificationContext);
  const { formValue, setFormValue, onSubmit } = useContext(FormContext);
  const application = formValue as Partial<Application>;
  const setApplication = setFormValue as (value: Partial<Application>) => void;

  const handleOnSave = async () => {
    try {
      if (!application.id) {
        const nowTime = Date.now();
        await createApplication({
          ...newApplication(),
          ...application,
          createdAt: nowTime,
          updatedAt: nowTime,
          state: application.videoUri ? 'inProcess' : 'scheduled',
        });
      } else {
        const nowTime = Date.now();
        await updateApplication({
          ...newApplication(),
          ...application,
          updatedAt: nowTime,
          state: application.videoUri ? 'inProcess' : 'scheduled',
        });
      }

      showNotification('La aplicación ha sido creada con éxito');
      onSubmit();
      syncApplications().catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['', '', '', 'Iniciar aplicación']} current={4} />

      {!application.videoUri && <Text style={styles.helper}>¿Deseas iniciar esta aplicación?</Text>}

      <View style={[styles.helperButton, { flex: 1 }]}>
        {application.videoUri ? (
          <Video
            style={{ height: 360, width: 300 }}
            source={{ uri: application.videoUri }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        ) : undefined}

        <InputCameraVideo
          value={application.videoUri ?? ''}
          text={application.videoUri ? 'Volver a grabar aplicación' : 'Iniciar aplicación'}
          onChange={(value) => {
            setApplication({ ...application, videoUri: value });
          }}
        />
      </View>

      <View style={styles.saveCancelButtons}>
        <CustomButton color="lightBlue" text="Anterior" onPress={() => navigation.goBack()} />
        <CustomButton
          color="blue"
          text={application.id ? 'Guardar' : 'Crear'}
          onPress={handleOnSave}
        />
      </View>
    </ScrollView>
  );
};

export default FormApplication4Screen;