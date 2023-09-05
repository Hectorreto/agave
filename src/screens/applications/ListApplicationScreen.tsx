import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';

import { ApplicationStackParamList } from '../../navigation/ApplicationStack';

type Props = NativeStackScreenProps<ApplicationStackParamList, 'ListApplications'>;

const ListApplicationScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Button title="Nueva aplicación" onPress={() => navigation.navigate('CreateApplication')} />
    </View>
  );
};

export default ListApplicationScreen;
