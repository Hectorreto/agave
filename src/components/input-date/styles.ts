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
  input: {
    height: 44,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_400,
    borderRadius: 4,
    backgroundColor: Colors.NEUTRAL,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputValue: {
    flex: 1,
  },
  inputPlaceholder: {
    flex: 1,
    color: Colors.NEUTRAL_600,
  },
  inputContainerDisabled: {
    backgroundColor: Colors.NEUTRAL_200,
  },
  inputWithValue: {
    borderColor: Colors.PRIMARY_400,
  },
  textDisabled: {
    color: Colors.NEUTRAL_700,
  },
});

export default styles;
