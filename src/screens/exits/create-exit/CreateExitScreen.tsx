import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import uuid from 'react-native-uuid';

import FormExit from './FormExit';
import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import InputSelect from '../../../components/input-select/InputSelect';
import ModalDelete from '../../../components/modal-delete/ModalDelete';
import { useNotification } from '../../../contexts/notification-context/NotificationContext';
import { ExitStackParamList } from '../../../navigation/ExitStack';

type Props = NativeStackScreenProps<ExitStackParamList, 'CreateExit'>;

export type Exit = {
  id: string;
  cnt: number;
  type: string;
  notes: string;
  image: string;
  visible: boolean;
};

const newExit = (cnt: number): Exit => {
  return {
    id: uuid.v4() as string,
    cnt,
    type: '',
    notes: '',
    image: '',
    visible: true,
  };
};

const CreateExitScreen = ({ navigation }: Props) => {
  const { showNotification } = useNotification();
  const [property, setProperty] = useState('');
  const [exits, setExits] = useState([newExit(1)]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExit, setSelectedExit] = useState<Exit>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.helper}>Llena el formulario para crear una nueva salida</Text>
      <View style={styles.propertyContainer}>
        <InputSelect
          label="Predio"
          placeholder="Selecciona"
          value={property}
          onChange={setProperty}
          items={[
            { label: 'A', value: 'a' },
            { label: 'B', value: 'b' },
            { label: 'C', value: 'c' },
            { label: 'D', value: 'd' },
          ]}
        />
      </View>

      {exits.map((exit, index) => (
        <FormExit
          key={exit.id}
          exit={exit}
          showTitle={exits.length > 1}
          onPressDelete={() => {
            setIsModalVisible(true);
            setSelectedExit(exit);
          }}
          onChange={(exit) => {
            const copyExits = [...exits];
            copyExits[index] = exit;
            setExits(copyExits);
          }}
        />
      ))}

      <View style={styles.extraActions}>
        <CustomButton
          color="white"
          text="Agregar más salidas"
          Icon={AddCircle}
          onPress={() => {
            const lastCnt = Math.max(...exits.map((e) => e.cnt));
            setExits([...exits, newExit(lastCnt + 1)]);
          }}
        />
      </View>

      <View style={styles.saveCancelButtons}>
        <CustomButton color="lightBlue" text="Cancelar" onPress={() => navigation.goBack()} />
        {exits.length > 1 ? (
          <CustomButton
            color="blue"
            text="Guardar todas"
            onPress={() => {
              navigation.navigate('ListExits');
              showNotification('Las salidas han sido creadas con éxito');
            }}
          />
        ) : (
          <CustomButton
            color="blue"
            text="Guardar"
            onPress={() => {
              navigation.navigate('ListExits');
              showNotification('La salida ha sido creada con éxito');
            }}
          />
        )}
      </View>

      <ModalDelete
        visible={isModalVisible}
        title="Eliminar salida"
        message={
          <Text style={styles.modalText}>
            ¿Estás seguro de que deseas
            <Text style={styles.modalTextBold}> eliminar </Text>
            la Salida {selectedExit?.cnt}? Esta acción no se puede deshacer.
          </Text>
        }
        onCancel={() => setIsModalVisible(false)}
        onConfirm={() => {
          const copyExits = exits.filter((value) => value !== selectedExit);
          if (copyExits.length === 1) {
            copyExits[0] = {
              ...copyExits[0],
              visible: true,
              cnt: 1,
            };
          }
          setExits(copyExits);
          setIsModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default CreateExitScreen;
