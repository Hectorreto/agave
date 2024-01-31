import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import login from '../../api/login';
import CustomButton from '../../components/custom-button/CustomButton';
import Divider from '../../components/divider/Divider';
import InputEmail from '../../components/input-email/InputEmail';
import InputPassword from '../../components/input-password/InputPassword';
import Versioning from '../../components/versioning/Versioning';
import { useNotification } from '../../contexts/notification-context/NotificationContext';
import { RootStackParamList } from '../../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      console.log(data);
    } catch (error) {
      console.error(error);
      showNotification('Usuario o contraseña incorrectos', 'incorrect');
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
        />
        <InputPassword
          label="Contraseña"
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
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
