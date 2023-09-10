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
  textInputMultiline: {
    height: 88,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_400,
    borderRadius: 4,
    backgroundColor: Colors.NEUTRAL,
    textAlignVertical: 'top',
  },
  disabled: {
    backgroundColor: Colors.NEUTRAL_200,
    borderColor: Colors.NEUTRAL_400,
    color: Colors.NEUTRAL_700,
  },
  inputWithValue: {
    borderColor: Colors.PRIMARY_400,
  },
});

export default styles;
