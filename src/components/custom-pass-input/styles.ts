import { StyleSheet } from 'react-native';

import { colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  inputLabel: {
    color: '#545d63',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#A6B1B9',
    borderRadius: 4,
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 0,
  },
  textInput: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 16,
  },
  iconContainer: {
    marginLeft: 8,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: colors.primary,
  },
});

export default styles;
