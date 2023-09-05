import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';

import { PropertyStackParamList } from '../../navigation/PropertyStack';

type Props = NativeStackScreenProps<PropertyStackParamList, 'ListProperties'>;

const ListPropertyScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Button title="property" onPress={() => navigation.navigate('PropertyDetails')} />
    </View>
  );
};

export default ListPropertyScreen;
