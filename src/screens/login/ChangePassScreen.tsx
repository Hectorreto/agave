import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useRef, useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';

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
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState<any>({});
  const refInput2 = useRef<TextInput>(null);

  const validateForm = () => {
    const errors: any = {};

    if (!password1) {
      errors.password1 = 'Este campo es obligatorio';
    } else if (!password1.match(/[0-9]/)) {
      errors.password1 = 'Al menos un número';
    } else if (!password1.match(/[A-Z]/)) {
      errors.password1 = 'Al menos una mayúscula';
    } else if (!password1.match(/[a-z]/)) {
      errors.password1 = 'Al menos una minúscula';
    } else if (password1.length < 8) {
      errors.password1 = 'Mínimo 8 caracteres';
    }

    if (!password2) {
      errors.password2 = 'Este campo es obligatorio';
    } else if (password1 !== password2) {
      errors.password2 = 'Las contraseñas no coinciden';
    }

    setErrors(errors);
    return Object.entries(errors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;
      const data = await changePassword(password1, guid, accessToken);
      if (!data.success) {
        return showNotification('Error al cambiar la contraseña', 'incorrect');
      }
    } catch (error) {
      console.error(error);
      showNotification('Error al cambiar la contraseña', 'incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Cambio de contraseña</Text>
      <Text style={styles.text}>Por favor, ingresa tu nueva contraseña</Text>
      <View style={styles.form}>
        <InputPassword
          label="Contraseña"
          placeholder="Contraseña"
          value={password1}
          onChange={setPassword1}
          info="Debe contener al menos un número, una letra mayúscula, una minúscula y un mínimo de 8
            caracteres"
          nextInputRef={refInput2}
          errorMessage={errors.password1}
        />
        <InputPassword
          label="Confirmar contraseña"
          placeholder="Contraseña"
          value={password2}
          onChange={setPassword2}
          inputRef={refInput2}
          onSubmit={handleSubmit}
          errorMessage={errors.password2}
        />
      </View>
      <CustomButton color="blue" text="Cambiar contraseña" onPress={handleSubmit} />
      <Versioning />
    </View>
  );
};

export default ChangePassScreen;
