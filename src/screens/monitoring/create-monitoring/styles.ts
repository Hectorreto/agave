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
  saveCancelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  bottomFormContainer: {
    gap: 16,
  },
  bottomFormInputsContainer: {
    gap: 4,
  },
  bottomFormTitle: {
    color: Colors.PRIMARY_600,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomFormDoubleInput: {
    flexDirection: 'row',
    gap: 4,
  },
  bottomFormDoubleInputItem: {
    flex: 1,
  },
  doubleInputLabels: {
    flex: 1,
    textAlignVertical: 'bottom',
    color: Colors.NEUTRAL_700,
    fontWeight: '600',
  },
  bottomFormUploadImageButton: {
    alignItems: 'flex-start',
  },
  modalDeleteText: {
    textAlign: 'center',
  },
  modalDeleteTextBold: {
    fontWeight: 'bold',
  },
});

export default styles;
