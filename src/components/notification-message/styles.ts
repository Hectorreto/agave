import { StyleSheet } from 'react-native';

import { Colors, shadowStyle } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    ...shadowStyle,
    backgroundColor: Colors.SECONDARY,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    position: 'absolute',
    top: 90,
    left: 16,
    right: 16,
  },
  containerIncorrect: {
    backgroundColor: Colors.ALERT_RED_2,
  },
  leftContainer: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
    alignItems: 'center',
  },
  message: {
    color: Colors.NEUTRAL,
    fontSize: 16,
    flex: 1,
  },
  closeText: {
    color: Colors.NEUTRAL,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;
