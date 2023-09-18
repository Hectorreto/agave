import { StyleSheet } from 'react-native';

import { Colors } from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    flexGrow: 1,
  },
  helper: {
    color: Colors.NEUTRAL_700,
  },
  helper2: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.NEUTRAL_700,
    fontWeight: '600',
  },
  newItemContainer: {
    alignItems: 'center',
  },
  modalForm: {
    gap: 16,
  },
});

export default styles;
