import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  inputLabel: {
    color: '#545d63',
    fontWeight: '600',
  },
  textInput: {
    height: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#A6B1B9',
    borderRadius: 4,
    backgroundColor: '#FEFEFE',
  },
  textInputMultiline: {
    height: 88,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#A6B1B9',
    borderRadius: 4,
    backgroundColor: '#FEFEFE',
    textAlignVertical: 'top',
  },
});

export default styles;