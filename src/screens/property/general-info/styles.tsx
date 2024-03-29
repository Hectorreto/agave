import { StyleSheet } from 'react-native';

import { Colors } from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    flexGrow: 1,
  },
  inputLabel: {
    color: Colors.NEUTRAL_700,
    fontWeight: '600',
  },
  innerContainer: {
    gap: 4,
  },
  doubleInputContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  doubleInputItem: {
    flex: 1,
  },
  doubleInputLabels: {
    flex: 1,
    textAlignVertical: 'bottom',
    color: Colors.NEUTRAL_700,
    fontWeight: '600',
  },
  inputFileContainer: {
    gap: 4,
  },
  inputFileInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputFileSeeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFileSeeText: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  inputSwitchContainer: {
    gap: 4,
  },
});

export default styles;
