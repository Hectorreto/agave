import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { ScrollView, View } from 'react-native';

import styles from './styles';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputDate from '../../../components/input-date/InputDate';
import InputSelect from '../../../components/input-select/InputSelect';
import TabIndicator from '../../../components/tab-indicator/TabIndicator';
import { FormContext } from '../../../contexts/notification-context/FormContext';
import { NotificationContext } from '../../../contexts/notification-context/NotificationContext';
import useProperties from '../../../hooks/useProperties';
import { ApplicationFormStackParamList } from '../../../navigation/ApplicationFormStack';
import { Application } from '../../../services/applicationService';

type Props = NativeStackScreenProps<ApplicationFormStackParamList, 'FormApplication1'>;

const FormApplication1Screen = ({ navigation }: Props) => {
  const { showNotification } = useContext(NotificationContext);
  const { formValue, setFormValue } = useContext(FormContext);
  const application = formValue as Partial<Application>;
  const setApplication = setFormValue as (value: Partial<Application>) => void;
  const scheduledDate = application.scheduledDate ? new Date(application.scheduledDate) : undefined;

  const [submitted, setSubmitted] = useState(false);
  const { data: properties } = useProperties({});

  const handleSubmit = () => {
    setSubmitted(true);

    if (
      !application.propertyId ||
      !application.concept ||
      !application.applicationMonth ||
      !application.scheduledDate
    ) {
      return showNotification('Formulario incompleto', 'incorrect');
    }

    navigation.navigate('FormApplication2');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TabIndicator titles={['General', '', '', '']} current={1} />

      <InputSelect
        label="Predio"
        placeholder="Selecciona"
        value={application.propertyId ?? ''}
        onChange={
          application.id
            ? undefined
            : (value) => setApplication({ ...application, propertyId: value })
        }
        items={properties.map((property) => ({
          label: property.name,
          value: property.id,
        }))}
        submitted={submitted}
      />
      <InputSelect
        label="Concepto"
        placeholder="Selecciona"
        value={application.concept ?? ''}
        onChange={
          application.id ? undefined : (value) => setApplication({ ...application, concept: value })
        }
        items={[
          { label: 'Nutrición', value: 'nutrition' },
          { label: 'Maleza', value: 'undergrowth' },
          { label: 'Fitosanitaria', value: 'phytosanitary' },
        ]}
        submitted={submitted}
      />
      <InputSelect
        label="Mes de aplicación"
        placeholder="Selecciona"
        value={application.applicationMonth ?? ''}
        onChange={
          application.id
            ? undefined
            : (value) => setApplication({ ...application, applicationMonth: value })
        }
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
      <InputDate
        label="Fecha programada"
        date={scheduledDate}
        onChange={
          application.id
            ? undefined
            : (value) => setApplication({ ...application, scheduledDate: value.getTime() })
        }
        submitted={submitted}
      />

      <View style={{ flex: 1 }} />
      <View style={styles.saveCancelButtons}>
        <CustomButton color="lightBlue" text="Cancelar" onPress={() => navigation.goBack()} />
        <CustomButton color="blue" text="Siguiente" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default FormApplication1Screen;
