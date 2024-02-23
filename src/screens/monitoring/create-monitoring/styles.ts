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
  quadrantTitle: {
    color: Colors.PRIMARY_700,
    fontWeight: '600',
    fontSize: 18,
  },
  stepperItem: {
    backgroundColor: Colors.PRIMARY_100,
    width: 24,
    height: 24,
    borderRadius: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '600',
    lineHeight: 20,
    color: Colors.NEUTRAL,
    marginHorizontal: 2,
  },
  stepperItemActive: {
    backgroundColor: Colors.PRIMARY,
  },
  stepperContainer: {
    flexGrow: 0,
    height: 40,
  },
  stepperSeparator: {
    height: 1,
    width: 6.22,
    backgroundColor: 'green',
  },
  stepperItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
