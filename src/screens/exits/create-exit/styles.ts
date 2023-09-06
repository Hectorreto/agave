import { StyleSheet } from 'react-native';

import { Colors } from '../../../themes/theme';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  helper: {
    color: Colors.NEUTRAL_700,
  },
  formContainer: {
    gap: 8,
  },
  form: {
    gap: 4,
    zIndex: 1,
  },
  extraActionsContainer: {
    gap: 10,
  },
  extraActions: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  exitTitleContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  exitTitleContainerHidden: {
    marginBottom: 8,
  },
  exitTitle: {
    color: Colors.PRIMARY_600,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  propertyContainer: {
    zIndex: 2,
  },
  deleteButtonContainer: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: Colors.ALERT_RED,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonContainerPressed: {
    backgroundColor: Colors.ALERT_RED,
  },
  colapseButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
  modalTextBold: {
    fontWeight: 'bold',
  },
});

export default styles;
