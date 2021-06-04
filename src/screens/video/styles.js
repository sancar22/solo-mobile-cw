import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    flex: 1,
  },
  testBtn: {
    backgroundColor: '#50D65D',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 50,
  },
  testBtnTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
