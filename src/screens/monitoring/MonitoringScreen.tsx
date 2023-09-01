import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';

import { MonitoringStackParamList } from '../../navigation/MonitoringStack';

type Props = NativeStackScreenProps<MonitoringStackParamList, 'Monitoring'>;

const MonitoringScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Button title="Nuevo monitoreo" onPress={() => navigation.navigate('CreateMonitoring')} />
    </View>
  );
};

export default MonitoringScreen;
