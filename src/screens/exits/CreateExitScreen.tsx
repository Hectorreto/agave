import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import { PropertiesStackParamList } from '../../navigation/PropertiesStack';

type Props = NativeStackScreenProps<PropertiesStackParamList, 'CreateExit'>;

const CreateExitScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Create exit</Text>
    </View>
  );
};

export default CreateExitScreen;
