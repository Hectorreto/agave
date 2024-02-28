import { StyleSheet } from 'react-native';

import { Colors, shadowStyle } from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    flexGrow: 1,
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
  bottomFormUploadImageButton: {
    alignItems: 'flex-start',
  },
  buttonToggleContainer: {
    flexDirection: 'row',
  },
  buttonToggle: {
    backgroundColor: Colors.NEUTRAL,
    borderColor: Colors.NEUTRAL_300,
    borderWidth: 1,
    width: 120,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonToggleLeft: {
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  buttonToggleRight: {
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  buttonToggleActive: {
    ...shadowStyle,
    backgroundColor: Colors.PRIMARY_300,
    borderColor: Colors.PRIMARY_300,
  },
  buttonToggleText: {
    color: Colors.PRIMARY,
    fontWeight: '600',
  },
  buttonToggleTextActive: {
    color: Colors.NEUTRAL,
  },
  doubleInputContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  doubleInputLabels: {
    flex: 1,
    textAlignVertical: 'bottom',
    color: Colors.NEUTRAL_700,
    fontWeight: '600',
  },
  doubleInputItem: {
    flex: 1,
  },
});

export default styles;
