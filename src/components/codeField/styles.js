import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  root: {flex: 1},
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.white,
    marginBottom: 20,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 44,
    fontSize: 24,
    borderWidth: 2,
    textAlign: 'center',
    color: 'white',
    backgroundColor: colors.inputBgColor,
    borderRadius: 10,
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default styles;
