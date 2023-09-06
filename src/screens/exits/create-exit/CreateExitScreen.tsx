import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid';

import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import CameraAlt from '../../../../assets/svg/camera_alt.svg';
import Delete from '../../../../assets/svg/delete.svg';
import ExpandMore from '../../../../assets/svg/expand_more.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Divider from '../../../components/divider/Divider';
import InputSelect from '../../../components/input-select/InputSelect';
import InputText from '../../../components/input-text/InputText';
import { ExitStackParamList } from '../../../navigation/ExitStack';
import { Colors } from '../../../themes/theme';

type Props = NativeStackScreenProps<ExitStackParamList, 'CreateExit'>;

const newExit = () => {
  return {
    id: uuid.v4() as string,
    type: '',
    notes: '',
    image: '',
    visible: true,
  };
};

const CreateExitScreen = ({ navigation }: Props) => {
  const [property, setProperty] = useState('');
  const [exits, setExits] = useState([newExit()]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.helper}>Llena el formulario para crear una nueva salida</Text>
      <View style={styles.propertyContainer}>
        <InputSelect
          label="Predio"
          placeholder="Selecciona"
          value={property}
          onPress={setProperty}
          items={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ]}
        />
      </View>
      {exits.map((exit, index) => (
        <View key={exit.id}>
          <View style={styles.formContainer}>
            {exits.length > 1 && (
              <View
                style={[
                  styles.exitTitleContainer,
                  !exit.visible && styles.exitTitleContainerHidden,
                ]}>
                <TouchableOpacity
                  style={styles.colapseButtonContainer}
                  onPress={() => {
                    const copyExits = [...exits];
                    copyExits[index] = { ...exit, visible: !exit.visible };
                    setExits(copyExits);
                  }}>
                  <Text style={styles.exitTitle}>Salida {index + 1}</Text>
                  <ExpandMore />
                </TouchableOpacity>
                <Pressable
                  style={({ pressed }) => [
                    styles.deleteButtonContainer,
                    pressed && styles.deleteButtonContainerPressed,
                  ]}
                  onPress={() => {
                    const copyExits = exits.filter((value) => value !== exit);
                    if (copyExits.length === 1) {
                      copyExits[0] = { ...copyExits[0], visible: true };
                    }
                    setExits(copyExits);
                  }}>
                  {({ pressed }) => <Delete fill={pressed ? Colors.NEUTRAL : Colors.ALERT_RED} />}
                </Pressable>
              </View>
            )}
            {exit.visible && (
              <>
                <View style={styles.form}>
                  <InputSelect
                    label="Tipo de salida"
                    placeholder="Selecciona"
                    value={exit.type}
                    onPress={(type) => {
                      const copyExits = [...exits];
                      copyExits[index] = { ...exit, type };
                      setExits(copyExits);
                    }}
                    items={[
                      { label: 'Cosecha', value: '1' },
                      { label: 'Fitosanitaria', value: '2' },
                      { label: 'Para monitoreo', value: '3' },
                      { label: 'Otros', value: '4' },
                    ]}
                  />
                  <InputText
                    multiline
                    label="Notas"
                    placeholder="Notas"
                    value={exit.notes}
                    onChange={(notes) => {
                      const copyExits = [...exits];
                      copyExits[index] = { ...exit, notes };
                      setExits(copyExits);
                    }}
                  />
                </View>
                <View style={styles.extraActions}>
                  <CustomButton
                    color="blue"
                    text="Subir foto"
                    iconLeft={<CameraAlt />}
                    onPress={() => {}}
                  />
                </View>
              </>
            )}
          </View>
          <Divider />
        </View>
      ))}
      <View style={styles.extraActions}>
        <CustomButton
          color="white"
          text="Agregar más salidas"
          iconLeft={<AddCircle />}
          onPress={() => setExits([...exits, newExit()])}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
        <CustomButton color="lightBlue" text="Cancelar" onPress={() => navigation.goBack()} />
        <CustomButton
          color="blue"
          text={exits.length > 1 ? 'Guardar todas' : 'Guardar'}
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
};

export default CreateExitScreen;
