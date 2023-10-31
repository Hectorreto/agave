import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import CustomButton from '../../components/custom-button/CustomButton';
import Divider from '../../components/divider/Divider';
import InputEmail from '../../components/input-email/InputEmail';
import InputPassword from '../../components/input-password/InputPassword';
import Versioning from '../../components/versioning/Versioning';
import { RootStackParamList } from '../../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (!email || !password) return;

    navigation.navigate('HomeDrawer');
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
          submitted={submitted}
        />
        <InputPassword
          label="Contraseña"
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
          submitted={submitted}
        />
        <Divider />
        <View>
          <Text>¿La olvidaste? No te preocupes.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RecoverPass')}>
            <Text style={styles.recoverPass}>Recuperar contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton color="blue" text="Iniciar sesión" onPress={handleSubmit} />
      <Versioning />
    </View>
  );
};

export default LoginScreen;
