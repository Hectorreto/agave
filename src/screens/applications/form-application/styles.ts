import { StyleSheet } from 'react-native';

import { Colors } from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    flexGrow: 1,
  },
  saveCancelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  dataText: {
    marginHorizontal: 16,
  },
  formContainer: {
    gap: 4,
  },
  formTopContainer: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  formTopInputContainer: {
    flex: 1,
  },
  formTopButtonContainer: {
    paddingVertical: 6,
  },
  formBottomContainer: {
    marginLeft: 24,
  },
  modalText: {
    textAlign: 'center',
  },
  modalTextBold: {
    fontWeight: 'bold',
  },
  pdfButton: {
    alignItems: 'flex-end',
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
