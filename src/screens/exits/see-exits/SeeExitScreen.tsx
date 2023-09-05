import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import Divider from '../../../components/divider/Divider';
import { ExitsStackParamList } from '../../../navigation/ExitsStack';

type Props = NativeStackScreenProps<ExitsStackParamList, 'SeeExit'>;

const SeeExitScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Este formulario sólo es de consulta, no se puede editar</Text>
      <Text>Predio</Text>
      <Text>Nombre del predio seleccionado</Text>
      <Text>Tipo de salida</Text>
      <Text>Cosecha</Text>
      <Text>Número de plantas</Text>
      <Text>###</Text>
      <Text>Notas</Text>
      <Text>
        Estas plantas fueron cosechadas por orden de Fulanito Cosme, notamos que a simple vista son
        plantas sanas y con la madurez apropiada.
      </Text>
      <Text>Cambiar foto</Text>
      <Text>[]</Text>
      <Divider />
      <Text>Creado por: Martín Rodríguez el 03/06/2023 a las 12:19</Text>
      <Text>Última edición: Mario Enríquez el 03/06/2023 a las 15:23</Text>
    </View>
  );
};

export default SeeExitScreen;
