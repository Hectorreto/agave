import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
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
  disabled: {
    backgroundColor: Colors.NEUTRAL_200,
    borderColor: Colors.NEUTRAL_200,
  },
  textDisabled: {
    color: Colors.NEUTRAL_500,
  },
});

export const blueStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
  },
  pressed: {
    backgroundColor: Colors.PRIMARY_300,
    borderColor: Colors.PRIMARY_300,
    borderWidth: 2,
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

export const redStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ALERT_RED,
    borderColor: Colors.ALERT_RED,
    borderWidth: 2,
  },
  pressed: {
    backgroundColor: Colors.ALERT_RED_2,
    borderColor: Colors.ALERT_RED_2,
    borderWidth: 2,
  },
  text: {
    color: Colors.NEUTRAL,
  },
});

export default styles;
