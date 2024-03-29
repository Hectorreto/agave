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
  indicator: {
    height: 52,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_400,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  indicatorIcon: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY_600,
    borderRadius: 4,
  },
  indicatorText1: {
    color: Colors.NEUTRAL,
    fontSize: 18,
    fontWeight: '600',
  },
  indicatorText2: {
    color: Colors.NEUTRAL,
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
