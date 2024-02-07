import { StyleSheet } from 'react-native';

import { Colors } from '../../themes/theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingBottom: 100,
    gap: 16,
  },
  logo: {
    height: 90,
    position: 'relative',
    width: 193,
  },
  title: {
    color: Colors.PRIMARY,
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'center',
  },
  form: {
    gap: 8,
    width: '100%',
  },
  recoverPass: {
    color: Colors.SECONDARY,
    fontWeight: '600',
  },
  text: {
    color: '#555',
    textAlign: 'center',
  },
});

export default styles;
