import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import Divider from '../../../components/divider/Divider';
import InputCamera from '../../../components/input-camera/InputCamera';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';
import useProperties from '../../../hooks/useProperties';
import { ExitStackParamList } from '../../../navigation/ExitStack';
import { Exit, findOneExit } from '../../../services/exitService';
import { formatDate, formatTime } from '../../../utils/dateUtils';

type Props = NativeStackScreenProps<ExitStackParamList, 'SeeExit'>;

const SeeExitScreen = ({ route }: Props) => {
  const id = route.params.id;
  const [exit, setExit] = useState({} as Exit);
  const { data: properties } = useProperties({});

  useEffect(() => {
    findOneExit(id).then((value) => setExit(value));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.helper}>Este formulario sólo es de consulta, no se puede editar</Text>
      <InputSelect
        label="Predio"
        placeholder="Selecciona"
        value={exit.propertyId}
        items={properties.map((property) => ({
          label: property.name,
          value: property.id,
        }))}
      />
      <InputSelect
        label="Tipo de salida"
        placeholder="Selecciona"
        value={exit.type}
        items={[{ label: exit.type, value: exit.type }]}
      />
      <InputText
        label="Numero de plantas"
        placeholder="Numero de plantas"
        value={String(exit.plantCount)}
      />
      <InputText multiline label="Notas" placeholder="Notas" value={exit.notes} />
      <View style={styles.uploadImage}>
        <InputCamera value={exit.imageUri} />
      </View>
      <Divider />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Creado por: {exit.createdBy} el {formatDate(exit.createdAt)} a las{' '}
          {formatTime(exit.createdAt)}
        </Text>
        <Text style={styles.infoText}>
          Última edición: {exit.updatedBy} el {formatDate(exit.updatedAt)} a las{' '}
          {formatTime(exit.updatedAt)}
        </Text>
      </View>
    </ScrollView>
  );
};

export default SeeExitScreen;
