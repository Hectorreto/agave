import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import CameraAlt from '../../../../assets/svg/camera_alt.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { useNotification } from '../../../contexts/notification-context/NotificationContext';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';
import { createApplication } from '../../../services/applicationService';
import { createProducts } from '../../../services/productService';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication4'>;

const CreateApplication4Screen = ({ navigation, route }: Props) => {
  const { application, products } = route.params;
  const { showNotification } = useNotification();

  const handleOnSave = async () => {
    try {
      await createApplication(application);
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
        <CustomButton color="blue" text="Crear" onPress={handleOnSave} />
      </View>
    </ScrollView>
  );
};

export default CreateApplication4Screen;
