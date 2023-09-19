import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  outerContainer: {
    gap: 16,
  },
  outerContainerClosed: {
    gap: 10,
  },
  onlyContentContainer: {
    gap: 16,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    color: Colors.PRIMARY_600,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default styles;
