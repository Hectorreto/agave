import { StyleSheet } from 'react-native';

import { Colors, shadowStyle } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    ...shadowStyle,
    borderRadius: 8,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  footer: {
    height: 58,
    paddingHorizontal: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.NEUTRAL,
  },
  footerText: {
    color: Colors.NEUTRAL_700,
  },
  footerFrame2: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerFrame3: {
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerPageNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  navIcon: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  titleContainer: {
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.NEUTRAL_200,
    backgroundColor: Colors.NEUTRAL,
    height: 52,
  },
  dataEvenContainer: {
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.NEUTRAL_200,
    backgroundColor: Colors.NEUTRAL_100,
    height: 52,
  },
  dataOddContainer: {
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.NEUTRAL_200,
    backgroundColor: Colors.NEUTRAL,
    height: 52,
  },
});

export default styles;
