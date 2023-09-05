import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

type Props = {
  text: string;
  onPress: () => void;
};

const BlueButton = ({ text, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BlueButton;
