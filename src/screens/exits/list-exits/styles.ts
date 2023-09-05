import { StyleSheet } from 'react-native';

import { Colors, shadowStyle } from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  filterContainer: {
    width: 200,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_400,
    borderRadius: 4,
  },
  filterText: {
    flex: 1,
    color: Colors.NEUTRAL_600,
  },
  filterLeftIcon: {
    marginHorizontal: 4,
  },
  filterRightIcon: {
    marginHorizontal: 8,
  },
  map: {
    height: 223,
    borderWidth: 1,
  },
  newExitContainer: {
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
  formattedDate: {
    textAlign: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  moreButton: {
    ...shadowStyle,
    height: 32,
    width: 32,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.NEUTRAL,
    marginHorizontal: 8,
  },
});

export default styles;
