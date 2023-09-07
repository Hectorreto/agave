import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import styles from './style';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputSelect from '../../../components/input-select/InputSelect';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication1'>;

const CreateApplication1Screen = ({ navigation }: Props) => {
  const [property, setProperty] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        label="Concepto"
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
        label="Mes de aplicación"
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
        label="Fecha programada"
        placeholder="dd/mm/aaaa"
        value={property}
        onPress={setProperty}
        items={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' },
          { label: 'D', value: 'd' },
        ]}
      />
      <View style={styles.saveCancelButtons}>
        <CustomButton
          color="lightBlue"
          text="Cancelar"
          onPress={() => navigation.navigate('ListApplications')}
        />
        <CustomButton
          color="blue"
          text="Siguiente"
          onPress={() => navigation.navigate('CreateApplication2')}
        />
      </View>
    </ScrollView>
  );
};

export default CreateApplication1Screen;
