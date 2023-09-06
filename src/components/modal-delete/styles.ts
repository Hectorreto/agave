import { StyleSheet } from 'react-native';

import { Colors, shadowStyle } from '../../themes/theme';

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  container: {
    ...shadowStyle,
    backgroundColor: Colors.NEUTRAL,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: 320,
    height: 224,
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.ALERT_RED,
    fontSize: 24,
    fontWeight: '700',
  },
  buttonContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftButton: {
    alignItems: 'flex-start',
  },
  rightButton: {
    alignItems: 'flex-end',
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});

export default styles;
