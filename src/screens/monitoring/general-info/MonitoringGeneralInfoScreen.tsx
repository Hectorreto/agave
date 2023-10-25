import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import Expandable from '../../../components/expandable/Expandable';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import InputCamera from '../../../components/input-camera/InputCamera';
import InputText from '../../../components/input-text/InputText';
import { MonitoringTabsParamList } from '../../../navigation/MonitoringTabs';
import Form0 from '../create-monitoring/Form0';
import Form1 from '../create-monitoring/Form1';
import Form2 from '../create-monitoring/Form2';
import Form3 from '../create-monitoring/Form3';
import Form4 from '../create-monitoring/Form4';
import Form5 from '../create-monitoring/Form5';
import Form6 from '../create-monitoring/Form6';
import Form7 from '../create-monitoring/Form7';

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

      {monitoring.plantPerformanceKg ? <Form0 monitoring={monitoring} /> : null}

      {monitoring.plagueType && monitoring.plagueIncidence ? (
        <Form1 monitoring={monitoring} />
      ) : null}

      {monitoring.diseaseType && monitoring.diseaseIncidence ? (
        <Form2 monitoring={monitoring} />
      ) : null}

      {monitoring.undergrowthName &&
      monitoring.undergrowthLeafType &&
      monitoring.undergrowthHeight ? (
        <Form3 monitoring={monitoring} />
      ) : null}

      {monitoring.phytotoxicDamageHerbicideIncidence &&
      monitoring.phytotoxicDamagePesticideIncidence &&
      monitoring.phytotoxicDamageExcessSaltIncidence ? (
        <Form4 monitoring={monitoring} />
      ) : null}

      {monitoring.environmentalDamageFrostIncidence &&
      monitoring.environmentalDamageStressIncidence &&
      monitoring.environmentalDamageFloodIncidence &&
      monitoring.environmentalDamageFireIncidence &&
      monitoring.environmentalDamageHailIncidence &&
      monitoring.environmentalDamageOtherIncidence ? (
        <Form5 monitoring={monitoring} />
      ) : null}

      {monitoring.colorimetryIncidence && monitoring.colorimetryComments ? (
        <Form6 monitoring={monitoring} />
      ) : null}

      {monitoring.physicalDamageType && monitoring.physicalDamageLeafType ? (
        <Form7 monitoring={monitoring} />
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
