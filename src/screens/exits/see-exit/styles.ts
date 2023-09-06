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
  uploadImage: {
    alignItems: 'flex-start',
  },
  infoContainer: {
    marginTop: 10,
  },
  infoText: {
    color: '#828287',
    fontSize: 10,
  },
});

export default styles;
