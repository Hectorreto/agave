import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

import NotificationMessage, {
  MessageTypes,
} from '../../components/notification-message/NotificationMessage';

type NotificationContextType = {
  showNotification: (message: string, type?: MessageTypes) => void;
};

type Notification = {
  id: number;
  message: string;
  type: MessageTypes;
};

const NotificationContext = createContext({} as NotificationContextType);

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const lastNotification = notifications[0];

  const showNotification = (message: string, type: MessageTypes = 'correct') => {
    setNotifications((prev) => {
      const lastId = prev.length ? Math.max(...prev.map((value) => value.id)) : 0;
      return [...prev, { id: lastId + 1, message, type }];
    });
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((value) => value.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {lastNotification && (
        <NotificationMessage
          key={lastNotification.id}
          type={lastNotification.type}
          message={lastNotification.message}
          removeNotification={() => removeNotification(lastNotification.id)}
        />
      )}
    </NotificationContext.Provider>
  );
};
