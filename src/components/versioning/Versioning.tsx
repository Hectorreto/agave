import { Text, View } from 'react-native';

import styles from './styles';
import useKeyboardVisible from '../../hooks/useKeyboardVisible';

const EXPO_PUBLIC_APP_VERSION = process.env.EXPO_PUBLIC_APP_VERSION;

const Versioning = () => {
  const keyboardVisible = useKeyboardVisible();
  if (keyboardVisible) {
    return;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Powered by Aleate®</Text>
      <Text style={styles.text}>{EXPO_PUBLIC_APP_VERSION}</Text>
    </View>
  );
};

export default Versioning;
