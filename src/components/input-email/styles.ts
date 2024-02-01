import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  inputLabel: {
    color: Colors.NEUTRAL_700,
    fontWeight: '600',
  },
  textInput: {
    height: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_400,
    borderRadius: 4,
    backgroundColor: Colors.NEUTRAL,
  },
  textError: {
    color: Colors.ALERT_RED,
  },
  textInputError: {
    borderColor: Colors.ALERT_RED,
  },
});

export default styles;
