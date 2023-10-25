import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    color: Colors.NEUTRAL_700,
    fontWeight: '600',
  },
  innerContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  title: {
    color: Colors.PRIMARY_700,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;
