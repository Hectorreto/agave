import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 52,
  },
  tab: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.NEUTRAL_300,
    justifyContent: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY_100,
  },
  tabPressed: {
    backgroundColor: Colors.PRIMARY_50,
  },
  text: {
    textAlign: 'center',
    color: Colors.PRIMARY_700,
    fontWeight: '600',
    marginHorizontal: 8,
  },
});

export default styles;
