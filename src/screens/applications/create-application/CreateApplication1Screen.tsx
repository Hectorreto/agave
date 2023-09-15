import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputDate from '../../../components/input-date/InputDate';
import InputSelect from '../../../components/input-select/InputSelect';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication1'>;

const CreateApplication1Screen = ({ navigation }: Props) => {
  const [property, setProperty] = useState('');
  const [concept, setConcept] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState<Date>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['General', '', '', '']} current={1} />

      <InputSelect
        label="Predio"
        placeholder="Selecciona"
        value={property}
        onChange={setProperty}
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
        value={concept}
        onChange={setConcept}
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
        value={month}
        onChange={setMonth}
        items={[
          { label: 'Enero', value: '0' },
          { label: 'Febrero', value: '1' },
          { label: 'Marzo', value: '2' },
          { label: 'Abril', value: '3' },
          { label: 'Mayo', value: '4' },
          { label: 'Junio', value: '5' },
          { label: 'Julio', value: '6' },
          { label: 'Agosto', value: '7' },
          { label: 'Septiembre', value: '8' },
          { label: 'Octubre', value: '9' },
          { label: 'Noviembre', value: '10' },
          { label: 'Diciembre', value: '11' },
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
