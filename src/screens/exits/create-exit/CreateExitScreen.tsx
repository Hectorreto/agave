import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import CustomEmailInput from '../../../components/custom-email-input/CustomEmailInput';
import Divider from '../../../components/divider/Divider';
import { Colors } from '../../../themes/theme';

const CreateExitScreen = () => {
  const [property, setProperty] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ color: Colors.NEUTRAL_700 }}>
        Llena el formulario para crear una nueva salida
      </Text>
      <View>
        <CustomEmailInput
          label="Predio"
          placeholder="Selecciona"
          value={property}
          onChange={setProperty}
        />

        <Text>Tipo de salida</Text>
        <Text>Selecciona</Text>

        <Text>Notas</Text>
        <Text>Notas</Text>
      </View>
      <Text>Subir foto</Text>
      <Divider />
      <Text>Agregar más salidas</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>Cancelar</Text>
        <Text>Guardar</Text>
      </View>
    </ScrollView>
  );
};

export default CreateExitScreen;
