import { StyleSheet } from 'react-native';

import { Colors, shadowStyle } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    ...shadowStyle,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  containerWithIconLeft: {
    paddingLeft: 16,
    paddingRight: 20,
  },
  text: {
    fontWeight: '600',
  },
});

export const blueStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
  },
  pressed: {
    backgroundColor: Colors.PRIMARY_300,
  },
  text: {
    color: Colors.NEUTRAL,
  },
});

export const whiteStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.NEUTRAL,
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
  },
  pressed: {
    backgroundColor: Colors.PRIMARY_100,
    borderColor: Colors.PRIMARY_100,
    borderWidth: 2,
  },
  text: {
    color: Colors.PRIMARY,
  },
});

export const lightBlueStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.NEUTRAL,
    borderColor: Colors.PRIMARY_400,
    borderWidth: 2,
  },
  pressed: {
    backgroundColor: Colors.PRIMARY_100,
    borderColor: Colors.PRIMARY_100,
    borderWidth: 2,
  },
  text: {
    color: Colors.PRIMARY,
  },
});

export default styles;
