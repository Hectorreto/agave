import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import Delete from '../../../../assets/svg/delete.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import Expandable from '../../../components/expandable/Expandable';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import InputCamera from '../../../components/input-camera/InputCamera';
import InputText from '../../../components/input-text/InputText';
import RadioButton from '../../../components/radio-button/RadioButton';
import { MonitoringTabsParamList } from '../../../navigation/MonitoringTabs';

type Props = MaterialTopTabScreenProps<MonitoringTabsParamList, 'MonitoringGeneralInfo'>;

const MonitoringGeneralInfoScreen = ({ route }: Props) => {
  const { monitoring } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderTabIndicator
        items={[
          { label: 'Tablero', screen: 'MonitoringBoard' },
          { label: 'Información general', screen: 'MonitoringGeneralInfo' },
        ]}
        active="MonitoringGeneralInfo"
      />

      <Expandable label="General">
        <InputText label="Predio" placeholder="Escribe o selecciona" value={monitoring.property} />
        <InputText
          label="Número de cuadrantes"
          placeholder="Número"
          value={monitoring.quadrantNumber}
        />
        <InputText
          label="Número de plantas por cuadrante"
          placeholder="Número"
          value={monitoring.plantsPerQuadrant}
        />
      </Expandable>

      {monitoring.plantPerformanceKg ? (
        <Expandable label="Planta" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <InputText
            label="Estimación de rendimiento en kg"
            placeholder="### kg"
            value={monitoring.plantPerformanceKg}
          />
        </Expandable>
      ) : null}

      {monitoring.plagueType && monitoring.plagueIncidence ? (
        <Expandable label="Plaga" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <InputText
            label="Tipo de plaga"
            placeholder="Tipo de plaga"
            value={monitoring.plagueType}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={monitoring.plagueIncidence === 'low'} />
              <RadioButton label="Media" active={monitoring.plagueIncidence === 'medium'} />
              <RadioButton label="Alta" active={monitoring.plagueIncidence === 'high'} />
            </View>
          </View>
        </Expandable>
      ) : null}

      {monitoring.diseaseType && monitoring.diseaseIncidence ? (
        <Expandable label="Enfermedad" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <InputText
            label="Tipo de enfermedad"
            placeholder="Tipo de enfermedad"
            value={monitoring.diseaseType}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={monitoring.diseaseIncidence === 'low'} />
              <RadioButton label="Media" active={monitoring.diseaseIncidence === 'medium'} />
              <RadioButton label="Alta" active={monitoring.diseaseIncidence === 'high'} />
            </View>
          </View>
        </Expandable>
      ) : null}

      {monitoring.undergrowthName &&
      monitoring.undergrowthLeafType &&
      monitoring.undergrowthHeight ? (
        <Expandable label="Maleza" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <InputText label="Maleza" placeholder="Maleza" value={monitoring.undergrowthName} />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Tipo de hoja</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Ancha" active={monitoring.undergrowthLeafType === 'wide'} />
              <RadioButton label="Angosta" active={monitoring.undergrowthLeafType === 'narrow'} />
              <RadioButton label="Leñosa" active={monitoring.undergrowthLeafType === 'woody'} />
            </View>
          </View>
          <InputText
            label="Altura aproximada en cm"
            placeholder="Altura"
            value={monitoring.undergrowthHeight}
          />
        </Expandable>
      ) : null}

      {monitoring.phytotoxicDamageHerbicideIncidence &&
      monitoring.phytotoxicDamagePesticideIncidence &&
      monitoring.phytotoxicDamageExcessSaltIncidence ? (
        <Expandable label="Daño fitotóxico" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Herbicidas</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.phytotoxicDamageHerbicideIncidence === 'low'}
              />
              <RadioButton
                label="Media"
                active={monitoring.phytotoxicDamageHerbicideIncidence === 'medium'}
              />
              <RadioButton
                label="Alta"
                active={monitoring.phytotoxicDamageHerbicideIncidence === 'high'}
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
              />
              <RadioButton
                label="Media"
                active={monitoring.phytotoxicDamagePesticideIncidence === 'medium'}
              />
              <RadioButton
                label="Alta"
                active={monitoring.phytotoxicDamagePesticideIncidence === 'high'}
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
              />
              <RadioButton
                label="Media"
                active={monitoring.phytotoxicDamageExcessSaltIncidence === 'medium'}
              />
              <RadioButton
                label="Alta"
                active={monitoring.phytotoxicDamageExcessSaltIncidence === 'high'}
              />
            </View>
          </View>
        </Expandable>
      ) : null}

      {monitoring.environmentalDamageFrostIncidence &&
      monitoring.environmentalDamageStressIncidence &&
      monitoring.environmentalDamageFloodIncidence &&
      monitoring.environmentalDamageFireIncidence &&
      monitoring.environmentalDamageHailIncidence &&
      monitoring.environmentalDamageOtherIncidence ? (
        <Expandable label="Daño ambiental" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Helada</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton
                label="Baja"
                active={monitoring.environmentalDamageFrostIncidence === 'low'}
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageFrostIncidence === 'medium'}
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageFrostIncidence === 'high'}
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
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageStressIncidence === 'medium'}
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageStressIncidence === 'high'}
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
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageFloodIncidence === 'medium'}
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageFloodIncidence === 'high'}
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
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageFireIncidence === 'medium'}
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageFireIncidence === 'high'}
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
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageHailIncidence === 'medium'}
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageHailIncidence === 'high'}
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
              />
              <RadioButton
                label="Media"
                active={monitoring.environmentalDamageOtherIncidence === 'medium'}
              />
              <RadioButton
                label="Alta"
                active={monitoring.environmentalDamageOtherIncidence === 'high'}
              />
            </View>
          </View>
        </Expandable>
      ) : null}

      {monitoring.colorimetryIncidence && monitoring.colorimetryComments ? (
        <Expandable label="Colorimetría" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={monitoring.colorimetryIncidence === 'low'} />
              <RadioButton label="Media" active={monitoring.colorimetryIncidence === 'medium'} />
              <RadioButton label="Alta" active={monitoring.colorimetryIncidence === 'high'} />
            </View>
          </View>
          <InputText
            multiline
            label="Comentarios"
            placeholder="Escribe tus comentarios"
            value={monitoring.colorimetryComments}
          />
        </Expandable>
      ) : null}

      {monitoring.physicalDamageType && monitoring.physicalDamageLeafType ? (
        <Expandable label="Daño físico" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <InputText
            label="Tipo de daño físico"
            placeholder="Tipo de daño físico"
            value={monitoring.physicalDamageType}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Tipo de hoja</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Ancha" active={monitoring.physicalDamageLeafType === 'wide'} />
              <RadioButton
                label="Angosta"
                active={monitoring.physicalDamageLeafType === 'narrow'}
              />
              <RadioButton label="Leñosa" active={monitoring.physicalDamageLeafType === 'woody'} />
            </View>
          </View>
        </Expandable>
      ) : null}

      <Text style={styles.helper2}>¿Hay una planta dañada?</Text>
      <View style={styles.newItemContainer}>
        <CustomButton color="blue" text="Agregar formulario" Icon={AddCircle} />
      </View>
      <Divider />
      <View style={styles.bottomFormUploadImageButton}>
        <InputCamera value={monitoring.imageUri} />
      </View>
    </ScrollView>
  );
};

export default MonitoringGeneralInfoScreen;
