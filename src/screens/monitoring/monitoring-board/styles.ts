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
  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_300,
    borderRadius: 12,
    gap: 4,
    paddingBottom: 16,
  },
  cardDataContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  cardDataInnerContainer: {
    height: 56,
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_300,
    borderRadius: 8,
    gap: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDataLeftText: {
    color: Colors.PRIMARY,
    fontSize: 18,
    fontWeight: '600',
  },
  cardDataRightText: {
    color: Colors.NEUTRAL_600,
  },
  cardContainerGap16: {
    gap: 16,
  },
});

export default styles;
