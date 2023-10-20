import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../themes/theme';

type Props = {
  left: string;
  right: string;
};

const CardSmall = ({ left, right }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>{left}</Text>
      <Text style={styles.rightText}>{right}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_300,
    borderRadius: 8,
    gap: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftText: {
    color: Colors.PRIMARY,
    fontSize: 18,
    fontWeight: '600',
  },
  rightText: {
    color: Colors.NEUTRAL_600,
  },
});

export default CardSmall;
