import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

type Props = {
  text: string;
  onPress: () => void;
};

const BlueButton = ({ text, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.button}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BlueButton;
