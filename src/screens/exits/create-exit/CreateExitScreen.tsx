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
  exit: Exit;
};

const newItem = (cnt: number): Item => {
  return {
    id: uuid.v4() as string,
    cnt,
    exit: {
      id: '',
      createdAt: 0,
      updatedAt: 0,
      createdBy: '',
      updatedBy: '',
      property: '',
      type: '',
      plantCount: '',
      notes: '',
      imageUri: '',
    },
  };
};

const CreateExitScreen = ({ navigation }: Props) => {
  const { showNotification } = useNotification();
  const [property, setProperty] = useState('');
  const [items, setItems] = useState([newItem(1)]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item>();

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

      {items.map((item, index) => (
        <Expandable
          key={item.id}
          label={`Salida ${item.cnt}`}
          hideLabelAndShowContent={items.length === 1}
          right={
            <CustomButton
              color="redWhite"
              Icon={Delete}
              onPress={() => {
                setIsModalVisible(true);
                setSelectedItem(item);
              }}
            />
          }>
          <FormExit
            key={item.id}
            item={item}
            onChange={(item) => {
              const copy = [...items];
              copy[index] = item;
              setItems(copy);
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
            const lastCnt = Math.max(...items.map((e) => e.cnt));
            setItems([...items, newItem(lastCnt + 1)]);
          }}
        />
      </View>

      <View style={styles.saveCancelButtons}>
        <CustomButton color="lightBlue" text="Cancelar" onPress={() => navigation.goBack()} />
        <CustomButton
          color="blue"
          text={items.length === 1 ? 'Guardar' : 'Guardar todas'}
          onPress={() => {
            createExits(
              items.map((item): Exit => {
                const nowTime = new Date().getTime();
                return {
                  id: item.id,
                  createdAt: nowTime,
                  updatedAt: nowTime,
                  createdBy: '[Usuario]',
                  updatedBy: '[Usuario]',
                  property,
                  type: item.exit.type,
                  plantCount: item.exit.plantCount,
                  notes: item.exit.notes,
                  imageUri: item.exit.imageUri,
                };
              })
            );
            if (items.length === 1) {
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
            la Salida {selectedItem?.cnt}? Esta acción no se puede deshacer.
          </Text>
        }
        onCancel={() => setIsModalVisible(false)}
        onConfirm={() => {
          const copy = items.filter((value) => value !== selectedItem);
          if (copy.length === 1) {
            copy[0] = {
              ...copy[0],
              cnt: 1,
            };
          }
          setItems(copy);
          setIsModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default CreateExitScreen;
