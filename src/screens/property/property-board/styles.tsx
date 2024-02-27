import { StyleSheet } from 'react-native';

import { Colors } from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    flexGrow: 1,
  },
  indicatorsContainer: {
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_300,
    padding: 8,
    gap: 4,
    borderRadius: 12,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_300,
    borderRadius: 12,
    gap: 4,
  },
  cardContainerGap16: {
    gap: 16,
  },
  cardTitleContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.PRIMARY_700,
    textAlign: 'center',
  },
  cardDataContainer: {
    alignItems: 'center',
  },
  leftIcon: {
    marginHorizontal: 4,
  },
});

export default styles;
