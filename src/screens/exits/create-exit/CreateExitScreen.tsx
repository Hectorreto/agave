import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import Divider from '../../../components/divider/Divider';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';
import { Colors } from '../../../themes/theme';

const CreateExitScreen = () => {
  const [property, setProperty] = useState('');
  const [type, setType] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ color: Colors.NEUTRAL_700 }}>
        Llena el formulario para crear una nueva salida
      </Text>
      <View style={styles.form}>
        <InputSelect
          label="Predio"
          placeholder="Selecciona"
          value={property}
          onPress={setProperty}
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
          value={type}
          onPress={setType}
          items={[
            { label: 'Cosecha', value: '1' },
            { label: 'Fitosanitaria', value: '2' },
            { label: 'Para monitoreo', value: '3' },
            { label: 'Otros', value: '4' },
          ]}
        />
        <InputText label="Notas" placeholder="Notas" value={notes} onChange={setNotes} />
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
