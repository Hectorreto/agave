import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import Checkbox from '../../../components/checkbox/Checkbox';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import InputText from '../../../components/input-text/InputText';
import ModalMonitoringForm from '../../../components/modal-monitoring-form/ModalMonitoringForm';

const CreateMonitoringScreen = () => {
  const [property, setProperty] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form0, setForm0] = useState(false);
  const [form1, setForm1] = useState(false);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [form4, setForm4] = useState(false);
  const [form5, setForm5] = useState(false);
  const [form6, setForm6] = useState(false);
  const [form7, setForm7] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.helper}>Llena el formulario para crear un nuevo monitoreo</Text>
      <InputText
        label="Predio"
        placeholder="Escribe o selecciona"
        value={property}
        onChange={setProperty}
      />
      <InputText
        label="Número de cuadrantes"
        placeholder="Número"
        value={property}
        onChange={setProperty}
      />
      <InputText
        label="Número de plantas por cuadrante"
        placeholder="Número"
        value={property}
        onChange={setProperty}
      />
      <Divider />
      <Text style={styles.helper2}>¿Hay una planta dañada?</Text>
      <View style={styles.newItemContainer}>
        <CustomButton
          color="blue"
          text="Agregar formulario"
          Icon={AddCircle}
          onPress={() => setIsModalVisible(true)}
        />
      </View>

      <ModalMonitoringForm
        visible={isModalVisible}
        title="Agregar formulario"
        message={
          <View style={styles.modalForm}>
            <Checkbox label="De planta" value={form0} onPress={() => setForm0(!form0)} />
            <Checkbox label="De plaga" value={form1} onPress={() => setForm1(!form1)} />
            <Checkbox label="De enfermedad" value={form2} onPress={() => setForm2(!form2)} />
            <Checkbox label="De maleza" value={form3} onPress={() => setForm3(!form3)} />
            <Checkbox label="De daño fitotóxico" value={form4} onPress={() => setForm4(!form4)} />
            <Checkbox label="De daño ambiental" value={form5} onPress={() => setForm5(!form5)} />
            <Checkbox label="De colorimetría" value={form6} onPress={() => setForm6(!form6)} />
            <Checkbox label="De daño físico" value={form7} onPress={() => setForm7(!form7)} />
          </View>
        }
        onCancel={() => setIsModalVisible(false)}
        onConfirm={() => {
          setIsModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default CreateMonitoringScreen;
