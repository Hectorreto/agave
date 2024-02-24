import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import { ApplicationStackParamList } from './ApplicationStack';
import { FormContext } from '../contexts/notification-context/FormContext';
import FormApplication1Screen from '../screens/applications/form-application/FormApplication1Screen';
import FormApplication2Screen from '../screens/applications/form-application/FormApplication2Screen';
import FormApplication3Screen from '../screens/applications/form-application/FormApplication3Screen';
import FormApplication4Screen from '../screens/applications/form-application/FormApplication4Screen';
import { Application } from '../services/applicationService';

export type ApplicationFormStackParamList = {
  FormApplication1: undefined;
  FormApplication2: undefined;
  FormApplication3: undefined;
  FormApplication4: undefined;
};

const Stack = createNativeStackNavigator<ApplicationFormStackParamList>();

type Props = NativeStackScreenProps<ApplicationStackParamList, 'ApplicationFormStack'>;

const ApplicationFormStack = ({ route }: Props) => {
  const [application, setApplication] = useState<Partial<Application>>({
    ...route.params?.application,
  });

  return (
    <FormContext.Provider
      value={{
        formValue: application,
        setFormValue: setApplication,
      }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FormApplication1" component={FormApplication1Screen} />
        <Stack.Screen name="FormApplication2" component={FormApplication2Screen} />
        <Stack.Screen name="FormApplication3" component={FormApplication3Screen} />
        <Stack.Screen name="FormApplication4" component={FormApplication4Screen} />
      </Stack.Navigator>
    </FormContext.Provider>
  );
};

export default ApplicationFormStack;
