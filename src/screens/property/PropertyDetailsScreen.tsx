import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';

import { PropertyStackParamList } from '../../navigation/PropertyStack';

type Props = NativeStackScreenProps<PropertyStackParamList, 'PropertyDetails'>;

const PropertyDetailsScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Button title="Nueva salida" onPress={() => navigation.navigate('CreateExit')} />
    </View>
  );
};

export default PropertyDetailsScreen;
