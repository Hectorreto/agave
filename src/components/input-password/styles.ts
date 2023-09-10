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
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_400,
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
  informationContainer: {
    flexDirection: 'row',
  },
  helperText: {
    color: '#555',
    flex: 1,
  },
});

export default styles;
