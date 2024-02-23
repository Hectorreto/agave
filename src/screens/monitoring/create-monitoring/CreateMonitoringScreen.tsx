import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useEffect, useRef, useState } from 'react';
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
import InputNumber from '../../../components/input-number/InputNumber';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';
import ModalDelete from '../../../components/modal-delete/ModalDelete';
import ModalMonitoringForm from '../../../components/modal-monitoring-form/ModalMonitoringForm';
import { NotificationContext } from '../../../contexts/notification-context/NotificationContext';
import useProperties from '../../../hooks/useProperties';
import { MonitoringStackParamList } from '../../../navigation/MonitoringStack';
import { createMonitoring, Monitoring } from '../../../services/monitoringService';
import { range } from '../../../utils/numberUtils';

type Props = NativeStackScreenProps<MonitoringStackParamList, 'CreateMonitoring'>;

export type MonitoringContainer = {
  quadrant: number;
  plant: number;
  form: (Partial<Monitoring> | undefined)[];
};

const CreateMonitoringScreen = ({ navigation }: Props) => {
  const { showNotification } = useContext(NotificationContext);
  const [monitoring, setMonitoring] = useState(newMonitoring());

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState<(Partial<Monitoring> | undefined)[]>(Array(8).fill(undefined));
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState({ index: 0, name: '' });
  const { data: properties } = useProperties({});
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const [currentQuadrant, setCurrentQuadrant] = useState(1);
  const [currentPlant, setCurrentPlant] = useState(1);

  const showStepper =
    Boolean(monitoring.propertyId) &&
    Number(monitoring.quadrantNumber) > 0 &&
    Number(monitoring.plantsPerQuadrant) > 0;

  const showForms = showStepper && form.some((value) => value);

  const { quadrantQualification, monitoringQualification } = getQuadrantQualification(form);

  const [data, setData] = useState<MonitoringContainer[]>([]);

  const isLastForm =
    currentQuadrant === Number(monitoring.quadrantNumber) &&
    currentPlant === Number(monitoring.plantsPerQuadrant);

  const isLastPlant = !isLastForm && currentPlant === Number(monitoring.plantsPerQuadrant);

  useEffect(() => {
    const currentContainer = data.find(
      (value) => value.quadrant === currentQuadrant && value.plant === currentPlant
    );
    if (currentContainer) {
      setForm(currentContainer.form);
    } else {
      setForm(Array(8).fill(undefined));
    }
  }, [currentQuadrant, currentPlant]);

  const handleSubmit = async () => {
    try {
      if (!validateMonitoring(monitoring, form)) {
        setSubmitted(true);
        showNotification('Formulario incompleto', 'incorrect');
        return;
      }

      setSubmitted(false);
      const filteredData = data.filter(
        (value) => value.quadrant !== currentQuadrant && value.plant !== currentPlant
      );
      filteredData.push({
        quadrant: currentQuadrant,
        plant: currentPlant,
        form,
      });
      setData(filteredData);

      if (isLastForm) {
        if (!monitoring.imageUri) {
          return showNotification('Agrega una foto', 'incorrect');
        }

        const nowTime = Date.now();
        await createMonitoring({
          ...monitoring,
          quadrantQualification,
          monitoringQualification,
          data: JSON.stringify(filteredData),
          createdAt: nowTime,
          updatedAt: nowTime,
        });
        navigation.navigate('ListMonitoring');
        showNotification('El monitoreo ha sido creado con éxito');
      } else if (isLastPlant) {
        setCurrentPlant(1);
        setCurrentQuadrant(currentQuadrant + 1);
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      } else {
        setCurrentPlant(currentPlant + 1);
        scrollRef.current?.scrollTo({ y: 0, animated: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
      {showStepper && (
        <>
          <Text style={styles.quadrantTitle}>
            Cuadrante {currentQuadrant} - Planta {currentPlant}
          </Text>

          <ScrollView horizontal style={styles.stepperContainer}>
            {range(1, Number(monitoring.plantsPerQuadrant) + 1).map((value, index) => (
              <View key={value} style={styles.stepperItemContainer}>
                {index !== 0 && <View style={styles.stepperSeparator} />}
                <Text
                  style={[styles.stepperItem, value === currentPlant && styles.stepperItemActive]}>
                  {value}
                </Text>
              </View>
            ))}
          </ScrollView>
        </>
      )}

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
        <InputNumber
          label="Número de cuadrantes"
          placeholder="Número"
          value={monitoring.quadrantNumber}
          onChange={(value) => {
            if (value.match(/^\d*$/g)) {
              setMonitoring({ ...monitoring, quadrantNumber: value });
            }
            setCurrentQuadrant(1);
            setCurrentPlant(1);
          }}
          submitted={submitted}
        />
        <InputNumber
          label="Número de plantas por cuadrante"
          placeholder="Número"
          value={monitoring.plantsPerQuadrant}
          onChange={(value) => {
            if (value.match(/^\d*$/g)) {
              setMonitoring({ ...monitoring, plantsPerQuadrant: value });
            }
            setCurrentQuadrant(1);
            setCurrentPlant(1);
          }}
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

      {showForms && (
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
            <>
              {currentPlant === 1 && currentQuadrant === 1 ? (
                <CustomButton
                  color="lightBlue"
                  text="Cancelar"
                  onPress={() => navigation.goBack()}
                />
              ) : currentPlant === 1 ? (
                <CustomButton
                  color="lightBlue"
                  text="Anterior"
                  onPress={() => {
                    setCurrentQuadrant(currentQuadrant - 1);
                    setCurrentPlant(Number(monitoring.plantsPerQuadrant));
                    scrollRef.current?.scrollTo({ y: 0, animated: true });
                  }}
                />
              ) : (
                <CustomButton
                  color="lightBlue"
                  text="Anterior"
                  onPress={() => {
                    setCurrentPlant(currentPlant - 1);
                    scrollRef.current?.scrollTo({ y: 0, animated: true });
                  }}
                />
              )}
            </>
            <>
              {isLastForm ? (
                <CustomButton color="blue" text="Guardar" onPress={handleSubmit} />
              ) : isLastPlant ? (
                <CustomButton color="blue" text="Siguiente cuadrante" onPress={handleSubmit} />
              ) : (
                <CustomButton color="blue" text="Siguiente planta" onPress={handleSubmit} />
              )}
            </>
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
