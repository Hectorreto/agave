import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import { ApplicationStackParamList } from './ApplicationStack';
import { FormContext } from '../contexts/notification-context/FormContext';
import FinaliceApplication1Screen from '../screens/applications/finalice-application/FinaliceApplication1Screen';
import FinaliceApplication2Screen from '../screens/applications/finalice-application/FinaliceApplication2Screen';
import { Application } from '../services/applicationService';

export type ApplicationFinalizeFormStackParamList = {
  FinaliceApplication1: undefined;
  FinaliceApplication2: undefined;
};

const Stack = createNativeStackNavigator<ApplicationFinalizeFormStackParamList>();

type Props = NativeStackScreenProps<ApplicationStackParamList, 'ApplicationFinalizeFormStack'>;

const ApplicationFinalizeFormStack = ({ route }: Props) => {
  const [application, setApplication] = useState<Application>({
    ...route.params?.application,
  });

  return (
    <FormContext.Provider
      value={{
        formValue: application,
        setFormValue: setApplication,
      }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FinaliceApplication1" component={FinaliceApplication1Screen} />
        <Stack.Screen name="FinaliceApplication2" component={FinaliceApplication2Screen} />
      </Stack.Navigator>
    </FormContext.Provider>
  );
};

export default ApplicationFinalizeFormStack;
