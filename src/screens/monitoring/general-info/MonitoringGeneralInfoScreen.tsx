import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import CameraAlt from '../../../../assets/svg/camera_alt.svg';
import Delete from '../../../../assets/svg/delete.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import Expandable from '../../../components/expandable/Expandable';
import HeaderTabIndicator from '../../../components/header-tab-indicator/HeaderTabIndicator';
import InputText from '../../../components/input-text/InputText';
import RadioButton from '../../../components/radio-button/RadioButton';

const MonitoringGeneralInfoScreen = () => {
  const [property, setProperty] = useState('');
  const form: boolean[] = Array(8).fill(true);
  const [radio, setRadio] = useState('');

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
        <Expandable label="Planta" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <InputText
            label="Estimación de rendimiento en kg"
            placeholder="### kg"
            value={property}
            onChange={setProperty}
          />
        </Expandable>
      )}
      {form[1] && (
        <Expandable label="Plaga" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <InputText
            label="Tipo de plaga"
            placeholder="Tipo de plaga"
            value={property}
            onChange={setProperty}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
        </Expandable>
      )}
      {form[2] && (
        <Expandable label="Enfermedad" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <InputText
            label="Tipo de enfermedad"
            placeholder="Tipo de enfermedad"
            value={property}
            onChange={setProperty}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
        </Expandable>
      )}
      {form[3] && (
        <Expandable label="Maleza" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <InputText label="Maleza" placeholder="Maleza" value={property} onChange={setProperty} />
          <InputText
            label="Altura aproximada en cm"
            placeholder="Altura"
            value={property}
            onChange={setProperty}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Tipo de hoja</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Ancha" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Angosta" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Leñosa" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
        </Expandable>
      )}
      {form[4] && (
        <Expandable label="Daño fitotóxico" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Herbicidas</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Pesticidas</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Exceso de sales</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
        </Expandable>
      )}
      {form[5] && (
        <Expandable label="Daño ambiental" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Helada</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Estrés</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Inundación</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Incendio</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Granizo</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
          <View style={styles.radioContainer}>
            <Text style={styles.radioTitle}>Otros</Text>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
        </Expandable>
      )}
      {form[6] && (
        <Expandable label="Colorimetría" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Incidencia</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
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
        <Expandable label="Daño físico" right={<CustomButton color="redWhite" Icon={Delete} />}>
          <InputText
            label="Tipo de daño físico"
            placeholder="Tipo de daño físico"
            value={property}
            onChange={setProperty}
          />
          <View style={styles.radioContainer}>
            <Text style={styles.radioLabel}>Tipo de hoja</Text>
            <View style={styles.radioInnerContainer}>
              <RadioButton label="Baja" active={radio === 'A'} onPress={() => setRadio('A')} />
              <RadioButton label="Media" active={radio === 'B'} onPress={() => setRadio('B')} />
              <RadioButton label="Alta" active={radio === 'C'} onPress={() => setRadio('C')} />
            </View>
          </View>
        </Expandable>
      )}

      <Text style={styles.helper2}>¿Hay una planta dañada?</Text>
      <View style={styles.newItemContainer}>
        <CustomButton color="blue" text="Agregar formulario" Icon={AddCircle} />
      </View>
      <Divider />
      <View style={styles.bottomFormUploadImageButton}>
        <CustomButton color="blue" text="Cambiar foto" Icon={CameraAlt} />
      </View>
    </ScrollView>
  );
};

export default MonitoringGeneralInfoScreen;
