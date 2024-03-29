import { StyleSheet } from 'react-native';

import { Colors } from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    flexGrow: 1,
  },
  newItemContainer: {
    alignItems: 'center',
  },
  filterAndSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    width: 260,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.NEUTRAL_400,
    paddingVertical: 10,
    gap: 8,
    paddingLeft: 16,
    paddingRight: 8,
    alignItems: 'center',
  },
  searchText: {
    flex: 1,
    color: Colors.NEUTRAL_600,
  },
  dataText: {
    marginHorizontal: 16,
  },
  statusContainer: {
    marginHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_500,
  },
  statusInProcess: {
    borderColor: Colors.SECONDARY,
    backgroundColor: Colors.SECONDARY_50,
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
    maxWidth: 150,
  },
});

export default styles;
