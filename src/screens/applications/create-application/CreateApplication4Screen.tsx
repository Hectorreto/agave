import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';

import styles from './style';
import CameraAlt from '../../../../assets/svg/camera_alt.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication4'>;

const CreateApplication4Screen = ({ navigation }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>¿Deseas iniciar esta aplicación?</Text>

      <CustomButton
        color="blue"
        text="Iniciar aplicación"
        IconLeft={CameraAlt}
        onPress={() => {}}
      />

      <View style={styles.saveCancelButtons}>
        <CustomButton
          color="lightBlue"
          text="Cancelar"
          onPress={() => navigation.navigate('ListApplications')}
        />
        <CustomButton
          color="blue"
          text="Crear"
          onPress={() => navigation.navigate('ListApplications')}
        />
      </View>
    </ScrollView>
  );
};

export default CreateApplication4Screen;
