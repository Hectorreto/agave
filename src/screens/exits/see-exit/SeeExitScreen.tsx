import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import CameraAlt from '../../../../assets/svg/camera_alt.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';
import { ExitStackParamList } from '../../../navigation/ExitStack';

const exit = {
  property: 'a',
  type: '1',
  plants: '###',
  notes:
    'Estas plantas fueron cosechadas por orden de Fulanito Cosme, notamos que a simple vista son plantas sanas y con la madurez apropiada.',
};

type Props = NativeStackScreenProps<ExitStackParamList, 'SeeExit'>;

const SeeExitScreen = ({ route }: Props) => {
  const id = route.params.id;

  console.log({ id });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.helper}>Este formulario sólo es de consulta, no se puede editar</Text>
      <InputSelect
        label="Predio"
        placeholder="Selecciona"
        value={exit.property}
        items={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' },
          { label: 'D', value: 'd' },
        ]}
      />
      <InputSelect
        label="Tipo de salida"
        placeholder="Selecciona"
        value={exit.type}
        items={[
          { label: 'Cosecha', value: '1' },
          { label: 'Fitosanitaria', value: '2' },
          { label: 'Para monitoreo', value: '3' },
          { label: 'Otros', value: '4' },
        ]}
      />
      <InputText label="Notas" placeholder="Notas" value={exit.plants} />
      <InputText multiline label="Notas" placeholder="Notas" value={exit.notes} />
      <View style={styles.uploadImage}>
        <CustomButton color="blue" text="Cambiar foto" Icon={CameraAlt} />
      </View>
      <Divider />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Creado por: Martín Rodríguez el 03/06/2023 a las 12:19</Text>
        <Text style={styles.infoText}>
          Última edición: Mario Enríquez el 03/06/2023 a las 15:23
        </Text>
      </View>
    </ScrollView>
  );
};

export default SeeExitScreen;
