import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import useKeyboardVisible from '../../hooks/useKeyboardVisible';

const Versioning = () => {
  const keyboardVisible = useKeyboardVisible();
  if (keyboardVisible) {
    return;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Powered by Aleate®</Text>
      <Text style={styles.text}>1.0.0</Text>
    </View>
  );
};

export default Versioning;
