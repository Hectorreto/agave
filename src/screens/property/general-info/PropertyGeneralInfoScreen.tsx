import { useState } from 'react';
import { Platform, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Description from '../../../../assets/svg/description.svg';
import Upload from '../../../../assets/svg/upload.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputDate from '../../../components/input-date/InputDate';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';
import PropertyTabIndicator from '../../../components/property-tab-indicator/PropertyTabIndicator';
import { Colors } from '../../../themes/theme';

const PropertyGeneralInfoScreen = () => {
  const [date, setDate] = useState<Date>();
  const [active, setActive] = useState(true);
  const [text, setText] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PropertyTabIndicator active={2} />
      <View style={styles.innerContainer}>
        <InputText label="Nombre del predio" placeholder="Text" value={text} onChange={setText} />
        <InputDate label="Año de plantación" date={date} onChange={setDate} />
        <InputSelect
          label="Tipo de cultivos"
          placeholder="Text"
          value={text}
          onChange={setText}
          items={[{ label: 'Agave', value: '1' }]}
        />
        <InputText label="Ubicación" placeholder="Text" value={text} onChange={setText} />
        <View style={styles.doubleInputContainer}>
          <View style={styles.doubleInputItem}>
            <InputText
              label="No. de hectáreas"
              placeholder="Text"
              value={text}
              onChange={setText}
            />
          </View>
          <View style={styles.doubleInputItem}>
            <InputText
              label="No. de plantas sembradas"
              placeholder="Text"
              value={text}
              onChange={setText}
            />
          </View>
        </View>
        <InputText label="Folio" placeholder="Text" value={text} onChange={setText} />
        <InputText label="Registro" placeholder="Text" value={text} onChange={setText} />
        <InputText
          label="Identificador interno"
          placeholder="Text"
          value={text}
          onChange={setText}
        />
        <InputText
          placeholder="Text"
          value={text}
          onChange={setText}
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
          <View style={styles.inputSwitchInnerContainer}>
            {Platform.OS === 'ios' ? (
              <Switch
                trackColor={{ true: Colors.SECONDARY }}
                ios_backgroundColor={Colors.NEUTRAL_300}
                value={active}
                onValueChange={() => setActive(!active)}
              />
            ) : (
              <Switch
                trackColor={{ true: Colors.SECONDARY_200, false: Colors.NEUTRAL_300 }}
                thumbColor={active ? Colors.SECONDARY : Colors.NEUTRAL_700}
                value={active}
                onValueChange={() => setActive(!active)}
              />
            )}
            <Text>{active ? 'Habilitado' : 'Deshabilitado'}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PropertyGeneralInfoScreen;
