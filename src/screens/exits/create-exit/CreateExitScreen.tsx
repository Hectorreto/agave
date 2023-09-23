import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import uuid from 'react-native-uuid';

import FormExit from './FormExit';
import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import Delete from '../../../../assets/svg/delete.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Expandable from '../../../components/expandable/Expandable';
import InputSelect from '../../../components/input-select/InputSelect';
import ModalDelete from '../../../components/modal-delete/ModalDelete';
import { useNotification } from '../../../contexts/notification-context/NotificationContext';
import { ExitStackParamList } from '../../../navigation/ExitStack';
import { createExits, Exit } from '../../../services/exitService';

type Props = NativeStackScreenProps<ExitStackParamList, 'CreateExit'>;

export type Item = {
  id: string;
  cnt: number;
  type: string;
  notes: string;
  image: string;
  plantCount: string;
};

const newItem = (cnt: number): Item => {
  return {
    id: uuid.v4() as string,
    cnt,
    type: '',
    notes: '',
    image: '',
    plantCount: '',
  };
};

const CreateExitScreen = ({ navigation }: Props) => {
  const { showNotification } = useNotification();
  const [property, setProperty] = useState('');
  const [exits, setExits] = useState([newItem(1)]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedExit, setSelectedExit] = useState<Item>();

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
        <Expandable
          key={exit.id}
          label={`Salida ${exit.cnt}`}
          hideLabelAndShowContent={exits.length === 1}
          right={
            <CustomButton
              color="redWhite"
              Icon={Delete}
              onPress={() => {
                setIsModalVisible(true);
                setSelectedExit(exit);
              }}
            />
          }>
          <FormExit
            key={exit.id}
            exit={exit}
            onChange={(exit) => {
              const copyExits = [...exits];
              copyExits[index] = exit;
              setExits(copyExits);
            }}
          />
        </Expandable>
      ))}

      <View style={styles.extraActions}>
        <CustomButton
          color="white"
          text="Agregar más salidas"
          Icon={AddCircle}
          onPress={() => {
            const lastCnt = Math.max(...exits.map((e) => e.cnt));
            setExits([...exits, newItem(lastCnt + 1)]);
          }}
        />
      </View>

      <View style={styles.saveCancelButtons}>
        <CustomButton color="lightBlue" text="Cancelar" onPress={() => navigation.goBack()} />
        <CustomButton
          color="blue"
          text={exits.length === 1 ? 'Guardar' : 'Guardar todas'}
          onPress={() => {
            createExits(
              exits.map((exit): Exit => {
                const nowTime = new Date().getTime();
                return {
                  id: exit.id,
                  createdAt: nowTime,
                  updatedAt: nowTime,
                  property,
                  type: exit.type,
                  plantCount: Number(exit.plantCount),
                  notes: exit.notes,
                };
              })
            );
            if (exits.length === 1) {
              showNotification('La salida ha sido creada con éxito');
            } else {
              showNotification('Las salidas han sido creadas con éxito');
            }
            navigation.navigate('ListExits');
          }}
        />
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
