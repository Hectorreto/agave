import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  inputLabel: {
    color: '#545d63',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#A6B1B9',
    borderRadius: 4,
    height: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 0,
  },
  textInput: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 16,
  },
  iconContainer: {
    marginLeft: 8,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  informationContainer: {
    flexDirection: 'row',
  },
  helperText: {
    color: '#555',
    flex: 1,
  },
  infoIcon: {
    backgroundColor: 'blue',
    width: 16,
    height: 16,
  },
});

export default styles;
