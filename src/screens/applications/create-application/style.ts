import { StyleSheet } from 'react-native';

import { Colors } from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  saveCancelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  dataText: {
    marginHorizontal: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabsNumberContainer: {
    backgroundColor: Colors.PRIMARY,
    width: 24,
    height: 24,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  tabsPrev: {
    backgroundColor: Colors.PRIMARY_300,
  },
  tabsNext: {
    backgroundColor: Colors.PRIMARY_100,
  },
  tabsNumberText: {
    color: Colors.NEUTRAL,
  },
  tabsDivider: {
    backgroundColor: Colors.NEUTRAL_200,
    height: 1,
    flex: 1,
  },
  tabsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabsTitle: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.PRIMARY_800,
  },
});

export default styles;
