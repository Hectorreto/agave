import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useRef, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';

import styles from './styles';
import changePassword from '../../api/changePassword';
import CustomButton from '../../components/custom-button/CustomButton';
import InputPassword from '../../components/input-password/InputPassword';
import Versioning from '../../components/versioning/Versioning';
import { AuthContext } from '../../contexts/notification-context/AuthContext';
import { NotificationContext } from '../../contexts/notification-context/NotificationContext';
import { RootStackParamList } from '../../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePass'>;

const ChangePassScreen = ({ navigation }: Props) => {
  const { showNotification } = useContext(NotificationContext);
  const { accessToken, guid } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [errors, setErrors] = useState<any>({});
  const refInput2 = useRef<TextInput>(null);
  const refInput3 = useRef<TextInput>(null);

  const validateForm = () => {
    const errors: any = {};

    if (!oldPassword) {
      errors.oldPassword = 'Este campo es obligatorio';
    }

    if (!newPassword) {
      errors.newPassword = 'Este campo es obligatorio';
    } else if (!newPassword.match(/[0-9]/)) {
      errors.newPassword = 'Al menos un número';
    } else if (!newPassword.match(/[A-Z]/)) {
      errors.newPassword = 'Al menos una mayúscula';
    } else if (!newPassword.match(/[a-z]/)) {
      errors.newPassword = 'Al menos una minúscula';
    } else if (newPassword.length < 8) {
      errors.newPassword = 'Mínimo 8 caracteres';
    }

    if (!newPassword2) {
      errors.newPassword2 = 'Este campo es obligatorio';
    } else if (newPassword !== newPassword2) {
      errors.newPassword2 = 'Las contraseñas no coinciden';
    }

    setErrors(errors);
    return Object.entries(errors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;
      const data = await changePassword({ oldPassword, newPassword, guid, accessToken });
      if (data.errorOldPassword) {
        return showNotification('Contraseña actual incorrecta', 'incorrect');
      }
      if (data.errorSamePassword) {
        return showNotification(
          'La nueva contraseña debe ser diferente a la anterior.',
          'incorrect'
        );
      }
      if (!data.success) {
        return showNotification('Error al cambiar la contraseña', 'incorrect');
      }

      showNotification('Contraseña actualizada con éxito.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      showNotification('Error al cambiar la contraseña', 'incorrect');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Cambio de contraseña</Text>
      <Text style={styles.text}>Por favor, ingresa tu nueva contraseña</Text>
      <View style={styles.form}>
        <InputPassword
          label="Contraseña actual"
          placeholder="Contraseña"
          value={oldPassword}
          onChange={setOldPassword}
          nextInputRef={refInput2}
          errorMessage={errors.oldPassword}
        />
        <InputPassword
          label="Nueva contraseña"
          placeholder="Contraseña"
          value={newPassword}
          onChange={setNewPassword}
          info="Debe contener al menos un número, una letra mayúscula, una minúscula y un mínimo de 8
            caracteres"
          inputRef={refInput2}
          nextInputRef={refInput3}
          errorMessage={errors.newPassword}
        />
        <InputPassword
          label="Confirmar contraseña"
          placeholder="Contraseña"
          value={newPassword2}
          onChange={setNewPassword2}
          inputRef={refInput3}
          onSubmit={handleSubmit}
          errorMessage={errors.newPassword2}
        />
      </View>
      <CustomButton color="blue" text="Cambiar contraseña" onPress={handleSubmit} />
      <Versioning />
    </ScrollView>
  );
};

export default ChangePassScreen;
