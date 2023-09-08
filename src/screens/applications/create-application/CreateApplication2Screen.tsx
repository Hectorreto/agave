import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

import CreateApplicationTabs from './CreateApplicationTabs';
import styles from './style';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';
import { ApplicationStackParamList } from '../../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'CreateApplication2'>;

const CreateApplication2Screen = ({ navigation }: Props) => {
  const [property, setProperty] = useState('');
  const [productName, setProductName] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CreateApplicationTabs index={2} />

      <InputSelect
        label="No. de tambos a aplicar"
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
        label="Notas"
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

      <InputText
        label="Nombre del producto"
        placeholder="Nombre"
        value={productName}
        onChange={setProductName}
      />
      <InputText
        label="Dosis por tambo (en litros)"
        placeholder="Dosis"
        value={productName}
        onChange={setProductName}
      />

      <CustomButton color="white" text="Ver receta en PDF" onPress={() => {}} />

      <View style={styles.saveCancelButtons}>
        <CustomButton
          color="lightBlue"
          text="Cancelar"
          onPress={() => navigation.navigate('ListApplications')}
        />
        <CustomButton
          color="blue"
          text="Siguiente"
          onPress={() => navigation.navigate('CreateApplication3')}
        />
      </View>
    </ScrollView>
  );
};

export default CreateApplication2Screen;
