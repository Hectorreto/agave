import { Platform, Switch, Text, View } from 'react-native';

import styles from './styles';
import { Colors } from '../../themes/theme';

type Props = {
  value: boolean;
  onChange?: (value: boolean) => void;
};

const InputSwitch = ({ value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <Switch
          trackColor={{ true: Colors.SECONDARY }}
          ios_backgroundColor={Colors.NEUTRAL_300}
          value={value}
          onValueChange={onChange}
          disabled={!onChange}
        />
      ) : (
        <Switch
          trackColor={{ true: Colors.SECONDARY_200, false: Colors.NEUTRAL_300 }}
          thumbColor={value ? Colors.SECONDARY : Colors.NEUTRAL_700}
          value={value}
          onValueChange={onChange}
          disabled={!onChange}
        />
      )}
      <Text>{value ? 'Habilitado' : 'Deshabilitado'}</Text>
    </View>
  );
};

export default InputSwitch;
