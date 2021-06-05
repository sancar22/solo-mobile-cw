import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  scoreContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  exitBtn: {
    backgroundColor: '#50D65D',
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 50,
  },
  exitBtnTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
