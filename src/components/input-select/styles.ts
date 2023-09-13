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
  inputContainer: {
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
  dropdown: {
    ...shadowStyle,
    borderRadius: 4,
    position: 'absolute',
    backgroundColor: Colors.NEUTRAL,
    width: '100%',
    maxHeight: 44 * 4,
  },
  listItemContainer: {
    borderRadius: 4,
    height: 44,
    backgroundColor: Colors.NEUTRAL,
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.PRIMARY_800,
  },
  inputWithValue: {
    borderColor: Colors.PRIMARY_400,
  },
});

export default styles;
