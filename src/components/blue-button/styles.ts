import { StyleSheet } from 'react-native';

import { Colors, shadowStyle } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    ...shadowStyle,
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  text: {
    color: Colors.NEUTRAL,
    fontWeight: '600',
  },
});

export default styles;
