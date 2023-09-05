import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles';
import BlueButton from '../../components/blue-button/BlueButton';
import CustomEmailInput from '../../components/custom-email-input/CustomEmailInput';
import Versioning from '../../components/versioning/Versioning';
import { RootStackParamList } from '../../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'RecoverPass'>;

const RecoverPassScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Recuperar contraseña</Text>
      <Text style={styles.text}>
        Por favor, proporciona tu correo electrónico. Te enviaremos un enlace para poder restablecer
        tu contraseña.
      </Text>
      <View style={styles.form}>
        <CustomEmailInput
          label="Correo electrónico"
          placeholder="Correo electrónico"
          value={email}
          onChange={setEmail}
        />
      </View>
      <BlueButton text="Enviar correo" onPress={() => navigation.navigate('ChangePass')} />
      <Versioning />
    </View>
  );
};

export default RecoverPassScreen;
