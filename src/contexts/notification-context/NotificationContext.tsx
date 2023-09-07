import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import CheckCircle from '../../../assets/svg/check_circle_outline.svg';

type NotificationContextType = {
  showNotification: (message: string) => void;
};

const NotificationContext = createContext({} as NotificationContextType);

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const hideNotification = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setMessage('');
    });
  };

  const showNotification = (message: string) => {
    setMessage(message);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(hideNotification, 3000);
    });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {Boolean(message) && (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <View style={styles.leftContainer}>
            <CheckCircle />
            <Text style={styles.message}>{message}</Text>
          </View>
          <TouchableOpacity onPress={hideNotification}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </NotificationContext.Provider>
  );
};
