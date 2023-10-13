import { StyleSheet } from 'react-native';

import { Colors } from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    flexGrow: 1,
  },
  map: {
    height: 223,
  },
  newItemContainer: {
    alignItems: 'center',
  },
  dataText: {
    marginHorizontal: 16,
  },
  formattedDate: {
    textAlign: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  moreButton: {
    marginHorizontal: 8,
  },
  tableTitleText: {
    fontWeight: '600',
    color: Colors.PRIMARY_700,
    fontSize: 16,
    marginHorizontal: 16,
  },
  tableDateSort: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  tableTitleTextSort: {
    fontWeight: '600',
    color: Colors.PRIMARY_700,
    fontSize: 16,
    marginHorizontal: 16,
    marginRight: 0,
  },
  rowButton: {
    height: '100%',
    justifyContent: 'center',
  },
});

export default styles;
