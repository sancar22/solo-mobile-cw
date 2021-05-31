import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  backTouchable: {
    width: 70,
    height: 60,
    marginTop: 20,
    marginLeft: 20,
  },
  body: {
    flex: 1,
    width: wp('80%'),
    alignSelf: 'center',
    marginTop: 50,
  },
  loginBtn: {
    backgroundColor: colors.initialBtnColor,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 30,
    paddingHorizontal: 60,
    paddingVertical: 15,
    marginTop: 10,
  },
  loginBtnTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerStyles: {
    backgroundColor: colors.inputBgColor,
    borderRadius: 20,
    marginBottom: 10,
  },
  pwContainer: {
    marginBottom: 40,
  },
  inputStylesCont: {
    borderBottomWidth: 0,
  },
  pwNoMatch: {
    color: colors.initialLinkColors,
    marginTop: 15,
  },
  pwNoMatch2: {
    color: colors.initialLinkColors,
  },
});
export default styles;
