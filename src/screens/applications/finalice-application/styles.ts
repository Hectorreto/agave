import { StyleSheet } from 'react-native';

import { Colors } from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    flexGrow: 1,
  },
  tableText: {
    marginHorizontal: 16,
  },
  tableInput: {
    marginHorizontal: 16,
    alignItems: 'center',
  },
  pdfButton: {
    alignItems: 'flex-end',
  },
  saveCancelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  helper: {
    textAlign: 'center',
  },
  helperButton: {
    alignItems: 'center',
    gap: 8,
  },
  tableTitleText: {
    fontWeight: '600',
    color: Colors.PRIMARY_700,
    fontSize: 16,
    marginHorizontal: 16,
  },
});

export default styles;
