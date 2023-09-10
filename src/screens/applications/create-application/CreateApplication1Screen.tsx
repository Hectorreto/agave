import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import CreateApplicationTabs from './CreateApplicationTabs';
import styles from './style';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputDate from '../../../components/input-date/InputDate';
import InputSelect from '../../../components/input-select/InputSelect';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication1'>;

const CreateApplication1Screen = ({ navigation }: Props) => {
  const [property, setProperty] = useState('');
  const [date, setDate] = useState<Date>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CreateApplicationTabs index={1} />

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
      <InputDate label="Fecha programada" date={date} onChange={setDate} />
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
