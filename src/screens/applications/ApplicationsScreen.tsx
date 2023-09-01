import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';

import { ApplicationsStackParamList } from '../../navigation/ApplicationsStack';

type Props = NativeStackScreenProps<ApplicationsStackParamList, 'Applications'>;

const ApplicationsScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Button title="Nueva aplicación" onPress={() => navigation.navigate('CreateApplication')} />
    </View>
  );
};

export default ApplicationsScreen;
