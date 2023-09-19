import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import CameraAlt from '../../../../assets/svg/camera_alt.svg';
import Checkbox from '../../../components/checkbox/Checkbox';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import Expandable from '../../../components/expandable/Expandable';
import InputText from '../../../components/input-text/InputText';
import ModalMonitoringForm from '../../../components/modal-monitoring-form/ModalMonitoringForm';
import { useNotification } from '../../../contexts/notification-context/NotificationContext';
import { MonitoringStackParamList } from '../../../navigation/MonitoringStack';

type Props = NativeStackScreenProps<MonitoringStackParamList, 'CreateMonitoring'>;

const CreateMonitoringScreen = ({ navigation }: Props) => {
  const { showNotification } = useNotification();
  const [property, setProperty] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState<boolean[]>(Array(8).fill(false));
  const [formCopy, setFormCopy] = useState<boolean[]>([]);

  const handleCheckbox = (index: number) => {
    return (value: boolean) => {
      const copy = [...formCopy];
      copy[index] = value;
      setFormCopy(copy);
    };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.helper}>Llena el formulario para crear un nuevo monitoreo</Text>

      <Expandable label="General" hideLabelAndShowContent={form.every((value) => !value)}>
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
      </Expandable>

      {form[0] && (
        <Expandable label="Planta">
          <InputText
            label="Estimación de rendimiento en kg"
            placeholder="### kg"
            value={property}
            onChange={setProperty}
          />
        </Expandable>
      )}
      {form[1] && (
        <Expandable label="Plaga">
          <InputText
            label="Tipo de plaga"
            placeholder="Tipo de plaga"
            value={property}
            onChange={setProperty}
          />
        </Expandable>
      )}
      {form[2] && (
        <Expandable label="Enfermedad">
          <InputText
            label="Tipo de enfermedad"
            placeholder="Tipo de enfermedad"
            value={property}
            onChange={setProperty}
          />
        </Expandable>
      )}
      {form[3] && (
        <Expandable label="Maleza">
          <InputText label="Maleza" placeholder="Maleza" value={property} onChange={setProperty} />
          <InputText
            label="Altura aproximada en cm"
            placeholder="Altura"
            value={property}
            onChange={setProperty}
          />
        </Expandable>
      )}
      {form[4] && (
        <Expandable label="Daño fitotoxico">
          <></>
        </Expandable>
      )}
      {form[5] && (
        <Expandable label="Daño ambiental">
          <></>
        </Expandable>
      )}
      {form[6] && (
        <Expandable label="Colorimetría">
          <InputText
            multiline
            label="Comentarios"
            placeholder="Escribe tus comentarios"
            value={property}
            onChange={setProperty}
          />
        </Expandable>
      )}
      {form[7] && (
        <Expandable label="Daño físico">
          <InputText
            label="Tipo de daño físico"
            placeholder="Tipo de daño físico"
            value={property}
            onChange={setProperty}
          />
        </Expandable>
      )}

      <Text style={styles.helper2}>¿Hay una planta dañada?</Text>
      <View style={styles.newItemContainer}>
        <CustomButton
          color="blue"
          text="Agregar formulario"
          Icon={AddCircle}
          onPress={() => {
            setIsModalVisible(true);
            setFormCopy([...form]);
          }}
        />
      </View>

      {form.some((value) => value) && (
        <View style={styles.bottomFormContainer}>
          <Divider />
          <View style={styles.bottomFormInputsContainer}>
            <Text style={styles.bottomFormTitle}>Cualificación</Text>
            <View style={styles.bottomFormDoubleInput}>
              <View style={styles.bottomFormDoubleInputItem}>
                <InputText
                  label="De cuadrante"
                  placeholder="##"
                  value={property}
                  onChange={setProperty}
                />
              </View>
              <View style={styles.bottomFormDoubleInputItem}>
                <InputText
                  label="De monitoreo"
                  placeholder="##"
                  value={property}
                  onChange={setProperty}
                />
              </View>
            </View>
            <InputText
              multiline
              label="Comentarios (Opcional)"
              placeholder="Escribe tus comentarios"
              value={property}
              onChange={setProperty}
            />
          </View>

          <View style={styles.bottomFormUploadImageButton}>
            <CustomButton color="blue" text="Subir foto" Icon={CameraAlt} onPress={() => {}} />
          </View>

          <View style={styles.saveCancelButtons}>
            <CustomButton color="lightBlue" text="Cancelar" onPress={() => navigation.goBack()} />
            <CustomButton
              color="blue"
              text="Guardar"
              onPress={() => {
                navigation.navigate('ListMonitoring');
                showNotification('El monitoreo ha sido creado con éxito');
              }}
            />
          </View>
        </View>
      )}

      <ModalMonitoringForm
        visible={isModalVisible}
        title="Agregar formulario"
        message={
          <View style={styles.modalForm}>
            <Checkbox label="De planta" value={formCopy[0]} onChange={handleCheckbox(0)} />
            <Checkbox label="De plaga" value={formCopy[1]} onChange={handleCheckbox(1)} />
            <Checkbox label="De enfermedad" value={formCopy[2]} onChange={handleCheckbox(2)} />
            <Checkbox label="De maleza" value={formCopy[3]} onChange={handleCheckbox(3)} />
            <Checkbox label="De daño fitotóxico" value={formCopy[4]} onChange={handleCheckbox(4)} />
            <Checkbox label="De daño ambiental" value={formCopy[5]} onChange={handleCheckbox(5)} />
            <Checkbox label="De colorimetría" value={formCopy[6]} onChange={handleCheckbox(6)} />
            <Checkbox label="De daño físico" value={formCopy[7]} onChange={handleCheckbox(7)} />
          </View>
        }
        onCancel={() => setIsModalVisible(false)}
        onConfirm={() => {
          setIsModalVisible(false);
          setForm([...formCopy]);
        }}
      />
    </ScrollView>
  );
};

export default CreateMonitoringScreen;
