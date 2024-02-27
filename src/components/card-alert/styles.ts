import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  indicator: {
    height: 52,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_400,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  indicatorIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_600,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  indicatorText1: {
    color: Colors.NEUTRAL,
    fontSize: 18,
    fontWeight: '600',
  },
  indicatorText2: {
    color: Colors.NEUTRAL,
  },
});

export default styles;
