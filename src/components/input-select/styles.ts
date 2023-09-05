import { StyleSheet } from 'react-native';

import { Colors, shadowStyle } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  inputLabel: {
    color: '#545d63',
    fontWeight: '600',
  },
  inputContainer: {
    height: 44,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#A6B1B9',
    borderRadius: 4,
    backgroundColor: '#FEFEFE',
    flexDirection: 'row',
  },
  inputValue: {
    flex: 1,
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
  },
  listItemContainer: {
    borderRadius: 4,
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: Colors.PRIMARY_800,
  },
});

export default styles;
