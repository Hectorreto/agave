import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { newProperty, validateForm } from './helpers';
import styles from './styles';
import Description from '../../../../assets/svg/description.svg';
import Upload from '../../../../assets/svg/upload.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputDate from '../../../components/input-date/InputDate';
import InputNumber from '../../../components/input-number/InputNumber';
import InputSelect from '../../../components/input-select/InputSelect';
import InputSwitch from '../../../components/input-switch/InputSwitch';
import InputText from '../../../components/input-text/InputText';
import { useNotification } from '../../../contexts/notification-context/NotificationContext';
import { PropertyStackParamList } from '../../../navigation/PropertyStack';
import { createProperty, Property } from '../../../services/propertyService';

type Props = NativeStackScreenProps<PropertyStackParamList, 'CreateProperty'>;

const CreatePropertyScreen = ({ navigation }: Props) => {
  const { showNotification } = useNotification();
  const [property, setProperty] = useState<Property>(newProperty());
  const [plantingYear, setPlantingYear] = useState<Date>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!validateForm(property, plantingYear)) return;
    const notification = 'El predio ha sido creado con éxito';

    try {
      await createProperty(property);
      showNotification(notification);
      navigation.navigate('ListProperties');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.helper}>Llena el formulario para crear un nuevo predio</Text>
      <View style={styles.innerContainer}>
        <InputText
          label="Nombre del predio"
          placeholder="Nombre del predio"
          value={property.name}
          onChange={(name) => setProperty({ ...property, name })}
          submitted={submitted}
        />
        <InputDate
          label="Año de plantación"
          date={plantingYear}
          onChange={(plantingYear) => {
            setPlantingYear(plantingYear);
            setProperty({ ...property, plantingYear: plantingYear.getTime() });
          }}
          submitted={submitted}
        />
        <InputSelect
          label="Tipo de cultivos"
          placeholder="Tipo de cultivos"
          value={property.cropType}
          onChange={(cropType) => setProperty({ ...property, cropType })}
          items={[{ label: 'Agave', value: '1' }]}
          submitted={submitted}
        />
        <InputText
          label="Ubicación"
          placeholder="Ubicación"
          value={property.location}
          onChange={(location) => setProperty({ ...property, location })}
          submitted={submitted}
        />
        <View style={styles.doubleInputContainer}>
          <Text style={styles.doubleInputLabels}>No. de hectáreas</Text>
          <Text style={styles.doubleInputLabels}>No. de plantas sembradas</Text>
        </View>
        <View style={styles.doubleInputContainer}>
          <View style={styles.doubleInputItem}>
            <InputNumber
              placeholder="###"
              value={property.hectareNumber}
              onChange={(hectareNumber) => setProperty({ ...property, hectareNumber })}
              submitted={submitted}
            />
          </View>
          <View style={styles.doubleInputItem}>
            <InputNumber
              placeholder="###"
              value={property.plantsPlantedNumber}
              onChange={(plantsPlantedNumber) => setProperty({ ...property, plantsPlantedNumber })}
              submitted={submitted}
            />
          </View>
        </View>
        <InputText
          label="Folio"
          placeholder="Folio"
          value={property.invoice}
          onChange={(invoice) => setProperty({ ...property, invoice })}
          submitted={submitted}
        />
        <InputText
          label="Registro"
          placeholder="Registro"
          value={property.registry}
          onChange={(registry) => setProperty({ ...property, registry })}
          submitted={submitted}
        />
        <InputText
          label="Identificador interno"
          placeholder="Identificador interno"
          value={property.internalIdentifier}
          onChange={(internalIdentifier) => setProperty({ ...property, internalIdentifier })}
          submitted={submitted}
        />
        <InputText
          placeholder="###"
          value={property.boardsPerProperty}
          onChange={(boardsPerProperty) => setProperty({ ...property, boardsPerProperty })}
          label="Número de tablas por predio"
          submitted={submitted}
        />
        <View style={styles.inputFileContainer}>
          <Text style={styles.inputLabel}>Análisis de suelo</Text>
          <View style={styles.inputFileInnerContainer}>
            <CustomButton color="blue" text="Subir archivo" Icon={Upload} />
            <TouchableOpacity style={styles.inputFileSeeButton}>
              <Description />
              <Text style={styles.inputFileSeeText}>Archivo.Pdf</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputSwitchContainer}>
          <Text style={styles.inputLabel}>Estado</Text>
          <InputSwitch
            value={Boolean(property.active)}
            onChange={(value) => setProperty({ ...property, active: value ? 1 : 0 })}
          />
        </View>
      </View>

      <View style={styles.saveCancelButtons}>
        <CustomButton color="lightBlue" text="Cancelar" onPress={() => navigation.goBack()} />
        <CustomButton color="blue" text="Guardar" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default CreatePropertyScreen;
