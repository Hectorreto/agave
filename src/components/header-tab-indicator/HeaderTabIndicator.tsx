import { MaterialTopTabNavigationHelpers } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';

import styles from './styles';

type Props = {
  active: string;
  items: {
    label: string;
    screen: string;
  }[];
};

const HeaderTabIndicator = ({ active, items }: Props) => {
  const navigation = useNavigation<MaterialTopTabNavigationHelpers>();

  return (
    <View style={styles.container}>
      {items.map((value) => (
        <Pressable
          key={value.screen}
          disabled={active === value.screen}
          style={({ pressed }) => [
            styles.tab,
            active === value.screen && styles.tabActive,
            pressed && styles.tabPressed,
          ]}
          onPress={() => navigation.jumpTo(value.screen)}>
          <Text style={styles.text}>{value.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default HeaderTabIndicator;
