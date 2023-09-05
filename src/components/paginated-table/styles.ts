import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#A6B1B9',
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
  titleText: {
    fontWeight: '600',
    color: Colors.PRIMARY_700,
    fontSize: 16,
    marginHorizontal: 16,
  },
  titleContainer: {
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.NEUTRAL_200,
    backgroundColor: Colors.NEUTRAL,
    maxWidth: 150,
    height: 52,
  },
  dataEvenContainer: {
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.NEUTRAL_200,
    backgroundColor: Colors.NEUTRAL_100,
    maxWidth: 150,
    height: 52,
  },
  dataOddContainer: {
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.NEUTRAL_200,
    backgroundColor: Colors.NEUTRAL,
    maxWidth: 150,
    height: 52,
  },
});

export default styles;
