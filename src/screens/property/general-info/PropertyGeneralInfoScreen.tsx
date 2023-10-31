import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Description from '../../../../assets/svg/description.svg';
import Upload from '../../../../assets/svg/upload.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import InputDate from '../../../components/input-date/InputDate';
import InputSelect from '../../../components/input-select/InputSelect';
import InputSwitch from '../../../components/input-switch/InputSwitch';
import InputText from '../../../components/input-text/InputText';
import { PropertyTabsParamList } from '../../../navigation/PropertyTabs';

type Props = MaterialTopTabScreenProps<PropertyTabsParamList, 'PropertyGeneralInfo'>;

const PropertyGeneralInfoScreen = ({ route }: Props) => {
  const { property } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderTabIndicator
        items={[
          { label: 'Tablero', screen: 'PropertyBoard' },
          { label: 'Información general', screen: 'PropertyGeneralInfo' },
          { label: 'Salidas de plantas', screen: 'PropertyPlantExits' },
        ]}
        active="PropertyGeneralInfo"
      />
      <View style={styles.innerContainer}>
        <InputText
          label="Nombre del predio"
          placeholder="Nombre del predio"
          value={property.name}
        />
        <InputDate label="Año de plantación" date={new Date(property.plantingYear)} />
        <InputSelect
          label="Tipo de cultivos"
          placeholder="Tipo de cultivos"
          value={property.cropType}
          items={[{ label: 'Agave', value: '1' }]}
        />
        <InputText label="Ubicación" placeholder="Ubicación" value={property.location} />
        <View style={styles.doubleInputContainer}>
          <Text style={styles.doubleInputLabels}>No. de hectáreas</Text>
          <Text style={styles.doubleInputLabels}>No. de plantas sembradas</Text>
        </View>
        <View style={styles.doubleInputContainer}>
          <View style={styles.doubleInputItem}>
            <InputText placeholder="###" value={property.hectareNumber} />
          </View>
          <View style={styles.doubleInputItem}>
            <InputText placeholder="###" value={property.plantsPlantedNumber} />
          </View>
        </View>
        <InputText label="Folio" placeholder="Folio" value={property.invoice} />
        <InputText label="Registro" placeholder="Registro" value={property.registry} />
        <InputText
          label="Identificador interno"
          placeholder="Identificador interno"
          value={property.internalIdentifier}
        />
        <InputText
          placeholder="###"
          value={property.boardsPerProperty}
          label="Número de tablas por predio"
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
          <InputSwitch value={Boolean(property.active)} />
        </View>
      </View>
    </ScrollView>
  );
};

export default PropertyGeneralInfoScreen;
