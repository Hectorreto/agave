import { StyleSheet } from 'react-native';

import { Colors, shadowStyle } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  inputLabel: {
    color: Colors.NEUTRAL_700,
    fontWeight: '600',
  },
  inputLabelError: {
    color: Colors.ALERT_RED,
  },
  inputContainer: {
    minHeight: 44,
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
  inputContainerDisabled: {
    backgroundColor: Colors.NEUTRAL_200,
  },
  inputValue: {
    flex: 1,
  },
  inputValueDisabled: {
    color: Colors.NEUTRAL_700,
  },
  inputPlaceholder: {
    flex: 1,
    color: Colors.NEUTRAL_600,
  },
  inputError: {
    borderColor: Colors.ALERT_RED,
  },
  modal: {
    ...shadowStyle,
    borderRadius: 4,
    position: 'absolute',
    backgroundColor: Colors.NEUTRAL,
    width: 320,
    maxHeight: 44 * 10.5,
  },
  listItem: {
    height: 44,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  inputWithValue: {
    borderColor: Colors.PRIMARY_400,
  },
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalOutside: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

export default styles;
