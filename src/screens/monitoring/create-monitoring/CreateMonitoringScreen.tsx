import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Form0 from './Form0';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';
import Form5 from './Form5';
import Form6 from './Form6';
import Form7 from './Form7';
import { getQuadrantQualification, newMonitoring, validateMonitoring } from './helpers';
import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import Expandable from '../../../components/expandable/Expandable';
import InputCamera from '../../../components/input-camera/InputCamera';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';
import ModalDelete from '../../../components/modal-delete/ModalDelete';
import ModalMonitoringForm from '../../../components/modal-monitoring-form/ModalMonitoringForm';
import { NotificationContext } from '../../../contexts/notification-context/NotificationContext';
import useProperties from '../../../hooks/useProperties';
import { MonitoringStackParamList } from '../../../navigation/MonitoringStack';
import { createMonitoring, Monitoring } from '../../../services/monitoringService';

type Props = NativeStackScreenProps<MonitoringStackParamList, 'CreateMonitoring'>;

const CreateMonitoringScreen = ({ navigation }: Props) => {
  const { showNotification } = useContext(NotificationContext);
  const [monitoring, setMonitoring] = useState(newMonitoring());

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState<(Partial<Monitoring> | undefined)[]>(Array(8).fill(undefined));
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState({ index: 0, name: '' });
  const { data: properties } = useProperties({});
  const [submitted, setSubmitted] = useState(false);

  const { quadrantQualification, monitoringQualification } = getQuadrantQualification(form);

  const handleSubmit = async () => {
    try {
      setSubmitted(true);
      if (!validateMonitoring(monitoring, form)) return;
      const nowTime = Date.now();
      await createMonitoring({
        ...monitoring,
        ...form[0],
        ...form[1],
        ...form[2],
        ...form[3],
        ...form[4],
        ...form[5],
        ...form[6],
        ...form[7],
        ...{ quadrantQualification, monitoringQualification },
        createdAt: nowTime,
        updatedAt: nowTime,
      });
      navigation.navigate('ListMonitoring');
      showNotification('El monitoreo ha sido creado con éxito');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.helper}>Llena el formulario para crear un nuevo monitoreo</Text>

      <Expandable label="General" hideLabelAndShowContent={form.every((value) => !value)}>
        <InputSelect
          label="Predio"
          placeholder="Selecciona"
          value={monitoring.propertyId}
          onChange={(propertyId) => setMonitoring({ ...monitoring, propertyId })}
          items={properties.map((property) => ({
            label: property.name,
            value: property.id,
          }))}
          submitted={submitted}
        />
        <InputText
          label="Número de cuadrantes"
          placeholder="Número"
          value={monitoring.quadrantNumber}
          onChange={(quadrantNumber) => setMonitoring({ ...monitoring, quadrantNumber })}
          submitted={submitted}
        />
        <InputText
          label="Número de plantas por cuadrante"
          placeholder="Número"
          value={monitoring.plantsPerQuadrant}
          onChange={(plantsPerQuadrant) => setMonitoring({ ...monitoring, plantsPerQuadrant })}
          submitted={submitted}
        />
      </Expandable>

      {form[0] && (
        <Form0
          monitoring={form[0]}
          onChange={(value) => {
            const copy = [...form];
            copy[0] = value;
            setForm(copy);
          }}
          onPressDelete={() => {
            setSelectedForm({ index: 0, name: 'planta' });
            setIsModalDeleteVisible(true);
          }}
          submitted={submitted}
        />
      )}
      {form[1] && (
        <Form1
          monitoring={form[1]}
          onChange={(value) => {
            const copy = [...form];
            copy[1] = value;
            setForm(copy);
          }}
          onPressDelete={() => {
            setSelectedForm({ index: 1, name: 'plaga' });
            setIsModalDeleteVisible(true);
          }}
          submitted={submitted}
        />
      )}
      {form[2] && (
        <Form2
          monitoring={form[2]}
          onChange={(value) => {
            const copy = [...form];
            copy[2] = value;
            setForm(copy);
          }}
          onPressDelete={() => {
            setSelectedForm({ index: 2, name: 'enfermedad' });
            setIsModalDeleteVisible(true);
          }}
          submitted={submitted}
        />
      )}
      {form[3] && (
        <Form3
          monitoring={form[3]}
          onChange={(value) => {
            const copy = [...form];
            copy[3] = value;
            setForm(copy);
          }}
          onPressDelete={() => {
            setSelectedForm({ index: 3, name: 'maleza' });
            setIsModalDeleteVisible(true);
          }}
          submitted={submitted}
        />
      )}
      {form[4] && (
        <Form4
          monitoring={form[4]}
          onChange={(value) => {
            const copy = [...form];
            copy[4] = value;
            setForm(copy);
          }}
          onPressDelete={() => {
            setSelectedForm({ index: 4, name: 'daño fitotóxico' });
            setIsModalDeleteVisible(true);
          }}
          submitted={submitted}
        />
      )}
      {form[5] && (
        <Form5
          monitoring={form[5]}
          onChange={(value) => {
            const copy = [...form];
            copy[5] = value;
            setForm(copy);
          }}
          onPressDelete={() => {
            setSelectedForm({ index: 5, name: 'daño ambiental' });
            setIsModalDeleteVisible(true);
          }}
          submitted={submitted}
        />
      )}
      {form[6] && (
        <Form6
          monitoring={form[6]}
          onChange={(value) => {
            const copy = [...form];
            copy[6] = value;
            setForm(copy);
          }}
          onPressDelete={() => {
            setSelectedForm({ index: 6, name: 'colorimetría' });
            setIsModalDeleteVisible(true);
          }}
          submitted={submitted}
        />
      )}
      {form[7] && (
        <Form7
          monitoring={form[7]}
          onChange={(value) => {
            const copy = [...form];
            copy[7] = value;
            setForm(copy);
          }}
          onPressDelete={() => {
            setSelectedForm({ index: 7, name: 'daño físico' });
            setIsModalDeleteVisible(true);
          }}
          submitted={submitted}
        />
      )}

      <Text style={styles.helper2}>¿Hay una planta dañada?</Text>
      <View style={styles.newItemContainer}>
        <CustomButton
          color="blue"
          text="Agregar formulario"
          Icon={AddCircle}
          onPress={() => {
            setIsModalVisible(true);
          }}
        />
      </View>

      {form.some((value) => value) && (
        <View style={styles.bottomFormContainer}>
          <Divider />
          <View style={styles.bottomFormInputsContainer}>
            <Text style={styles.bottomFormTitle}>Calificación</Text>
            <View style={styles.bottomFormDoubleInput}>
              <Text style={styles.doubleInputLabels}>De cuadrante</Text>
              <Text style={styles.doubleInputLabels}>De monitoreo</Text>
            </View>
            <View style={styles.bottomFormDoubleInput}>
              <View style={styles.bottomFormDoubleInputItem}>
                <InputText
                  placeholder="##"
                  value={String(quadrantQualification)}
                  submitted={submitted}
                />
              </View>
              <View style={styles.bottomFormDoubleInputItem}>
                <InputText
                  placeholder="##"
                  value={String(monitoringQualification)}
                  submitted={submitted}
                />
              </View>
            </View>
            <InputText
              multiline
              label="Comentarios (Opcional)"
              placeholder="Escribe tus comentarios"
              value={monitoring.comments || ''}
              onChange={(comments) => setMonitoring({ ...monitoring, comments })}
            />
          </View>

          <View style={styles.bottomFormUploadImageButton}>
            <InputCamera
              value={monitoring.imageUri}
              onChange={(imageUri, latitude, longitude) => {
                setMonitoring({ ...monitoring, imageUri, latitude, longitude });
              }}
            />
          </View>

          <View style={styles.saveCancelButtons}>
            <CustomButton color="lightBlue" text="Cancelar" onPress={() => navigation.goBack()} />
            <CustomButton color="blue" text="Guardar" onPress={handleSubmit} />
          </View>
        </View>
      )}

      {isModalVisible && (
        <ModalMonitoringForm
          visible={isModalVisible}
          title="Agregar formulario"
          initialValues={form.map((value) => Boolean(value))}
          onCancel={() => setIsModalVisible(false)}
          onConfirm={(values) => {
            setForm(form.map((value, index) => (values[index] ? value || {} : undefined)));
            setIsModalVisible(false);
          }}
        />
      )}

      <ModalDelete
        visible={isModalDeleteVisible}
        title="Eliminar formulario"
        message={
          <Text style={styles.modalDeleteText}>
            ¿Estás seguro de que deseas <Text style={styles.modalDeleteTextBold}>eliminar</Text> el
            formulario de <Text style={styles.modalDeleteTextBold}>{selectedForm.name}</Text>? Esta
            acción no se puede deshacer.
          </Text>
        }
        onCancel={() => setIsModalDeleteVisible(false)}
        onConfirm={() => {
          const copy = [...form];
          copy[selectedForm.index] = undefined;
          setForm(copy);
          setIsModalDeleteVisible(false);
          showNotification(`El formulario de ${selectedForm.name} ha sido eliminado con éxito`);
        }}
      />
    </ScrollView>
  );
};

export default CreateMonitoringScreen;
