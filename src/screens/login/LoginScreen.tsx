import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import CustomEmailInput from '../../components/custom-email-input/CustomEmailInput';
import CustomPassInput from '../../components/custom-pass-input/CustomPassInput';
import Divider from '../../components/divider/Divider';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
        ¡Bienvenido!
      </Text>
      <View style={styles.form}>
        <CustomEmailInput
          label="Correo electrónico"
          placeholder="Correo electrónico"
          value={email}
          onChange={setEmail}
        />
        <CustomPassInput
          label="Contraseña"
          placeholder="Contraseña"
          value={password}
          onChange={setPassword}
        />
        <Divider />
        <View>
          <Text>¿La olvidaste? No te preocupes.</Text>
          <TouchableOpacity>
            <Text style={styles.recoverPass}>Recuperar contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <Text style={styles.button}>Iniciar sesión</Text>
      </TouchableOpacity>
      <View style={styles.poweredContainer}>
        <Text style={styles.powered}>Powered by Aleate®</Text>
        <Text style={styles.powered}>1.0.0</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
