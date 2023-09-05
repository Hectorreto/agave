import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  iconDefault: {
    backgroundColor: Colors.NEUTRAL_50,
    width: 64,
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  iconFocused: {
    backgroundColor: Colors.PRIMARY,
    width: 64,
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
});

export default styles;
