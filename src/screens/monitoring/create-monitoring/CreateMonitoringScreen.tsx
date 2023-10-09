import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { newMonitoring } from './helpers';
import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import Delete from '../../../../assets/svg/delete.svg';
import Checkbox from '../../../components/checkbox/Checkbox';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import Expandable from '../../../components/expandable/Expandable';
import InputCamera from '../../../components/input-camera/InputCamera';
import InputText from '../../../components/input-text/InputText';
import ModalDelete from '../../../components/modal-delete/ModalDelete';
import ModalMonitoringForm from '../../../components/modal-monitoring-form/ModalMonitoringForm';
import RadioButton from '../../../components/radio-button/RadioButton';
import { useNotification } from '../../../contexts/notification-context/NotificationContext';
import { MonitoringStackParamList } from '../../../navigation/MonitoringStack';
import { createMonitoring } from '../../../services/monitoringService';

type Props = NativeStackScreenProps<MonitoringStackParamList, 'CreateMonitoring'>;

const CreateMonitoringScreen = ({ navigation }: Props) => {
  const { showNotification } = useNotification();
  const [monitoring, setMonitoring] = useState(newMonitoring());

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState<boolean[]>(Array(8).fill(false));
  const [formCopy, setFormCopy] = useState<boolean[]>([]);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState({ index: 0, name: '' });

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
          value={monitoring.property}
          onChange={(property) => setMonitoring({ ...monitoring, property })}
        />
        <InputText
          label="Número de cuadrantes"
          placeholder="Número"
          value={monitoring.quadrantNumber}
          onChange={(quadrantNumber) => setMonitoring({ ...monitoring, quadrantNumber })}
        />
        <InputText
          label="Número de plantas por cuadrante"
          placeholder="Número"
          value={monitoring.plantsPerQuadrant}
          onChange={(plantsPerQuadrant) => setMonitoring({ ...monitoring, plantsPerQuadrant })}
        />
      </Expandable>

      {form[0] && (
        <Expandable
          label="Planta"
          right={
            <CustomButton
              color="redWhite"
              Icon={Delete}
              onPress={() => {
                setSelectedForm({ index: 0, name: 'planta' });
                setIsModalDeleteVisible(true);
              }}
            />
          }>
          <InputText
            label="Estimación de rendimiento en kg"
            placeholder="### kg"
            value={monitoring.plantPerformanceKg || ''}
            onChange={(plantPerformanceKg) => setMonitoring({ ...monitoring, plantPerformanceKg })}
          />
        </Expandable>
      )}
      {form[1] && (
        <Expandable
          label="Plaga"
          right={
            <CustomButton
              color="redWhite"
              Icon={Delete}
              onPress={() => {
                setSelectedForm({ index: 1, name: 'plaga' });
                setIsModalDeleteVisible(true);
              }}
            />
          }>
          <InputText
            label="Tipo de plaga"
            placeholder="Tipo de plaga"
            value={monitoring.plagueType || ''}
            onChange={(plagueType) => setMonitoring({ ...monitoring, plagueType })}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.plagueIncidence === 'low'}
                onPress={() => setMonitoring({ ...monitoring, plagueIncidence: 'low' })}
              />
              <RadioButton
                label="Media"
                active={monitoring.plagueIncidence === 'medium'}
                onPress={() => setMonitoring({ ...monitoring, plagueIncidence: 'medium' })}
              />
              <RadioButton
                label="Alta"
                active={monitoring.plagueIncidence === 'high'}
                onPress={() => setMonitoring({ ...monitoring, plagueIncidence: 'high' })}
              />
            </View>
          </View>
        </Expandable>
      )}
      {form[2] && (
        <Expandable
          label="Enfermedad"
          right={
            <CustomButton
              color="redWhite"
              Icon={Delete}
              onPress={() => {
                setSelectedForm({ index: 2, name: 'enfermedad' });
                setIsModalDeleteVisible(true);
              }}
            />
          }>
          <InputText
            label="Tipo de enfermedad"
            placeholder="Tipo de enfermedad"
            value={monitoring.diseaseType || ''}
            onChange={(diseaseType) => setMonitoring({ ...monitoring, diseaseType })}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.diseaseIncidence === 'low'}
                onPress={() => setMonitoring({ ...monitoring, diseaseIncidence: 'low' })}
              />
              <RadioButton
                label="Media"
                active={monitoring.diseaseIncidence === 'medium'}
                onPress={() => setMonitoring({ ...monitoring, diseaseIncidence: 'medium' })}
              />
              <RadioButton
                label="Alta"
                active={monitoring.diseaseIncidence === 'high'}
                onPress={() => setMonitoring({ ...monitoring, diseaseIncidence: 'high' })}
              />
            </View>
          </View>
        </Expandable>
      )}
      {form[3] && (
        <Expandable
          label="Maleza"
          right={
            <CustomButton
              color="redWhite"
              Icon={Delete}
              onPress={() => {
                setSelectedForm({ index: 3, name: 'maleza' });
                setIsModalDeleteVisible(true);
              }}
            />
          }>
          <InputText
            label="Maleza"
            placeholder="Maleza"
            value={monitoring.undergrowthName || ''}
            onChange={(undergrowthName) => setMonitoring({ ...monitoring, undergrowthName })}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Tipo de hoja</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Ancha"
                active={monitoring.undergrowthLeafType === 'wide'}
                onPress={() => setMonitoring({ ...monitoring, undergrowthLeafType: 'wide' })}
              />
              <RadioButton
                label="Angosta"
                active={monitoring.undergrowthLeafType === 'narrow'}
                onPress={() => setMonitoring({ ...monitoring, undergrowthLeafType: 'narrow' })}
              />
              <RadioButton
                label="Leñosa"
                active={monitoring.undergrowthLeafType === 'woody'}
                onPress={() => setMonitoring({ ...monitoring, undergrowthLeafType: 'woody' })}
              />
            </View>
          </View>
          <InputText
            label="Altura aproximada en cm"
            placeholder="Altura"
            value={monitoring.undergrowthHeight || ''}
            onChange={(undergrowthHeight) => setMonitoring({ ...monitoring, undergrowthHeight })}
          />
        </Expandable>
      )}
      {form[4] && (
        <Expandable
          label="Daño fitotóxico"
          right={
            <CustomButton
              color="redWhite"
              Icon={Delete}
              onPress={() => {
                setSelectedForm({ index: 4, name: 'daño fitotóxico' });
                setIsModalDeleteVisible(true);
              }}
            />
          }>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Herbicidas</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.phytotoxicDamageHerbicideIncidence === 'low'}
                onPress={() =>
                  setMonitoring({ ...monitoring, phytotoxicDamageHerbicideIncidence: 'low' })
                }
              />
              <RadioButton
                label="Media"
                active={monitoring.phytotoxicDamageHerbicideIncidence === 'medium'}
                onPress={() =>
                  setMonitoring({ ...monitoring, phytotoxicDamageHerbicideIncidence: 'medium' })
                }
              />
              <RadioButton
                label="Alta"
                active={monitoring.phytotoxicDamageHerbicideIncidence === 'high'}
                onPress={() =>
                  setMonitoring({ ...monitoring, phytotoxicDamageHerbicideIncidence: 'high' })
                }
              />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Pesticidas</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.phytotoxicDamagePesticideIncidence === 'low'}
                onPress={() =>
                  setMonitoring({ ...monitoring, phytotoxicDamagePesticideIncidence: 'low' })
                }
              />
              <RadioButton
                label="Media"
                active={monitoring.phytotoxicDamagePesticideIncidence === 'medium'}
                onPress={() =>
                  setMonitoring({ ...monitoring, phytotoxicDamagePesticideIncidence: 'medium' })
                }
              />
              <RadioButton
                label="Alta"
                active={monitoring.phytotoxicDamagePesticideIncidence === 'high'}
                onPress={() =>
                  setMonitoring({ ...monitoring, phytotoxicDamagePesticideIncidence: 'high' })
                }
              />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Exceso de sales</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.phytotoxicDamageExcessSaltIncidence === 'low'}
                onPress={() =>
                  setMonitoring({ ...monitoring, phytotoxicDamageExcessSaltIncidence: 'low' })
                }
              />
              <RadioButton
                label="Media"
                active={monitoring.phytotoxicDamageExcessSaltIncidence === 'medium'}
                onPress={() =>
                  setMonitoring({ ...monitoring, phytotoxicDamageExcessSaltIncidence: 'medium' })
                }
              />
              <RadioButton
                label="Alta"
                active={monitoring.phytotoxicDamageExcessSaltIncidence === 'high'}
                onPress={() =>
                  setMonitoring({ ...monitoring, phytotoxicDamageExcessSaltIncidence: 'high' })
                }
              />
            </View>
          </View>
        </Expandable>
      )}
      {form[5] && (
        <Expandable
          label="Daño ambiental"
          right={
            <CustomButton
              color="redWhite"
              Icon={Delete}
              onPress={() => {
                setSelectedForm({ index: 5, name: 'daño ambiental' });
                setIsModalDeleteVisible(true);
              }}
            />
          }>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Helada</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.environmentalDamageFrostIncidence === 'low'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageFrostIncidence: 'low' })
                }
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageFrostIncidence === 'medium'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageFrostIncidence: 'medium' })
                }
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageFrostIncidence === 'high'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageFrostIncidence: 'high' })
                }
              />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Estrés</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.environmentalDamageStressIncidence === 'low'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageStressIncidence: 'low' })
                }
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageStressIncidence === 'medium'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageStressIncidence: 'medium' })
                }
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageStressIncidence === 'high'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageStressIncidence: 'high' })
                }
              />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Inundación</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.environmentalDamageFloodIncidence === 'low'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageFloodIncidence: 'low' })
                }
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageFloodIncidence === 'medium'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageFloodIncidence: 'medium' })
                }
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageFloodIncidence === 'high'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageFloodIncidence: 'high' })
                }
              />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Incendio</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.environmentalDamageFireIncidence === 'low'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageFireIncidence: 'low' })
                }
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageFireIncidence === 'medium'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageFireIncidence: 'medium' })
                }
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageFireIncidence === 'high'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageFireIncidence: 'high' })
                }
              />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Granizo</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.environmentalDamageHailIncidence === 'low'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageHailIncidence: 'low' })
                }
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageHailIncidence === 'medium'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageHailIncidence: 'medium' })
                }
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageHailIncidence === 'high'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageHailIncidence: 'high' })
                }
              />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Otros</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.environmentalDamageOtherIncidence === 'low'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageOtherIncidence: 'low' })
                }
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageOtherIncidence === 'medium'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageOtherIncidence: 'medium' })
                }
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageOtherIncidence === 'high'}
                onPress={() =>
                  setMonitoring({ ...monitoring, environmentalDamageOtherIncidence: 'high' })
                }
              />
            </View>
          </View>
        </Expandable>
      )}
      {form[6] && (
        <Expandable
          label="Colorimetría"
          right={
            <CustomButton
              color="redWhite"
              Icon={Delete}
              onPress={() => {
                setSelectedForm({ index: 6, name: 'colorimetría' });
                setIsModalDeleteVisible(true);
              }}
            />
          }>
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.colorimetryIncidence === 'low'}
                onPress={() => setMonitoring({ ...monitoring, colorimetryIncidence: 'low' })}
              />
              <RadioButton
                label="Media"
                active={monitoring.colorimetryIncidence === 'medium'}
                onPress={() => setMonitoring({ ...monitoring, colorimetryIncidence: 'medium' })}
              />
              <RadioButton
                label="Alta"
                active={monitoring.colorimetryIncidence === 'high'}
                onPress={() => setMonitoring({ ...monitoring, colorimetryIncidence: 'high' })}
              />
            </View>
          </View>
          <InputText
            multiline
            label="Comentarios"
            placeholder="Escribe tus comentarios"
            value={monitoring.colorimetryComments || ''}
            onChange={(colorimetryComments) =>
              setMonitoring({ ...monitoring, colorimetryComments })
            }
          />
        </Expandable>
      )}
      {form[7] && (
        <Expandable
          label="Daño físico"
          right={
            <CustomButton
              color="redWhite"
              Icon={Delete}
              onPress={() => {
                setSelectedForm({ index: 7, name: 'daño físico' });
                setIsModalDeleteVisible(true);
              }}
            />
          }>
          <InputText
            label="Tipo de daño físico"
            placeholder="Tipo de daño físico"
            value={monitoring.physicalDamageType || ''}
            onChange={(physicalDamageType) => setMonitoring({ ...monitoring, physicalDamageType })}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Tipo de hoja</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.physicalDamageLeafType === 'wide'}
                onPress={() => setMonitoring({ ...monitoring, physicalDamageLeafType: 'wide' })}
              />
              <RadioButton
                label="Media"
                active={monitoring.physicalDamageLeafType === 'narrow'}
                onPress={() => setMonitoring({ ...monitoring, physicalDamageLeafType: 'narrow' })}
              />
              <RadioButton
                label="Alta"
                active={monitoring.physicalDamageLeafType === 'woody'}
                onPress={() => setMonitoring({ ...monitoring, physicalDamageLeafType: 'woody' })}
              />
            </View>
          </View>
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
                  value={monitoring.quadrantQualification}
                  onChange={(quadrantQualification) =>
                    setMonitoring({ ...monitoring, quadrantQualification })
                  }
                />
              </View>
              <View style={styles.bottomFormDoubleInputItem}>
                <InputText
                  label="De monitoreo"
                  placeholder="##"
                  value={monitoring.monitoringQualification}
                  onChange={(monitoringQualification) =>
                    setMonitoring({ ...monitoring, monitoringQualification })
                  }
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
            <CustomButton
              color="blue"
              text="Guardar"
              onPress={async () => {
                try {
                  await createMonitoring(monitoring);
                  navigation.navigate('ListMonitoring');
                  showNotification('El monitoreo ha sido creado con éxito');
                } catch (error) {
                  console.error(error);
                }
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

      <ModalDelete
        visible={isModalDeleteVisible}
        title="Eliminar formulario"
        message={
          <Text style={styles.modalDeleteText}>
            ¿Estás seguro de que deseas <Text style={styles.modalDeleteTextBold}>eliminar</Text> el
            formulario de {selectedForm.name}? Esta acción no se puede deshacer.
          </Text>
        }
        onCancel={() => setIsModalDeleteVisible(false)}
        onConfirm={() => {
          const copy = [...form];
          copy[selectedForm.index] = false;
          setForm(copy);
          setIsModalDeleteVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default CreateMonitoringScreen;
