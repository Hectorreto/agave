import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { newApplication } from './helpers';
import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputDate from '../../../components/input-date/InputDate';
import InputSelect from '../../../components/input-select/InputSelect';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import useProperties from '../../../hooks/useProperties';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication1'>;

const CreateApplication1Screen = ({ navigation }: Props) => {
  const [propertyId, setPropertyId] = useState('');
  const [concept, setConcept] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState<Date>();
  const [submitted, setSubmitted] = useState(false);
  const { data: properties } = useProperties({});

  const handleSubmit = () => {
    setSubmitted(true);
    if (!propertyId || !concept || !month || !date) return;

    navigation.navigate('CreateApplication2', {
      application: {
        ...newApplication(),
        propertyId,
        concept,
        applicationMonth: month,
        scheduledDate: date.getTime(),
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['General', '', '', '']} current={1} />

      <InputSelect
        label="Predio"
        placeholder="Selecciona"
        value={propertyId}
        onChange={setPropertyId}
        items={properties.map((property) => ({
          label: property.name,
          value: property.id,
        }))}
        submitted={submitted}
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
        submitted={submitted}
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
        submitted={submitted}
      />
      <InputDate label="Fecha programada" date={date} onChange={setDate} submitted={submitted} />
      <View style={styles.saveCancelButtons}>
        <CustomButton
          color="lightBlue"
          text="Cancelar"
          onPress={() => navigation.navigate('ListApplications')}
        />
        <CustomButton color="blue" text="Siguiente" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default CreateApplication1Screen;
