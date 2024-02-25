import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ResizeMode, Video } from 'expo-av';
import { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputCameraVideo from '../../../components/input-camera-video/InputCameraVideo';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { FormContext } from '../../../contexts/notification-context/FormContext';
import { NotificationContext } from '../../../contexts/notification-context/NotificationContext';
import { ApplicationFinalizeFormStackParamList } from '../../../navigation/ApplicationFinalizeFormStack';
import {
  Application,
  syncApplications,
  updateApplication,
} from '../../../services/applicationService';

type Props = NativeStackScreenProps<ApplicationFinalizeFormStackParamList, 'FinaliceApplication2'>;

const FinaliceApplication2Screen = ({ navigation, route }: Props) => {
  const { showNotification } = useContext(NotificationContext);
  const { formValue, setFormValue } = useContext(FormContext);
  const application = formValue as Application;
  const setApplication = setFormValue as (value: Application) => void;

  const handleCreate = async () => {
    try {
      if (!application.finalizeVideoUri) {
        return showNotification('Formulario incorrecto', 'incorrect');
      }
      await updateApplication({
        ...application,
        updatedAt: Date.now(),
        state: 'finalized',
      });

      showNotification('La aplicación ha sido finalizada con éxito');
      navigation.getParent()?.goBack();
      syncApplications().catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['Ticket', 'Finalizar aplicación']} current={2} />

      {!application.finalizeVideoUri && (
        <Text style={styles.helper}>¿Deseas finalizar esta aplicación?</Text>
      )}

      <View style={styles.helperButton}>
        {Boolean(application.finalizeVideoUri) && (
          <Video
            style={{ height: 360, width: 300 }}
            source={{ uri: application.finalizeVideoUri }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
          />
        )}

        <InputCameraVideo
          value={application.finalizeVideoUri}
          text={
            application.finalizeVideoUri ? 'Volver a grabar aplicación' : 'Finalizar aplicación'
          }
          onChange={(value) => setApplication({ ...application, finalizeVideoUri: value })}
        />
      </View>

      <View style={styles.saveCancelButtons}>
        <CustomButton color="lightBlue" text="Anterior" onPress={() => navigation.goBack()} />
        <CustomButton color="blue" text="Guardar" onPress={handleCreate} />
      </View>
    </ScrollView>
  );
};

export default FinaliceApplication2Screen;
