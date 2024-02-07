import { useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import CheckCircle from '../../../assets/svg/check_circle_outline.svg';
import WarningAmber from '../../../assets/svg/warning_amber.svg';

export type MessageTypes = 'correct' | 'incorrect';
type Props = {
  message: string;
  removeNotification: () => void;
  type: MessageTypes;
};

const NotificationMessage = ({ message, removeNotification, type }: Props) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      timeoutId.current = setTimeout(hideNotification, 5000);
    });
  }, []);

  const hideNotification = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      removeNotification();
    });
  };

  const handleClose = () => {
    clearTimeout(timeoutId.current);
    hideNotification();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        type === 'incorrect' && styles.containerIncorrect,
        { opacity: fadeAnim },
      ]}>
      <View style={styles.leftContainer}>
        {type === 'correct' && <CheckCircle />}
        {type === 'incorrect' && <WarningAmber />}
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity onPress={handleClose}>
        <Text style={styles.closeText}>Cerrar</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default NotificationMessage;
