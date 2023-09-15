import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';

import styles from './styles';
import { PropertyTabsParamList } from '../../navigation/PropertyTabs';

type Props = {
  active: number;
};

const PropertyTabIndicator = ({ active }: Props) => {
  const navigation = useNavigation<MaterialTopTabNavigationProp<PropertyTabsParamList>>();

  return (
    <View style={styles.container}>
      <Pressable
        disabled={active === 1}
        style={({ pressed }) => [
          styles.tab,
          active === 1 && styles.tabActive,
          pressed && styles.tabPressed,
        ]}
        onPress={() => navigation.jumpTo('PropertyBoard')}>
        <Text style={styles.text}>Tablero</Text>
      </Pressable>
      <Pressable
        disabled={active === 2}
        style={({ pressed }) => [
          styles.tab,
          active === 2 && styles.tabActive,
          pressed && styles.tabPressed,
        ]}
        onPress={() => navigation.jumpTo('PropertyGeneralInfo')}>
        <Text style={styles.text}>Información general</Text>
      </Pressable>
      <Pressable
        disabled={active === 3}
        style={({ pressed }) => [
          styles.tab,
          active === 3 && styles.tabActive,
          pressed && styles.tabPressed,
        ]}
        onPress={() => navigation.jumpTo('PropertyPlantExits')}>
        <Text style={styles.text}>Salidas de plantas</Text>
      </Pressable>
    </View>
  );
};

export default PropertyTabIndicator;
