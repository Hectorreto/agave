import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import login from '../../api/login';
import CustomButton from '../../components/custom-button/CustomButton';
import Divider from '../../components/divider/Divider';
import InputEmail from '../../components/input-email/InputEmail';
import InputPassword from '../../components/input-password/InputPassword';
import Versioning from '../../components/versioning/Versioning';
import { AuthContext } from '../../contexts/notification-context/AuthContext';
import { NotificationContext } from '../../contexts/notification-context/NotificationContext';
import { RootStackParamList } from '../../navigation/RootStack';
import { isEmail } from '../../utils/dataValidation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const { showNotification } = useContext(NotificationContext);
  const { saveAccessToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const refInput2 = useRef<TextInput>(null);

  const validateForm = () => {
    const errors: any = {};
    if (!isEmail(email)) {
      errors.email = 'El correo electrónico debe ser válido';
    }
    if (!password) {
      errors.password = 'Este campo es obligatorio';
    }
    setErrors(errors);
    return Object.entries(errors).length === 0;
  };

  const handleLogin = async () => {
    try {
      if (!validateForm()) return;
      const data = await login(email, password);
      if (data.errorCredentials) {
        return showNotification('Usuario o contraseña incorrectos', 'incorrect');
      }
      if (data.errorRole) {
        return showNotification('El usuario debe ser de tipo "Operador"', 'incorrect');
      }

      saveAccessToken(data.accessToken);
    } catch (error) {
      console.error(error);
      showNotification('Error al iniciar sesión', 'incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
        ¡Bienvenido!
      </Text>
      <View style={styles.form}>
        <InputEmail
          label="Correo electrónico"
          placeholder="Correo electrónico"
          value={email}
          onChange={setEmail}
          nextInputRef={refInput2}
          errorMessage={errors.email}
        />
        <InputPassword
          label="Contraseña"
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
          inputRef={refInput2}
          onSubmit={handleLogin}
          errorMessage={errors.password}
        />
        <Divider />
        <View>
          <Text>¿La olvidaste? No te preocupes.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RecoverPass')}>
            <Text style={styles.recoverPass}>Recuperar contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton color="blue" text="Iniciar sesión" onPress={handleLogin} />
      <Versioning />
    </View>
  );
};

export default LoginScreen;
