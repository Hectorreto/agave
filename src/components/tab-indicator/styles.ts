import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: Colors.NEUTRAL_200,
    height: 1,
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberContainer: {
    backgroundColor: Colors.PRIMARY,
    width: 24,
    height: 24,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  prev: {
    backgroundColor: Colors.PRIMARY_300,
  },
  next: {
    backgroundColor: Colors.PRIMARY_100,
  },
  numberText: {
    color: Colors.NEUTRAL,
  },
  title: {
    marginRight: 8,
    fontSize: 16,
    color: Colors.PRIMARY_800,
  },
  titleBold: {
    fontWeight: '600',
  },
});

export default styles;
