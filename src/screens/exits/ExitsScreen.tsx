import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';

import { ExitsStackParamList } from '../../navigation/ExitsStack';

type Props = NativeStackScreenProps<ExitsStackParamList, 'Exits'>;

const ExitsScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Button title="Nueva salida" onPress={() => navigation.navigate('CreateExit')} />
    </View>
  );
};

export default ExitsScreen;
