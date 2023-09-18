import { ReactElement } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Close from '../../../assets/svg/close.svg';
import CustomButton from '../custom-button/CustomButton';

type Props = {
  visible: boolean;
  title: string;
  message: ReactElement;
  onCancel: () => void;
  onConfirm: () => void;
};

const ModalMonitoringForm = ({ visible, title, message, onCancel, onConfirm }: Props) => {
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
          {message}
          <View style={styles.buttonContainer}>
            <View style={styles.leftButton}>
              <CustomButton text="Cancelar" onPress={onCancel} color="lightBlue" />
            </View>
            <View style={styles.rightButton}>
              <CustomButton text="Agregar" onPress={onConfirm} color="blue" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalMonitoringForm;
