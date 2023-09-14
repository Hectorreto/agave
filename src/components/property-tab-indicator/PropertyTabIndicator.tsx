import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import { PropertyStackParamList } from '../../navigation/PropertyStack';

type Props = {
  active: number;
};

const PropertyTabIndicator = ({ active }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<PropertyStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, active === 1 && styles.tabActive]}
        onPress={() => navigation.navigate('PropertyBoard')}>
        <Text style={styles.text}>Tablero</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, active === 2 && styles.tabActive]}
        onPress={() => navigation.navigate('PropertyGeneralInfo')}>
        <Text style={styles.text}>Información general</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, active === 3 && styles.tabActive]}
        onPress={() => navigation.navigate('PropertyPlantExits')}>
        <Text style={styles.text}>Salidas de plantas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PropertyTabIndicator;
