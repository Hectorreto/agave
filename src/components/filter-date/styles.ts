import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    width: 200,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_400,
    borderRadius: 4,
  },
  leftIcon: {
    marginHorizontal: 4,
  },
  textValue: {
    flex: 1,
  },
  text: {
    flex: 1,
    color: Colors.NEUTRAL_600,
  },
  rightIcon: {
    marginHorizontal: 8,
  },
  containerWithValue: {
    borderColor: Colors.PRIMARY_400,
  },
});

export default styles;
