import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles';
import requestPasswordChange from '../../api/requestPasswordChange';
import CustomButton from '../../components/custom-button/CustomButton';
import InputEmail from '../../components/input-email/InputEmail';
import Versioning from '../../components/versioning/Versioning';
import { NotificationContext } from '../../contexts/notification-context/NotificationContext';
import { RootStackParamList } from '../../navigation/RootStack';
import { isEmail } from '../../utils/dataValidation';

type Props = NativeStackScreenProps<RootStackParamList, 'RecoverPass'>;

const RecoverPassScreen = ({ navigation }: Props) => {
  const { showNotification } = useContext(NotificationContext);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [sent, setSent] = useState(false);

  const validateForm = () => {
    const errors: any = {};
    if (!isEmail(email)) {
      errors.email = 'El correo electrónico debe ser válido';
    }
    setErrors(errors);
    return Object.entries(errors).length === 0;
  };

  const handleSendMail = async () => {
    try {
      if (!validateForm()) return;
      const data = await requestPasswordChange(email);
      if (!data.success) {
        return showNotification('Error al solicitar recuperación de contraseña', 'incorrect');
      }

      setSent(true);
    } catch (error) {
      console.error(error);
      showNotification('Error al solicitar recuperación de contraseña', 'incorrect');
    }
  };

  if (sent) {
    return (
      <View style={styles.container}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Correo de recuperación enviado</Text>
        <Text style={styles.text}>
          Te hemos enviado a tu correo electrónico un enlace para poder restablecer tu contraseña.
        </Text>
        <CustomButton
          color="blue"
          text="Regresar a inicio"
          onPress={() => navigation.navigate('Login')}
        />
        <Versioning />
      </View>
    );
  }

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
          onSubmit={handleSendMail}
          errorMessage={errors.email}
        />
      </View>
      <CustomButton color="blue" text="Enviar correo" onPress={handleSendMail} />
      <Versioning />
    </View>
  );
};

export default RecoverPassScreen;
