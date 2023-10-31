import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import FormExit from './FormExit';
import { Item, newItem, saveItems, validateForm } from './helpers';
import styles from './styles';
import AddCircle from '../../../../assets/svg/add_circle.svg';
import Delete from '../../../../assets/svg/delete.svg';
import CustomButton from '../../../components/custom-button/CustomButton';
import Expandable from '../../../components/expandable/Expandable';
import InputSelect from '../../../components/input-select/InputSelect';
import ModalDelete from '../../../components/modal-delete/ModalDelete';
import { useNotification } from '../../../contexts/notification-context/NotificationContext';
import useProperties from '../../../hooks/useProperties';
import { ExitStackParamList } from '../../../navigation/ExitStack';

type Props = NativeStackScreenProps<ExitStackParamList, 'CreateExit'>;

const CreateExitScreen = ({ navigation, route }: Props) => {
  const { showNotification } = useNotification();
  const [propertyId, setPropertyId] = useState(route.params?.propertyId || '');
  const [items, setItems] = useState([newItem(1)]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [submitted, setSubmitted] = useState(false);
  const { data: properties } = useProperties({});

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!validateForm(propertyId, items)) return;
    const notification =
      items.length === 1
        ? 'La salida ha sido creada con éxito'
        : 'Las salidas han sido creadas con éxito';

    try {
      await saveItems(propertyId, items);
      showNotification(notification);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.helper}>Llena el formulario para crear una nueva salida</Text>
      <View style={styles.propertyContainer}>
        <InputSelect
          label="Predio"
          placeholder="Selecciona"
          value={propertyId}
          onChange={setPropertyId}
          items={properties.map((property) => ({
            label: property.name,
            value: property.id,
          }))}
          submitted={submitted}
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
            submitted={submitted}
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
          onPress={handleSubmit}
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
