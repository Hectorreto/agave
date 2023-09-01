import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';

import { PropertiesStackParamList } from '../../navigation/PropertiesStack';

type Props = NativeStackScreenProps<PropertiesStackParamList, 'PropertyDetails'>;

const PropertyDetailsScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Button title="Nueva salida" onPress={() => navigation.navigate('CreateExit')} />
    </View>
  );
};

export default PropertyDetailsScreen;
