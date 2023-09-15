import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import CameraAlt from '../../../../assets/svg/camera_alt.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { useNotification } from '../../../contexts/notification-context/NotificationContext';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication4'>;

const CreateApplication4Screen = ({ navigation }: Props) => {
  const { showNotification } = useNotification();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['', '', '', 'Iniciar aplicación']} current={4} />

      <Text style={styles.helper}>¿Deseas iniciar esta aplicación?</Text>

      <View style={styles.helperButton}>
        <CustomButton color="blue" text="Iniciar aplicación" Icon={CameraAlt} onPress={() => {}} />
      </View>

      <View style={styles.saveCancelButtons}>
        <CustomButton
          color="lightBlue"
          text="Cancelar"
          onPress={() => navigation.navigate('ListApplications')}
        />
        <CustomButton
          color="blue"
          text="Crear"
          onPress={() => {
            navigation.navigate('ListApplications');
            showNotification('La aplicación ha sido creada con éxito');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default CreateApplication4Screen;