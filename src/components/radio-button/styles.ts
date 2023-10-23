import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  textDisabled: {
    color: Colors.NEUTRAL_500,
  },
});

export default styles;
