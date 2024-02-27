import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';
import Description from '../../../../assets/svg/description.svg';
import Upload from '../../../../assets/svg/upload.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import InputSelectMultiple from '../../../components/input-select-multiple/InputSelectMultiple';
import InputSwitch from '../../../components/input-switch/InputSwitch';
import InputText from '../../../components/input-text/InputText';
import { PropertyTabsParamList } from '../../../navigation/PropertyTabs';
import { CropType } from '../../../services/monitoringService';
import { Property } from '../../../services/propertyService';
import { parseArray } from '../../../utils/arrayUtils';

type Props = MaterialTopTabScreenProps<PropertyTabsParamList, 'PropertyGeneralInfo'>;

const getLocation = (property: Property) => {
  try {
    const data = JSON.parse(property.location);
    return `${data.center.lat}, ${data.center.lng}`;
  } catch (error) {
    console.error(error);
    return '';
  }
};

const getFloorAnalysisFile = (property: Property) => {
  try {
    if (!property.floorAnalysis) return null;
    const data = JSON.parse(property.floorAnalysis);
    if (data.name && data.url) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const PropertyGeneralInfoScreen = ({ route }: Props) => {
  const { property } = route.params;
  const location = getLocation(property);
  const floorAnalysis = getFloorAnalysisFile(property);
  const cropTypes: CropType[] = parseArray(property.cropType);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderTabIndicator
        items={[
          { label: 'Tablero', screen: 'PropertyBoard' },
          { label: 'Información general', screen: 'PropertyGeneralInfo' },
          // { label: 'Salidas de plantas', screen: 'PropertyPlantExits' },
        ]}
        active="PropertyGeneralInfo"
      />
      <View style={styles.innerContainer}>
        <InputText
          label="Nombre del predio"
          placeholder="Nombre del predio"
          value={property.name}
        />
        <InputText
          label="Año de plantación"
          placeholder="Año de plantación"
          value={property.plantingYear}
        />
        <InputSelectMultiple
          label="Tipo de cultivos"
          placeholder="Tipo de cultivos"
          values={cropTypes.map((cropType) => cropType.guid)}
          items={cropTypes.map((cropType) => ({
            label: cropType.name,
            value: cropType.guid,
          }))}
        />
        <Pressable
          onPress={() => {
            try {
              const location = JSON.parse(property.location);
              const lat = location.center.lat;
              const lng = location.center.lng;

              const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
              const latLng = `${lat},${lng}`;
              const label = property.name;
              const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`,
              });

              if (url) {
                Linking.openURL(url);
              }
            } catch (error) {
              console.error(error);
            }
          }}>
          <InputText label="Ubicación" placeholder="Ubicación" value={location} />
        </Pressable>
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
            {floorAnalysis && (
              <TouchableOpacity
                style={styles.inputFileSeeButton}
                onPress={() => {
                  Linking.openURL(floorAnalysis.url);
                }}>
                <Description />
                <Text style={styles.inputFileSeeText}>{floorAnalysis.name}</Text>
              </TouchableOpacity>
            )}
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
