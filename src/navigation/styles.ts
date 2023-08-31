import { StyleSheet } from 'react-native';

import { colors } from '../themes/theme';

const styles = StyleSheet.create({
  iconDefault: {
    backgroundColor: colors.neutral,
    width: 64,
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  iconFocused: {
    backgroundColor: colors.primary,
    width: 64,
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
});

export default styles;
