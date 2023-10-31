import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles';
import CustomButton from '../../components/custom-button/CustomButton';
import InputEmail from '../../components/input-email/InputEmail';
import Versioning from '../../components/versioning/Versioning';
import { RootStackParamList } from '../../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'RecoverPass'>;

const RecoverPassScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (!email) return;

    navigation.navigate('ChangePass');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Recuperar contraseña</Text>
      <Text style={styles.text}>
        Por favor, proporciona tu correo electrónico. Te enviaremos un enlace para poder restablecer
        tu contraseña.
      </Text>
      <View style={styles.form}>
        <InputEmail
          label="Correo electrónico"
          placeholder="Correo electrónico"
          value={email}
          onChange={setEmail}
          submitted={submitted}
        />
      </View>
      <CustomButton color="blue" text="Enviar correo" onPress={handleSubmit} />
      <Versioning />
    </View>
  );
};

export default RecoverPassScreen;
