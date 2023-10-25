import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Close from '../../../assets/svg/close.svg';
import Checkbox from '../checkbox/Checkbox';
import CustomButton from '../custom-button/CustomButton';

type Props = {
  visible: boolean;
  title: string;
  initialValues: boolean[];
  onCancel: () => void;
  onConfirm: (values: boolean[]) => void;
};

const ModalMonitoringForm = ({ visible, title, initialValues, onCancel, onConfirm }: Props) => {
  const [values, setValues] = useState(initialValues);

  const handleCheckbox = (index: number) => {
    return (value: boolean) => {
      const copy = [...values];
      copy[index] = value;
      setValues(copy);
    };
  };

  return (
    <Modal transparent onRequestClose={onCancel} visible={visible} animationType="fade">
      <View style={styles.backgroundContainer}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.helper}>
              Puedes seleccionar uno o más tipos de formularios según el daño
            </Text>
          </View>
          <TouchableOpacity style={styles.closeIcon} onPress={onCancel}>
            <Close />
          </TouchableOpacity>
          <View style={styles.modalForm}>
            <Checkbox label="De planta" value={values[0]} onChange={handleCheckbox(0)} />
            <Checkbox label="De plaga" value={values[1]} onChange={handleCheckbox(1)} />
            <Checkbox label="De enfermedad" value={values[2]} onChange={handleCheckbox(2)} />
            <Checkbox label="De maleza" value={values[3]} onChange={handleCheckbox(3)} />
            <Checkbox label="De daño fitotóxico" value={values[4]} onChange={handleCheckbox(4)} />
            <Checkbox label="De daño ambiental" value={values[5]} onChange={handleCheckbox(5)} />
            <Checkbox label="De colorimetría" value={values[6]} onChange={handleCheckbox(6)} />
            <Checkbox label="De daño físico" value={values[7]} onChange={handleCheckbox(7)} />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.leftButton}>
              <CustomButton text="Cancelar" onPress={onCancel} color="lightBlue" />
            </View>
            <View style={styles.rightButton}>
              <CustomButton text="Agregar" onPress={() => onConfirm(values)} color="blue" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalMonitoringForm;
