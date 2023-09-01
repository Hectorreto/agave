import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';

import { PropertiesStackParamList } from '../../navigation/PropertiesStack';

type Props = NativeStackScreenProps<PropertiesStackParamList, 'ListProperties'>;

const ListPropertiesScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Button title="property" onPress={() => navigation.navigate('PropertyDetails')} />
    </View>
  );
};

export default ListPropertiesScreen;
