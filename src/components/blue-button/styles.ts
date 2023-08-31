import { StyleSheet } from 'react-native';

import { colors } from '../../themes/theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    color: colors.neutral,
    fontWeight: '600',
  },
});

export default styles;
