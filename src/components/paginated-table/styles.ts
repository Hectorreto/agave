import { StyleSheet } from 'react-native';

import { colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: colors.neutral,
  },
  footerText: {
    color: colors.neutral700,
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
    color: colors.primary700,
    fontSize: 16,
    marginHorizontal: 16,
  },
  titleContainer: {
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.neutral200,
    backgroundColor: colors.neutral,
    maxWidth: 150,
    height: 52,
  },
  dataEvenContainer: {
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.neutral200,
    backgroundColor: colors.neutral100,
    maxWidth: 150,
    height: 52,
  },
  dataOddContainer: {
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.neutral200,
    backgroundColor: colors.neutral,
    maxWidth: 150,
    height: 52,
  },
});

export default styles;
