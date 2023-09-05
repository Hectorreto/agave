import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 56,
  },
  primaryContainer: {
    gap: 8,
  },
  secondaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  drawerIcon: {
    width: 72,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    gap: 16,
  },
  itemText: {
    color: Colors.PRIMARY_700,
  },
});

export default styles;
