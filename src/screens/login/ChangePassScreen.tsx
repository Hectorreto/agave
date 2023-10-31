import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles';
import CustomButton from '../../components/custom-button/CustomButton';
import InputPassword from '../../components/input-password/InputPassword';
import Versioning from '../../components/versioning/Versioning';
import { RootStackParamList } from '../../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePass'>;

const ChangePassScreen = ({ navigation }: Props) => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (!password1 || !password2) return;
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
          submitted={submitted}
        />
        <InputPassword
          label="Confirmar contraseña"
          placeholder="Contraseña"
          value={password2}
          onChange={setPassword2}
          submitted={submitted}
        />
      </View>
      <CustomButton color="blue" text="Cambiar contraseña" onPress={handleSubmit} />
      <Versioning />
    </View>
  );
};

export default ChangePassScreen;
