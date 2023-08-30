import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import CustomPassInput from '../../components/custom-pass-input/CustomPassInput';
import Versioning from '../../components/versioning/Versioning';
import { RootStackParamList } from '../../navigation/RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'ChangePass'>;

const ChangePassScreen = ({ navigation }: Props) => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Cambio de contraseña</Text>
      <Text style={styles.text}>Por favor, ingresa tu nueva contraseña</Text>
      <View style={styles.form}>
        <CustomPassInput
          label="Contraseña"
          placeholder="Contraseña"
          value={password1}
          onChange={setPassword1}
          info="Debe contener al menos un número, una letra mayúscula, una minúscula y un mínimo de 8
            caracteres"
        />
        <CustomPassInput
          label="Confirmar contraseña"
          placeholder="Contraseña"
          value={password2}
          onChange={setPassword2}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.button}>Enviar correo</Text>
      </TouchableOpacity>
      <Versioning />
    </View>
  );
};

export default ChangePassScreen;
