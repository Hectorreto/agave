import { StyleSheet } from 'react-native';

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
  },
});

export default styles;
